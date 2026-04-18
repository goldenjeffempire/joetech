import { motion } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { Brain, ClipboardCheck, Map, PenTool, Search, BarChart3, ArrowRight, Briefcase, RefreshCw, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const accent = "#00c8ff";

const includedItems = [
  {
    icon: ClipboardCheck,
    title: "AI Readiness Assessment",
    description: "Evaluate your organization's data maturity, infrastructure, and team capabilities to determine the optimal starting point for AI adoption.",
  },
  {
    icon: Map,
    title: "Technology Roadmap",
    description: "A phased, prioritized plan that aligns AI initiatives with business goals — from quick wins to long-term transformation milestones.",
  },
  {
    icon: PenTool,
    title: "Architecture Design",
    description: "End-to-end system architecture for your AI stack — data pipelines, model serving, integration points, and scalability considerations.",
  },
  {
    icon: Search,
    title: "Vendor & Tool Selection",
    description: "Objective evaluation of AI platforms, cloud providers, and tooling to ensure you invest in the right technology for your specific needs.",
  },
  {
    icon: BarChart3,
    title: "ROI & Feasibility Analysis",
    description: "Quantitative assessment of expected returns, implementation costs, timeline estimates, and risk factors for each proposed AI initiative.",
  },
];

const useCases = [
  {
    icon: Briefcase,
    title: "Launching a new AI product",
    description: "You have a product vision that involves AI but need expert guidance on feasibility, architecture, and the fastest path to a working prototype.",
  },
  {
    icon: RefreshCw,
    title: "Modernizing legacy systems with AI",
    description: "Your existing software stack needs intelligent automation, predictive analytics, or NLP capabilities without a complete rebuild.",
  },
  {
    icon: Scale,
    title: "Evaluating build vs. buy for AI capabilities",
    description: "You need an unbiased technical assessment of whether to build custom AI solutions in-house or leverage existing platforms and APIs.",
  },
];

const techStack = ["LLMs", "MLOps", "TensorFlow", "PyTorch", "Architecture Design", "Cloud (AWS/GCP)"];

export default function AIStrategyPage() {
  useSeo({
    title: "AI Strategy & Architecture Consulting",
    description: "AI strategy and architecture consulting from JOE Technologies. Define your AI roadmap, choose the right models, architect your data pipelines, and deploy with confidence.",
    canonical: "/services/ai-strategy",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI Strategy & Architecture",
      "provider": { "@id": "https://joetechnologies.io/#organization" },
      "url": "https://joetechnologies.io/services/ai-strategy",
      "description": "AI strategy, roadmap planning, and architecture consulting.",
      "serviceType": "AI Strategy Consulting",
      "areaServed": "Worldwide",
    },
  });

  return (
    <div>
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{ background: "var(--joe-bg-hero)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: "var(--joe-glow-opacity)",
            backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent} 0%, transparent 70%)`, opacity: "var(--joe-glow-opacity)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6"
              style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
            >
              <Brain className="w-7 h-7" style={{ color: accent }} />
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mb-4" data-testid="text-service-title">
              AI Strategy &{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00c8ff, #0066ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Architecture
              </span>
            </h1>
            <p className="text-joe-text/50 text-lg max-w-2xl mx-auto leading-relaxed" data-testid="text-service-subtitle">
              We help you define the right AI opportunities, design production-ready architectures,
              and build a roadmap from prototype to scale.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Overview</span>
            <h2 className="font-heading font-bold text-3xl text-joe-text mt-3 mb-6">
              Strategic AI consulting for teams that want to move fast — and move right.
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-joe-text/60 text-base leading-relaxed">
                Every successful AI initiative starts with a clear strategy. We work closely with your leadership
                and engineering teams to assess feasibility, identify high-ROI opportunities, and design an
                architecture that scales from day one.
              </p>
              <p className="text-joe-text/60 text-base leading-relaxed">
                Our approach covers the full spectrum: from initial readiness assessments and technology selection
                to detailed architecture reviews, vendor evaluations, and ROI analysis. Whether you're exploring
                AI for the first time or optimizing an existing stack, we provide the strategic clarity you need
                to make confident technical decisions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Deliverables</span>
            <h2 className="font-heading font-bold text-3xl text-joe-text mt-3">What's Included</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                  className="p-6 rounded-xl border flex flex-col gap-4"
                  style={{
                    background: "var(--joe-card)",
                    borderColor: "var(--joe-card-border)",
                  }}
                  data-testid={`included-item-${i}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-base">{item.title}</h3>
                  <p className="text-joe-text/55 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-3)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>When You Need This</span>
            <h2 className="font-heading font-bold text-3xl text-joe-text mt-3">Use Cases</h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="p-6 rounded-xl border flex items-start gap-5"
                  style={{
                    background: "var(--joe-card)",
                    borderColor: "var(--joe-card-border)",
                  }}
                  data-testid={`use-case-${i}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-joe-text text-base mb-1">{uc.title}</h3>
                    <p className="text-joe-text/55 text-sm leading-relaxed">{uc.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center mb-10"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>Tools & Platforms</span>
            <h2 className="font-heading font-bold text-3xl text-joe-text mt-3">Tech Stack</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg text-sm font-mono font-medium border"
                style={{
                  background: `${accent}10`,
                  borderColor: `${accent}25`,
                  color: accent,
                }}
                data-testid={`tech-tag-${tech.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mb-4">
              Ready to define your AI strategy?
            </h2>
            <p className="text-joe-text/50 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Let's discuss your goals and build a roadmap that turns AI ambition into measurable results.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide gap-2 shadow-lg shadow-[#00c8ff]/15"
                data-testid="button-service-cta"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
