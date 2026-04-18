import { usePageTitle } from "@/hooks/use-page-title";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TechStackSection from "@/components/TechStackSection";
import PageHero from "@/components/PageHero";

export default function ServicesPage() {
  usePageTitle("Services");

  return (
    <>
      <PageHero
        label="What We Offer"
        title="Our"
        highlightedTitle="Services"
        subtitle="End-to-end AI and software engineering services designed to deliver measurable business impact at scale."
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
