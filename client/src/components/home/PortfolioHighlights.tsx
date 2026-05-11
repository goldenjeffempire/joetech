import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Clock, TrendingUp, Zap, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const previewCaseStudies = [
  {
    tag: "SaaS Platform",
    tagColor: "#48F2FB",
    title: "Enterprise Operations App",
    client: "Growing Service Organization",
    description: "Built a high-performance internal operations platform with role-based dashboards, automated reporting, team workflows, and AI-assisted task routing.",
    stack: ["React", "Django", "TypeScript", "PostgreSQL", "AI Routing"],
    metrics: [
      { icon: Clock, value: "73%", label: "Faster reviews" },
      { icon: TrendingUp, value: "91%", label: "Bug catch rate" },
      { icon: Zap, value: "4x", label: "Deploy frequency" },
    ],
    accent: "#48F2FB",
  },
  {
    tag: "AI Automation",
    tagColor: "#00ff88",
    title: "Intelligent Customer Workflow Engine",
    client: "Multi-location Business Network",
    description: "Designed an AI-powered digital system that captures leads, qualifies requests, routes work to teams, and surfaces performance insights in real time.",
    stack: ["Python", "LLMs", "FastAPI", "React", "PostgreSQL", "Cloud"],
    metrics: [
      { icon: TrendingUp, value: "91%", label: "AI routing accuracy" },
      { icon: Clock, value: "68%", label: "Faster processing" },
      { icon: Zap, value: "$4.6M", label: "Annual savings" },
    ],
    accent: "#00ff88",
  },
];

export default function PortfolioHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #48F2FB 0%, transparent 70%)", opacity: 0.07 }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">Case Studies</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
            Digital Systems That Deliver{" "}
            <span className="text-gradient-cyber">Real Results</span>
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
              className="group flex flex-col rounded-xl border overflow-visible hover-elevate relative"
              style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
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
                      style={{ background: `${cs.accent}12`, color: cs.accent, border: `1px solid ${cs.accent}30` }}
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
                      <span className="font-heading font-bold text-xl" style={{ color: cs.accent }}>{metric.value}</span>
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
                    style={{ background: "var(--joe-overlay)", borderColor: "var(--joe-card-border)" }}
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
              className="text-white border-0 font-semibold gap-2 transition-all duration-300 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #48F2FB, #E867EA)", boxShadow: "0 8px 30px rgba(72,242,251,0.25)" }}
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
