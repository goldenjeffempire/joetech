import { useSeo } from "@/hooks/use-seo";
import HeroSection from "@/components/HeroSection";
import TrustedBySection from "@/components/TrustedBySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServiceBuilderSection from "@/components/ServiceBuilderSection";
import SimulationDashboard from "@/components/SimulationDashboard";
import WorkflowVisualization from "@/components/WorkflowVisualization";
import ImpactMetrics from "@/components/home/ImpactMetrics";
import ServicesPreview from "@/components/home/ServicesPreview";
import DigitalEcosystemSection from "@/components/home/DigitalEcosystemSection";
import ExperienceVisualizationSection from "@/components/home/ExperienceVisualizationSection";
import PlatformArchitectureSection from "@/components/home/PlatformArchitectureSection";
import HomeProcessSection from "@/components/home/HomeProcessSection";
import AICapabilitiesSection from "@/components/home/AICapabilitiesSection";
import PortfolioHighlights from "@/components/home/PortfolioHighlights";
import TechEcosystemSection from "@/components/home/TechEcosystemSection";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  useSeo({
    title: "Home",
    description: "JOE Technologies builds high-performance apps, websites, automation systems, UI/UX experiences, and AI-powered solutions for businesses and organisations. We design, engineer, and deploy premium digital platforms that convert, automate, scale, and perform.",
    canonical: "/",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://joetechnologies.io/",
      "url": "https://joetechnologies.io/",
      "name": "JOE Technologies — Apps, Websites, Automation, UI/UX & AI Solutions",
      "description": "Enterprise digital product and AI solutions company.",
      "isPartOf": { "@id": "https://joetechnologies.io/#website" },
      "about": { "@id": "https://joetechnologies.io/#organization" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://joetechnologies.io/og-image.png",
        "width": 1200,
        "height": 630,
      },
    },
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <HeroSection />
      <TrustedBySection />
      <ImpactMetrics />
      <ServicesPreview />
      <ServiceBuilderSection />
      <DigitalEcosystemSection />
      <WorkflowVisualization />
      <ExperienceVisualizationSection />
      <PlatformArchitectureSection />
      <HomeProcessSection />
      <SimulationDashboard />
      <AICapabilitiesSection />
      <PortfolioHighlights />
      <TestimonialsSection />
      <TechEcosystemSection />
      <CTABanner />
    </div>
  );
}
