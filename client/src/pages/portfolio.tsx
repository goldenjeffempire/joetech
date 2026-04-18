import { useSeo } from "@/hooks/use-seo";
import PortfolioSection from "@/components/PortfolioSection";
import PageHero from "@/components/PageHero";

export default function Portfolio() {
  useSeo({
    title: "Portfolio & Case Studies",
    description: "View JOE Technologies' portfolio of delivered apps, websites, automation systems, AI solutions, and digital platforms for businesses worldwide. Real results, real impact.",
    canonical: "/portfolio",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "JOE Technologies Portfolio",
      "description": "Case studies and project portfolio from JOE Technologies.",
      "url": "https://joetechnologies.io/portfolio",
    },
  });

  return (
    <div>
      <PageHero
        label="Case Studies"
        title=""
        highlightedTitle="Our Work"
        subtitle="Explore how we've helped businesses transform with AI-powered systems that deliver measurable impact."
        accentColor="#0066ff"
        data-testid-label="text-portfolio-label"
        data-testid-title="text-portfolio-title"
        data-testid-subtitle="text-portfolio-subtitle"
      />
      <PortfolioSection />
    </div>
  );
}
