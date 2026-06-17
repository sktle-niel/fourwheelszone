---
name: fourwheelszone-project
description: Four Wheels Zone auto-repair shop website — stack, brand, and the single-branch constraint
metadata:
  type: project
---

This repo (`fourwheelszone`) is an interactive marketing website for **Four Wheels Zone**, an auto-repair shop ("talyer") in Tagburos, Puerto Princesa City, Palawan. Owner/dev is the user (niel).

- **Stack:** React 19 (JSX) + Vite 8 + Tailwind v4 + shadcn/ui (radix base, nova preset). Brand colors live in `@theme` in `src/index.css` (red `#e11d26`, gold `#f7b500`, dark `#141414`). Single-page site composed in `src/App.jsx` from section components in `src/components/`. Site data (services, contact) is centralized in `src/lib/site.js`.
- **Brand:** tagline "Alagang Casa", slogan "Repair · Service · Trusted", "Glory to God!". Logo at `public/logo.png`. Copy is in Taglish.
- **IMPORTANT single-branch constraint:** They have **only ONE branch — Palawan/Tagburos**. Promo images list other branches (Cavite, QC, Davao, Pampanga, Batangas) but the user explicitly said those are NOT theirs — do NOT add them.
- Contact: Globe 0916 277 6321, Smart 0969 241 2152. FB page id `61590429990361`.
- Booking form is front-end only (no backend) — submission just shows a sonner toast. Wire to a real backend/Messenger if asked.
