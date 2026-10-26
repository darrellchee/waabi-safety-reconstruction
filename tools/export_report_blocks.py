#!/usr/bin/env python3
"""Export the blockquote text of every block in REPORT_CONTENT.md to app/report/report-blocks.json.

The /report page reads this file, so its text is the md text and is never retyped. Re-run after editing the md.
Only lines that start with ">" are exported (the same lines fill_wordcounts.py counts).
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SEC_RE = re.compile(r"^## SECTION (\d+): (.+?) \(id: (.+?)\)")
BLK_RE = re.compile(r"^### \[(\d+\.\d+)\]\s*(.*)")
META_RE = re.compile(r"^- \*\*code:\*\* (\d+\.\d+) \| \*\*status:\*\* (\w+)")

blocks, sections, cur, sec = {}, {}, None, None
for ln in (ROOT / "REPORT_CONTENT.md").read_text(encoding="utf-8").split("\n"):
    m = SEC_RE.match(ln)
    if m:
        sec = int(m.group(1))
        sections[sec] = {"title": m.group(2), "id": m.group(3)}
        cur = None
        continue
    m = BLK_RE.match(ln)
    if m:
        cur = {"section": sec, "title": m.group(2), "status": "", "lines": []}
        blocks[m.group(1)] = cur
        continue
    if cur is None:
        continue
    m = META_RE.match(ln)
    if m:
        cur["status"] = m.group(2)
    elif ln.startswith(">"):
        cur["lines"].append(ln[1:].strip())

out = ROOT / "app" / "report" / "report-blocks.json"
out.write_text(json.dumps({"sections": sections, "blocks": blocks}, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"wrote {out.relative_to(ROOT)}: {len(blocks)} blocks")
