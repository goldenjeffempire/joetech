import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Eye, TrendingUp, Brain, Network, Workflow } from "lucide-react";

const aiCapabilities = [
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    description: "Custom LLMs, summarization engines, semantic search, and intelligent chat systems trained on your domain data.",
    accent: "#48F2FB",
    stat: "99.2%",
    statLabel: "Intent accuracy",
    bars: [0.9, 0.75, 0.95, 0.6, 0.85, 0.7],
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Object detection, classification, OCR, and visual quality inspection pipelines for industrial and consumer use cases.",
    accent: "#48F2FB",
    stat: "< 40ms",
    statLabel: "Inference latency",
    bars: [0.65, 0.88, 0.72, 0.94, 0.8, 0.91],
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "Time-series forecasting, anomaly detection, churn prediction — models that surface insights before problems arise.",
    accent: "#E867EA",
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

export default function AICapabilitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
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
        style={{ background: "radial-gradient(circle, #E867EA 0%, transparent 70%)", opacity: 0.06 }}
      />
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #48F2FB 0%, transparent 70%)", opacity: 0.05 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#E867EA] font-mono text-sm uppercase tracking-widest">Core Capabilities</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
            Intelligence Built Into{" "}
            <span style={{
              background: "linear-gradient(135deg, #E867EA, #48F2FB)",
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
                    <div className="font-heading font-bold text-2xl" style={{ color: cap.accent }}>{cap.stat}</div>
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
                    >
                      <div
                        className="w-full rounded-sm"
                        style={{ height: `${h * 100}%`, background: `linear-gradient(to top, ${cap.accent}90, ${cap.accent}40)`, minHeight: "4px" }}
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
