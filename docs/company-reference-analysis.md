# Company reference analysis

Source: https://waabi.ai/company, captured October 16–17, 2026. Native REA captures, extracted public HTML, layout metrics, and map interaction inspection are retained in `artifacts/reference/company/`. Screenshot targets are 1440×900, 1920×1080, 768×1024, and 390×844.

The page uses the original Zagma display and NeueHaas text fonts. Its sequence is a full viewport truck hero; scroll colored founding story; Raquel portrait and quote; overlapping team photographs; investor marquee; news carousel; upcoming events; interactive office map; shared footer. Original imagery, SVG map, and investor logos are served locally.

Desktop content is capped at 1234px; at 1440px its left edge is 103px. The story is capped at 760px. Desktop sections are separated by 120px; tablet/mobile gaps are 60px. The 768px breakpoint retains desktop 80px titles, two people columns, 450px news cards and 315px event cards. At 390px it switches to 40px gutters, 34px headings, stacked people content, and 310px cards. The quote uses a 1.6 desktop aspect ratio and 9:16 mobile ratio, with a scrolling image offset and two dark gradients.

News categories, dates and titles follow the extracted page; events link to their public organizer URLs. All five office names, addresses and percentage marker positions are copied from the source page data. Map controls support pointer hover, keyboard focus, and touch/click. The investor strip moves continuously and pauses on hover/focus; carousel controls advance one card. Reduced motion disables animation and smooth scrolling.
