import { usePageTitle } from "@/hooks/use-page-title";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TechStackSection from "@/components/TechStackSection";

export default function ServicesPage() {
  usePageTitle("Services");

  return (
    <>
      <section
        className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden"
        style={{ background: "var(--joe-bg-1)" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #0066ff 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest" data-testid="text-services-label">
            What We Offer
          </span>
          <h1 className="font-heading font-bold text-4xl lg:text-6xl text-joe-text mt-3" data-testid="text-services-title">
            Our{" "}
            <span style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Services
            </span>
          </h1>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto leading-relaxed" data-testid="text-services-subtitle">
            End-to-end AI and software engineering services designed to deliver measurable business impact.
          </p>
        </div>
      </section>

      <ServicesSection />
      <ProcessSection />
      <TechStackSection />
    </>
  );
}
