# JOE Technologies Website

## Overview
A premium, production-ready website for **JOE Technologies** — an AI-driven software engineering consultancy founded by **Jeffery Onome Emuodafevware**. Built with React/TypeScript on the frontend and Express/Node.js on the backend.

## Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion, TanStack Query, shadcn/ui, react-icons
- **Backend**: Express.js (Node.js), in-memory storage, express-rate-limit
- **Build**: Vite (frontend), tsx (backend)
- **Forms**: react-hook-form + zod validation

### Project Structure
```
client/src/
  pages/home.tsx              — Main single-page site
  pages/not-found.tsx         — Dark-branded 404 page
  components/
    Navigation.tsx            — Sticky header with smooth scroll, scroll-spy, mobile menu
    HeroSection.tsx           — Full-screen hero with animated code terminal
    TrustedBySection.tsx      — Client company strip
    AboutSection.tsx          — Founder bio, achievements, values
    ServicesSection.tsx       — 6 service cards with icons and tags
    WhyUsSection.tsx          — 6 differentiators
    ProcessSection.tsx        — 5-step numbered process timeline
    TechStackSection.tsx      — Tech categories with react-icons logos
    PortfolioSection.tsx      — 4 case studies with metrics
    TestimonialsSection.tsx   — 3 client testimonials
    FAQSection.tsx            — 8-question accordion
    ContactSection.tsx        — Contact form + WhatsApp CTA + info
    Footer.tsx                — Links, social icons, scroll-to-top
    WhatsAppButton.tsx        — Floating WhatsApp button (bottom-right)
    ScrollProgressBar.tsx     — Gradient bar across top of page
    ThemeToggle.tsx           — Dark/Light mode toggle
    ErrorBoundary.tsx         — React error boundary with branded UI
    CookieConsent.tsx         — GDPR cookie consent banner
  hooks/
    use-theme.ts              — Dark/light theme state (localStorage)
    use-scroll-spy.ts         — Active section detection
    use-toast.ts              — Toast notification hook
server/
  index.ts                    — Express server entry
  routes.ts                   — API routes with rate limiting
  storage.ts                  — MemStorage with contact submissions
shared/
  schema.ts                   — Drizzle/Zod schemas for users and contacts
```

## Theme System (CSS Custom Properties)
All sections use CSS custom properties defined in `client/src/index.css` for both `:root` (light) and `.dark` modes:

- `--joe-text` — RGB triplet for text color (slate-900 / white)
- `--joe-bg-hero`, `--joe-bg-1`, `--joe-bg-2`, `--joe-bg-3` — Section background gradients
- `--joe-bg-solid` — Solid background color
- `--joe-card`, `--joe-card-border`, `--joe-card-border-subtle` — Card styling
- `--joe-overlay` — Subtle overlay background
- `--joe-grid-color`, `--joe-glow-opacity` — Grid pattern and glow effects
- `--joe-nav-bg`, `--joe-nav-border` — Navigation styling
- `--joe-fade` — Edge-fade color for scroll strips
- `--joe-terminal-bg` — Code terminal background (dark in both modes)
- `--joe-trusted-bg` — Trusted-by section background
- `--joe-divide` — Divider lines

**Tailwind extension**: `text-joe-text`, `bg-joe-text`, `border-joe-text` with opacity support (e.g., `text-joe-text/65`)

## Key Features
- **Dark-tech luxury design**: Deep navy/black backgrounds, electric blue/cyan accents, gradient text
- **Full light/dark theme support**: CSS custom properties + Tailwind `joe.text` color
- **Fully responsive**: Mobile-first with hamburger nav, responsive grids
- **Smooth scroll navigation**: Anchor-based with JS smooth scroll
- **Scroll spy**: Active nav link highlights as user scrolls through sections
- **Animated counters**: Hero stats count up from 0 when in view
- **Contact form**: Validated with Zod, posts to `/api/contact`, success/error states
- **WhatsApp integration**: Floating button + form button linking to WhatsApp chat
- **Framer Motion animations**: Scroll-triggered section reveals, hero type animation
- **SEO optimized**: Title, meta description, OG tags, canonical URL, skip link, JSON-LD structured data
- **Accessibility**: Skip link, aria-labels, aria-expanded, semantic HTML, focus-visible styles
- **Error boundary**: Catches React errors with branded fallback UI
- **Cookie consent**: GDPR-compliant banner with localStorage persistence
- **Rate limiting**: `/api/contact` limited to 5 requests per 15 minutes
- **Honeypot spam protection**: Hidden `website` field silently rejects bots

## Design System
- **Primary color**: Electric blue/cyan (#00c8ff, #0066ff) — always hardcoded
- **Accent**: Purple (#7c3aed), Green (#00ff88) — always hardcoded
- **Typography**: Space Grotesk (headings via font-heading), Inter (body)
- **Default theme**: Dark mode (defaults to `dark` class)

## API Endpoints
- `POST /api/contact` — Rate-limited (5/15min), honeypot checked, validates with Zod
- `GET /api/contacts` — Returns all contact submissions
- `GET /api/health` — Health check endpoint

## WhatsApp Configuration
WhatsApp number: `2349017048791` (no + prefix in wa.me URL)
Email: `jeffemuodafe124@gmail.com`
Phone display: `+234 901 704 8791`

## Development
```bash
npm run dev  # Starts Express + Vite dev server on port 5000
```

## Sections
1. Hero — Animated code terminal, animated number counters, CTAs
2. Trusted By — Client company name strip with fade-edge
3. About — Founder story and company values
4. Services — AI Strategy, Custom AI Dev, MLOps, Integration, Full-Stack, Advisory
5. Why JOE — 6 key differentiators with numbered cards
6. Process — 5-step methodology (Discovery → Strategy → Dev → Deploy → Optimize)
7. Tech Stack — AI/ML, Backend, Frontend, Data, Cloud, Engineering
8. Portfolio — 4 case studies (FinTech, Healthcare, Legal, E-Commerce)
9. Testimonials — 3 client quotes with ratings
10. FAQ — 8-question accordion with animated expand/collapse
11. Contact — Form + WhatsApp integration + availability status
12. Footer — Links, socials, copyright
