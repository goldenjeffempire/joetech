import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Smartphone, MonitorSmartphone, Workflow, Palette, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const previewServices = [
  {
    icon: Smartphone,
    title: "App Development",
    description: "Premium web and mobile apps engineered for speed, usability, conversion, and long-term growth across customer, staff, and operational workflows.",
    tags: ["Web Apps", "Mobile Apps", "SaaS"],
    accent: "#48F2FB",
    slug: "app-development",
    badge: "Core Pillar",
  },
  {
    icon: MonitorSmartphone,
    title: "Website Design & Development",
    description: "Immersive, SEO-ready websites and digital storefronts that communicate trust, move users through clear journeys, and convert attention into action.",
    tags: ["Brand Sites", "SEO", "Conversion"],
    accent: "#48F2FB",
    slug: "website-design",
    badge: null,
  },
  {
    icon: Workflow,
    title: "Automation Systems",
    description: "Business process optimization, workflow automation, integrations, reporting systems, and internal tools that reduce manual work and improve visibility.",
    tags: ["Workflows", "Dashboards", "Ops"],
    accent: "#E867EA",
    slug: "automation",
    badge: null,
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User interface and experience engineering for products that feel premium, guide behavior clearly, and make complex digital systems simple to use.",
    tags: ["Product UX", "Interfaces", "Design Systems"],
    accent: "#f59e0b",
    slug: "uiux-design",
    badge: null,
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Intelligent assistants, automation agents, analytics engines, predictive models, and AI integrations designed for real business workflows.",
    tags: ["LLMs", "AI Agents", "ML"],
    accent: "#00ff88",
    slug: "custom-ai",
    badge: "AI Layer",
  },
];

export default function ServicesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #48F2FB 0%, transparent 70%)", opacity: 0.08 }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">Core Service Pillars</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
            Digital Products That{" "}
            <span className="text-gradient-cyber">Move Businesses Forward</span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-3xl mx-auto leading-relaxed">
            From customer-facing websites to AI-enabled operational systems, every engagement is structured to deliver measurable business outcomes, fast user experiences, and scalable technology foundations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {previewServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                whileHover={{
                  boxShadow: `0 0 40px ${service.accent}18, 0 8px 30px rgba(0,0,0,0.3)`,
                  borderColor: `${service.accent}50`,
                  y: -4,
                }}
                className="group flex flex-col gap-5 p-7 rounded-xl border cursor-default transition-colors duration-300 relative overflow-hidden"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                data-testid={`home-service-card-${i}`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.accent}90, transparent)` }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top, ${service.accent}08 0%, transparent 60%)` }}
                />

                {service.badge && (
                  <div
                    className="absolute top-5 right-5 text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${service.accent}15`, color: service.accent, border: `1px solid ${service.accent}30` }}
                  >
                    {service.badge}
                  </div>
                )}

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${service.accent}12`, border: `1px solid ${service.accent}25`, boxShadow: `0 0 20px ${service.accent}10` }}
                >
                  <Icon className="w-5 h-5" style={{ color: service.accent }} />
                </div>

                <div className="flex-1">
                  <h3 className="font-heading font-bold text-joe-text text-lg mb-2">{service.title}</h3>
                  <p className="text-joe-text/50 text-sm leading-relaxed">{service.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium border"
                      style={{ background: `${service.accent}08`, borderColor: `${service.accent}22`, color: service.accent }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all mt-1 group/link"
                  style={{ color: service.accent }}
                  data-testid={`link-home-service-learn-more-${i}`}
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button
              size="lg"
              className="font-semibold tracking-wide gap-2 text-white border-0 transition-all duration-300 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #48F2FB, #E867EA)", boxShadow: "0 8px 30px rgba(72,242,251,0.25)" }}
              data-testid="button-home-services-cta"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
