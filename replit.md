# JOE Technologies Website

## Overview
A premium, production-ready multi-page platform for **JOE Technologies** — an AI-driven software engineering consultancy founded by **Jeffery Onome Emuodafevware**. Built with React/TypeScript on the frontend and Express/Node.js on the backend.

## Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion, TanStack Query, shadcn/ui, react-icons, wouter (routing)
- **Backend**: Express.js (Node.js), in-memory storage, express-rate-limit
- **Build**: Vite (frontend), tsx (backend)
- **Forms**: react-hook-form + zod validation

### Project Structure
```
client/src/
  pages/
    home.tsx                  — Landing page (Hero + previews + CTA)
    about.tsx                 — About, Why Us, Testimonials
    services.tsx              — Services, Process, Tech Stack
    portfolio.tsx             — Portfolio / Case Studies
    contact.tsx               — Contact form + FAQ
    privacy.tsx               — Privacy Policy (legal)
    terms.tsx                 — Terms of Service (legal)
    cookies.tsx               — Cookie Policy (legal)
    not-found.tsx             — Dark-branded 404 page
  pages/services/
    ai-strategy.tsx           — AI Strategy & Architecture detail page
    custom-ai.tsx             — Custom AI Development detail page
    mlops.tsx                 — MLOps & Infrastructure detail page
    ai-integration.tsx        — AI Integration & APIs detail page
    full-stack.tsx            — Full-Stack Development detail page
    advisory.tsx              — Technical Advisory detail page
  components/
    Layout.tsx                — Shared layout (Nav + Footer + utilities)
    Navigation.tsx            — Top nav with wouter Link routing
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
    Footer.tsx                — Links (wouter), social icons, scroll-to-top
    WhatsAppButton.tsx        — Floating WhatsApp button (bottom-right)
    ScrollProgressBar.tsx     — Gradient bar across top of page
    ThemeToggle.tsx           — Dark/Light mode toggle
    ErrorBoundary.tsx         — React error boundary with branded UI
    CookieConsent.tsx         — GDPR cookie consent banner
  hooks/
    use-theme.ts              — Dark/light theme state (localStorage)
    use-page-title.ts         — Per-page document title
    use-scroll-spy.ts         — Active section detection (legacy, unused)
    use-toast.ts              — Toast notification hook
server/
  index.ts                    — Express server entry
  routes.ts                   — API routes with rate limiting
  storage.ts                  — MemStorage with contact submissions
shared/
  schema.ts                   — Drizzle/Zod schemas for users and contacts
```

## Pages & Routes
| Route | Page | Content |
|-------|------|---------|
| `/` | Home | Hero, TrustedBy, Services preview (3), Portfolio highlights (2), Testimonials, CTA banner |
| `/about` | About | Page header, AboutSection, WhyUsSection, TestimonialsSection |
| `/services` | Services | Page header, ServicesSection, ProcessSection, TechStackSection |
| `/portfolio` | Portfolio | Page header, PortfolioSection (4 case studies) |
| `/contact` | Contact | Page header, ContactSection, FAQSection |
| `/services/ai-strategy` | AI Strategy | Overview, deliverables, use cases, tech stack, CTA |
| `/services/custom-ai` | Custom AI Dev | Overview, deliverables, use cases, tech stack, CTA |
| `/services/mlops` | MLOps | Overview, deliverables, use cases, tech stack, CTA |
| `/services/ai-integration` | AI Integration | Overview, deliverables, use cases, tech stack, CTA |
| `/services/full-stack` | Full-Stack Dev | Overview, deliverables, use cases, tech stack, CTA |
| `/services/advisory` | Advisory | Overview, deliverables, use cases, tech stack, CTA |
| `/privacy` | Privacy Policy | Data collection, usage, security, GDPR, rights |
| `/terms` | Terms of Service | Engagement, pricing, IP, confidentiality, liability |
| `/cookies` | Cookie Policy | Cookie usage table, what we don't track, management |
| `*` | 404 | Branded not-found page |

## Navigation
- Top nav uses wouter `Link` for page routes: Home, About, Services, Portfolio, Contact
- Active page highlighted via `useLocation` comparison
- CTA buttons in sections link to `/contact` or `/portfolio` via wouter
- `ScrollToTop` component resets scroll position on route change
- Layout component wraps all pages with shared Nav, Footer, WhatsApp, ScrollProgressBar, CookieConsent

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
- **Multi-page platform**: 5 pages with shared layout and wouter routing
- **Dark-tech luxury design**: Deep navy/black backgrounds, electric blue/cyan accents, gradient text
- **Full light/dark theme support**: CSS custom properties + Tailwind `joe.text` color
- **Fully responsive**: Mobile-first with hamburger nav, responsive grids
- **Per-page SEO**: Unique document title for each page via `usePageTitle` hook
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
