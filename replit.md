# JOE Technologies Website

## Overview
A premium, production-ready website for **JOE Technologies** — an AI-driven software engineering consultancy founded by **Jeffery Onome Emuodafevware**. Built with React/TypeScript on the frontend and Express/Node.js on the backend.

## Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion, TanStack Query, shadcn/ui, react-icons
- **Backend**: Express.js (Node.js), in-memory storage
- **Build**: Vite (frontend), tsx (backend)
- **Forms**: react-hook-form + zod validation

### Project Structure
```
client/src/
  pages/home.tsx              — Main single-page site
  components/
    Navigation.tsx            — Sticky header with smooth scroll, mobile menu
    HeroSection.tsx           — Full-screen hero with animated code terminal
    AboutSection.tsx          — Founder bio, achievements, values
    ServicesSection.tsx       — 6 service cards with icons and tags
    ProcessSection.tsx        — 5-step numbered process timeline
    TechStackSection.tsx      — Tech categories with react-icons logos
    PortfolioSection.tsx      — 4 case studies with metrics
    TestimonialsSection.tsx   — 3 client testimonials
    ContactSection.tsx        — Contact form + WhatsApp CTA + info
    Footer.tsx                — Links, social icons, scroll-to-top
    WhatsAppButton.tsx        — Floating WhatsApp button (bottom-right)
server/
  index.ts                    — Express server entry
  routes.ts                   — POST /api/contact, GET /api/contacts
  storage.ts                  — MemStorage with contact submissions
shared/
  schema.ts                   — Drizzle/Zod schemas for users and contacts
```

## Key Features
- **Dark-tech luxury design**: Deep navy/black backgrounds, electric blue/cyan accents, gradient text
- **Fully responsive**: Mobile-first with hamburger nav, responsive grids
- **Smooth scroll navigation**: Anchor-based with JS smooth scroll
- **Contact form**: Validated with Zod, posts to `/api/contact`, success/error states
- **WhatsApp integration**: Floating button + form button linking to WhatsApp chat
- **Framer Motion animations**: Scroll-triggered section reveals, hero type animation
- **SEO optimized**: Title, meta description, OG tags, canonical URL, skip link
- **Accessibility**: Skip link, aria-labels, aria-expanded, semantic HTML, focus-visible styles
- **React Icons**: Simple Icons for tech stack logos (SiPython, SiDjango, etc.)

## Design System
- **Primary color**: Electric blue/cyan (#00c8ff, #0066ff)
- **Background**: Near-black navy (#04060d, #060a15, #070b14)
- **Accent**: Purple (#7c3aed), Green (#00ff88)
- **Typography**: Space Grotesk (headings via font-heading), Inter (body)
- **Dark mode**: Always-on dark mode (html class="dark")

## API Endpoints
- `POST /api/contact` — Accepts {name, email, message, company?, phone?, service?}, validates with Zod
- `GET /api/contacts` — Returns all contact submissions

## Development
```bash
npm run dev  # Starts Express + Vite dev server on port 5000
```

## Sections
1. Hero — Animated code terminal, animated number counters, CTAs
2. Trusted By — Client company name strip with fade-edge scroll
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

## Enhanced Features
- **Scroll progress bar** — Gradient bar across top of page
- **Scroll spy** — Active nav link highlights as user scrolls through sections
- **Theme toggle** — Dark/Light mode switch in navigation (persists via localStorage)
- **Animated counters** — Hero stats count up from 0 when in view
- **JSON-LD structured data** — Organization, Website, ProfessionalService schema

## WhatsApp Configuration
Update the WhatsApp number in:
- `client/src/components/ContactSection.tsx` (two occurrences)
- `client/src/components/WhatsAppButton.tsx`

Change `15559999999` to the actual WhatsApp number.
