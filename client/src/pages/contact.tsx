import { usePageTitle } from "@/hooks/use-page-title";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";

export default function Contact() {
  usePageTitle("Contact");

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <section className="pt-24 pb-16 relative overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #00c8ff 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest" data-testid="text-contact-label">
            Contact Us
          </span>
          <h1 className="font-heading font-bold text-4xl lg:text-6xl text-joe-text mt-3" data-testid="text-contact-title">
            Get in{" "}
            <span style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Touch
            </span>
          </h1>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto" data-testid="text-contact-subtitle">
            Ready to discuss your next project? Reach out and let's start building something remarkable together.
          </p>
        </div>
      </section>

      <ContactSection />
      <FAQSection />
    </div>
  );
}
