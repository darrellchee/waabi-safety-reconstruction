import re, sys

path = "REPORT_CONTENT.md"
lines = open(path, encoding="utf-8").read().split("\n")

sec_re = re.compile(r"^## SECTION (\d+): (.+?) \(id: (.+?)\)")
blk_re = re.compile(r"^### \[(\d+)\.(\d+)\]")
meta_re = re.compile(r"^- \*\*code:\*\* (\d+\.\d+) \| \*\*status:\*\* (\w+) \| \*\*words:\*\* (\d+)")
tgt_re = re.compile(r"\*\*target:\*\* (\d+)")

def words(text):
    n = 0
    for tok in text.replace("|", " ").split():
        if re.search(r"[A-Za-z0-9]", tok):
            n += 1
    return n

# pass 1: find blocks and count
blocks = {}   # code -> dict
order = []
cur_sec = None
cur_blk = None
sections = {}
for i, ln in enumerate(lines):
    m = sec_re.match(ln)
    if m:
        cur_sec = int(m.group(1))
        sections[cur_sec] = {"title": m.group(2), "id": m.group(3), "blocks": [], "line": None}
        cur_blk = None
        continue
    if blk_re.match(ln):
        cur_blk = {"sec": cur_sec, "meta_line": None, "text": [], "title": ln}
        continue
    if cur_blk is not None:
        mm = meta_re.match(ln)
        if mm:
            code = mm.group(1)
            cur_blk["code"] = code
            cur_blk["status"] = mm.group(2)
            cur_blk["meta_line"] = i
            t = tgt_re.search(ln)
            cur_blk["target"] = int(t.group(1)) if t else 0
            blocks[code] = cur_blk
            order.append(code)
            sections[cur_blk["sec"]]["blocks"].append(code)
        elif ln.startswith(">"):
            body = ln[1:].strip()
            if re.match(r"^\|[-| ]+\|$", body):
                continue
            cur_blk["text"].append(body)

for code, b in blocks.items():
    b["words"] = sum(words(t) for t in b["text"])

# pass 2: rewrite meta lines and section lines
out = list(lines)
for code, b in blocks.items():
    out[b["meta_line"]] = re.sub(r"\*\*words:\*\* \d+", f"**words:** {b['words']}", out[b["meta_line"]])

cur_sec = None
for i, ln in enumerate(out):
    m = sec_re.match(ln)
    if m:
        cur_sec = int(m.group(1))
        continue
    if cur_sec is not None and ln.startswith("- **section words:**"):
        w = sum(blocks[c]["words"] for c in sections[cur_sec]["blocks"])
        counts = "yes" if 3 <= cur_sec <= 16 else "no"
        out[i] = f"- **section words:** {w} | **counts toward 4000:** {counts}"

# summary table
rows = []
body_now = 0
body_target = 0
all_now = 0
for s in sorted(sections):
    bl = sections[s]["blocks"]
    now = sum(blocks[c]["words"] for c in bl)
    tgt = sum(blocks[c]["target"] for c in bl if blocks[c]["status"] == "MISSING")
    counts = 3 <= s <= 16
    nmiss = sum(1 for c in bl if blocks[c]["status"] == "MISSING")
    nd = sum(1 for c in bl if blocks[c]["status"] == "DRAFT")
    rows.append((s, sections[s]["title"], sections[s]["id"], len(bl), now, tgt, now + tgt, counts, nmiss, nd))
    all_now += now
    if counts:
        body_now += now
        body_target += tgt

tbl = []
tbl.append("| Section | Title | id | Blocks | Words now | Words to add (MISSING targets) | Projected | Counts toward 4000 | MISSING blocks | DRAFT blocks |")
tbl.append("|---|---|---|---|---|---|---|---|---|---|")
for r in rows:
    tbl.append(f"| {r[0]} | {r[1]} | `{r[2]}` | {r[3]} | {r[4]} | {r[5]} | {r[6]} | {'yes' if r[7] else 'no'} | {r[8]} | {r[9]} |")
tbl.append(f"| | **Body (sections 3 to 16)** | | | **{body_now}** | **{body_target}** | **{body_now + body_target}** | | | |")
tbl.append(f"| | **Whole page** | | {len(blocks)} | **{all_now}** | | | | | |")
tbl.append("")
tbl.append("Per-block counts are in each block's `words` field below.")

start = out.index("<!-- WORDCOUNT-TABLE-START -->")
end = out.index("<!-- WORDCOUNT-TABLE-END -->")
out[start + 1:end] = [""] + tbl + [""]

open(path, "w", encoding="utf-8").write("\n".join(out))

print("blocks:", len(blocks))
for r in rows:
    print(r)
print("BODY NOW", body_now, "TARGET ADD", body_target, "PROJECTED", body_now + body_target)
print("STATUS COUNTS", {s: sum(1 for b in blocks.values() if b["status"] == s) for s in ["SITE", "SLIDES", "DRAFT", "MISSING", "MEDIA"]})
