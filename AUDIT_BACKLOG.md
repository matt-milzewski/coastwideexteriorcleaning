# Website Audit Backlog — Coastwide Exterior Cleaning
> Audit conducted: 2026-02-26
> Auditor: Senior Website Consultant (AI-assisted)
> Site: coastwideext.com.au

---

## CRITICAL — Fix Immediately

- [ ] **[CRITICAL] Empty gallery — 5 of 6 items are placeholders**
  - `gallery.html` lines 97–165: Only 1 item (patio ceiling) has real images. Other 5 are placeholder divs with text "Before"/"After"
  - Action: Replace all placeholder divs with actual before/after photo pairs

- [ ] **[CRITICAL] Missing team photos on About page**
  - `about.html` lines 88–109: Matt and Nicole's photos show placeholder text only
  - Action: Upload real photos for the story image and both team cards

- [ ] **[CRITICAL] Incomplete before/after teaser on Home page**
  - `index.html` lines 213–217: Second image pair is an empty placeholder
  - Action: Add a real second before/after image pair to home page teaser

- [ ] **[CRITICAL] Formspree ID may not be configured**
  - `contact.html` line 90: `action="https://formspree.io/f/xzdaoelr"` — README flags this as needing replacement
  - Action: Verify this Formspree endpoint receives submissions or replace with correct ID

---

## HIGH — Fix Within 2 Weeks

- [ ] **[HIGH] No Google Analytics or tracking set up**
  - No GA4/GTM script found in any page
  - Action: Add GA4 measurement ID and optionally set up conversion tracking for form submits and phone clicks

- [ ] **[HIGH] No customer reviews or testimonials anywhere on site**
  - No testimonials section, no Google review embed, no star ratings visible
  - Action: Add a testimonials section to home page (at minimum); consider Google Reviews embed

- [ ] **[HIGH] No AggregateRating schema markup**
  - LocalBusiness schema exists but has no `ratingValue`, `reviewCount`, or `Review` items
  - Action: Add aggregate rating schema once reviews are collected (enables star ratings in Google Search)

- [ ] **[HIGH] No FAQ section**
  - No FAQ exists anywhere; common questions (cost, duration, insurance, process) go unanswered
  - Action: Add FAQ section to home page or dedicated FAQ page with 10–15 questions

- [ ] **[HIGH] License, insurance details not shown clearly**
  - "Fully insured" is mentioned but no license number, insurance company, or public liability details
  - Action: Add ABN, license number, and "fully insured" detail prominently on About and Contact pages

- [ ] **[HIGH] No local landing pages for service areas**
  - No suburb-specific pages (Maryborough, Hervey Bay, Rainbow Beach, Cooloola Cove, etc.)
  - Action: Create at minimum one page per major service area to capture local SEO traffic

- [ ] **[HIGH] Favicon is a placeholder**
  - README flags `images/favicon.ico` as needing replacement
  - Action: Upload a real branded favicon (ideally provide multiple sizes + `site.webmanifest`)

- [ ] **[HIGH] Meta descriptions not fully optimised**
  - `gallery.html` meta description is generic; all pages could include location + service keywords
  - Action: Rewrite meta descriptions to include primary service + location keyword (e.g., "Wide Bay pressure cleaning")

- [ ] **[HIGH] No blog or content marketing**
  - Zero articles, guides, or tips content
  - Action: Plan a simple blog with seasonal guides ("preparing your driveway for summer", etc.) to build SEO authority

- [ ] **[HIGH] No pricing transparency**
  - Schema shows `priceRange: "$"` only; no example costs or price ranges published
  - Action: Add ballpark pricing or at least a "What affects cost" section to services page

---

## MEDIUM — Fix Within 30 Days

- [ ] **[MEDIUM] No guarantee details**
  - "Satisfaction Guaranteed" is mentioned but no explanation of what it covers or how to claim
  - Action: Add a short paragraph explaining the guarantee on the home and services pages

- [ ] **[MEDIUM] Service map doesn't list specific suburbs**
  - Embedded map shows a wide area; no list of serviced suburbs below the map
  - Action: Add a text list of serviced suburbs under the map on About and Contact pages

- [ ] **[MEDIUM] Contact form has no spam protection**
  - No honeypot field or CAPTCHA visible on `contact.html`
  - Action: Add a hidden honeypot field or enable Formspree's spam filtering

- [ ] **[MEDIUM] Form success message doesn't set expectations**
  - Current: "We'll reach out as soon as we can" — no timeframe given
  - Action: Update to include expected response time (e.g., "within 24 hours") and phone number for urgent inquiries

- [ ] **[MEDIUM] No breadcrumb navigation on inner pages**
  - No breadcrumb trail on Services, About, Contact, Gallery pages
  - Action: Add breadcrumb component with matching BreadcrumbList schema markup

- [ ] **[MEDIUM] No Service schema markup on services page**
  - `services.html`: Individual services have no `Service` JSON-LD with `serviceType`, `areaServed`, `offers`
  - Action: Add per-service schema markup to improve rich snippet eligibility

- [ ] **[MEDIUM] Gallery filter not crawlable by Google**
  - Filtering uses `display: none` JS — Google can't crawl filtered views
  - Action: Consider URL hash-based filtering or separate gallery pages per service type

- [ ] **[MEDIUM] About page lacks social proof numbers**
  - No "X happy customers", "X 5-star reviews", or years-in-business stat prominently displayed
  - Action: Add key statistics to About page once available

- [ ] **[MEDIUM] Services page value props are weak**
  - Service cards show title + description but no clear benefit statement or individual CTA
  - Action: Add a "why this matters" line and a per-service CTA button

---

## LOW — Fix When Time Allows

- [ ] **[LOW] CTA button wording is inconsistent across pages**
  - Mix of "Get a Free Quote", "Request Quote", "Request a Quote", "Contact Us"
  - Action: Standardise to one phrase sitewide (recommend "Get a Free Quote")

- [ ] **[LOW] Social media presence is Facebook-only**
  - Only Facebook linked in footer; Instagram and TikTok ideal for before/after content
  - Action: Create Instagram account and link from footer; consider TikTok if capacity allows

- [ ] **[LOW] No opening hours in schema or on site**
  - LocalBusiness schema missing `openingHoursSpecification`
  - Action: Add hours to schema and display on Contact page

- [ ] **[LOW] Images not served with responsive srcset**
  - Before/after images don't use `<picture>` or `srcset` for mobile-optimised sizes
  - Action: Export images at multiple sizes and implement `srcset` attributes

- [ ] **[LOW] Internal linking strategy missing**
  - Service cards link to anchors, not dedicated service pages
  - Action: Create `/services/driveway-cleaning.html` style pages for deeper SEO and linking

- [ ] **[LOW] No sustainability/eco-friendly messaging**
  - No mention of water usage, eco-friendly products, or environmental responsibility
  - Action: If any eco-practices exist, add a short section — differentiator for modern customers

- [ ] **[LOW] No trust badge display**
  - No visible ABN badge, insurance logo, or industry certification graphics
  - Action: Source/create simple badge graphics for insurance and ABN certification

- [ ] **[LOW] No exit-intent popup or email capture**
  - No mechanism to capture visitor interest before they leave
  - Action: Consider a lightweight exit-intent popup with discount or free tip offer

- [ ] **[LOW] CSS not minified for production**
  - `styles.css` is unminified (~40KB uncompressed)
  - Action: Add a build step to minify CSS for production deployment

- [ ] **[LOW] No confirmation email mentioned in form flow**
  - User gets success message but no mention of whether they receive an email copy
  - Action: Configure Formspree autoresponder email or mention in success message

---

## Quick Wins (High ROI, Low Effort)

| Task | Effort | Impact |
|------|--------|--------|
| Fix/verify Formspree ID | 5 min | CRITICAL |
| Add Google Analytics | 10 min | High |
| Upload team photos | 30 min | High |
| Update form success message | 5 min | Medium |
| Standardise CTA button text | 15 min | Medium |
| Add suburb list under service map | 20 min | Medium |
| Add 5 real gallery images | 1–2 hr | CRITICAL |
| Add testimonials section | 1–2 hr | High |
| Write FAQ section (10 questions) | 2–3 hr | High |
| Add license/ABN/insurance detail | 30 min | High |

---

## Issue Count Summary

| Priority | Count |
|----------|-------|
| Critical | 4 |
| High | 10 |
| Medium | 9 |
| Low | 10 |
| **Total** | **33** |
