import { useSeo } from "@/hooks/use-seo";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TechStackSection from "@/components/TechStackSection";
import PageHero from "@/components/PageHero";

export default function ServicesPage() {
  useSeo({
    title: "Our Services | App Development, AI, Automation & More — JOE Technologies",
    description: "Explore JOE Technologies' full range of services: App Development, Website Design, UI/UX Design, Business Automation, AI & Machine Learning, Full-Stack Development, and Technology Advisory.",
    canonical: "/services",
    keywords: "software development services, app development, website design, AI development, automation services, UI/UX design, full-stack development, technology advisory, JOE Technologies",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "JOE Technologies Services",
      "description": "Full range of enterprise digital product and AI services offered by JOE Technologies.",
      "url": "https://joetech.com.ng/services",
      "numberOfItems": 10,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "App Development",               "url": "https://joetech.com.ng/services/app-development"  },
        { "@type": "ListItem", "position": 2, "name": "Website Design & Development",  "url": "https://joetech.com.ng/services/website-design"    },
        { "@type": "ListItem", "position": 3, "name": "UI/UX Design",                  "url": "https://joetech.com.ng/services/uiux-design"       },
        { "@type": "ListItem", "position": 4, "name": "Business Process Automation",   "url": "https://joetech.com.ng/services/automation"        },
        { "@type": "ListItem", "position": 5, "name": "AI Strategy & Architecture",    "url": "https://joetech.com.ng/services/ai-strategy"       },
        { "@type": "ListItem", "position": 6, "name": "Custom AI & Machine Learning",  "url": "https://joetech.com.ng/services/custom-ai"         },
        { "@type": "ListItem", "position": 7, "name": "MLOps & AI Infrastructure",     "url": "https://joetech.com.ng/services/mlops"             },
        { "@type": "ListItem", "position": 8, "name": "AI Integration & APIs",         "url": "https://joetech.com.ng/services/ai-integration"    },
        { "@type": "ListItem", "position": 9, "name": "Full-Stack Development",        "url": "https://joetech.com.ng/services/full-stack"        },
        { "@type": "ListItem", "position": 10, "name": "Technology Advisory",          "url": "https://joetech.com.ng/services/advisory"          },
      ],
    },
  });

  return (
    <>
      <PageHero
        label="What We Build"
        title="Enterprise"
        highlightedTitle="Technology Services"
        subtitle="High-performance apps, websites, automation systems, UI/UX experiences, digital systems, and AI-powered solutions designed to help businesses launch faster, operate smarter, and scale with confidence."
        accentColor="#48F2FB"
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
