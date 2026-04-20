import { useSeo } from "@/hooks/use-seo";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PageHero from "@/components/PageHero";

export default function About() {
  useSeo({
    title: "About JOE Technologies",
    description: "Learn about JOE Technologies and our founder Jeffery Onome Emuodafevware. An enterprise digital product and AI solutions company delivering cutting-edge apps, automation, and AI-powered platforms.",
    canonical: "/about",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://joetechnologies.io/about",
      "url": "https://joetechnologies.io/about",
      "name": "About JOE Technologies",
      "description": "Enterprise digital product and AI solutions company founded by Jeffery Onome Emuodafevware.",
      "publisher": { "@id": "https://joetechnologies.io/#organization" },
    },
  });

  return (
    <div>
      <PageHero
        label="Our Story"
        title="About"
        highlightedTitle="JOE Technologies"
        subtitle="Founded by an engineer who builds AI — delivering intelligent systems that solve real problems at real scale."
        accentColor="#48F2FB"
        data-testid-label="text-page-label"
        data-testid-title="text-page-title"
        data-testid-subtitle="text-page-subtitle"
      />
      <AboutSection />
      <WhyUsSection />
      <TestimonialsSection />
    </div>
  );
}
