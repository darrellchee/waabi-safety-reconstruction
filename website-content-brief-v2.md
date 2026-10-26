# Content replacement brief: Provisions Point website (v3, images stage)

## Stage and role

The text pass is done on all four pages, the header, the footer, the menu, the page titles and the meta tags. You are the image agent. Your only job is to replace image and video files and their alt text, and captions where a caption slot already exists. Do not re-fill, re-word or move any text slot. Do not change layout, CSS, components, routes or file names. The text blocks in Parts 2 to 5 are kept below only as the source of truth, so that alt text and captions stay consistent with the words on the site.

Read Part 0 first. The rules in Part 0 about images, alt text, captions, video, logos, maps and the four allowed changes still apply. The rules about filling text slots are finished. Then read Part A (status) and Part B (the list of every image slot). Part B is your work list.

A "slot" is any place on the site that holds an image or video today.

---

## PART A. Status and what is left

### A.1 Done so far

- Text pass: all four pages, the header, the footer, the menu labels (Overview, Solution, Project, Delivery), page titles and meta. Checked by the orchestrator: `tsc` and `eslint` pass, and no page has horizontal overflow at 375, 768 and 1280 px.
- Shared files edited by the orchestrator: `components/SiteChrome.tsx` (menu labels, footer text, footer links: "References" and "Appendices" both point to /careers), `components/insights-data.ts` (9 project stage cards, and card 9 repeats Stage 1) and `app/layout.tsx` (default meta).
- Images placed so far (files overwritten under the same names, WebP unless noted, final alt text set where the slot has an alt, no caption exists on any of these slots). Backups of the first replaced originals are in `/private/tmp/claude-501/-Users-darrell-Developer-assignment-website/b17be3db-e77a-4410-917b-6133ab6be48e/scratchpad/backup/public-originals/`.
  - IMG-01: Safety hero, Company hero.
  - IMG-02: Home tech hero (`home/1756426717-waabi_road1_00928.webp`), Safety story image 1 (`1761185044-waabi_road2_05683.webp`). The Safety story alt is now an array indexed by the active item: item 1 IMG-02 alt, item 2 still the placeholder, item 3 IMG-10 alt.
  - IMG-03: Safety practice slide 1 (decorative), Careers closing stack card 1.
  - IMG-04: Safety practice slide 2, Careers closing stack card 2.
  - IMG-05: Home scale preview (`home/1761183902-waabi_road2_05483.webp`). The same file is also tile 5 of the Home road collage, so it shows twice.
  - IMG-09: Home "Why this project matters" background, Company quote background. These two files still show the small car emblem. Overwrite them again, same names, when the IMG-09 redo is ready.
  - IMG-10: Safety story image 3, Careers mission image (alt set).
  - Drawn: IMG-06 in Safety technology panel 1. IMG-08 in `company/map.svg` (same viewBox 1465x1156) and Safety technology panel 2. The IMG-07 strip in `1790628632-blog.webp` (2100x900), which is the Stage 5 card image on Home, Company and Safety (one file).
  - IMG-11 monograms: Careers portrait stack (P, D, T, I, J), Careers closing card 4 (Q), Company portraits (P, D, T, I; J and Q have no Company portrait slot).
  - IMG-12 text pieces: header and footer wordmarks (\"Provisions\" over \"Point\", currentColor), the 15 Company logo wall text tiles (names from 6.3, restarting after 8), the 4 Home partner circle text tiles (Rangers, EWB, UTS, YAC, because the circle is only about 60 px wide; the alt carries the full name) and the favicon (pink P).
- Old Waabi text now appears nowhere visible. Old Waabi photos and videos still fill every slot not listed above.
- Still the old photos (Part B marks them **to do**): the four Home partner photos, the 11 other Home collage tiles, the Home centre tile, the four Home Careers collage images, Safety story image 2, Safety panel 3, Safety practice slides 3 and 4, the Company event card 2 image (its alt is still a placeholder), the Careers hero and closing cards 3, 5 and 6 (K5 to K7), the four menu tiles, and eight of the nine stage card images. All 13 video files and their posters are also still old.

### A.2 Gemini images saved in `generated-images/`

All files are in `/Users/darrell/Developer/assignment-website/waabi-safety-reconstruction/generated-images/`. Each has a matching `IMG-xx.prompt.txt`.

| File | IMG | Ratio | Status | Defects |
|---|---|---|---|---|
| `IMG-01_16x9.png` (2752x1536) | IMG-01 | 16:9 | Approved. Placed in 2 slots. | Minor extras: a stair and two camp chairs. The 4WD and camp chairs are in the alt text, so check the alt against the file. |
| `IMG-02_16x9.png` | IMG-02 | 16:9 | Saved. Placed in 2 slots. | None noted. |
| `IMG-03_4x3.png` | IMG-03 | 4:3, cropped to 3:2 for slots | Saved. Placed in 2 slots. | None noted. |
| `IMG-04_4x3.png` | IMG-04 | 4:3, cropped to 3:2 for slots | Saved. Placed in 2 slots. | None noted. |
| `IMG-05_1x1.png` (2048x2048) | IMG-05 | 1:1 | Approved. Placed in 2 slots (one file). | None. |
| `IMG-09_16x9.png` (2752x1536) | IMG-09 | 16:9 | Placed in 2 slots, but not allowed. | A small Toyota-style emblem on the 4WD tailgate breaks the no-brand rule. Redo it (A.3, item 1). The old file was NOT renamed yet. |
| `IMG-10_4x3.png` | IMG-10 | 4:3, cropped to 3:2 for slots | Saved. Placed in 2 slots. | None noted. |

Run `ls generated-images/` before you start, to confirm these files and the prompt files are still there.

### A.3 What is left to make

1. **IMG-09 redo.** Rename the old file to `IMG-09_v1_emblem_16x9.png` first. The new prompt must say: no emblems, no badges, no manufacturer marks anywhere on the vehicle. Then overwrite the two placed files (Home safety background and Company quote background) again. The prompt is in `/Users/darrell/Developer/assignment-website/waabi-safety-reconstruction/generated-images/PROMPTS_TO_RUN.md` (item 3).
2. **All video (IMG-14).** None of the 13 video files and none of the 11 posters is done. See B.7. Make them last, after the IMG-09 redo.
3. **Drawn images:** the drawn images exist. The two within-limit uses left are menu tile M2 (IMG-06) and menu tile M4 (IMG-07). Other drawn uses in the plan (collage tiles, menu tile M3, stage cards) are crops of IMG-06, IMG-07 and IMG-08 and are OVER. See B.6.
4. **Old photos still to replace:** the 41 slots marked **to do** in Part B.
5. **The reuse cap.** Every photo-style image (IMG-01, 02, 03, 04, 05, 09, 10) is now in two slots, which is the limit. The 41 remaining slots can only be filled by reusing a picture (marked OVER, 39 slots) or by new pictures.
6. **Alt text still to set:** Safety story item 2 (S3), Company event card 2 image (C3), Home partner photos (H4 to H7), and any other to-do slot that is not decorative.
7. **Extra Gemini variants (needs the user's OK).** To avoid reuse, make up to six new pictures of the same shelter and give each to up to two of the 41 slots. Use the SHELTER block, Style A, the same Gemini settings, and attach `generated-images/IMG-01_16x9.png` as the reference. Subjects: X1 ground-level front view of the shelter in the dry season, X2 side view showing the piles and the stair, X3 interior looking toward the open door with shelves on both sides, X4 interior close view of the counter and a blank notice board, X5 bagged firewood and water containers stacked beside the stair, X6 roof and solar panel seen from an angle. Name them `IMG-X1_16x9.png` and so on, with a `.prompt.txt` each. Give them alt text of 8 to 20 words that starts with "Concept image:". Ask the user first. If the user says no, fill every slot with the plan in Part B and report the OVER slots.

The exact prompts, model settings, ratios and file names for the Gemini images (including the IMG-09 redo) are in `/Users/darrell/Developer/assignment-website/waabi-safety-reconstruction/generated-images/PROMPTS_TO_RUN.md`. Run those prompts, or let the user run them by hand.

### A.4 Gemini workflow notes

- Use Gemini in the user's Chrome, signed in as the user, at https://gemini.google.com/images. Model "4 Argon", Thinking level "High" (open the model picker, then the "Thinking level" submenu). Other models offered: 3.5 Flash-Lite, 3.8 Flash, 3.1 Pro. Do not use them.
- The "Aspect ratio" menu offers only 1:1, 9:16, 3:4, 4:3 and 16:9. There is no 3:2. Generate 3:2 slots at 4:3, then crop to 3:2 with the recipe in B.9.
- "Download full size" saves into `~/Downloads` as `Gemini_Generated_Image_*.png` or `.jpg`. Move the file into `generated-images/` and give it the name in `PROMPTS_TO_RUN.md`. Save the prompt in `IMG-xx.prompt.txt` with the model, thinking level, ratio, date and number of attempts.
- Google showed an "unusual traffic" CAPTCHA twice: first when four agents ran in parallel, then after a single automated navigation. Automation must NOT solve a CAPTCHA. Stop and ask the user to clear it.
- Go slowly. Use one foreground Chrome tab for Gemini, never more than two. Pause between generations. Do not reload Gemini repeatedly. Keep the download tab in the foreground. If a CAPTCHA shows, stop and report. The user may also run the prompts by hand.
- Check every image before it goes on the site: no people, no readable text, no logos, no brand names, no emblems or manufacturer marks on vehicles, one rectangular building on piles as described in the SHELTER block of 6.5.

### A.5 Known layout limits (from the page reports)

- Stage cards ("Project stages"): the "Project stage" tag shows twice on card 1 and not at all on card 5, because the tag logic is hard-coded. This is on Home and Safety. On Company the tag list was cut to one tag, and card 5 still shows none. Card 9 repeats Stage 1 because there are 9 slots and 8 stages. The same 9 cards feed Home, Safety and Company.
- Company: the "news" cards show the project stages. Criteria 5 to 8 and Background card 6 are inside map pin pop-ups that show only on hover or focus. The pink animated road lines (`company-roads.json`) and the pin positions were tuned to the old North America map. With IMG-08 they will not line up. They were left alone. Report it.
- Company portraits: only 4 portrait files rotate, so the letters J (Jude) and Q (Qijun) never show on that page. Careers shows all six letters.
- Company map: the pink road paths and the pin buttons on top of the map (`company-roads.json` and CSS pins) no longer match the new schematic map. They were left alone.
- The Stage 5 card shows a 21:9 strip in a 4:3 box, so only the middle of the strip shows.
- Safety: panel image ratios are chosen in code by file name (names containing `04462` or `10-31`). Keep those two file names.
- Careers: reference cards use invisible zero-width spaces in URLs, and "\n" inside cards collapses to a space because the CSS is not allowed to change. The mission paragraph is about 3,700 characters long.
- Home: the scale-section preview and tile 5 of the collage share one file. The Home partner tab photo still uses one `alt` string for four images (see B.0).

### A.6 Blocks not placed (the final report must still list them)

- Home: H-02 LONG and H-03 LONG (SHORT used). H-05 "Keywords" line. H-06 sentences 3 and 4. H-07 everything after the first sentence (the 24 square metre description, "The design includes" list and "Who would use it"). H-08 bullets 1 to 6 (only "Next steps" placed). H-10 items 4 and 5 (the figures $87,400 and $3,950 appear in the scale tab 3 text). H-14 LONG sentence. H-13 is in the partners intro, not the safety block.
- Company: C-02 LONG heading. C-03 both intro paragraphs. C-04 group declaration (names and roles are all placed). C-06 both paragraphs. C-07 (heading, needs statement, paragraph, scope). C-08 note.
- Safety: all of S-07 (Prototype, including its table), and the S-02 SHORT heading (used only in the page title). The S-01 meta still mentions "the prototype". S-04 matrix is placed as lines, not as a table.
- Careers: nothing is missing. D-08 Appendices 1, 2, 4 and 5 sit in the mission paragraph and Appendix 3 sits in the values description. D-04 table rows are written as sentences inside the cost quotes. D-07 holds all 26 entries of Part 7.

### A.7 Open items to list in the final report

The site must still show these items exactly as written. Search the site for the phrase "TEAM TO ADD" after your changes and list every hit with its page. Items 1 to 22 are on the site now. Items 23 to 28 are in blocks that were not placed, so the team must be told. They hold 9 open items in all, because item 27 is four result cells.

Home (4)
1. Design Area line (H-05), in the Cover tab author line.
2. Tutorial number and tutor (H-12), in the Cover tab quote.
3. Acknowledgement of Country wording check (H-13), in the partners intro.
4. Contact route (H-14), in the How might we tab author title line.

Footer, shown on every page (1)
5. Contact route line in the footer.

Company (1)
6. Park closure dates apply to Warokutal (C-05 card 3).

Safety (6)
7. Confirm the screened-out idea description (S-03).
8. Source for Option A (S-03).
9. Source and confirmation for Option B (S-03).
10. Source and confirmation for Option C (S-03).
11. Confirm the reasons for each rating (S-04), in panel 3.
12. Confirm the entry type, stairs or ramp (S-05), in practice slide 2.

Careers (10)
13. Confirm what the 1.2 factor covers (D-04), in cost quote 5.
14. Basis for the stock quantities (D-04), in cost quote 5.
15. Revenue workings and how the low and high running costs were worked out (D-04), in cost quote 7.
16. Confirm the community reaction sentence (D-05), in the mission paragraph.
17. Citation for the official crocodile warning (D-05), in the mission paragraph.
18. Attach the charter (Appendix 1), in the mission paragraph.
19. Attach the meeting minutes (Appendix 2), in the mission paragraph.
20. Attach the full test results (Appendix 4), in the mission paragraph.
21. Read and confirm the AI use statement (Appendix 3), in the values description.
22. Citation for the beacon rules (D-06 item 4), in the closing paragraph.

Not on the site (blocks not placed)
23. Company: the group declaration and the sections each member wrote (C-04).
24. Company: confirm the criteria (C-08 note).
25. Safety: confirm whether medicines are stocked (S-07).
26. Safety: Blender screenshots of the prototype (S-07).
27. Safety: four "Pending" test result cells (S-07).
28. Safety: changes after testing (S-07).


Consistency note for the team: Appendix 3 (D-08) says "An AI image tool made the concept images on this site" and that Gemini made the images for the team's presentation. The images on the site are made with Gemini (model 4 Argon). Do not edit that text. List it in the report so the team can confirm the wording.

### A.8 Leftovers outside the four pages (leave them, list them)

- `README.md` (title, description and links still describe the old site and its production URL).
- `public/assets/manifest.json` and `public/assets/home/manifest.json` (old source URLs), and `public/assets/careers/provenance.json`.
- File names with old names: `waabi_*`, `nvidia`, `volvo`, `uber`, `investor-logos-*`, `fya_one-1`, `logo-partner`, `*-blog-*`, `vas-waabi-warp`, `WAABI_27s_2K_antinomy_export_250823.mp4` and the other video names listed in B.7.
- JSON key names `_modelApiKey: "partner_item"` and `__typename` values such as `PartnerItemRecord` and `ArticleRecord` in `components/home-data.json`; CSS class names `home-partner-*`, `careers-*`, `co-*`; the pink hex in the CSS.
- Package name `waabi-safety-prototype` in `package.json` and `package-lock.json`.
- The favicon file name `1774553027-favicon-32x32.webp` (replace the picture, keep the name; see B.6).
- `docs/` (28 notes about the old site), `tests/` (`careers.spec.ts`, `pages.spec.ts` and `safety.spec.ts` check old text and will fail), `scripts/` (31 scripts, most built for the old site), `artifacts/` (old screenshots).
- Unused old media that still ship: the copies of the stage card images in `public/assets/company/` and `public/assets/home/`, `public/assets/home/Waabi_System_LightTunnel_1.mp4` with its `.jpg`, `public/assets/footer-logo.svg`, the `instagram.svg`, `linkedin.svg` and `youtube.svg` icons, `public/assets/home/1761262941-fya_one-1.webp`, and a few root photos (`1756426717-waabi_road2_04965.webp`, `1761183903-waabi_road2_04225.webp`, `1761218483-waabi_research_lighttunnel_wip.webp`). No slot uses them. Do not delete them.
- No 404 page, sitemap or robots file exists.

---

## PART B. Image slot manifest

Part B lists every image and video slot on the site, what goes in it, and how to make the file. It was built from the four page reports and from measuring the live pages at 1280 and 390 px. The slot's real box and ratio win over the ratio in 6.5.

### B.0 How to use this part

1. **Files.** Replace each file in place under `public/assets/`. Keep the file name and the file type. WebP stays WebP, JPG stays JPG, PNG stays PNG, SVG stays SVG, MP4 stays MP4. Do not change any `src`, `width`, `height` or other attribute. Because the images use `object-fit: cover` (the footer video uses `fill`), crop each file to the box ratio in the table.
2. **Output size.** The Output column gives the pixel size. It keeps the old file's width and applies the slot ratio, with the long edge at most 2200 px. Flat drawings and monogram tiles may be smaller. Save WebP at quality 82. Keep photos under about 700 KB and PNG slots under about 1.5 MB.
3. **Crop.** Use the recipe in B.9. Keep the main subject in the middle third of the picture, because the same file is cropped differently on desktop and on mobile. Check each page at 375 and 1280 px.
4. **Alt text.** The Alt column holds a code. The words for each code are in B.1. Photo-style images (IMG-01 to 05, 09, 10) start with "Concept image:". Drawn items are a plain description. Slots marked "empty (decorative)" already have `alt=""` and must keep it. Do not add a caption to a slot that has none. **No slot on this site has a caption element today**, so the sentence "Concept image made with Gemini (4 Argon), 2026. Not a photograph. Not the real site." appears nowhere on the page. Say so in the final report.
5. **Shared alt strings.** The Safety story image (S2 to S4) now has an alt array indexed by the active story. Item 1 (IMG-02) and item 3 (IMG-10) are set. Item 2 (S3) is still the placeholder, so set it with its picture. One `alt` string still serves four images on the Home partner photo (H4 to H7). Replace it with a lookup by the existing tab index, because only alt text changes, and list it as a code touch. If you do not, use the shared alt "Concept image: the proposed raised shelter at Warokutal, its supplies, recovery kit or building materials." (15 words). The Home partner circle tiles carry the full organisation names in their alt. The Company portraits and the Company event card 2 image (C3) still need their alt checked: C3 keeps the placeholder until its picture is placed.
6. **Prototype slot.** No slot on the site is about the prototype, because S-07 was not placed. If a slot for S-07 is ever added, use IMG-06 with the alt "Concept illustration of the shelter" and never call a generated image a prototype or a Blender model.
7. **Status.** DONE means the file is already placed with its final alt text, and no caption exists on the slot. Do not touch it, except the two slots marked "DONE, redo" (they hold the IMG-09 file with the car emblem). The 18 DONE rows in the tables plus the monograms, name tiles, wordmarks and favicon are finished. Everything marked **to do** is still the old photo, video or logo.

**Reuse rule: it cannot be met.** The brief says one image in no more than two slots. This site has 59 photo or drawing slots, counted as one slot for each place in the code (the team monograms, logo tiles, wordmarks and videos are listed separately). Of these, 18 are DONE. Every photo-style image is now at its limit of two slots (IMG-01, 02, 03, 04, 05, 09 and 10). IMG-08 is at two. IMG-06 and IMG-07 have one use each left. The 41 slots still to do therefore need either new pictures or an OVER mark. The plan below gives the last two within-limit uses (IMG-06 and IMG-07) to menu tiles M2 and M4. Every other to-do slot is marked **OVER** and shows the image to reuse. There are 39 OVER slots. Do not stop because of this. Preferred way out, needing the user's OK (A.3, item 7): make the extra Gemini variants listed in A.3, give each variant to up to two slots, and put them in place of the OVER reuse. If the user does not agree, fill every to-do slot as planned, use a different crop for each repeat, and list every OVER slot and the final use count of each image in the report (0.7, item 7).

Use counts in this plan: IMG-01 2, IMG-02 10, IMG-03 10, IMG-04 9, IMG-05 2, IMG-09 2, IMG-10 9, IMG-06 4, IMG-07 5, IMG-08 6.

### B.1 Alt text library

Each text is 8 to 20 words. Check each against the final saved picture, and fix it if the picture shows something else.

| Code | Image | Alt text |
|---|---|---|
| A01 | IMG-01 | Concept image: aerial view of the raised shelter, a four-wheel drive and camp chairs in a cleared bush campground. |
| A02 | IMG-02 | Concept image: the raised shelter in the wet season, with brown floodwater around its concrete piles under grey clouds. |
| A03 | IMG-03 | Concept image: inside the shelter, steel shelves hold water containers, canned food and traction boards beside a counter. |
| A04 | IMG-04 | Concept image: a bench with traction boards, a recovery strap, shackles, a compressor, a hose, a beacon and a radio. |
| A05 | IMG-05 | Concept image: a shelf holding water containers, tins with blank labels and bagged firewood. |
| A06 | IMG-06 | Side view drawing of a shelter on concrete piles with a dashed flood line below the floor and soil beneath. |
| A08 | IMG-08 | Abstract site plan of a cleared area with a small building footprint, a camp area and a track. |
| A09 | IMG-09 | Concept image: a red dirt road with floodwater across it and a four-wheel drive stopped at the edge. |
| A10 | IMG-10 | Concept image: a bench with a concrete pile section, a watertight concrete sample and a corrugated roof sheet sample. |
| M-x | IMG-11 | Monogram tile with the letter P for team member Pinhong. (D Darrell, T Tasneef, I Isaac, J Jude, Q Qijun in the same form.) |
| W | IMG-12 | Provisions Point (header and footer wordmarks keep their existing alt). |
| N-x | name tiles | The full name of the organisation shown on the tile. These alts are shorter than 8 words on purpose. |
| empty | any decorative slot | Keep `alt=""`. |

IMG-07 (strip) is used only in decorative slots, so it needs no alt. If it is ever described: "Drawing of five simple icons in a row: a phone, a tent, a four-wheel drive, a beacon and a kit." (20 words).

### B.2 Home page (`public/assets/home/`)

Photo-style slots. The partner photos H5 and H7 are PNG, H4 and H6 are JPG, everything else is WebP. The four partner photos (H4 to H7), the 11 other collage tiles, the centre tile and the four Careers collage images are still the old photos.

| ID | Slot | Current file (under public/assets/) | Box and ratio | Image | Status | Output | Alt | Notes |
|---|---|---|---|---|---|---|---|---|
| H1 | Scale section, preview (square, shown before the video stack) | `home/1761183902-waabi_road2_05483.webp` | 527x527 desktop, hidden on mobile, 1:1 | IMG-05, use 1 | **DONE** | placed, 1600x1600 WebP | A05 | none |
| H2 | Tech section, full-width hero image | `home/1756426717-waabi_road1_00928.webp` | 1232x800 desktop, 342x844 mobile, 1.54 | IMG-02, use 1 | **DONE** | placed, 1920x1080 WebP | A02 | none |
| H3 | Safety section, full-bleed background | `home/1761185044-waabi_road2_05683.webp` | 1280x800 desktop, 390x844 mobile, 8:5 | IMG-09, use 1 | **DONE, redo** | placed, 1920x1080 WebP | A09 | DONE. Placed as WebP 1920x1080. Contains a small car emblem. Overwrite again (same name) when the IMG-09 redo is ready. Text sits over it. Keep the road low and the sky calm. |
| H4 | Partner stage photo, tab 1 Context | `home/1761262941-fya_one-1.jpg` | 915x750 desktop, 366x330 mobile, 1.22 | IMG-04, use 3 **OVER** | **to do** | 2000x1639 JPG | A04 | JPG. |
| H5 | Partner stage photo, tab 2 Opportunity | `home/1769592036-logo-partner.png` | same box as H4, 1.22 | IMG-02, use 3 **OVER** | **to do** | 1200x984 PNG | A02 | PNG. Old file is 2000 px wide. Use 1200 px wide to keep the file small. |
| H6 | Partner stage photo, tab 3 Cover | `home/1756426717-waabi_road2_04115.jpg` | same box as H4, 1.22 | IMG-03, use 3 **OVER** | **to do** | 1500x1230 JPG | A03 | JPG. |
| H7 | Partner stage photo, tab 4 How might we | `home/1761186315-nvidia-waabi_logos_2x_final.png` | same box as H4, 1.22 | IMG-10, use 3 **OVER** | **to do** | 1200x984 PNG | A10 | PNG. Use 1200 px wide. |
| HC | Road section, centre tile (small square) | `home/1761218404-waabi_inspection_02344.webp` | 118x118 (9.25vw), 1:1 | IMG-04, use 4 **OVER** | **to do** | 480x480 WEBP | empty (decorative) | Decorative tile. |
| HT0 | Road collage tile 0 (small square) | `home/1760006286-kevin-wang-1gwy7no_nr4-unsplash_edited_final.webp` | 118x118 (9.25vw) desktop, 133x133 mobile, 1:1 | IMG-10, use 4 **OVER** | **to do** | 520x520 WEBP | empty (decorative) | Decorative tile. |
| HT1 | Road collage tile 1 (small square) | `home/1761183718-waabi_road1_01902.webp` | 118x118 (9.25vw) desktop, 133x133 mobile, 1:1 | IMG-02, use 4 **OVER** | **to do** | 1500x1500 WEBP | empty (decorative) | Decorative tile. |
| HT2 | Road collage tile 2 (small square) | `home/1761183902-waabi_exterior_morning_00857.webp` | 118x118 (9.25vw) desktop, 133x133 mobile, 1:1 | IMG-03, use 4 **OVER** | **to do** | 1920x1920 WEBP | empty (decorative) | Decorative tile. |
| HT3 | Road collage tile 3 (small square) | `home/1761183903-waabi_road2_04462.webp` | 118x118 (9.25vw) desktop, 133x133 mobile, 1:1 | IMG-04, use 5 **OVER** | **to do** | 1920x1920 WEBP | empty (decorative) | Decorative tile. |
| HT4 | Road collage tile 4 (small square) | `home/1761184004-251006_waabi_val_fakhrutdinova_0214.webp` | 118x118 (9.25vw) desktop, 133x133 mobile, 1:1 | IMG-08, use 3 **OVER** | **to do** | 1024x1024 WEBP | empty (decorative) | Decorative tile. |
| HT5 | Road collage tile 5 (small square) | `home/1761183902-waabi_road2_05483.webp` | 118x118 desktop, 133x133 mobile, 1:1 | IMG-05, use 2 | **DONE** | placed, 1600x1600 WebP | empty (decorative) | none |
| HT6 | Road collage tile 6 (small square) | `home/1761183903-waabi_scout_00826.webp` | 118x118 (9.25vw) desktop, 133x133 mobile, 1:1 | IMG-06, use 3 **OVER** | **to do** | 1920x1920 WEBP | empty (decorative) | Decorative tile. |
| HT7 | Road collage tile 7 (small square) | `home/1760006943-waabi_scout_00286_final.webp` | 118x118 (9.25vw) desktop, 133x133 mobile, 1:1 | IMG-07, use 3 **OVER** | **to do** | 520x520 WEBP | empty (decorative) | Decorative tile. Square crop of one icon of the strip (icon 1). |
| HT8 | Road collage tile 8 (small square) | `home/1761184004-251006_waabi_ashwin_kumar_0866.webp` | 118x118 (9.25vw) desktop, 133x133 mobile, 1:1 | IMG-07, use 4 **OVER** | **to do** | 1024x1024 WEBP | empty (decorative) | Decorative tile. Square crop of one icon of the strip (icon 2). |
| HT9 | Road collage tile 9 (small square) | `home/1761183902-waabi_portrait_neiel_00646.webp` | 118x118 (9.25vw) desktop, 133x133 mobile, 1:1 | IMG-10, use 5 **OVER** | **to do** | 1920x1920 WEBP | empty (decorative) | Decorative tile. |
| HT10 | Road collage tile 10 (small square) | `home/1761184005-251006_waabi_lunch_room_0489.webp` | 118x118 (9.25vw) desktop, 133x133 mobile, 1:1 | IMG-04, use 6 **OVER** | **to do** | 1024x1024 WEBP | empty (decorative) | Decorative tile. |
| HT11 | Road collage tile 11 (small square) | `home/1761183980-waabi_inspection_02285.webp` | 118x118 (9.25vw) desktop, 133x133 mobile, 1:1 | IMG-02, use 5 **OVER** | **to do** | 1920x1920 WEBP | empty (decorative) | Decorative tile. |
| H16 | Careers collage image 1 (4:3 crop; positions 0 and 4) | `home/1760350326-waabi_portrait_felicia_00336_final.webp` | 294x218 to 602x448 desktop, 90x66 to 183x137 mobile, 4:3 | IMG-03, use 5 **OVER** | **to do** | 1600x1200 WEBP | A03 | Alt is an array of four strings indexed by position (i%4). The file shows twice in the rotation. |
| H17 | Careers collage image 2 (4:3 crop; positions 1 and 5) | `home/1760350326-waabi_scout_00761_final.webp` | 294x218 to 602x448 desktop, 90x66 to 183x137 mobile, 4:3 | IMG-10, use 6 **OVER** | **to do** | 1600x1200 WEBP | A10 | Alt is an array of four strings indexed by position (i%4). The file shows twice in the rotation. |
| H18 | Careers collage image 3 (4:3 crop; positions 2) | `home/1761184004-251006_waabi_collab_05_1012_a.webp` | 294x218 to 602x448 desktop, 90x66 to 183x137 mobile, 4:3 | IMG-02, use 6 **OVER** | **to do** | 1024x768 WEBP | A02 | Alt is an array of four strings indexed by position (i%4). |
| H19 | Careers collage image 4 (4:3 crop; positions 3) | `home/1760350326-waabi_inspection_02613_final.webp` | 294x218 to 602x448 desktop, 90x66 to 183x137 mobile, 4:3 | IMG-04, use 7 **OVER** | **to do** | 1600x1200 WEBP | A04 | Alt is an array of four strings indexed by position (i%4). |

**DONE.** Home partner circle tiles (text tiles, no IMG id) hold the short words below, because the circle is only about 60 px wide. The alt carries the full organisation name.

| Tab | File | Tile text | Full name in alt | Status |
|---|---|---|---|---|
| 1 Context | `home/1760431072-volvo-logo.svg` | Rangers | Lama Lama Rangers | DONE |
| 2 Opportunity | `home/1769597315-investor-logos-11.svg` | EWB | Engineers Without Borders Australia | DONE |
| 3 Cover | `home/1761945971-investor-logos-9.svg` | UTS | University of Technology Sydney | DONE |
| 4 How might we | `home/1760431057-nvidia-logo.svg` | YAC | Yintjingga Aboriginal Corporation | DONE |

Videos, posters and the footer video on this page: see B.7.

### B.3 Safety page (`public/assets/`)

| ID | Slot | Current file (under public/assets/) | Box and ratio | Image | Status | Output | Alt | Notes |
|---|---|---|---|---|---|---|---|---|
| S1 | Hero banner | `1760007662-e65a0af926da45b75ba890d3d0a5bb24469ce5be.webp` | 1280x800 desktop, 390x844 mobile, 8:5 | IMG-01, use 1 | **DONE** | placed, 2000x1125 WebP | A01 | none |
| S2 | Story image, Option A (swaps with the active story) | `1761185044-waabi_road2_05683.webp` | 458x524 desktop, 0.87 | IMG-02, use 2 | **DONE** | placed, 1500x1000 WebP | A02 | Alt is an array indexed by the active story item. |
| S3 | Story image, Option B | `1761183960-waabi_inspection_02285.webp` | 458x524 desktop, 0.87 | IMG-04, use 8 **OVER** | **to do** | 1500x1716 WEBP | A04 | Story item 2. Its alt in the array is still the placeholder. Set it with the picture. |
| S4 | Story image, Option C | `1760350326-shutterstock_1058062604_edited_final.webp` | 458x524 desktop, 0.87 | IMG-10, use 1 | **DONE** | placed, 1448x966 WebP | A10 | Alt is an array indexed by the active story item. |
| S5 | Technology panel 1 | `1761183903-waabi_road2_04462.webp` | 1080x720 desktop, 900x600 mobile, 3:2 | IMG-06, use 1 | **DONE** | placed, 2000x1333 WebP (drawn) | empty (decorative) | none |
| S6 | Technology panel 2 | `1761947979-screenshot-2025-10-31-at-2-59-29-pm.webp` | 1288x720 desktop, 342x191 mobile, 1.79 | IMG-08, use 1 | **DONE** | placed, 2000x1118 WebP (drawn) | empty (decorative) | none |
| S7 | Technology panel 3 | `1762294277-screenshot-2025-11-04-at-2-11-01-pm.webp` | 1285x720 desktop, 342x192 mobile, 1.78 | IMG-03, use 6 **OVER** | **to do** | 2000x1121 WEBP | empty (decorative) | none |
| S8 | Practice slide 1, full-bleed | `1761183902-waabi_road2_04965.webp` | 1280x800 desktop, 390x844 mobile, 8:5 | IMG-03, use 1 | **DONE** | placed, 1448x965 WebP | empty (decorative) | none |
| S9 | Practice slide 2, full-bleed | `1761183937-waabi_garageinterior_03851.webp` | same as S8, 8:5 | IMG-04, use 1 | **DONE** | placed, 1448x965 WebP | empty (decorative) | none |
| S10 | Practice slide 3, full-bleed | `1761183980-waabi_road1_01029.webp` | same as S8, 8:5 | IMG-02, use 7 **OVER** | **to do** | 2000x1250 WEBP | empty (decorative) | none |
| S11 | Practice slide 4, full-bleed | `1760350326-waabi_laptop_03392_final.webp` | same as S8, 8:5 | IMG-10, use 7 **OVER** | **to do** | 1600x1000 WEBP | empty (decorative) | none |

The stage cards on this page are in B.6.

### B.4 Company page (`public/assets/company/`)

| ID | Slot | Current file (under public/assets/) | Box and ratio | Image | Status | Output | Alt | Notes |
|---|---|---|---|---|---|---|---|---|
| C1 | Hero banner | `company/1760350326-waabi_washstation_03082_final.webp` | 1280x800 desktop, 390x844 mobile, 8:5 | IMG-01, use 2 | **DONE** | placed, 2200x1238 WebP | A01 | none |
| C2 | Quote section background | `company/1761183960-waabi_portrait_raquel_02880.webp` | 1232x770 desktop, 390x693 mobile, 1.60 | IMG-09, use 2 | **DONE, redo** | placed, 1920x1080 WebP | A09 | DONE. Placed as WebP 1920x1080. Contains a small car emblem. Overwrite again (same name) when the IMG-09 redo is ready. |
| C3 | Event card 2 image | `company/1788170473-f3.webp` | 315x214 desktop, 310x211 mobile, 1.47 | IMG-03, use 7 **OVER** | **to do** | 640x435 WEBP | A03 | Old file is only 640 px wide. Use 960 px wide. |
| CM | Map (SVG, drawn with fill so the ratio must match) | `company/map.svg` | 1302x1027 desktop, 530x418 mobile, 1.27 | IMG-08, use 2 | **DONE** | placed, SVG 1465x1156 (drawn) | A08 | none |

**DONE. Team portraits (IMG-11, six monogram tiles).** The four portrait files are monogram tiles now: WebP, 1200x1600 (3:4), flat art in the three site colours, one letter, no faces. Keep the same style for any tile you add. Alt: see B.0 item 5.

| ID | File | Letter and member | Status |
|---|---|---|---|
| CP1 | `company/1761188599-251006_waabi_ashwin_kumar_0866.webp` | P Pinhong | DONE |
| CP2 | `company/1761700499-251006_waabi_collab_02_0612.webp` | D Darrell | DONE |
| CP3 | `company/1761700304-251006_waabi_saloni_mulani_0355-1.webp` | T Tasneef | DONE |
| CP4 | `company/1761183937-waabi_portrait_dave_00283.webp` | I Isaac | DONE |

Jude (J) and Qijun (Q) cannot show on this page, because the code rotates only four files. Report it. Do not add files or entries.

**DONE. Logo wall (15 plain text tiles, IMG-12 family).** Label: "Organisations and sources in this proposal". Tiles 1 to 8 hold the eight names of 6.3 in order (Yintjingga Aboriginal Corporation, Lama Lama Rangers, Engineers Without Borders Australia, University of Technology Sydney, Queensland Parks and Wildlife Service, Cook Shire Council, Department of the Environment, Tourism, Science and Innovation, National Indigenous Australians Agency). Tiles 9 to 15 repeat names 1 to 7. The files are the 15 `company/*.svg` logo files, each with its old `width`, `height` and `viewBox`. The alt in the code array is the name on the tile. Do not use the word "partner".

**Map (CM): DONE.** `company/map.svg` is now the IMG-08 schematic (same viewBox 1465x1156). The pink animated road paths (`company-roads.json`) and the pin buttons that sit on top (CSS positions) were tuned to the old North America map and no longer match the new drawing. They were left alone by rule. Report it.

The stage cards on this page are in B.6.

### B.5 Careers page (`public/assets/careers/`)

| ID | Slot | Current file (under public/assets/) | Box and ratio | Image | Status | Output | Alt | Notes |
|---|---|---|---|---|---|---|---|---|
| K1 | Hero banner (parallax) | `careers/1761187390-251006_waabi_collab_03_0781.webp` | 1280x800 desktop, 390x844 mobile, 8:5 | IMG-02, use 8 **OVER** | **to do** | 2000x1250 WEBP | empty (decorative) | Decorative (alt empty). |
| K2 | Mission window image | `careers/1761699271-251006_waabi_collab_05_1012_a.webp` | 1097x860 desktop, 366x600 mobile, 1.28 | IMG-10, use 2 | **DONE** | placed, 1448x966 WebP | A10 | none |
| K3 | Closing photo stack, image 1 of 6 (4:3 card) | `careers/1761699271-251006_waabi_lunch_room_0456.webp` | 294x218 to 602x448 desktop, 90x66 to 183x137 mobile, 4:3 | IMG-03, use 2 | **DONE** | placed, 1448x925 WebP | empty (decorative) | none |
| K4 | Closing photo stack, image 2 of 6 (4:3 card) | `careers/1761183960-waabi_inspection_02285.webp` | 294x218 to 602x448 desktop, 90x66 to 183x137 mobile, 4:3 | IMG-04, use 2 | **DONE** | placed, 1448x965 WebP | empty (decorative) | none |
| K5 | Closing photo stack, image 3 of 6 (4:3 card) | `careers/1761700569-251006_waabi_collab_07_1184.webp` | 294x218 to 602x448 desktop, 90x66 to 183x137 mobile, 4:3 | IMG-10, use 8 **OVER** | **to do** | 2000x1500 WEBP | empty (decorative) | Decorative (alt empty). |
| K6 | Closing photo stack, image 5 of 6 (4:3 card) | `careers/1761698467-251006_waabi_collab_04_0922.webp` | 294x218 to 602x448 desktop, 90x66 to 183x137 mobile, 4:3 | IMG-02, use 9 **OVER** | **to do** | 2000x1500 WEBP | empty (decorative) | Decorative (alt empty). |
| K7 | Closing photo stack, image 6 of 6 (4:3 card) | `careers/1761183902-waabi_scout_00699.webp` | 294x218 to 602x448 desktop, 90x66 to 183x137 mobile, 4:3 | IMG-03, use 8 **OVER** | **to do** | 2000x1500 WEBP | empty (decorative) | Decorative (alt empty). |

**DONE. Portrait stack (5 monogram tiles, IMG-11).** The stack box is 3:4. The five files are monogram tiles, WebP, 1200x1600. The JSON `width` and `height` values are the old files' sizes and were not changed.

| ID | File | Letter and member | Status |
|---|---|---|---|
| KP1 | `careers/1761184004-251006_waabi_val_fakhrutdinova_0214.webp` | P Pinhong | DONE |
| KP2 | `careers/1760350326-waabi_portrait_neiel_00646_final.webp` | D Darrell | DONE |
| KP3 | `careers/1761699279-251006_waabi_collab_06_1065.webp` | T Tasneef | DONE |
| KP4 | `careers/1761188995-251006_waabi_carter_fang_0171.webp` | I Isaac | DONE |
| KP5 | `careers/1761188599-251006_waabi_ashwin_kumar_0866.webp` | J Jude | DONE |
| KC4 | `careers/1760350326-waabi_portrait_felicia_00336_final.webp` | Q Qijun (closing stack card 4, 1600x1200, 4:3) | DONE |

The closing photo stack has six cards. Card 4 (KC4 above) is a monogram. The other five are K3 to K7 above. K3 and K4 are DONE. K5, K6, K7 and the hero K1 are still old photos.

### B.6 Shared pieces (every page)

**Menu tiles** (decorative, `alt=""`, 3:2, shown at 75x50 px, so tiny). All four are still old photos:

| ID | Slot | Current file (under public/assets/) | Box and ratio | Image | Status | Output | Alt | Notes |
|---|---|---|---|---|---|---|---|---|
| M1 | Menu tile for Overview | `1761183902-waabi_road2_05483.webp` | 75x50 desktop, 65x43 mobile, 3:2 | IMG-03, use 9 **OVER** | **to do** | 2000x1333 WEBP | empty (decorative) | Decorative. Tiny. |
| M2 | Menu tile for Solution | `1761183903-waabi_scout_00376.webp` | 75x50 desktop, 65x43 mobile, 3:2 | IMG-06, use 2 | **to do** | 2000x1333 WEBP | empty (decorative) | Decorative. Tiny. |
| M3 | Menu tile for Project | `1761185043-waabi_scout_00739.webp` | 75x50 desktop, 65x43 mobile, 3:2 | IMG-08, use 4 **OVER** | **to do** | 900x600 WEBP | empty (decorative) | Decorative. Tiny. |
| M4 | Menu tile for Delivery | `1761187390-251006_waabi_collab_03_0781.webp` | 75x50 desktop, 65x43 mobile, 3:2 | IMG-07, use 2 | **to do** | 2000x1333 WEBP | empty (decorative) | Decorative. Tiny. Crop one icon of the strip. |

**Stage card images.** Only I5 (Stage 5) is done. The other eight are still the old pictures. One data file (`components/insights-data.ts`) feeds the cards on Home, Safety and Company, so each file below is one slot that shows on three pages. Cards are 4:3 (450x338 px desktop, 310x233 px mobile) and decorative.

| ID | Slot | Current file (under public/assets/) | Box and ratio | Image | Status | Output | Alt | Notes |
|---|---|---|---|---|---|---|---|---|
| I1 | Stage card image: Stage 1 | `1791944791-edit-1-1.webp` | 450x338 desktop, 310x233 mobile, 4:3 | IMG-08, use 5 **OVER** | **to do** | 2000x1500 WEBP | empty (decorative) | Decorative. Same data file feeds Home, Safety and Company, so one file is one slot on three pages. |
| I2 | Stage card image: Stage 2 | `1790974044-vas-waabi-warp.webp` | 450x338 desktop, 310x233 mobile, 4:3 | IMG-08, use 6 **OVER** | **to do** | 1120x840 WEBP | empty (decorative) | Decorative. Same data file feeds Home, Safety and Company, so one file is one slot on three pages. Use a different crop from card 1. |
| I3 | Stage card image: Stage 3 | `1790628632-blog-dallas-sanantonio.webp` | 450x338 desktop, 310x233 mobile, 4:3 | IMG-06, use 4 **OVER** | **to do** | 2000x1500 WEBP | empty (decorative) | Decorative. Same data file feeds Home, Safety and Company, so one file is one slot on three pages. |
| I4 | Stage card image: Stage 4 | `1790628632-blog-dallas-houston.webp` | 450x338 desktop, 310x233 mobile, 4:3 | IMG-10, use 9 **OVER** | **to do** | 2000x1500 WEBP | empty (decorative) | Decorative. Same data file feeds Home, Safety and Company, so one file is one slot on three pages. |
| I5 | Stage card image: Stage 5 | `1790628632-blog.webp` | 450x338 desktop, 310x233 mobile, 4:3 | IMG-07, use 1 | **DONE** | placed, 2100x900 WebP (drawn strip) | empty (decorative) | DONE. IMG-07 strip placed as WebP 2100x900 (21:9). The 4:3 card shows only the middle of the strip. |
| I6 | Stage card image: Stage 6 | `1756264338-png-image-2.webp` | 450x338 desktop, 310x233 mobile, 4:3 | IMG-04, use 9 **OVER** | **to do** | 2000x1500 WEBP | empty (decorative) | Decorative. Same data file feeds Home, Safety and Company, so one file is one slot on three pages. |
| I7 | Stage card image: Stage 7 | `1769595209-screenshot-2026-01-28-at-2-12-00-am.webp` | 450x338 desktop, 310x233 mobile, 4:3 | IMG-03, use 10 **OVER** | **to do** | 2000x1500 WEBP | empty (decorative) | Decorative. Same data file feeds Home, Safety and Company, so one file is one slot on three pages. |
| I8 | Stage card image: Stage 8 | `1767826472-screenshot-2026-01-07-at-12-54-15-pm.webp` | 450x338 desktop, 310x233 mobile, 4:3 | IMG-07, use 5 **OVER** | **to do** | 1146x860 WEBP | empty (decorative) | Decorative. Same data file feeds Home, Safety and Company. Crop to 4:3 around icons 4 and 5. |
| I9 | Stage card image: Stage 1 again (card 9) | `1756426717-waabi_road2_04115.webp` | 450x338 desktop, 310x233 mobile, 4:3 | IMG-02, use 10 **OVER** | **to do** | 1500x1125 WEBP | empty (decorative) | Decorative. Same data file feeds Home, Safety and Company, so one file is one slot on three pages. |

**DONE. Wordmarks and favicon (IMG-12).** Both SVG wordmarks now read "Provisions" over "Point" in `currentColor`, with the old `width`, `height` and `viewBox`. The favicon is a pink square with a P.

| ID | File | Size | Status |
|---|---|---|---|
| W1 | `waabi-logo.svg` (header) | 75x23, viewBox 0 0 75 23 | DONE |
| W2 | `waabi-logo-footer.svg` (footer) | 300x80, viewBox 0 0 526 140 | DONE |
| F1 | `1774553027-favicon-32x32.webp` (set in `app/layout.tsx`) | 32x32 WebP | DONE |

`public/assets/footer-logo.svg` is an unused copy of W2. Leave it and list it.

### B.7 Video slots and poster files

Rule 0.5: replace each video file with IMG-14, same file name and type, no sound, 10 seconds, looping, under 3 MB, H.264. Every clip is built with `ffmpeg` (recipe in B.9). All videos are decorative (`aria-hidden`), so they have no alt text and no caption.

Many files are stored with non-square pixels, so the "Stored" size is not what the browser shows. Make the new file with square pixels (SAR 1:1) at the size in the Output column. If the file would be over 3 MB, lower the size or raise the CRF, and report it. Rendered boxes are in px.

None of the 13 video files is done. One clip in 13 slots breaks the reuse rule again, and every still image is already at its limit. Make four clip variants and rotate them. V-A is the clip in 6.5 (IMG-01 to IMG-02 and back). V-B fades IMG-03 and IMG-04. V-C fades IMG-05 and IMG-10. V-D fades IMG-09 and IMG-02. Pan in a different direction in each slot. Each variant lands in 3 slots, which is OVER the limit, so report it. All source pictures now exist in `generated-images/` except the IMG-09 redo, so V-D may use the old IMG-09 file only until the redo is saved. Make the videos last, after the IMG-09 redo.

| ID | Slot | File (under public/assets/) | Stored size, pixel shape | Browser shows | Length, size | Rendered box | Output | Variant | Poster (file under public/assets/, size) |
|---|---|---|---|---|---|---|---|---|---|
| V1 | Home hero film, desktop (min-width 768 px) | home/WAABI_27s_2K_antinomy_export_250823.mp4 | 1920x1080, pixels 16:15 | 2048x1080 | 27.2 s, 16.9 MB | 1280x800, cover | 1920x1080, 10 s | V-A | `home/WAABI_27s_2K_antinomy_export_250823.mp4.jpg`, 960x540. Used for desktop and for mobile. |
| V2 | Home hero film, mobile | home/Hero_27Sec_responsive.mp4 | 1080x1080, pixels 9:16 | 1080x1920 | 27.2 s, 8.3 MB | 390x844, cover | 1080x1920, 10 s | V-A, portrait crop | none of its own (mobile uses the desktop poster) |
| V3 | Home road collage tile 12 | home/Scenario_3_4k_FINAL.mp4 | 720x480, pixels 32:27 | 853x480 | 16.7 s, 0.9 MB | 118x118 square, cover | 854x480, 10 s | V-B | `home/Scenario_3_4k_FINAL.mp4.jpg`, 960x640 |
| V4 | Home road collage tile 13 | home/Sim_demo_scenario_4_slow_camera-SUDDEN_BRAKE_FINAL.mp4 | 720x480, pixels 32:27 | 853x480 | 11.1 s, 0.9 MB, has audio | 118x118 square, cover | 854x480, 10 s | V-C | `home/Sim_demo_scenario_4_slow_camera-SUDDEN_BRAKE_FINAL.mp4.jpg`, 960x640 |
| V5 | Home road collage tile 14 | home/Sim_construction_camera_slow_trimmed_w_actors_FINAL.mp4 | 720x480, pixels 32:27 | 853x480 | 10.1 s, 0.7 MB, has audio | 118x118 square, cover | 854x480, 10 s | V-D | `home/Sim_construction_camera_slow_trimmed_w_actors_FINAL.mp4.jpg`, 960x640 |
| V6 | Home road collage tile 15 | home/Scenario_1_4k_FINAL.mp4 | 720x480, pixels 32:27 | 853x480 | 16.7 s, 0.8 MB | 118x118 square, cover | 854x480, 10 s | V-A | `home/Scenario_1_4k_FINAL.mp4.jpg`, 960x640 |
| V7 | Home scale stack, panel 1 (active first) | home/scene_1_v2_HD_FINAL.mp4 | 720x720, square | 720x720 | 16.1 s, 5.5 MB | 527x527 desktop, 310x310 mobile | 720x720, 10 s | V-B | `home/scene_1_v2_HD_FINAL.mp4.jpg`, 960x960 |
| V8 | Home scale stack, panel 2 | home/Scalable.mp4 | 2160x2160, square | 2160x2160 | 15.2 s, 29.5 MB | same as V7 | 1080x1080, 10 s (lowered to stay under 3 MB; report) | V-C | `home/Scalable.mp4.jpg`, 960x960 |
| V9 | Home scale stack, panel 3 | home/scene_3_v5_HD_FINAL-small.mp4 | 1920x1080, pixels 9:16 | 1920x1920 | 11.0 s, 8.0 MB | same as V7 | 1080x1080, 10 s (report) | V-D | `home/scene_3_v5_HD_FINAL-small.mp4.jpg`, 960x540 (the poster is not square; cover crops it, keep its size) |
| V10 | Home tech card 1 | home/intersection-trimmed.mp4 | 1920x1080, pixels 1:1 | 1920x1080 | 10.0 s, 7.3 MB | 395x620 desktop, 342x215 mobile | 1280x720, 10 s (report) | V-A | `home/intersection-trimmed.mp4.jpg`, 960x540 |
| V11 | Home tech card 2 | home/Crash_variant_1.mp4 | 1920x1080 | 1920x1080 | 10.0 s, 4.4 MB | same as V10 | 1280x720, 10 s (report) | V-B | `home/Crash_variant_1.mp4.jpg`, 960x540 |
| V12 | Home tech card 3 | home/Copy_of_Copy_of_Full_Video_-_Solution_Ready_Blog-VEED__1_.mp4 | 720x720, square | 720x720 | 11.8 s, 7.4 MB | same as V10 | 720x720, 10 s | V-C | `home/Copy_of_Copy_of_Full_Video_-_Solution_Ready_Blog-VEED__1_.mp4.jpg`, 960x960 |
| V13 | Footer video (every page; hidden when the visitor prefers reduced motion) | Waabi_System_LightTunnel_1.mp4 (in public/assets/ itself) | 1920x1080, pixels 3:4 | 1920x1440 | 13.4 s, 1.1 MB, has audio | 1280x600 desktop, 390x674 mobile, `object-fit: fill` (the picture is stretched) | 1280x960, 10 s | V-D | none. The unused copy in `home/` and its `.jpg` are leftovers (A.8). |

**Posters.** Each poster shows before the video plays and for visitors who prefer reduced motion, so the old photo would show if you leave it. For every video with a poster, overwrite the poster with the first frame of the new clip, same file name, JPG, same pixel size as the old poster, cropped to that size. Command: `ffmpeg -y -i NEW.mp4 -frames:v 1 -vf "scale=W:H:force_original_aspect_ratio=increase,crop=W:H" -q:v 3 NAME.mp4.jpg`.

If you cannot make a video, rule 0.5 applies: keep the element and the file, and list the slot in the report. Do not leave an old Waabi video without reporting it.

### B.8 Reuse budget

| Image | File status | Placed now (DONE) | Still planned | Total | OVER |
|---|---|---|---|---|---|
| IMG-01 | saved, placed | 2 | 0 | 2 | 0 |
| IMG-02 | saved, placed | 2 | 8 | 10 | 8 |
| IMG-03 | saved (4:3), placed | 2 | 8 | 10 | 8 |
| IMG-04 | saved (4:3), placed | 2 | 7 | 9 | 7 |
| IMG-05 | saved, placed | 2 | 0 | 2 | 0 |
| IMG-09 | saved with emblem, placed, redo pending | 2 | 0 | 2 | 0 |
| IMG-10 | saved (4:3), placed | 2 | 7 | 9 | 7 |
| IMG-06 | drawn, placed once | 1 | 3 | 4 | 2 |
| IMG-07 | drawn, placed once | 1 | 4 | 5 | 3 |
| IMG-08 | drawn, placed twice | 2 | 4 | 6 | 4 |

Slots marked OVER (all to do): H4, H5, H6, H7, HC, HT0, HT1, HT2, HT3, HT4, HT6, HT7, HT8, HT9, HT10, HT11, H16, H17, H18, H19, S3, S7, S10, S11, C3, K1, K5, K6, K7, M1, M3, I1, I2, I3, I4, I6, I7, I8, I9.

The 10 team monogram slots are inside the limit (each of the six letters is used once or twice). The 15 logo tiles, the 4 Home circle tiles and the 2 wordmarks are text and are not counted.

### B.9 Recipes

**Fit a picture to a slot (Pillow).** Save this as a script outside the project. It crops around a centre point, resizes and saves by file type.

```python
from PIL import Image
import sys
def fit(src, out, w, h, cx=0.5, cy=0.5, zoom=1.0, q=82):
    """Crop src to the ratio w:h around (cx, cy) (0 to 1), zoom >= 1 crops tighter, resize to w x h, save by file type of out."""
    im = Image.open(src).convert("RGB")
    sw, sh = im.size
    cw, ch = (sh * w / h, sh) if sw / sh > w / h else (sw, sw * h / w)
    cw, ch = cw / zoom, ch / zoom
    x0 = min(max(cx * sw - cw / 2, 0), sw - cw)
    y0 = min(max(cy * sh - ch / 2, 0), sh - ch)
    im = im.crop((round(x0), round(y0), round(x0 + cw), round(y0 + ch))).resize((w, h), Image.LANCZOS)
    ext = out.lower().rsplit(".", 1)[-1]
    if ext == "webp": im.save(out, "WEBP", quality=q, method=6)
    elif ext in ("jpg", "jpeg"): im.save(out, "JPEG", quality=88, optimize=True)
    else: im.save(out, "PNG", optimize=True)
# example: python3 -c "import fit; fit.fit('IMG-01_16x9.png', 'out.webp', 2000, 1250, 0.5, 0.55, 1.2)"
```

Use zoom 1.3 to 2.5 for a different crop of an image that is already used in a slot. For a 4:3 Gemini picture that must fill a 3:2 slot, crop to 3:2 first (width 3, height 2) and keep the subject centred.

**Drawn images (IMG-06, 07, 08, 11, 12).** Draw them as SVG or with Pillow, never with an image model. Colours: accent `#ff2f7d`, dark grey `#232222`, off-white `#e9e7e4`. No gradients and no text, except the letters of IMG-11 and IMG-12 and the short words on the name tiles in B.4. Rasterise SVG to WebP with Pillow after converting (for example with `rsvg-convert` or `cairosvg` if installed). IMG-07 is a 21:9 strip of five icons. For small tiles, crop one icon at a time to a square or to 4:3.

**Clip (IMG-14).** This script was tested with `ffmpeg`. It fades A to B to A with a slow sideways pan, 9.6 s, no sound. Save it as `mkclip.sh` outside the project and run `./mkclip.sh IMG-01.png IMG-02.png 1920 1080 out.mp4`. Reverse the pan or change the start by editing the sine in the crop line.

```sh
#!/bin/zsh
# usage: mkclip.sh A.png B.png W H out.mp4 [pan: l|r]
A=$1; B=$2; W=$3; H=$4; OUT=$5; PAN=${6:-l}
S=$(( (W>H ? W : H) * 13 / 10 ))   # work size, 30% larger than the slot so a pan has room
ffmpeg -v error -y -loop 1 -framerate 25 -t 4.2 -i "$A" -loop 1 -framerate 25 -t 4.2 -i "$B" -loop 1 -framerate 25 -t 4.2 -i "$A" -filter_complex \
"[0:v]scale=$((W*13/10)):$((H*13/10)):force_original_aspect_ratio=increase,crop=$((W*13/10)):$((H*13/10)),setsar=1[a];\
[1:v]scale=$((W*13/10)):$((H*13/10)):force_original_aspect_ratio=increase,crop=$((W*13/10)):$((H*13/10)),setsar=1[b];\
[2:v]scale=$((W*13/10)):$((H*13/10)):force_original_aspect_ratio=increase,crop=$((W*13/10)):$((H*13/10)),setsar=1[c];\
[a][b]xfade=transition=fade:duration=1.5:offset=2.7[ab];[ab][c]xfade=transition=fade:duration=1.5:offset=5.4[abc];\
[abc]crop=$W:$H:x='(iw-$W)*(0.5+0.5*sin(2*PI*t/9.6))':y='(ih-$H)/2',format=yuv420p[v]" \
-map "[v]" -an -c:v libx264 -crf 29 -preset slow -movflags +faststart "$OUT"
```

If the file is over 3 MB, raise `-crf` from 29 to 32 or lower the size. Check the result with `ffprobe -v error -show_entries stream=width,height,duration,sample_aspect_ratio -of csv=p=0 out.mp4`; the pixel shape must be 1:1.

---

## PART 0. Rules (read first)

At this stage only the rules about images, alt text, captions, video, logos, maps and the four allowed changes apply. The text slots are already filled. Do not re-fill or re-word them.

### 0.1 Hard rules
1. Do NOT change the layout, UI, theme, colours, fonts, spacing, animations, components, sections, navigation structure, or any code that controls them.
2. Do NOT add, delete, move, merge or reorder sections, cards, columns, buttons, links, menu items, form fields or images. If a page has N slots, fill N slots.
3. You may only do four things. (a) Replace visible text. (b) Replace page titles and meta descriptions. (c) Replace image or video files and their alt text inside existing slots. (d) Change link text and link targets inside existing links.
4. Edit only text strings, image paths, alt text, link href values and meta values. Do not change keys, tags, class names, props, CSS, file names or routes. Text may live in JSON, MDX or component files: change the string only. If text does not fit, shorten the text. Never change CSS.
5. If a task cannot be done without breaking rule 1 or 2, leave that element as it is and list it in your final report.
6. Items written as "TEAM TO ADD: ..." are open items for the team. Put them on the site exactly as written, on the same line as the text before them, in the same style. Do not guess or fill them. After the build, search the site for "TEAM TO ADD" and list every hit with its page.
7. Do not invent facts, numbers, names, dates, quotes or sources. Use only what is in this brief.
8. The shared header, footer, menu and meta tags count as part of the four pages. Do not edit any other page or file. If another file holds an old name (404 page, sitemap, manifest, package name), leave it and list it in the report.
9. Never write that the shelter is staffed. Never write that the shelter is built, open, approved, tested or endorsed. This site is a student proposal. Keep every "would", "should", "plans" and "proposes".

### 0.2 How to match content to slots
- List the text slots on each page from top to bottom. Fill them with the blocks in this brief, in order. If there are fewer slots than blocks, fill in order, then list every unused block in the report. Never add a section. Never join blocks unless the slot is a long rich-text area. If you must drop blocks, drop these last: H-13, C-04, C-08, S-04, S-05, D-03, D-04, D-07.
- Page roles: HOME = overview and executive summary. COMPANY = background, team, problem and criteria. SAFETY = the solution. CAREERS = delivery, cost, references and appendices. Follow these roles even though the old page names differ.
- Block IDs (H-01) and bold block names are for you only. Do not put IDs on the site. Where a heading slot has no heading in the brief, use the bold block name as the heading.
- Menu and footer labels are text, so you may rename them: Home = "Overview", Safety = "Solution", Company = "Project", Careers = "Delivery". If there are fewer than four links, use the labels in order from the left. Do not rename files or routes.
- Blocks with LONG and SHORT: use LONG in body slots and SHORT in headings, labels, buttons, tabs and tags. Blocks with one version: use all of it in a body slot. For a small slot, use the bold block name or the first sentence. Never cut a number, name, citation or the Acknowledgement of Country. If text still does not fit, cut whole trailing sentences and report it.
- Grid with fewer slots than items: keep the first items in order. Exception: never drop a team member or a design criterion. Put the leftover team names in the last team slot, separated by commas, and report it. Grid with more slots: take items from the matching pool. Title plus sentence cards = 6.1. Steps or stages = 6.2. Name tiles = 6.3. Paragraphs = 6.4. Stat cards = H-10 first, then "8 weeks / build time", "4 hours / training for each Ranger", "6 months / approval time". Team grid with extra slots = 6.3 tiles. If a pool runs out, start it again at item 1 and report it.
- Tables (S-04 matrix, D-04 Tables 1 and 2, S-07 tests): if the page has a table component, fill it row by row. If it does not, do not add one. Write each row as one line in a long text slot: "Column: value. Column: value." If no long slot exists, list the table in the report as not placed.
- Number forms. Exact figures ($87,386.65 and $86,648.81) only in Table 1 and the two lines under it. Rounded figures ($87,400 and $86,650) in summaries, stat cards, cards and buttons. $87,387 only in the payback paragraph. Copy every other number, dollar amount, duration and name exactly from Part 1.

### 0.3 Voice
Third person, plain Australian English, short sentences, no slang, no hype, no em dashes or en dashes. Exception: keep "We acknowledge" in H-13. Keep every in-text citation exactly as written and visible. Spell out on first use on each page: personal locator beacon (PLB), ultra high frequency (UHF) radio. Write "24 square metres" in headings and body text.

### 0.4 Names, culture and images
- Always write "Lama Lama Country", "Lama Lama people", "Traditional Owners" (capital T and O), "Lama Lama Rangers", "Yintjingga Aboriginal Corporation (YAC)". Never write "Lama Lama County". When writing about Aboriginal and Torres Strait Islander peoples in general, use those full words.
- Name restricted places only as written in this brief. Show no coordinates, map pins, routes or directions to them. Do not describe their cultural meaning.
- No images of Aboriginal or Torres Strait Islander people, art, flags, ceremony, sacred places or cultural objects. Do not imitate Aboriginal art styles.
- Photo-style concept images (IMG-01 to IMG-05, IMG-09, IMG-10): no people, no readable text, no real logos, no brand names. If the slot already has a caption, write "Concept image made with Gemini (4 Argon), 2026. Not a photograph. Not the real site." If the slot has no caption, do not add one. Start the alt text with "Concept image:". The tool is Gemini, model 4 Argon, thinking level High. Name another tool only if another tool made the image. Drawn items (IMG-06, 07, 08, 11, 12) need no caption.
- Every image needs alt text of one plain sentence, 8 to 20 words, saying what the image shows. Alt text must never state results or claims, and must never say the design survives, stops or prevents floods.
- Replace, never delete. Overwrite the text of every old-site trace (company, product and people names, investors, partners, events, job titles, email addresses, social handles, legal lines) with the nearest text from this brief. Legal or copyright line: "Provisions Point. EWB Challenge 2026 student proposal." Check visible text, alt text, page titles, meta tags and link text. List each one in the report.

### 0.5 Special elements
- Links: keep each link. Set its text from this brief. Point it to the best matching page of the four, or to a URL in Part 7.
- Email links: long slot text is "Questions about this proposal: TEAM TO ADD: contact route". Short slot text is "Ask a question". Point the link to the Overview page. No email address may appear anywhere on the site.
- Social icon with no text: keep it and point its link to the Overview page.
- Logo or wordmark: if it is text, replace it with "Provisions Point". If it is an image or SVG, replace the file with IMG-12 (same file name, type, size and ratio). Do not change the element.
- Partner or investor logo walls: use plain text tiles with the names in 6.3. Label the wall "Organisations and sources in this proposal". Never use the word "partner" for any of them.
- People, team and portrait slots: use the team names in C-04 with monogram tiles (IMG-11). No faces. Name slot = name. Role slot = the text after the bar in C-04. Any other text slot on a person card (bio, social, email) = "Team member". Do not write a bio.
- Job, event or news cards: use 6.2 in order. Title = "Stage N: name". Detail line = the text after the name. Tag or location slots = "Project stage". Apply or read-more button = "See the plan", linked to the Delivery page. No dates. Use D-03 for any process or steps section, and 6.2 only for job, event or news lists.
- Maps: if the map is an image, replace the file with IMG-08. If it is an embedded or interactive map, do not change it. List it in the report with the place it shows.
- Video: if the slot is a video file, replace it with IMG-14 (same file name, type and pixel size, under 3 MB). If it is an embed, or you cannot make IMG-14, keep the element, set its poster to IMG-01 if it has a poster, and list it in the report. Part B.7 lists every video slot, its poster file and the clip variants.
- Forms: keep the form. Set labels, placeholders and the button to: Name, Email, Your question, Send. If a field has another purpose, use the nearest of these. Do not change form code. If the form sends data to an outside address, leave it and list the address in the report.

### 0.6 Checks before you finish
Run the build and lint. Search the site files for the old company name, "lorem", "@", "TODO", and the characters for an em dash and an en dash. Check each page at 375, 768 and 1280 px for new overflow. Fix text only. Add the results to the report.

### 0.7 Final report
Reply with a list. 1 Slots filled per page. 2 Slots left alone, and why. 3 Text you shortened. 4 Every "TEAM TO ADD" location with its page. 5 For every image: slot, tool (Gemini, model 4 Argon, thinking level High, or the code used for a drawn item), prompt, caption, alt text. 6 Blocks not placed. 7 Every slot marked OVER in Part B, and the final use count of each image. Do not mention this brief on the website.

---

## PART 1. Facts sheet (single source of truth)

| Item | Value |
|---|---|
| Project name | Provisions Point |
| Place | Warokutal (Safari Camp), Port Stewart, Lama Lama Country, Cape York Peninsula, Queensland |
| Client | Yintjingga Aboriginal Corporation (YAC) |
| Opportunity | EWB Challenge Design Opportunity 2.1, Resilient visitor infrastructure |
| Building | 24 square metre shelter on reinforced concrete piles, watertight concrete walls, corrugated roof sheeting (material to be confirmed by an engineer) |
| Floor height | 2 m above the ground. This is a planning figure. Never write it as a tested or proven flood height. |
| Staffing | Unstaffed self-service. No one works at the shelter. Rangers visit to restock and inspect. |
| Inside | Shelves, counter, solar panel and battery |
| Stock | Drinking water, non-perishable food, firewood, safety information |
| Hire items | 2 recovery kits. Each kit is hired with 1 PLB and 1 UHF radio. |
| One recovery kit | Traction boards, tyre deflation hose, 12 V compressor, shackles and strap. About $679. A PLB (about $440) and a UHF radio (about $259) are hired with it. Full set about $1,378. |
| Open season | July to November, about 22 weeks. Park closed 1 December to 30 June |
| Visitors a year | 110 low, 220 base, 440 high. Base is 10 a week for 22 weeks |
| Kit hires a year | 18 low, 44 base, 70 high. Hire price $200 per week (team assumption) |
| Build and equipment cost with 20% contingency | $86,648.81 |
| Opening stock | $737.84 |
| Total cost | $87,386.65 (about $87,400), all amounts in Australian dollars (AUD) |
| Running cost | About $3,950 a year in the base case (low $2,630, high $6,590). Restocking is about $2,500 of this. |
| Grant to request | About $86,650 |
| Approval time | About 6 months |
| Build | 4 workers, about 8 weeks, in the dry season |
| Training | 4 hours per Ranger |
| Operation | Rangers restock weekly, July to November |
| Maintenance | 2 Rangers, 2 checks a year, before and after the wet season |
| End of life | 4 workers, 1 to 2 weeks |
| Decision matrix | Ratings 1 to 5, weights 3 to 5, maximum score 165 |

---

## PART 2. HOME page (overview and executive summary)

**H-01 Page title and meta description**
Title: Provisions Point | Resilient visitor infrastructure for Lama Lama Country
Meta: A proposed flood-resilient supply and recovery shelter at Warokutal (Safari Camp), Lama Lama Country, proposed to the Yintjingga Aboriginal Corporation. EWB Challenge 2026.

**H-02 Main heading**
LONG: Planned supplies and safety at Warokutal, above the floodwater.
SHORT: Provisions Point

**H-03 Snapshot line**
LONG: A proposed flood-resilient supply and recovery shelter at Warokutal (Safari Camp), Lama Lama Country, Cape York Peninsula, Queensland.
SHORT: A proposed supply and recovery shelter for Lama Lama Country.

**H-04 Label line**
EWB Challenge 2026 | Design Opportunity 2.1

**H-05 Design area and keywords**
Design Area: TEAM TO ADD: design area number and name (check it matches Design Opportunity 2.1)
Design Opportunity: 2.1 Resilient visitor infrastructure
Keywords: flood resilience, visitor safety, vehicle recovery, remote tourism, Warokutal, Lama Lama Country, Cape York, self-funding running costs, cultural protocols

**H-06 Proposal summary**
The project aims to give visitors to Warokutal (Safari Camp) access to water, supplies and vehicle recovery equipment when floods damage the roads. It proposes an elevated, low-maintenance shelter that stocks essentials and hires out recovery kits, personal locator beacons (PLBs) and ultra high frequency (UHF) radios. A one-off grant would pay for the build, and sales and hire fees would pay for running costs. The design is a student proposal for the Yintjingga Aboriginal Corporation to review and change.

**H-07 Overview of design**
Provisions Point would improve visitor safety by raising a small supply shelter above the ground and filling it with what a stranded visitor needs. The 24 square metre building would stand on reinforced concrete piles, with the floor 2 m above the ground (a planning figure), watertight concrete walls and a corrugated roof. Its delivery needs YAC approval, a dry-season build and a 4-hour training session for Lama Lama Rangers. Rangers would restock it weekly from July to November and inspect it twice a year. Campers, fishers and boaters could buy water and food, or hire gear when a vehicle is stuck.

The design includes:
- An elevated shelter with piles, concrete walls and a corrugated roof
- Shelves, a counter, a solar panel and a battery
- Drinking water, non-perishable food, firewood and safety information
- Two hireable recovery kits (traction boards, tyre deflation hose, 12 V compressor, shackles and strap)
- Two PLBs and two UHF radios, hired with the kits

Who would use it: campers, fishers, boaters and bird watchers who visit Warokutal in the open season, and the Lama Lama Rangers who would look after it.

**H-08 Key considerations**
- Materials are priced from Australian averages. Freight to Cape York may cost more, so the budget holds a 20% contingency.
- Maintenance is light: one restock visit a week in the open season and two inspections a year. Ranger time is not costed and needs YAC agreement.
- Delivery would take about 6 months of approval and an 8-week dry-season build.
- The 2 m floor height is a planning figure. It must be checked against flood data for the site.
- Ground disturbance must be cleared with Traditional Owners before any piles are drilled.
- Visitor numbers and revenue are estimates (10 visitors a week for 22 weeks).
- Next steps: co-design with YAC, a site survey, engineering design, and checks on beacon hire rules and radio coverage.

**H-09 Materials and cost summary**
- Purchased materials: reinforced concrete piles and structure, watertight concrete, corrugated roofing, shelving and counter, solar panel and battery, 2 recovery kits, 2 PLBs, 2 UHF radios.
- Other materials: drinking water (240 L), canned food (120 cans), firewood (8 bags of 20 kg), safety flyers.
- Estimated total cost: about $87,400 AUD, including a 20% contingency. Running cost is about $3,950 AUD a year in the base case.

**H-10 Key numbers (stat cards, use up to 5 in this order)**
1. 2 m | planned floor height above the ground (to be confirmed)
2. 22 weeks | open season, July to November
3. 220 | visitors a year in the base case
4. $87,400 | estimated build and stock cost (AUD)
5. $3,950 | running cost a year in the base case (AUD)

**H-11 Project details**
Heading: Why this project matters
Context: Warokutal is a campground at Port Stewart in Lama Lama Country. Wet-season floods can damage the roads and other infrastructure (Engineers Without Borders Australia, 2024). Visitors are far from services, so a stuck vehicle can become an emergency. The Lama Lama Rangers manage tourism and carry out repairs (Reardon-Smith, 2023). Their time is limited.
Design opportunity: The team chose Design Opportunity 2.1, Resilient visitor infrastructure. It asks for resilient infrastructure at a specific visitor destination in Lama Lama Country (Engineers Without Borders Australia, 2024).
Needs statement: Visitors to Warokutal need dependable access to water, supplies, recovery equipment and safety information when roads are damaged and help is far away.
How might we: How might we make a Lama Lama Country campground safer for visitors and more resilient to floods? The answer must cost little to build, add little work for Rangers, and protect cultural and ecological values.

**H-12 Cover details**
Group name: FATZCC
Tutorial number and tutor: TEAM TO ADD: tutorial number and full tutor name
Prepared for: Yintjingga Aboriginal Corporation and EWB Challenge assessors

**H-13 Acknowledgement of Country**
Heading: Acknowledgement of Country
Text: We acknowledge the Gadigal people, the Boorooberongal people of the Dharug Nation, the Bidiagal people and the Gamaygal people, upon whose ancestral lands our university stands. We also acknowledge the Lama Lama people, the Traditional Owners of the Country this project is about. We pay respect to Elders past and present, as the traditional custodians of knowledge for these lands. This is a student proposal. It is for the Yintjingga Aboriginal Corporation to accept, change or reject. TEAM TO ADD: confirm this wording against the current UTS Acknowledgement of Country.

**H-14 Closing block**
Heading: Built with Lama Lama Country in mind
LONG: Explore the problem, the solution and the plan to deliver it.
Buttons (SHORT): See the solution | Read the background | View the plan
Contact line: Questions about this proposal: TEAM TO ADD: contact route

---

## PART 3. COMPANY page (project background, team, problem, criteria)

**C-01 Page title and meta description**
Title: The project and the team | Provisions Point
Meta: Background, problem and design criteria for a proposed flood-resilient supply and recovery shelter at Warokutal, Lama Lama Country.

**C-02 Main heading**
LONG: A remote place with one road and a short open season.
SHORT: The project

**C-03 Intro paragraphs**
1. Lama Lama Country on Cape York is remote, flood-prone and visited mostly by small, self-reliant groups. This page sets out what the team learned before it designed anything.
2. The six-person team studied the climate, existing infrastructure, visitors, tourism economy, cultural values and ecology of the area.

**C-04 Team (6 items, name | role)**
- Pinhong | Climate and flooding research. Prototype.
- Darrell | Existing infrastructure and safety. Design opportunity. Life cycle. Revenue and cost.
- Tasneef | Visitor groups and experience. Decision matrix. Ideas and design options.
- Isaac | Tourism economy and maintenance. Current practice. Slide design.
- Jude | Cultural values and protocols.
- Qijun | Ecological and environmental values. Cost justification.
Group declaration: Each member contributed as listed above and reviewed the final website. TEAM TO ADD: the website sections each member wrote or edited, and a declaration of each member's contribution.

**C-05 Background (6 cards, in this order)**
1. Climate and flooding. Heavy rain can flood roads and low ground across northern Cape York (Testa, 2026). The Lama Lama Rangers carry out infrastructure repairs (Reardon-Smith, 2023). Flood damage can therefore last after the water has gone.
2. Existing infrastructure and safety. There are two campgrounds, Warokutal at Port Stewart and Maramba at Silver Plains, three boat ramps and one staffed information point, the Lama Lama Ranger Base. A single road joins Port Stewart to Coen (Cook Shire Council, 2026; Engineers Without Borders Australia, n.d.).
3. Visitors and experience. Visitors come for bird watching, boating, fishing, camping and guided tours. The dry season brings most of them. The park is closed from 1 December to 30 June. The open season runs from July to November (Department of the Environment, Tourism, Science and Innovation [DETSI], 2024b). TEAM TO ADD: confirm the park closure dates apply to Warokutal.
4. Tourism economy and maintenance. Rangers manage tourism and carry out infrastructure repairs (Reardon-Smith, 2023). YAC earns income from tourism and from the YM2 cattle enterprise (Yintjingga Aboriginal Corporation [YAC], n.d.). Ranger time is limited, so new infrastructure must not add much work.
5. Cultural values and protocols. The Lama Lama people are the Traditional Owners. The Alingina Wungku Living Area is closed to visitors to protect cultural resources (YAC, n.d.). Entry to areas of high cultural or environmental value is limited to Traditional Owners or permit holders (Queensland Parks and Wildlife Service [QPWS], 2013).
6. Ecological and environmental values. Infrastructure is banned in the Alingina Wungku Living Area, the Goose Swamp and the Bull Swamp area, and no camping development is allowed inside the national park (QPWS, 2013). Camping stays outside the park at Warokutal and Maramba (DETSI, 2024a).

**C-06 What is done now, and why it is not enough**
Heading: What is already done
Current practice is simple. Visitors check road conditions on the Cook Shire Council website before they travel (Cook Shire Council, 2026). They bring their own recovery equipment, because there is no alternative. The Ranger Base at Port Stewart is the one staffed safety point named for the area.
Heading: Why it is not enough
A visitor whose vehicle is stuck, or whose supplies run low, has no nearby source of equipment, water or safety information. Rangers cannot cover every site. The team wants a simple, flood-resistant supply point at Warokutal.

**C-07 Problem description**
Heading: The problem
User needs statement: Visitors to Warokutal need dependable access to water, supplies, recovery equipment and safety information when roads are damaged and help is far away.
Paragraph: At present, a visitor who is stranded depends on their own kit and on luck. Rangers are few and the road is the only link out. The ideal situation is a place at Warokutal that stays usable through floods. It gives visitors what they need to recover or call for help. It earns enough to pay for itself. It respects Traditional Owner protocols and the natural setting.
Scope: The project covers one site, Warokutal, and one open season a year. It does not cover the roads, the other campground, the boat ramps or any change to Ranger staffing.

**C-08 Design criteria (8 cards, in this order; each has a name, description and reason)**
1. Safety and access. The design must lower the risk of vehicles becoming stranded and help visitors recover or call for help. It must reduce reliance on Rangers. Reason: visitors rely on one road, and Rangers run the one staffed safety point.
2. Flood resilience. The building and its stock must survive wet-season flooding with little repair. Reason: floods can damage roads and infrastructure, and Rangers carry out the repairs.
3. Visitor support and comfort. Visitors can get water, food, firewood and safety information near the campground. Reason: stays are remote and long, so basic supplies cut risk and improve the visit.
4. Feasibility and maintenance. The design uses tough, durable materials and needs close to zero wet-season maintenance. Reason: Ranger time is limited.
5. Culture and Country. The design respects Traditional Owner protocols, keeps visitors away from restricted places and disturbs little land, water or wildlife. Reason: the Lama Lama people are the Traditional Owners, and some areas ban infrastructure (QPWS, 2013).
6. Community fit. The design suits the small, self-reliant visitors at Port Stewart, such as campers and fishers, and not mass tourism. Reason: the place and its visitors are small scale.
7. Low cost. The design is affordable to build and run. Reason: YAC has limited income from tourism and cattle (YAC, n.d.).
8. Revenue. The design earns enough to cover its running costs. Reason: a site that pays its own running costs avoids new demands on Ranger budgets.
Note: TEAM TO ADD: confirm the criteria. The team's slides list six requirements. Flood resilience, visitor support and revenue are added from the decision matrix.

---

## PART 4. SAFETY page (the solution)

**S-01 Page title and meta description**
Title: The solution | Provisions Point
Meta: Three design options, the decision matrix, the detailed design and the prototype for a proposed flood-resilient supply and recovery shelter at Warokutal.

**S-02 Main heading**
LONG: Raising supplies and safety above the flood.
SHORT: The solution

**S-03 Design options (3 cards)**
Intro: The team developed four ideas and scored them against the eight criteria. The three highest scoring ideas are the design options below.
- Option A: Provisions Point. A raised supply and equipment-hire shelter at Warokutal. It stocks water, food, firewood and safety information, and hires out recovery kits, PLBs and UHF radios. TEAM TO ADD: source for this type of remote supply point.
- Option B: Distributed emergency checkpoints. Several small emergency points placed along the access route, each holding basic supplies and a radio. TEAM TO ADD: source for roadside emergency points, and confirm this description.
- Option C: Elevated tent-site platform. Raised camping platforms that keep campers above floodwater. TEAM TO ADD: source for elevated camp platforms, and confirm this description.
- Screened out: a solar-powered river crossing status beacon scored lowest (91 out of 165). It would warn drivers. TEAM TO ADD: confirm this description.

**S-04 Design selection**
Heading: How the team chose
Method: Each idea was rated from 1 (poor) to 5 (best) against the eight criteria. Each criterion has a weight from 3 to 5, where 5 matters most. Weighted score is rating times weight. The maximum score is 165.
Table (weights in brackets):

| Idea | Culture and Country (3) | Low cost (4) | Visitor support (5) | Feasibility (5) | Safety and access (4) | Community fit (4) | Flood resilience (5) | Revenue (3) | Total | Rank |
|---|---|---|---|---|---|---|---|---|---|---|
| A Provisions Point | 5 | 3 | 4 | 3 | 5 | 4 | 3 | 5 | 128 | 1 |
| B Distributed checkpoints | 4 | 3 | 3 | 3 | 4 | 4 | 3 | 1 | 104 | 2 |
| C Tent-site platform | 3 | 4 | 2 | 2 | 3 | 3 | 4 | 2 | 95 | 3 |
| Screened out: crossing beacon | 3 | 4 | 1 | 3 | 4 | 3 | 3 | 1 | 91 | 4 |

Why the weights differ: Visitor support, feasibility and flood resilience carry weight 5, because a shelter that is unusable, impossible to build or flooded fails the brief. Culture and Country has weight 3 in the matrix, but it is also a condition for every option. No option would go ahead without Traditional Owner agreement.
Reading the scores:
- Option A scores 5 for culture, safety and revenue and 3 for low cost, feasibility and flood resilience. It scores 3 for flood resilience until the 2 m floor height is checked against flood data.
- Option B scores 3 for visitor support and 1 for revenue.
- Option C scores 4 for flood resilience, the highest of the four, and 2 for visitor support and feasibility.
TEAM TO ADD: confirm the reasons for each rating.
Decision: The team will develop Option A, Provisions Point, in detail.

**S-05 Detailed design**
Heading: How Provisions Point would work
What it is: A 24 square metre shelter at Warokutal, planned for ground that is already cleared and above flood level. A site survey must confirm this. It would stand on reinforced concrete piles (Menard Asia, 2025), with the floor planned 2 m above the ground. Walls would be watertight concrete (Leading Architecture, 2024) and the roof corrugated sheeting (material to be confirmed). Inside would be shelves, a counter, a solar panel and a battery. The shelter is unstaffed. Visitors serve themselves and pay by the method YAC sets.
Note on the 2 m height: this is a planning figure. An engineer must confirm it against local flood levels and wind loads.
Entry: TEAM TO ADD: confirm the entry type (stairs or ramp) so it matches the prototype.
Stock: drinking water, non-perishable food, firewood and safety information.
Hire items: traction boards for soft ground, a tyre deflation kit (Supercheap Auto, 2017), a 12 V compressor, and shackles with a recovery strap (Bober, 2025). Each kit also holds a personal locator beacon (PLB) and an ultra high frequency (UHF) radio. YAC sets the check-out and payment method. One option is a lockable kit cage with a code given at booking.

How a visitor would use it (4 steps):
1. Check road conditions on the Cook Shire Council website before travel (Cook Shire Council, 2026).
2. Arrive at Warokutal and read the safety information at the shelter.
3. Buy water, food or firewood, or hire a recovery kit if the vehicle is stuck.
4. In a life-threatening emergency, use the PLB. If radio coverage is confirmed, the UHF radio can reach the Rangers. Then return the kit.

Community concerns and responses (6 rows):
- Ground disturbance. The design uses a small number of drilled piles on cleared ground, not trench footings. No piles are drilled until Traditional Owners and heritage checks agree.
- Ranger workload. The routine would be one weekly restock in the open season and two inspections a year.
- Visitor numbers. The stock and kits suit small groups. The design is not for mass tourism.
- Theft or damage. The team proposes a lockable, raised building for the stock and kits.
- Fire and waste. Bagged firewood would be sold, and the team will check park rules with YAC and QPWS. A waste plan would be agreed with YAC.
- Cost. A grant would pay for the build. Sales and hire fees would pay for running costs.

**S-06 Why it addresses safety and access**
Heading: Why it should work
Safety and access: visitors could recover their own vehicles, call for help and get water close by. The Ranger Base is not the only point of help.
Flood resilience: the building is raised and made of concrete and steel, so it should need little upkeep after the wet season. An engineer must confirm this.
Culture and Country: one hub on cleared ground keeps foot traffic away from restricted sites, and the team proposes that YAC co-designs how it runs.

**S-07 Prototyping**
Heading: Prototype
What and why: The team built a 3D model in Blender to show what the shelter looks like inside and out. The tests below are planned and have not been run.
How built: The model shows the building on piles, the entry, the roof, and the interior shelves with water, canned food, firewood, safety flyers and PLBs. TEAM TO ADD: confirm whether medicines are stocked, because the Blender model includes them.
Picture: TEAM TO ADD: Blender screenshots of the prototype

Planned tests:

| Test | Method | Pass mark | Result |
|---|---|---|---|
| Flood clearance | Raise a water level in the model to 0.5, 1.0, 1.5 and 2.0 m | Floor and stock stay dry at 1.5 m | Pending. TEAM TO ADD: result |
| Stock fit | Place 2 kits, 240 L of water, 120 cans and 8 firewood bags on the shelves | All items fit and a walkway stays clear | Pending. TEAM TO ADD: result |
| Entry | Check entry slope or stair rise and door width | Easy entry with a loaded trolley | Pending. TEAM TO ADD: result |
| Walk-through | 3 to 5 people find an item and plan a kit hire from the model | Most find items in under 1 minute | Pending. TEAM TO ADD: result |

Changes made after testing: No changes yet. Tests are not complete. TEAM TO ADD: changes after testing.
Full test results: Appendix 4.

---

## PART 5. CAREERS page (delivery, cost, other considerations, recommendations, references, appendices)

**D-01 Page title and meta description**
Title: Delivering Provisions Point | Implementation and cost
Meta: Implementation plan, costs, funding, risks and recommendations for a proposed flood-resilient supply and recovery shelter at Warokutal.

**D-02 Main heading**
LONG: A plan YAC and the Lama Lama Rangers could carry out.
SHORT: Delivery

**D-03 Implementation plan (5 steps)**
1. Preparation. YAC approval would take about 6 months. The site, design and running plan are agreed with YAC and Traditional Owners. Cultural heritage checks come before any ground work.
2. Implementation. Four workers would build the shelter in the dry season in about 8 weeks, using a drill rig, steel and roof sheets. Each Ranger who will look after the site completes 4 hours of training.
3. Operation. The shelter would run during the open season, July to November (Department of the Environment, Tourism, Science and Innovation [DETSI], 2024b). Rangers restock it weekly.
4. Maintenance. Two Rangers carry out two checks a year, one before and one after the wet season.
5. End of life. Four workers remove the building in 1 to 2 weeks. Shelves and kits are reused. Steel and roof sheets are recycled.

Community, ownership and evaluation:
- Community role: the team proposes that YAC co-designs the site and the rules, and decides which of these steps go ahead. The team encourages YAC to consider local people for the build and training.
- Ownership: the team proposes that YAC owns the shelter, sets prices and decides stock. Income would help fund the Lama Lama Rangers.
- Evaluation: after each open season YAC and Rangers would review kit hires, visitor numbers, empty shelves, uses of the beacons and radios, and Ranger time. They would adjust stock and prices.
- Repairs: Rangers fix small faults at the weekly and twice-yearly visits. Larger repairs use local trades. YAC and Rangers should agree a repair budget.
- Future: if it works, the same model could be tried at Maramba.

**D-04 Cost analysis**
Heading: What it costs
Table 1. Build and stock cost (AUD)

| Item | Quantity and price | Total | Source |
|---|---|---|---|
| Frame, walls, roof | 24 m2 x $1,340 x 1.2 | $38,592.00 | Feasly (n.d.) |
| Pillars, decks, stairs | 1 | $20,000.00 | Estimate |
| Design documents (architect) | 10% of build | $5,859.20 | Estimate |
| Shelves, counter, solar, battery | 1 | $5,000.00 | Estimate |
| Traction boards (MAXTRAX MKII pair) | 2 x $249.99 | $499.98 | BuyWisely (n.d.-d) |
| Tyre deflation hose (MAXTRAX Indeflate) | 2 x $159.20 | $318.40 | BuyWisely (n.d.-c) |
| 12 V compressor | 2 x $99.99 | $199.98 | BuyWisely (n.d.-e) |
| 7-piece recovery kit (XTM) | 2 x $169.99 | $339.98 | BuyWisely (n.d.-f) |
| Personal locator beacon (PLB) (GME MT610G) | 2 x $439.90 | $879.80 | Down Under Pilot Shop (n.d.) |
| Ultra high frequency (UHF) radio (GME TX6160X) | 2 x $259.00 | $518.00 | BuyWisely (n.d.-a) |
| Contingency | 20% of capital | $14,441.47 | Estimate |
| Water | 240 L x $0.60 | $144.00 | Estimate |
| Canned food | 120 x $3.00 | $360.00 | Estimate |
| Firewood, 20 kg bags | 8 x $22.98 | $183.84 | BuyWisely (n.d.-b) |
| Safety flyers | 1 | $50.00 | Estimate |
| Total | | $87,386.65 | |

Build and equipment with contingency: $86,648.81. Opening stock: $737.84. The contingency is 20% of the capital cost of $72,207.34.

Lines marked Estimate are team allowances with no supplier quote. The three build lines marked Estimate (piles and stairs, design documents, shelves and solar) total $30,859.20, about 43% of the capital cost before contingency. They are the main cost uncertainty. The 1.2 factor on the frame line is an allowance for remote freight and site work. TEAM TO ADD: confirm what the 1.2 factor covers. The stock quantities are allowances sized for weekly restocking in a 22-week season. They are not measured demand. TEAM TO ADD: the basis for the stock quantities.

Running cost: about $3,950 a year in the base case for restocking and kit wear and replacement. The team estimates restocking at about $2,500 of this.

Table 2. Revenue and profit estimates (AUD)

| | Low | Base | High |
|---|---|---|---|
| Visitors a year | 110 | 220 | 440 |
| Kit hires a year ($200 per week) | 18 | 44 | 70 |
| Revenue a year | $4,540 | $8,950 | $17,900 |
| Running cost a year | $2,630 | $3,950 | $6,590 |
| Profit a year | $1,910 | $5,000 | $11,310 |
| Profit over 25 years | $47,750 | $125,000 | $282,750 |

The base case assumes 10 visitors a week for 22 weeks (Todio, n.d.). Revenue is the team's estimate of hire fees plus sales of water, food and firewood. TEAM TO ADD: the revenue workings for each case, and how the low and high running costs were worked out. Two kits can be hired for at most 44 kit-weeks in a 22-week season, so the high case of 70 hires needs shorter hires or more kits. Profit is before the build cost and before Ranger time, which is not costed.

Funding: The team proposes a one-off grant of about $86,650 for the build and equipment. Sales and hire fees would cover stock and running costs.
- Regional Tourism Infrastructure Fund (Queensland): build, design and equipment, up to $300,000 (DETSI, 2026). Eligibility must be confirmed.
- Indigenous Rangers Program (Australian Government): Ranger land care to 2028, which may help cover Ranger time (National Indigenous Australians Agency [NIAA], n.d.).
- Own income: stock and about $3,950 a year to run.

Without a grant, profit would repay the $87,387 build cost in about 46 years (low case), 17.5 years (base) or 7.7 years (high). In the low case, 25 years of profit does not cover the build. This is why the team proposes a grant for the build.

**D-05 Other considerations**
Heading: Other considerations
Stakeholders: YAC (owner and decision maker), Traditional Owners, the Lama Lama Rangers, visitors, Queensland Parks and Wildlife Service and Cook Shire Council. Not yet checked: land tenure and building approval, park rules for selling goods, personal locator beacon hire rules, and insurance and liability for hired equipment. YAC should advise on each.
Visitor journey (5 steps, with the main worry at each step): 1 Plan: check road conditions and park rules. Worry: will the road be open? 2 Arrive: read the safety information, buy supplies. Worry: are there enough supplies? 3 Stuck: hire a kit and recover the vehicle. Worry: cost and time. 4 Emergency: use the PLB, or the radio if coverage is confirmed. Worry: will help come? 5 Leave: return the kit and give feedback.
Ranger journey (3 steps): 1 Before the season: train and stock the shelter. 2 Each week: restock and check kits. 3 Twice a year: inspect before and after the wet season.
Community reaction: The team has not yet asked YAC or Traditional Owners for their views. TEAM TO ADD: confirm this sentence is true, or add feedback received. Likely concerns are ground disturbance, extra Ranger work, visitor behaviour, theft and fire. This proposal is based on public sources and the EWB Challenge brief. It still needs to be checked with YAC and Traditional Owners.
Wider issues: waste from packaging, weeds and pests carried in firewood (use commercial bagged wood and check park rules), fire risk, theft, and wildlife safety. Safety flyers should warn visitors about estuarine crocodiles and say that swimming is unsafe. TEAM TO ADD: citation for the official crocodile warning.

**D-06 Recommendations**
Heading: What should happen next
1. Co-design the building, site and rules with YAC and Traditional Owners before any ground work.
2. Complete a site survey and cultural heritage clearance for the exact location.
3. Get flood level data and an engineer's design for flood and wind loads. Confirm the roof material.
4. Confirm the rules for hiring out beacons with the Australian Maritime Safety Authority, and test UHF radio coverage between Warokutal and the Ranger Base. TEAM TO ADD: citation for the beacon rules.
5. Check grant eligibility and apply.
6. Agree Ranger workload and repair budget with YAC.
7. Run a one-season trial of kit hire from the Ranger Base to test demand before building.
Further research: visitor counts, local flood heights, hire demand and the price visitors will accept.

**D-07 References**
Use the list in Part 7, in the same order, with hanging indents if the slot allows.

**D-08 Appendices (use one block per slot; text only, do not create files or links)**
- Appendix 1: Group charter. TEAM TO ADD: attach the charter before submission.
- Appendix 2: Meeting minutes. TEAM TO ADD: attach the meeting minutes before submission.
- Appendix 3: Statement of AI use and prompt log. The team used generative AI in four ways. Claude (Anthropic, 2026) helped find and summarise public sources and prices, draft background and criteria text, build the cost and revenue calculations, and turn the team's slides and research into website text. Gemini (Google, 2026) made the concept images for the team's presentation. An AI image tool made the concept images on this site. An AI coding agent placed the text and images into the website. The team used AI to work faster, keep the site consistent and show the idea visually. The team chose the design, built the Blender prototype and checked figures and citations against sources. AI images are concept images, not photographs. This is a draft declaration. TEAM TO ADD: read and confirm every sentence, the exact tool names and versions, and screenshots of every prompt and output.
- Appendix 4: Full prototype test results. TEAM TO ADD: attach results before submission.
- Appendix 5: Decision matrix and cost workings. The matrix scores and the cost table are shown on the Solution and Delivery pages. The contingency is 20% of $72,207.34, which is $14,441.47.

---

## PART 6. Filler pools and image prompts

### 6.1 Fact cards (use when a grid has extra items; each has a title and one sentence)
1. Raised floor. The floor is planned 2 m above the ground on reinforced concrete piles.
2. Open season. The park is open from July to November (DETSI, 2024b).
3. Stock. The shelter would hold water, food, firewood and safety information.
4. Recovery kits. Two kits hold traction boards, a tyre deflation kit, a compressor, shackles and a strap.
5. Beacons. Two PLBs and two UHF radios are planned to give visitors a way to call for help.
6. Rangers. Rangers would restock weekly and inspect twice a year.
7. Cultural care. The building is planned for cleared ground away from restricted areas.
8. Cost. The build and stock cost about $87,400 (AUD).
9. Running cost. Running costs are about $3,950 a year in the base case (AUD).
10. Income. Sales and hire fees are expected to cover running costs.
11. Build time. Four workers would build it in about 8 weeks.
12. Training. Each Ranger would complete 4 hours of training.

### 6.2 Project stage cards (for lists of jobs, events, news or dates; no dates)
1. Stage 1: Consultation with YAC and Traditional Owners. Duration: part of about 6 months of approval.
2. Stage 2: Cultural heritage and site checks. Duration: part of about 6 months of approval.
3. Stage 3: Engineering design. Flood and wind loads confirmed.
4. Stage 4: Grant application. About $86,650 for the build and equipment.
5. Stage 5: Dry-season build. Four workers, about 8 weeks.
6. Stage 6: Ranger training. 4 hours per Ranger.
7. Stage 7: Open season. July to November, weekly restock.
8. Stage 8: Review. Annual check by YAC and Rangers.

### 6.3 Organisations and sources (plain text, no logos)
Yintjingga Aboriginal Corporation | Lama Lama Rangers | Engineers Without Borders Australia | University of Technology Sydney | Queensland Parks and Wildlife Service | Cook Shire Council | Department of the Environment, Tourism, Science and Innovation | National Indigenous Australians Agency

### 6.4 Short paragraphs for leftover slots (20 to 40 words)
1. Provisions Point is a proposed raised supply and recovery shelter for Warokutal. It would help visitors get water, supplies and vehicle recovery gear when floods damage the roads.
2. The design is a student proposal. It is for the Yintjingga Aboriginal Corporation to review, change or reject.
3. Rangers would restock the shelter every week in the open season and inspect it twice a year, before and after the wet season.
4. A one-off grant would pay for the build. Sales and hire fees would pay for stock and running costs.
5. The shelter is planned for already cleared ground, placed to keep visitors away from restricted areas.

### 6.5 Image prompts
There is no IMG-13. Match images to slots by role. Hero or banner = IMG-01. Second large image = IMG-02. Wide interior = IMG-03. Close-up of kit = IMG-04. Supplies = IMG-05. Cross-section or diagram = IMG-06. Process strip = IMG-07. Map or plan = IMG-08. Road or problem = IMG-09. Materials = IMG-10. Team = IMG-11. Logo = IMG-12. Video = IMG-14. Other slots: nearest role and ratio. Use one image in no more than two slots. Part B.8 shows that this cannot be met on this site and says what to report.

The slot's real ratio and pixel size win over the ratio in the list below. Part B has them for every slot. Save with the same file name and type.

Make every image yourself. Photo-style images (IMG-01 to 05, 09, 10) are made with Gemini in the user's Chrome. Settings: model "4 Argon", thinking level "High". The Gemini aspect ratio menu offers only 1:1, 9:16, 3:4, 4:3 and 16:9, so generate every 3:2 slot (IMG-03, IMG-04, IMG-10) at 4:3 and crop it to 3:2. For IMG-02 and IMG-03, attach `generated-images/IMG-01_16x9.png` as the reference image. Drawn items and IMG-14 are made with code. The exact prompts, ratios and file names for the images still to make are in `/Users/darrell/Developer/assignment-website/waabi-safety-reconstruction/generated-images/PROMPTS_TO_RUN.md`. Run those prompts, or let the user run them by hand. Drive Gemini with one foreground tab, and never more than two tabs, because parallel runs and fast page loads triggered a Google CAPTCHA twice. Never solve a CAPTCHA. Pause between generations, and ask the user to clear any CAPTCHA. If you cannot make an image, keep the old image file, change only the alt text, and list the slot in the report. Never use stock photos, web images or photos of real people or places.

Style A (IMG-01 to 05, 09, 10): realistic architectural concept render, soft natural light, muted natural colours, red-brown soil and dry grass where land is visible.
Style B (IMG-06, 07, 08, 11): flat vector style, 3 colours: the site accent colour, dark grey and off-white. No gradients, no text.
Both styles: no people, no text, no logos, no brand names, and no emblems, badges or manufacturer marks on any vehicle. No Aboriginal or Torres Strait Islander people, silhouettes, art, patterns, dot painting, rock art, hand stencils, flags, ceremony, campfire gatherings, sacred-looking sites, real landmarks, or wildlife close-ups.

SHELTER (use in IMG-01, 02, 03, 09 whenever it shows): one rectangular building, floor 2 m above ground on concrete piles, plain concrete walls, low-pitch light grey corrugated roof with one solar panel, one entry on one side, no windows, no signs. Make IMG-01 first. Use it as the reference for IMG-02 and IMG-03. Keep the same sky and light family. Put this block and the style lines in every Gemini prompt.

- IMG-01 (hero, 16:9). Aerial view of the SHELTER in a cleared bush campground in the dry season, a 4WD with a roof tent and a camp chair nearby, clear blue sky.
- IMG-02 (flood, 16:9). The SHELTER in the wet season. Brown floodwater surrounds the concrete piles, grey storm clouds.
- IMG-03 (interior wide, 3:2; generate at 4:3 and crop). Inside the SHELTER: steel shelves with water containers, canned food with blank labels, black traction boards, a counter, a wall-mounted handheld radio, a blank notice board, concrete floor, daylight from the open door.
- IMG-04 (kit close-up, 3:2; generate at 4:3 and crop). A bench with black traction boards, a coiled recovery strap, shackles, a 12 V compressor, a tyre deflation hose, a personal locator beacon and a handheld radio, plain backgrounds, no logos.
- IMG-05 (supplies, 1:1). A shelf with 20 L water containers, tins with blank labels and bagged firewood.
- IMG-06 (cross-section, 16:9). Style B. Side view of the shelter on piles with a dashed flood line below the floor, soil layer below. No text and no labels in the image.
- IMG-07 (visitor journey strip, 21:9). Style B. Five simple icons in a row, no people: phone showing a road, tent at camp, 4WD on traction boards, beacon with signal rings, kit being returned. Draw as SVG or with Pillow. Do not use an image model.
- IMG-08 (site plan, 4:3). Style B. Abstract top-down schematic of a cleared area with a small building footprint, a camp area and a track, drawn as simple shapes and contour lines. No place names, no labels. Draw as SVG or with Pillow.
- IMG-09 (problem, 16:9). A red dirt road with floodwater across it and a 4WD stopped at the edge, no people, overcast sky.
- IMG-10 (materials, 3:2; generate at 4:3 and crop). A bench with a concrete pile cross-section, a watertight concrete sample and a corrugated roof sheet sample, studio light.
- IMG-11 (team tiles, 1:1, six variants). Style B. A flat monogram tile with one letter. Order: P Pinhong, D Darrell, T Tasneef, I Isaac, J Jude, Q Qijun. Read the accent colour from the CSS. Do not edit the CSS. No faces. Make with code (SVG or Pillow), not an image model, so the letters are exact.
- IMG-12 (logo). The words "Provisions Point" in a clean, simple type, no icon, sized like the existing logo. Make with code (SVG or Pillow), not an image model, so the letters are exact.
- IMG-14 (video replacement). MP4 (H.264), no sound, 10 seconds, loops, same pixel size as the old video, under 3 MB. Fade IMG-01 to IMG-02 and back with a slow pan, built with ffmpeg. If you cannot make it, follow the video rule in 0.5. B.7 gives the clip variants, sizes and posters.

Never use a generated image in a slot about the prototype, and never call a generated image a prototype or a Blender model. If the team supplies Blender screenshots, use them there. If not, use IMG-06 with the alt text "Concept illustration of the shelter" and write "TEAM TO ADD: Blender screenshots of the prototype" in the caption slot, or in the report if there is none.

---

## PART 7. References (APA 7, keep this order and format)

Anthropic. (2026). *Claude* [Large language model]. https://claude.ai
Bober, I. (2025, March). *A simple guide to soft shackles*. Unsealed 4X4. https://unsealed4x4.com.au/soft-shackles-a-simple-guide/
BuyWisely. (n.d.-a). *GME TX6160X 5 watt IP67 UHF CB handheld radio*. https://buywisely.com.au/product/gme-tx6160x-5-watt-ip67-uhf-cb-handheld-radio-beyond-blue-foundation
BuyWisely. (n.d.-b). *Hot Shots 20kg firewood*. https://buywisely.com.au/product/hot-shots-20kg-firewood
BuyWisely. (n.d.-c). *MAXTRAX Indeflate (MTXIND)*. https://buywisely.com.au/au/product/maxtrax-indeflate-mtxind
BuyWisely. (n.d.-d). *MAXTRAX MKII recovery tracks - black*. https://buywisely.com.au/au/product/maxtrax-mkii-recovery-tracks-black
BuyWisely. (n.d.-e). *SCA Hurricane 12V 150PSI 50LPM tyre inflator*. https://buywisely.com.au/product/sca-hurricane-12v-150psi-50lpm-tyre-inflator-sca-club
BuyWisely. (n.d.-f). *XTM 7 piece recovery kit*. https://buywisely.com.au/product/xtm-7-piece-recovery-kit-club-bcf
Cook Shire Council. (2026, August 26). *Road conditions & closures*. https://www.cook.qld.gov.au/services/roads/road-conditions-closures/
Department of the Environment, Tourism, Science and Innovation. (2024a, May 3). *About: Lama Lama National Park (CYPAL)*. Parks and Forests. https://parks.qld.gov.au/parks/lama-lama/about
Department of the Environment, Tourism, Science and Innovation. (2024b, May 3). *Lama Lama National Park (CYPAL)*. Parks and Forests. https://parks.qld.gov.au/parks/lama-lama
Department of the Environment, Tourism, Science and Innovation. (2026, July). *Regional Tourism Infrastructure Fund: Round 2 program guidelines*. https://www.detsi.qld.gov.au/__data/assets/pdf_file/0023/406481/regional-tourism-infrastructure-fund-guidelines.pdf
Down Under Pilot Shop. (n.d.). *GME MT610G PLB / ELT - GPS personal locator beacon*. https://downunderpilotshop.com.au/products/mt610g-gps-personal-locator-beacon
Engineers Without Borders Australia. (n.d.). *Design area 1: Infrastructure and access*. EWB Challenge. https://ewbchallenge.org/challenge/port-stewart-lama-lama/design-area-1-infrastructure-and-access/
Engineers Without Borders Australia. (2024). *EWB Challenge: Port Stewart, Lama Lama Country*. https://ewbchallenge.org/challenge/port-stewart-lama-lama/
Feasly. (n.d.). *Construction cost per square metre in Australia (2026)*. https://www.feasly.com.au/guides/construction-cost-per-square-metre-australia
Google. (2026). *Gemini* [Large language model]. https://gemini.google.com
Leading Architecture. (2024, June). *Watertight concrete from Sika*. https://www.leadingarchitecture.co.za/watertight-concrete-from-sika/
Menard Asia. (2025, January 16). *Concrete pile foundations: Types and benefits*. https://www.menard-asia.com/2025/01/16/concrete-pile-foundations/
National Indigenous Australians Agency. (n.d.). *Indigenous Rangers Program funding extension update 1*. https://www.niaa.gov.au/news-and-media/indigenous-rangers-program-funding-extension-update-1
Queensland Parks and Wildlife Service. (2013). *Lama Lama National Park (Cape York Peninsula Aboriginal Land): Management statement*. Department of Environment, Science and Innovation. https://parks.des.qld.gov.au/__data/assets/pdf_file/0022/166423/lama-lama.pdf
Reardon-Smith, M. (2023). The wet: Shifting seasons, climate change and natural cycles in Cape York Peninsula, Queensland. *Oceania, 93*(3), 302-320. https://doi.org/10.1002/ocea.5377
Supercheap Auto. (2017, February). *How to rapidly deflate your tyres*. https://www.supercheapauto.com.au/blog/4wd-adventure/how-to-rapidly-deflate-your-tyres.html
Testa, C. (2026, January 23). *Tropical low forecast to bring heavy rain to northern Cape York, Gulf of Carpentaria*. ABC News. https://www.abc.net.au/news/2026-01-23/tropical-low-heavy-rain-cape-york-gulf-of-carpentaria/106260620
Todio, E. (n.d.). *Logistics of tourism in Port Stewart in Lama Lama Country*. EWB Challenge. https://ewbchallenge.org/forums/topic/logistics-of-tourism-in-port-stewart-in-lama-lama-country/
Yintjingga Aboriginal Corporation. (n.d.). *Visiting*. Welcome to Lama Lama Country. https://www.lamalama.org.au/visiting/


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
