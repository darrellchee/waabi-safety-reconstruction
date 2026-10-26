# REPORT_CONTENT.md

This is the source of truth for the `/report` page. Read `PROJECT_CONTEXT.md` first.

## How to read this file

1. Text inside blockquotes (lines that start with `>`) is PAGE TEXT. Copy it word for word. Do not edit, shorten or improve it.
2. Everything outside blockquotes (bullets, notes, tables of counts) is instruction to you. Never put it on the page.
3. If something is not in this file, it does not go on the page.
4. "TEAM TO ADD: ..." inside page text is part of the page text. Keep it and highlight it.
5. Block title (the `###` line) = the heading shown on the page for that block, unless the notes say "no heading".

## Report navigation layout

- The header menu shows text links only: Summary, Background, Options, Design, Prototype, Delivery, Cost, References and Appendices. Do not show placeholder thumbnails beside these links.

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
| 2 | Executive Summary | `summary` | 13 | 567 | 0 | 567 | no | 0 | 6 |
| 3 | Group Declaration | `group-declaration` | 1 | 81 | 0 | 81 | yes | 0 | 0 |
| 4 | Team Acknowledgement | `acknowledgement` | 1 | 54 | 0 | 54 | yes | 0 | 0 |
| 5 | Project details | `project-details` | 5 | 215 | 0 | 215 | yes | 0 | 1 |
| 6 | Background | `background` | 10 | 425 | 0 | 425 | yes | 0 | 1 |
| 7 | Problem Description | `problem` | 2 | 114 | 0 | 114 | yes | 0 | 1 |
| 8 | Design Criteria | `criteria` | 8 | 241 | 0 | 241 | yes | 0 | 4 |
| 9 | Design solution options | `options` | 4 | 299 | 0 | 299 | yes | 0 | 0 |
| 10 | Design Selection | `selection` | 4 | 273 | 0 | 273 | yes | 0 | 0 |
| 11 | Detailed Design | `design` | 8 | 514 | 0 | 514 | yes | 0 | 0 |
| 12 | Prototyping | `prototyping` | 1 | 0 | 350 | 350 | yes | 1 | 0 |
| 13 | Implementation Plan | `implementation` | 3 | 372 | 0 | 372 | yes | 0 | 0 |
| 14 | Cost Analysis | `cost` | 5 | 364 | 80 | 444 | yes | 1 | 0 |
| 15 | Other considerations | `other` | 5 | 266 | 0 | 266 | yes | 0 | 0 |
| 16 | Recommendations | `recommendations` | 2 | 127 | 0 | 127 | yes | 0 | 0 |
| 17 | References | `references` | 1 | 706 | 0 | 706 | no | 0 | 0 |
| 18 | Supporting documentation | `appendices` | 6 | 187 | 0 | 187 | no | 4 | 0 |
| 19 | Call to action and footer | `closing` | 2 | 36 | 0 | 36 | no | 0 | 0 |
| | **Body (sections 3 to 16)** | | | **3345** | **430** | **3775** | | | |
| | **Whole page** | | 87 | **4914** | | | | | |

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
- **code:** 0.2 | **status:** MEDIA | **words:** 0 | **source:** Old home page hero
- media: keep the hero image strip and video UI. Show `(change to our assignment content)` in place of the template images and videos.

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
- **section words:** 567 | **counts toward 4000:** no
- note: this follows the EWB executive summary format. Do not alter the order of the blocks. Heading styles: title Heading 1, section headings Heading 2.

### [2.1] Snapshot (removed)
- **code:** 2.1 | **status:** SITE | **words:** 0 | **source:** Removed by the user, 26 October 2026
- note: retain the code but do not render this block.

### [2.2] Design Area(s) (removed)
- **code:** 2.2 | **status:** SLIDES | **words:** 0 | **source:** Removed by the user, 26 October 2026
- note: retain the code but do not render this block. The Design Area row remains in the hero's cover details (1.2).

### [2.3] Keywords
- **code:** 2.3 | **status:** DRAFT | **words:** 16 | **source:** Built from the team's own text
- layout: render once as a labelled row in the hero's cover details panel, after the How Might We statement. Retain code 2.3; do not render a second copy in the Executive Summary.

> Keywords: flood resilience, visitor infrastructure, Lama Lama Country, Warokutal, vehicle recovery, remote tourism, safety, Cape York

### [2.4] Proposal Summary
- **code:** 2.4 | **status:** SITE | **words:** 46 | **source:** Home page
- layout: show the "Proposal Summary" heading and this paragraph above the large "Overview of Design" heading.

> This project aims to give visitors to Warokutal (Safari Camp) access to water, supplies and vehicle recovery equipment when floods damage the roads. It proposes an elevated, low maintenance shelter that stocks essentials and hires out recovery kits, personal locator beacons and ultra high frequency radios.

### [2.5] Overview of design: summary
- **code:** 2.5 | **status:** SITE | **words:** 146 | **source:** User-provided text, 26 October 2026
- layout: reuse the Design solution options story layout, styling, counter, progress line, image transitions and desktop/mobile scroll animations. Show "Overview of Design" as the large heading below the Proposal Summary heading and paragraph (2.4), then the four supplied points as four story slides in order. Do not render the former "Overview of design: summary" subheading. Slide headings: "Flood resilience and supply security", "Implementation", "Physical components", "Facility users". Use the four real photographs documented below, in slide order. These are examples of the topics, not photographs of the proposed Provisions Point facility. Keep the following stats, considerations, materials and figures below this story.


- image 1: `public/assets/report/overview/flood-resilience.webp`; source: https://commons.wikimedia.org/wiki/File:Queenslander_house_in_Laidley.jpg ; original: https://upload.wikimedia.org/wikipedia/commons/b/b1/Queenslander_house_in_Laidley.jpg ; creator: NJM2010; date: 15 January 2011; licence: CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/). Resized and converted to WebP, displayed with a crop under the same licence. Alt: "Real example: a Queenslander house raised on posts in Laidley, Queensland."
- image 2: `public/assets/report/overview/prefabricated-construction.webp`; source: https://commons.wikimedia.org/wiki/File:Modular_home.jpg ; original: https://upload.wikimedia.org/wikipedia/commons/d/dd/Modular_home.jpg ; creator: Wikideas1; date: 1 July 2024; licence: CC0 1.0 (https://creativecommons.org/publicdomain/zero/1.0/). Resized and converted to WebP, displayed with a crop. Alt: "Real example: prefabricated home sections beside a prepared foundation during construction."
- image 3: `public/assets/report/overview/solar-powered-shelter.webp`; source: https://commons.wikimedia.org/wiki/File:Cabin_with_solar_panels.jpg ; original: https://upload.wikimedia.org/wikipedia/commons/5/52/Cabin_with_solar_panels.jpg ; creator: Steve Hillebrand, U.S. Fish and Wildlife Service; date: not given; licence: public domain, as stated on the source page. Resized and converted to WebP, displayed with a crop focused on the cabin. Alt: "Real example: solar panels on the metal roof of a remote wooden cabin."
- image 4: `public/assets/report/overview/facility-users.webp`; source: https://www.lamalama.org.au/enterprises/ ; original: https://www.lamalama.org.au/wp-content/uploads/2016/08/tourism-banner.png ; credit: Yintjingga Aboriginal Corporation (individual photographer not stated); date: not stated; licence: no reuse licence stated on the source page. Converted to WebP, displayed with a crop focused on the visitors. Use the existing "Visitors beside a waterway" reference. Alt: "Visitors fishing beside a waterway on Lama Lama Country."

> The design achieves emergency flood resilience and supply security through an elevated, low maintenance shelter design equipped with lockable storage vaults, and self-service recovery gear distribution racks.
> The implementation of this design is supported through prefabricated durable building components, local community partnerships to aid with stocking and maintenance, and clear signage guiding users when flooding occurs.
> The physical components of the design include an elevated stilt mounted platform designed to remain above peak flood levels, a weatherproof secure storage shed that contains non-perishable food and drink, equipment lockers for PLB’s, UHF radios and vehicle recovery kits, and most importantly, solar powered lighting and battery-charging stations to ensure visibility and access during day or night.
> Visitors, traditional owners and rangers traveling through Warokutal will use this facility, either during or immediately after severe floods when unsealed roads become unusable, stranding travellers without immediate access to rescue services.

### [2.6] Overview of design: key points (removed)
- **code:** 2.6 | **status:** DRAFT | **words:** 0 | **source:** Removed by the user, 26 October 2026
- note: retain the code but do not render this block.

### [2.7] Key numbers (removed)
- **code:** 2.7 | **status:** DRAFT | **words:** 0 | **source:** Removed by the user, 26 October 2026
- note: retain the code but do not render this block. The three stat cards and their placeholder images are removed.

### [2.8] Key Considerations
- **code:** 2.8 | **status:** DRAFT | **words:** 194 | **source:** User-provided content, 26 October 2026
- layout: large Key Considerations heading followed by four editorial rows separated by thin rules, with muted 01–04 labels, bold questions in the middle and unchanged answers on the right. On mobile, answers sit beneath their questions. Implementation retains three numbered steps. No cards or images in this block. Blank blockquote lines separate each question group.

> Where the recommended materials are sourced from? (i.e. externally or locally available)
> Heavy duty galvanised steel posts and fiber-cement or marine-grade aluminium cladding sourced from regional industrial hubs to be able to resist corrosion and termite damage. They will be sourced in bulk from trusted regional suppliers, with stock that will be rotated on a seasonal wet-season schedule.
>
> What are the key maintenance requirements?
> Annual structural inspections before wet seasons to make sure all is good, inventory audis every 6 months, water flitration units, and communication equipment batteries, and clear operational guidelines and user accountability protocols for borrowed vehicle recovery gear and PLB’s.
>
> How do you propose the design might be implemented?
> Community consultation with Lama Lama Traditional Owners and local land councils to finalise placement and cultural protocols.
> Prefabrication of structural parts off-site to minimise environmental disturbance on Lama Lama country.
> Assembly on-site by local work crews supported by specialised contractors, utilising light machinery.
>
> What additional consultation/feedback/research might be required to validate your design proposal? What might the next steps be to make this idea happen?
> Conduction water assessments with Traditional Owners to determine precise historical flood heights for best and optimal elevation.

### [2.9] Proposed Materials and Cost Summary
- **code:** 2.9 | **status:** DRAFT | **source:** User-provided summary estimates
- layout: centered heading and introduction, then a full-section-width 34px horizontal stacked bar (30px on phones) above the seven square cards. No chart panel or enclosing decorative parent. The subtotal appears above the bar and a compact item detail readout below it, followed by the cards with tight 16px horizontal / 24px vertical gaps. Cards remain four then three (centered) on desktop, two columns on tablets and one on narrow phones. The bar has six segments proportional to the $34,000 listed-item subtotal, matching colours and item numbers in cards and legend. Hover, keyboard focus, or click/tap to pin highlights a segment and its matching card and table row; clicking again unpins, Escape clears the pin and keyboard focus. Segments lift and glow, with reduced-motion support. Percentages and item numbers appear in the bar on desktop, numbers only on narrow phones. The seventh card shows the rough total budget, which is not an additional cost item. The legend table and budget note sit below the cards.

> This section contains an overview of key materials, labour requirements, and an overall cost estimate for the project (in both local currency where your project is located and AUD). For example:

### [2.10] Cost breakdown
- **code:** 2.10 | **status:** DRAFT | **source:** User-provided summary estimates

> Estimated costs in AUD (also the project's local currency).
> | Item | Approximate cost (AUD) |
> |---|---|
> | Structural steel framing, elevated platforms, marine-grade fixings | $12,000 |
> | Weatherproof storage containers and secure locking mechanisms | $3,500 |
> | Emergency supplies | $2,500 |
> | Off grid solar power kit | $3,000 |
> | Freight and remote transport logistics | $5,000 |
> | Local Indigenous constructions workforce and labour costs | $8,000 |

### [2.11] Estimated Total Cost
- **code:** 2.11 | **status:** DRAFT | **source:** User-provided rough budget; subtotal calculated from the six listed items
- layout: seventh square card shows roughly $40,000 AUD. The explanatory note appears below the cost table. These summary estimates do not replace the separate detailed Cost Analysis tables in Section 14.

> Roughly about $40,000 AUD
> The listed items total $34,000 AUD. The remaining $6,000 of the rough $40,000 budget is unallocated.

### [2.12] Figure 1
- **code:** 2.12 | **status:** MEDIA | **words:** 25 | **source:** Old home page image
- alt: Concept image: a shelf holding water containers, tins with blank labels and bagged firewood.

> Figure 1. Concept image: a shelf holding water containers, tins with blank labels and bagged firewood. Made with an AI image tool (see Appendix 3).

### [2.13] Figure 2
- **code:** 2.13 | **status:** MEDIA | **words:** 28 | **source:** Old home page image
- alt: Concept image: the raised shelter on concrete piles with brown floodwater around the piles under storm clouds.

> Figure 2. Concept image: the raised shelter on concrete piles with brown floodwater around the piles under storm clouds. Made with an AI image tool (see Appendix 3).

---

## SECTION 3: Group Declaration (id: group-declaration)
- **section words:** 81 | **counts toward 4000:** yes

### [3.1] Team member contributions
- **code:** 3.1 | **status:** SITE | **words:** 81 | **source:** Project page, The team
- layout: a 2-column table with the caption above it. Member image tiles: `(change to our assignment content)`.

> Table 1. Team member contributions to Assessment Task 3 Website
> | Group Member Name | Project Contributions |
> |---|---|
> | Pinhong | Climate and flooding research. Prototype. |
> | Darrell | Existing infrastructure and safety. Design opportunity. Life cycle. Revenue and cost. |
> | Tasneef | Visitor groups and experience. Decision matrix. Ideas and design options. |
> | Isaac | Tourism economy and maintenance. Current practice. Slide design. |
> | Jude | Cultural values and protocols. |
> | Qijun | Ecological and environmental values. Cost justification. |
> TEAM TO ADD: add each member's contribution to this website (writing, building, editing and team management).

---

## SECTION 4: Team Acknowledgement (id: acknowledgement)
- **section words:** 54 | **counts toward 4000:** yes

### [4.1] Acknowledgement of Country
- **code:** 4.1 | **status:** SITE | **words:** 54 | **source:** Wording supplied by the user, 26 October 2026
- layout: render the acknowledgement text in the montage below the hero. The old acknowledgement section retains its heading and styling with the body text `EDIT HERE TEXT`.

> We would like to acknowledge the Gadigal people, the Boorooberongal people of the Dharug Nation, the Bidiagal people and the Gamaygal people upon whose ancestral lands our university stands. We would also like to pay respect to the Elders both past and present, acknowledging them as the traditional custodians of knowledge for these lands.

---

## SECTION 5: Project details (id: project-details)
- **section words:** 215 | **counts toward 4000:** yes

### [5.1] Why this project matters
- **code:** 5.1 | **status:** SITE | **words:** 23 | **source:** Home page

> Visitors to Warokutal need dependable access to water, supplies, recovery equipment and safety information when roads are damaged and help is far away.

### [5.2] Context
- **code:** 5.2 | **status:** SITE | **words:** 54 | **source:** Home page, Context tab

> Warokutal is a campground at Port Stewart in Lama Lama Country. Wet-season floods can damage the roads and other infrastructure (Engineers Without Borders Australia, 2024). Visitors are far from services, so a stuck vehicle can become an emergency. The Lama Lama Rangers manage tourism and carry out repairs (Reardon-Smith, 2023). Their time is limited.

### [5.3] The design opportunity
- **code:** 5.3 | **status:** DRAFT | **words:** 65 | **source:** Paraphrase of the EWB brief for Opportunity 2.1
- note: the team must confirm which reference covers the brief text.

> The EWB Challenge brief asks teams to design resilient infrastructure for a specific visitor destination in Lama Lama Country, such as a campground, creek crossing, boat ramp or visitor information point. The design must respond to wet-season flooding, visitor access, safety or maintenance needs, suit the expected visitor numbers, improve the visitor experience, and not harm cultural or environmental values (Engineers Without Borders Australia, 2024).

### [5.4] How might we statement
- **code:** 5.4 | **status:** SLIDES | **words:** 39 | **source:** Slide 4, tidied
- note: this repeats block 1.3 on purpose. The template asks for the statement in Project details too.

> How might we make a Lama Lama Country campground safer for visitors, more resilient to floods and unreliable roads, with low capital investment and without adding more maintenance duties to Rangers, while protecting the region's cultural and ecological values?

### [5.5] Stakeholders and organisations
- **code:** 5.5 | **status:** SITE | **words:** 34 | **source:** Project page, overview photo carousel (heading renamed)
- layout: full-width overlapping photo carousel matching the overview below “Built with Lama Lama Country in mind”: four progressively larger frames, six cycling entries, 0.8-second transitions every two seconds while visible. Static when reduced motion is requested. The eight organisation names remain in a screen-reader-only list; no visible name tiles or logos.
- images: reuse the overview's existing decorative Waabi placeholder photos from `/assets/home/`: `1760350326-waabi_portrait_felicia_00336_final.webp`, `1760350326-waabi_scout_00761_final.webp`, `1761184004-251006_waabi_collab_05_1012_a.webp`, and `1760350326-waabi_inspection_02613_final.webp`; repeat the first two to match its six-entry cycle. These do not depict the listed organisations. Empty alt text and an aria-hidden carousel keep these decorative placeholders out of the accessible content.

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
- **section words:** 425 | **counts toward 4000:** yes
- layout: reuse the exact Proposed materials and cost component, including its image panel, heading styling, spacing, tabs and responsive animations. Use "Background" as the heading, no intro, and the nine unchanged sub-headings and paragraphs below as tabs in order. Keep Figure 3 and its caption below the component.

### [6.1] Climate and flooding
- **code:** 6.1 | **status:** SITE | **words:** 34 | **source:** Project page hero

> Heavy rain can flood roads and low ground across northern Cape York (Testa, 2026). The Lama Lama Rangers carry out infrastructure repairs (Reardon-Smith, 2023). Flood damage can therefore last after the water has gone.

### [6.2] Existing infrastructure and safety
- **code:** 6.2 | **status:** SITE | **words:** 43 | **source:** Project page hero

> There are two campgrounds, Warokutal at Port Stewart and Maramba at Silver Plains, three boat ramps and one staffed information point, the Lama Lama Ranger Base. A single road joins Port Stewart to Coen (Cook Shire Council, 2026; Engineers Without Borders Australia, n.d.).

### [6.3] Visitors and experience
- **code:** 6.3 | **status:** SITE | **words:** 57 | **source:** Project page (moved from "Organisations and sources")

> Visitors come for bird watching, boating, fishing, camping and guided tours. The dry season brings most of them. The park is closed from 1 December to 30 June. The open season runs from July to November (Department of the Environment, Tourism, Science and Innovation [DETSI], 2024b). TEAM TO ADD: confirm the park closure dates apply to Warokutal.

### [6.4] Tourism economy and maintenance
- **code:** 6.4 | **status:** SITE | **words:** 35 | **source:** Project page (moved from "Project stages")

> Rangers manage tourism and carry out infrastructure repairs (Reardon-Smith, 2023). YAC earns income from tourism and from the YM2 cattle enterprise (YAC, n.d.). Ranger time is limited, so new infrastructure must not add much work.

### [6.5] Cultural values and protocols
- **code:** 6.5 | **status:** SITE | **words:** 47 | **source:** Project page, Background

> The Lama Lama people are the Traditional Owners. The Alingina Wungku Living Area is closed to visitors to protect cultural resources (YAC, n.d.). Entry to areas of high cultural or environmental value is limited to Traditional Owners or permit holders (Queensland Parks and Wildlife Service [QPWS], 2013).

### [6.6] Ecological and environmental values
- **code:** 6.6 | **status:** SLIDES | **words:** 29 | **source:** Slide 7, tidied
- note: check against QPWS (2013) before submission.

> Infrastructure is banned outright in the Alingina Wungku Living Area, the Goose Swamp and the Bull Swamp Area (QPWS, 2013). No camping development is permitted inside the national park.

### [6.7] Current practices
- **code:** 6.7 | **status:** SLIDES | **words:** 57 | **source:** Slide 8, tidied

> Roads and other infrastructure are repaired when something breaks, not on a set schedule (Reardon-Smith, 2023). It is up to visitors to check road conditions on the Cook Shire Council website before they travel (Cook Shire Council, 2026). Entry to areas of high environmental or cultural value is limited to Traditional Owners or permit holders (QPWS, 2013).

### [6.8] Existing solutions
- **code:** 6.8 | **status:** SLIDES | **words:** 40 | **source:** Slide 8, softened (see edits log)

> Camping is kept outside the national park boundary, at the campgrounds of Warokutal and Maramba (DETSI, 2024a). Visitors currently need to bring their own recovery equipment. The Lama Lama Ranger Base at Port Stewart is the only staffed information point.

### [6.9] Why this is not enough
- **code:** 6.9 | **status:** DRAFT | **words:** 55 | **source:** Built from Background and Detailed Design text

> These measures leave a gap. A visitor who is stuck at Warokutal must wait for help from the Ranger Base, which is far away and has limited staff. The team wants visitors to be able to recover their own vehicles, get water and supplies close by, and call for help, without adding to Ranger workload.

### [6.10] Figure 3
- **code:** 6.10 | **status:** MEDIA | **words:** 28 | **source:** Old project page image
- alt: Concept image: red dirt road with floodwater across it and a four-wheel drive stopped at the edge.

> Figure 3. Concept image: a red dirt road with floodwater across it and a 4WD stopped at the edge. Made with an AI image tool (see Appendix 3).

---

## SECTION 7: Problem Description (id: problem)
- **section words:** 114 | **counts toward 4000:** yes

### [7.1] User needs statement
- **code:** 7.1 | **status:** SLIDES | **words:** 32 | **source:** Slide 4, tidied (see edits log)

> User needs statement: Visitors to Lama Lama Country need consistent access to essential supplies, water and safety information so they can manage the risks of remote travel, unpredictable weather and extended stays.

### [7.2] The problem and the ideal situation
- **code:** 7.2 | **status:** DRAFT | **words:** 82 | **source:** Built from Background and Detailed Design text

> Wet-season floods can damage the roads to Warokutal, and flood damage can last into the dry season. Visitors are far from services, so a stuck vehicle can become an emergency. The only staffed information point is the Lama Lama Ranger Base, and Ranger time is limited. The ideal situation is that visitors can recover their own vehicles, call for help and get water close by, while the design stays low cost, adds little work for Rangers and protects cultural and ecological values.

---

## SECTION 8: Design Criteria (id: criteria)
- **section words:** 241 | **counts toward 4000:** yes
- layout: 8 criterion cards in number order, using the existing criteria card UI.
- note: the slides also had an Environmental impact criterion. The decision matrix has no such criterion. It is NOT on the page until the team decides (add a 9th criterion and rescore, or fold it into Culture and Country).

### [8.1] Criterion 1: Safety and access
- **code:** 8.1 | **status:** SITE | **words:** 43 | **source:** Project page hero text

> Criterion 1: Safety and access
> The design must lower the risk of vehicles becoming stranded and help visitors recover or call for help. It must reduce reliance on Rangers.
> Reason: visitors rely on one road, and Rangers run the one staffed safety point.

### [8.2] Criterion 2: Flood resilience
- **code:** 8.2 | **status:** SITE | **words:** 29 | **source:** Project page, criteria carousel

> Criterion 2: Flood resilience
> The building and its stock must survive wet-season flooding with little repair.
> Reason: floods can damage roads and infrastructure, and Rangers carry out the repairs.

### [8.3] Criterion 3: Visitor support and comfort
- **code:** 8.3 | **status:** SITE | **words:** 33 | **source:** Project page, criteria carousel

> Criterion 3: Visitor support and comfort
> Visitors can get water, food, firewood and safety information near the campground.
> Reason: stays are remote and long, so basic supplies cut risk and improve the visit.

### [8.4] Criterion 4: Feasibility and maintenance
- **code:** 8.4 | **status:** SITE | **words:** 23 | **source:** Project page, criteria carousel

> Criterion 4: Feasibility and maintenance
> The design uses tough, durable materials and needs close to zero wet-season maintenance.
> Reason: Ranger time is limited.

### [8.5] Criterion 5: Culture and Country
- **code:** 8.5 | **status:** DRAFT | **words:** 29 | **source:** Slide 9 and Design Selection text

> Criterion 5: Culture and Country
> The design respects heritage and fits the land management goals of the Traditional Owners.
> Reason: no option would go ahead without Traditional Owner agreement.

### [8.6] Criterion 6: Low cost
- **code:** 8.6 | **status:** DRAFT | **words:** 32 | **source:** Slide 9 and Community concerns text

> Criterion 6: Low cost
> The design must be affordable to set up and run.
> Reason: a grant would pay for the build, and sales and hire fees would pay for running costs.

### [8.7] Criterion 7: Community fit
- **code:** 8.7 | **status:** DRAFT | **words:** 32 | **source:** Slide 9 and Community concerns text

> Criterion 7: Community fit
> The design must suit the small, self-sufficient visitors to Port Stewart, such as campers and fishers, and not mass tourism.
> Reason: the stock and kits suit small groups.

### [8.8] Criterion 8: Revenue
- **code:** 8.8 | **status:** DRAFT | **words:** 20 | **source:** Slide 9 and Implementation text

> Criterion 8: Revenue
> The design should earn income of its own.
> Reason: income would help fund the Lama Lama Rangers.

---

## SECTION 9: Design solution options (id: options)
- layout: use the full desktop width with 32px side gutters, equal-width text and image columns with clear space on either side of the centre progress line, and compact spacing around the counter. Let option headings wrap within the text column. Centre the smaller image within its column, capped at 560px wide and 68% of the viewport height. Give each option its own full-height scroll interval without overlapping articles. Select the option nearest the viewport centre, fade inactive text and badges to zero over 0.2 seconds, and crossfade images over 0.35 seconds with a subtle zoom. Reveal each option as one unit rather than staggering individual words. Respect reduced motion. Retain the mobile swipe layout and leave the Overview of Design layout unchanged.
- **section words:** 299 | **counts toward 4000:** yes

### [9.1] Introduction to the options
- **code:** 9.1 | **status:** SITE | **words:** 46 | **source:** Solution page, Design options

> The team developed four ideas and scored them against the eight criteria. The three highest scoring ideas are the design options below. Screened out: a solar-powered river crossing status beacon scored lowest (91 out of 165). It would warn drivers. TEAM TO ADD: confirm this description.

### [9.2] 3.1. Design option 1: Provisions Point
- **code:** 9.2 | **status:** SITE | **words:** 79 | **source:** User-supplied design option content

> The Provisions Point is a flood-resilient facility designed to provide visitors with essential supplies and emergency equipment during wet-season flooding. The proposed structure features an elevated platform, weather-resistant storage facilities, and secure compartments containing drinking water, non-perishable food, first-aid supplies, and vehicle recovery equipment. Personal Locator Beacons (PLBs) and UHF radios would also be available to support emergency communication. This solution aims to improve visitor safety and access to essential resources while creating potential revenue opportunities through equipment rental.

### [9.3] 3.2. Design option 2: Elevated tent-site platform
- **code:** 9.3 | **status:** SITE | **words:** 96 | **source:** User-supplied design option content

> The Elevated Tent-site Platform proposes raised camping platforms designed to reduce visitors' exposure to ground-level flooding and wet conditions. The platforms would provide stable areas for setting up tents, potentially reducing damage to camping equipment and improving camping conditions during periods of heavy rainfall.
>
> This solution focuses primarily on providing a safer camping environment rather than supplying emergency resources. Its relatively simple design could reduce initial construction costs, while its elevated structure offers improved flood resilience compared with ground-level campsites. However, the platforms would provide limited access to emergency supplies, communication equipment, and vehicle recovery services.

### [9.4] 3.3. Design option 3: Distributed emergency checkpoint
- **code:** 9.4 | **status:** SITE | **words:** 78 | **source:** User-supplied design option content

> The Distributed Emergency Checkpoint proposes a network of small emergency support stations positioned at selected locations around Warokutal. Each checkpoint could contain basic emergency supplies, safety information, and communication equipment, allowing visitors to access assistance without relying on a single central facility.
>
> By distributing emergency resources across multiple locations, this solution aims to improve accessibility and provide support to visitors who may become stranded during flooding. The stations could also be adapted to local environmental and community requirements.

---

## SECTION 10: Design Selection (id: selection)
- **section words:** 273 | **counts toward 4000:** yes

### [10.1] How the team chose
- **code:** 10.1 | **status:** SITE | **words:** 92 | **source:** Solution page

> Each idea was rated from 1 (poor) to 5 (best) against the eight criteria. Each criterion has a weight from 3 to 5, where 5 matters most. Weighted score is rating times weight. The maximum score is 165. Why the weights differ: Visitor support, feasibility and flood resilience carry weight 5, because a shelter that is unusable, impossible to build or flooded fails the brief. Culture and Country has weight 3 in the matrix, but it is also a condition for every option. No option would go ahead without Traditional Owner agreement.

### [10.2] Decision matrix
- **code:** 10.2 | **status:** SITE | **words:** 96 | **source:** Solution page matrix text, checked: every total adds up
- layout: one real HTML table. Do not use the old screenshot images.

> Table 2. Decision matrix (ratings from 1 to 5, weights in brackets, total out of 165)
> | Idea | Culture and Country (3) | Low cost (4) | Visitor support (5) | Feasibility (5) | Safety and access (4) | Community fit (4) | Flood resilience (5) | Revenue (3) | Total | Rank |
> |---|---|---|---|---|---|---|---|---|---|---|
> | A Provisions Point | 5 | 3 | 4 | 3 | 5 | 4 | 3 | 5 | 128 | 1 |
> | B Distributed checkpoints | 4 | 3 | 3 | 3 | 4 | 4 | 3 | 1 | 104 | 2 |
> | C Tent-site platform | 3 | 4 | 2 | 2 | 3 | 3 | 4 | 2 | 95 | 3 |
> | Screened out: crossing beacon | 3 | 4 | 1 | 3 | 4 | 3 | 3 | 1 | 91 | 4 |

### [10.3] Reading the scores
- **code:** 10.3 | **status:** SITE | **words:** 74 | **source:** Solution page

> Option A scores 5 for culture, safety and revenue and 3 for low cost, feasibility and flood resilience. It scores 3 for flood resilience until the 2 m floor height is checked against flood data. Option B scores 3 for visitor support and 1 for revenue. Option C scores 4 for flood resilience, the highest of the four, and 2 for visitor support and feasibility. TEAM TO ADD: confirm the reasons for each rating.

### [10.4] Decision
- **code:** 10.4 | **status:** SITE | **words:** 11 | **source:** Solution page

> Decision: The team will develop Option A, Provisions Point, in detail.

---

## SECTION 11: Detailed Design (id: design)
- **section words:** 514 | **counts toward 4000:** yes

### [11.1] Why it should work
- **code:** 11.1 | **status:** SITE | **words:** 79 | **source:** Solution page (YAC short form, see edits log)

> Safety and access: visitors could recover their own vehicles, call for help and get water close by. The Ranger Base is not the only point of help. Flood resilience: the building is raised and made of concrete and steel, so it should need little upkeep after the wet season. An engineer must confirm this. Culture and Country: one hub on cleared ground keeps foot traffic away from restricted sites, and the team proposes that YAC co-designs how it runs.

### [11.2] Note on the 2 m height
- **code:** 11.2 | **status:** SITE | **words:** 23 | **source:** Solution page

> Note on the 2 m height: this is a planning figure. An engineer must confirm it against local flood levels and wind loads.

### [11.3] How Provisions Point would work: What it is
- **code:** 11.3 | **status:** SITE | **words:** 86 | **source:** Solution page, detailed design slide 1

> A 24 square metre shelter at Warokutal, planned for ground that is already cleared and above flood level. A site survey must confirm this. It would stand on reinforced concrete piles (Menard Asia, 2025), with the floor planned 2 m above the ground. Walls would be watertight concrete (Leading Architecture, 2024) and the roof corrugated sheeting (material to be confirmed). Inside would be shelves, a counter, a solar panel and a battery. The shelter is unstaffed. Visitors serve themselves and pay by the method YAC sets.

### [11.4] How Provisions Point would work: Entry, stock and hire items
- **code:** 11.4 | **status:** SITE | **words:** 87 | **source:** Solution page, detailed design slide 2
- note: do NOT add medicines. The prototype slide lists them. The website stock list does not.

> Entry: TEAM TO ADD: confirm the entry type (stairs or ramp) so it matches the prototype.
> Stock: drinking water, non-perishable food, firewood and safety information.
> Hire items: traction boards for soft ground, a tyre deflation kit (Supercheap Auto, 2017), a 12 V compressor, and shackles with a recovery strap (Bober, 2025). Each kit also holds a personal locator beacon (PLB) and an ultra high frequency (UHF) radio. YAC sets the check-out and payment method. One option is a lockable kit cage with a code given at booking.

### [11.5] How Provisions Point would work: How a visitor would use it
- **code:** 11.5 | **status:** SITE | **words:** 68 | **source:** Solution page, detailed design slide 3

> 1. Check road conditions on the Cook Shire Council website before travel (Cook Shire Council, 2026).
> 2. Arrive at Warokutal and read the safety information at the shelter.
> 3. Buy water, food or firewood, or hire a recovery kit if the vehicle is stuck.
> 4. In a life-threatening emergency, use the PLB. If radio coverage is confirmed, the UHF radio can reach the Rangers. Then return the kit.

### [11.6] How Provisions Point would work: Community concerns
- **code:** 11.6 | **status:** SITE | **words:** 121 | **source:** Solution page, detailed design slide 4
- layout: six labelled items.

> Ground disturbance. The design uses a small number of drilled piles on cleared ground, not trench footings. No piles are drilled until Traditional Owners and heritage checks agree.
> Ranger workload. The routine would be one weekly restock in the open season and two inspections a year.
> Visitor numbers. The stock and kits suit small groups. The design is not for mass tourism.
> Theft or damage. The team proposes a lockable, raised building for the stock and kits.
> Fire and waste. Bagged firewood would be sold, and the team will check park rules with YAC and QPWS. A waste plan would be agreed with YAC.
> Cost. A grant would pay for the build. Sales and hire fees would pay for running costs.

### [11.7] Figure 4
- **code:** 11.7 | **status:** MEDIA | **words:** 28 | **source:** Old Solution and Project page hero image
- alt: Concept image: aerial view of a raised shelter in a cleared bush campground in the dry season.

> Figure 4. Concept image: aerial view of a raised shelter in a cleared bush campground in the dry season. Made with an AI image tool (see Appendix 3).

### [11.8] Figure 5
- **code:** 11.8 | **status:** MEDIA | **words:** 22 | **source:** Old project page graphic (map.svg)
- note: the old map.svg looks like a template graphic, not the team's site plan. Show `(change to our assignment content)` unless the team supplies a real plan.
- alt: Abstract site plan of a cleared area with a small building footprint, a camp area and a track.

> Figure 5. Site plan of the proposed shelter on cleared ground at Warokutal, showing the building, the camp area and the track.

---

## SECTION 12: Prototyping (id: prototyping)
- **section words:** 0 | **counts toward 4000:** yes

### [12.1] Prototyping
- **code:** 12.1 | **status:** MISSING | **words:** 0 | **target:** 350 | **source:** none on the old site
- placeholder: `insert: Prototyping`
- the template needs 5 parts: why this was prototyped, how it was built, what it looks like and does, how it was tested, the results and changes.
- facts the team already has (slide 14, NOT page text, for the team to write from): prototype built in Blender by Pinhong. Materials shown: reinforced concrete pile foundation, watertight concrete, corrugated fibre cement sheets. Site selection: high ground not susceptible to flooding. The renders show a raised building on piles, a ramp entry, shelving and a table inside.
- gaps: no testing is recorded. The prototype shows a roof that looks like tiles and a ramp entry. The website says "corrugated sheeting (material to be confirmed)" and "stairs or ramp". Blender renders will become Figure 6 onwards.

---

## SECTION 13: Implementation Plan (id: implementation)
- **section words:** 372 | **counts toward 4000:** yes

### [13.1] Implementation plan
- **code:** 13.1 | **status:** SITE | **words:** 129 | **source:** Delivery page, The plan (short forms for YAC and DETSI, see edits log)
- layout: five numbered steps.

> 1. Preparation. YAC approval would take about 6 months. The site, design and running plan are agreed with YAC and Traditional Owners. Cultural heritage checks come before any ground work.
> 2. Implementation. Four workers would build the shelter in the dry season in about 8 weeks, using a drill rig, steel and roof sheets. Each Ranger who will look after the site completes 4 hours of training.
> 3. Operation. The shelter would run during the open season, July to November (DETSI, 2024b). Rangers restock it weekly.
> 4. Maintenance. Two Rangers carry out two checks a year, one before and one after the wet season.
> 5. End of life. Four workers remove the building in 1 to 2 weeks. Shelves and kits are reused. Steel and roof sheets are recycled.

### [13.2] Community, ownership and evaluation
- **code:** 13.2 | **status:** SITE | **words:** 123 | **source:** Delivery page

> Community role: the team proposes that YAC co-designs the site and the rules, and decides which of these steps go ahead. The team encourages YAC to consider local people for the build and training.
> Ownership: the team proposes that YAC owns the shelter, sets prices and decides stock. Income would help fund the Lama Lama Rangers.
> Evaluation: after each open season YAC and Rangers would review kit hires, visitor numbers, empty shelves, uses of the beacons and radios, and Ranger time. They would adjust stock and prices.
> Repairs: Rangers fix small faults at the weekly and twice-yearly visits. Larger repairs use local trades. YAC and Rangers should agree a repair budget.
> Future: if it works, the same model could be tried at Maramba.

### [13.3] Project stages
- **code:** 13.3 | **status:** SITE | **words:** 120 | **source:** Home, Solution and Project pages (one copy only)
- layout: the existing horizontal stages carousel, eight cards in order.

> Next steps: co-design with YAC, a site survey, engineering design, and checks on beacon hire rules and radio coverage.
> The design is a student proposal. It is for YAC to review, change or reject.
> Stage 1: Consultation with YAC and Traditional Owners. Duration: part of about 6 months of approval.
> Stage 2: Cultural heritage and site checks. Duration: part of about 6 months of approval.
> Stage 3: Engineering design. Flood and wind loads confirmed.
> Stage 4: Grant application. About $86,650 for the build and equipment.
> Stage 5: Dry-season build. Four workers, about 8 weeks.
> Stage 6: Ranger training. 4 hours per Ranger.
> Stage 7: Open season. July to November, weekly restock.
> Stage 8: Review. Annual check by YAC and Rangers.

---

## SECTION 14: Cost Analysis (id: cost)
- **section words:** 364 | **counts toward 4000:** yes

### [14.1] Assumptions
- **code:** 14.1 | **status:** SLIDES | **words:** 67 | **source:** Slide 16, tidied

> The cost and income figures use these assumptions. About 10 visitors a week over the 22-week open season gives 220 visitors a year (Todio, n.d.). About 2 recovery kits would be hired each week. A recovery kit costs about $679, a personal locator beacon about $440 and a UHF radio about $259. Sources for each price are in Table 3. All costs are in Australian dollars (AUD).

### [14.2] Build and stock cost
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

### [14.3] Projected revenue and profit
- **code:** 14.3 | **status:** SLIDES | **words:** 84 | **source:** Slide 18
- note: CHECK BEFORE SUBMISSION. In the base case, 44 hires at $200 is $8,800 against $8,950 revenue, but the low and high cases have bigger gaps. The 25-year profits are each $10 above simple multiplication of the yearly profit. The TEAM TO ADD line stays until the team confirms the workings.

> Table 4. Projected revenue and profit (AUD)
> | | Low estimate | Base estimate | High estimate |
> |---|---|---|---|
> | Visitors a year | 110 | 220 | 440 |
> | Kit rentals a year ($200 per week) | 18 | 44 | 70 |
> | Revenue a year | $4,540 | $8,950 | $17,900 |
> | Costs a year | $2,630 | $3,950 | $6,590 |
> | Profit a year | +$1,910 | +$5,000 | +$11,310 |
> | Profit over 25 years | +$47,760 | +$125,010 | +$282,760 |
> Profit is worked out after running costs and before the build cost, which a grant would pay for. TEAM TO ADD: confirm how revenue and the 25-year profit were calculated.

### [14.4] Funding
- **code:** 14.4 | **status:** SLIDES | **words:** 69 | **source:** Slide 19, tidied
- note: the slide says $86,600. Use $86,650 to match Table 3 and Stage 4. Do not use the slide's "$2,500 cost of restocks" figure.

> Table 5. Funding sources
> | Funding source | What it covers |
> |---|---|
> | Regional Tourism Infrastructure Fund (Qld) | Build, design, equipment. Up to $300,000 (DETSI, 2026). |
> | Indigenous Rangers Program (Australian Government) | Ranger land care to 2028 (National Indigenous Australians Agency [NIAA], n.d.). May cover Ranger time. |
> | Own income: sales and rentals | Stock and about $3,950 a year to run. |
> The team estimates a grant request of about $86,650 for the build and equipment.

### [14.5] Maintenance and end-of-life costs
- **code:** 14.5 | **status:** MISSING | **words:** 0 | **target:** 80 | **source:** none
- placeholder: `insert: Maintenance and end-of-life costs`
- the template asks for both. The team has the activity (two Ranger checks a year, four workers for 1 to 2 weeks to remove) but no cost.

---

## SECTION 15: Other considerations (id: other)
- **section words:** 266 | **counts toward 4000:** yes

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

## SECTION 16: Recommendations (id: recommendations)
- **section words:** 127 | **counts toward 4000:** yes

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

## SECTION 17: References (id: references)
- **section words:** 706 | **counts toward 4000:** no
- layout: one plain list, alphabetical, no carousel. Titles in italics per APA 7 (the italic part is the title of the work, or the website name for web pages as in APA 7).
- note: do not add or remove entries. Some slide sources are not here (see PROJECT_CONTEXT.md, known problems).

### [17.1] Reference list
- **code:** 17.1 | **status:** SITE | **words:** 706 (original entries; photo credits added below) | **source:** Original references plus 17 montage photograph credits

> Annette Ruzicka. (n.d.). Lama Lama ranger in wetland reeds [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/lama-lama-rangers/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/08/Lama-Lama-rangers-banner-Photo-Annette-Ruzicka.png
> Annette Ruzicka. (n.d.). Road through Lama Lama Country [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/visiting/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/08/Visiting-banner-3-Photo-Annette-Ruzicka.png
> Anthropic. (2026). Claude [Large language model]. https://claude.ai
> Bober, I. (2025, March). A simple guide to soft shackles. Unsealed 4X4. https://unsealed4x4.com.au/soft-shackles-a-simple-guide/
> BuyWisely. (n.d.-a). GME TX6160X 5 watt IP67 UHF CB handheld radio. https://buywisely.com.au/product/gme-tx6160x-5-watt-ip67-uhf-cb-handheld-radio-beyond-blue-foundation
> BuyWisely. (n.d.-b). Hot Shots 20kg firewood. https://buywisely.com.au/product/hot-shots-20kg-firewood
> BuyWisely. (n.d.-c). MAXTRAX Indeflate (MTXIND). https://buywisely.com.au/au/product/maxtrax-indeflate-mtxind
> BuyWisely. (n.d.-d). MAXTRAX MKII recovery tracks - black. https://buywisely.com.au/au/product/maxtrax-mkii-recovery-tracks-black
> BuyWisely. (n.d.-e). SCA Hurricane 12V 150PSI 50LPM tyre inflator. https://buywisely.com.au/product/sca-hurricane-12v-150psi-50lpm-tyre-inflator-sca-club
> BuyWisely. (n.d.-f). XTM 7 piece recovery kit. https://buywisely.com.au/product/xtm-7-piece-recovery-kit-club-bcf
> Cook Shire Council. (2026, August 26). Road conditions & closures. https://www.cook.qld.gov.au/services/roads/road-conditions-closures/
> Department of the Environment, Tourism, Science and Innovation. (2024a, May 3). About: Lama Lama National Park (CYPAL). Parks and Forests. https://parks.qld.gov.au/parks/lama-lama/about
> Department of the Environment, Tourism, Science and Innovation. (2024b, May 3). Lama Lama National Park (CYPAL). Parks and Forests. https://parks.qld.gov.au/parks/lama-lama
> Department of the Environment, Tourism, Science and Innovation. (2026, July). Regional Tourism Infrastructure Fund: Round 2 program guidelines. https://www.detsi.qld.gov.au/__data/assets/pdf_file/0023/406481/regional-tourism-infrastructure-fund-guidelines.pdf
> Down Under Pilot Shop. (n.d.). GME MT610G PLB / ELT - GPS personal locator beacon. https://downunderpilotshop.com.au/products/mt610g-gps-personal-locator-beacon
> Engineers Without Borders Australia. (2024). EWB Challenge: Port Stewart, Lama Lama Country. https://ewbchallenge.org/challenge/port-stewart-lama-lama/
> Engineers Without Borders Australia. (n.d.). Design area 1: Infrastructure and access. EWB Challenge. https://ewbchallenge.org/challenge/port-stewart-lama-lama/design-area-1-infrastructure-and-access/
> Feasly. (n.d.). Construction cost per square metre in Australia (2026). https://www.feasly.com.au/guides/construction-cost-per-square-metre-australia
> Google. (2026). Gemini [Large language model]. https://gemini.google.com
> Hillebrand, S. (n.d.). Cabin with solar panels [Photograph]. Wikimedia Commons. Public domain; resized and converted to WebP, displayed with a crop. https://commons.wikimedia.org/wiki/File:Cabin_with_solar_panels.jpg
> KeepActive Australia. (2022, January 30). Large family camping tent [Photograph]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Large_family_camping_tent.jpg Photo by KeepActive.com.au (https://keepactive.com.au/). CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/). Resized and converted to WebP; displayed with a crop.
> Leading Architecture. (2024, June). Watertight concrete from Sika. https://www.leadingarchitecture.co.za/watertight-concrete-from-sika/
> Menard Asia. (2025, January 16). Concrete pile foundations: Types and benefits. https://www.menard-asia.com/2025/01/16/concrete-pile-foundations/
> National Indigenous Australians Agency. (n.d.). Indigenous Rangers Program funding extension update 1. https://www.niaa.gov.au/news-and-media/indigenous-rangers-program-funding-extension-update-1
> NJM2010. (2011, January 15). Queenslander house in Laidley [Photograph]. Wikimedia Commons. CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/); resized and converted to WebP, displayed with a crop under the same licence. https://commons.wikimedia.org/wiki/File:Queenslander_house_in_Laidley.jpg
> Queensland Parks and Wildlife Service. (2013). Lama Lama National Park (Cape York Peninsula Aboriginal Land): Management statement. Department of Environment, Science and Innovation. https://parks.des.qld.gov.au/__data/assets/pdf_file/0022/166423/lama-lama.pdf
> Reardon-Smith, M. (2023). The wet: Shifting seasons, climate change and natural cycles in Cape York Peninsula, Queensland. Oceania, 93(3), 302-320. https://doi.org/10.1002/ocea.5377
> Supercheap Auto. (2017, February). How to rapidly deflate your tyres. https://www.supercheapauto.com.au/blog/4wd-adventure/how-to-rapidly-deflate-your-tyres.html
> Testa, C. (2026, January 23). Tropical low forecast to bring heavy rain to northern Cape York, Gulf of Carpentaria. ABC News. https://www.abc.net.au/news/2026-01-23/tropical-low-heavy-rain-cape-york-gulf-of-carpentaria/106260620
> Todio, E. (n.d.). Logistics of tourism in Port Stewart in Lama Lama Country. EWB Challenge. https://ewbchallenge.org/forums/topic/logistics-of-tourism-in-port-stewart-in-lama-lama-country/
> Wikideas1. (2024, July 1). Modular home [Photograph]. Wikimedia Commons. CC0 1.0 (https://creativecommons.org/publicdomain/zero/1.0/); resized and converted to WebP, displayed with a crop. https://commons.wikimedia.org/wiki/File:Modular_home.jpg
> Yintjingga Aboriginal Corporation. (n.d.). Cattle on Lama Lama Country [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/enterprises/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/08/MarinaPlainsCow-banner.png
> Yintjingga Aboriginal Corporation. (n.d.). Fauna and flora survey: beetle [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/fauna-and-flora-surveys/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/12/flora-and-fauna-banner.png
> Yintjingga Aboriginal Corporation. (n.d.). Fire management beside a road [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/monitoring-the-impact-of-fire/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/12/fire-banner-1.jpg
> Yintjingga Aboriginal Corporation. (n.d.). Forested wetland [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/special-places/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/08/Special-Places-banner-1.jpg
> Yintjingga Aboriginal Corporation. (n.d.). Freshwater wetland [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/annual-wetland-monitoring-freshwater/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/12/Our-research-freshwater-banner.jpg
> Yintjingga Aboriginal Corporation. (n.d.). Lama Lama coastline [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/visiting/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/08/Visiting-banner.png
> Yintjingga Aboriginal Corporation. (n.d.). Lama Lama rangers outdoors [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/visiting/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/08/Visiting-banner2.png
> Yintjingga Aboriginal Corporation. (n.d.). Mangrove roots [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/mangroves/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/12/mangrove-banner.png
> Yintjingga Aboriginal Corporation. (n.d.). Princess Charlotte Bay coastline [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/princess-charlotte-bay-bird-surveys/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/12/PCB-bird-surveys-banner.png
> Yintjingga Aboriginal Corporation. (n.d.). Rainforest creek [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/rainforests/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/12/research-rainforests-banner.png
> Yintjingga Aboriginal Corporation. (n.d.). Rangers reviewing a map [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/national-parks-joint-management/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/08/Gav-Parks-Peter-fence-map-130905-6558.jpg
> Yintjingga Aboriginal Corporation. (n.d.). Sea Country shoreline [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/sea-country-indigenous-knowledge-collation/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/12/Our-research-sea-country-banner.png
> Yintjingga Aboriginal Corporation. (n.d.). Turtle monitoring [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/marine-turtles-and-dugongs/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/12/Our-research-Turtles-banner-2.jpg
> Yintjingga Aboriginal Corporation. (n.d.). Visiting. Welcome to Lama Lama Country. https://www.lamalama.org.au/visiting/
> Yintjingga Aboriginal Corporation. (n.d.). Visitors beside a waterway [Photograph]. Welcome to Lama Lama Country. https://www.lamalama.org.au/enterprises/ Image: https://www.lamalama.org.au/wp-content/uploads/2016/08/tourism-banner.png

---

## SECTION 18: Supporting documentation (id: appendices)
- **section words:** 187 | **counts toward 4000:** no
- layout: each appendix has its own heading, in this order.

### [18.1] Appendix 1: Group charter
- **code:** 18.1 | **status:** MISSING | **words:** 8 | **target:** 0 | **source:** none
- placeholder: `insert: Appendix 1: Group charter` (below the note)

> TEAM TO ADD: attach the charter before submission.

### [18.2] Appendix 2: Meeting minutes
- **code:** 18.2 | **status:** MISSING | **words:** 9 | **target:** 0 | **source:** none
- placeholder: `insert: Appendix 2: Meeting minutes` (below the note)

> TEAM TO ADD: attach the meeting minutes before submission.

### [18.3] Appendix 3: Statement of AI use and prompt log
- **code:** 18.3 | **status:** SITE | **words:** 139 | **source:** Delivery page

> The team used generative AI in four ways. Claude (Anthropic, 2026) helped find and summarise public sources and prices, draft background and criteria text, build the cost and revenue calculations, and turn the team's slides and research into website text. Gemini (Google, 2026) made the concept images for the team's presentation. An AI image tool made the concept images on this site. An AI coding agent placed the text and images into the website. The team used AI to work faster, keep the site consistent and show the idea visually. The team chose the design, built the Blender prototype and checked figures and citations against sources. AI images are concept images, not photographs. This is a draft declaration. TEAM TO ADD: read and confirm every sentence, the exact tool names and versions, and screenshots of every prompt and output.

### [18.4] Appendix 3: Prompt screenshots
- **code:** 18.4 | **status:** MISSING | **words:** 0 | **target:** 0 | **source:** none
- placeholder: `insert: Appendix 3: Prompt screenshots`

### [18.5] Appendix 4: Full prototype test results
- **code:** 18.5 | **status:** MISSING | **words:** 7 | **target:** 0 | **source:** none
- placeholder: `insert: Appendix 4: Prototype test results` (below the note)

> TEAM TO ADD: attach results before submission.

### [18.6] Appendix 5: Decision matrix and cost workings
- **code:** 18.6 | **status:** SITE | **words:** 24 | **source:** Delivery page (links updated, see edits log)

> The matrix scores and the cost table are shown in Design Selection and Cost Analysis. The contingency is 20% of $72,207.34, which is $14,441.47.

---

## SECTION 19: Call to action and footer (id: closing)
- **section words:** 36 | **counts toward 4000:** no

### [19.1] Call to action
- **code:** 19.1 | **status:** SITE | **words:** 26 | **source:** Bottom of every old page (one copy only)
- buttons: "Ask a question" scrolls to this block. "View the plan" goes to `#implementation`. Decorative media: `(change to our assignment content)`.

> Explore the problem, the solution and the plan to deliver it.
> Questions about this proposal: TEAM TO ADD: contact route
> Ask a question
> View the plan

### [19.2] Footer
- **code:** 19.2 | **status:** SITE | **words:** 10 | **source:** Old footer
- the "Acknowledgement of Country" link goes to `#acknowledgement`.

> Provisions Point. EWB Challenge 2026 student proposal.
> Acknowledgement of Country

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

Full photograph references are included in report block 17.1 and exported to `app/report/report-blocks.json`. The machine-readable image register is `app/report/montage-photos.json`.
