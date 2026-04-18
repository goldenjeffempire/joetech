import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Smartphone, MonitorSmartphone, Building2, Workflow, Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const services = [
  {
    icon: Smartphone,
    title: "App Development",
    description: "Custom web apps, mobile apps, SaaS products, client portals, and internal tools designed around speed, clarity, adoption, and measurable business outcomes.",
    tags: ["Mobile Apps", "Web Apps", "SaaS", "Portals"],
    accent: "#00c8ff",
    slug: "full-stack",
  },
  {
    icon: MonitorSmartphone,
    title: "Website Design & Development",
    description: "Premium websites, landing pages, corporate platforms, and digital storefronts with polished UX, conversion-first messaging, technical SEO, and responsive performance.",
    tags: ["SEO", "Landing Pages", "Brand Sites", "Conversion"],
    accent: "#0066ff",
    slug: "full-stack",
  },
  {
    icon: Workflow,
    title: "Automation Systems",
    description: "Business process optimization, workflow engines, reporting systems, integrations, and automated handoffs that reduce manual work and improve operational visibility.",
    tags: ["Workflows", "Ops", "Reporting", "Integrations"],
    accent: "#7c3aed",
    slug: "ai-integration",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Interface design, user experience engineering, product flows, design systems, and interaction patterns that make complex platforms intuitive and premium.",
    tags: ["Product UX", "UI Systems", "Prototypes", "Flows"],
    accent: "#f59e0b",
    slug: "full-stack",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning Solutions",
    description: "AI agents, intelligent assistants, predictive analytics, document automation, semantic search, and custom AI integrations embedded into real workflows.",
    tags: ["AI Agents", "LLMs", "Analytics", "ML"],
    accent: "#00ff88",
    slug: "custom-ai",
  },
  {
    icon: Building2,
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
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--joe-bg-2)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #0066ff 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">What JOE Technologies Builds</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            Enterprise Services for{" "}
            <span style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
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
                className="group flex flex-col gap-5 p-7 rounded-xl border hover-elevate cursor-default transition-all duration-300"
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`service-card-${i}`}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${service.accent}15`,
                    border: `1px solid ${service.accent}30`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: service.accent }} />
                </div>

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
              className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide gap-2 shadow-lg shadow-[#00c8ff]/15"
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
