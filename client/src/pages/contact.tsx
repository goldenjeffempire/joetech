import { useSeo } from "@/hooks/use-seo";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import PageHero from "@/components/PageHero";

export default function Contact() {
  useSeo({
    title: "Contact JOE Technologies",
    description: "Get in touch with JOE Technologies to discuss your project. Start your app, website, automation, or AI solution today. We respond within 24 hours.",
    canonical: "/contact",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact JOE Technologies",
      "url": "https://joetechnologies.io/contact",
      "description": "Contact JOE Technologies to start your digital project.",
    },
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <PageHero
        label="Let's Connect"
        title="Get in"
        highlightedTitle="Touch"
        subtitle="Ready to discuss your next project? Reach out and let's start building something remarkable together."
        accentColor="#48F2FB"
        data-testid-label="text-contact-label"
        data-testid-title="text-contact-title"
        data-testid-subtitle="text-contact-subtitle"
      />
      <ContactSection />
      <FAQSection />
    </div>
  );
}
