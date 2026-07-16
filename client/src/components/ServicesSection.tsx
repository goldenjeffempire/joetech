import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Smartphone, MonitorSmartphone, Building2, Workflow, Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const services = [
  {
    icon: Smartphone,
    image: "/services/svc-app-dev.jpg",
    title: "App Development",
    description: "Custom web apps, mobile apps, SaaS products, client portals, and internal tools designed around speed, clarity, adoption, and measurable business outcomes.",
    tags: ["Mobile Apps", "Web Apps", "SaaS", "Portals"],
    accent: "#48F2FB",
    slug: "app-development",
  },
  {
    icon: MonitorSmartphone,
    image: "/services/svc-website.jpg",
    title: "Website Design & Development",
    description: "Premium websites, landing pages, corporate platforms, and digital storefronts with polished UX, conversion-first messaging, technical SEO, and responsive performance.",
    tags: ["SEO", "Landing Pages", "Brand Sites", "Conversion"],
    accent: "#48F2FB",
    slug: "website-design",
  },
  {
    icon: Workflow,
    image: "/services/svc-automation.jpg",
    title: "Automation Systems",
    description: "Business process optimization, workflow engines, reporting systems, integrations, and automated handoffs that reduce manual work and improve operational visibility.",
    tags: ["Workflows", "Ops", "Reporting", "Integrations"],
    accent: "#E867EA",
    slug: "automation",
  },
  {
    icon: Palette,
    image: "/services/svc-uiux.jpg",
    title: "UI/UX Design",
    description: "Interface design, user experience engineering, product flows, design systems, and interaction patterns that make complex platforms intuitive and premium.",
    tags: ["Product UX", "UI Systems", "Prototypes", "Flows"],
    accent: "#f59e0b",
    slug: "uiux-design",
  },
  {
    icon: Brain,
    image: "/services/svc-ai.jpg",
    title: "AI & Machine Learning Solutions",
    description: "AI agents, intelligent assistants, predictive analytics, document automation, semantic search, and custom AI integrations embedded into real workflows.",
    tags: ["AI Agents", "LLMs", "Analytics", "ML"],
    accent: "#00ff88",
    slug: "custom-ai",
  },
  {
    icon: Building2,
    image: "/services/svc-systems.jpg",
    title: "Digital Systems Engineering",
    description: "Secure portals, dashboards, databases, APIs, admin systems, and enterprise-grade product architecture that modernizes how organizations run.",
    tags: ["Dashboards", "APIs", "Databases", "Systems"],
    accent: "#ec4899",
    slug: "full-stack",
  },
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function ServicesSection() {
  const { ref, isInView } = useScrollInView();

  return (
    <section id="services" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--joe-bg-2)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #48F2FB 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">What JOE Technologies Builds</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
            Enterprise Services for{" "}
            <span style={{
              background: "linear-gradient(135deg, #48F2FB, #E867EA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Modern Organizations
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            Every engagement is designed to ship real business capability: apps people use, websites that convert, workflows that automate, interfaces that feel effortless, and AI that creates leverage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="group flex flex-col rounded-xl border hover-elevate cursor-default transition-all duration-300 overflow-hidden"
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`service-card-${i}`}
              >
                {/* Visual banner */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* gradient overlay so card text area blends in */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 40%, var(--joe-card) 100%)`,
                    }}
                  />
                  {/* accent-coloured icon badge */}
                  <div
                    className="absolute bottom-3 left-4 w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${service.accent}20`,
                      border: `1px solid ${service.accent}50`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: service.accent }} />
                  </div>
                </div>

                <div className="flex flex-col gap-5 p-6 flex-1">
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-joe-text text-lg mb-2">{service.title}</h3>
                  <p className="text-joe-text/55 text-sm leading-relaxed">{service.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium border"
                      style={{
                        background: `${service.accent}10`,
                        borderColor: `${service.accent}25`,
                        color: service.accent,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mt-1"
                  style={{ color: service.accent }}
                  data-testid={`link-service-learn-more-${i}`}
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#48F2FB] to-[#E867EA] text-[#060A10] border-0 font-semibold tracking-wide gap-2 shadow-lg shadow-[#48F2FB]/15"
              data-testid="button-services-cta"
            >
              Start Building Your Platform
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
