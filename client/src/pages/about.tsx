import { motion } from "framer-motion";
import { usePageTitle } from "@/hooks/use-page-title";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function About() {
  usePageTitle("About");

  return (
    <div>
      <section
        className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden"
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
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)",
            opacity: "var(--joe-glow-opacity)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest" data-testid="text-page-label">
              Our Story
            </span>
            <h1
              className="font-heading font-bold text-4xl lg:text-6xl mt-3"
              data-testid="text-page-title"
            >
              <span className="text-joe-text">About </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #00c8ff, #0066ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                JOE Technologies
              </span>
            </h1>
            <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto leading-relaxed" data-testid="text-page-subtitle">
              Founded by an engineer who builds AI — delivering intelligent systems
              that solve real problems at real scale.
            </p>
          </motion.div>
        </div>
      </section>

      <AboutSection />
      <WhyUsSection />
      <TestimonialsSection />
    </div>
  );
}
