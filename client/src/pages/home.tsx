import { lazy, Suspense } from "react";
import { useSeo } from "@/hooks/use-seo";
import HeroSection from "@/components/HeroSection";
import TrustedBySection from "@/components/TrustedBySection";
import ImpactMetrics from "@/components/home/ImpactMetrics";
import ServicesPreview from "@/components/home/ServicesPreview";

const ServiceBuilderSection = lazy(() => import("@/components/ServiceBuilderSection"));
const DigitalEcosystemSection = lazy(() => import("@/components/home/DigitalEcosystemSection"));
const WorkflowVisualization = lazy(() => import("@/components/WorkflowVisualization"));
const ExperienceVisualizationSection = lazy(() => import("@/components/home/ExperienceVisualizationSection"));
const PlatformArchitectureSection = lazy(() => import("@/components/home/PlatformArchitectureSection"));
const HomeProcessSection = lazy(() => import("@/components/home/HomeProcessSection"));
const SimulationDashboard = lazy(() => import("@/components/SimulationDashboard"));
const AICapabilitiesSection = lazy(() => import("@/components/home/AICapabilitiesSection"));
const PortfolioHighlights = lazy(() => import("@/components/home/PortfolioHighlights"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const TechEcosystemSection = lazy(() => import("@/components/home/TechEcosystemSection"));
const CTABanner = lazy(() => import("@/components/home/CTABanner"));

function SectionFallback() {
  return (
    <div
      className="w-full py-20 sm:py-24 lg:py-32"
      style={{ background: "var(--joe-bg-solid)" }}
      aria-hidden="true"
    />
  );
}

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
      {/* ── Above-the-fold: always eager ── */}
      <HeroSection />
      <TrustedBySection />
      <ImpactMetrics />
      <ServicesPreview />

      {/* ── Below-the-fold: lazy-loaded, split into separate chunks ── */}
      <Suspense fallback={<SectionFallback />}>
        <ServiceBuilderSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <DigitalEcosystemSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <WorkflowVisualization />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ExperienceVisualizationSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <PlatformArchitectureSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <HomeProcessSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <SimulationDashboard />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <AICapabilitiesSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <PortfolioHighlights />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TechEcosystemSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <CTABanner />
      </Suspense>
    </div>
  );
}
