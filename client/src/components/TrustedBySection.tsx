import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const companies = [
  { name: "Nexus Financial", industry: "FinTech", accent: "#48F2FB" },
  { name: "HealthSense Network", industry: "Healthcare", accent: "#00ff88" },
  { name: "LegalEdge International", industry: "Legal Tech", accent: "#E867EA" },
  { name: "VoiceCommerce", industry: "E-Commerce", accent: "#48F2FB" },
  { name: "DataAxis Labs", industry: "Data Science", accent: "#48F2FB" },
  { name: "Orbital Systems", industry: "SaaS", accent: "#48F2FB" },
  { name: "Meridian Capital", industry: "Finance", accent: "#E867EA" },
  { name: "ClearPath Analytics", industry: "Analytics", accent: "#00ff88" },
  { name: "Prism Ventures", industry: "Investment", accent: "#48F2FB" },
  { name: "Apex Intelligence", industry: "AI/ML", accent: "#48F2FB" },
];

const doubled = [...companies, ...companies];

export default function TrustedBySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      id="trusted"
      ref={ref}
      className="relative py-12 overflow-hidden"
      style={{
        background: "var(--joe-trusted-bg)",
        borderTop: "1px solid var(--joe-card-border-subtle)",
        borderBottom: "1px solid var(--joe-card-border-subtle)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-7"
      >
        <p className="text-joe-text/25 text-xs font-mono uppercase tracking-[0.3em]">
          Trusted by industry leaders across sectors
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative overflow-hidden"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, var(--joe-fade) 0%, transparent 100%)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, var(--joe-fade) 0%, transparent 100%)" }}
        />

        <div className="animate-marquee flex gap-4" style={{ width: "max-content" }}>
          {doubled.map((company, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full border flex-shrink-0 cursor-default group"
              style={{
                background: "var(--joe-card)",
                borderColor: "var(--joe-card-border)",
                transition: "border-color 0.2s",
              }}
              data-testid={i < companies.length ? `trusted-company-${i}` : undefined}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: company.accent, boxShadow: `0 0 6px ${company.accent}` }}
              />
              <span className="text-joe-text/60 text-sm font-medium whitespace-nowrap">
                {company.name}
              </span>
              <span className="text-joe-text/22 text-xs hidden sm:inline font-mono">
                · {company.industry}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
