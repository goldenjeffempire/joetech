import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Database, CheckCircle2, Zap, TrendingUp } from "lucide-react";

const impactMetrics = [
  { value: "50+", label: "Digital Products Delivered", icon: Database, accent: "#48F2FB" },
  { value: "98%", label: "Client Satisfaction Rate", icon: CheckCircle2, accent: "#00ff88" },
  { value: "10x", label: "Average Workflow Gains", icon: Zap, accent: "#48F2FB" },
  { value: "5", label: "Core Service Pillars", icon: TrendingUp, accent: "#E867EA" },
];

export default function ImpactMetrics() {
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
        style={{ background: "radial-gradient(ellipse, #48F2FB 0%, transparent 70%)", opacity: 0.07 }}
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
                className="flex flex-col items-center text-center gap-3 p-4 sm:p-6 rounded-xl border hover-elevate cursor-default"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                data-testid={`impact-metric-${i}`}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-1"
                  style={{ background: `${m.accent}12`, border: `1px solid ${m.accent}25` }}
                >
                  <Icon className="w-5 h-5" style={{ color: m.accent }} />
                </div>
                <span className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl" style={{ color: m.accent }}>
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
