# PROJECT_CONTEXT.md

Read this file first. Then read `REPORT_CONTENT.md`. Do not start work until you have read both.

---

## 1. Your job in one paragraph

You are helping a 6-person university team build ONE web page: `/report`.

- `/report` is the ONLY page you edit. It is the team's final assessment website, built as one long page.
- The 4 old pages (`/`, `/safety`, `/company`, `/careers`) are plain HTML files. They are READ-ONLY. They came from a design template and most of their content is not ours. Use them only as a UI and design library. Copy the look, markup and behaviour you want into new files.
- Every word on `/report` comes from `REPORT_CONTENT.md`. That file is the source of truth. Never write your own copy.

---

## 2. The assignment

| Item | Detail |
|---|---|
| Subject | Communication for IT Professionals (CITP, 31265), University of Technology Sydney (UTS) |
| Task | Assessment Task 3: the final team website |
| Weight | 30% of the subject mark. Team task. |
| Challenge | Engineers Without Borders (EWB) Challenge 2026, Port Stewart, Lama Lama Country, Cape York Peninsula, Queensland |
| Design Area | 2. Eco-tourism and Visitor Experience |
| Project Opportunity | 2.1 Resilient visitor infrastructure |
| Client | Yintjingga Aboriginal Corporation (YAC). The Lama Lama people are the Traditional Owners of the Country. |
| Site chosen | Warokutal (Safari Camp), a campground at Port Stewart |
| Audience | The client (YAC) and the public. The site must have enough detail for YAC to continue with the design or build it. It must also justify the design to the community. |

The brief for Project Opportunity 2.1 says:
"Design resilient infrastructure for a specific visitor destination or tourism activity area in Lama Lama Country, such as a campground, creek crossing, boat ramp, or visitor information point. Respond to identified challenges associated with wet-season flooding, visitor access, safety, or maintenance requirements, while accommodating expected visitor numbers and improving the visitor experience without compromising cultural or environmental values."

### What the website must do
- Explain the problem, show the solution, show how it meets community needs, and answer concerns the community may have.
- Include an implementation plan, costings and recommendations.
- Support the team's week 10 presentation.
- Take social, cultural, environmental and budget factors into account.

### How it is marked (rubric summary)
| Criterion | Weight | What the markers look for |
|---|---|---|
| Content and stakeholder consideration | 50% | Aboriginal and Torres Strait Islander partners and community inform all decisions. Every template area covered and leading to the chosen solution. Relevant background. A clear, scoped problem. A reasonable solution that meets community needs, explained for a non-specialist. A convincing implementation plan and fully sourced costings. Wider considerations identified and handled. Body length near the 4000 word limit (the rubric bands mention within 10%, 20% and 30% of 4000). |
| Website design and audience engagement | 30% | Logical, cohesive page order. Enough figures and tables that help understanding. Attractive, consistent design. Appropriate language for the Aboriginal and Torres Strait Islander partners and community. |
| Referencing, citations and prompts | 20% | Genuine sources, APA 7 style, every opinion cited, no lapses. |
| Use of AI | (own row) | A clear statement of AI use or non-use in the appendix with reasons, plus screenshots of prompts and outputs. |

### Template rules (from the official template)
- Section order is fixed (see section 6 below).
- The Executive Summary / landing section follows an EWB format and must not be altered.
- Maximum 4000 words, not counting the reference list, executive summary and appendices (the assessment page also excludes cover page and contents list).
- Professional, clear, concise, third person writing.
- Every table and figure is numbered and captioned.
- Every citation is in the reference list. APA 7 style.
- A Group Declaration (teamwork declaration) must be on the website.
- AI use needs a prompt log appendix.

### Submission
One team member submits a Word version of all website content, with the website URL at the top. Everyone must have access to the site. `REPORT_CONTENT.md` is written so it can also be turned into that Word version.

---

## 3. The team and its work

Six members. Each researched one background area and one design area.

| Member | Work |
|---|---|
| Pinhong | Climate and flooding research. Prototype (built in Blender). |
| Darrell | Existing infrastructure and safety. Design opportunity. Life cycle. Revenue and cost. |
| Tasneef | Visitor groups and experience. Decision matrix. Ideas and design options. |
| Isaac | Tourism economy and maintenance. Current practice. Slide design. |
| Jude | Cultural values and protocols. |
| Qijun | Ecological and environmental values. Cost justification. |

### The solution: Provisions Point
A small, raised, UNSTAFFED, self-service supply and equipment-hire shelter at Warokutal. It stands on reinforced concrete piles (floor planned 2 m above ground) on already-cleared ground. It stocks drinking water, non-perishable food, firewood and safety information. It hires out vehicle recovery kits, personal locator beacons (PLBs) and ultra high frequency (UHF) radios. Rangers restock it weekly in the open season (July to November). A grant would pay for the build. Sales and hire fees would pay for running costs. YAC would own it, set prices and decide stock. It is a student proposal that YAC can accept, change or reject.

### How the team's work reads (follow this style)
- Plain English. Short sentences. No jargon without explaining it.
- Third person: "the team proposes", not "we propose". (The Acknowledgement of Country is the one place that uses "we".)
- Careful, honest wording: "would", "should", "proposes", "planning figure", "to be confirmed". Things not yet checked are said to be not yet checked. Never state something as agreed with YAC or Traditional Owners. No one has been consulted yet.
- Australian spelling (colour, metre, organisation, tyre).
- Money in Australian dollars (AUD), written like $38,592.00. Units like 2 m, 24 m2, 20 kg.
- Spell out an abbreviation at first use on the page, then use the short form.
- APA 7 in-text citations: (Author, year). Titles in the reference list in italics.
- NEVER use em dashes or en dashes. Use commas, colons or full stops.

### Cultural rules (strict)
- Say "Traditional Owners", "the Lama Lama people", "Country" (capital C), "Aboriginal and Torres Strait Islander".
- Do not speak for YAC or the Traditional Owners.
- Do NOT use photos of Aboriginal community members or cultural practices. They need clearance the team does not have.
- Culture and Country is a condition for every option, not just a score.

### Facts the team has already checked (do not contradict)
- The park is closed to visitors 1 December to 30 June. This reframes the flood problem. Argue that flood damage lasts into the dry season. Do not argue that visitors need access during the wet season.
- The waterway at Warokutal is the Stewart River. "Annie River" is wrong. Never write it.
- PLBs use the 406 MHz Cospas-Sarsat satellite network and are registered with AMSA. They are not Starlink.
- Estuarine crocodiles are a real risk. Official warnings say swimming is unsafe. Some third-party listings wrongly promote swimming at Warokutal.
- Soften or source unsupported claims. Example: do not say Warokutal has phone reception.
- Do not claim "zero excavation". The design uses a small number of drilled piles on cleared ground, not trench footings.

---

## 4. Repo layout and rules

The site is plain HTML hosted on Vercel.

| Page | Route | Treat as |
|---|---|---|
| Overview | `/` | READ-ONLY. UI reference. |
| Solution | `/safety` | READ-ONLY. UI reference. |
| Project | `/company` | READ-ONLY. UI reference. |
| Delivery | `/careers` | READ-ONLY. UI reference. |
| Report | `/report` | THE PAGE YOU BUILD AND EDIT. |

The real file names are not known. Find them. Do not assume.

### Hard rules
1. Do NOT edit, delete, move or rename any existing HTML, CSS, JS, image, video or config file. The only allowed change to an existing file is the smallest possible edit needed to register the `/report` route (and only if the existing routing pattern needs it). Check `vercel.json` first.
2. Create new files: `report.html` (or `report/index.html`, whichever matches how the existing pages are routed), `report.css`, `report.js`, and new assets under `assets/report/`.
3. Reuse the existing UI by copying markup, CSS rules and JS functions into the new files. Do not link to or edit shared files in a way that could change the old pages.
4. Do not add libraries or build tools. Keep it plain HTML, CSS and JS.
5. Use only anchor links on `/report`. No links to the old pages.
6. The old pages must look and work exactly as before. Prove it at the end.

### UI parts worth borrowing (likely; confirm in the code)
Header and nav, large hero title, key-number stat cards, tab block, horizontal carousels (project stages, criteria), tile grid, image and caption blocks, table with pager, call-to-action block, footer, fonts, colours, spacing and scroll animations.

### Exceptions
On `/report`, Table 3 (cost) and the reference list must be shown in full. No pager, no carousel. Build simple new components for these.

---

## 5. Content rules

1. `REPORT_CONTENT.md` is the source of truth. Copy text exactly. Do not reword, shorten, fix or add anything.
2. In `REPORT_CONTENT.md`, text inside blockquotes (lines starting with `>`) is page text. Everything else is instruction to you. Never put instructions on the page.
3. Status tags: `SITE` = exact wording from the old site. `SLIDES` = team slide text, tidied. `DRAFT` = built from existing team statements, still needs team approval. `MISSING` = nothing exists yet.
4. For `MISSING` sections, insert the placeholder box (section 7). Each one is a block with status `MISSING`; its notes give the exact `insert: ...` text.
5. Keep every "TEAM TO ADD: ..." note exactly as written, with a yellow highlight, so the team can find them before submission.
6. TEMPLATE MEDIA: wherever a reused UI element would show media that is not ours (template videos, stock photos, template logos, people photos, any image not covered by a `MEDIA` block in `REPORT_CONTENT.md`), keep the element and show the exact text `(change to our assignment content)` in its place. Do not remove the element. Do not judge or fix it.
7. FIGURES: every `MEDIA` block in `REPORT_CONTENT.md` gets a frame, a number and a caption. If no image file has been supplied, the frame shows `(change to our assignment content)`.
8. Do not invent facts, numbers, quotes or citations. If something is missing, say so with a placeholder or a TEAM TO ADD note.
9. No em dashes or en dashes anywhere.
10. Every block must show its code and status badge. See section 5A.

---

## 5A. Block codes and labelling (progress tracking)

Every block in `REPORT_CONTENT.md` has a code `S.B` (section number, block number), for example `6.3`. Its meta line also has a status (SITE, SLIDES, DRAFT, MISSING, MEDIA) and a word count.

The page must show these codes so the team can see exactly how far the site has got.

1. Wrap every block in one element with `data-code="S.B"` and `data-status="STATUS"`. The code must match `REPORT_CONTENT.md` exactly. Never invent or renumber codes.
2. Show a small monospace badge at the top left of each block with the code and status, for example `6.3 SITE`. Each section heading also gets an `S6` style badge.
3. Status colours: SITE and SLIDES = green, DRAFT = amber, MISSING = red, MEDIA = blue.
4. Placeholder boxes keep their strict spec (section 7). Put the badge outside the box, above it. The box itself holds only `insert: ...`.
5. Badges are `aria-hidden`, not selectable, and hidden in print.
6. A toggle shows or hides all badges (body class, plus `?codes=off` in the URL).
7. A click on a badge copies the code to the clipboard.
8. A fixed progress panel shows: counts per status, how many TEAM TO ADD notes are left, how many media frames still show `(change to our assignment content)`, and a live body word count "N / 4000" for sections 3 to 16 (page text only, no badges, no headings, no placeholder text).
9. Word counting method (must match `fill_wordcounts.py`): count only page text from blockquote lines, split on whitespace, and count a token only if it contains a letter or digit. Markdown table separator rows are ignored.
10. Add `tools/check_report.py`. It compares `REPORT_CONTENT.md` with `/report` and reports: codes missing from the page, codes on the page that are not in the md, status mismatches, and per-block and per-section word count differences. It must not edit any file.

---

## 6. Page structure (ids)

| # | id | H2 heading on page |
|---|---|---|
| 0 | `top` | Hero (title and tagline) |
| 1 | `title-block` | Cover details |
| 2 | `summary` | Executive Summary |
| 3 | `group-declaration` | Group Declaration |
| 4 | `acknowledgement` | Team Acknowledgement |
| 5 | `project-details` | Project details |
| 6 | `background` | Background |
| 7 | `problem` | Problem Description |
| 8 | `criteria` | Design Criteria |
| 9 | `options` | Design solution options |
| 10 | `selection` | Design Selection |
| 11 | `design` | Detailed Design |
| 12 | `prototyping` | Prototyping |
| 13 | `implementation` | Implementation Plan |
| 14 | `cost` | Cost Analysis |
| 15 | `other` | Other considerations |
| 16 | `recommendations` | Recommendations |
| 17 | `references` | References |
| 18 | `appendices` | Supporting documentation |
| 19 | `closing` | Call to action and footer |

Nav bar (anchor links): Summary, Background, Options, Design, Prototype, Delivery, Cost, References, Appendices. Smooth scroll, offset for the fixed header, highlight the active section.

---

## 7. Placeholder box (exact spec)

A `div` carrying the section id, width 100%, height 20vh, background #ffffff, no border, no shadow, no border radius, display flex, content centred both ways, black text. It contains only: `insert: <section name>`.

Use it ONLY for blocks with status `MISSING` in `REPORT_CONTENT.md` (the notes name the exact `insert: ...` text).

---

## 8. Known problems in the team's own work (do NOT silently fix; mention in your reply)

1. Staffed vs unstaffed. The team's slides call the shelter "ranger-operated" and "staffed". The decided design is UNSTAFFED, self-service. The website says unstaffed. Use unstaffed everywhere.
2. Grant vs self-funded. One slide says the project is "funded through sales and rentals rather than grants". The plan is a grant for the build and sales and hire fees for running costs. Use the plan.
3. Revenue table does not add up in the base case. Base kit hires (44) at $200 would be $8,800 against $8,950 revenue, but low and high cases leave bigger gaps for sales. The 25-year profit figures are also $10 off simple multiplication. Show the table as given with a visible TEAM TO ADD note.
4. Build cost is $86,650 on the website and $86,600 on one slide. The website figure is right ($86,648.81 rounded).
5. The prototype slide lists "Medicines" as stock. The website stock list does not. An unstaffed shelter selling medicines needs checking. Leave medicines out.
6. The prototype roof looks like tiles. The website says corrugated sheeting, material to be confirmed.
7. The slides had 6 design requirements including Environmental impact. The decision matrix has 8 criteria and no environmental criterion. The website follows the matrix. The team must decide about Environmental impact.
8. Culture and Country has the lowest weight (3) in the matrix. A reader may question that. The Design Selection text explains it is also a condition for every option.
9. The template says to build on Google Sites. This team is using a Vercel site. The team must confirm with the tutor that this is accepted.
10. Reference list gaps: some slide sources are not in the website list (Jaynes 2022, Byrne et al. 2025, Bureau of Meteorology 2018, Building Centre, Queensland Government 2024, Wikipedia 2012, the SCA compressor page). Do not add them. Do not remove any entry either.
11. Prototyping has no testing evidence. The section is a placeholder until the team supplies it.

---

## 9. Definition of done

- `/report` exists, loads, and follows the order in section 6.
- Every block on the page has a badge whose code and status match `REPORT_CONTENT.md` (section 5A), and `tools/check_report.py` reports zero mismatches.
- Every blockquote in `REPORT_CONTENT.md` appears on the page, word for word, in the right section.
- Every `MISSING` section shows the placeholder box.
- Every TEAM TO ADD note is visible and highlighted.
- No old page file changed. Show `git status` and `git diff --stat` as proof.
- Works at 375px, 768px and 1440px. No horizontal scroll. No broken anchors. No console errors.
- No em dashes or en dashes in the HTML.

### Report back with
- the list of new files and any existing file you touched (and why)
- the section ids in page order
- every placeholder box inserted
- every place you used `(change to our assignment content)`
- the output of `tools/check_report.py`, plus the live body word count (sections 3 to 16)
- anything in `REPORT_CONTENT.md` that looked wrong or inconsistent. Report it. Do not fix it.
