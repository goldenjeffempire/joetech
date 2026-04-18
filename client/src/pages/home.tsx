import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  Brain, Code2, Layers, ArrowRight, ArrowUpRight,
  TrendingUp, Clock, Zap, Server, GitBranch, BarChart3,
  CheckCircle2, Database, Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/use-page-title";
import HeroSection from "@/components/HeroSection";
import TrustedBySection from "@/components/TrustedBySection";
import TestimonialsSection from "@/components/TestimonialsSection";

const previewServices = [
  {
    icon: Brain,
    title: "AI Strategy & Architecture",
    description: "We assess your business context, define the AI opportunities with highest ROI, and architect a roadmap from prototype to production-scale deployment.",
    tags: ["LLMs", "MLOps", "Architecture Reviews"],
    accent: "#00c8ff",
    slug: "ai-strategy",
    badge: "Most Popular",
  },
  {
    icon: Code2,
    title: "Custom AI Development",
    description: "From fine-tuned language models to computer vision pipelines — we build bespoke AI systems trained on your data, optimized for your domain.",
    tags: ["Python", "PyTorch", "Transformers", "Django"],
    accent: "#0066ff",
    slug: "custom-ai",
    badge: null,
  },
  {
    icon: Layers,
    title: "Full-Stack Development",
    description: "End-to-end development from React frontends to Django backends. We build the complete product — not just the AI layer.",
    tags: ["React", "Django", "TypeScript", "PostgreSQL"],
    accent: "#7c3aed",
    slug: "full-stack",
    badge: null,
  },
];

const previewCaseStudies = [
  {
    tag: "FinTech",
    tagColor: "#00c8ff",
    title: "IntelliCode Review Platform",
    client: "Series B SaaS Startup",
    description: "Built an AI-powered code review system that automatically detects security vulnerabilities, performance bottlenecks, and code quality issues — integrated directly into GitHub PRs.",
    stack: ["Python", "CodeLlama", "Django", "React", "PostgreSQL"],
    metrics: [
      { icon: Clock, value: "73%", label: "Faster reviews" },
      { icon: TrendingUp, value: "91%", label: "Bug catch rate" },
      { icon: Zap, value: "4x", label: "Deploy frequency" },
    ],
    accent: "#00c8ff",
  },
  {
    tag: "Healthcare",
    tagColor: "#00ff88",
    title: "HealthSense Predictive Analytics",
    client: "Regional Hospital Network",
    description: "Deployed a machine learning platform that predicts patient readmission risk, enabling care teams to intervene proactively and reduce unnecessary hospital stays.",
    stack: ["Python", "scikit-learn", "BERT", "FastAPI", "PostgreSQL", "AWS"],
    metrics: [
      { icon: TrendingUp, value: "91%", label: "Prediction accuracy" },
      { icon: Clock, value: "38%", label: "Readmission reduction" },
      { icon: Zap, value: "$4.6M", label: "Annual savings" },
    ],
    accent: "#00ff88",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Scoping",
    description: "Deep-dive into your business context, technical landscape, and AI opportunities with highest ROI.",
    icon: BarChart3,
    accent: "#00c8ff",
  },
  {
    number: "02",
    title: "Architecture Design",
    description: "Build a production-ready technical blueprint — models, data pipelines, APIs, and deployment strategy.",
    icon: GitBranch,
    accent: "#0066ff",
  },
  {
    number: "03",
    title: "Development & Training",
    description: "Iterate rapidly with clean code, custom models trained on your data, and full test coverage.",
    icon: Cpu,
    accent: "#7c3aed",
  },
  {
    number: "04",
    title: "Deploy & Scale",
    description: "Ship to production with CI/CD pipelines, monitoring dashboards, and ongoing performance optimization.",
    icon: Server,
    accent: "#00ff88",
  },
];

const impactMetrics = [
  { value: "50+", label: "AI Systems in Production", icon: Database, accent: "#00c8ff" },
  { value: "98%", label: "Client Satisfaction Rate", icon: CheckCircle2, accent: "#00ff88" },
  { value: "10x", label: "Average Performance Gains", icon: Zap, accent: "#0066ff" },
  { value: "$12M+", label: "Value Delivered for Clients", icon: TrendingUp, accent: "#7c3aed" },
];

export default function Home() {
  usePageTitle("Home");

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <HeroSection />
      <TrustedBySection />
      <ImpactMetrics />
      <ServicesPreview />
      <ProcessSection />
      <PortfolioHighlights />
      <TestimonialsSection />
      <CTABanner />
    </div>
  );
}

function ImpactMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden"
      style={{
        background: "var(--joe-bg-1)",
        borderBottom: "1px solid var(--joe-card-border-subtle)",
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #0066ff 0%, transparent 70%)", opacity: 0.07 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {impactMetrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-xl border hover-elevate cursor-default"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                data-testid={`impact-metric-${i}`}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-1"
                  style={{ background: `${m.accent}12`, border: `1px solid ${m.accent}25` }}
                >
                  <Icon className="w-5 h-5" style={{ color: m.accent }} />
                </div>
                <span
                  className="font-heading font-bold text-3xl lg:text-4xl"
                  style={{ color: m.accent }}
                >
                  {m.value}
                </span>
                <span className="text-joe-text/45 text-xs uppercase tracking-wide font-mono leading-snug">
                  {m.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #0066ff 0%, transparent 70%)", opacity: 0.08 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">What We Do</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            Services That{" "}
            <span className="text-gradient-blue">Move the Needle</span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            Every engagement is built around delivering measurable business outcomes —
            not just impressive demos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group flex flex-col gap-5 p-7 rounded-xl border hover-elevate cursor-default transition-all duration-300 relative overflow-hidden"
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`home-service-card-${i}`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${service.accent}60, transparent)`,
                    opacity: 0,
                  }}
                />

                {service.badge && (
                  <div
                    className="absolute top-5 right-5 text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${service.accent}15`,
                      color: service.accent,
                      border: `1px solid ${service.accent}30`,
                    }}
                  >
                    {service.badge}
                  </div>
                )}

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${service.accent}12`,
                    border: `1px solid ${service.accent}25`,
                    boxShadow: `0 0 20px ${service.accent}10`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: service.accent }} />
                </div>

                <div className="flex-1">
                  <h3 className="font-heading font-bold text-joe-text text-lg mb-2">{service.title}</h3>
                  <p className="text-joe-text/50 text-sm leading-relaxed">{service.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium border"
                      style={{
                        background: `${service.accent}08`,
                        borderColor: `${service.accent}22`,
                        color: service.accent,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all mt-1 group/link"
                  style={{ color: service.accent }}
                  data-testid={`link-home-service-learn-more-${i}`}
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide gap-2 shadow-xl shadow-[#00c8ff]/15 hover:shadow-[#00c8ff]/30 transition-shadow duration-300"
              data-testid="button-home-services-cta"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">How It Works</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            From Idea to{" "}
            <span className="text-gradient-cyber">Production</span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
            A proven, structured process that minimizes risk and maximizes velocity — every time.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="relative flex flex-col gap-4 p-6 rounded-xl border hover-elevate cursor-default"
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`process-step-${i}`}
              >
                {i < processSteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 -right-3 w-6 h-px z-20"
                    style={{ background: `linear-gradient(90deg, ${step.accent}60, transparent)` }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <span
                    className="font-heading font-bold text-3xl leading-none"
                    style={{ color: `${step.accent}30` }}
                  >
                    {step.number}
                  </span>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${step.accent}12`, border: `1px solid ${step.accent}25` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: step.accent }} />
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-joe-text text-base mb-2">{step.title}</h3>
                  <p className="text-joe-text/45 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/process">
            <Button
              size="lg"
              variant="outline"
              className="border-joe-text/15 text-joe-text/70 bg-joe-text/5 font-semibold gap-2"
              data-testid="button-home-process-cta"
            >
              See Full Process
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function PortfolioHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)", opacity: 0.07 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Case Studies</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            AI That Delivers{" "}
            <span className="text-gradient-blue">Real Results</span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
            We don't build demos. We build systems that operate at scale and move business metrics.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {previewCaseStudies.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="group flex flex-col gap-0 rounded-xl border overflow-visible hover-elevate relative"
              style={{
                background: "var(--joe-card)",
                borderColor: "var(--joe-card-border)",
                boxShadow: "0 0 0 0 transparent",
              }}
              data-testid={`home-portfolio-card-${i}`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                style={{ background: `linear-gradient(90deg, transparent, ${cs.accent}70, transparent)` }}
              />

              <div className="p-6" style={{ borderBottom: "1px solid var(--joe-card-border)" }}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full"
                      style={{
                        background: `${cs.accent}12`,
                        color: cs.accent,
                        border: `1px solid ${cs.accent}30`,
                      }}
                    >
                      {cs.tag}
                    </span>
                    <span className="text-joe-text/28 text-xs font-mono">{cs.client}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-joe-text/15 group-hover:text-joe-text/40 transition-colors flex-shrink-0 mt-0.5" />
                </div>
                <h3 className="font-heading font-bold text-joe-text text-xl mb-2">{cs.title}</h3>
                <p className="text-joe-text/50 text-sm leading-relaxed">{cs.description}</p>
              </div>

              <div className="grid grid-cols-3" style={{ borderBottom: "1px solid var(--joe-divide)" }}>
                {cs.metrics.map((metric, mi) => {
                  const MetricIcon = metric.icon;
                  return (
                    <div
                      key={mi}
                      className="flex flex-col items-center gap-1.5 p-5 text-center"
                      style={mi < 2 ? { borderRight: "1px solid var(--joe-divide)" } : undefined}
                    >
                      <MetricIcon className="w-4 h-4 mb-0.5" style={{ color: cs.accent, opacity: 0.5 }} />
                      <span className="font-heading font-bold text-xl" style={{ color: cs.accent }}>
                        {metric.value}
                      </span>
                      <span className="text-joe-text/35 text-xs font-mono">{metric.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="p-5 flex flex-wrap gap-2">
                {cs.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md border text-joe-text/40 font-mono"
                    style={{
                      background: "var(--joe-overlay)",
                      borderColor: "var(--joe-card-border)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-center mt-12"
        >
          <Link href="/portfolio">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold gap-2 shadow-xl shadow-[#00c8ff]/15 hover:shadow-[#00c8ff]/30 transition-shadow duration-300"
              data-testid="button-home-portfolio-cta"
            >
              See All Case Studies
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden" style={{ background: "var(--joe-bg-3)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: "var(--joe-glow-opacity)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none animate-orb-2"
        style={{ background: "radial-gradient(circle, #0066ff 0%, transparent 70%)", opacity: 0.1 }}
      />
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none animate-orb-1"
        style={{ background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)", opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-8"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.2)" }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00c8ff] animate-pulse" />
            <span className="text-[#00c8ff] text-xs font-mono uppercase tracking-widest">Open to New Projects</span>
          </div>

          <h2 className="font-heading font-bold text-4xl lg:text-6xl text-joe-text leading-tight">
            Ready to Build Something{" "}
            <span className="text-gradient-cyber">Intelligent?</span>
          </h2>

          <p className="text-joe-text/50 text-lg max-w-2xl leading-relaxed">
            Whether you're exploring AI for the first time or scaling an existing system,
            we're here to help you build something that matters.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide gap-2 shadow-2xl shadow-[#00c8ff]/25 hover:shadow-[#00c8ff]/40 transition-shadow duration-300 px-8"
                data-testid="button-home-cta-contact"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-joe-text/15 text-joe-text/75 bg-joe-text/5 hover:bg-joe-text/10 font-semibold tracking-wide gap-2 px-8 backdrop-blur-sm"
                data-testid="button-home-cta-services"
              >
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-2">
            {["No upfront commitment", "Response within 24 hours", "NDA available"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-joe-text/30 text-sm">
                <div className="w-1 h-1 rounded-full bg-[#00c8ff]/60" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
