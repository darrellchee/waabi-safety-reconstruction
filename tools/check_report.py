#!/usr/bin/env python3
"""Compare REPORT_CONTENT.md with the built /report page. Read-only: this script never writes or edits a file.

Reports:
  1. block codes in the md that are missing from the page
  2. block codes on the page that are not in the md
  3. status mismatches (md status vs the page's data-status)
  4. per-block and per-section word count differences

Word counting matches fill_wordcounts.py for the md side: blockquote lines only, Markdown table separator rows
ignored, "|" treated as a space, split on whitespace, and a token counts only if it has a letter or digit.
The page side uses the same token rule on the page text of each data-code block (or section id), leaving out
headings, badges, placeholder text, buttons, svg, script and style.

Usage:
  python3 tools/check_report.py                       # tries http://localhost:3000/report, then .next/server/app/report.html
  python3 tools/check_report.py --url http://localhost:3000/report
  python3 tools/check_report.py --html path/to/report.html

Exit status: 0 when the page and the md agree on codes, statuses and word counts, 1 otherwise, 2 if the page cannot be read.
"""
import argparse
import re
import sys
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STATUSES = ["SITE", "SLIDES", "DRAFT", "MISSING", "MEDIA"]

# ---------------------------------------------------------------- md side (same rules as fill_wordcounts.py)
SEC_RE = re.compile(r"^## SECTION (\d+): (.+?) \(id: (.+?)\)")
BLK_RE = re.compile(r"^### \[(\d+)\.(\d+)\]\s*(.*)")
META_RE = re.compile(r"^- \*\*code:\*\* (\d+\.\d+) \| \*\*status:\*\* (\w+) \| \*\*words:\*\* (\d+)")


def md_words(text):
    n = 0
    for tok in text.replace("|", " ").split():
        if re.search(r"[A-Za-z0-9]", tok):
            n += 1
    return n


def read_md(path):
    lines = path.read_text(encoding="utf-8").split("\n")
    blocks, sections = {}, {}
    cur_sec = cur_blk = None
    title = ""
    for ln in lines:
        m = SEC_RE.match(ln)
        if m:
            cur_sec = int(m.group(1))
            sections[cur_sec] = {"title": m.group(2), "id": m.group(3), "codes": []}
            cur_blk = None
            continue
        m = BLK_RE.match(ln)
        if m:
            title = m.group(3)
            cur_blk = {"sec": cur_sec, "title": title, "text": []}
            continue
        if cur_blk is None:
            continue
        mm = META_RE.match(ln)
        if mm:
            cur_blk.update(code=mm.group(1), status=mm.group(2), stated=int(mm.group(3)))
            blocks[mm.group(1)] = cur_blk
            sections[cur_blk["sec"]]["codes"].append(mm.group(1))
        elif ln.startswith(">"):
            body = ln[1:].strip()
            if re.match(r"^\|[-| ]+\|$", body):
                continue
            cur_blk["text"].append(body)
    for b in blocks.values():
        b["words"] = sum(md_words(t) for t in b["text"])
    return blocks, sections


# ---------------------------------------------------------------- page side
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
INLINE = {"span", "mark", "a", "em", "strong", "b", "i", "sup", "sub", "abbr", "cite", "small", "time", "code"}
SKIP = {"h1", "h2", "h3", "h4", "h5", "h6", "svg", "script", "style", "noscript", "button", "img"}


class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []


class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#root", [], None)
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs, self.cur)
        self.cur.children.append(node)
        if tag not in VOID:
            self.cur = node

    def handle_startendtag(self, tag, attrs):
        self.cur.children.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        node = self.cur
        while node is not None and node.tag != tag:
            node = node.parent
        if node is not None and node.parent is not None:
            self.cur = node.parent

    def handle_data(self, data):
        self.cur.children.append(data)


def collect(node, out, section_ids=(), root=None):
    if isinstance(node, str):
        out.append(node)
        return
    a = node.attrs
    # data-counted keeps a heading that is page text in the md; data-nocount drops UI chrome (counters, nav).
    if (node.tag in SKIP and "data-counted" not in a) or "data-badge" in a or "data-placeholder" in a or "data-nocount" in a:
        return
    # Text that belongs to another md section (a nested section id) is not counted here.
    if node is not root and a.get("id") in section_ids:
        return
    separate = node.tag not in INLINE
    if separate:
        out.append(" ")
    for child in node.children:
        collect(child, out, section_ids, root)
    if separate:
        out.append(" ")


def page_words(node, section_ids=()):
    out = []
    collect(node, out, section_ids, node)
    return sum(1 for tok in "".join(out).split() if re.search(r"[A-Za-z0-9]", tok))


def walk(node):
    if isinstance(node, str):
        return
    yield node
    for child in node.children:
        yield from walk(child)


def read_page(args):
    if args.html:
        return Path(args.html).read_text(encoding="utf-8"), args.html
    if args.url:
        return urllib.request.urlopen(args.url, timeout=15).read().decode("utf-8"), args.url
    try:
        url = "http://localhost:3000/report"
        return urllib.request.urlopen(url, timeout=5).read().decode("utf-8"), url
    except Exception:
        built = ROOT / ".next" / "server" / "app" / "report.html"
        if built.exists():
            return built.read_text(encoding="utf-8"), str(built)
    raise SystemExit("Cannot read the page: start the site (npm run dev) or pass --html / --url.")


def code_key(code):
    s, b = code.split(".")
    return int(s), int(b)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--md", default=str(ROOT / "REPORT_CONTENT.md"))
    ap.add_argument("--html")
    ap.add_argument("--url")
    args = ap.parse_args()

    blocks, sections = read_md(Path(args.md))
    try:
        html, source = read_page(args)
    except SystemExit as exc:
        print(exc)
        return 2
    tree = Tree()
    tree.feed(html)
    tree.close()

    page = {}  # code -> {"nodes": [...], "statuses": set, "words": int}
    for node in walk(tree.root):
        code = node.attrs.get("data-code")
        if not code:
            continue
        entry = page.setdefault(code, {"count": 0, "statuses": set(), "words": 0})
        entry["count"] += 1
        entry["statuses"].add(node.attrs.get("data-status", ""))
        entry["words"] += page_words(node)

    problems = 0
    print(f"md:   {args.md}\npage: {source}")
    print(f"md blocks: {len(blocks)}   page blocks: {len(page)}\n")

    missing = sorted((c for c in blocks if c not in page), key=code_key)
    print(f"1. CODES IN THE MD BUT MISSING FROM THE PAGE ({len(missing)})")
    for c in missing:
        print(f"   {c:<6}{blocks[c]['status']:<8}{blocks[c]['title']}")
    problems += len(missing)

    extra = sorted((c for c in page if c not in blocks), key=lambda c: tuple(int(x) if x.isdigit() else 0 for x in c.split(".")))
    print(f"\n2. CODES ON THE PAGE BUT NOT IN THE MD ({len(extra)})")
    for c in extra:
        print(f"   {c}")
    problems += len(extra)

    print("\n3. STATUS MISMATCHES")
    bad = 0
    for c in sorted((c for c in blocks if c in page), key=code_key):
        got = page[c]["statuses"]
        if got != {blocks[c]["status"]}:
            bad += 1
            print(f"   {c:<6}md {blocks[c]['status']:<8}page {', '.join(sorted(got)) or '(none)'}")
    if not bad:
        print("   none")
    problems += bad

    dupes = sorted((c for c in page if page[c]["count"] > 1), key=lambda c: tuple(int(x) if x.isdigit() else 0 for x in c.split(".")))
    if dupes:
        print("\n   Note: codes carried by more than one element (words are summed): " + ", ".join(f"{c} x{page[c]['count']}" for c in dupes))

    print("\n4. WORD COUNT DIFFERENCES PER BLOCK (md vs page, page minus md)")
    same = diff = 0
    for c in sorted((c for c in blocks if c in page), key=code_key):
        d = page[c]["words"] - blocks[c]["words"]
        if d:
            diff += 1
            print(f"   {c:<6}md {blocks[c]['words']:>4}   page {page[c]['words']:>4}   diff {d:+d}")
        else:
            same += 1
    print(f"   {same} blocks match, {diff} differ" + ("" if not missing else f", {len(missing)} not compared (missing from page)"))
    problems += diff

    print("\n5. WORD COUNT DIFFERENCES PER SECTION (md vs page, page minus md)")
    by_id = {}
    for node in walk(tree.root):
        i = node.attrs.get("id")
        if i and i not in by_id:
            by_id[i] = node
    tot_md = tot_page = 0
    section_ids = {s["id"] for s in sections.values()}
    for n in sorted(sections):
        sec = sections[n]
        md_total = sum(blocks[c]["words"] for c in sec["codes"])
        node = by_id.get(sec["id"])
        if node is None:
            print(f"   S{n:<3}{sec['id']:<20}md {md_total:>4}   page  n/a   (no element with id \"{sec['id']}\")")
            problems += 1
            continue
        pw = page_words(node, section_ids)
        d = pw - md_total
        flag = "" if not d else "   <- differs"
        print(f"   S{n:<3}{sec['id']:<20}md {md_total:>4}   page {pw:>4}   diff {d:+d}{flag}")
        problems += 1 if d else 0
        if 3 <= n <= 16:
            tot_md += md_total
            tot_page += pw
    print(f"   Body, sections 3 to 16: md {tot_md}   page {tot_page}   (limit 4000)")
    print("\n" + ("OK: page and md agree." if not problems else f"{problems} difference(s) found. No file was changed."))
    return 0 if not problems else 1


if __name__ == "__main__":
    sys.exit(main())
