import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  Brain, Code2, Layers, ArrowRight, ArrowUpRight,
  TrendingUp, Clock, Zap, Server, GitBranch, BarChart3,
  CheckCircle2, Database, Cpu, Eye, MessageSquare,
  Shield, Network, Workflow, Smartphone, MonitorSmartphone,
  Building2, Lock, Boxes, Bot, Target
} from "lucide-react";
import {
  SiPython, SiPytorch, SiTensorflow, SiDjango, SiFastapi,
  SiPostgresql, SiReact, SiTypescript, SiDocker,
  SiKubernetes, SiAmazonec2, SiOpenai, SiGithub, SiRedis
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/use-page-title";
import HeroSection from "@/components/HeroSection";
import TrustedBySection from "@/components/TrustedBySection";

const previewServices = [
  {
    icon: Smartphone,
    title: "App Development",
    description: "Premium mobile and web applications engineered for speed, usability, conversion, and long-term growth across customer, staff, and operational workflows.",
    tags: ["iOS & Android", "Web Apps", "Product UX"],
    accent: "#00c8ff",
    slug: "full-stack",
    badge: "Core Pillar",
  },
  {
    icon: MonitorSmartphone,
    title: "Website Development",
    description: "Immersive, SEO-ready websites and digital storefronts that communicate trust, move users through clear journeys, and convert attention into action.",
    tags: ["Landing Pages", "SEO", "CMS Ready"],
    accent: "#0066ff",
    slug: "full-stack",
    badge: null,
  },
  {
    icon: Building2,
    title: "Digital Systems Engineering",
    description: "Secure portals, dashboards, internal tools, databases, APIs, and workflow systems that replace manual processes with reliable digital infrastructure.",
    tags: ["Dashboards", "APIs", "Automation"],
    accent: "#7c3aed",
    slug: "full-stack",
    badge: null,
  },
  {
    icon: Brain,
    title: "AI-Powered Solutions",
    description: "Intelligent assistants, automation agents, analytics engines, and AI integrations designed to help teams make faster decisions and deliver better service.",
    tags: ["LLMs", "AI Agents", "Analytics"],
    accent: "#00ff88",
    slug: "custom-ai",
    badge: "AI-Ready",
  },
];

const previewCaseStudies = [
  {
    tag: "SaaS Platform",
    tagColor: "#00c8ff",
    title: "Enterprise Operations App",
    client: "Growing Service Organization",
    description: "Built a high-performance internal operations platform with role-based dashboards, automated reporting, team workflows, and AI-assisted task routing.",
    stack: ["React", "Django", "TypeScript", "PostgreSQL", "AI Routing"],
    metrics: [
      { icon: Clock, value: "73%", label: "Faster reviews" },
      { icon: TrendingUp, value: "91%", label: "Bug catch rate" },
      { icon: Zap, value: "4x", label: "Deploy frequency" },
    ],
    accent: "#00c8ff",
  },
  {
    tag: "AI Automation",
    tagColor: "#00ff88",
    title: "Intelligent Customer Workflow Engine",
    client: "Multi-location Business Network",
    description: "Designed an AI-powered digital system that captures leads, qualifies requests, routes work to teams, and surfaces performance insights in real time.",
    stack: ["Python", "LLMs", "FastAPI", "React", "PostgreSQL", "Cloud"],
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
    title: "Business Discovery",
    description: "Clarify goals, users, bottlenecks, data flows, and the digital product opportunities with the strongest return.",
    icon: BarChart3,
    accent: "#00c8ff",
  },
  {
    number: "02",
    title: "Product Architecture",
    description: "Design UX flows, system modules, data models, APIs, integrations, AI layers, and a scalable deployment plan.",
    icon: GitBranch,
    accent: "#0066ff",
  },
  {
    number: "03",
    title: "Build & Integrate",
    description: "Engineer the frontend, backend, automations, dashboards, and AI capabilities with clear release milestones.",
    icon: Cpu,
    accent: "#7c3aed",
  },
  {
    number: "04",
    title: "Launch & Optimize",
    description: "Ship to production with performance tuning, analytics, monitoring, SEO, and continuous improvement loops.",
    icon: Server,
    accent: "#00ff88",
  },
];

const impactMetrics = [
  { value: "50+", label: "Digital Products Delivered", icon: Database, accent: "#00c8ff" },
  { value: "98%", label: "Client Satisfaction Rate", icon: CheckCircle2, accent: "#00ff88" },
  { value: "10x", label: "Average Workflow Gains", icon: Zap, accent: "#0066ff" },
  { value: "4", label: "Core Solution Pillars", icon: TrendingUp, accent: "#7c3aed" },
];

const platformLayers = [
  {
    icon: Target,
    title: "Conversion Strategy",
    description: "Positioning, offer clarity, CTAs, analytics, and journeys built to convert traffic into qualified opportunities.",
    accent: "#00c8ff",
  },
  {
    icon: Boxes,
    title: "Modular Product Systems",
    description: "Reusable frontend patterns, scalable backend services, clean data models, and extensible feature modules.",
    accent: "#0066ff",
  },
  {
    icon: Bot,
    title: "AI & Automation Layer",
    description: "AI assistants, workflow automation, intelligent search, document processing, and decision-support systems.",
    accent: "#7c3aed",
  },
  {
    icon: Lock,
    title: "Enterprise Readiness",
    description: "Secure APIs, resilient architecture, rate limiting, observability, performance, and deployment hardening.",
    accent: "#00ff88",
  },
];

const aiCapabilities = [
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    description: "Custom LLMs, summarization engines, semantic search, and intelligent chat systems trained on your domain data.",
    accent: "#00c8ff",
    stat: "99.2%",
    statLabel: "Intent accuracy",
    bars: [0.9, 0.75, 0.95, 0.6, 0.85, 0.7],
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Object detection, classification, OCR, and visual quality inspection pipelines for industrial and consumer use cases.",
    accent: "#0066ff",
    stat: "< 40ms",
    statLabel: "Inference latency",
    bars: [0.65, 0.88, 0.72, 0.94, 0.8, 0.91],
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "Time-series forecasting, anomaly detection, churn prediction — models that surface insights before problems arise.",
    accent: "#7c3aed",
    stat: "91%",
    statLabel: "Forecast accuracy",
    bars: [0.55, 0.7, 0.82, 0.76, 0.91, 0.88],
  },
  {
    icon: Brain,
    title: "LLM Fine-tuning",
    description: "Instruction-tuning and RLHF on proprietary datasets to create models that understand your business language precisely.",
    accent: "#00ff88",
    stat: "3.8x",
    statLabel: "Task improvement",
    bars: [0.4, 0.55, 0.68, 0.78, 0.88, 0.96],
  },
  {
    icon: Network,
    title: "AI Integration & APIs",
    description: "Connect AI capabilities to your existing products via robust REST and WebSocket APIs with full authentication and rate limiting.",
    accent: "#f59e0b",
    stat: "< 200ms",
    statLabel: "API response time",
    bars: [0.92, 0.88, 0.94, 0.9, 0.93, 0.91],
  },
  {
    icon: Workflow,
    title: "MLOps & Deployment",
    description: "End-to-end model lifecycle management — training pipelines, versioning, A/B testing, drift monitoring, and auto-retraining.",
    accent: "#ec4899",
    stat: "99.9%",
    statLabel: "Model uptime SLA",
    bars: [0.99, 0.98, 1.0, 0.99, 0.97, 0.99],
  },
];

const techCategories = [
  {
    label: "AI / ML",
    accent: "#00c8ff",
    techs: [
      { Icon: SiPython, name: "Python" },
      { Icon: SiPytorch, name: "PyTorch" },
      { Icon: SiTensorflow, name: "TensorFlow" },
      { Icon: SiOpenai, name: "OpenAI" },
    ],
  },
  {
    label: "Backend",
    accent: "#0066ff",
    techs: [
      { Icon: SiDjango, name: "Django" },
      { Icon: SiFastapi, name: "FastAPI" },
      { Icon: SiPostgresql, name: "PostgreSQL" },
      { Icon: SiRedis, name: "Redis" },
    ],
  },
  {
    label: "Frontend",
    accent: "#7c3aed",
    techs: [
      { Icon: SiReact, name: "React" },
      { Icon: SiTypescript, name: "TypeScript" },
    ],
  },
  {
    label: "Infrastructure",
    accent: "#00ff88",
    techs: [
      { Icon: SiAmazonec2, name: "AWS" },
      { Icon: SiDocker, name: "Docker" },
      { Icon: SiKubernetes, name: "Kubernetes" },
      { Icon: SiGithub, name: "GitHub" },
    ],
  },
];

export default function Home() {
  usePageTitle("Home");

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <HeroSection />
      <TrustedBySection />
      <ImpactMetrics />
      <ServicesPreview />
      <PlatformArchitectureSection />
      <ProcessSection />
      <AICapabilitiesSection />
      <PortfolioHighlights />
      <TechEcosystemSection />
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
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Core Service Pillars</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            Digital Products That{" "}
            <span className="text-gradient-blue">Move Businesses Forward</span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-3xl mx-auto leading-relaxed">
            From customer-facing websites to AI-enabled operational systems, every engagement is structured to deliver measurable business outcomes, fast user experiences, and scalable technology foundations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
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

function PlatformArchitectureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-3)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 20%, rgba(0,200,255,0.12), transparent 28%), radial-gradient(circle at 85% 60%, rgba(124,58,237,0.12), transparent 30%)`,
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Enterprise Platform Thinking</span>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text leading-tight">
              Built like a product.
              <br />
              <span className="text-gradient-cyber">Engineered like infrastructure.</span>
            </h2>
            <p className="text-joe-text/55 text-lg leading-relaxed">
              JOE Technologies combines strategy, design, full-stack engineering, automation, and AI into one delivery system. The result is a digital platform that looks premium, loads fast, supports real users, and can evolve as the organization grows.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Conversion-focused user journeys",
                "Responsive interfaces across devices",
                "API-first backend architecture",
                "AI-ready data and workflow design",
              ].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-joe-text/60"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`platform-proof-${i}`}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00c8ff] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold gap-2 shadow-xl shadow-[#00c8ff]/15"
                  data-testid="button-platform-cta"
                >
                  Plan a Digital System
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/process">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-joe-text/15 text-joe-text/70 bg-joe-text/5 font-semibold gap-2"
                  data-testid="button-platform-process"
                >
                  See the Delivery Process
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {platformLayers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="group relative min-h-[230px] rounded-xl border p-6 overflow-hidden hover-elevate"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`platform-layer-${i}`}
                >
                  <div
                    className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: layer.accent }}
                  />
                  <div className="relative z-10 flex flex-col gap-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${layer.accent}15`, border: `1px solid ${layer.accent}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: layer.accent }} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-joe-text text-lg mb-2">{layer.title}</h3>
                      <p className="text-joe-text/50 text-sm leading-relaxed">{layer.description}</p>
                    </div>
                    <div className="mt-auto h-1 rounded-full overflow-hidden" style={{ background: "var(--joe-overlay)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${layer.accent}, transparent)` }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${72 + i * 7}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.35 + i * 0.08 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
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
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Delivery System</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            From Vision to{" "}
            <span className="text-gradient-cyber">Production</span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
            A structured delivery model for apps, websites, systems, and AI products that minimizes risk and maximizes velocity.
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

function AICapabilitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: "var(--joe-glow-opacity)",
        }}
      />
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", opacity: 0.06 }}
      />
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)", opacity: 0.05 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#7c3aed] font-mono text-sm uppercase tracking-widest">Core Capabilities</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            Intelligence Built Into{" "}
            <span style={{
              background: "linear-gradient(135deg, #7c3aed, #0066ff, #00c8ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Real Business Workflows
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            AI is integrated where it creates measurable leverage: faster decisions, smarter workflows, better customer experiences, and automated operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiCapabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
                className="group relative flex flex-col gap-5 p-6 rounded-xl border hover-elevate cursor-default overflow-hidden"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                data-testid={`capability-card-${i}`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${cap.accent}70, transparent)` }}
                />

                <div
                  className="absolute bottom-0 right-0 w-32 h-32 blur-2xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, ${cap.accent} 0%, transparent 70%)`, opacity: 0.08 }}
                />

                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${cap.accent}15`, border: `1px solid ${cap.accent}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: cap.accent }} />
                  </div>

                  <div className="text-right">
                    <div className="font-heading font-bold text-2xl" style={{ color: cap.accent }}>
                      {cap.stat}
                    </div>
                    <div className="text-joe-text/35 text-xs font-mono mt-0.5">{cap.statLabel}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-joe-text text-base mb-2">{cap.title}</h3>
                  <p className="text-joe-text/48 text-sm leading-relaxed">{cap.description}</p>
                </div>

                <div className="flex items-end gap-1 h-8 mt-auto pt-2">
                  {cap.bars.map((h, bi) => (
                    <motion.div
                      key={bi}
                      className="flex-1 rounded-sm"
                      style={{ background: `${cap.accent}35` }}
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: h } : { scaleY: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 + bi * 0.04, ease: "easeOut" }}
                      custom={h}
                    >
                      <div
                        className="w-full rounded-sm"
                        style={{
                          height: `${h * 100}%`,
                          background: `linear-gradient(to top, ${cap.accent}90, ${cap.accent}40)`,
                          minHeight: "4px",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PortfolioHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
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
            Digital Systems That Deliver{" "}
            <span className="text-gradient-blue">Real Results</span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
            We build production platforms that help teams operate faster, serve customers better, and unlock new digital revenue.
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

function TechEcosystemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-28 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)", opacity: 0.06 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[#7c3aed] font-mono text-sm uppercase tracking-widest">Our Stack</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            Technology{" "}
            <span style={{
              background: "linear-gradient(135deg, #7c3aed, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              We Master
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-xl mx-auto">
            A carefully curated stack built for performance, reliability, and scale.
          </p>
        </motion.div>

        <div className="space-y-6">
          {techCategories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + ci * 0.1 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-6 rounded-xl border"
              style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
              data-testid={`tech-category-${ci}`}
            >
              <div className="flex-shrink-0 w-28">
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ background: `${cat.accent}12`, color: cat.accent, border: `1px solid ${cat.accent}25` }}
                >
                  {cat.label}
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                {cat.techs.map(({ Icon, name }, ti) => (
                  <motion.div
                    key={ti}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.2 + ci * 0.1 + ti * 0.06 }}
                    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-lg border transition-all duration-200 hover-elevate cursor-default"
                    style={{
                      background: "var(--joe-overlay)",
                      borderColor: "var(--joe-card-border)",
                    }}
                    data-testid={`tech-item-${name.toLowerCase()}`}
                  >
                    <Icon
                      className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                      style={{ color: cat.accent }}
                    />
                    <span className="text-joe-text/65 text-sm font-mono group-hover:text-joe-text/90 transition-colors">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10"
        >
          <Link href="/tech-stack">
            <Button
              size="lg"
              variant="outline"
              className="border-joe-text/15 text-joe-text/70 bg-joe-text/5 font-semibold gap-2"
              data-testid="button-home-techstack-cta"
            >
              View Full Tech Stack
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

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {[
              { label: "Free strategy call", icon: CheckCircle2 },
              { label: "No long-term commitment", icon: Shield },
              { label: "Results in weeks, not months", icon: Zap },
            ].map(({ label, icon: Icon }, i) => (
              <div key={i} className="flex items-center gap-2 text-joe-text/40 text-sm">
                <Icon className="w-4 h-4 text-[#00c8ff]/60" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
