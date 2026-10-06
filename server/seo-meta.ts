/**
 * server/seo-meta.ts
 *
 * Per-route meta for SSR injection into index.html.
 *
 * WHY THIS EXISTS
 * ───────────────
 * The site is a client-side React SPA. Every page is served the same
 * static index.html which only carries homepage meta. Social crawlers
 * (LinkedIn, WhatsApp, Facebook, Slack, Twitter) do NOT execute JavaScript,
 * so they always see the homepage title/description for every URL. Google's
 * crawler runs JS but has a finite render budget — getting the right <title>
 * in the raw HTML maximises crawl-budget efficiency and indexing accuracy.
 *
 * SOLUTION
 * ────────
 * The SPA fallback in static.ts calls injectSSRMeta() to replace the title,
 * description, canonical, keywords, and OG/Twitter tags in index.html before
 * sending the response. Results are cached per-route so the regex runs once
 * per unique path for the lifetime of the process.
 */

const BASE = "https://joetech.com.ng";

export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
}

/** Escape HTML attribute values. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const SHARED =
  "JOE Technologies, Nigeria tech company, enterprise software Nigeria, digital transformation Nigeria";

const META: Record<string, RouteMeta> = {
  "/": {
    title: "JOE Technologies — Apps, Websites, Automation, UI/UX & AI Solutions",
    description:
      "JOE Technologies builds high-performance apps, websites, automation systems, UI/UX experiences, and AI-powered solutions for businesses and organisations. We design, engineer, and deploy premium digital platforms that convert, automate, scale, and perform.",
    canonical: `${BASE}/`,
    keywords: `app development, website development, automation systems, UI/UX design, AI solutions, machine learning, software engineering, full-stack development, MLOps, AI integration, ${SHARED}`,
  },
  "/about": {
    title: "About JOE Technologies | Our Vision",
    description:
      "Learn about JOE Technologies, an enterprise digital product and AI solutions company delivering apps, automation, and AI-powered platforms.",
    canonical: `${BASE}/about`,
    keywords: `about JOE Technologies, Jeffery Onome Emuodafevware, AI company, digital product company, ${SHARED}`,
  },
  "/services": {
    title: "Our Services | App Development, AI, Automation & More — JOE Technologies",
    description:
      "Explore JOE Technologies' full range of services: App Development, Website Design, UI/UX Design, Business Automation, AI & Machine Learning, Full-Stack Development, and Technology Advisory.",
    canonical: `${BASE}/services`,
    keywords: `software development services, app development services, website design services, AI development, automation services, UI/UX design, full-stack development, ${SHARED}`,
  },
  "/services/app-development": {
    title: "App Development — iOS, Android & Web Apps | JOE Technologies",
    description:
      "JOE Technologies builds native mobile apps and web applications for iOS, Android, and browser platforms. Cross-platform, performant, and production-ready from day one.",
    canonical: `${BASE}/services/app-development`,
    keywords: `app development, mobile app development Nigeria, iOS app development, Android app development, React Native developer, web app development, SaaS development, ${SHARED}`,
  },
  "/services/website-design": {
    title: "Website Design & Development — Fast, SEO-Ready & Beautiful | JOE Technologies",
    description:
      "Premium website design and development by JOE Technologies. Fast, beautiful, conversion-optimised websites engineered for businesses and enterprises. Performance-first and built to rank.",
    canonical: `${BASE}/services/website-design`,
    keywords: `website design Nigeria, website development, business website design, landing page design, e-commerce website, SEO website, conversion optimised website, ${SHARED}`,
  },
  "/services/uiux-design": {
    title: "UI/UX Design — User-Centred & Conversion-Focused | JOE Technologies",
    description:
      "User-centred UI/UX design by JOE Technologies. Interface design, user research, prototyping, and experience engineering that converts visitors to customers.",
    canonical: `${BASE}/services/uiux-design`,
    keywords: `UI UX design, user interface design, user experience design, product design, mobile UI design, web design system, UX research, ${SHARED}`,
  },
  "/services/automation": {
    title: "Business Process Automation — Custom Workflows & Pipelines | JOE Technologies",
    description:
      "Business process automation by JOE Technologies. Eliminate manual workflows, integrate APIs, and scale operations automatically. Custom automation pipelines built for your business.",
    canonical: `${BASE}/services/automation`,
    keywords: `business process automation, workflow automation, API integration, robotic process automation, RPA, automation systems, Zapier alternative, n8n, ${SHARED}`,
  },
  "/services/ai-strategy": {
    title: "AI Strategy & Architecture Consulting | JOE Technologies",
    description:
      "AI strategy and architecture consulting from JOE Technologies. Define your AI roadmap, choose the right models, architect your data pipelines, and deploy with confidence.",
    canonical: `${BASE}/services/ai-strategy`,
    keywords: `AI strategy consulting, AI roadmap, AI architecture, machine learning strategy, enterprise AI adoption, AI consulting Nigeria, ${SHARED}`,
  },
  "/services/custom-ai": {
    title: "Custom AI & Machine Learning Development | JOE Technologies",
    description:
      "Custom AI and machine learning development by JOE Technologies. NLP, computer vision, predictive analytics, LLMs, and production ML systems built for your specific use case.",
    canonical: `${BASE}/services/custom-ai`,
    keywords: `custom AI development, machine learning development, NLP, computer vision, LLM development, GPT integration, predictive analytics, AI model training, ${SHARED}`,
  },
  "/services/mlops": {
    title: "MLOps & AI Infrastructure Engineering | JOE Technologies",
    description:
      "MLOps and AI infrastructure engineering by JOE Technologies. Model serving, monitoring, CI/CD for ML, and production deployment of machine learning systems at scale.",
    canonical: `${BASE}/services/mlops`,
    keywords: `MLOps, machine learning operations, model deployment, model monitoring, ML pipeline, AI infrastructure, Kubernetes ML, model serving, ${SHARED}`,
  },
  "/services/ai-integration": {
    title: "AI Integration & API Development | JOE Technologies",
    description:
      "AI integration and API development by JOE Technologies. Connect LLMs, ML models, and AI services to your existing systems via robust, scalable API layers.",
    canonical: `${BASE}/services/ai-integration`,
    keywords: `AI integration, API development, LLM integration, OpenAI API integration, REST API, GraphQL API, AI-powered applications, ${SHARED}`,
  },
  "/services/full-stack": {
    title: "Full-Stack Digital Systems Development | JOE Technologies",
    description:
      "Full-stack development by JOE Technologies. End-to-end engineering from database to frontend, API design to cloud deployment. Complete digital systems built for scale.",
    canonical: `${BASE}/services/full-stack`,
    keywords: `full stack development, full stack engineer, React developer, Django developer, Node.js developer, PostgreSQL, cloud deployment, digital systems, ${SHARED}`,
  },
  "/services/advisory": {
    title: "Technology Advisory & Digital Strategy Consulting | JOE Technologies",
    description:
      "Technology advisory and digital strategy consulting by JOE Technologies. Expert guidance for digital transformation, technology selection, and AI adoption at every scale.",
    canonical: `${BASE}/services/advisory`,
    keywords: `technology advisory, digital strategy consulting, CTO advisory, technology consulting, digital transformation consulting, tech due diligence, ${SHARED}`,
  },
  "/portfolio": {
    title: "Portfolio & Case Studies — Apps, AI & Automation | JOE Technologies",
    description:
      "View JOE Technologies' portfolio of delivered apps, websites, automation systems, AI solutions, and digital platforms for businesses worldwide. Real results, real impact.",
    canonical: `${BASE}/portfolio`,
    keywords: `JOE Technologies portfolio, software case studies, app development portfolio, AI projects portfolio, digital products showcase, ${SHARED}`,
  },
  "/why-us": {
    title: "Why Choose JOE Technologies | Our Difference",
    description:
      "Discover why businesses choose JOE Technologies. Systems-first engineering, full-stack ownership, outcomes-focused delivery, and deep AI expertise — we build what others can't.",
    canonical: `${BASE}/why-us`,
    keywords: `why choose JOE Technologies, best software company Nigeria, best AI company Nigeria, enterprise software partner, top tech company Africa, ${SHARED}`,
  },
  "/process": {
    title: "Our Engineering Process — Discovery to Deployment | JOE Technologies",
    description:
      "How JOE Technologies engineers your solution — a proven 5-step process covering discovery, architecture, development, deployment, and continuous optimisation for quality delivery.",
    canonical: `${BASE}/process`,
    keywords: `software development process, agile engineering, project delivery methodology, software development lifecycle, tech project management, ${SHARED}`,
  },
  "/tech-stack": {
    title: "Technology Stack — AI, Backend, Frontend & Cloud | JOE Technologies",
    description:
      "Explore the enterprise technology stack that powers JOE Technologies: Python, Django, React, TypeScript, PyTorch, TensorFlow, PostgreSQL, Docker, Kubernetes, and more.",
    canonical: `${BASE}/tech-stack`,
    keywords: `technology stack, Python Django, React TypeScript, PyTorch TensorFlow, PostgreSQL Docker, Kubernetes AI, software engineering tools, ${SHARED}`,
  },
  "/faq": {
    title: "Frequently Asked Questions — Working with JOE Technologies",
    description:
      "Answers to common questions about working with JOE Technologies: how to get started, timelines, pricing, engagement models, technical capabilities, and post-launch support.",
    canonical: `${BASE}/faq`,
    keywords: `JOE Technologies FAQ, software development FAQ, how to hire tech company, app development cost, project timeline, engagement models, ${SHARED}`,
  },
  "/contact": {
    title: "Contact JOE Technologies — Start Your Project Today",
    description:
      "Get in touch with JOE Technologies to discuss your project. Start your app, website, automation, or AI solution today. We respond within 24 hours.",
    canonical: `${BASE}/contact`,
    keywords: `contact JOE Technologies, hire software engineers, start a project, get a quote, tech company Nigeria, software engineers Nigeria, ${SHARED}`,
  },
  "/qualify": {
    title: "Qualify Your Project | JOE Technologies",
    description:
      "Tell us about your project and find out if JOE Technologies is the right partner for your needs.",
    canonical: `${BASE}/qualify`,
    keywords: `start a project JOE Technologies, qualify project, consultation, ${SHARED}`,
  },
  "/privacy": {
    title: "Privacy Policy | JOE Technologies",
    description:
      "JOE Technologies privacy policy. How we collect, use, and protect your personal data in accordance with applicable data protection laws.",
    canonical: `${BASE}/privacy`,
    keywords: `JOE Technologies privacy policy, data protection, GDPR, personal data`,
  },
  "/terms": {
    title: "Terms of Service | JOE Technologies",
    description:
      "JOE Technologies terms of service. The legal terms governing use of our website and engagement with our services.",
    canonical: `${BASE}/terms`,
    keywords: `JOE Technologies terms of service, legal terms, service agreement`,
  },
  "/cookies": {
    title: "Cookie Policy | JOE Technologies",
    description:
      "JOE Technologies cookie policy. How we use cookies and similar tracking technologies on our website.",
    canonical: `${BASE}/cookies`,
    keywords: `JOE Technologies cookie policy, cookies, tracking technologies`,
  },
};

/**
 * Return the meta for a given pathname.
 * Falls back to the homepage meta for unknown routes.
 */
export function getRouteMeta(pathname: string): RouteMeta {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  return META[normalized] ?? META["/"]!;
}

/**
 * Replace title, description, keywords, canonical, OG, and Twitter tags in
 * the index.html string with the route-specific values.
 *
 * This runs at most once per unique route per process lifetime because
 * static.ts caches the result. The regex patterns are purposely conservative
 * and match only the exact attribute patterns produced by index.html — they
 * will not corrupt unrelated markup.
 */
export function injectSSRMeta(html: string, meta: RouteMeta): string {
  const { title, description, canonical, keywords } = meta;
  const t = esc(title);
  const d = esc(description);
  const c = esc(canonical);
  const k = esc(keywords);

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/,  `$1${d}$2`)
    .replace(/(<meta\s+name="keywords"\s+content=")[^"]*(")/,     `$1${k}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/,        `$1${c}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/,   `$1${c}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/,       `$1${t}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/,  `$1${d}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,       `$1${t}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,  `$1${d}$2`);
}
