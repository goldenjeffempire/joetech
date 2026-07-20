import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSeo } from "@/hooks/use-seo";
import {
  Smartphone, Globe, Layers, Zap, Shield, ArrowRight,
  Code2, Database, RefreshCw, BarChart3, Users, CheckCircle2,
  MonitorSmartphone, Cpu, GitBranch, Rocket, Star, Clock
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
    icon: Smartphone,
    title: "Native & Cross-Platform Mobile Apps",
    description: "iOS and Android apps built with React Native or native SDKs — responsive, fast, and feature-rich with offline support, push notifications, and deep-linking.",
    accent: "#48F2FB",
  },
  {
    icon: Globe,
    title: "Web Application Development",
    description: "Full-featured browser apps, SaaS platforms, customer portals, and progressive web apps built for performance, scalability, and usability at any scale.",
    accent: "#48F2FB",
  },
  {
    icon: Layers,
    title: "SaaS Product Engineering",
    description: "End-to-end SaaS platforms with multi-tenancy, billing integration, user management, role-based access control, and scalable microservice architectures.",
    accent: "#E867EA",
  },
  {
    icon: BarChart3,
    title: "Admin Dashboards & Internal Tools",
    description: "Purpose-built operations dashboards, data visualization platforms, and internal productivity tools that streamline your team's workflows.",
    accent: "#00ff88",
  },
  {
    icon: RefreshCw,
    title: "Legacy System Modernization",
    description: "Migrate aging monoliths and outdated tech stacks to modern, maintainable architectures without disrupting your users or business operations.",
    accent: "#f59e0b",
  },
  {
    icon: Users,
    title: "Client-Facing Portals",
    description: "Secure, branded portals where your clients can manage accounts, access reports, submit requests, and interact with your services digitally.",
    accent: "#ec4899",
  },
];

const deliverables = [
  { label: "Discovery & Architecture", items: ["Requirements workshop", "User flow mapping", "Technical system design", "Database schema planning"] },
  { label: "Design & Prototyping", items: ["Wireframes & user flows", "High-fidelity UI prototypes", "Component library setup", "Design system documentation"] },
  { label: "Development", items: ["Frontend development", "Backend API development", "Third-party integrations", "Real-time feature engineering"] },
  { label: "Launch & Scale", items: ["QA & performance testing", "CI/CD pipeline setup", "Cloud deployment", "Post-launch monitoring"] },
];

const metrics = [
  { value: "50+", label: "Apps shipped", icon: Rocket },
  { value: "4.9/5", label: "Client rating", icon: Star },
  { value: "< 3s", label: "Average load time", icon: Zap },
  { value: "99.9%", label: "Uptime SLA", icon: Shield },
];

const techStack = [
  { name: "React Native", color: "#48F2FB" },
  { name: "React", color: "#48F2FB" },
  { name: "TypeScript", color: "#E867EA" },
  { name: "Next.js", color: "#48F2FB" },
  { name: "Django", color: "#00ff88" },
  { name: "FastAPI", color: "#48F2FB" },
  { name: "Node.js", color: "#00ff88" },
  { name: "PostgreSQL", color: "#E867EA" },
  { name: "Redis", color: "#ec4899" },
  { name: "Docker", color: "#48F2FB" },
  { name: "AWS", color: "#f59e0b" },
  { name: "Firebase", color: "#f59e0b" },
];

const useCases = [
  {
    icon: Smartphone,
    title: "Launching a new mobile product",
    description: "We take your idea from zero to App Store and Google Play — architecture, UI, backend, APIs, and deployment — with a polished experience that users love.",
  },
  {
    icon: MonitorSmartphone,
    title: "Building a customer-facing SaaS",
    description: "Subscription billing, team management, onboarding flows, usage dashboards — we build complete SaaS products ready to acquire and retain customers.",
  },
  {
    icon: Cpu,
    title: "Replacing manual workflows with apps",
    description: "Replace spreadsheets, paper forms, and manual processes with purpose-built tools that eliminate errors, save time, and give managers full visibility.",
  },
];

export default function AppDevelopment() {
  useSeo({
    title: "App Development — iOS, Android & Web Apps | JOE Technologies",
    description: "JOE Technologies builds native mobile apps and web applications for iOS, Android, and browser platforms. Cross-platform, performant, and production-ready from day one.",
    canonical: "/services/app-development",
    keywords: "app development, mobile app development Nigeria, iOS app development, Android app development, React Native developer, web app development, SaaS development, JOE Technologies",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "App Development",
        "provider": { "@id": "https://joetech.com.ng/#organization" },
        "url": "https://joetech.com.ng/services/app-development",
        "description": "Native and cross-platform mobile app development for iOS and Android, plus web application engineering for SaaS platforms and customer portals.",
        "serviceType": "App Development",
        "areaServed": "Worldwide",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://joetech.com.ng/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://joetech.com.ng/services" },
          { "@type": "ListItem", "position": 3, "name": "App Development", "item": "https://joetech.com.ng/services/app-development" },
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
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: "var(--joe-bg-hero)" }}
      >
        <div className="absolute inset-0" style={{ opacity: "var(--joe-glow-opacity)", backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-3xl pointer-events-none" style={{ background: `radial-gradient(ellipse, ${accent} 0%, transparent 70%)`, opacity: 0.1 }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #E867EA 0%, transparent 70%)", opacity: 0.07 }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={hero.ref}
            initial={{ opacity: 0, y: 24 }}
            animate={hero.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full"
              style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}
            >
              <Smartphone className="w-4 h-4" style={{ color: accent }} />
              <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Core Service Pillar</span>
            </div>
            <h1
              className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-joe-text mb-5 leading-tight"
              data-testid="text-app-dev-title"
            >
              Application{" "}
              <span style={{ background: `linear-gradient(135deg, ${accent}, #48F2FB, #E867EA)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Development
              </span>
            </h1>
            <p className="text-joe-text/55 text-xl max-w-2xl mx-auto leading-relaxed mb-8" data-testid="text-app-dev-subtitle">
              Premium web and mobile apps engineered for speed, usability, conversion, and long-term growth. From idea to App Store — we build everything.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-[#48F2FB] to-[#E867EA] text-[#060A10] border-0 font-semibold tracking-wide gap-2 shadow-xl shadow-[#48F2FB]/25" data-testid="button-app-dev-cta">
                  Start Your App Project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="border-joe-text/15 text-joe-text/70 hover:bg-joe-text/5 gap-2">
                  <Code2 className="w-4 h-4" />
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
                  data-testid={`app-dev-metric-${i}`}
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
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>What We Build</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">
              Full-Spectrum App Capabilities
            </h2>
            <p className="text-joe-text/45 mt-3 max-w-2xl mx-auto">
              From mobile-first consumer experiences to enterprise-grade SaaS platforms — we design and engineer the complete product.
            </p>
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
                  data-testid={`app-dev-capability-${i}`}
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
                  data-testid={`app-dev-usecase-${i}`}
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
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Our Process</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">What We Deliver, Phase by Phase</h2>
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
                data-testid={`app-dev-phase-${i}`}
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
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">Our App Development Stack</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tech.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {techStack.map((t, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-lg text-sm font-mono font-medium border"
                style={{ background: `${t.color}10`, borderColor: `${t.color}28`, color: t.color }}
                data-testid={`app-dev-tech-${i}`}
              >
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
              <Rocket className="w-7 h-7" style={{ color: accent }} />
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mb-4">
              Ready to Build Your{" "}
              <span style={{ background: `linear-gradient(135deg, ${accent}, #48F2FB)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Application?
              </span>
            </h2>
            <p className="text-joe-text/50 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Tell us what you're building. We'll architect, design, and engineer it — from concept to a production-ready product your users love.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-[#48F2FB] to-[#E867EA] text-[#060A10] border-0 font-semibold tracking-wide gap-2 shadow-xl shadow-[#48F2FB]/20" data-testid="button-app-dev-cta-bottom">
                  Start Your Project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-joe-text/15 text-joe-text/70 hover:bg-joe-text/5">
                  All Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
