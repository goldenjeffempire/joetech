import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSeo } from "@/hooks/use-seo";
import {
  Workflow, Zap, BarChart3, GitBranch, ArrowRight,
  RefreshCw, Database, Bell, Settings, Network,
  CheckCircle2, TrendingUp, Clock, Shield, Bot, Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const accent = "#E867EA";

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

const capabilities = [
  {
    icon: Workflow,
    title: "Business Process Automation",
    description: "Map, digitize, and automate complex business processes — approvals, escalations, notifications, and multi-step workflows that run without manual intervention.",
    accent: "#E867EA",
  },
  {
    icon: RefreshCw,
    title: "Systems Integration & APIs",
    description: "Connect your CRM, ERP, ecommerce, payments, calendars, and communication tools into a unified data layer with bidirectional real-time sync.",
    accent: "#48F2FB",
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics Dashboards",
    description: "Live operational dashboards, automated report generation, KPI tracking, and scheduled data exports — built to surface insights without manual effort.",
    accent: "#48F2FB",
  },
  {
    icon: Bot,
    title: "AI-Assisted Workflow Automation",
    description: "Embed intelligent agents into your workflows — document routing, email triage, task assignment, content summarization, and decision-support automation.",
    accent: "#00ff88",
  },
  {
    icon: Bell,
    title: "Event-Driven Notification Systems",
    description: "Smart alerting systems that monitor thresholds, trigger multi-channel notifications (email, SMS, Slack, WhatsApp), and escalate intelligently based on rules.",
    accent: "#f59e0b",
  },
  {
    icon: Database,
    title: "Data Pipeline Engineering",
    description: "ETL pipelines, data transformation layers, scheduled batch jobs, and clean data architectures that power downstream analytics and operational intelligence.",
    accent: "#ec4899",
  },
];

const metrics = [
  { value: "10x", label: "Avg. workflow gains", icon: TrendingUp },
  { value: "80%", label: "Manual task reduction", icon: Clock },
  { value: "99.9%", label: "Pipeline uptime", icon: Shield },
  { value: "< 2wks", label: "First automation live", icon: Zap },
];

const deliverables = [
  { label: "Process Discovery", items: ["Current-state mapping", "Pain point audit", "Automation opportunity scoring", "ROI estimation"] },
  { label: "System Design", items: ["Workflow architecture", "Integration mapping", "Data model design", "Trigger & rule logic"] },
  { label: "Build & Connect", items: ["Automation engine build", "API integrations", "Dashboard development", "Testing & validation"] },
  { label: "Deploy & Monitor", items: ["Production deployment", "Monitoring setup", "Error alerting", "Optimization loop"] },
];

const techStack = [
  { name: "Python", color: "#E867EA" },
  { name: "FastAPI", color: "#48F2FB" },
  { name: "Celery", color: "#48F2FB" },
  { name: "Redis", color: "#ec4899" },
  { name: "PostgreSQL", color: "#E867EA" },
  { name: "Zapier / n8n", color: "#00ff88" },
  { name: "Webhooks", color: "#48F2FB" },
  { name: "Docker", color: "#48F2FB" },
  { name: "AWS Lambda", color: "#f59e0b" },
  { name: "Kafka", color: "#E867EA" },
];

const useCases = [
  {
    icon: Workflow,
    title: "Eliminating manual, repetitive operations",
    description: "We identify what your team does repeatedly — approvals, data entry, report generation, notifications — and automate it so they can focus on higher-value work.",
  },
  {
    icon: Network,
    title: "Connecting disconnected business tools",
    description: "When your CRM, billing system, project management tool, and comms platform don't talk — we build the integration layer that ties everything together seamlessly.",
  },
  {
    icon: BarChart3,
    title: "Building operational visibility dashboards",
    description: "We create live, role-specific dashboards that give leadership, operations, and sales teams real-time insight without waiting for manual reports.",
  },
];

export default function AutomationSystems() {
  useSeo({
    title: "Business Process Automation Systems",
    description: "Business process automation by JOE Technologies. Eliminate manual workflows, integrate APIs, and scale operations automatically. Custom automation pipelines built for your business.",
    canonical: "/services/automation",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Process Automation Systems",
      "provider": { "@id": "https://joetechnologies.io/#organization" },
      "url": "https://joetechnologies.io/services/automation",
      "description": "Custom business process automation and workflow engineering.",
      "serviceType": "Process Automation",
      "areaServed": "Worldwide",
    },
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
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #48F2FB 0%, transparent 70%)", opacity: 0.06 }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={hero.ref}
            initial={{ opacity: 0, y: 24 }}
            animate={hero.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full" style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}>
              <Workflow className="w-4 h-4" style={{ color: accent }} />
              <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Core Service Pillar</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-joe-text mb-5 leading-tight" data-testid="text-automation-title">
              Automation Systems &{" "}
              <span style={{ background: `linear-gradient(135deg, ${accent}, #E867EA)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Process Optimization
              </span>
            </h1>
            <p className="text-joe-text/55 text-xl max-w-2xl mx-auto leading-relaxed mb-8" data-testid="text-automation-subtitle">
              Business process optimization, workflow automation, integrations, and reporting systems that reduce manual work, eliminate errors, and improve operational visibility.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="text-white border-0 font-semibold tracking-wide gap-2 shadow-xl" style={{ background: `linear-gradient(135deg, ${accent}, #48F2FB)`, boxShadow: `0 12px 40px ${accent}25` }} data-testid="button-automation-cta">
                  Automate Your Business
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="border-joe-text/15 text-joe-text/70 hover:bg-joe-text/5 gap-2">
                  <BarChart3 className="w-4 h-4" />
                  See Case Studies
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
                  data-testid={`automation-metric-${i}`}
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
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">Automation Capabilities</h2>
            <p className="text-joe-text/45 mt-3 max-w-2xl mx-auto">We replace manual effort with intelligent systems — from simple workflow triggers to complex multi-system orchestration pipelines.</p>
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
                  data-testid={`automation-capability-${i}`}
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
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">Common Automation Scenarios</h2>
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
                  data-testid={`automation-usecase-${i}`}
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
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Engagement Model</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">How We Automate Your Business</h2>
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
                data-testid={`automation-phase-${i}`}
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
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">Automation Stack</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tech.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {techStack.map((t, i) => (
              <span key={i} className="px-4 py-2 rounded-lg text-sm font-mono font-medium border" style={{ background: `${t.color}10`, borderColor: `${t.color}28`, color: t.color }} data-testid={`automation-tech-${i}`}>
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
              <Cpu className="w-7 h-7" style={{ color: accent }} />
            </div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mb-4">
              Ready to Stop Doing Things{" "}
              <span style={{ background: `linear-gradient(135deg, ${accent}, #48F2FB)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Manually?
              </span>
            </h2>
            <p className="text-joe-text/50 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Let's map your operations and build the automation layer that gives your team back time, eliminates errors, and surfaces real-time business intelligence.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="text-white border-0 font-semibold tracking-wide gap-2 shadow-xl" style={{ background: `linear-gradient(135deg, ${accent}, #48F2FB)`, boxShadow: `0 12px 40px ${accent}25` }} data-testid="button-automation-cta-bottom">
                  Start Automating
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
