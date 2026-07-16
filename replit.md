# JOE Technologies Website

## Overview
A premium, production-ready multi-page platform for **JOE Technologies** — an enterprise digital product and AI solutions company co-founded by **Jeffery Onome Emuodafevware** and **Dominion Chidiebere Nkwachukwu**. The platform positions JOE Technologies around high-performance Apps, Websites, Automation Systems, UI/UX Design, Digital Systems, and AI-powered Solutions for businesses and organizations. Built with React/TypeScript on the frontend and Express/Node.js on the backend.

## Running on Replit

### Prerequisites
- Replit's built-in PostgreSQL is automatically provisioned (`DATABASE_URL` is set by the environment)
- `SESSION_SECRET` environment secret must be set

### Setup steps
```bash
npm install          # install dependencies
npm run db:push      # push schema to the database (creates tables)
npm run dev          # start the dev server on port 5000
```

The workflow "Start application" runs `npm run dev` automatically.

---

## Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion, TanStack Query, shadcn/ui, react-icons, wouter (routing)
- **Backend**: Express.js (Node.js), PostgreSQL via Drizzle ORM + pg (node-postgres), express-rate-limit, helmet, compression
- **Database**: Replit-provisioned PostgreSQL; connection via `server/db.ts`; schema managed with `drizzle-orm`; tables: users, contactSubmissions, leadSubmissions
- **Build**: Vite (frontend), esbuild (backend), code-split lazy routes
- **Forms**: react-hook-form + zod validation

### Project Structure
```
client/src/
  pages/
    home.tsx                  — Landing page (Hero + ServiceBuilder + WorkflowViz + SimDashboard + previews + CTA)
    about.tsx                 — About, Why Us, Testimonials
    services.tsx              — Services, Process, Tech Stack
    portfolio.tsx             — Portfolio / Case Studies
    contact.tsx               — Contact form + FAQ
    privacy.tsx               — Privacy Policy (legal)
    terms.tsx                 — Terms of Service (legal)
    cookies.tsx               — Cookie Policy (legal)
    why-us.tsx                — Why Choose JOE Technologies (dedicated page)
    process.tsx               — Our Engineering Process (dedicated page)
    tech-stack.tsx            — Technology We Master (dedicated page)
    faq.tsx                   — Frequently Asked Questions (dedicated page)
    qualify.tsx               — Smart Lead Qualification multi-step form (5 steps, adaptive questions, lead scoring)
    not-found.tsx             — Dark-branded 404 page
  pages/services/
    app-development.tsx       — App Development pillar page (neon cyan, #00d4ff accent)
    website-design.tsx        — Website Design & Dev pillar page (electric blue, #1a6fff accent)
    uiux-design.tsx           — UI/UX Design pillar page (amber, #f59e0b accent)
    automation.tsx            — Automation Systems pillar page (deep purple, #7b2ee0 accent)
    custom-ai.tsx             — Custom AI Development detail page (#00ff88 accent)
    full-stack.tsx            — Full-Stack / Digital Systems detail page (#ec4899 accent)
    ai-strategy.tsx           — AI Strategy & Architecture detail page
    mlops.tsx                 — MLOps & Infrastructure detail page
    ai-integration.tsx        — AI Integration & APIs detail page
    advisory.tsx              — Digital Advisory detail page
  components/
    Layout.tsx                — Shared layout (Nav + Footer + utilities + AnimatePresence transitions)
    Navigation.tsx            — Top nav with mega-menu Services dropdown + mobile submenu
    HeroSection.tsx           — Full-screen hero with canvas neural network, typing terminal that transitions to animated ServiceShowcase (interactive service tabs with live metrics)
    PageHero.tsx              — Reusable page header (label badge, gradient title, subtitle, CTA)
    TrustedBySection.tsx      — Infinite-scroll marquee with glowing dots
    AboutSection.tsx          — Founder bio + stats strip, achievements, values, social links (Instagram, Facebook, GitHub, Website)
    ServicesSection.tsx       — 6 service cards with icons and tags, correct slug routing
    WhyUsSection.tsx          — 6 differentiators
    ProcessSection.tsx        — 5-step numbered process timeline
    TechStackSection.tsx      — Tech categories with react-icons logos
    PortfolioSection.tsx      — 6 case studies with animated filter tabs (All/App Dev/Website/Automation/UI-UX/AI)
    TestimonialsSection.tsx   — 3 client testimonials with result badges + gradient borders
    FAQSection.tsx            — 8-question accordion
    ContactSection.tsx        — Contact form with 6 info cards (Email, WhatsApp x2, Instagram, Facebook, Website, Location)
    Footer.tsx                — Founder card, email/WhatsApp socials, animated status pulse
    WhatsAppButton.tsx        — Floating WhatsApp button (scroll-triggered, dual numbers, expand panel)
    ServiceBuilderSection.tsx — 4-step interactive service builder with dynamic pricing/timeline calculator
    SimulationDashboard.tsx   — Live interval-driven dashboard: animated bar charts + scrolling system logs + real-time metrics
    WorkflowVisualization.tsx — Animated pipeline engine: 4 workflow templates (Lead, Order, AI, Monitor) with Trigger→Process→Output flow
    ScrollProgressBar.tsx     — Gradient bar across top of page
    ThemeToggle.tsx           — Dark/Light mode toggle
    ErrorBoundary.tsx         — React error boundary with branded UI
    CookieConsent.tsx         — GDPR cookie consent banner
  hooks/
    use-theme.ts              — Dark/light theme state (localStorage)
    use-page-title.ts         — Per-page document title (legacy, replaced by use-seo)
    use-seo.ts                — Comprehensive SEO hook: title, description, canonical, OG, Twitter, JSON-LD schema per page
    use-scroll-spy.ts         — Active section detection (legacy, unused)
    use-toast.ts              — Toast notification hook
server/
  index.ts                    — Express server entry
  routes.ts                   — API routes with rate limiting
  db.ts                       — Drizzle ORM + pg Pool connection using DATABASE_URL
  storage.ts                  — DatabaseStorage (PostgreSQL-backed) implementing IStorage interface
shared/
  schema.ts                   — Drizzle/Zod schemas for users, contactSubmissions, leadSubmissions tables
```

## Pages & Routes
| Route | Page | Content |
|-------|------|---------|
| `/` | Home | Hero, TrustedBy, ImpactMetrics, ServicesPreview, ServiceBuilder, DigitalEcosystem, WorkflowViz, Platform, Process, SimDashboard, AICapabilities, Portfolio, Testimonials, TechEcosystem, CTA |
| `/about` | About | Page header, AboutSection, WhyUsSection, TestimonialsSection |
| `/services` | Services | Page header, ServicesSection, ProcessSection, TechStackSection |
| `/portfolio` | Portfolio | Page header, PortfolioSection (4 case studies) |
| `/why-us` | Why Us | Stats, 6 differentiators with details, commitments, CTA |
| `/process` | Process | 5-step timeline with details, engineering principles, CTA |
| `/tech-stack` | Tech Stack | 6 tech categories with descriptions, selection criteria, CTA |
| `/faq` | FAQ | Categorized FAQs (4 groups), contact methods, CTA |
| `/contact` | Contact | Page header, ContactSection, FAQSection |
| `/qualify` | Smart Lead Qualification | 5-step adaptive form: contact info → service selection → budget/timeline → adaptive questions → score reveal |
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
- **Multi-page platform**: 14+ routes with shared layout, lazy-loaded code-split pages, AnimatePresence transitions
- **Enterprise service positioning**: Homepage and services page emphasize App Development, Website Design & Development, Automation Systems, UI/UX Design, AI & Machine Learning Solutions, and Digital Systems Engineering
- **Interactive homepage visualization**: Digital command center section shows connected apps, websites, automation, UI/UX, and AI nodes with live-style readiness metrics
- **Platform architecture section**: Dedicated homepage section explains conversion strategy, modular product systems, AI/automation layer, and enterprise readiness
- **Dark-tech luxury design**: Canvas neural particle network hero, futuristic grid overlays, glowing orbs, gradient text utilities
- **PageHero design system**: Consistent reusable hero component with accent-colored label badges, gradient highlighted titles, CTA buttons
- **Mega-menu navigation**: Dropdown Services panel with 6 service links + icons; animated mobile submenu
- **Infinite marquee strips**: CSS-animated TrustedBy logos with glow dots
- **Full light/dark theme support**: CSS custom properties + Tailwind `joe.text` color
- **Fully responsive**: Mobile-first with hamburger nav, responsive grids
- **Per-page SEO**: Unique document title for each page via `usePageTitle` hook
- **Animated counters**: Hero stats count up from 0 when in view; impact metrics section
- **Contact form**: Validated with Zod, posts to `/api/contact`, success/error states
- **WhatsApp integration**: Floating button + form button linking to WhatsApp chat
- **Framer Motion animations**: Scroll-triggered section reveals, hero type animation, page transitions
- **SEO optimized**: Title, meta description, OG tags, canonical URL, skip link, JSON-LD structured data
- **Accessibility**: Skip link, aria-labels, aria-expanded, semantic HTML, focus-visible styles
- **Error boundary**: Catches React errors with branded fallback UI
- **Cookie consent**: GDPR-compliant banner with localStorage persistence
- **Rate limiting**: `/api/contact` limited to 5 requests per 15 minutes
- **Honeypot spam protection**: Hidden `website` field silently rejects bots
- **Admin API protection**: GET `/api/contacts`, `/api/leads`, `/api/newsletter` require `x-api-key: <ADMIN_SECRET>` header; set `ADMIN_SECRET` env var to enable access
- **SEO meta**: Every page sets `og:type`, `og:title/description/image`, `twitter:card`, `twitter:title/description/image`, canonical URL, and JSON-LD schema
- **robots.txt**: Scoped disallow rules properly under `User-agent: *`; GPTBot/ChatGPT-User fully blocked

## Design System
- **Brand palette**:
  - Electric Cyan `#48F2FB` — primary accent, glow effects, hero gradients
  - Vibrant Magenta `#E867EA` — secondary accent, gradient endpoints, highlights
  - Deep Aqua `#4EA3BA` — tertiary accent (Backend, Cloud categories, alternate section cards)
  - Rich Obsidian `#060A10` — primary background
  - Muted Slate `#283242` — card/surface backgrounds
- **Secondary accents**: Green (#00ff88), Amber (#f59e0b), Pink (#ec4899) — stat/metric variety
- **Primary CTA gradient**: `from-[#48F2FB] to-[#E867EA] text-[#060A10]` (Electric Cyan → Vibrant Magenta, dark text for contrast)
- **Logo**: `<JOE/>` coding-format with monospace font — cyan `<JOE` opening, magenta `/>` closing; matching SVG icon
- **Typography**: Oxanium (headings via `font-heading`), JetBrains Mono (code elements), Inter (body)
- **Gradient text utilities**: `.text-gradient-cyber` (cyan→magenta), `.text-gradient-blue` (cyan→blue)
- **Animation utilities**: `animate-marquee`, `animate-orb-float`, `animate-glow-pulse`, `animate-scan`, `animate-blink`, `animate-shine`
- **Default theme**: Dark mode (defaults to `dark` class on `documentElement`)
- **Noise overlay**: `::before` pseudo-element on body for subtle texture
- **Website URL**: joetechnologies.io (updated across all components)

## Responsive Design System
- **Breakpoints**: `xs:480px` (custom), `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px` in Tailwind config
- **Section headings**: Always `text-3xl sm:text-4xl lg:text-5xl` (never just `text-4xl lg:text-5xl`)
- **Hero h1 headings (service pages)**: `text-3xl sm:text-5xl lg:text-6xl` or `lg:text-7xl`
- **Section vertical padding**: `py-20 sm:py-24 lg:py-32` (never just `py-24 lg:py-32`)
- **Hero section grid**: `md:grid-cols-2` (right panel shows at tablet and up, not just `lg:`)
- **Services preview grid**: `grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5`
- **Mini tags on mobile**: show 4 primary tags always, 3 secondary tags `hidden sm:flex`
- **Global CSS utilities**: `.glass-card`, `.touch-target` (44px min), `.section-heading`, `.focus-ring`, reduced-motion support, smooth-scroll
- **Overflow**: `overflow-x: hidden` on html/body to prevent horizontal scroll on mobile

## API Endpoints
- `POST /api/contact` — Rate-limited (5/15min), honeypot checked, validates with Zod
- `GET /api/contacts` — Returns all contact submissions
- `POST /api/leads` — Rate-limited (5/15min), validates with Zod, stores scored lead submission
- `GET /api/leads` — Returns all lead submissions
- `GET /api/health` — Health check endpoint
- `GET /robots.txt` — SEO crawl directives (disallows /qualify, /api, legal pages; blocks GPTBot/ChatGPT-User)
- `GET /sitemap.xml` — Dynamic XML sitemap with 19 public pages, priorities, and change frequencies

## Lead Scoring (Smart Qualification)
Scores are calculated from 4 signals; each contributes points (1–4):
- **Budget**: Under $5K=1, $5K–$25K=2, $25K–$100K=3, $100K+=4
- **Timeline**: Flexible=1, 3–6 months=2, 1–3 months=3, ASAP=4
- **Company Size**: 1–10=1, 11–50=2, 51–200=3, 200+=4
- **Existing Solution**: No=0, Yes=1

**Tier Thresholds**: Score ≤5 → Startup | 6–9 → High Value | 10+ → Enterprise

**Adaptive Questions** (based on selected service category):
- AI/ML (Custom AI, AI Strategy, MLOps, AI Integration, Automation): data infrastructure + AI tool usage
- Web/App Dev (App Development, Website Design, Full-Stack): platform target + project starting point
- Design (UI/UX Design): brand guidelines + product stage
- Advisory: primary goal + prior consulting experience

## WhatsApp Configuration
WhatsApp number: `2349017048791` (no + prefix in wa.me URL)
Email: `jeffemuodafe124@gmail.com`
Phone display: `+234 901 704 8791`

## Production Hardening
- **Security headers**: helmet (XSS, HSTS, X-Frame-Options, etc.)
- **Response compression**: gzip via compression middleware
- **Code splitting**: Lazy-loaded routes via React.lazy + Suspense (429KB main → split chunks)
- **Static asset caching**: 1-year immutable cache headers on hashed assets
- **Error sanitization**: Stack traces hidden in production (500 errors return generic message)
- **Request size limits**: 1MB max for JSON and URL-encoded bodies
- **SPA fallback**: index.html served with no-cache for client-side routing
- **Deployment**: Autoscale target configured (npm run build → npm run start)

## Development
```bash
npm run dev  # Starts Express + Vite dev server on port 5000
npm run build  # Production build (client + server)
npm run start  # Run production server
```
