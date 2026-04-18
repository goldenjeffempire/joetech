import { useSeo } from "@/hooks/use-seo";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TechStackSection from "@/components/TechStackSection";
import PageHero from "@/components/PageHero";

export default function ServicesPage() {
  useSeo({
    title: "Our Services",
    description: "Explore JOE Technologies' full range of services: App Development, Website Design, UI/UX Design, Business Automation, AI & Machine Learning, Full-Stack Development, and Technology Advisory.",
    canonical: "/services",
  });

  return (
    <>
      <PageHero
        label="What We Build"
        title="Enterprise"
        highlightedTitle="Technology Services"
        subtitle="High-performance apps, websites, automation systems, UI/UX experiences, digital systems, and AI-powered solutions designed to help businesses launch faster, operate smarter, and scale with confidence."
        accentColor="#0066ff"
        data-testid-label="text-services-label"
        data-testid-title="text-services-title"
        data-testid-subtitle="text-services-subtitle"
      />
      <ServicesSection />
      <ProcessSection />
      <TechStackSection />
    </>
  );
}
