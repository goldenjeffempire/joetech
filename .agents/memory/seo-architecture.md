---
name: SEO Architecture
description: How SEO is structured across the JOE Technologies site — SSR meta injection, JSON-LD schemas, sitemap, robots.txt, and the useSeo hook.
---

## SSR Meta Injection (server/seo-meta.ts + server/static.ts)

The site is a client-side React SPA. Without SSR meta injection, every URL served
the same homepage title/description in raw HTML — social crawlers (LinkedIn, WhatsApp,
Facebook) that don't run JS would show wrong previews for all pages.

**Fix:** `server/seo-meta.ts` contains a `META` record mapping every route path to
its { title, description, canonical, keywords }. `server/static.ts`'s `serveSPAFallback`
reads index.html once, then for each request calls `injectSSRMeta(baseHtml, meta)`
which does regex replacements on `<title>`, meta description, keywords, canonical,
og:url, og:title, og:description, twitter:title, twitter:description. Results cached
per-route (Map) — regex only runs once per path per process lifetime.

**Why:** `req.path` in `app.use("/{*path}", ...)` strips the leading slash in Express 5
(returns `"about"` not `"/about"`). Must use `req.originalUrl.split("?")[0]` instead.

## useSeo hook (client/src/hooks/use-seo.ts)

Client-side hook updates document.title + all meta tags on route change. Accepts:
- title, description, canonical, ogImage, noindex, keywords, schema (object | object[])
Supports schema as an array — use this to combine multiple JSON-LD types (e.g.
Service + BreadcrumbList for service pages, AboutPage + Person[] for the about page).

## JSON-LD Schema coverage

| Page | Schema type(s) |
|---|---|
| Home | WebPage |
| About | AboutPage + Person (Jeffery) + Person (Dominion) |
| Services index | ItemList (10 services) |
| Each service page | [Service, BreadcrumbList] |
| Portfolio | CollectionPage |
| Contact | [ContactPage, LocalBusiness] |
| FAQ | FAQPage with all 11 Q&A mainEntity items |
| Process | HowTo with all 5 steps |
| Why Us | WebPage |
| Tech Stack | WebPage + nested ItemList of 18 technologies |
| Site-wide (index.html) | Organization + WebSite (static JSON-LD) |

## robots.txt

Blocks AI training bots: GPTBot, ChatGPT-User, CCBot, anthropic-ai, ClaudeBot,
PerplexityBot, Bytespider, cohere-ai, AI2Bot, DuckAssistBot, FacebookBot,
Applebot-Extended, YouBot, PetalBot. References both sitemap.xml and sitemap-images.xml.

## Sitemap

- `/sitemap.xml` — 22 pages with priority/changefreq; includes xsi schema declaration
- `/sitemap-images.xml` — image sitemap with Google image namespace for homepage + about

## Chunk splitting (vite.config.ts) — critical for correctness

@floating-ui/react-dom contains "/react-dom/" in its path and was accidentally
routed to vendor-react by the old `id.includes("/react-dom/")` check. Fixed by:
1. Adding `@floating-ui` to the vendor-radix group (listed BEFORE react checks)
2. Using regex `/[/\\]node_modules[/\\](react|react-dom|scheduler)[/\\]/` for
   vendor-react to match exact package boundaries only.
Incorrect chunk assignment corrupts CJS interop and causes:
  "Cannot set properties of undefined (setting 'Children')"
