# REPORT_CONTENT.md

This is the source of truth for the report pages, starting at `/report`. Read `PROJECT_CONTEXT.md` first.

## How to read this file

1. Text inside blockquotes (lines that start with `>`) is PAGE TEXT. Copy it word for word. Do not edit, shorten or improve it.
2. Everything outside blockquotes (bullets, notes, tables of counts) is instruction to you. Never put it on the page.
3. If something is not in this file, it does not go on the page.
4. "TEAM TO ADD: ..." inside page text is part of the page text. Keep it and highlight it.
5. Block title (the `###` line) = the heading shown on the page for that block, unless the notes say "no heading".

## Body text visibility

- Body copy renders fully visible immediately, without the word-by-word opacity reveal. This includes cover values, tutorial/team text, the acknowledgment, Proposal Summary, problem description, user needs, design criteria, cost narratives and appendix prose. Keep existing heading entrance animations.

## Mobile report layout

- Below 768px only, use 20px report gutters, fluid hero titles and a compact fixed brand/Menu bar. The phone menu contains every report destination, shows the current page, provides 48px tap targets and scrolls within the available screen height. Keep laptop and desktop presentation unchanged.
- On phones, Project Details and Background show every paragraph in normal page flow instead of pinned slide sequences. Project Details pairs each entry with its diagram. Detailed Design and Implementation figures stack at full content width so illustrations remain readable.
- Keep report tables readable with 14px cell text and horizontal scrolling inside their existing table wrappers. Mobile slide markers have 44px touch targets and footer links have at least 44px height.

## Report navigation layout

- The header is fixed at the top of the screen and spans the full width. Keep it slim with a 48px minimum bar height and 44px desktop link height; use 4px vertical bar padding on mobile. Use a translucent white background (15% opacity), an 18px backdrop blur, a faint bottom border and soft shadow. Use actual black or white header text, without colour-inversion blending. If snapshot hit testing exposes only the HTML root, preserve the current tone and retry on animation frames until the incoming page is available; do not assume a white background or rely on an animation timer. On initial render, each active-page change, when the incoming page becomes available to browser hit testing after a native snapshot transition, and on scroll and resize, inspect the painted layers underneath each label (skip transparent overlays before checking the media or solid background below them) and choose the stronger black/white contrast after the 15% white glass tint. Use white text with a fine dark outline and shadow over photos, video and gradients, and black text with a pale edge over light solid sections. Keep the dropdown white-on-dark independently of the page. Keep the glass background in a separate fixed layer and measure the navigation height with ResizeObserver so it stays aligned when links wrap. Use adaptive monochrome hover/focus text and underlines; retain the pink scroll progress line. Separate the brand from the links with a subtle vertical rule. Links have subtle translucent hover backgrounds and animated underlines, including a persistent underline for the active page. More rotates its chevron when open; its rounded dropdown fades/slides into view, with hover feedback on each entry. Disable these animations and transitions for reduced-motion users. Place “Provisions Point” at the far left, separate from the page links, in the same Zagma font at 22px and semibold (600) weight (19px on mobile). Right-align the navigation links with 24px desktop edge padding (12px on mobile). At tablet and mobile widths, let the page links wrap below the brand. Use the same F37 Zagma Serif Book font and regular (400) weight as the Background hero, sized at 18px on desktop and 15px on mobile. Load the bundled font directly with `next/font/local`, preload it and apply it explicitly to the header and dropdown; use block font display to avoid an initial fallback-font flash. Display text links for Summary, Project details, Background, Design Solutions, Detailed Design, Prototype, Implementation and Cost, followed by More. More reveals a rounded dropdown containing Other Considerations first, Recommendations second, Appendix and Supporting Documentation third, References fourth, and AI Logs as the bottom entry on mouse hover, keyboard navigation or tap. Make the More dropdown 320px wide, capped at the viewport width minus 24px so it fits on phones. Labels can wrap when needed. Links wrap on smaller screens. Do not show placeholder thumbnails beside these links.

- As requested on 28 October 2026, each navigation item opens a separate top-level page. This replaces the earlier single-page and anchor-only routing instructions in `PROJECT_CONTEXT.md` for the report. Existing reference pages remain unchanged.
- Retain all existing section content, headings, media, numbering and interactive designs. Group sections as follows, preserving their relative order within each page:

| Navigation title | Route | Existing sections |
|---|---|---|
| Summary | `/report` | 0–4: existing hero, cover, summary, declaration and acknowledgement |
| Project details | `/project-details` | 5: project details and stakeholders |
| Background | `/background` | 6–8: background, problem description and design criteria |
| Design Solutions | `/design-solutions` | 9–10: options and design selection |
| Detailed Design | `/detailed-design` | 11 |
| Prototype | `/prototype` | 12 |
| Implementation | `/implementation` | 13: six Implementation Plan questions, displayed as 9.1–9.6 |
| Cost | `/cost` | 14 |
| Other Considerations | `/other-considerations` | 15.6: placeholder only; blocks 15.1–15.5 remain archived |
| Recommendations | `/recommendations` | 16.3–16.8: guiding questions and five recommendations; blocks 16.1–16.2 remain archived |
| Appendix and Supporting Documentation | `/appendix-and-supporting-documentation` | Dedicated document-signing hero photo with the title “Appendix and Supporting Documentation”; contains Team Charter, Minutes, and the AI-use declaration |
| References | `/references` | 17 |
| AI Logs | `/ai-logs` | Student prompt and AI response logs exported for review |

- Report page links use the same shared `AppLink` as the reference pages: 800 ms outgoing zoom/fade and incoming clip reveal, using the existing global transition provider and keyframes. The report header has its own `header` snapshot, matching the reference header. Reduced-motion preferences disable the animation; local section links continue to scroll without a page transition.
- Every page retains the report header, footer and progress panel. Header and footer navigation link to these routes and the header identifies the current page. Progress counts describe the current page's rendered content. Hide the progress menu and block labels by default on every screen size. Add `?progress=on` to a page URL to show the menu with progress collapsed and labels off; `?codes=on` shows the menu with labels enabled. The menu buttons can expand progress and toggle labels. Labels and their reserved spacing stay hidden from the initial render.
- Each of the twelve report subpages starts with a report-only copy of the `/careers` hero: same full-viewport height, Zagma heading, responsive sizes, cover image crop, gradient, sticky title, parallax and word reveal. Each subpage uses topic-relevant internet media, described and credited in the hero media register below. Project details and Background use videos; the other ten use photographs. The title is exactly its navigation label, with no subtitle. Keep existing body headings even when repeated by the hero. Summary retains its original hero and montage.
- Appendix and Supporting Documentation appears immediately above References in the header’s More dropdown and in the shared footer navigation. Use `/appendix-and-supporting-documentation` as its URL, with the renamed navigation label, hero title and browser title. Retain Team Charter, Minutes, and section 11.3 with its navigation link. The separate `/appendices` page and its navigation entries are removed; that URL returns 404. Redirect the former `/supporting-documents` URL permanently to the renamed page. Page labels navigate on the first tap; a separate mobile chevron button opens the heading submenu.
- Subpage heroes use the locally stored media listed below, replacing the original Careers placeholder image.
- Project details was separated from Summary on 28 October 2026. Its existing carousel, stakeholders, content and section numbering remain unchanged; the shared page hero displays "Project details".
- Cross-page links: the plan opens `/implementation`; Acknowledgment opens `/report#acknowledgement`; montage image references open `/references#references`. "Ask a question" remains a local footer link.

## Heading dropdown navigation

- Every page destination in the report header has a heading dropdown using the same dark background, rounded corners, white text, row hover styling and reduced-motion behaviour as More. Keep page names as direct page links without dropdown arrows; only More keeps its page-menu arrow. Hover opens each page dropdown; Arrow Down enters it; Escape closes it; moving focus or clicking outside dismisses it. On phones, the first tap on a page name opens its outline and a second tap opens the page. Parent headings within outlines retain their expand/collapse arrows.
- Dropdown entries use the numbered headings in page order. Indent subheadings by 16px relative to main headings. Group subheadings beneath their parent heading with an arrow button that expands or collapses that group; groups start collapsed. Limit the entire visible label, including its number and an ellipsis when shortened, to 30 characters; retain the full heading in its title tooltip. Keep the full website headings unchanged. Widen dropdowns to 460px, capped at the viewport width minus 24px, and keep labels on one line; use visual ellipsis if the phone viewport is narrower than the text.
- More retains the additional page destinations, each with an expandable heading outline. On phones the Menu contains all page destinations with the same expandable outlines; keep the panel within the viewport and allow vertical scrolling.
- Heading links use stable report-heading anchors and reveal the selected slide when content is scroll-controlled. AI Logs retains its unnumbered page label and a direct AI Logs link; no AI conversation content or numbering is changed. Exclude hero titles, captions and shared footer headings from outlines.

## Visible heading numbering

- Use the approved page-based heading scheme: `P.H` for main headings and `P.HS` for subheadings (for example, `1.4`, `1.41`, `1.42`). Replace earlier visible heading prefixes; internal section/block codes stay unchanged.
- Page order: 1 Summary, 2 Project details, 3 Background, 4 Design Solutions, 5 Detailed Design, 6 Prototype, 7 Implementation, 8 Cost, 9 Other Considerations, 10 Recommendations, 11 Appendix and Supporting Documentation, 12 References. AI Logs is excluded: leave all AI Logs content and titles unchanged.
- Hardcoded body headings: 1.1 Acknowledgment; 1.3 Overview of Design; 1.6 Group Declaration; 3.1 Background; 3.2 Problem Description; 3.3 Design Criteria; 4.1 Design Options; 4.2 Design Selection; 8.1 Cost Analysis; 9.1 User Journey Map; 12.1 References. Other numbered headings are recorded in their block titles or heading lines below.
- Exclude hero titles and the cover details inside Summary's hero, shared header/footer, captions, diagram labels, table rows, and existing figure/card sequence labels. Number the six Detailed Design operating-step headings 5.31–5.36. Flatten Team Charter's extra heading depth to 11.11–11.15.
- Number Recommendations directly at the start of each heading, replacing its separate old 12-series labels. Design-option references and their anchor targets use 4.11–4.13. These visible numbers override older numbering examples in layout notes below.

## Codes

Every block has a code `S.B` (section number, block number), for example `6.3`. Section 6 is Background. Block 6.3 is the third block in it. The page must label every block with its code (see the labelling prompt). Codes never change once used. If a block is added later, give it the next free number in its section.

## Status tags

| Status | Meaning |
|---|---|
| SITE | Exact wording from the team's old website. Ready. |
| SLIDES | From the team's slides or the EWB brief, tidied. Ready unless a note says check. |
| DRAFT | Built only from existing team statements. Needs team approval before submission. |
| MISSING | Nothing exists yet. Show the placeholder box named in the notes. |
| MEDIA | A figure frame. Show the caption. If no image file is supplied, the frame shows `(change to our assignment content)`. |

## Word counts

Counts are computed from the page text in each block. They include table cells, captions and TEAM TO ADD notes. They exclude headings and codes. "Target" is the estimated length of a MISSING block once written. The rubric scores body length against 4000 words. Sections 3 to 16 are treated as the body (the Executive Summary, cover details, references and appendices are excluded). Confirm with the tutor whether the Group Declaration and Acknowledgement count.

<!-- WORDCOUNT-TABLE-START -->

| Section | Title | id | Blocks | Words now | Words to add (MISSING targets) | Projected | Counts toward 4000 | MISSING blocks | DRAFT blocks |
|---|---|---|---|---|---|---|---|---|---|
| 0 | Hero | `top` | 2 | 12 | 0 | 12 | no | 0 | 0 |
| 1 | Cover details | `title-block` | 4 | 61 | 0 | 61 | no | 0 | 0 |
| 2 | Executive Summary | `summary` | 8 | 395 | 0 | 395 | no | 0 | 4 |
| 3 | Group Declaration | `group-declaration` | 1 | 70 | 0 | 70 | yes | 0 | 0 |
| 4 | Acknowledgment | `acknowledgement` | 1 | 72 | 0 | 72 | yes | 0 | 0 |
| 5 | Project details | `project-details` | 6 | 309 | 0 | 309 | yes | 0 | 0 |
| 6 | Background | `background` | 7 | 397 | 0 | 397 | yes | 0 | 0 |
| 7 | Problem Description | `problem` | 2 | 146 | 0 | 146 | yes | 0 | 1 |
| 8 | Design Criteria | `criteria` | 8 | 404 | 0 | 404 | yes | 0 | 0 |
| 9 | Design Solutions | `options` | 4 | 378 | 0 | 378 | yes | 0 | 0 |
| 10 | Design Selection | `selection` | 2 | 140 | 0 | 140 | yes | 0 | 0 |
| 11 | Detailed Design | `design` | 6 | 404 | 0 | 404 | yes | 0 | 0 |
| 12 | Prototype | `prototyping` | 8 | 432 | 0 | 432 | yes | 0 | 0 |
| 13 | Implementation Plan | `implementation` | 6 | 414 | 0 | 414 | yes | 0 | 0 |
| 14 | Cost Analysis | `cost` | 10 | 566 | 0 | 566 | yes | 0 | 0 |
| 15 | Other considerations | `other` | 6 | 267 | 0 | 267 | yes | 1 | 0 |
| 16 | Recommendations | `recommendations` | 8 | 240 | 0 | 240 | yes | 0 | 0 |
| 17 | References | `references` | 1 | 907 | 0 | 907 | no | 0 | 0 |
| 18 | Supporting documentation | `appendices` | 2 | 118 | 0 | 118 | no | 1 | 0 |
| 19 | Project team and footer | `closing` | 2 | 14 | 0 | 14 | no | 0 | 0 |
| 20 | Minutes | `minutes` | 0 | 0 | 0 | 0 | no | 0 | 0 |
| 21 | Team Charter | `team-charter` | 0 | 0 | 0 | 0 | no | 0 | 0 |
| | **Body (sections 3 to 16)** | | | **4239** | **0** | **4239** | | | |
| | **Whole page** | | 94 | **5746** | | | | | |

Per-block counts are in each block's `words` field below.

<!-- WORDCOUNT-TABLE-END -->

---

## SECTION 0: Hero (id: top)
- **section words:** 12 | **counts toward 4000:** no

### [0.1] Hero title and tagline
- **code:** 0.1 | **status:** SITE | **words:** 12 | **source:** Home page hero
- layout: line 1 is the H1, line 2 is the tagline under it.

> Provisions Point
> A proposed supply and recovery shelter for Lama Lama Country.

### [0.2] Hero media
- **code:** 0.2 | **status:** MEDIA | **words:** 0 | **source:** User-supplied video, 28 October 2026
- media: Summary (`/report`) uses the full user-supplied `12901857_3840_2160_60fps.mp4`, supplied from `/Users/darrell/Downloads/12901857_3840_2160_60fps.mp4`. Serve the optimized 1920 × 1080 H.264 MP4 at `/assets/home/report-summary-hero.mp4` with the matching poster `/assets/home/report-summary-hero.jpg` extracted at one second. Retain muted, looping, inline autoplay and the existing reduced-motion poster behaviour. Source: Marc Espejo, “Aerial view of expansive wetlands landscape” (4 January 2025), Pexels, https://www.pexels.com/video/aerial-view-of-expansive-wetlands-landscape-30081634/, under the Pexels License (https://www.pexels.com/license/). The matching poster is derived from the same footage. Full citation appears in reference block 17.1. Other pages retain their existing media.

---

## SECTION 1: Cover details (id: title-block)
- **section words:** 61 | **counts toward 4000:** no
- layout: cover details in the hero, above the acknowledgement montage. Use a wider (maximum 1100px) dark translucent panel with a visible border and larger text (18–24px for detail rows). Keep each label and value together in one paragraph, for example "Design Area: 2. Eco-tourism and Visitor Experience"; longer values wrap naturally. Show the tutorial/team text beneath the rows at 20px. Detail rows use uniform 12px vertical padding, 1.4 line height, and no extra gaps between blocks. Page scrolling first reveals the cover, then scrolls through all overflowing cover content while holding the hero transition; the fade and shrink resume after the cover reaches the bottom. The extra scroll distance adapts to the viewport and cover height.

### [1.1] Website title (removed)
- **code:** 1.1 | **status:** SITE | **words:** 0 | **source:** Removed by the user, 26 October 2026
- note: do not render this row in the cover details. Keep the main Provisions Point hero title.

### [1.2] Design Area and Project Opportunity
- **code:** 1.2 | **status:** SLIDES | **words:** 13 | **source:** EWB Challenge website (Design Area 2) and EWB brief (Opportunity 2.1)

> Design Area: 2. Eco-tourism and Visitor Experience
> Project Opportunity: 2.1 Resilient visitor infrastructure

### [1.3] How Might We statement
- **code:** 1.3 | **status:** SLIDES | **words:** 43 | **source:** Slide 4, tidied (see edits log)

> How Might We statement: How might we make a Lama Lama Country campground safer for visitors, more resilient to floods and unreliable roads, with low capital investment and without adding more maintenance duties to Rangers, while protecting the region's cultural and ecological values?

### [1.4] Tutorial and team
- **code:** 1.4 | **status:** SITE | **words:** 5 | **source:** Confirmed by the user, 26 October 2026
- layout: plain text below the cover details in the hero.

> Tutorial 4, Team 3 (FatZCC)

---

## SECTION 2: Executive Summary (id: summary)
- **section words:** 395 | **counts toward 4000:** no
- note: this follows the EWB executive summary format. Do not alter the order of the blocks. Heading styles: title Heading 1, section headings Heading 2.

### [2.1] Snapshot (removed)
- **code:** 2.1 | **status:** SITE | **words:** 0 | **source:** Removed by the user, 26 October 2026
- note: retain the code but do not render this block.

### [2.2] Design Area(s) (removed)
- **code:** 2.2 | **status:** SLIDES | **words:** 0 | **source:** Removed by the user, 26 October 2026
- note: retain the code but do not render this block. The Design Area row remains in the hero's cover details (1.2).

### [2.3] Keywords
- **code:** 2.3 | **status:** DRAFT | **words:** 11 | **source:** Built from the team's own text
- layout: render once as a labelled row in the hero's cover details panel, after the How Might We statement. Retain code 2.3; do not render a second copy in the Executive Summary.

> Keywords: Visitor security, flood resilience, remote infrastructure, emergency supplies, vehicle recovery.

### [2.4] 1.2 Proposal Summary
- **code:** 2.4 | **status:** SITE | **words:** 46 | **source:** Home page
- layout: show the "Proposal Summary" heading and this paragraph above the large "Overview of Design" heading.

> This project aims to give visitors to Warokutal (Safari Camp) access to water, supplies and vehicle recovery equipment when floods damage the roads. It proposes an elevated, minimal maintenance shelter that stocks essentials and hires out recovery kits, personal locator beacons and ultra high frequency radios.

### [2.5] Overview of design: summary
- **code:** 2.5 | **status:** SITE | **words:** 147 | **source:** User-provided text, 28 October 2026
- layout: reuse the Design Solutions story layout, styling, counter, image transitions and desktop/mobile scroll animations. Retain the Overview pink scroll-progress line animation (vertical on desktop and horizontal on mobile, respecting reduced motion) alongside the shared point navigation beside the story content: four horizontal line markers in a vertical stack below the counter on desktop and between the counter and paragraph on mobile. Resting lines are 9px wide; hovering or focusing a marker extends it to 28px, its immediate neighbours to 22px and next neighbours to 15px. Show point numbers 1–4 in a bubble to the right and highlight the active point. Selecting a marker centres its paired paragraph in the viewport on desktop or in the horizontal swipe area on mobile, keeping the counter and diagram in sync. Retain the horizontal rows of vertical markers on Background and Project details. Show "Overview of Design" as the large heading below the Proposal Summary heading and paragraph (2.4), then the four supplied points as four story slides in order. Do not render the former "Overview of design: summary" subheading. Do not show individual slide headings; display each supplied point as a paragraph with larger responsive text (18–22px, regular 400 weight, black, line height 1.6) and no heading gap above it. Paragraphs remain fully opaque without per-word reveals. On desktop, snap the nearest point to the viewport centre after scrolling settles within the story, while allowing free entry and exit. Keep the counter and diagram aligned to the nearest point. On mobile, snap each horizontal paragraph to the centre. Respect reduced-motion preferences when snapping. Use four original vector diagrams in slide order: building elevation, operating workflow, annotated cutaway and flood-response journey. Fit the complete diagrams in the image panel without cropping or zooming; include accessible descriptions and no caption beneath them. Keep the following stats, considerations, materials and figures below this story.


- diagrams: authored directly in `app/report/ReportOverviewDiagram.tsx`, with shared styling in `app/report/ReportOverviewDiagram.module.css`. These original project illustrations replace the generic overview photographs; no external image source is used for these diagrams.
- diagram 1: side elevation showing the floor 2 m above ground on reinforced concrete piles, the seasonal Ranger service area and the emergency cabinet available at all times. The dimension measures ground to floor; no flood clearance is asserted.
- diagram 2: community partnerships, stocking, Ranger operation and maintenance, with a note about flood guidance signage.
- diagram 3: building cutaway identifying watertight concrete walls, corrugated fibre cement roofing, solar lighting and charging, supplies and hire equipment.
- diagram 4: Visitors, Traditional Owners and Rangers travelling through Warokutal, unusable roads during or after flooding, and access to supplies and equipment at Provisions Point. Distinguish the outside-hours emergency cabinet from seasonal staffing.

> The design improves flood resilience and supply security through an elevated, low-maintenance building staffed by Lama Lama Rangers during the visitor season, with a small emergency cabinet available at all times.
> The implementation of this design is supported through durable, low-maintenance materials, local community partnerships to aid with stocking and maintenance, and clear signage guiding users when flooding occurs.
> The building sits 2 m above ground on reinforced concrete piles, with watertight concrete walls and a corrugated fibre cement roof. It stocks drinking water, non-perishable food, firewood and first-aid supplies, and hires out vehicle recovery kits, personal locator beacons and UHF radios. A small solar system powers the lighting and charges the radios and beacons.
> Visitors, Traditional Owners and Rangers travelling through Warokutal will use this facility, either during or immediately after severe floods when unsealed roads become unusable, stranding travellers without immediate access to rescue services.

### [2.6] Overview of design: key points (removed)
- **code:** 2.6 | **status:** DRAFT | **words:** 0 | **source:** Removed by the user, 26 October 2026
- note: retain the code but do not render this block.

### [2.7] Key numbers (removed)
- **code:** 2.7 | **status:** DRAFT | **words:** 0 | **source:** Removed by the user, 26 October 2026
- note: retain the code but do not render this block. The three stat cards and their placeholder images are removed.

### [2.8] 1.4 Key Considerations
- **code:** 2.8 | **status:** DRAFT | **words:** 191 | **source:** User-provided content, 26 October 2026
- layout: large Key Considerations heading followed by four editorial rows separated by thin rules, with muted 01–04 labels, bold questions in the middle and unchanged answers on the right. Questions and answers render at full opacity from the start, with no text reveal animation. On mobile, answers sit beneath their questions. Implementation retains three numbered steps. No cards or images in this block. Blank blockquote lines separate each question group.

> 1.41 Where the recommended materials are sourced from? (i.e. externally or locally available)
> Reinforced concrete piles, watertight concrete and corrugated fibre cement sheeting, chosen for their resistance to flooding, termites, corrosion and cyclone winds. Materials will be sourced from regional suppliers and delivered during the dry season.
>
> 1.42 What are the key maintenance requirements?
> Rangers restock weekly during the visitor season (July to November) and carry out two inspections a year, before and after the wet season. Hire gear is checked on return, and damaged items are repaired or replaced. Structural or electrical faults are handled by qualified contractors.
>
> 1.43 How do you propose the design might be implemented?
> Community consultation with Lama Lama Traditional Owners and local land councils to finalise placement and cultural protocols.
> Dry season construction by a crew of four, taking about eight weeks.
> A four hour training session for Rangers, with an instruction manual kept on site.
>
> 1.44 What additional consultation/feedback/research might be required to validate your design proposal? What might the next steps be to make this idea happen?
> Conduct flood-height assessments with Traditional Owners to confirm the right building height. Seek YAC approval, which takes about six months.

### [2.9] 1.5 Proposed Materials and Cost Summary
- **code:** 2.9 | **status:** DRAFT | **source:** User-provided summary estimates, 28 October 2026
- layout: centered heading, then a full-section-width 34px horizontal stacked bar (30px on phones) above the eight square cards. No chart panel or enclosing decorative parent. The sum of listed costs appears above the bar and a compact item detail readout below it, followed by the cards with tight 16px horizontal / 24px vertical gaps. Cards form two rows of four on desktop, two columns on tablets and one on narrow phones. The bar has seven segments proportional to the $87,386 sum of listed costs, including contingency, matching colours and item numbers in cards and legend. Hover, keyboard focus, or click/tap to pin highlights a segment and its matching card and table row; clicking again unpins, Escape clears the pin and keyboard focus. Segments lift and glow, with reduced-motion support. Percentages and item numbers appear in the bar on desktop, numbers only on narrow phones. The eighth card shows the $87,387 estimated total, which is not an additional cost item. The legend table sits below the cards. Omit the introductory paragraph, chart subtotal label, idle interaction hint, visible table captions and budget discrepancy note; keep the subtotal amount and active item readout.
- photographs: fill the first seven square cards with the photographs in the Summary materials photograph register below, cover-cropped with a dark gradient so the existing item number and price stay readable. Add a linked photo credit below each item label. Keep the estimated total card without an image. The graph, table, cost amounts and interactions remain unchanged.


### [2.10] 1.51 Cost breakdown
- **code:** 2.10 | **status:** DRAFT | **source:** User-provided summary estimates, 28 October 2026

> | Item | Approximate cost (AUD) |
> |---|---|
> | Frame, walls and roof | $38,592 |
> | Piles, deck and stairs | $20,000 |
> | Shelves, counter, solar panel and battery | $5,000 |
> | Recovery kits, PLBs and UHF radios | $2,756 |
> | Water, food, firewood and safety flyers | $738 |
> | Design documents | $5,859 |
> | Contingency (20%) | $14,441 |

### [2.11] Estimated Total Cost
- **code:** 2.11 | **status:** DRAFT | **source:** User-provided estimated total, 28 October 2026
- layout: eighth square card shows $87,387 AUD. Include the estimated total as the table footer, outside the graph breakdown. No explanatory note appears below the cost table. These summary estimates do not replace the separate detailed Cost Analysis tables in Section 14.

> $87,387 AUD

---

## SECTION 3: Group Declaration (id: group-declaration)
- **section words:** 70 | **counts toward 4000:** yes

### [3.1] 1.61 Team member contributions
- **code:** 3.1 | **status:** SITE | **words:** 70 | **source:** Project page, The team
- layout: a 2-column table with the caption above it. Member image tiles: `(change to our assignment content)`. Omit the website-contributions TEAM TO ADD note.

> Table 1. Team member contributions to Assessment Task 3 Website
> | Group Member Name | Project Contributions |
> |---|---|
> | Joud | Background, Journey Map, APA reference list, Appendix 1,2,3 |
> | Pinhong | Implementation plan, Cost analysis, prototype, Appendix |
> | Darrell | Website Development, Appendix, reference list, prompt log |
> | Tasneef | Design solution options, design criteria, design selection, detailed design, editing and formatting, Appendix, executive summary |
> | Isaac | Background, Problem description, design criteria, Appendix |
> | Qijun | Design solution option, Detailed design, recommendations, Appendix |

---

## SECTION 4: Acknowledgment (id: acknowledgement)
- **section words:** 72 | **counts toward 4000:** yes

### [4.1]
- **code:** 4.1 | **status:** SITE | **words:** 72 | **source:** Wording supplied by the user, 28 October 2026
- layout: render the acknowledgement text in the montage below the hero under "Acknowledgment", without a block subheading. The montage heading and body use 30px text on desktop and 22px on mobile. Keep the `acknowledgement` anchor on this content for existing links. Remove the old standalone acknowledgement image placeholder and its `EDIT HERE TEXT` body from the Summary page.

> We would like to acknowledge the Gadigal people, the Boorooberongal people of the Dharug Nation, the Bidiagal people and the Gamaygal people upon whose ancestral lands our university stands. We would also like to pay respect to the Elders both past and present, acknowledging them as the traditional custodians of knowledge for these lands. We also acknowledge the Lama Lama people, the Traditional Owners of the Country this project is designed for.

---

## SECTION 5: Project details (id: project-details)
- **section words:** 309 | **counts toward 4000:** yes
- Content order: render four slides: block 5.1 (1.1 context), block 5.6 (1.2 importance), block 5.2 (1.3 design area), and block 5.3 (1.4 needs statement). Preserve existing block codes; 5.6 is the next unused code. Use the exact user-supplied headings and paragraphs below, excluding pasted line-break escapes and the trailing HTML space entity.
- Text sizing: enlarge the headings and paragraphs across all four Project details slides. Desktop headings use `clamp(28px, 5.5svh, 40px)` with 1.15 line height; paragraphs use `clamp(20px, 3.8svh, 30px)` with 1.3 line height. Below 768px, headings use 34px and paragraphs use 18px with 25.2px line height. Keep the exact wording, existing illustrations and slide controls.
- layout: omit the repeated “Project details” heading inside the section. Show each block’s numbered question as the slide heading above its existing paragraph on desktop and mobile. Keep the page hero title unchanged. Replace the generic overlapping image placeholders with original SVG diagrams for points 1.1–1.3 and a generated illustration for point 1.4, implemented in `app/report/ReportDetailsVisual.tsx`. The diagram column uses at most 40% of the desktop row, capped at 440px; mobile diagrams sit above the text and are capped at 360px for legible labels. Keep the wider text column and the existing scroll-driven slide changes. Paragraphs appear fully visible immediately on each slide, without word-by-word reveals or opacity fades. Add circular previous and next arrow buttons beside the slide counter, with accessible labels, visible keyboard focus and 48px targets. Disable previous on the first slide and next on the last slide. Add the same shared horizontal row of vertical line navigation used by Background between the counter and arrows, with one marker per project detail (1.1–1.4). Hover or keyboard focus grows the selected marker to 28px, its immediate neighbours to 22px and next neighbours to 15px, from a 9px resting height. Show the point number in a bubble above the marker and highlight the current slide. Activating a marker uses the existing scroll selection function so text, diagram, counter and markers stay in sync. Wrap the marker row below the controls on narrow phones and respect reduced motion. Each button moves directly to the middle of the selected slide’s scroll interval so the question, paragraph, diagram and counter stay in sync with manual scrolling, including reduced motion. Diagrams resize without animation and respect reduced motion. Remove the bottom caption strips and their divider lines from all four visual cards so each card ends after the artwork. Keep diagram labels and accessible descriptions, excluded from the body word count. Retain the location source in this documentation and the existing reference list rather than below the diagram.
- visual 1 / block 5.1: **The setting**. Original simplified location diagram of Cape York Peninsula with north arrow, Coen, Warokutal, Port Stewart, Lama Lama Country, and the road access highlighted. Legend: “Wet season flooding can disrupt access”. Accessible description: “Simplified location diagram of Cape York Peninsula, showing Coen and access towards Warokutal at Port Stewart in Lama Lama Country. The highlighted road represents access affected by wet season flooding; it does not show current road conditions or Country boundaries.” Documented location source: Lama Lama Country, https://www.lamalama.org.au/visiting/ (Yintjingga Aboriginal Corporation; accessed 28 October 2026; existing reference in block 17.1). No external map artwork or photographs are reproduced. Location relationships are simplified, without Country boundaries or a current road-status claim.
- visual 2 / block 5.6: **From disruption to support**. Four connected steps: “01 Flooding closes roads / Unsealed access becomes unusable”; “02 Travellers become stranded / Supplies and support may be far away”; “03 Access the supply point / Essentials, communication + recovery kits”; “04 Manage the disruption / Reduce the need for risky interventions”. Closing label: “Protect cultural + environmental assets”. Caption: “Local supplies help visitors manage weather disruptions.” Accessible description: “Four connected steps: flooding closes roads, travellers become stranded, the supply point provides essentials and communication, and visitors manage the disruption. The intended outcome is fewer high risk ranger interventions and protection of cultural and environmental assets.” Based on the user-supplied project text; no external image assets.
- visual 3 / block 5.2: **The supply point**. Original annotated shelter drawing, with raised floor and support piles. Labels: “Water + long shelf life rations”, “Radios + PLBs”, “Vehicle recovery equipment”, “Raised floor”, and “Essential supplies in one place”. Caption: “An elevated supply point brings essentials together.” Accessible description: “An elevated shelter with a raised floor and supporting piles. Labels identify water and long shelf life rations, radios and personal locator beacons, and vehicle recovery equipment.” Based on the user-supplied project text; no external image assets.
- visual 4 / block 5.3: **Dependable access to essentials**. Original illustration generated with the built-in imagegen tool, saved as `app/report/assets/project-details-needs.webp` (1340 × 1174, optimized WebP), and imported locally by `ReportDetailsVisual.tsx`. Two travellers use an elevated supply shelter with water, canned food, recovery gear and a handheld radio; a parked four-wheel-drive and an eroded road establish the disrupted access. Use the existing diagram card and responsive width without cropping the illustration. Caption: “Concept illustration · supplies and communication when roads are damaged.” Alt text: “Concept illustration of two travellers at an elevated supply shelter in remote bushland. One accesses water and food while the other uses a handheld radio. Recovery equipment is stored below the shelves, a four-wheel-drive is parked on dry ground, and an eroded road is visible in the distance.” Palette: cream, sage, olive, muted blue, tan and terracotta. It is a proposed concept, with no external source image. Full generation prompt: `app/report/assets/project-details-needs-prompt.txt`.

### [5.1] 2.1 The context of your project
- **code:** 5.1 | **status:** SITE | **words:** 118 | **source:** Wording supplied by the user, 28 October 2026

> The primary target audience for the project consists of independent travellers and managers of local tourism facilities that operate within Lama Lama country on the Cape York Peninsula. Warokutal (Safari Camp) is a remote campground at Port Stewart, reached by roads that can become impassable in the wet season, so the national park is typically closed from 1 December to 30 June (DETSI, 2024a). The park offers remote, low-key, self-reliant visitor experiences (QPWS, 2013), but the Ranger Base is staffed only from about 8 am to 4:30 pm and campground water is non-potable (YAC, n.d.). Visitors who get stuck can be left without water, supplies or a way to call for help, which is why this project matters.

### [5.6] 2.2 Why is this important?
- **code:** 5.6 | **status:** SITE | **words:** 74 | **source:** Wording supplied by the user, 28 October 2026

> For local tourism facility managers and rangers, the project addresses a critical operational gap. By establishing a durable supply point, the facility aims to reduce recurring emergency repair expenses and minimises the need for high-risk ranger interventions during flooding seasons’ extreme weather events. The project ultimately bridges the gap between the risks associated with tourism and wet season flooding, ensuring visitors can manage unexpected weather disruptions while safeguarding Lama Lama’s cultural and environmental assets.

### [5.2] 2.3 Which Design Area and Project Opportunity (Topic) has your group selected?
- **code:** 5.2 | **status:** SITE | **words:** 48 | **source:** Wording supplied by the user, 28 October 2026

> This project responds to Design Area 2, Eco-tourism and Visitor Experience, and Design Opportunity 2.1, Resilient visitor infrastructure, and focuses on Warokutal. The design is an elevated, low maintenance supply point that gives stranded visitors dependable access to water, long shelf-life food, radios, PLBs and vehicle recovery equipment.

### [5.3] 2.4 What is your needs statement?
- **code:** 5.3 | **status:** SITE | **words:** 35 | **source:** Wording supplied by the user, 28 October 2026

> The needs statement is that visitors to Warokutal need dependable access to water, supplies, recovery equipment and a way to call for help when roads are damaged, without adding to the workload of the Rangers.

### [5.4] How might we statement (removed)
- **code:** 5.4 | **status:** SLIDES | **words:** 0 | **source:** Replaced by the three user-supplied project details points, 28 October 2026

### [5.5] Stakeholders and organisations
- **code:** 5.5 | **status:** SITE | **words:** 34 | **source:** Project page, overview photo carousel (heading renamed)
- layout: removed from Project details at the user’s request on 28 October 2026, including the heading, decorative photo carousel and screen-reader organisation list. The organisation text below is retained as source material only and is not rendered. Background keeps its separate slideshow documented in Section 6.

> Yintjingga Aboriginal Corporation
> Lama Lama Rangers
> Engineers Without Borders Australia
> University of Technology Sydney
> Queensland Parks and Wildlife Service
> Cook Shire Council
> Department of the Environment, Tourism, Science and Innovation
> National Indigenous Australians Agency

---

## SECTION 6: Background (id: background)
- **section words:** 397 | **counts toward 4000:** yes
- layout: replace the separate carousel and nine Background tabs with a seven-slide scroll-driven Background slideshow after the page hero. Each slide shows its numbered heading (2.1–2.7) and exact user-supplied paragraph above the five-card, full-viewport-width carousel. All seven paragraph–card pairings remain in the data; only five cards render at once, with two off-screen cards returning as scrolling changes the active paragraph. Match the home page’s “Built with Lama Lama Country in mind” carousel animation: retain outgoing cards during the 0.8-second transition, immediately place them behind the stack, and shrink their image window to half size while moving it 20px right. Incoming windows slide in from 100% right while their image crops zoom from 1.5 to 1. Use the same [0.77, 0, 0.175, 1] easing, disable initial mount animations, and use zero duration for reduced motion. Five cards occupy the settled layout; outgoing cards remain briefly during their exit. Explicitly restore each active card’s stacking level and its window’s full scale and zero horizontal offset when an interrupted exit is reversed, so rapid back-and-forth scrolling cannot leave a visible card behind the stack or shrunken. Scrolling forward or back through equal intervals changes the text and brings its permanently paired card into the largest right-hand slot. Keep the existing 11.9vw–24.5vw card height range. Disable timed autoplay for this slideshow. Include previous/next buttons and a slide counter for keyboard and touch access. Replace “Scroll to explore” with a horizontal row of seven vertical, bottom-aligned line buttons, one per paragraph. Highlight the current point with a dark line. On hover or keyboard focus, increase that marker’s height to 28px, its immediate neighbours to 22px and the next neighbours to 15px, leaving the other lines at 9px. Show its point number (2.1–2.7) in a small rounded bubble above the marker. Animate line heights over 0.2 seconds, without transitions for reduced motion. Clicking or activating a marker selects its paired slide. Wrap the horizontal marker row below the counter and arrows on narrow phones; respect reduced motion. Do not show the standalone floodwater concept image or its Figure 3 caption below the slideshow. Project details no longer renders the stakeholders carousel.

- Background text sizing and spacing: use 22px paragraph text on desktop and 20px on mobile throughout the Background page, including Problem Description, the user needs statement and Design Criteria, with responsive 24–32px slide headings. Let the text area follow its content height instead of reserving a fixed minimum height, and use an 8px top margin above the slide navigation to keep the controls close to the paragraph.

- Background slideshow copy width: increase the centered heading, paragraph and slide navigation container's maximum width from 1000px to `calc(1000px + 30vh)`, capped by the available content width. Keep the carousel cards and their layout unchanged.

- Background carousel photographs: use the seven local WebP assets listed in the Background carousel image credits below, permanently paired to blocks 6.1–6.7 in that order. Preserve the existing carousel animation, card sizing and navigation. Serve local files, not hotlinks.

### [6.1] 3.11 Lama Lama Country and its climate
- **code:** 6.1 | **status:** SITE | **words:** 85 | **source:** User-supplied Background paragraphs, 28 October 2026

> Lama Lama Country is located on the eastern coast of the Cape York Peninsula, Queensland. The region experiences a tropical monsoon climate that is characterised by wet and dry seasons. Between October and April, the land experiences heavy and extensive rainfall, where historical data showed that early wet season (October to December) experiences concentrated precipitation that acts as a catalyst for sudden flash flooding. This impacts unsealed roads that connect remote camping areas such as Warokutal and Maramba and isolate visitors from external emergency services.

### [6.2] 3.12 Cultural and environmental significance
- **code:** 6.2 | **status:** SITE | **words:** 55 | **source:** User-supplied Background paragraphs, 28 October 2026

> The landscape holds profound spiritual, historical and cultural significance for the Lama Lama Traditional Owners, who manage the region alongside the Queensland Parks and Wildlife Service. Because travel through the national park and surrounding areas is restricted as it is culturally and environmentally sensitive, any infrastructure intervention must respect sacred sites and minimise ecological disruption.

### [6.3] 3.13 Maintenance and remote safety
- **code:** 6.3 | **status:** SITE | **words:** 60 | **source:** User-supplied Background paragraphs, 28 October 2026

> Furthermore, since regional infrastructure is traditionally maintained reactively rather than proactively, leaving remote sites vulnerable to severe weathering damage, the aim is to build something that needs to be maintained as little as possible. Currently, the Port Stewart Ranger Base serves as the primary safety outpost that is staffed, for the entire region, leaving remote camps exposed during weather emergencies.

### [6.4] 3.14 Unpredictable wet-season rainfall
- **code:** 6.4 | **status:** SITE | **words:** 29 | **source:** User-supplied Background paragraphs, 28 October 2026

> Rainfall in the early wet season (October to December) varies widely from year to year, which leads to flooding that is both widespread and sudden (Bureau of Meteorology, 2018).

### [6.5] 3.15 Flood damage and visitor emergencies
- **code:** 6.5 | **status:** SITE | **words:** 47 | **source:** User-supplied Background paragraphs, 28 October 2026

> During the rainy season, buildings and equipment are susceptible to damage from flash floods and sudden downpours, necessitating significant capital for repairs before they can be used again for tourism. For visitors, the lack of any nearby shelter or supply point makes emergencies extremely hard to manage.

### [6.6] 3.16 Existing campgrounds and safety points
- **code:** 6.6 | **status:** SITE | **words:** 47 | **source:** User-supplied Background paragraphs, 28 October 2026

> Camping is currently kept outside the national park boundary, at the nearby campgrounds of Warokutal and Maramba (DETSI, 2024a). There is no alternative to visitors bringing their own recovery equipment. The Ranger Base at Port Stewart is currently the only staffed safety point for the whole area.

### [6.7] 3.17 Project aims and community consultation
- **code:** 6.7 | **status:** SITE | **words:** 74 | **source:** User-supplied Background paragraphs, 28 October 2026

> The project aims to improve visitors’ access to essential supplies at Warokutal (Safari Camp), particularly when wet-season flooding disrupts road access. It seeks to develop an affordable, flood-resilient solution that reduces maintenance and repair demands on rangers. The design should minimise disturbance to the surrounding environment and protect culturally significant areas. Consultation with Traditional Owners should guide the design and its implementation to ensure that the proposed solution respects community need and cultural values.

---

## SECTION 7: Problem Description (id: problem)
- **section words:** 118 | **counts toward 4000:** yes
- layout: display the Warokutal problem paragraph (block 7.2) first, directly below Problem Description, without its own subheading or visible 3.2 number. Follow it with the 3.1 User needs statement heading and paragraph (block 7.1). Block 7.2’s title below is retained as source metadata only.

### [7.1] 3.21 User needs statement
- **code:** 7.1 | **status:** SLIDES | **words:** 32 | **source:** User-supplied text, 28 October 2026

> User needs statement: Visitors require consistent access to essential resources, water, and safety information to manage the risks associated with remote travel, unpredictable weather, and extended stays within Lama Lama National Park.

### [7.2] 3.2 The problem and the ideal situation
- **code:** 7.2 | **status:** DRAFT | **words:** 114 | **source:** User-supplied text, 28 October 2026

> Warokutal (Safari Camp) is a remote campground at Port Stewart, reached by roads that can become impassable in the wet season (DETSI, 2024a). A stuck vehicle can become an emergency, because the Ranger Base has limited hours and water at the campground is non-potable (YAC, n.d.). The ideal situation is that a stranded visitor can get drinking water and supplies, hire equipment to recover the vehicle, and call for help from the campground during the open season. This must be achieved at low cost, with little Ranger work, and without disturbing cultural sites or ecological values. The design must also withstand wet-season floods with little repair, because it is unstaffed during the wet season.

---

## SECTION 8: Design Criteria (id: criteria)
- **section words:** 404 | **counts toward 4000:** yes
- layout: a three-column table with nine rows (one header and eight criteria), in the screenshot order below. Headers are Criteria, Description, Justification. Each block has exactly three page-text lines: criterion name and weighting, description, justification. Copy all three cells word for word from the supplied screenshot, including punctuation. Put each weighting on a new line below its criterion name. Keep the existing compact rows, shared table fonts, colours and borders. Column widths are 19.2% / 46.4% / 34.4%: Criteria is 20% narrower than its previous 24% width, with the freed width split equally between Description and Justification. The table scrolls horizontally on narrow screens. Existing block codes stay attached to their criteria.
- source: user-supplied screenshot, 28 October 2026. Environmental impact is included in Cultural appropriateness as stated in the supplied text.
- footer spacing: remove the criteria panel's bottom margin at every screen width so its gray background meets the footer directly, with no white gap between them.
- typography: match the criterion row labels and weightings to the description and justification text: 22px on desktop and 20px on mobile.

### [8.5] Cultural appropriateness (weighting 3)
- **code:** 8.5 | **status:** SITE | **words:** 58 | **source:** User-supplied screenshot, 28 October 2026

> Cultural appropriateness (weighting 3)
> The design avoids culturally restricted areas, minimises disturbance to Country and is shaped by the Lama Lama Traditional Owners. Environmental impact is included here, as caring for Country covers both.
> The Lama Lama people are the Traditional Owners and jointly manage the park with QPWS (QPWS, 2013), so no option proceeds without their agreement.

### [8.6] Low cost (weighting 4)
- **code:** 8.6 | **status:** SITE | **words:** 52 | **source:** User-supplied screenshot, 28 October 2026

> Low cost (weighting 4)
> The build cost must be realistic for a grant-funded project, and the facility should cover its own running costs through sales and hire income.
> The build is assumed to be grant-funded and running costs paid from income (see Cost Analysis), so a design needing ongoing subsidy would fail.

### [8.3] Visitor support (weighting 5)
- **code:** 8.3 | **status:** SITE | **words:** 43 | **source:** User-supplied screenshot, 28 October 2026

> Visitor support (weighting 5)
> Visitors can get drinking water, food, first aid, vehicle recovery gear and a way to call for help in one place.
> Water at the campground is non-potable (YAC, n.d.), so visitors must bring their own drinking water and supplies.

### [8.4] Feasibility and maintenance (weighting 5)
- **code:** 8.4 | **status:** SITE | **words:** 66 | **source:** User-supplied screenshot, 28 October 2026

> Feasibility and maintenance (weighting 5)
> The design can be built in one dry season and kept running through simple, scheduled upkeep by Rangers, without adding much to their workload.
> Roads can become impassable in the wet season and the national park is typically closed from 1 December to 30 June (DETSI, 2024a), so the building must stand largely unattended for months and need only simple upkeep.

### [8.1] Safety and access (weighting 4)
- **code:** 8.1 | **status:** SITE | **words:** 62 | **source:** User-supplied screenshot, 28 October 2026

> Safety and access (weighting 4)
> The design lowers the risk to visitors stranded when roads become impassable, and gives them a way to recover their vehicle or call for help.
> Visitors are directed to check road conditions themselves (DETSI, 2024a) and the Ranger Base is staffed only from about 8 am to 4:30 pm (YAC, n.d.), so help may be far away.

### [8.7] Community fit (weighting 4)
- **code:** 8.7 | **status:** SITE | **words:** 41 | **source:** User-supplied screenshot, 28 October 2026

> Community fit (weighting 4)
> The design suits self-reliant visitors to Warokutal and supports the way YAC and the Rangers work.
> The park's management statement describes remote, low-key, self-reliant visitor experiences (QPWS, 2013), so a large or intrusive facility would not fit.

### [8.2] Flood resilience (weighting 5)
- **code:** 8.2 | **status:** SITE | **words:** 38 | **source:** User-supplied screenshot, 28 October 2026

> Flood resilience (weighting 5)
> The structure and its stock survive repeated wet seasons with little or no damage.
> Roads can become impassable in the wet season (DETSI, 2024a), and repairs at a remote site are slow and costly.

### [8.8] Revenue (weighting 3)
- **code:** 8.8 | **status:** SITE | **words:** 44 | **source:** User-supplied screenshot, 28 October 2026

> Revenue (weighting 3)
> The design earns income from sales and equipment hire to help cover running costs and fund Ranger work.
> Income from sales and hire reduces reliance on grants (see Cost Analysis). It is weighted lower because the main goal is visitor safety.

---

## SECTION 9: Design Solutions (id: options)
- animation: on the Design Solutions page, show the hero title, section headings, introduction, option text and counter without text animations. Keep all option text fully visible while scrolling; retain the pink scroll-progress line animation (vertical on desktop, horizontal on mobile), image and diagram transitions, carousel navigation and the Summary page animations. Respect reduced motion for the progress line.
- layout: Show "Design Options" as the large heading below the hero, followed directly by the introductory paragraph without a smaller "Design options" subheading. Use the full desktop width with 32px side gutters, equal-width text and image columns with a clear central gutter, and compact spacing around the counter. Let option headings wrap within the text column. Centre the smaller image within its column, capped at 560px wide and 68% of the viewport height. Give each option its own full-height scroll interval without overlapping articles. Select the option nearest the viewport centre and crossfade images over 0.35 seconds with a subtle zoom. Keep option text and badges fully opaque without reveals or fades. Respect reduced motion. Retain the mobile swipe layout and leave the Overview of Design layout unchanged. Retain the pink progress line alongside the same shared navigation as Overview of Design: three horizontal line markers in a vertical stack below the counter, numbered 3.1–3.3. Keep the 9px resting width, 28px hovered/focused width, 22px immediate-neighbour width and 15px next-neighbour width, with number bubbles to the right and a dark active marker. Clicking a marker centres its matching option in the desktop viewport or mobile swipe area, keeping the counter, text and image in sync. Respect reduced motion.
- **section words:** 378 | **counts toward 4000:** yes

### [9.1] Introduction to the options
- **code:** 9.1 | **status:** SITE | **words:** 59 | **source:** Solution page, Design options

> The team developed three options in response to the design problem. Each was looked at in terms of what it would mean for visitors, the Lama Lama Rangers and Traditional Owners. A fourth idea, a solar-powered beacon showing river crossing conditions, was also considered. It scored lowest in the decision matrix, so it is not covered in detail here.

### [9.2] 4.11 Design option 1: Provisions Point
- **code:** 9.2 | **status:** SITE | **words:** 139 | **source:** User-supplied design option content

> The Provisions Point is a small, raised building that stocks drinking water, non-perishable food, first-aid supplies and vehicle recovery gear. Visitors can also hire personal locator beacons (PLBs) and UHF radios to call for help. It is aimed at visitors caught out by wet-season flooding, and it earns income through sales and hire.
>
> This option suits Warokutal because it can be built on ground that has already been cleared. No new vegetation needs to be removed, and visitors are kept away from culturally restricted areas such as the Alingina Wungku Living Area (Queensland Parks and Wildlife Service [QPWS], 2013). Its main drawbacks are cost and workload. It is the most expensive of the three options to build, and it adds a restocking task for Rangers, who already handle tourism and repairs on top of their other work (Reardon-Smith, 2023).

### [9.3] 4.12 Design option 2: Elevated tent-site platform
- **code:** 9.3 | **status:** SITE | **words:** 76 | **source:** User-supplied design option content
- visual: Original inline SVG in `app/report/ReportOptionDiagram.tsx` replaces the image placeholder. A labelled tent and bags sit on a timber deck supported by posts over wet ground, with steps for access. Labels: “Tent + dry gear”, “Raised deck”, “Steps”, and “Wet ground below the platform”. Footer: “Camping support only; no emergency equipment.” and “Concept illustration · not to scale”. Accessible description: “A tent and bags sit on a raised timber deck supported by posts above wet ground. Steps provide access. The platform keeps camping gear off the ground but provides no emergency supplies or communication.” Use the existing card dimensions and crossfade, respect reduced motion, and scale the SVG without cropping. Based on the supplied option text; no external image assets.

> The Elevated Tent-site Platform would raise camping areas off the ground so that tents and gear stay dry during heavy rain. It is simple and fairly cheap to build, and the raised decks handle flooding well. However, it does nothing for visitors who are stranded, as it offers no supplies, communication or vehicle recovery. Building several platforms would also spread construction across the campground, and each one would need checking by Rangers after every wet season.

### [9.4] 4.13 Design option 3: Distributed emergency checkpoint
- **code:** 9.4 | **status:** SITE | **words:** 104 | **source:** User-supplied design option content
- visual: Original inline SVG in `app/report/ReportOptionDiagram.tsx` replaces the unrelated materials image. An illustrative campground route connects three labelled emergency stations. Below the map, icons identify “Basic supplies”, “Safety information”, and “Radio”. Footer: “Each site needs approval and Ranger restocking.” and “Illustrative layout · locations subject to approval”. Accessible description: “An illustrative campground map shows three small emergency stations spread along a route. Each station provides basic supplies, safety information and a radio. Locations are conceptual and require approval; Rangers must restock each station.” Use the existing card dimensions and crossfade, respect reduced motion, and scale the SVG without cropping. Based on the supplied option text; no external image assets.

> The Distributed Emergency Checkpoint would place several small stations around Warokutal, each with basic supplies, safety information and a radio, so that visitors are not relying on one central building.
>
> Having stations in several places could mean a stranded visitor has less distance to travel for help. The downside is that each station would need its own approval to make sure it avoids culturally and environmentally sensitive areas (QPWS, 2013). Keeping several sites stocked would also add to the Rangers’ workload. The stations would be too small to hold vehicle recovery gear, and they would bring in little or no income for the community.

---

## SECTION 10: Design Selection (id: selection)
- animation: render the heading, introduction, weighting explanation and rating explanations without text reveals. Preserve the decision matrix animations, the concluding text underline animation and footer animations.
- **section words:** 140 | **counts toward 4000:** yes

### [10.1] Design Selection introduction
- **code:** 10.1 | **status:** SITE | **words:** 49 | **source:** User-supplied paragraph
- layout: show this paragraph directly below Design Selection. Do not render a separate introduction heading.

> The options were compared using a weighted decision matrix (Table 1). The matrix uses the eight criteria set out in the Design Criteria section. Each option was rated from 1 to 5 using the scale in Table 2, and each rating was multiplied by the weighting for that criterion.

### [10.2] 4.21 Decision matrix
- **code:** 10.2 | **status:** SITE | **words:** 91 | **source:** Solution page matrix text, checked: every total adds up
- layout: one real HTML table. Use the supplied matrix screenshot's labels and values. Show a Weighting row (×3, ×4, ×5, ×5, ×4, ×4, ×5, ×3), with empty Total score and Rank cells. Show each rating with its smaller weighted score underneath. Keep the existing style, scrolling arrows, running totals and winner animation. Remove the guide text above the matrix and the colour-scale and scoring-status footer below it, including their alternate completion and reduced-motion text. Keep the bottom progress bar. Do not use the old screenshot images.

> Table 1. Weighted decision matrix used to compare the design options.
> | Design option | Cultural appropriateness (3) | Low cost (4) | Visitor support (5) | Feasibility & maintenance (5) | Safety & access (4) | Community fit (4) | Flood resilience (5) | Revenue (3) | Total score | Rank |
> |---|---|---|---|---|---|---|---|---|---|---|
> | Provisions Point | 5 | 3 | 4 | 3 | 5 | 4 | 3 | 5 | 128 | 1 |
> | Distributed Emergency Checkpoint | 4 | 3 | 3 | 3 | 4 | 4 | 3 | 1 | 104 | 2 |
> | Elevated Tent-site Platform | 3 | 4 | 2 | 2 | 3 | 3 | 4 | 2 | 95 | 3 |
> | Solar-powered River Crossing Beacon | 3 | 4 | 1 | 3 | 4 | 3 | 3 | 1 | 91 | 4 |

### [10.5] Rating scale
- **code:** 10.5 | **status:** SITE | **source:** User-supplied rating scale screenshot
- layout: below Table 1, place the simple rating table and weighting explanation in equal-width columns, with a 40px gap. Use a fixed table layout with an 80px Rating column and the remaining width assigned to Evaluation. Keep visible borders and a caption below the table. Allow evaluation text to wrap. Below 768px, stack the table above the explanation with a 24px gap.

> Table 2. Rating scale.
> | Rating | Evaluation |
> |---|---|
> | 1 | Does not meet the criterion, or creates new problems |
> | 2 | Only just meets the criterion |
> | 3 | Partly meets the criterion, but with clear limits |
> | 4 | Meets the criterion well, with minor limits |
> | 5 | Fully meets the criterion with no major drawbacks |

### [10.6] Weighting explanation
- **code:** 10.6 | **status:** SITE | **source:** User-supplied weighting explanation screenshot
- layout: paragraph to the right of Table 2 without a separate heading, aligned at the top. Use smaller 16px text with 1.6 line height and the same column width as the table. Stack below the table on small screens.

> The weightings reflect how much each criterion matters to the client. Visitor support, feasibility and maintenance, and flood resilience were weighted 5, because the design cannot work at a remote, flood-prone site with limited Ranger staff unless it gets these right. Cost, safety and access, and community fit were weighted 4 as core requirements from the brief. Cultural appropriateness was weighted 3 because cultural protocols were treated as a must-have, so any option that broke them would have been ruled out before scoring. Revenue was weighted 3 as a useful extra rather than the main goal. Safety is also spread across three criteria (safety and access, visitor support and flood resilience), which together make up 14 of the 33 weighting points, more than any other area.

### [10.7] 4.22 Reasons for the Provisions Point ratings (Design option 4.11)
- **code:** 10.7 | **status:** SITE | **source:** User-supplied ratings screenshot
- layout: row 1 of three rows below the rating scale and weighting explanation. Add the same thin divider above this row as between the following rating rows, separating Tables 2 and 3. Each row has a subheading from the table title spanning both columns; use a smaller responsive 20–28px heading (2vw), kept on one line at widths of 1024px and above while allowing wrapping below that; keep each Design option link label together. Make its parenthesised Design option number an underlined green link with hover and keyboard focus feedback that navigates to and focuses the matching design option (including its mobile carousel position), a simple bordered table on the left and its narrower explanation on the right. Expand the table from the previous equal-width layout by 25vh: add 5vh to Criterion and 20vh to Why, retaining the original Score width through a length-based colgroup calculation (16% of the original half-row table width), with Why taking all remaining table width. Cap this growth when needed to leave at least 240px for the explanation; reduce both column additions proportionally. Reset the growth in the stacked mobile layout. Separate rows with a thin rule. Keep the caption below the table. Stack each row below 768px. Render block 10.3 as the paragraph to the right of this table, without a separate heading.

> Table 3. Reasons for the Provisions Point ratings.
> | Criterion (weight) | Score | Why |
> |---|---|---|
> | Cultural appropriateness (3) | 5 | One building on already-cleared ground, with shallow piles |
> | Low cost (4) | 3 | Most expensive to build, at around $87,400 (see Cost Analysis) |
> | Visitor support (5) | 4 | Supplies, recovery kits, PLBs and radios in one place, but only at Warokutal |
> | Feasibility & maintenance (5) | 3 | Durable materials, but needs weekly restocking |
> | Safety & access (4) | 5 | Visitors can recover their own vehicles and call for help |
> | Community fit (4) | 4 | Suits small, self-sufficient groups, but needs Ranger staffing |
> | Flood resilience (5) | 3 | Raised 2 m, but the tracks to it still flood (Cook Shire Council, 2026) |
> | Revenue (3) | 5 | Sales and kit hire bring in around $8,950 a year (see Cost Analysis) |

### [10.8] 4.23 Reasons for the Distributed Emergency Checkpoint ratings (Design option 4.13)
- **code:** 10.8 | **status:** SITE | **source:** User-supplied ratings screenshot
- layout: row 2 of three rows below the rating scale and weighting explanation. Each row has a subheading from the table title spanning both columns; use a smaller responsive 20–28px heading (2vw), kept on one line at widths of 1024px and above while allowing wrapping below that; keep each Design option link label together. Make its parenthesised Design option number an underlined green link with hover and keyboard focus feedback that navigates to and focuses the matching design option (including its mobile carousel position), a simple bordered table on the left and its narrower explanation on the right. Expand the table from the previous equal-width layout by 25vh: add 5vh to Criterion and 20vh to Why, retaining the original Score width through a length-based colgroup calculation (16% of the original half-row table width), with Why taking all remaining table width. Cap this growth when needed to leave at least 240px for the explanation; reduce both column additions proportionally. Reset the growth in the stacked mobile layout. Separate rows with a thin rule. Keep the caption below the table. Stack each row below 768px. Render block 10.10 as the paragraph to the right of this table, without a separate heading.

> Table 4. Reasons for the Distributed Emergency Checkpoint ratings.
> | Criterion (weight) | Score | Why |
> |---|---|---|
> | Cultural appropriateness (3) | 4 | Small footprint, but every site needs checking against restricted areas |
> | Low cost (4) | 3 | Several units, each needing freight and stock |
> | Visitor support (5) | 3 | Basic supplies, but no room for recovery gear |
> | Feasibility & maintenance (5) | 3 | Simple units, but spread over several sites |
> | Safety & access (4) | 4 | Help is closer, but there is no vehicle recovery |
> | Community fit (4) | 4 | Low-key and self-service |
> | Flood resilience (5) | 3 | Some stations may end up on lower ground |
> | Revenue (3) | 1 | Free emergency stations bring in no income |

### [10.9] 4.24 Reasons for the Elevated Tent-site Platform ratings (Design option 4.12)
- **code:** 10.9 | **status:** SITE | **source:** User-supplied ratings screenshot
- layout: row 3 of three rows below the rating scale and weighting explanation. Each row has a subheading from the table title spanning both columns; use a smaller responsive 20–28px heading (2vw), kept on one line at widths of 1024px and above while allowing wrapping below that; keep each Design option link label together. Make its parenthesised Design option number an underlined green link with hover and keyboard focus feedback that navigates to and focuses the matching design option (including its mobile carousel position), a simple bordered table on the left and its narrower explanation on the right. Expand the table from the previous equal-width layout by 25vh: add 5vh to Criterion and 20vh to Why, retaining the original Score width through a length-based colgroup calculation (16% of the original half-row table width), with Why taking all remaining table width. Cap this growth when needed to leave at least 240px for the explanation; reduce both column additions proportionally. Reset the growth in the stacked mobile layout. Separate rows with a thin rule. Keep the caption below the table. Stack each row below 768px. Render block 10.11 as the paragraph to the right of this table, without a separate heading.

> Table 5. Reasons for the Elevated Tent-site Platform ratings.
> | Criterion (weight) | Score | Why |
> |---|---|---|
> | Cultural appropriateness (3) | 3 | Several platforms spread disturbance across the campground |
> | Low cost (4) | 4 | Simple decks with no stock or equipment |
> | Visitor support (5) | 2 | Only improves sleeping conditions |
> | Feasibility & maintenance (5) | 2 | Many platforms to inspect after each wet season |
> | Safety & access (4) | 3 | Lowers flooding risk at night, but does nothing for stuck vehicles |
> | Community fit (4) | 3 | May not suit the campervans and trailers that use Warokutal |
> | Flood resilience (5) | 4 | Water flows under open decks, with little to damage |
> | Revenue (3) | 2 | Could justify a small increase in site fees at most |

### [10.3] Provisions Point score explanation
- **code:** 10.3 | **status:** SITE | **source:** User-supplied score explanation
- layout: one paragraph to the right of Table 3, without a separate heading.

> The Provisions Point scored highest with 128 points, mainly because of its strong results for cultural appropriateness, safety and access, and revenue.

### [10.10] Distributed Emergency Checkpoint score explanation
- **code:** 10.10 | **status:** SITE | **source:** User-supplied score explanation
- layout: one paragraph to the right of Table 4, without a separate heading.

> The Distributed Emergency Checkpoint came second with 104 points, held back mostly by its lack of income.

### [10.11] Elevated Tent-site Platform score explanation
- **code:** 10.11 | **status:** SITE | **source:** User-supplied score explanation
- layout: one paragraph to the right of Table 5, without a separate heading.

> The Elevated Tent-site Platform came third with 95 points, as it offers little support to stranded visitors and would be harder to maintain.

### [10.4] Decision
- **code:** 10.4 | **status:** SITE | **source:** User-supplied selection conclusion
- layout: render once as a standalone subheading at the bottom of Design Selection, after all three table rows. Use responsive 24–36px type and a green underline that draws from left to right when the subheading enters view. Underline each wrapped line and show the completed underline immediately for reduced-motion users. Do not include this conclusion in the Elevated Tent-site Platform row.

> 4.25 The Provisions Point was therefore selected. It scored highest overall and offers the best mix of visitor safety, essential supplies and income for the community.

---

## SECTION 11: Detailed Design (id: design)
- **section words:** 404 | **counts toward 4000:** yes
- layout: Keep the existing Detailed Design hero unchanged. Below it: a compact summary; 7.1 text on the left with the structure gallery on the right: exactly two rows, with exterior and structure concept images in two columns in the first row and the three material references in three columns in the second row. Fit every complete image inside its cell without cropping, with small captions below. On tablet and mobile place the gallery below the text while preserving its two-column first row and three-column second row; 7.2 text on the left with the stock gallery on the right: exactly two rows, with three interior views in the first row and four recovery equipment references in the second row, retaining small captions below each image. On tablet and mobile place the gallery below the text while preserving its three-image first row and four-image second row; 7.3 heading and full-width unchanged paragraph inside the gray home-style operating-steps carousel, above its arrows and cards; remove the border, separate white partition and extra top margin between 7.2 images and 7.3. Reuse the original home carousel card styling with six operating-step cards from 7.3 and original SVG action illustrations on clean backgrounds; show each former small description as the black card heading, with no pills or metadata row. On small screens place text before visuals and preserve each gallery’s specified row layout. After the complete 7.3 carousel scroll track, display 7.4 Community concerns as a separate text section. Reuse 7.1’s heading, body typography, divider and responsive section spacing, with an introductory sentence and five bullet points. Keep all existing carousel markup, styles and scroll behaviour unchanged.
- media: User-supplied solution reference images copied from `/Users/darrell/Downloads/prov-in.jpg`, `prov-in2.jpg` and `prov-out2.jpg` to `public/assets/report/design/`. Creator and licence not supplied. Three interior views use CSS crops of the two interior references (overview, shelves, counter); the separate water and canned food, recovery equipment and UHF radio crop cards have been removed; do not label unseen equipment. Images are concept references, not construction drawings. The structure concept uses the user-supplied building image in `public/assets/report/design/structure-concept.jpg`, copied unchanged from the attached `codex-clipboard-ecdc1cd9-0784-4c56-abc9-9d4d87d0c683.jpg`. It replaces the previous SVG diagram and has the caption “Structure concept reference”. Alt text describes a raised building with a corrugated pitched roof, verandah and stairs, surrounded by campsites and vehicles in bushland. Creator, source URL and licence were not supplied.
- structure references: User-supplied `/Users/darrell/Downloads/resilient1.png`, `resilient2.png` and `resilient3.png` copied unchanged to `public/assets/report/design/`. Captions: “Reinforced concrete pile construction”, “Concrete material reference” and “Corrugated roof reference”. Alt text describes the four pile construction stages, the concrete block cutaway with internal fibres, and the corrugated roof with skylight and vent. These illustrate materials and construction only; they do not verify the specified concrete or roof performance. Source URLs, creators and licences were not supplied.
- equipment references: User-supplied `/Users/darrell/Downloads/item1.jpg`, `item2.jpg`, `item3.jpg` and `item4.jpg` copied unchanged to `public/assets/report/design/`. Small captions below the images read “Traction boards”, “Tyre deflation kit”, “12V air compressor” and “Recovery strap and shackle”. Alt text describes the traction boards beside a vehicle on snow, the tyre tool and pressure gauge, the portable compressor and vehicle power plug, and the strap connected with a green soft shackle. Show the complete equipment images without cropping. Source URLs, creators and licences were not supplied.
- retired blocks: 11.2, 11.6, 11.7 and 11.8 are no longer displayed; the user replaced the previous content with the finalized text below.

### [11.1] Detailed Design
- **code:** 11.1 | **status:** SITE | **words:** 37 | **source:** User-finalized Detailed Design content

> The Provisions Point is a small building of about 24 m² at Warokutal (Safari Camp), placed on already-cleared, higher ground within the campground. It is staffed by Lama Lama Rangers during the visitor season (July to November).

### [11.3] 5.1 Structure
- **code:** 11.3 | **status:** SITE | **words:** 83 | **source:** User-finalized Detailed Design content

> The building is raised 2 m on reinforced concrete piles so that floodwater can pass underneath. The walls are watertight concrete, which protects the steel reinforcement inside, and the roof is corrugated fibre cement, which handles heavy rain, strong sun and cyclone winds with very little upkeep. Shallow pile footings are used instead of deep trenches to limit digging on Country. A small solar panel and battery power the lighting and charge the radios and beacons, so no generator or fuel is needed.

### [11.4] 5.2 What it holds
- **code:** 11.4 | **status:** SITE | **words:** 92 | **source:** User-finalized Detailed Design content

> Shelves and a counter hold drinking water, canned food, firewood, first-aid supplies and safety flyers. Two vehicle recovery kits are available for hire, each with traction boards, a tyre deflation kit, a 12V compressor, and a snatch strap with shackles. Personal locator beacons (PLBs) and UHF radios can also be hired, so visitors can contact Rangers in areas with no phone reception. A small emergency cabinet stocked with water and a UHF radio is opened with a code given at check-in, so help is available even when no Ranger is on site.

### [11.5] 5.3 How it works
- **code:** 11.5 | **status:** SITE | **words:** 45 | **source:** User-finalized Detailed Design content

> A visitor checks in, buys supplies or hires gear, and returns it before leaving the area. Rangers restock weekly during the season and inspect the building twice a year, before and after the wet season. Sales and hire income covers running costs (see Cost Analysis).

### [11.9] Operating steps
- **code:** 11.9 | **status:** SITE | **words:** 56 | **source:** Carousel labels and excerpts adapted from the finalized 7.3 paragraph; original paragraph unchanged
- media: Six original SVG action illustrations authored in `app/report/ReportStepIllustration.tsx`. As requested on 28 October 2026, replace the carousel photographs with a clean warm-white (#faf9f5) background, a light border and a subtle ground line. Retain the existing carousel card dimensions and 4:3 image area. The concept photographs in the structure and stock galleries above remain unchanged. No external source is used for these illustrations.
- illustrations: Use simple rounded pink (#ff286b) stick figures and dark props. Visitors wear a backpack; Rangers wear a brimmed hat and collar. Step 1 lowers a held pen onto the form, writes a signature and reveals a check mark. Step 2 reaches for a kit, lifts it clear of the counter and brings it toward the visitor; Step 3 reverses that journey, setting the kit on the counter before withdrawing the hand. Small opposite-direction arrows distinguish collection and return. Step 4 lifts a supply crate onto a shelf and releases it. Step 5 holds a checklist while moving a magnifying glass over the building, then reveals inspection checks. Step 6 drops a pink coin into an upkeep jar bearing a building and completion check; a stationary currency coin beside the jar keeps the meaning clear in the completed and reduced-motion poses. Hands and held objects share movement coordinates during contact, so objects stay in the hand until placed. Scrub each action through its card’s visible horizontal travel, with short starting and ending holds and progress clamped before and after; scrolling backward reverses it and stopping scroll freezes it. Use no autoplay or timers. Reduced-motion users see static completed illustrations, including fully drawn signatures and checks. Hide undrawn strokes completely to avoid stray dots. Keep illustrations decorative and non-interactive, with the existing step headings providing the text descriptions.
- connectors: Five short cartoon-style pink (#ff286b) semicircle arrows connect adjacent card corners, alternating top-to-top, bottom-to-bottom, then repeating. Use thick rounded SVG strokes, anchored 24px inside each adjoining corner across the 16px gap, with 56px of rail space above and below for the curves. Draw each curve gradually across its successive fifth of the existing horizontal scroll progress, revealing its arrowhead at the end; reverse the drawing when scrolling back. The arrows move with the cards and do not intercept input or appear in the accessibility tree. Hide these decorative connectors for the reduced-motion vertical list.
- layout: Home carousel card styling, adapted to six operating steps. Vertical page scrolling drives the horizontal card translation as soon as the complete 7.3 section reaches the measured navigation height plus 8px; reverse page scrolling reverses it. Pin the heading, summary, cards and progress bar together, so horizontal movement begins while the introduction remains visible. Keep existing image dimensions and fitting. Remove the report design container’s bottom padding so the gray carousel ends without an extra white spacer before the following section. Give the entire carousel and pinned cards the same gray background as the section. Size the outer scroll track to the measured complete section height plus the horizontal travel, eliminating unused viewport-height filler. On desktop use the measured fixed navigation height plus 8px as the sticky top offset, with 5vh of top padding and no bottom padding beneath the progress track. On mobile, if the complete section is taller than the space below the navigation, pin its bottom to the viewport instead: let the introduction scroll up first, then start horizontal motion when the full-size illustrations and their captions fit on screen. Use that same measured offset for both pinning and scroll progress. Keep carousel image dimensions and fitting unchanged; do not resize images to fit the viewport. Remove individual card bottom borders and padding, replacing them with one continuous 2px progress track below the card row, inset by the carousel gutter and separated by 5vh. Its pink (#ff286b, matching the header progress line) fill uses the actual card translation divided by the total rail travel, growing from empty to full and reversing with scrolling. Hide the progress track for the reduced-motion vertical list. Disable horizontal scrolling, dragging and arrows. Measure the rail overflow, complete pinned section and navigation height with ResizeObserver; map the track from its arrival beneath the navigation to the end of its measured section, so the final card is visible and the progress bar reaches full. Reduced-motion users see a normal vertical list without pinning or horizontal motion. Each card has its image followed by the former small description as the main black heading, prefixed inline with “Step 1.” through “Step 6.”; remove the numbered pill, metadata row and old short heading. Allow the complete heading to wrap without line clamping. No duplicate Project stages title, project timeline, dates, or implementation links. The 7.3 heading and full-width summary sit inside the gray carousel section, above the cards; no separate divider from the 7.2 images. Use 5vh section top padding, zero section bottom padding and 5vh spacing between the heading, summary and cards; retain 16px horizontal card gaps and 14px between each card image and its heading. Explicitly stack the heading and summary in a single flex column, with full-width children and zero inherited margins. Scope these rules through the 7.3 wrapper so they outrank the shared home carousel layout and padding rules at every viewport. Place the summary directly beneath the heading with no paragraph margin; use solid black (#000) text sized responsively from 20px to 26px with line-height 1.45.

> 5.31 A visitor checks in.
> 5.32 Buys supplies or hires gear.
> 5.33 Returns it before leaving the area.
> 5.34 Rangers restock weekly during the season.
> 5.35 Rangers inspect the building twice a year, before and after the wet season.
> 5.36 Sales and hire income covers running costs (see Cost Analysis).

### [11.10] 5.4 Community concerns
- **code:** 11.10 | **status:** SITE | **words:** 91 | **source:** User-supplied text, 28 October 2026
- layout: Render the first line as an introductory paragraph and the remaining five lines as bullet points below the 7.3 carousel, using the same heading and body styling as 7.1.

> The likely concerns and how the design addresses them:
> Damage to Country: The building is on already-cleared ground, and its placement is agreed with Traditional Owners first.
> Extra Ranger work: Rangers restock weekly in the season, and hire income covers running costs.
> Flood damage: The building is raised 2 m, with flood heights confirmed before construction.
> Unsafe wet-season travel: The park stays closed from 1 December to 30 June (DETSI, 2024a), and the building is for stranded visitors.
> Misuse of hire gear: Gear is checked on return and repaired or replaced.


---

## SECTION 12: Prototype (id: prototyping)
- **section words:** 432 | **counts toward 4000:** yes
- layout: Retain the existing hero and all approved text, figures, image links and section order. Use an architectural presentation with generous spacing, larger uncropped Blender screenshots, alternating desktop text/image positions and restrained pink annotations. Purpose and Build pair one-third-width text with two-thirds-width imagery. Testing uses a continuous numbered process line instead of cards, vertical on phones. Replace the area bar chart with two area-equivalent rectangles at the same linear scale (24 SVG units per metre), 85.6 m² current and 24 m² proposed, with identical 5 m scale bars. The current rectangle assumes a 3:2 aspect ratio for illustration only, since its length and width are not recorded. Retain the 6 m × 4 m proposed footprint drawing. Pair the proposed footprint beside the current interior in equal-height frames without cropping. Give the support screenshot two-thirds of its row and the wall schematic one-third. Reverse the Roof row on desktop, with its close-up aligned beneath the main image. Storage uses a large interior screenshot above four equally sized contain-fit equipment frames. Reserve filled cream panels for the area comparison and final findings; other diagrams sit on the page background. The results table uses stronger row headings, softer rules and generous cell padding. Stack explanations before imagery on phones, retain all screenshot annotations and use locally scrolling 14px table cells. Retain existing body copy and assets. Add original explanatory SVG diagrams with concise captions and approximation labels.
- media: Retain all seven user-supplied Blender screenshots unchanged at /assets/report/prototype/proto-1.png through proto-7.png. Exterior, side, interior and equipment screenshots describe the current prototype. Original HTML/CSS/SVG diagrams show floor area, proposed footprint and wall thickness; no external assets or dependencies. Support annotation indicates the column section described in the report, not a fresh measurement from the screenshot. Roof and storage leader lines identify visible features; the roof close-up is not new test evidence. Visible captions and accessible diagram descriptions distinguish current findings from the proposed revision.
- caption punctuation: Use colons instead of em dashes in all Prototype captions, including current prototype annotations, the proposed revision, the roof close-up and equipment gallery.
- figure labels: Testing and revision process: Design requirement, Measure or inspect, Compare, Record findings, Revise, Retest. Footprint comparison has no visible heading or explanatory caption. Keep Current prototype approximately 85.6 m², Proposed revision 24 m² and identical 5 m scale bars, all centred beneath or inside their respective rectangles. Proposed revision: 6 m × 4 m, 24 m², footprint only. Measurement annotations: Column section approximately 2 m; Modelled wall thickness approximately 19 cm, schematic not to scale. Roof-to-wall junction: current prototype and enlarged screenshot detail. Storage: Supply shelves and Table / work surface, with the table leader line ending on the central beige tabletop at image coordinates (270, 150) in the 458 × 298 screenshot; equipment requires clearer shapes and labels. Results table caption: Recorded findings and planned next steps. Tables scroll within their panel on phones at 14px minimum cell text.

- additional diagrams: Original SVGs in ReportPrototypeDiagrams.tsx, no external imagery or dependencies. Measurement locations uses proto-3.png with approximate numbered locations for footprint at floor perimeter, exposed column section and wall edge; values approximately 85.6 m², 2 m and 19 cm come from existing findings. Keep only the Measurement locations heading and three numbered measurement values, without the reconstruction note or measurement instructions; accessible descriptions still identify approximate locations. Storage zoning is a schematic top view inferred from proto-4.png and proto-7.png: left and rear supply shelves, central table and benches, right-side counter/supplies, and a suggested dashed circulation zone. Not to scale; openings and exact clearances are unknown; the route is not tested. Before and after pairs the existing exterior screenshot with an original cutaway-style schematic of the proposed smaller shelter on supports; 24 m², 6 m × 4 m. Label the after image as proposed, with illustrative interior positions and no completed Blender revision implied. Captions: “Measurement locations”, “Storage zoning plan”, “Before and after: planned revision”. Remove the visible storage approximation note, footprint-only note, wall schematic note and “Annotation is indicative.” sentence. The storage note ends “The dashed route is a suggested circulation zone.” The footprint scale bars are 120 SVG units long (5 m), centred at x=170 on each identical 340-unit viewBox; centre area values vertically and horizontally. Before/after remains labelled as proposed. Stack paired diagrams and measurement legends on phones, use accessible SVG descriptions, and retain all original seven images and body paragraphs. No em dashes in new content.

### [12.1] 6.1 Purpose
- **code:** 12.1 | **status:** SITE | **words:** 24 | **source:** Final text supplied by the user, 28 October 2026

> The prototype was made to show what the Provisions Point would look like and to check that its layout works in the space available.

### [12.2] 6.2 How it was built
- **code:** 12.2 | **status:** SITE | **words:** 67 | **source:** Final text supplied by the user, 28 October 2026

> The model was built in Blender. AI was used to generate basic shapes quickly, which were then arranged, resized and assembled into the building. The model uses the same materials as the design: reinforced concrete piles, watertight concrete walls and a corrugated fibre cement roof, on elevated ground. Each part was then measured in Blender at a 1:1 scale so it could be checked against the design.

### [12.3] 6.3 Testing approach
- **code:** 12.3 | **status:** SITE | **words:** 35 | **source:** User-approved expanded prototype testing content, 30 October 2026

> The Blender prototype was used to check the building’s dimensions, arrangement of equipment and consistency with the proposed design and cost estimate. The checks covered floor area, raised supports, wall thickness, roof fit and storage.

### [12.5] 6.4 Floor area: prototype versus costed design
- **code:** 12.5 | **status:** SITE | **words:** 73 | **source:** User-approved expanded prototype testing content, 30 October 2026

> The prototype footprint measured approximately 85.6 m², compared with the 24 m² building used in the cost estimate. The model therefore has approximately 3.57 times the intended floor area.

> This difference means the current prototype does not demonstrate that the proposed layout fits within the costed building. The next version will use a footprint of approximately 6 m × 4 m. Its storage, counter and circulation space will then need to be checked again.

### [12.6] 6.5 Raised supports and wall dimensions
- **code:** 12.6 | **status:** SITE | **words:** 31 | **source:** User-approved expanded prototype testing content, 30 October 2026

> The lowest column sections measured approximately 2 m, matching the dimension described in the design. The walls measured approximately 19 cm thick.

> These measurements record the geometry of the digital model.

### [12.7] 6.6 Roof fit and visible gaps
- **code:** 12.7 | **status:** SITE | **words:** 29 | **source:** User-approved expanded prototype testing content, 30 October 2026

> The roof was visually checked from all sides. It appeared to meet the walls without visible gaps in the model.

> This check assessed the alignment of the modelled parts.

### [12.8] 6.7 Storage layout and equipment identification
- **code:** 12.8 | **status:** SITE | **words:** 56 | **source:** User-approved expanded prototype testing content, 30 October 2026

> The model showed supplies placed on shelves and the counter. However, some items were difficult to identify, making it harder to compare the model with the intended equipment list.

> The next version will use clearer equipment shapes and labels. Storage will also be checked again after the building is reduced to the intended 24 m² footprint.

### [12.4] 6.8 Testing findings and planned improvements
- **code:** 12.4 | **status:** SITE | **words:** 117 | **source:** User-approved expanded prototype testing content, 30 October 2026

> The checks identified the oversized footprint as the main issue.

> The next prototype will address this by reducing the footprint to approximately 6 m × 4 m and improving equipment identification.

> | Check | Recorded finding | Planned next step |

> | --- | --- | --- |

> | Floor area | Approximately 85.6 m² versus the costed 24 m² | Reduce the footprint to approximately 6 m × 4 m |

> | Raised supports | Lowest column sections measured approximately 2 m | Recheck dimensions in the revised model |

> | Wall thickness | Approximately 19 cm | Recheck thickness in the revised model |

> | Roof fit | No visible gaps found during visual inspection | Recheck alignment after resizing |

> | Storage | Equipment fits in the current model, but some items are difficult to identify | Improve detail and check storage within the smaller footprint |

---

## SECTION 13: Implementation Plan (id: implementation)
- **section words:** 414 | **counts toward 4000:** yes
- layout: Keep the existing shared page hero unchanged, matching Detailed Design. Below it, show six numbered questions and their full answers on the left, with six original SVG illustrations and captions on the right of each row. Reuse the approved 9.2 and 9.4 gallery layout for every question: 0.9fr / 1.3fr desktop columns, a 28–64px gap, question headings sized from 28px to 38px, and a two-column, three-row gallery with cream 4:3 illustration frames. Arrange the two-column galleries in zigzag sequence: 1–2 on the first row, 4–3 on the second and 5–6 on the third, so steps 2–3 and 4–5 align vertically. Keep DOM, caption numbering and playback order as 1 through 6. Each caption has a small pink number, a dark title and a smaller subtitle. Keep the same report container, body typography, row spacing and thin dividers. Below 1024px, stack each gallery after its answer at full available width. Retain two cards per row from 768px upward and the existing single-column gallery below 768px. Display 9.1–9.6 in the headings while retaining internal block keys 13.1–13.6. Preserve all user-provided answers, including the community handover text in 9.5. Sections 15–16 below remain archived reference text.
- images: All six galleries now use original code-authored SVG illustrations in app/report. Reuse the approved rounded pink (#ff286b) stick figures, dark (#242327) props, cream (#faf9f5) backgrounds and subtle ground lines. The SVGs keep the existing artwork and remain decorative, with visible captions providing accessible descriptions. No generated raster images or external image sources are used. Preserve every existing illustration as the source artwork; leave the separate 7.3 carousel unchanged. The former concept/equipment reference photographs remain available in Detailed Design, with provenance recorded there.

- animation: Separate artwork playback from the scroll-driven border and arrow sequence. All six existing illustrations repeat their two-second actions while any part of their gallery is visible; pause and resume artwork when the entire gallery is off-screen or the document is hidden. Artwork continues when scrolling stops and its playback position is unaffected by scrolling. Borders and arrows alone follow an independent scroll timeline: begin when the gallery top reaches 35% of the viewport height (requiring an additional 50% of a viewport of scrolling compared with the original 85% trigger) and finish when its bottom reaches 65%. Map that travel to seven seconds of virtual time, highlighting cards 1–6 at successive one-second positions along the zigzag layout. Scrolling backward reverses highlight and connector progression; stopping freezes that progression. Retain smooth 4px pink highlights on the current illustration panel only, with slower 600–900ms border transitions, and green borders on all panels at scroll completion. Hide the arrows at completion while artwork continues looping. Preserve the existing drawings, text and layout, and leave 7.3 unchanged. Reduced motion shows static completed artwork and no arrows.
- arrows: Add a pink connector pointing from each previous card to the newly started card. Draw each connector smoothly over 1000ms and fade its arrowhead in over 360ms after 700ms of virtual scroll time. Keep revealed arrows visible during progression, then fade all arrows out over 800ms and hide them when every outline turns green. Scrub connector drawing and arrowhead reveals from the same scroll timeline. Measure the existing illustration frames: connect 1→2 and 5→6 across the gap pointing right, and 3→4 pointing left. Connect 2→3 down the outer right side and 4→5 down the outer left side, with each lower card directly beneath the previous one. Keep every connector clear of the captions. Below 768px, keep numeric 1–6 single-column order and connect all downward steps along the outer right edge. Connectors are decorative and ignore pointer input. Keep the text-left/gallery-right desktop layout and existing responsive stacking, with no layout shift as outlines change.
- reduced motion: Show the original static drawings with thicker green completion outlines and no arrows. Disable action cycles, connector animations, border transitions and timeline timers. Keep all captions accessible; decorative SVGs and arrows remain outside the accessibility tree.
- actions: 9.1 traces site checks and reinforcement, gestures the crew, settles the roof, carries materials and shows ranger training/manual details. 9.2 animates co-design and approval writing, kit transfer, restocking, inspection and recycling. 9.3 animates feedback, the satisfaction target, monthly checks, repair, seasonal review and annual financial review. 9.4 animates safety checks, recovery gear, supplies, ranger time, rental payment and funding. 9.5 animates handover, management checks, rentals, restocking, inspections and income. 9.6 animates fault documentation, reporting, removal from service, repair, qualified-contractor checks and inspected return to service. Keep hands and held props connected; apply motion to meaningful SVG parts rather than moving an entire illustration.

### [13.1] 7.1 How will your solution be constructed and how will the community be trained in its construction and use?
- **code:** 13.1 | **status:** SITE | **words:** 89 | **source:** User-provided Implementation Plan content
- gallery: Six original SVG scenes authored in app/report/ReportConstructionIllustration.tsx, matching the approved 9.2 and 9.4 pink stick-figure style. The scenes show a raised shelter on dry, flood-safe terrain; four helmeted workers with an eight-week calendar; reinforced concrete foundation piles; watertight walls and a corrugated roof; materials stored in the community warehouse; and a ranger training session with an instruction manual and clock. Use no generated raster images or external image sources; the illustrations are decorative and described by their visible captions.
- layout: Use the shared enlarged two-column, three-row illustration gallery beside the left-hand question and full answer. Match the approved cream 4:3 frames, small numbered titles and subtitles. Below 1024px, stack the full-width gallery after the answer.
- captions: 01 Flood-safe site — Choose dry, flood-safe terrain for the shelter.; 02 Construction crew — Plan eight weeks for a crew of four workers.; 03 Reinforced foundations — Raise the shelter on reinforced concrete piles.; 04 Walls and roof — Use watertight concrete and a corrugated fibre cement roof.; 05 Warehouse storage — Use the community warehouse to store materials.; 06 Ranger training and manuals — Provide four hours of training and leave instruction manuals.

> First, the project will be constructed on dry land; it will require a crew of four workers and is expected to take eight weeks to complete. Second, regarding site selection and building materials: the structure will be situated on flood-safe terrain, featuring an elevated foundation built on reinforced concrete piles, walls constructed from watertight concrete, and a roof made of corrugated fiber cement. We will also provide the rangers with a four-hour training session on how to use the facility and will leave an instructional manual inside the shelter.

### [13.2] 7.2 How will your solution be introduced to the client or community and used, constructed, managed, maintained etc. over time?
- **code:** 13.2 | **status:** SITE | **words:** 87 | **source:** User-provided Implementation Plan content
- gallery: Six SVG illustrations authored in `app/report/ReportImplementationIllustration.tsx`, matching the supplied 7.3 screenshots: rounded pink (#ff286b) stick figures, dark (#242327) outlined props, cream (#faf9f5) backgrounds and a subtle ground line. Use no generated raster images, new carousel or external image sources. 7.3 remains unchanged. The scenes depict community members discussing a shelter plan; a representative reviewing and approving a plan beside a six-month calendar; a ranger handing a kit to a visitor; a ranger placing supplies on a shelf; two rangers inspecting the building with a checklist and magnifying glass; and reusable shelves and kits beside roof sheets, steel and recycling arrows. SVGs are decorative, with the visible captions providing accessible descriptions.
- layout: Enlarge the 9.2 gallery beside the left-hand question and answer using 0.9fr / 1.3fr columns on desktop and a 28–64px gap. Use a two-column, three-row gallery with cream 4:3 frames and 28px vertical gaps. Reduce this question heading to a responsive 28–38px size. Stack the gallery below the text at widths below 1024px and let it use the full available width. Reuse this layout across questions 9.1–9.6. Each caption has a small pink stage number, a short dark title and a smaller subtitle; retain the full 9.2 answer.
- captions: 01 Community co-design — Plan the shelter with YAC.; 02 YAC approval — Allow about six months for approval.; 03 Ranger-led operation — Rangers run the supply and hire point.; 04 Weekly restocking — Replenish supplies from July to November.; 05 Seasonal inspections — Two rangers check before and after the wet season.; 06 Reuse and recycling — Reuse shelves and kits; recycle steel and roof sheets.

> First, the integration of the store will be co-designed with the Yintjingga Aboriginal Corporation, ensuring operations align perfectly with cultural protocols. Following this, YAC approval takes about 6 months. During operation, the ranger-operated supply and rental shelter is staffed by rangers. Rangers restock weekly, July to November. For maintenance, 2 checks are carried out by 2 rangers a year, before and after the wet season. Finally, at the end of its life: 4 workers, 1 to 2 weeks. Reuse shelves and kits. Recycle steel and roof sheets.

### [13.3] 7.3 How will the design be evaluated?
- **code:** 13.3 | **status:** SITE | **words:** 50 | **source:** User-provided Implementation Plan content
- gallery: Six original SVG scenes authored in app/report/ReportEvaluationIllustration.tsx, matching the approved 9.2 and 9.4 pink stick-figure style. The scenes show tourist and resident feedback on a clipboard; a satisfaction target; a monthly equipment inspection with a calendar and magnifying glass; repair or replacement of a damaged kit; building checks before and after the wet season; and an annual financial review with a ledger and calendar. Use no generated raster images or external image sources; the illustrations are decorative and described by their visible captions.
- layout: Use the shared enlarged two-column, three-row illustration gallery beside the left-hand question and full answer. Match the approved cream 4:3 frames, small numbered titles and subtitles. Below 1024px, stack the full-width gallery after the answer.
- captions: 01 Collect feedback — Ask tourists and residents about their experience.; 02 Satisfaction target — Aim for at least 80% satisfaction.; 03 Monthly equipment checks — Inspect rental equipment every month.; 04 Repair or replace — Repair damaged items or replace them.; 05 Wet-season reviews — Check conditions before and after the wet season.; 06 Annual financial review — Track yearly spending and income for sustainable operation.

> Feedback will be collected periodically from tourists and residents, aiming for at least 80% satisfaction. Rental equipment will be inspected monthly, with damaged items repaired or replaced. Additionally, conditions can be evaluated before and after the rainy season, and annual expenditure and revenue can be tracked to ensure sustainable operations.

### [13.4] 7.4 How will your project affect the future workings of the client or community?
- **code:** 13.4 | **status:** SITE | **words:** 56 | **source:** User-provided Implementation Plan content
- gallery: Six original SVG benefit illustrations authored in `ReportImplementationBenefitIllustration` in `app/report/ReportImplementationBenefitIllustration.tsx`. Reuse 9.2's pink stick figures, dark outlined props, cream backgrounds, rounded linework and subtle ground line. The scenes show a visitor beside a checked safety shield; a visitor positioning traction boards under a stranded vehicle; a visitor taking water beside a first-aid cabinet; a ranger with a checklist and clock; a visitor paying a ranger to hire equipment; and rental income linked to a ranger. Use no generated raster images or external image sources. SVGs remain decorative; visible captions describe the benefits. Keep the existing artwork and leave 7.3 unchanged.
- layout: Reuse 9.2's enlarged two-column, three-row gallery beside the left-hand question and full answer, including the 0.9fr / 1.3fr desktop split, smaller question heading, cream 4:3 illustration frames, numbered captions and small subtitles. Below 1024px, stack the full-width gallery after the text.
- captions: 01 Visitor safety — Keep essential support close at hand.; 02 Vehicle self-recovery — Visitors recover stranded vehicles with hired gear.; 03 Emergency supplies — Access water and first aid nearby.; 04 Reduced ranger workload — Fewer recovery call-outs free up ranger time.; 05 Community revenue — Equipment hire brings income to the community.; 06 Funding the Rangers — Rental income supports the Lama Lama Rangers.

> The solution improves visitor safety and supports self-recovery for stranded vehicles. As a result, visitors can recover their own vehicles and access emergency supplies close by. In addition, the solution reduces ranger workload and generates community revenue. Specifically, the solution generates a reliable, passive income stream through equipment rentals; this directly funds the Lama Lama Rangers.

### [13.5] 7.5 How can the client or community take ownership of the project?
- **code:** 13.5 | **status:** SITE | **words:** 73 | **source:** User-provided Implementation Plan content
- gallery: Six original SVG scenes authored in app/report/ReportOwnershipIllustration.tsx, matching the approved 9.2 and 9.4 pink stick-figure style. The scenes show handover of the shelter key to a ranger; a management handbook representing YAC oversight and cultural rules; daily equipment rentals; weekly restocking; a routine facility inspection; and sales/hire income supporting community-run operation. Use no generated raster images or external image sources; the illustrations are decorative and described by their visible captions.
- layout: Use the shared enlarged two-column, three-row illustration gallery beside the left-hand question and full answer. Match the approved cream 4:3 frames, small numbered titles and subtitles. Below 1024px, stack the full-width gallery after the answer.
- captions: 01 Community handover — Transfer the finished shelter to YAC and Rangers.; 02 YAC management — Manage the shelter in line with local cultural rules.; 03 Daily operation — Rangers manage the shelter and equipment rentals.; 04 Weekly restocking — Rangers top up supplies each week.; 05 Routine inspections — Rangers carry out regular facility checks.; 06 Community independence — Sales and hire income sustain community-run operations.
> The project will be handed over to the Yintjingga Aboriginal Corporation (YAC) and Lama Lama Rangers after construction. YAC will oversee management and ensure the facility follows local cultural rules and expections, at the same time Rangers will be managing daily operations, equipment rentals, weekly restocking and some inspections regularly. Revenue from sales and rentals will cover ongoing operating costs, which allows the community to manage the project independently in the long term.

### [13.6] 7.6 How will the solution be repaired if something goes wrong?
- **code:** 13.6 | **status:** SITE | **words:** 59 | **source:** User-provided Implementation Plan content
- gallery: Six original SVG scenes authored in app/report/ReportRepairIllustration.tsx, matching the approved 9.2 and 9.4 pink stick-figure style. The scenes show a ranger documenting a malfunction; reporting the issue; removing damaged equipment from service; repairing or replacing equipment; qualified contractors handling structural or electrical damage; and a completed safety inspection before equipment or facilities return to service. Use no generated raster images or external image sources; the illustrations are decorative and described by their visible captions.
- layout: Use the shared enlarged two-column, three-row illustration gallery beside the left-hand question and full answer. Match the approved cream 4:3 frames, small numbered titles and subtitles. Below 1024px, stack the full-width gallery after the answer.
- captions: 01 Document faults — Rangers record equipment or facility malfunctions.; 02 Report the issue — Rangers report malfunctions for follow-up.; 03 Remove from service — Keep damaged equipment out of use.; 04 Repair or replace — Repair damaged gear or replace it.; 05 Qualified contractors — Specialists handle structural and electrical damage.; 06 Return to service — Complete repairs and safety checks before reuse.

> According to the established maintenance procedure, Rangers are responsible for documenting and reporting malfunctions. Damaged equipment shall be taken out of service and either repaired or replaced. Issues involving structural or electrical damage will be handled by qualified contractors. Equipment or facilities may only be returned to service once repairs have been completed and safety inspections have been conducted.

---

## SECTION 14: Cost Analysis (id: cost)
- **section words:** 566 | **counts toward 4000:** yes

### [14.1] Initial construction and materials
- **code:** 14.1 | **status:** SITE | **words:** 62 | **source:** User-supplied cost analysis, 28 October 2026
- layout: above Table 3; selectable amounts highlight the existing donut categories. The structure category includes foundations; equipment includes recovery and communication items.
> The total initial construction and material cost of the Provisions Point is estimated at $87,386.65, as shown in the Full Cost Table. This includes $38,592 for the building structure (Feasly, n.d.), $20,000 for foundations, decking and stairs, $5,000 for interior fittings and solar equipment, and approximately $2,756 for recovery and communication equipment. The remaining costs cover essential supplies, design documents and contingency.

### [14.2] 8.11 Build and stock cost
- **code:** 14.2 | **status:** SITE | **words:** 144 | **source:** Delivery page Table 1 (rows 1 to 5 read from the site, rows 6 to 15 from slide 17). Arithmetic checked: total is correct.
- layout: full table, all rows visible, no pager.

> Table 3. Build and stock cost (AUD)
> | Item | Quantity and price | Total | Source |
> |---|---|---|---|
> | Frame, walls, roof | 24 m2 x $1,340 x 1.2 | $38,592.00 | Feasly (n.d.) |
> | Pillars, decks, stairs | 1 | $20,000.00 | Estimate |
> | Design documents (architect) | 10% of build | $5,859.20 | Estimate |
> | Shelves, counter, solar, battery | 1 | $5,000.00 | Estimate |
> | Traction boards (MAXTRAX MKII pair) | 2 x $249.99 | $499.98 | BuyWisely (n.d.-d) |
> | MAXTRAX Indeflate hose | 2 x $159.20 | $318.40 | BuyWisely (n.d.-c) |
> | 12 V compressor | 2 x $99.99 | $199.98 | BuyWisely (n.d.-e) |
> | XTM 7-piece recovery kit | 2 x $169.99 | $339.98 | BuyWisely (n.d.-f) |
> | GME MT610G PLB | 2 x $439.90 | $879.80 | Down Under Pilot Shop (n.d.) |
> | GME TX6160X UHF radio | 2 x $259.00 | $518.00 | BuyWisely (n.d.-a) |
> | Contingency | 20% of $72,207.34 | $14,441.47 | Estimate |
> | Water | 240 L x $0.60 | $144.00 | Estimate |
> | Canned food | 120 x $3.00 | $360.00 | Estimate |
> | Firewood, 20 kg bags | 8 x $22.98 | $183.84 | BuyWisely (n.d.-b) |
> | Safety flyers | 1 | $50.00 | Estimate |
> | Total | | $87,386.65 | |

### [14.3] 8.16 Projected revenue and profit
- **code:** 14.3 | **status:** SLIDES | **words:** 54 | **source:** Slide 18
- note: CHECK BEFORE SUBMISSION. In the base case, 44 hires at $200 is $8,800 against $8,950 revenue, but the low and high cases have bigger gaps. The 25-year profits are each $10 above simple multiplication of the yearly profit. The original explanatory note and TEAM TO ADD line were removed at the user’s request; table values remain unchanged.

> Table 4. Projected revenue and profit (AUD)
> | | Low estimate | Base estimate | High estimate |
> |---|---|---|---|
> | Visitors a year | 110 | 220 | 440 |
> | Kit rentals a year ($200 per week) | 18 | 44 | 70 |
> | Revenue a year | $4,540 | $8,950 | $17,900 |
> | Costs a year | $2,630 | $3,950 | $6,590 |
> | Profit a year | +$1,910 | +$5,000 | +$11,310 |
> | Profit over 25 years | +$47,760 | +$125,010 | +$282,760 |

### [14.4] 8.13 Funding
- **code:** 14.4 | **status:** SLIDES | **words:** 55 | **source:** Slide 19, tidied
- note: table unchanged; original $86,650 grant estimate note removed at the user’s request. The supplied funding paragraph uses $86,600.

> Table 5. Funding sources
> | Funding source | What it covers |
> |---|---|
> | Regional Tourism Infrastructure Fund (Qld) | Build, design, equipment. Up to $300,000 (DETSI, 2026). |
> | Indigenous Rangers Program (Australian Government) | Ranger land care to 2028 (National Indigenous Australians Agency [NIAA], n.d.). May cover Ranger time. |
> | Own income: sales and rentals | Stock and about $3,950 a year to run. |

### [14.5] 8.18 Maintenance and end-of-life costs
- **code:** 14.5 | **status:** SITE | **words:** 36 | **source:** User-supplied cost analysis, 28 October 2026
- layout: lifespan line ends at Year 25 with an $8,000 disposal estimate; replaces the missing-content placeholder.
> At the end of the facility's estimated 25-year lifespan, dismantling, transportation, recycling and waste disposal are expected to cost approximately $8,000, subject to contractor quotations. Reusable equipment and recyclable construction materials will be recovered wherever possible.

### [14.6] 8.12 Funding plan
- **code:** 14.6 | **status:** SITE | **words:** 36 | **source:** User-supplied cost analysis, 28 October 2026

> The project aims to secure $86,600 through government and community grants, with the remaining $786.65 funded through community contributions or fundraising. Potential funding opportunities include Queensland regional tourism and community infrastructure grant programs, subject to eligibility.

### [14.7] 8.14 Annual operating costs
- **code:** 14.7 | **status:** SITE | **words:** 40 | **source:** User-supplied cost analysis, 28 October 2026

> Annual operating costs are estimated at $3,950, covering routine inspections, cleaning, minor repairs and equipment maintenance. An additional $2,500 is allocated for replenishing supplies, although this is not included in the operating cost figures presented in the revenue projection table.

### [14.8] 8.15 Expected demand and revenue
- **code:** 14.8 | **status:** SITE | **words:** 50 | **source:** User-supplied cost analysis, 28 October 2026

> Based on the projected revenue table, the facility is expected to serve 220 visitors and provide 44 equipment rentals annually, generating approximately $8,950 in revenue. These figures are preliminary planning estimates based on expected demand during the visitor season and should be verified against actual visitor numbers and rental records.

### [14.9] 8.17 Long-term operating surplus
- **code:** 14.9 | **status:** SITE | **words:** 58 | **source:** User-supplied cost analysis, 28 October 2026

> The financial projection table estimates an annual operating surplus of $5,000, equivalent to $125,000 over 25 years under the base scenario. However, this simplified projection excludes additional restocking costs, inflation, equipment replacement and major repairs. Equipment will be inspected regularly and replaced when necessary, while maintenance budgets and rental prices will be reviewed annually to account for inflation.

### [14.10] 8.19 Financial sustainability
- **code:** 14.10 | **status:** SITE | **words:** 31 | **source:** User-supplied cost analysis, 28 October 2026

> Overall, the project shows potential for long-term financial sustainability, provided that operating costs remain controlled, visitor demand meets expectations and sufficient funds are reserved for maintenance, equipment replacement and eventual disposal.

- layout notes: reading order is 14.1, 14.2, 14.6, 14.4, 14.7, 14.8, 14.3, 14.9, 14.5, 14.10. All seven supplied paragraphs retain their exact wording. Existing tables, charts, scenarios and funding coverage remain. Add a proposed funding split bar ($86,600 / $786.65), base-scenario demand metrics (220 / 44 / $8,950), an additional-supplies label of $2,500 annually beside the revenue chart, a $5,000 / $125,000 surplus summary, and a shaded closing panel. New labels are supplementary UI; chart/table data is unchanged. The funding eligibility note, both figure-difference notes and the chart restocking-exclusion sentence are omitted at the user’s request. Supplied paragraphs remain unchanged. Original notes beneath the revenue and funding tables are removed at the user’s request.

---

## SECTION 15: Other considerations (id: other)
- **section words:** 267 | **counts toward 4000:** yes

### [15.1] Stakeholders and what is not yet checked
- **code:** 15.1 | **status:** SITE | **words:** 53 | **source:** Delivery page

> Stakeholders: YAC (owner and decision maker), Traditional Owners, the Lama Lama Rangers, visitors, Queensland Parks and Wildlife Service and Cook Shire Council.
> Not yet checked: land tenure and building approval, park rules for selling goods, personal locator beacon (PLB) hire rules, and insurance and liability for hired equipment. YAC should advise on each.

### [15.2] Visitor journey
- **code:** 15.2 | **status:** SITE | **words:** 73 | **source:** Delivery page

> Visitor journey, with the main worry at each step:
> 1. Plan: check road conditions and park rules. Worry: will the road be open?
> 2. Arrive: read the safety information, buy supplies. Worry: are there enough supplies?
> 3. Stuck: hire a kit and recover the vehicle. Worry: cost and time.
> 4. Emergency: use the PLB, or the radio if coverage is confirmed. Worry: will help come?
> 5. Leave: return the kit and give feedback.

### [15.3] Ranger journey
- **code:** 15.3 | **status:** SITE | **words:** 29 | **source:** Delivery page

> Ranger journey:
> 1. Before the season: train and stock the shelter.
> 2. Each week: restock and check kits.
> 3. Twice a year: inspect before and after the wet season.

### [15.4] Community reaction
- **code:** 15.4 | **status:** SITE | **words:** 63 | **source:** Delivery page

> Community reaction: The team has not yet asked YAC or Traditional Owners for their views. TEAM TO ADD: confirm this sentence is true, or add feedback received. Likely concerns are ground disturbance, extra Ranger work, visitor behaviour, theft and fire. This proposal is based on public sources and the EWB Challenge brief. It still needs to be checked with YAC and Traditional Owners.

### [15.5] Wider issues
- **code:** 15.5 | **status:** SITE | **words:** 48 | **source:** Delivery page

> Wider issues: waste from packaging, weeds and pests carried in firewood (use commercial bagged wood and check park rules), fire risk, theft, and wildlife safety. Safety flyers should warn visitors about estuarine crocodiles and say that swimming is unsafe. TEAM TO ADD: citation for the official crocodile warning.

---

### [15.6] Other Considerations
- **code:** 15.6 | **status:** SITE | **words:** 48 | **source:** User request, 28 October 2026
- layout: `/other-considerations` renders the same shared full-screen hero as Cost, with its own topic-relevant brainstorming photograph and the title "Other Considerations". Below the hero, an introductory lead paragraph discusses community and user reactions, followed by an animated user journey map diagram ("User Journey Map"), and four paragraphs detailing the journey sequence at Warokutal. Keep blocks 15.1–15.5 archived.
- diagram: `ReportUserJourney` renders an animated visitor journey map titled "User Journey Map — A visitor stranded by flooding at Warokutal". Five stages (Arriving, Flood cuts the road, Reaching the Provisions Point, Getting help, Recovering and leaving) are shown as columns. An emotional-experience curve drawn in SVG connects numbered dots (green = satisfied, red = unsatisfied) that spring in sequentially. An oval badge on the left displays "Emotional" stacked above "experience" inside a green outline. Below the curve, three rows list Event, Breakthrough and Pain point for each stage. The diagram data comes from block 15.2 content and the reference journey-map image. The component uses `motion/react` for scroll-triggered path-draw, spring dot reveals and staggered row fades, with `useReducedMotion` to disable animation. The card sits on a white background with the site's border radius and shadow treatment. On narrow screens the card scrolls horizontally.

> When introducing remote infrastructure into Lama Lama Country, community and user reactions must be carefully managed. Local stakeholders, including Traditional Owners and rangers, will need to be confident that the project respects the cultural heritage, avoids environmental degradation, and does not encourage unsafe wet season travel.

## SECTION 16: Recommendations (id: recommendations)
- **section words:** 240 | **counts toward 4000:** yes

### [16.1] What should happen next
- **code:** 16.1 | **status:** SITE | **words:** 112 | **source:** Delivery page
- layout: seven numbered steps.

> 1. Co-design the building, site and rules with YAC and Traditional Owners before any ground work.
> 2. Complete a site survey and cultural heritage clearance for the exact location.
> 3. Get flood level data and an engineer's design for flood and wind loads. Confirm the roof material.
> 4. Confirm the rules for hiring out beacons with the Australian Maritime Safety Authority, and test UHF radio coverage between Warokutal and the Ranger Base. TEAM TO ADD: citation for the beacon rules.
> 5. Check grant eligibility and apply.
> 6. Agree Ranger workload and repair budget with YAC.
> 7. Run a one-season trial of kit hire from the Ranger Base to test demand before building.

### [16.2] Further research
- **code:** 16.2 | **status:** SITE | **words:** 15 | **source:** Delivery page

> Further research: visitor counts, local flood heights, hire demand and the price visitors will accept.

---

### [16.3] 10.1 Recommendations
- **code:** 16.3 | **status:** SITE | **words:** 25 | **source:** Final text supplied by the user, 28 October 2026
- layout: `/recommendations` retains the shared full-screen discussion-photo hero. Below it, show “12. Recommendations” and the two guiding questions in the left column, with five numbered editorial rows in the wider right column. The section number and each 12.1–12.5 label are black. Each row has a numbered label, a short serif heading and the supplied recommendation, separated by fine rules. Stack the introduction above the list on tablets and phones; on narrow phones put each number above its heading and copy. Keep blocks 16.1–16.2 archived. The visible numbering follows the user's section 12; internal source codes remain in section 16.

> What further activity (outside your scope) is needed on the part of the client to ensure the project is successful?
> Is any further research needed?

### [16.4] 10.11 Community consultation
- **code:** 16.4 | **status:** SITE | **words:** 17 | **source:** Final text supplied by the user, 28 October 2026

> A community consultation is recommended to ensure the Lama Lama community’s requirements and expectations are properly met.

### [16.5] 10.12 Cost and funding
- **code:** 16.5 | **status:** SITE | **words:** 20 | **source:** Final text supplied by the user, 28 October 2026

> The cost and funding should be verified, which aims to make sure the project can be fully supported on time.

### [16.6] 10.13 Regular maintenance
- **code:** 16.6 | **status:** SITE | **words:** 18 | **source:** Final text supplied by the user, 28 October 2026

> Regular maintenance to the project is recommended due to unavoidable wear and tear of equipment, infrastructure, buildings, etc.

### [16.7] 10.14 Visitor feedback
- **code:** 16.7 | **status:** SITE | **words:** 15 | **source:** Final text supplied by the user, 28 October 2026

> Feedback from tourists and users should be collected after the first season to find improvements.

### [16.8] 10.15 Card payments
- **code:** 16.8 | **status:** SITE | **words:** 18 | **source:** Final text supplied by the user, 28 October 2026

> Card payment (EFTPOS) should be added, as the current lack of card payments limits income for the community.

---

## SECTION 17: References (id: references)
- **section words:** 907 | **counts toward 4000:** no
- layout: one plain list, alphabetical, no carousel. Source URLs are clickable links that open in a new tab. Formatted according to UTS APA 7th referencing style, with hanging indents and titles in italics.
- note: preserve the original entries; add photograph sources when new internet images are used. Some slide sources are not here (see PROJECT_CONTEXT.md, known problems).

### [17.1] Reference list
- **code:** 17.1 | **status:** SITE | **words:** 907 (original entries; photo credits added below) | **source:** Original references plus 17 montage and ten report subpage hero photograph credits and the Summary, Project details and Background hero video credits, plus the footer video source, seven Background carousel photographs and seven Summary materials photographs (two reuse existing Unsplash credits)


> *Aerial view of serene river and forest landscape* [Video]. (n.d.). Pexels. https://www.pexels.com/video/aerial-view-of-serene-river-and-forest-landscape-31914486/
> Anthropic. (2026). *Claude* [Large language model]. https://claude.ai
> Bidgee. (2008, February 11). *Evening monsoonal squall* [Photograph]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Evening_monsoonal_squall.jpg
> Bober, I. (2025, March). A simple guide to soft shackles. *Unsealed 4X4*. https://unsealed4x4.com.au/soft-shackles-a-simple-guide/
> BuyWisely. (n.d.-a). *GME TX6160X 5 watt IP67 UHF CB handheld radio*. https://buywisely.com.au/product/gme-tx6160x-5-watt-ip67-uhf-cb-handheld-radio-beyond-blue-foundation
> BuyWisely. (n.d.-b). *Hot Shots 20kg firewood*. https://buywisely.com.au/product/hot-shots-20kg-firewood
> BuyWisely. (n.d.-c). *MAXTRAX Indeflate (MTXIND)*. https://buywisely.com.au/au/product/maxtrax-indeflate-mtxind
> BuyWisely. (n.d.-d). *MAXTRAX MKII recovery tracks - black*. https://buywisely.com.au/au/product/maxtrax-mkii-recovery-tracks-black
> BuyWisely. (n.d.-e). *SCA Hurricane 12V 150PSI 50LPM tyre inflator*. https://buywisely.com.au/product/sca-hurricane-12v-150psi-50lpm-tyre-inflator-sca-club
> BuyWisely. (n.d.-f). *XTM 7 piece recovery kit*. https://buywisely.com.au/product/xtm-7-piece-recovery-kit-club-bcf
> Chain.com.au. (n.d.). *Black Rat 4WD recovery kit* [Photograph]. https://chain.com.au/collections/4wd-safety-recovery-kits
> Cook Shire Council. (2026, August 26). *Road conditions & closures*. https://www.cook.qld.gov.au/services/roads/road-conditions-closures/
> CSIRO. (2009, August 10). *Flooded road in the Herbert River catchment, northern Queensland* [Photograph]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:CSIRO_ScienceImage_10397_Flooded_road_in_the_Herbert_River_catchment_northern_Queensland.jpg
> Department of the Environment, Tourism, Science and Innovation. (2024a, May 3). *About: Lama Lama National Park (CYPAL)*. Parks and Forests. https://parks.qld.gov.au/parks/lama-lama/about
> Department of the Environment, Tourism, Science and Innovation. (2024b, May 3). *Lama Lama National Park (CYPAL)*. Parks and Forests. https://parks.qld.gov.au/parks/lama-lama
> Department of the Environment, Tourism, Science and Innovation. (2026, July). *Regional Tourism Infrastructure Fund: Round 2 program guidelines*. https://www.detsi.qld.gov.au/__data/assets/pdf_file/0023/406481/regional-tourism-infrastructure-fund-guidelines.pdf
> Down Under Pilot Shop. (n.d.). *GME MT610G PLB / ELT - GPS personal locator beacon*. https://downunderpilotshop.com.au/products/mt610g-gps-personal-locator-beacon
> Engineers Without Borders Australia. (n.d.). *Design area 1: Infrastructure and access*. EWB Challenge. https://ewbchallenge.org/challenge/port-stewart-lama-lama/design-area-1-infrastructure-and-access/
> Engineers Without Borders Australia. (2024). *EWB Challenge: Port Stewart, Lama Lama Country*. https://ewbchallenge.org/challenge/port-stewart-lama-lama/
> Espejo, M. (2025, January 4). *Aerial view of expansive wetlands landscape* [Video]. Pexels. https://www.pexels.com/video/aerial-view-of-expansive-wetlands-landscape-30081634/
> Feasly. (n.d.). *Construction cost per square metre in Australia (2026)*. https://www.feasly.com.au/guides/construction-cost-per-square-metre-australia
> Gillis, D. (2018, January 27). *People sitting on chair in front of table while holding pens during daytime* [Photograph]. Unsplash. https://unsplash.com/photos/KdeqA3aTnBY
> Google. (2026). *Gemini* [Large language model]. https://gemini.google.com
> Hawaiian Electric. (2025, July 17). *Emergency food stock* [Photograph]. https://www.hawaiianelectric.com/powering-hawaiis-future/tips-for-a-heart-healthy-emergency-food-supply
> Henderson, G. (2019, July 8). *Woman signing on white printer paper beside woman about to touch the documents* [Photograph]. Unsplash. https://unsplash.com/photos/HJckKnwCXxQ
> Hillebrand, S. (n.d.). *Cabin with solar panels* [Photograph]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Cabin_with_solar_panels.jpg
> KeepActive Australia. (2022, January 30). *Large family camping tent* [Photograph]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Large_family_camping_tent.jpg
> Kepner, L. (2020, October 28). *Architectural blueprints with drafting tools* [Photograph]. Unsplash. https://unsplash.com/photos/Yn8D5B8C-eY
> Leading Architecture. (2024, June). *Watertight concrete from Sika*. https://www.leadingarchitecture.co.za/watertight-concrete-from-sika/
> maks_d. (2025, May 2). *Calculator and office supplies on a desk* [Photograph]. Unsplash. https://unsplash.com/photos/54bvLAWhWAM
> McCullough, D. (2017, August 22). *Person drafting on blueprint* [Photograph]. Unsplash. https://unsplash.com/photos/-FPFq_trr2Y
> Menard Asia. (2025, January 16). *Concrete pile foundations: Types and benefits*. https://www.menard-asia.com/2025/01/16/concrete-pile-foundations/
> National Indigenous Australians Agency. (n.d.). *Indigenous Rangers Program funding extension update 1*. https://www.niaa.gov.au/news-and-media/indigenous-rangers-program-funding-extension-update-1
> NJM2010. (2011, January 15). *Queenslander house in Laidley* [Photograph]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Queenslander_house_in_Laidley.jpg
> Pimentel, A. (2026, February 11). *Construction workers in hard hats and safety vests on site* [Photograph]. Unsplash. https://unsplash.com/photos/xufUgY2AeGQ
> Queensland Parks and Wildlife Service. (2013). *Lama Lama National Park (Cape York Peninsula Aboriginal Land): Management statement*. Department of Environment, Science and Innovation. https://parks.des.qld.gov.au/__data/assets/pdf_file/0022/166423/lama-lama.pdf
> Reardon-Smith, M. (2023). The wet: Shifting seasons, climate change and natural cycles in Cape York Peninsula, Queensland. *Oceania*, *93*(3), 302–320. https://doi.org/10.1002/ocea.5377
> Ruzicka, A. (n.d.-a). *Lama Lama ranger in wetland reeds* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/lama-lama-rangers/
> Ruzicka, A. (n.d.-b). *Road through Lama Lama Country* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/visiting/
> Sun, D. (2026, July 1). *Architectural model with blueprints on wall* [Photograph]. Unsplash. https://unsplash.com/photos/1hEhb26Bn20
> Supercheap Auto. (2017, February). *How to rapidly deflate your tyres*. https://www.supercheapauto.com.au/blog/4wd-adventure/how-to-rapidly-deflate-your-tyres.html
> Testa, C. (2026, January 23). Tropical low forecast to bring heavy rain to northern Cape York, Gulf of Carpentaria. *ABC News*. https://www.abc.net.au/news/2026-01-23/tropical-low-heavy-rain-cape-york-gulf-of-carpentaria/106260620
> Tetrakis Sphericon. (2021, April 28). *Drone footage of a sunset in an Australian bushland* [Video]. Pexels. https://www.pexels.com/video/drone-footage-of-a-sunset-in-an-australian-bushland-7691418/
> The Shed Company. (n.d.). *Three Bay Manor shed under construction* [Photograph]. https://www.theshedcompany.com.au/projects/three-bay-manor/
> Tingey, W. (2020, March 6). *Stacks of paper documents and file folders* [Photograph]. Unsplash. https://unsplash.com/photos/snNHKZ-mGfE
> Todio, E. (n.d.). *Logistics of tourism in Port Stewart in Lama Lama Country*. EWB Challenge. https://ewbchallenge.org/forums/topic/logistics-of-tourism-in-port-stewart-in-lama-lama-country/
> usagito. (n.d.). *Laura Aboriginal Dance Festival 2017 (17 min. Digest)* [Video]. YouTube. https://www.youtube.com/watch?v=wR0iIcgOQ0E
> Van Tay Media. (2019, August 9). *People having meeting beside table* [Photograph]. Unsplash. https://unsplash.com/photos/people-having-meeting-beside-table-YK1AJT_5e5Q
> Watson, G. (n.d.). *Solar panels on house roof* [Photograph]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Solar_panels_on_house_roof.jpg
> Wikideas1. (2024, July 1). *Modular home* [Photograph]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Modular_home.jpg
> Wolff, C. (2018, March 8). *Pile of assorted-color books* [Photograph]. Unsplash. https://unsplash.com/photos/MiJTU6lqksg
> WoodSolutions. (n.d.). *Exterior timber stairs and deck* [Photograph]. https://www.woodsolutions.com.au/applications-products/exterior/stairs-exterior
> Yintjingga Aboriginal Corporation. (n.d.-a). *Cattle on Lama Lama Country* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/enterprises/
> Yintjingga Aboriginal Corporation. (n.d.-b). *Fauna and flora survey: Beetle* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/fauna-and-flora-surveys/
> Yintjingga Aboriginal Corporation. (n.d.-c). *Fire management beside a road* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/monitoring-the-impact-of-fire/
> Yintjingga Aboriginal Corporation. (n.d.-d). *Forested wetland* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/special-places/
> Yintjingga Aboriginal Corporation. (n.d.-e). *Freshwater wetland* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/annual-wetland-monitoring-freshwater/
> Yintjingga Aboriginal Corporation. (n.d.-f). *Lama Lama coastline* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/visiting/
> Yintjingga Aboriginal Corporation. (n.d.-g). *Lama Lama rangers outdoors* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/visiting/
> Yintjingga Aboriginal Corporation. (n.d.-h). *Mangrove roots* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/mangroves/
> Yintjingga Aboriginal Corporation. (n.d.-i). *Princess Charlotte Bay coastline* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/princess-charlotte-bay-bird-surveys/
> Yintjingga Aboriginal Corporation. (n.d.-j). *Rainforest creek* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/rainforests/
> Yintjingga Aboriginal Corporation. (n.d.-k). *Rangers reviewing a map* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/national-parks-joint-management/
> Yintjingga Aboriginal Corporation. (n.d.-l). *Sea Country shoreline* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/sea-country-indigenous-knowledge-collation/
> Yintjingga Aboriginal Corporation. (n.d.-m). *Turtle monitoring* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/marine-turtles-and-dugongs/
> Yintjingga Aboriginal Corporation. (n.d.-n). *Visiting*. Welcome to Lama Lama Country. https://www.lamalama.org.au/visiting/
> Yintjingga Aboriginal Corporation. (n.d.-o). *Visitors beside a waterway* [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/enterprises/

---

## SECTION 18: Supporting documentation (id: appendices)
- **section words:** 118 | **counts toward 4000:** no
- layout: Archived content from the removed `/appendices` page; do not render this section. The AI-use statement is displayed as section 11.3 on Appendix and Supporting Documentation using block 20.6.

### [18.3] 13.11 Statement of AI use and prompt log
- **code:** 18.3 | **status:** SITE | **words:** 118 | **source:** Delivery page

> The team used generative AI in four ways. Claude (Anthropic, 2026) helped find and summarise public sources and prices, draft background and criteria text, build the cost and revenue calculations, and turn the team's slides and research into website text. Gemini (Google, 2026) made the concept images for the team's presentation. An AI image tool made the concept images on this site. An AI coding agent placed the text and images into the website. The team used AI to work faster, keep the site consistent and show the idea visually. The team chose the design, built the Blender prototype and checked figures and citations against sources. AI images are concept images, not photographs. This is a draft declaration.

---

## SECTION 19: Project team and footer (id: closing)
- **section words:** 14 | **counts toward 4000:** no

### [19.1] Project team
- **code:** 19.1 | **status:** SITE | **words:** 14 | **source:** Project title and team details from blocks 0.1, 1.4 and 4.1
- layout: “Provisions Point” is the heading. Below it, show the tutorial and group name, then the six group members on a new line. Do not render the two call-to-action buttons or social media icons.

> Provisions Point
> Tutorial 4, Team 3 (FatZCC)
> Pinhong, Darrell, Tasneef, Isaac, Jude and Qijun

- background media: use the full approximately 29-second user-supplied `/Users/darrell/Downloads/13594747_3840_2160_30fps.mp4`, optimized to 1920 × 1080 H.264 with fast-start metadata and no audio at `/assets/report/footer/river-forest.mp4`. The poster `/assets/report/footer/river-forest.jpg` is extracted at one second. Cover-crop both assets, with a 60% black overlay behind the text. Loop silently inline while the footer is visible; pause off-screen and show only the poster for reduced motion. Replace the former placeholder and animated gradient canvas. The footage is decorative landscape context, not a verified view of Lama Lama Country.
- source and credit: *Aerial view of serene river and forest landscape*, Pexels, https://www.pexels.com/video/aerial-view-of-serene-river-and-forest-landscape-31914486/ (link supplied by the user). Creator and publication date could not be verified because the source page blocked access; use a title-first, n.d. citation in reference block 17.1. General licence: [Pexels License](https://www.pexels.com/license/). The supplied filename has a different numeric ID from the source URL; the source association is user-provided.

### [19.2] Footer bottom row (removed)
- **code:** 19.2 | **status:** SITE | **words:** 0 | **source:** Removed by the user, 28 October 2026
- layout: do not render the student proposal text, Acknowledgment link or large bottom wordmark. Keep the project team and footer navigation above. Size the footer to its content, with no fixed or minimum height; use 48px vertical padding on desktop and 32px on tablet and mobile.

---

## SECTION 20: Minutes (id: minutes)
- **counts toward 4000:** no
- layout: On Appendix and Supporting Documentation directly below the hero, show the Minutes heading, introductory note, two-column meeting details table, numbered headings, bullet lists and three-column action table. Use existing report typography, cream table headers and borders; keep the action table horizontally scrollable on small screens. Preserve screenshot wording and punctuation; do not reproduce editor spellcheck marks or table controls.

### [20.1] 11.2 Minutes
- **code:** 20.1 | **status:** SITE | **source:** User-supplied meeting minutes screenshots

> Task allocations were updated after this meeting. See the Group Declaration for final contributions.

### [20.2] Meeting Minutes 120min
- **code:** 20.2 | **status:** SITE | **source:** User-supplied meeting minutes screenshots

> Date and Time | 24 October 2026, 8:00 – 10:00 Microsoft Teams (online)
> Present | Joud, Tasneef, Isaac, Darrell, Pinhong, Qijun
> Organiser | Darrell Chee
> Minute Taker | Joud Al Arnaout
> Next Meeting | To be confirmed

### [20.3] 11.21 Agenda
- **code:** 20.3 | **status:** SITE | **source:** User-supplied meeting minutes screenshots

> Review the Assessment Task 3 website structure, rubric, and current progress.
> Confirm task allocation and responsibilities for each team member.
> Discuss website consistency, prototype/design progress, appendix requirements, AI evidence, and final review needs.

### [20.4] 11.22 Action Items
- **code:** 20.4 | **status:** SITE | **source:** User-supplied meeting minutes screenshots

> | Action Item | Responsible Person | Due Date |
> | --- | --- | --- |
> | Complete the About the Project and Background sections; compile appendices and AI evidence. | Joud | Before final submission |
> | Complete Problem & Design Criteria and Implementation Plan; review respectful language and community-focused content. | Isaac | Before final submission |
> | Complete Design Options and Selection; standardise website fonts, formatting, and table styles. | Tasneef | Before final submission |
> | Complete Prototyping; maintain the figure/table register; review the website against the rubric. | Qijun | Before final submission |
> | Collect Detailed Design and check the reference list information and APA 7 formatting.Finish prototyping model and Briefly detail. Done implementation plane and analysis cost parts. | Pinhong | Before final submission |
> | Complete Executive Summary, Cost Analysis, Other Considerations/Journey Map, and Recommendations; check word count and consistency. | Darrell | Before final submission |
> | Complete a final whole-team review of content, citations, links, and website presentation. | All members | Before final submission |

### [20.5] 11.23 Other items
- **code:** 20.5 | **status:** SITE | **source:** User-supplied meeting minutes screenshots

> The group agreed to use a consistent visual theme and formatting across all website pages.
> Each member agreed to review and revise their own section against the assessment rubric before submission.
> AI-use evidence and Prompt Log materials will be collected for the appendices together with the Group Charter and Meeting Minutes.

### [20.6] 11.3 Statement of AI use and prompt log
- **code:** 20.6 | **status:** SITE | **source:** User-supplied AI-use declaration
- layout: Render as a separate section after Minutes on Appendix and Supporting Documentation, with the full declaration in bold. Include its heading in the Appendix and Supporting Documentation navigation submenu, linked to section 11.3.

> The team used generative AI in four ways. Claude (Anthropic, 2026) helped find and summarise public sources and prices, draft background and criteria text, build the cost and revenue calculations, and turn the team's slides and research into website text. Gemini (Google, 2026) made the concept images for the team's presentation. An AI image tool made the concept images on this site. An AI coding agent placed the text and images into the website. The team used AI to work faster, keep the site consistent and show the idea visually. The team chose the design, built the Blender prototype and checked figures and citations against sources. AI images are concept images, not photographs. This is a draft declaration.

---


## SECTION 21: Team Charter (id: team-charter)
- **counts toward 4000:** no
- layout: Appendix and Supporting Documentation order is hero, Team Charter, Minutes, then 11.3 Statement of AI use and prompt log. Retain the supplied Group Charter and GROUP CHARTER headings, group name with underlined FATZCC, two bordered columns, question/answer spacing, and six original signatures. Stack columns on narrow screens. Match existing report fonts, cream accents and borders. Original user screenshots are stored unchanged in `app/report/assets/team-charter-page-1.png` and `team-charter-page-2.png`; CSS windows show only the signature areas, with alt text identifying each signatory. Do not display editor controls or spellcheck marks.

### [21.1] 11.1 Team Charter
- **code:** 21.1 | **status:** SITE | **source:** User-supplied charter screenshots

> 11.11 Group Charter
> GROUP CHARTER
> Group name:
> FATZCC

### [21.2] 11.12 Our ground rules:
- **code:** 21.2 | **status:** SITE | **source:** User-supplied charter screenshots

> Other than in class, when will we meet (what time, how often)?
> Once every week before our lecture on Tuesdays at 4:30 PM
> On average, how long should our meetings be?
> An hour and a half.
> Where will our meetings take place?
> In UTS library
> How do we inform each other when we can’t be there or are running late?
> Through our team group chat
> What does “on time” mean?
> Roughly 5 minutes before the meeting.
> How will we deal with lateness to meetings?
> Lateness is not an issue, if a team member has special circumstances that disallow them from being on time.
> How do we deal with members who don't participate enough, participate too much, or distract the group from its task?
> By completing our part, then supporting them in finishing their parts.
> What will we do if a group member's work doesn't meet our standards?
> Communicate about it and improve their work together.
> How are we going to make decisions?
> Through asking each member their opinion on a specific topic and working around disagreement.

### [21.3] 11.13 Our goals:
- **code:** 21.3 | **status:** SITE | **source:** User-supplied charter screenshots

> What is our group trying to accomplish?
> To achieve the highest grade possible

### [21.4] 11.14 Leadership
- **code:** 21.4 | **status:** SITE | **source:** User-supplied charter screenshots

> Will we appoint a leader?
> No
> What are their responsibilities?
> Ensuring that everyone contributes

### [21.5] 11.15 Our commitment to the charter:
- **code:** 21.5 | **status:** SITE | **source:** User-supplied charter screenshots

> We, the group named agree with the answers in our charter and will try our best to uphold them.
> Name
> Signature
> Joud
> Darrell
> Isaac
> Pinhong
> Qijun
> Tasneef

---


## Edits log (differences from the old text, so nothing changes silently)

1. Block 2.6 was removed at the user’s request on 26 October 2026. It previously spelled out YAC; check the first remaining use when reviewing abbreviations.
2. DETSI is defined once, in 6.3. Later citations use "(DETSI, 2024b)" (13.1) and "(DETSI, 2024a)" (6.8, tidied from the slide).
3. NIAA is defined at first citation in Table 5 (14.4).
4. Block 1.3 and 5.4 (How might we): slide 4 said "County" (changed to "Country"), "angers" (changed to "Rangers"), and "without" was added after "investment" to fix the grammar.
5. Block 7.1 (needs statement): slide 4 said "within Lama Lama National Park". Changed to "in Lama Lama Country" in the wording, because Warokutal is outside the national park boundary (see 6.8).
6. Block 6.8: slide 8 said "There is no alternative to visitors bringing their own recovery equipment" and "the only staffed safety point for the whole area". Both were softened because they cannot be proven.
7. Block 6.7: first sentence changed from "are only repaired when something breaks, rather than being maintained on a set schedule" to "are repaired when something breaks, not on a set schedule" to keep it short and avoid the absolute "only".
8. Block 18.6: "on the Solution and Delivery pages" changed to "in Design Selection and Cost Analysis", because those pages no longer exist.
9. Table 1 on the old Delivery page was called "Table 1". It is now Table 3 because tables are numbered in page order (Table 1 is the team table in 3.1).
10. Block 11.8 caption was written by the old site as alt text only. A caption was added so the figure is numbered and captioned as the template requires.
11. Headings renamed: "Organisations and sources in this proposal" became "Stakeholders and organisations" (5.5). The paragraphs wrongly sitting under that heading and under "Project stages" were moved to Background (6.3, 6.4).
12. Table 3 rows 6 to 15 use slide 17 item names because only rows 1 to 5 of the old site table were readable.


## Report montage photographs — 26 October 2026

All 17 image placeholders in the montage below the `/report` hero use downloaded real photographs. Slots 0–15 are the surrounding tiles; slot 16 is the centre tile. The Victoria camping photograph is contextual imagery, not a photograph of Warokutal. Photos do not imply endorsement of the proposal.

Images are stored locally as WebP files. Original framing is retained in the files; square tiles crop them with CSS. Source credit is Yintjingga Aboriginal Corporation unless a photographer is named on the source. Annette Ruzicka is credited for the two filenames that identify her. No open reuse licence was stated for the Lama Lama website photographs; attribution does not establish permission. The camping photograph is CC BY-SA 4.0; its resized WebP version retains that licence.

| Slot | Local asset | Description | Credit | Source page | Original image |
|---|---|---|---|---|---|
| 0 | `/assets/report/montage/photo-00.webp` | Aerial view of the forested Lama Lama coastline | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/visiting/ | https://www.lamalama.org.au/wp-content/uploads/2016/08/Visiting-banner.png |
| 1 | `/assets/report/montage/photo-01.webp` | Unsealed road through open woodland on Lama Lama Country | Annette Ruzicka | https://www.lamalama.org.au/visiting/ | https://www.lamalama.org.au/wp-content/uploads/2016/08/Visiting-banner-3-Photo-Annette-Ruzicka.png |
| 2 | `/assets/report/montage/photo-02.webp` | Lama Lama rangers talking outdoors beneath trees | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/visiting/ | https://www.lamalama.org.au/wp-content/uploads/2016/08/Visiting-banner2.png |
| 3 | `/assets/report/montage/photo-03.webp` | Lama Lama ranger standing among tall wetland reeds | Annette Ruzicka | https://www.lamalama.org.au/lama-lama-rangers/ | https://www.lamalama.org.au/wp-content/uploads/2016/08/Lama-Lama-rangers-banner-Photo-Annette-Ruzicka.png |
| 4 | `/assets/report/montage/photo-04.webp` | Cattle grazing in open woodland on Lama Lama Country | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/enterprises/ | https://www.lamalama.org.au/wp-content/uploads/2016/08/MarinaPlainsCow-banner.png |
| 5 | `/assets/report/montage/photo-05.webp` | Visitors beside a tree-lined waterway on Lama Lama Country | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/enterprises/ | https://www.lamalama.org.au/wp-content/uploads/2016/08/tourism-banner.png |
| 6 | `/assets/report/montage/photo-06.webp` | Shaded rainforest creek on Lama Lama Country | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/rainforests/ | https://www.lamalama.org.au/wp-content/uploads/2016/12/research-rainforests-banner.png |
| 7 | `/assets/report/montage/photo-07.webp` | Mangrove roots beside a tidal waterway | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/mangroves/ | https://www.lamalama.org.au/wp-content/uploads/2016/12/mangrove-banner.png |
| 8 | `/assets/report/montage/photo-08.webp` | Aerial view of a wetland surrounded by forest on Lama Lama Country | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/special-places/ | https://www.lamalama.org.au/wp-content/uploads/2016/08/Special-Places-banner-1.jpg |
| 9 | `/assets/report/montage/photo-09.webp` | Rangers reviewing a map during joint park management work | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/national-parks-joint-management/ | https://www.lamalama.org.au/wp-content/uploads/2016/08/Gav-Parks-Peter-fence-map-130905-6558.jpg |
| 10 | `/assets/report/montage/photo-10.webp` | Freshwater wetland bordered by trees on Lama Lama Country | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/annual-wetland-monitoring-freshwater/ | https://www.lamalama.org.au/wp-content/uploads/2016/12/Our-research-freshwater-banner.jpg |
| 11 | `/assets/report/montage/photo-11.webp` | Green beetle photographed during fauna and flora surveys | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/fauna-and-flora-surveys/ | https://www.lamalama.org.au/wp-content/uploads/2016/12/flora-and-fauna-banner.png |
| 12 | `/assets/report/montage/photo-12.webp` | Managed roadside burn beside an unsealed road | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/monitoring-the-impact-of-fire/ | https://www.lamalama.org.au/wp-content/uploads/2016/12/fire-banner-1.jpg |
| 13 | `/assets/report/montage/photo-13.webp` | Rocky shoreline and shallow sea on Lama Lama Country | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/sea-country-indigenous-knowledge-collation/ | https://www.lamalama.org.au/wp-content/uploads/2016/12/Our-research-sea-country-banner.png |
| 14 | `/assets/report/montage/photo-14.webp` | Ranger examining a coastal site during turtle monitoring | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/marine-turtles-and-dugongs/ | https://www.lamalama.org.au/wp-content/uploads/2016/12/Our-research-Turtles-banner-2.jpg |
| 15 | `/assets/report/montage/photo-15.webp` | Forested coastline beside Princess Charlotte Bay | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/princess-charlotte-bay-bird-surveys/ | https://www.lamalama.org.au/wp-content/uploads/2016/12/PCB-bird-surveys-banner.png |
| 16 | `/assets/report/montage/photo-16.webp` | Family camping tent at a Great Ocean Road campground in Victoria | KeepActive Australia | https://commons.wikimedia.org/wiki/File:Large_family_camping_tent.jpg | https://upload.wikimedia.org/wikipedia/commons/a/a5/Large_family_camping_tent.jpg |

Do not display the photo-credit subtitle beneath the Summary montage. Full photograph references remain on the References page in report block 17.1 and are exported to `app/report/report-blocks.json`. The machine-readable image register is `app/report/montage-photos.json`.


## Report subpage hero media — 28 October 2026

Ten subpages use distinct real photographs sourced from Unsplash; Project details uses user-supplied Pexels video footage and Background uses a user-supplied recording of a YouTube video. Summary (`/report`) retains its existing hero and montage. These media illustrate the page topics; they do not document Warokutal, the proposed shelter, its actual prototype or its construction. The bushland video provides Australian landscape context. The Background footage shows the Laura Aboriginal Dance Festival; it is contextual footage and does not identify the performers as Lama Lama Rangers or imply their endorsement. The prototype image is a photograph of a physical architectural model.

Each photograph source page identifies a photographer and the Unsplash License (https://unsplash.com/license). Downloaded photographs are served locally as 2560-pixel-wide WebP images; CSS crops them to fill the hero, with page-specific object positions. Source URLs, original image URLs, dimensions, descriptive alt text and licence details are stored in `app/report/hero-photos.json`. All current media sources also appear in reference block 17.1. Project details uses the full approximately 45-second clip from user-supplied `7691418-uhd_3840_2160_30fps.mp4`, optimized to a 1920 × 1080 H.264 MP4 with fast-start metadata. Its JPEG poster is extracted at one second. Video plays muted, loops inline and retains the hero crop, parallax and title; reduced-motion users see the static poster. The poster also remains beneath the video while it loads. The footage and derived poster are credited to Tetrakis Sphericon under the Pexels License.

| Page | Local asset | Description / alt text | Photographer | Source | Licence |
|---|---|---|---|---|---|
| Project Details | `/assets/report/heroes/project-details.mp4`; poster `/assets/report/heroes/project-details.jpg` | Aerial view of Australian bushland at sunset | Tetrakis Sphericon | https://www.pexels.com/video/drone-footage-of-a-sunset-in-an-australian-bushland-7691418/ | [Pexels License](https://www.pexels.com/license/) |
| Background | `/assets/report/heroes/background.mp4`; poster `/assets/report/heroes/background.jpg` | Dancers performing at the Laura Aboriginal Dance Festival | usagito | https://www.youtube.com/watch?v=wR0iIcgOQ0E | No open reuse licence verified |
| Design Solutions | `/assets/report/heroes/options.webp` | Designer comparing and drafting architectural plans on a worktable | Daniel McCullough | https://unsplash.com/photos/-FPFq_trr2Y | [Unsplash License](https://unsplash.com/license) |
| Detailed Design | `/assets/report/heroes/design.webp` | Architectural plans with drafting pencils, a ruler and a storage tube | Lucas Kepner | https://unsplash.com/photos/Yn8D5B8C-eY | [Unsplash License](https://unsplash.com/license) |
| Prototype | `/assets/report/heroes/prototyping.webp` | Physical architectural scale model displayed beside building plans | Declan Sun | https://unsplash.com/photos/1hEhb26Bn20 | [Unsplash License](https://unsplash.com/license) |
| Implementation | `/assets/report/heroes/implementation.webp` | Construction workers wearing hard hats and safety vests at a building site | Agustín Pimentel | https://unsplash.com/photos/xufUgY2AeGQ | [Unsplash License](https://unsplash.com/license) |
| Cost | `/assets/report/heroes/cost.webp` | Calculator, paperwork and office supplies for cost planning | maks_d | https://unsplash.com/photos/54bvLAWhWAM | [Unsplash License](https://unsplash.com/license) |
| Other Considerations | `/assets/report/heroes/other-considerations.webp` | Team gathering around a table to brainstorm and review ideas | Van Tay Media | https://unsplash.com/photos/people-having-meeting-beside-table-YK1AJT_5e5Q | [Unsplash License](https://unsplash.com/license) |
| Recommendations | `/assets/report/heroes/recommendations.webp` | People seated around a table in a meeting room discussing strategies and taking notes | Dylan Gillis | https://unsplash.com/photos/KdeqA3aTnBY | [Unsplash License](https://unsplash.com/license) |
| Appendix and Supporting Documentation | `/assets/report/heroes/supporting-documents.webp` | Two people reviewing and signing a printed document on an office table | Gabrielle Henderson | https://unsplash.com/photos/HJckKnwCXxQ | [Unsplash License](https://unsplash.com/license) |
| References | `/assets/report/heroes/references.webp` | Stack of books used to illustrate research and reference sources | Claudia Wolff | https://unsplash.com/photos/MiJTU6lqksg | [Unsplash License](https://unsplash.com/license) |
| Appendices | `/assets/report/heroes/appendices.webp` | Stacks of paper documents and folders illustrating supporting records | Wesley Tingey | https://unsplash.com/photos/snNHKZ-mGfE | [Unsplash License](https://unsplash.com/license) |

### Background hero video — 28 October 2026

Use the full approximately 33-second user-supplied `Screen Recording 2026-10-28 at 15.55.29.mov`. The original 3024 × 1964 recording has a 164-pixel top black bar and a 98-pixel bottom black bar. Crop to `3024:1702:0:164` before scaling to 1920 × 1080, converting to 30 fps H.264 MP4 and adding fast-start metadata. Serve `/assets/report/heroes/background.mp4` and a matching cropped poster `/assets/report/heroes/background.jpg` extracted at one second. Retain muted, looping inline playback, cover cropping and the reduced-motion static poster. Credit usagito, *Laura Aboriginal Dance Festival 2017 (17 min. Digest)*, YouTube, https://www.youtube.com/watch?v=wR0iIcgOQ0E. The upload date could not be verified, so the reference uses n.d.; 2017 is part of the supplied video title. No open reuse licence was verified. Reference block 17.1 contains the citation.

### Background carousel image credits — 28 October 2026

Seven photographs replace the unrelated placeholder portraits and vehicle images. Original downloads were inspected at the carousel crop ratio. `app/report/background-photos.json` records each pairing, description, author, source page, original image URL, licence status, context and delivered dimensions. All files are converted to WebP at quality 90, limited to 1920 pixels wide without upscaling, and displayed using the existing cover crop.

The photographs illustrate each paragraph; they do not document the proposed shelter, a visitor emergency or consultation about this student project. The monsoon photo is from Darwin and the flooded-road photo is from the Herbert River catchment, not Lama Lama Country. The access-road image illustrates visitor access rather than depicting either named campground. The ranger image illustrates ranger work rather than the staffed base.

| Point | Local asset | Subject and relevance | Creator credit | Source page | Licence |
| --- | --- | --- | --- | --- | --- |
| 2.1 | `/assets/report/background/lama-lama-coastline.webp` | Lama Lama coastline with coastal forest and wetlands. Lama Lama Country. | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/visiting/ | No open reuse licence identified |
| 2.2 | `/assets/report/background/lama-lama-wetland.webp` | Forested wetland on Lama Lama Country. Lama Lama Country. | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/special-places/ | No open reuse licence identified |
| 2.3 | `/assets/report/background/lama-lama-ranger.webp` | Lama Lama ranger working among wetland reeds. Ranger work; not a photograph of the Port Stewart Ranger Base. | Annette Ruzicka | https://www.lamalama.org.au/lama-lama-rangers/ | No open reuse licence identified |
| 2.4 | `/assets/report/background/monsoon-squall.webp` | Dark monsoon clouds and rain over the sea near Darwin. Darwin, Northern Territory; illustrative monsoon context, not Lama Lama Country. | Bidgee | https://commons.wikimedia.org/wiki/File:Evening_monsoonal_squall.jpg | CC BY 3.0 — https://creativecommons.org/licenses/by/3.0/ |
| 2.5 | `/assets/report/background/flooded-road.webp` | Floodwater covering a road in the Herbert River catchment, northern Queensland. Herbert River catchment, northern Queensland; illustrative access disruption, not Warokutal. | CSIRO | https://commons.wikimedia.org/wiki/File:CSIRO_ScienceImage_10397_Flooded_road_in_the_Herbert_River_catchment_northern_Queensland.jpg | CC BY 3.0 — https://creativecommons.org/licenses/by/3.0/ |
| 2.6 | `/assets/report/background/lama-lama-access-road.webp` | Unsealed red dirt access road through Lama Lama Country. Local visitor access; not a photograph of either named campground. | Annette Ruzicka | https://www.lamalama.org.au/visiting/ | No open reuse licence identified |
| 2.7 | `/assets/report/background/joint-management.webp` | Rangers reviewing a map together during joint park management. Joint management; not consultation on this student proposal. | Yintjingga Aboriginal Corporation | https://www.lamalama.org.au/national-parks-joint-management/ | No open reuse licence identified |

All seven sources are included in reference block 17.1; existing credits for the five Lama Lama photographs are reused. Original URLs are recorded in the image manifest. The two Creative Commons photographs include author, source, licence links and conversion/crop notices in References. The five Lama Lama website images have no identified open reuse licence; attribution does not establish an open licence. Photograph-specific APA formatting is outside the four source types covered by the UTS referencing skill and should be checked against the full UTS guide.


### Summary materials photograph register — 28 October 2026

The first seven Proposed Materials and Cost Summary cards use real photographs. Each image illustrates part of its category rather than every bundled item. The contingency photograph illustrates budget planning. The images do not document the proposed building or establish the estimates. The estimated total has no photograph. Local images are resized without upscaling, converted to WebP and displayed with a square cover crop. `app/report/materials-photos.json` records the source image URL, attribution, licence status, alt text and delivered dimensions. Each card has a source link; reference block 17.1 includes all seven sources, reusing the existing Kepner and maks_d entries.

| Cost item | Local asset | Creator or source credit | Source page | Licence or reuse status |
| --- | --- | --- | --- | --- |
| Frame, walls and roof | `/assets/report/materials/frame.webp` | The Shed Company | https://www.theshedcompany.com.au/projects/three-bay-manor/ | No open reuse licence identified; photographer not named |
| Piles, deck and stairs | `/assets/report/materials/deck.webp` | WoodSolutions | https://www.woodsolutions.com.au/applications-products/exterior/stairs-exterior | No open reuse licence identified; photographer not named |
| Shelves, counter, solar panel and battery | `/assets/report/materials/solar.webp` | Gray Watson | https://commons.wikimedia.org/wiki/File:Solar_panels_on_house_roof.jpg | CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/) |
| Recovery kits, PLBs and UHF radios | `/assets/report/materials/recovery.webp` | Chain.com.au | https://chain.com.au/collections/4wd-safety-recovery-kits | No open reuse licence identified; photographer not named |
| Water, food, firewood and safety flyers | `/assets/report/materials/supplies.webp` | Hawaiian Electric | https://www.hawaiianelectric.com/powering-hawaiis-future/tips-for-a-heart-healthy-emergency-food-supply | No open reuse licence identified; article by Darren Pai, photographer not named |
| Design documents | `/assets/report/materials/documents.webp` | Lucas Kepner | https://unsplash.com/photos/Yn8D5B8C-eY | Unsplash License (https://unsplash.com/license) |
| Contingency (20%) | `/assets/report/materials/contingency.webp` | maks_d | https://unsplash.com/photos/54bvLAWhWAM | Unsplash License (https://unsplash.com/license) |


### Public asset naming

Browser-facing legacy brand names in asset filenames use `assignment`. All image, video and logo bytes, page wording, layout and interactions are preserved. Original asset download records are retained internally in `docs/asset-provenance/` instead of being served from `public/`.
