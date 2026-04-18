import { usePageTitle } from "@/hooks/use-page-title";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import PageHero from "@/components/PageHero";

export default function Contact() {
  usePageTitle("Contact");

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <PageHero
        label="Let's Connect"
        title="Get in"
        highlightedTitle="Touch"
        subtitle="Ready to discuss your next project? Reach out and let's start building something remarkable together."
        accentColor="#00c8ff"
        data-testid-label="text-contact-label"
        data-testid-title="text-contact-title"
        data-testid-subtitle="text-contact-subtitle"
      />
      <ContactSection />
      <FAQSection />
    </div>
  );
}
