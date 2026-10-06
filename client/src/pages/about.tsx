import { useSeo } from "@/hooks/use-seo";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PageHero from "@/components/PageHero";

export default function About() {
  useSeo({
    title: "About JOE Technologies | Our Vision",
    description: "Learn about JOE Technologies, an enterprise digital product and AI solutions company delivering apps, automation, and AI-powered platforms.",
    canonical: "/about",
    keywords: "about JOE Technologies, Jeffery Onome Emuodafevware, AI company, digital product company, Nigeria tech company",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "https://joetech.com.ng/about",
        "url": "https://joetech.com.ng/about",
        "name": "About JOE Technologies",
        "description": "Enterprise digital product and AI solutions company delivering apps, automation, and AI-powered platforms.",
        "publisher": { "@id": "https://joetech.com.ng/#organization" },
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://joetech.com.ng/#jeffery",
        "name": "Jeffery Onome Emuodafevware",
        "givenName": "Jeffery",
        "familyName": "Emuodafevware",
        "jobTitle": "Founder & CEO",
        "description": "Founder & CEO of JOE Technologies. AI Architect and full-stack engineer with 5+ years building enterprise AI systems, intelligent applications, and scalable digital platforms.",
        "url": "https://onome-portfolio-ten.vercel.app/?/projects",
        "email": "jeffemuodafe124@gmail.com",
        "telephone": "+2349017048791",
        "worksFor": { "@id": "https://joetech.com.ng/#organization" },
        "knowsAbout": [
          "Artificial Intelligence", "Machine Learning", "MLOps",
          "Full-Stack Development", "React", "TypeScript", "Python",
          "Django", "FastAPI", "PostgreSQL", "AI Architecture"
        ],
        "sameAs": [
          "https://onome-portfolio-ten.vercel.app/?/projects",
          "https://linkedin.com/in/jeffery-onome-emuodafevware",
          "https://github.com/jeff-onome"
        ],
      },
    ],
  });

  return (
    <div>
      <PageHero
        label="Our Story"
        title="About"
        highlightedTitle="JOE Technologies"
        subtitle="Building intelligent systems that solve real problems at real scale."
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
