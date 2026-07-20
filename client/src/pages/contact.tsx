import { useSeo } from "@/hooks/use-seo";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import PageHero from "@/components/PageHero";

export default function Contact() {
  useSeo({
    title: "Contact JOE Technologies — Start Your Project Today",
    description: "Get in touch with JOE Technologies to discuss your project. Start your app, website, automation, or AI solution today. We respond within 24 hours.",
    canonical: "/contact",
    keywords: "contact JOE Technologies, hire software engineers Nigeria, start a project, get a quote, tech company Nigeria, software engineers Nigeria, JOE Technologies",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact JOE Technologies",
        "url": "https://joetech.com.ng/contact",
        "description": "Contact JOE Technologies to start your digital project — apps, websites, automation, or AI solutions. We respond within 24 hours.",
        "publisher": { "@id": "https://joetech.com.ng/#organization" },
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://joetech.com.ng/#business",
        "name": "JOE Technologies",
        "url": "https://joetech.com.ng",
        "image": "https://joetech.com.ng/og-image.png",
        "logo": "https://joetech.com.ng/favicon.png",
        "description": "Enterprise digital product and AI solutions company specialising in app development, website design, automation, UI/UX, and custom AI systems.",
        "email": "jeffemuodafe124@gmail.com",
        "telephone": "+2349017048791",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "NG",
          "addressRegion": "Nigeria",
        },
        "areaServed": "Worldwide",
        "priceRange": "$",
        "openingHours": "Mo-Fr 09:00-18:00",
        "sameAs": [
          "https://linkedin.com/company/joe-technologies",
          "https://github.com/joe-technologies",
          "https://instagram.com/joetech.ai",
        ],
      },
    ],
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
