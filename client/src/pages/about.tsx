import { usePageTitle } from "@/hooks/use-page-title";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PageHero from "@/components/PageHero";

export default function About() {
  usePageTitle("About");

  return (
    <div>
      <PageHero
        label="Our Story"
        title="About"
        highlightedTitle="JOE Technologies"
        subtitle="Founded by an engineer who builds AI — delivering intelligent systems that solve real problems at real scale."
        accentColor="#00c8ff"
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
