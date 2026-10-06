---
name: Render static hosting
description: User-selected static-only hosting scope and why backend features are excluded.
---

Render deployment must be static-only, without a separate backend. Do not reintroduce server-dependent forms, newsletter signup, analytics, or admin functionality into the public static site.

**Why:** The user explicitly chose static-only hosting to avoid free web-service idle sleep, after being told the backend features would be removed or replaced by email/WhatsApp contact.

**How to apply:** Contact actions must hand off to email or WhatsApp and must not falsely claim delivery. Keep build-time metadata, robots, and sitemaps working without Express. Preserve existing database data and legacy source unless the user explicitly authorizes deletion. Static hosting avoids idle sleep, not all possible outages.
