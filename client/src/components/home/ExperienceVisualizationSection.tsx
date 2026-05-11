import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Smartphone, MonitorSmartphone, Workflow, Palette, Brain,
  Target, MousePointer2, Sparkles
} from "lucide-react";

const experienceSignals = [
  { label: "Apps", value: "Cross-platform", icon: Smartphone, accent: "#48F2FB" },
  { label: "Websites", value: "SEO + conversion", icon: MonitorSmartphone, accent: "#48F2FB" },
  { label: "Automation", value: "Workflow engines", icon: Workflow, accent: "#E867EA" },
  { label: "UI/UX", value: "Design systems", icon: Palette, accent: "#f59e0b" },
  { label: "AI/ML", value: "Intelligence layer", icon: Brain, accent: "#00ff88" },
];

const platformMetrics = [
  { label: "Conversion Readiness", value: "94%", width: "94%", icon: Target, accent: "#48F2FB" },
  { label: "Automation Coverage", value: "82%", width: "82%", icon: Workflow, accent: "#E867EA" },
  { label: "UX Clarity Score", value: "A+", width: "88%", icon: MousePointer2, accent: "#f59e0b" },
  { label: "AI Opportunity Index", value: "High", width: "91%", icon: Brain, accent: "#00ff88" },
];

const nodePositions = [
  "left-[7%] top-[40%]",
  "left-[30%] top-[16%]",
  "left-[56%] top-[38%]",
  "left-[22%] bottom-[16%]",
  "right-[8%] bottom-[20%]",
];

export default function ExperienceVisualizationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "70px 70px",
          opacity: 0.18,
        }}
      />
      <div
        className="absolute top-1/4 right-0 w-[520px] h-[520px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #48F2FB 0%, transparent 68%)", opacity: 0.08 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">Homepage Visualization</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3 leading-tight">
              A Digital Command Center for{" "}
              <span className="text-gradient-cyber">Modern Growth</span>
            </h2>
            <p className="text-joe-text/52 mt-5 text-lg leading-relaxed">
              The homepage now tells the full JOE Technologies story visually: premium interfaces, connected systems, automation logic, AI intelligence, and measurable business outcomes working together.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {experienceSignals.map(({ label, value, icon: Icon, accent }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.07 }}
                  className="flex items-center gap-3 rounded-xl border p-4"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`experience-signal-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${accent}12`, border: `1px solid ${accent}28` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <div>
                    <div className="text-joe-text font-semibold text-sm">{label}</div>
                    <div className="text-joe-text/35 text-xs font-mono">{value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
            data-testid="visual-digital-command-center"
          >
            <div
              className="absolute -inset-4 rounded-2xl blur-2xl opacity-25"
              style={{ background: "linear-gradient(135deg, #48F2FB, #E867EA, #00ff88)" }}
            />
            <div
              className="relative rounded-2xl border overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(8,13,28,0.96), rgba(3,8,18,0.98))",
                borderColor: "rgba(72,242,251,0.16)",
                boxShadow: "0 24px 70px rgba(0,0,0,0.42)",
              }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse" />
                  <span className="text-white/55 text-xs font-mono uppercase tracking-widest">Live platform map</span>
                </div>
                <div className="text-white/25 text-xs font-mono">v3.8 production</div>
              </div>

              <div className="grid md:grid-cols-[1fr_0.8fr] gap-0">
                <div className="relative min-h-[360px] p-6 border-r" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(72,242,251,0.18), transparent 36%)" }} />
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 360" fill="none" aria-hidden="true">
                    <path d="M98 178 C158 94 270 92 328 158 C380 218 420 214 462 144" stroke="rgba(72,242,251,0.38)" strokeWidth="1" strokeDasharray="5 7" />
                    <path d="M110 220 C184 266 304 284 410 206" stroke="rgba(232,103,234,0.35)" strokeWidth="1" strokeDasharray="5 8" />
                    <path d="M148 104 C230 150 292 210 370 272" stroke="rgba(0,255,136,0.3)" strokeWidth="1" strokeDasharray="4 7" />
                  </svg>

                  {experienceSignals.map(({ label, icon: Icon, accent }, i) => (
                    <motion.div
                      key={label}
                      animate={{ y: i % 2 === 0 ? [-4, 5, -4] : [5, -4, 5] }}
                      transition={{ duration: 4 + i * 0.35, repeat: Infinity, ease: "easeInOut" }}
                      className={`absolute ${nodePositions[i]} flex items-center gap-2 rounded-xl border px-3 py-2 backdrop-blur-md`}
                      style={{ background: "rgba(255,255,255,0.055)", borderColor: `${accent}35`, boxShadow: `0 0 28px ${accent}12` }}
                      data-testid={`visual-node-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    >
                      <Icon className="w-4 h-4" style={{ color: accent }} />
                      <span className="text-white/72 text-xs font-mono">{label}</span>
                    </motion.div>
                  ))}

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                      className="w-24 h-24 rounded-full border flex items-center justify-center"
                      style={{ background: "rgba(72,242,251,0.1)", borderColor: "rgba(72,242,251,0.35)", boxShadow: "0 0 44px rgba(72,242,251,0.24)" }}
                    >
                      <Sparkles className="w-8 h-8 text-[#48F2FB]" />
                    </motion.div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {platformMetrics.map(({ label, value, width, icon: Icon, accent }) => (
                    <div key={label} className="rounded-xl border p-4" style={{ background: "rgba(255,255,255,0.035)", borderColor: "rgba(255,255,255,0.08)" }} data-testid={`visual-metric-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" style={{ color: accent }} />
                          <span className="text-white/60 text-xs font-mono">{label}</span>
                        </div>
                        <span className="text-white font-heading font-bold text-sm">{value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width } : { width: 0 }}
                          transition={{ duration: 0.8, delay: 0.35 }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${accent}, rgba(255,255,255,0.6))` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
