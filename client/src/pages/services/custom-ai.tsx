import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import {
  Brain, ArrowRight, Cpu, MessageSquare, Eye, BarChart3, Bot, Layers,
  Zap, Shield, Target, Code2, TrendingUp, Clock, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const accent = "#00ff88";
const accentSecondary = "#48F2FB";

const metrics = [
  { icon: Brain, value: "50+", label: "AI Models Deployed", accent: "#00ff88" },
  { icon: Target, value: "94%", label: "Avg. Model Accuracy", accent: "#48F2FB" },
  { icon: Zap, value: "10x", label: "Faster Than Manual", accent: "#E867EA" },
  { icon: TrendingUp, value: "$4.6M", label: "Client Value Created", accent: "#f59e0b" },
];

const capabilities = [
  {
    icon: Brain,
    title: "Custom Model Training",
    description: "Purpose-built machine learning models trained on your proprietary data to solve your specific business challenges with maximum accuracy and performance.",
    stat: "94%",
    statLabel: "avg accuracy",
  },
  {
    icon: Layers,
    title: "Fine-Tuning & LLMs",
    description: "Adapt state-of-the-art foundation models (GPT, Claude, Llama) to your domain, reducing training cost while achieving superior performance in your specific context.",
    stat: "10x",
    statLabel: "faster than from scratch",
  },
  {
    icon: MessageSquare,
    title: "NLP & Language AI",
    description: "Build intelligent text processing — from sentiment analysis and named entity extraction to domain-specific chatbots, summarization, and content generation pipelines.",
    stat: "99%",
    statLabel: "extraction precision",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "End-to-end image and video analysis systems for object detection, classification, segmentation, defect detection, and visual inspection in production workflows.",
    stat: "< 50ms",
    statLabel: "inference latency",
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description: "Intelligent autonomous agents that perceive, reason, and act — orchestrating multi-step workflows, browsing, tool-use, and decision-making with minimal human oversight.",
    stat: "78%",
    statLabel: "tasks automated",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics & ML",
    description: "Recommendation engines, demand forecasting, anomaly detection, churn prediction, and ML pipelines that surface intelligence from your data to drive better decisions.",
    stat: "91%",
    statLabel: "prediction accuracy",
  },
];

const useCases = [
  {
    tag: "Customer Operations",
    accent: "#00ff88",
    title: "AI-Powered Customer Support",
    description: "Deploy an intelligent assistant trained on your knowledge base that understands questions, drafts accurate responses, routes complex cases, and learns from each interaction.",
    result: "78% support automation",
  },
  {
    tag: "Document Processing",
    accent: "#48F2FB",
    title: "Automated Document Intelligence",
    description: "NLP pipelines that extract, classify, and route information from contracts, invoices, reports, and forms — eliminating manual data entry and reducing processing time by 85%.",
    result: "99.2% extraction accuracy",
  },
  {
    tag: "Operations & Forecasting",
    accent: "#E867EA",
    title: "Predictive Business Intelligence",
    description: "ML models trained on your operational data to forecast demand, detect anomalies, predict churn, and surface trends — giving decision-makers a live intelligence layer.",
    result: "91% forecast accuracy",
  },
  {
    tag: "Quality & Inspection",
    accent: "#f59e0b",
    title: "Visual Inspection Systems",
    description: "Computer vision pipelines that detect defects, anomalies, and quality issues in manufacturing, logistics, or healthcare imaging at speed and scale humans can't match.",
    result: "< 50ms per frame",
  },
];

const deliverables = [
  {
    phase: "01",
    title: "Discovery & Data Audit",
    items: ["Problem framing workshop", "Data availability assessment", "Feasibility analysis", "Architecture recommendation"],
    accent: "#00ff88",
  },
  {
    phase: "02",
    title: "Model Development",
    items: ["Data preprocessing pipelines", "Model training & fine-tuning", "Evaluation & benchmarking", "Iterative improvement cycles"],
    accent: "#48F2FB",
  },
  {
    phase: "03",
    title: "Integration & Deployment",
    items: ["API endpoints & SDK", "System integration", "Monitoring & alerting", "Production deployment"],
    accent: "#E867EA",
  },
  {
    phase: "04",
    title: "Ongoing Optimization",
    items: ["Performance monitoring", "Model drift detection", "Retraining pipelines", "Knowledge transfer"],
    accent: "#f59e0b",
  },
];

const techStack = [
  { name: "Python", accent: "#00ff88" },
  { name: "PyTorch", accent: "#48F2FB" },
  { name: "TensorFlow", accent: "#f59e0b" },
  { name: "Hugging Face", accent: "#E867EA" },
  { name: "LangChain", accent: "#00ff88" },
  { name: "OpenAI API", accent: "#48F2FB" },
  { name: "FastAPI", accent: "#48F2FB" },
  { name: "scikit-learn", accent: "#f59e0b" },
  { name: "Django", accent: "#00ff88" },
  { name: "PostgreSQL", accent: "#48F2FB" },
  { name: "AWS / GCP", accent: "#E867EA" },
  { name: "Docker", accent: "#48F2FB" },
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function CustomAIPage() {
  useSeo({
    title: "Custom AI & Machine Learning Development",
    description: "Custom AI and machine learning development by JOE Technologies. NLP, computer vision, predictive analytics, LLMs, and production ML systems built for your specific use case.",
    canonical: "/services/custom-ai",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Custom AI & Machine Learning Solutions",
      "provider": { "@id": "https://joetech.com.ng/#organization" },
      "url": "https://joetech.com.ng/services/custom-ai",
      "description": "Custom AI and ML development including NLP, computer vision, and production ML systems.",
      "serviceType": "AI & Machine Learning Development",
      "areaServed": "Worldwide",
    },
  });

  const { ref: capRef, isInView: capInView } = useScrollInView();
  const { ref: useCaseRef, isInView: useCaseInView } = useScrollInView();
  const { ref: delRef, isInView: delInView } = useScrollInView();
  const { ref: techRef, isInView: techInView } = useScrollInView();
  const { ref: ctaRef, isInView: ctaInView } = useScrollInView();

  return (
    <div>
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "var(--joe-bg-hero)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            opacity: "var(--joe-glow-opacity)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent}40 0%, transparent 65%)`, opacity: 0.12 }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[400px] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #E867EA 0%, transparent 70%)", opacity: 0.07 }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div
              className="inline-flex items-center gap-2 mb-6 rounded-full px-4 py-2"
              style={{ background: `${accent}10`, border: `1px solid ${accent}30` }}
            >
              <Brain className="w-4 h-4" style={{ color: accent }} />
              <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: accent }}>
                Core Service Pillar
              </span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-7xl text-joe-text mb-6 leading-[0.95] tracking-tight" data-testid="heading-custom-ai">
              AI &amp; Machine{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accentSecondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Learning
              </span>
            </h1>

            <p className="text-joe-text/55 text-xl max-w-2xl mx-auto leading-relaxed mb-10" data-testid="text-custom-ai-subtitle">
              Intelligent systems built on your data — from fine-tuned language models and AI agents to computer vision pipelines and predictive analytics.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="font-semibold gap-2 text-black px-8 h-13"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${accentSecondary})` }}
                  data-testid="button-hero-cta"
                >
                  Build Your AI System
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-joe-text/15 text-joe-text/70 bg-joe-text/5 font-semibold gap-2 px-8 h-13"
                  data-testid="button-hero-portfolio"
                >
                  <Code2 className="w-4 h-4" />
                  See AI Case Studies
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
          >
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl border"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`metric-${i}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${m.accent}12`, border: `1px solid ${m.accent}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: m.accent }} />
                  </div>
                  <div className="text-center">
                    <div className="font-heading font-bold text-2xl" style={{ color: m.accent }}>{m.value}</div>
                    <div className="text-joe-text/40 text-xs font-mono mt-0.5 uppercase tracking-wide">{m.label}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
        <div
          className="absolute top-0 right-0 w-[500px] h-[400px] blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`, opacity: 0.05 }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={capRef}
            initial={{ opacity: 0, y: 30 }}
            animate={capInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>
              What We Build
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
              AI Capabilities &amp;{" "}
              <span className="text-gradient-green">Core Expertise</span>
            </h2>
            <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
              From supervised learning models to autonomous AI agents — we cover the full spectrum of applied machine intelligence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={capInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
                  className="group relative flex flex-col gap-5 p-6 rounded-xl border hover-elevate overflow-hidden"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`capability-card-${i}`}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
                  />
                  <div className="flex items-start justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: accent }} />
                    </div>
                    <div className="text-right">
                      <div className="font-heading font-bold text-xl" style={{ color: accent }}>{cap.stat}</div>
                      <div className="text-joe-text/30 text-xs font-mono mt-0.5">{cap.statLabel}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-joe-text text-base mb-2">{cap.title}</h3>
                    <p className="text-joe-text/50 text-sm leading-relaxed">{cap.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            opacity: "var(--joe-glow-opacity)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={useCaseRef}
            initial={{ opacity: 0, y: 30 }}
            animate={useCaseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accentSecondary }}>
              Real Applications
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
              AI Use Cases That{" "}
              <span className="text-gradient-cyber">Drive Results</span>
            </h2>
            <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
              Proven AI implementations that have created measurable business impact across industries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={useCaseInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="relative flex flex-col gap-4 p-7 rounded-xl border hover-elevate overflow-hidden"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                data-testid={`use-case-${i}`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, transparent, ${uc.accent}60, transparent)` }}
                />
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="text-xs font-mono font-bold px-3 py-1.5 rounded-full flex-shrink-0"
                    style={{ background: `${uc.accent}12`, color: uc.accent, border: `1px solid ${uc.accent}30` }}
                  >
                    {uc.tag}
                  </span>
                  <span
                    className="text-xs font-mono px-2.5 py-1.5 rounded-full flex-shrink-0"
                    style={{ background: `${uc.accent}08`, color: uc.accent, border: `1px solid ${uc.accent}20` }}
                  >
                    {uc.result}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-joe-text text-lg">{uc.title}</h3>
                <p className="text-joe-text/50 text-sm leading-relaxed">{uc.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={delRef}
            initial={{ opacity: 0, y: 30 }}
            animate={delInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>
              How We Work
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
              From Idea to{" "}
              <span className="text-gradient-green">Production AI</span>
            </h2>
            <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
              A structured delivery process that minimizes risk and gets your AI system into production reliably.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={delInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.1 }}
                className="relative flex flex-col gap-5 p-6 rounded-xl border hover-elevate overflow-hidden"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                data-testid={`phase-${i}`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, transparent, ${d.accent}70, transparent)` }}
                />
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-4xl leading-none" style={{ color: `${d.accent}25` }}>
                    {d.phase}
                  </span>
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ background: `linear-gradient(to bottom, ${d.accent}60, transparent)` }}
                  />
                </div>
                <h3 className="font-heading font-bold text-joe-text text-base">{d.title}</h3>
                <ul className="flex flex-col gap-2">
                  {d.items.map((item, ii) => (
                    <li key={ii} className="flex items-start gap-2 text-joe-text/50 text-xs">
                      <CheckCircle2 className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: d.accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-24 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={techRef}
            initial={{ opacity: 0, y: 30 }}
            animate={techInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>
              Tools &amp; Frameworks
            </span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3" data-testid="heading-tech-stack">
              Our AI Tech Stack
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={techInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {techStack.map((t, i) => (
              <motion.span
                key={t.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={techInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.04 }}
                className="px-5 py-2.5 rounded-xl text-sm font-mono font-semibold border hover-elevate cursor-default"
                style={{
                  background: `${t.accent}10`,
                  borderColor: `${t.accent}25`,
                  color: t.accent,
                }}
                data-testid={`tech-tag-${t.name.toLowerCase().replace(/[^a-z]/g, "-")}`}
              >
                {t.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent}30 0%, transparent 70%)`, opacity: 0.12 }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-8"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
              <span className="font-mono text-xs uppercase tracking-widest" style={{ color: accent }}>
                AI Projects Open
              </span>
            </div>

            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-6xl text-joe-text leading-tight">
              Ready to Add Intelligence{" "}
              <span className="text-gradient-green">to Your Business?</span>
            </h2>

            <p className="text-joe-text/50 text-lg max-w-2xl leading-relaxed">
              Whether you're exploring AI for the first time or need to take an existing ML system to production — let's scope your opportunity in a free strategy call.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="font-semibold tracking-wide gap-2 shadow-2xl text-black px-10 h-14 text-base"
                  style={{
                    background: `linear-gradient(135deg, ${accent}, ${accentSecondary})`,
                    boxShadow: `0 20px 60px ${accent}30`,
                  }}
                  data-testid="button-cta-contact"
                >
                  Start Your AI Project
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-joe-text/15 text-joe-text/75 bg-joe-text/5 hover:bg-joe-text/10 font-semibold gap-2 px-10 h-14 text-base"
                  data-testid="button-cta-services"
                >
                  Explore All Services
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: "Free AI strategy session", icon: CheckCircle2 },
                { label: "Production-grade delivery", icon: Shield },
                { label: "Full ML lifecycle support", icon: Layers },
              ].map(({ label, icon: Icon }, i) => (
                <div key={i} className="flex items-center gap-2 text-joe-text/35 text-sm">
                  <Icon className="w-4 h-4" style={{ color: `${accent}70` }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
