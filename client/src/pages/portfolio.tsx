import { usePageTitle } from "@/hooks/use-page-title";
import PortfolioSection from "@/components/PortfolioSection";
import PageHero from "@/components/PageHero";

export default function Portfolio() {
  usePageTitle("Portfolio");

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
