import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MonitorSmartphone, Code2, Brain, Database } from "lucide-react";

const layers = [
  {
    id: "frontend",
    label: "Frontend Layer",
    color: "#48F2FB",
    items: ["React Apps", "Mobile UIs", "Design Systems", "Dashboards"],
    icon: MonitorSmartphone,
  },
  {
    id: "api",
    label: "API & Logic Layer",
    color: "#48F2FB",
    items: ["REST APIs", "Webhooks", "Auth", "Real-time"],
    icon: Code2,
  },
  {
    id: "ai",
    label: "AI & Intelligence",
    color: "#E867EA",
    items: ["LLMs", "ML Models", "Agents", "NLP"],
    icon: Brain,
  },
  {
    id: "data",
    label: "Data & Infrastructure",
    color: "#00ff88",
    items: ["PostgreSQL", "Redis", "Cloud", "CDN"],
    icon: Database,
  },
];

const nodes = [
  { label: "Web App", x: "12%", y: "14%", color: "#48F2FB", size: "lg" },
  { label: "Mobile App", x: "35%", y: "8%", color: "#48F2FB", size: "sm" },
  { label: "API Gateway", x: "60%", y: "20%", color: "#48F2FB", size: "md" },
  { label: "AI Engine", x: "80%", y: "12%", color: "#E867EA", size: "lg" },
  { label: "Data Lake", x: "20%", y: "72%", color: "#00ff88", size: "md" },
  { label: "ML Pipeline", x: "55%", y: "68%", color: "#E867EA", size: "sm" },
  { label: "CDN", x: "78%", y: "75%", color: "#00ff88", size: "sm" },
  { label: "Automation", x: "42%", y: "48%", color: "#f59e0b", size: "lg" },
  { label: "Dashboard", x: "10%", y: "42%", color: "#48F2FB", size: "sm" },
  { label: "Auth Service", x: "88%", y: "48%", color: "#48F2FB", size: "sm" },
];

const svgLines = [
  { x1: "12", y1: "14", x2: "60", y2: "20", color: "#48F2FB" },
  { x1: "35", y1: "8", x2: "60", y2: "20", color: "#48F2FB" },
  { x1: "60", y1: "20", x2: "80", y2: "12", color: "#E867EA" },
  { x1: "60", y1: "20", x2: "42", y2: "48", color: "#f59e0b" },
  { x1: "80", y1: "12", x2: "42", y2: "48", color: "#E867EA" },
  { x1: "80", y1: "12", x2: "88", y2: "48", color: "#48F2FB" },
  { x1: "42", y1: "48", x2: "20", y2: "72", color: "#00ff88" },
  { x1: "42", y1: "48", x2: "55", y2: "68", color: "#E867EA" },
  { x1: "10", y1: "42", x2: "42", y2: "48", color: "#48F2FB" },
  { x1: "55", y1: "68", x2: "78", y2: "75", color: "#00ff88" },
  { x1: "12", y1: "14", x2: "10", y2: "42", color: "#48F2FB" },
];

export default function DigitalEcosystemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--joe-bg-3)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: "var(--joe-glow-opacity)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #48F2FB 0%, transparent 70%)", opacity: 0.07 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#E867EA] font-mono text-sm uppercase tracking-widest">Digital Infrastructure</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
            Full-Stack{" "}
            <span className="text-gradient-purple">Digital Ecosystem</span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
            Every product we build sits on a cohesive, layered architecture — from polished frontend to resilient data infrastructure with AI woven throughout.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div
              className="relative rounded-2xl border overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(8,13,28,0.97), rgba(3,8,18,0.99))",
                borderColor: "rgba(72,242,251,0.12)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
                minHeight: "420px",
              }}
            >
              <div
                className="flex items-center justify-between px-5 py-3.5 border-b"
                style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                  <span className="text-white/40 text-xs font-mono uppercase tracking-widest">System architecture · live</span>
                </div>
                <span className="text-white/20 text-xs font-mono">infrastructure.map</span>
              </div>

              <div className="relative" style={{ height: "360px" }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  {svgLines.map((line, i) => (
                    <line
                      key={i}
                      x1={`${line.x1}%`} y1={`${line.y1}%`}
                      x2={`${line.x2}%`} y2={`${line.y2}%`}
                      stroke={line.color}
                      strokeWidth="0.3"
                      strokeOpacity="0.18"
                      strokeDasharray="2,3"
                    />
                  ))}
                </svg>

                {nodes.map((node, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                    className="absolute flex flex-col items-center gap-1"
                    style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                      className="rounded-lg border flex items-center justify-center font-mono font-bold text-center"
                      style={{
                        background: `${node.color}12`,
                        borderColor: `${node.color}35`,
                        color: node.color,
                        boxShadow: `0 0 16px ${node.color}20`,
                        fontSize: node.size === "lg" ? "9px" : "8px",
                        padding: node.size === "lg" ? "6px 10px" : "4px 8px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {node.label}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            {layers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="group flex items-start gap-4 p-5 rounded-xl border transition-all duration-300"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  whileHover={{ borderColor: `${layer.color}40`, boxShadow: `0 0 30px ${layer.color}10` }}
                  data-testid={`ecosystem-layer-${layer.id}`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${layer.color}12`, border: `1px solid ${layer.color}30` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: layer.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-joe-text font-heading font-bold text-sm">{layer.label}</h4>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: layer.color }} />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md border"
                          style={{ background: `${layer.color}08`, borderColor: `${layer.color}20`, color: layer.color }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="p-4 rounded-xl border border-[#00ff88]/20 flex items-start gap-3"
              style={{ background: "rgba(0,255,136,0.04)" }}
            >
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-[#00ff88] font-semibold text-sm mb-0.5">Production-Ready by Default</p>
                <p className="text-joe-text/40 text-xs leading-relaxed">
                  Every system ships with monitoring, observability, scaling policies, and CI/CD pipelines already configured.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
