# The Harbour — Premium Redesign

A modern, editorial redesign concept for **The Harbour**, the twin-tower waterfront residential property at **16385 Biscayne Boulevard, North Miami Beach, FL 33160**, built around the property's own real photography and verified public information.

> This is an independently produced redesign concept created for review by The Harbour's ownership/marketing team. It is **not** the official website.

## What's implemented

- **Hero** — full-screen hero using a real photo of The Harbour's twin towers, with the wordmark, a short factual statement, and two CTAs ("Explore The Harbour", "Residences").
- **Introduction** — concise property overview (developer, address, tower count, groundbreaking year) using only verified facts.
- **Residences** — tabbed section (Unit A / Villa A / Penthouse A) using real recovered floor-plan sheets, with verified bed/bath/square-footage figures pulled directly from the original marketing floor plans.
- **Amenities** — six-image editorial grid (private beach & pool deck, mangrove spa, waterfront lounge/bar, grand lobby, amenity podium, valet arrival) using real property photography/renderings.
- **Gallery** — filterable editorial gallery (Exterior / Interior / Amenities / Waterfront) with a custom lightbox (keyboard + click navigation, captions).
- **Location** — verified address with an embedded Google Map and a "Get Directions" link.
- **Contact** — minimal inquiry form (Name, Email, Phone, Message) — client-side only, no backend attached yet.
- **Resident Portal** — linked in navigation and footer to the direct login portal: `https://portal.connectresident.com/`.
- **Footer** — address, resident portal link, navigation, and verified social links (Facebook/Instagram handles recovered from the property's original official site).
- Responsive layout (desktop/tablet/mobile), scroll reveal animations, reduced-motion support, semantic HTML, alt text throughout, accessible focus states and keyboard-navigable lightbox.

## Site structure / routes

Single page (`index.html`) with in-page anchors:
- `#home`, `#residences`, `#amenities`, `#gallery`, `#location`, `#contact`
- External: Resident Portal → `https://portal.connectresident.com/`

## Research & image provenance

All imagery is sourced from The Harbour's **own historical marketing site** (recovered via the Wayback Machine, `theharbourmiami.com`, WordPress-era 2015–2018 snapshots) and from the **current resale/rental marketing site** `theharbourcondo.miami` (via licensed image search), not stock photography or AI generation:

- `images/harbour-twin-towers.jpg`, `harbour-aerial-towers.jpg`, `harbour-entrance-dusk.jpg`, `harbour-photo-1..8.jpg` — real photographs of the completed towers, entrance/living wall, lobby, and outdoor amenity spaces.
- `harbour-pool.jpg`, `harbour-spa.jpg`, `harbour-kitchen.jpg`, `harbour-bathroom.jpg`, `harbour-amenities-wide.jpg` — original developer marketing renderings recovered from the official archived site.
- `harbour-unitA.jpg`, `harbour-villaA.jpg`, `harbour-phA.jpg`, `harbour-keyplan-*.jpg` — original floor-plan sheets recovered from the official archived site (source of the verified bed/bath/sq.-ft. figures used in the Residences section).
- `harbour-logo-gold.png` — the property's original gold monogram/wordmark, recovered from the archived official site.

Facts used (all verified, nothing invented): address; twin 32-story North/South towers; developer 13th Floor Investments; approximate 2016 groundbreaking; the three residence layouts and their real bed/bath/sq.-ft. specs; the amenities visibly present in verified photography; and the live resident portal URL.

## Not implemented / left out intentionally

- No pricing, availability, unit counts, awards, testimonials, or developer/management contact details — none could be verified, per the factual-accuracy requirement.
- No blog/news, FAQ, chatbot, popups, or countdown — deliberately excluded per the "less is more" brief.
- Contact form has no backend — it validates client-side and shows a confirmation message only. To make it functional, wire it to the RESTful Table API (`tables/inquiries`) or an external form service.
- Phone number and direct email were not publicly verifiable and are intentionally omitted rather than fabricated.

## Data model

No table schema is required for the current build (the contact form is client-side only). If persistence is wanted later, a simple `inquiries` table (name, email, phone, message, created_at) can be added via the Table API.

## Recommended next steps

1. Replace the recovered/legacy images with current, higher-resolution official photography if the client can supply it (image paths are already organized and named for easy swapping).
2. Confirm current availability/pricing messaging with the client and, if desired, add a simple "Contact for Availability" note (still without fabricated numbers).
3. Wire the contact form to the Table API or an email service.
4. Confirm current phone/email contact details with the client for the Contact section and footer.
5. Deploy via the **Publish tab** (or ask to Hosted Deploy) once the client approves.
