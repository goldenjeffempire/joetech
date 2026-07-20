import { useSeo } from "@/hooks/use-seo";
import PortfolioSection from "@/components/PortfolioSection";
import PageHero from "@/components/PageHero";

export default function Portfolio() {
  useSeo({
    title: "Portfolio & Case Studies — Apps, AI & Automation | JOE Technologies",
    description: "View JOE Technologies' portfolio of delivered apps, websites, automation systems, AI solutions, and digital platforms for businesses worldwide. Real results, real impact.",
    canonical: "/portfolio",
    keywords: "JOE Technologies portfolio, software case studies, app development portfolio, AI projects portfolio, digital products showcase, Nigeria tech portfolio, JOE Technologies",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "JOE Technologies Portfolio & Case Studies",
      "description": "Delivered apps, websites, automation systems, AI solutions, and digital platforms — real results from JOE Technologies.",
      "url": "https://joetech.com.ng/portfolio",
      "publisher": { "@id": "https://joetech.com.ng/#organization" },
      "isPartOf": { "@id": "https://joetech.com.ng/#website" },
    },
  });

  return (
    <div>
      <PageHero
        label="Case Studies"
        title=""
        highlightedTitle="Our Work"
        subtitle="Explore how we've helped businesses transform with AI-powered systems that deliver measurable impact."
        accentColor="#48F2FB"
        data-testid-label="text-portfolio-label"
        data-testid-title="text-portfolio-title"
        data-testid-subtitle="text-portfolio-subtitle"
      />
      <PortfolioSection />
    </div>
  );
}
