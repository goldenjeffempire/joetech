import { motion } from "framer-motion";
import { usePageTitle } from "@/hooks/use-page-title";
import PortfolioSection from "@/components/PortfolioSection";

export default function Portfolio() {
  usePageTitle("Portfolio");

  return (
    <div>
      <section className="pt-24 pb-12 relative overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest" data-testid="text-portfolio-label">
              Portfolio
            </span>
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-joe-text mt-3" data-testid="text-portfolio-title">
              <span style={{
                background: "linear-gradient(135deg, #00c8ff, #0066ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Our Work
              </span>
            </h1>
            <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto" data-testid="text-portfolio-subtitle">
              Explore our case studies and see how we've helped businesses transform with AI-powered solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <PortfolioSection />
    </div>
  );
}
