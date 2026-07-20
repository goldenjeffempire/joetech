import { useSeo } from "@/hooks/use-seo";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PageHero from "@/components/PageHero";

export default function About() {
  useSeo({
    title: "About JOE Technologies | Co-Founders & Vision",
    description: "Learn about JOE Technologies and our co-founders Jeffery Onome Emuodafevware and Dominion Chidiebere Nkwachukwu. An enterprise digital product and AI solutions company delivering cutting-edge apps, automation, and AI-powered platforms.",
    canonical: "/about",
    keywords: "about JOE Technologies, Jeffery Onome Emuodafevware, Dominion Chidiebere Nkwachukwu, AI company founders, digital product company, Nigeria tech company",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "https://joetech.com.ng/about",
        "url": "https://joetech.com.ng/about",
        "name": "About JOE Technologies",
        "description": "Enterprise digital product and AI solutions company co-founded by Jeffery Onome Emuodafevware and Dominion Chidiebere Nkwachukwu.",
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
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://joetech.com.ng/#dominion",
        "name": "Dominion Chidiebere Nkwachukwu",
        "givenName": "Dominion",
        "familyName": "Nkwachukwu",
        "jobTitle": "Co-Founder",
        "description": "Co-Founder of JOE Technologies. Business development leader and operations strategist ensuring seamless project delivery and strong client relationships.",
        "worksFor": { "@id": "https://joetech.com.ng/#organization" },
        "knowsAbout": [
          "Business Development", "Client Engagement",
          "Project Management", "Operations", "Digital Strategy"
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
        subtitle="Co-founded by engineers who build AI — delivering intelligent systems that solve real problems at real scale."
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
