import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const companies = [
  { name: "Nexus Financial", industry: "FinTech" },
  { name: "HealthSense Network", industry: "Healthcare" },
  { name: "LegalEdge International", industry: "Legal Tech" },
  { name: "VoiceCommerce", industry: "E-Commerce" },
  { name: "DataAxis Labs", industry: "Data Science" },
  { name: "Orbital Systems", industry: "SaaS" },
  { name: "Meridian Capital", industry: "Finance" },
  { name: "ClearPath Analytics", industry: "Analytics" },
];

export default function TrustedBySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="relative py-14"
      style={{
        background: "var(--joe-trusted-bg)",
        borderTop: "1px solid var(--joe-card-border-subtle)",
        borderBottom: "1px solid var(--joe-card-border-subtle)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-joe-text/30 text-xs font-mono uppercase tracking-widest">
            Trusted by companies across industries
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: `linear-gradient(90deg, var(--joe-fade), transparent)` }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: `linear-gradient(-90deg, var(--joe-fade), transparent)` }} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 lg:gap-6"
          >
            {companies.map((company, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border hover-elevate"
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`trusted-company-${i}`}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: i % 3 === 0 ? "#00c8ff" : i % 3 === 1 ? "#0066ff" : "#7c3aed" }}
                />
                <span className="text-joe-text/65 text-sm font-medium whitespace-nowrap">{company.name}</span>
                <span className="text-joe-text/25 text-xs hidden sm:inline">· {company.industry}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
