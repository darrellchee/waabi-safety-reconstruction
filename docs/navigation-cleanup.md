# Navigation and popup cleanup

The shared header now contains Home, Safety and Company. Research, Careers and Insights were removed from the header menu. The promotional announcement, cookie notice, customization dialog, their state/effects and unused styles were removed from all three pages. The header uses its normal 34px desktop / 24px mobile top offset. Footer links and page content retain their existing scope.

Validation: optimized production build, ESLint and TypeScript passed; all 33 Playwright tests passed against the production server in 2.2 minutes. Existing responsive checks verify the exact menu links and absence of the removed overlays. The obsolete cookie-preferences test was removed, and test setup no longer dismisses the deleted notice. Fresh desktop/mobile screenshots and the six-route/viewport verification record are in `artifacts/comparison/navigation-cleanup/`.
