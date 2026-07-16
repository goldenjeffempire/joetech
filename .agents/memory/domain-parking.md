---
name: Domain not connected
description: joetech.com.ng is a parked HOSTAFRICA domain with no DNS records pointing to any server.
---

## Rule
`joetech.com.ng` shows the HOSTAFRICA "domain not launched yet" parking page. It is registered but has no A/CNAME records pointing to Render or Replit.

## Why
The domain was purchased from HOSTAFRICA but DNS was never configured. The production codebase targets this domain in canonical/OG meta tags, but it is unreachable as the deployment target until DNS is set up.

## How to apply
To make the site live at `joetech.com.ng`:
- **Replit deploy**: publish via Replit, get the `.replit.app` URL, then in HOSTAFRICA DNS add a CNAME record pointing `@` (or `www`) to the Replit deployment domain.
- **Render deploy**: push to GitHub (autoDeploy: true in render.yaml), get the `*.onrender.com` URL, then in HOSTAFRICA DNS add a CNAME record pointing to it.
The code itself is correct and deployment-ready; the blocker is purely DNS configuration at the registrar.
