import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSeo } from "@/hooks/use-seo";
import {
  MonitorSmartphone, TrendingUp, Search, Zap, Globe, ArrowRight,
  LayoutDashboard, Star, Shield, Target, Palette, Code2,
  CheckCircle2, BarChart3, Users, Eye, Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const accent = "#48F2FB";

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

const capabilities = [
  {
    icon: Globe,
    title: "Brand & Corporate Websites",
    description: "Premium brand sites that communicate authority, build trust, and guide visitors through a clear journey — from first impression to qualified inquiry.",
    accent: "#48F2FB",
  },
  {
    icon: Target,
    title: "Conversion-Optimized Landing Pages",
    description: "High-impact campaign and product landing pages engineered around a single conversion goal — with persuasive copy, social proof, and frictionless CTAs.",
    accent: "#48F2FB",
  },
  {
    icon: Search,
    title: "Technical SEO & Performance",
    description: "Schema markup, Core Web Vitals optimization, semantic HTML, meta strategy, sitemap architecture, and structured data that drives organic growth.",
    accent: "#E867EA",
  },
  {
    icon: LayoutDashboard,
    title: "CMS & Content-Managed Sites",
    description: "Headless CMS setups (Contentful, Sanity, Strapi) and custom admin panels that let your team publish and update content independently.",
    accent: "#00ff88",
  },
  {
    icon: Eye,
    title: "Visual Design & Brand Identity",
    description: "Premium visual design direction, typography systems, color palettes, motion principles, and brand guidelines that elevate your digital presence.",
    accent: "#f59e0b",
  },
  {
    icon: BarChart3,
    title: "Analytics & Conversion Tracking",
    description: "GA4, GTM, conversion event setup, heatmap integration, A/B test frameworks, and dashboards to measure and continuously improve performance.",
    accent: "#ec4899",
  },
];

const metrics = [
  { value: "3s", label: "Average load time", icon: Zap },
  { value: "98", label: "Lighthouse score", icon: Star },
  { value: "Top 3", label: "SEO positioning", icon: TrendingUp },
  { value: "4.8/5", label: "Client rating", icon: Users },
];

const deliverables = [
  { label: "Discovery & Strategy", items: ["Goals & audience workshop", "Competitor analysis", "Sitemap architecture", "Content strategy brief"] },
  { label: "Design & Brand", items: ["Mood board & direction", "High-fidelity mockups", "Responsive breakpoints", "Design system tokens"] },
  { label: "Development", items: ["Pixel-perfect build", "CMS integration", "Performance optimization", "SEO implementation"] },
  { label: "Launch & Growth", items: ["QA across devices", "Analytics setup", "Search console config", "Post-launch support"] },
];

const techStack = [
  { name: "React", color: "#48F2FB" },
  { name: "Next.js", color: "#48F2FB" },
  { name: "TypeScript", color: "#E867EA" },
  { name: "Tailwind CSS", color: "#48F2FB" },
  { name: "Framer Motion", color: "#E867EA" },
  { name: "Contentful", color: "#00ff88" },
  { name: "Sanity", color: "#f59e0b" },
  { name: "Vercel", color: "#48F2FB" },
  { name: "Cloudflare", color: "#f59e0b" },
  { name: "GA4 / GTM", color: "#ec4899" },
];

const useCases = [
  {
    icon: Rocket,
    title: "Launching a new company website",
    description: "From strategy to launch — we design and build a website that communicates your offer, positions your brand, and converts the right visitors into leads.",
  },
  {
    icon: TrendingUp,
    title: "Rebuilding an underperforming site",
    description: "We diagnose what's holding your site back — slow performance, weak messaging, poor UX — and rebuild it as a growth asset for your business.",
  },
  {
    icon: Globe,
    title: "Creating a multi-market web presence",
    description: "Internationalization, multi-language routing, region-specific content, and performance optimization for global audiences across time zones.",
  },
];

export default function WebsiteDesign() {
  useSeo({
    title: "Website Design & Development — Fast, SEO-Ready & Beautiful | JOE Technologies",
    description: "Premium website design and development by JOE Technologies. Fast, beautiful, conversion-optimised websites engineered for businesses and enterprises. Performance-first and built to rank.",
    canonical: "/services/website-design",
    keywords: "website design Nigeria, website development, business website design, landing page design, e-commerce website, SEO website, conversion optimised website, JOE Technologies",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Website Design & Development",
        "provider": { "@id": "https://joetech.com.ng/#organization" },
        "url": "https://joetech.com.ng/services/website-design",
        "description": "Premium, fast, and conversion-optimised website design and development for businesses and enterprises. Performance-first, SEO-ready, and built to rank.",
        "serviceType": "Website Design & Development",
        "areaServed": "Worldwide",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://joetech.com.ng/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://joetech.com.ng/services" },
          { "@type": "ListItem", "position": 3, "name": "Website Design & Development", "item": "https://joetech.com.ng/services/website-design" },
        ],
      },
    ],
  });
  const hero = useScrollInView();
  const caps = useScrollInView();
  const cases = useScrollInView();
  const deliver = useScrollInView();
  const tech = useScrollInView();
  const metricsRef = useScrollInView();
  const cta = useScrollInView();

  return (
    <div>
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "var(--joe-bg-hero)" }}>
        <div className="absolute inset-0" style={{ opacity: "var(--joe-glow-opacity)", backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-3xl pointer-events-none" style={{ background: `radial-gradient(ellipse, ${accent} 0%, transparent 70%)`, opacity: 0.1 }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #48F2FB 0%, transparent 70%)", opacity: 0.07 }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={hero.ref}
            initial={{ opacity: 0, y: 24 }}
            animate={hero.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full" style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}>
              <MonitorSmartphone className="w-4 h-4" style={{ color: accent }} />
              <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Core Service Pillar</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-joe-text mb-5 leading-tight" data-testid="text-website-title">
              Website Design &{" "}
              <span style={{ background: `linear-gradient(135deg, ${accent}, #48F2FB, #E867EA)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Development
              </span>
            </h1>
            <p className="text-joe-text/55 text-xl max-w-2xl mx-auto leading-relaxed mb-8" data-testid="text-website-subtitle">
              Immersive, SEO-ready websites that communicate trust, guide users through clear journeys, and convert attention into action.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-[#48F2FB] to-[#E867EA] text-[#060A10] border-0 font-semibold tracking-wide gap-2 shadow-xl shadow-[#48F2FB]/25" data-testid="button-website-cta">
                  Build Your Website
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="border-joe-text/15 text-joe-text/70 hover:bg-joe-text/5 gap-2">
                  <Eye className="w-4 h-4" />
                  See Examples
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12" style={{ background: "var(--joe-bg-1)", borderBottom: "1px solid var(--joe-card-border-subtle)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  ref={i === 0 ? metricsRef.ref : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={metricsRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center gap-3 p-6 rounded-xl border"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`website-metric-${i}`}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}>
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <span className="font-heading font-bold text-2xl lg:text-3xl" style={{ color: accent }}>{m.value}</span>
                  <span className="text-joe-text/40 text-xs uppercase tracking-wide font-mono">{m.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={caps.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={caps.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Capabilities</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">Everything Your Website Needs</h2>
            <p className="text-joe-text/45 mt-3 max-w-2xl mx-auto">We engineer every layer — design, development, SEO, performance, analytics — so your website becomes a growth engine, not just a digital brochure.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={caps.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="group flex flex-col gap-4 p-7 rounded-xl border hover-elevate transition-all duration-300"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`website-capability-${i}`}
                >
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: `${cap.accent}12`, border: `1px solid ${cap.accent}28` }}>
                    <Icon className="w-5 h-5" style={{ color: cap.accent }} />
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-base leading-snug">{cap.title}</h3>
                  <p className="text-joe-text/50 text-sm leading-relaxed flex-1">{cap.description}</p>
                  <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${cap.accent}30, transparent)` }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={cases.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={cases.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>When You Need Us</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">Common Scenarios</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={cases.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                  className="flex flex-col gap-4 p-7 rounded-xl border"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`website-usecase-${i}`}
                >
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}>
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-base">{uc.title}</h3>
                  <p className="text-joe-text/50 text-sm leading-relaxed">{uc.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={deliver.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={deliver.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Process</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">How We Build It</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={deliver.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="flex flex-col gap-4 p-6 rounded-xl border"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                data-testid={`website-phase-${i}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono" style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-sm">{phase.label}</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-joe-text/50">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-3)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={tech.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={tech.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Technology</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">Web Development Stack</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tech.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {techStack.map((t, i) => (
              <span key={i} className="px-4 py-2 rounded-lg text-sm font-mono font-medium border" style={{ background: `${t.color}10`, borderColor: `${t.color}28`, color: t.color }} data-testid={`website-tech-${i}`}>
                {t.name}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-hero)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={cta.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={cta.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
              <Globe className="w-7 h-7" style={{ color: accent }} />
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mb-4">
              Ready for a Website That{" "}
              <span style={{ background: `linear-gradient(135deg, ${accent}, #48F2FB)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Actually Works?
              </span>
            </h2>
            <p className="text-joe-text/50 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Let's build a website that clearly communicates your value, ranks in search, and converts visitors into clients from day one.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-[#48F2FB] to-[#E867EA] text-[#060A10] border-0 font-semibold tracking-wide gap-2 shadow-xl shadow-[#48F2FB]/20" data-testid="button-website-cta-bottom">
                  Start Your Website
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-joe-text/15 text-joe-text/70 hover:bg-joe-text/5">All Services</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
