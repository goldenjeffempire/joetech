import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Brain, Code2, Layers, ArrowRight, ArrowUpRight, TrendingUp, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/use-page-title";
import HeroSection from "@/components/HeroSection";
import TrustedBySection from "@/components/TrustedBySection";
import TestimonialsSection from "@/components/TestimonialsSection";

const previewServices = [
  {
    icon: Brain,
    title: "AI Strategy & Architecture",
    description: "We assess your business context, define the AI opportunities with highest ROI, and architect a roadmap from prototype to production-scale deployment.",
    tags: ["LLMs", "MLOps", "Architecture Reviews"],
    accent: "#00c8ff",
    slug: "ai-strategy",
  },
  {
    icon: Code2,
    title: "Custom AI Development",
    description: "From fine-tuned language models to computer vision pipelines — we build bespoke AI systems trained on your data, optimized for your domain.",
    tags: ["Python", "PyTorch", "Transformers", "Django"],
    accent: "#0066ff",
    slug: "custom-ai",
  },
  {
    icon: Layers,
    title: "Full-Stack Development",
    description: "End-to-end development from React frontends to Django backends. We build the complete product — not just the AI layer.",
    tags: ["React", "Django", "TypeScript", "PostgreSQL"],
    accent: "#0066ff",
    slug: "full-stack",
  },
];

const previewCaseStudies = [
  {
    tag: "FinTech",
    tagColor: "#00c8ff",
    title: "IntelliCode Review Platform",
    client: "Series B SaaS Startup",
    description: "Built an AI-powered code review system that automatically detects security vulnerabilities, performance bottlenecks, and code quality issues — integrated directly into GitHub PRs.",
    stack: ["Python", "CodeLlama", "Django", "React", "PostgreSQL"],
    metrics: [
      { icon: Clock, value: "73%", label: "Faster reviews" },
      { icon: TrendingUp, value: "91%", label: "Bug catch rate" },
      { icon: Zap, value: "4x", label: "Deploy frequency" },
    ],
    accent: "#00c8ff",
  },
  {
    tag: "Healthcare",
    tagColor: "#00ff88",
    title: "HealthSense Predictive Analytics",
    client: "Regional Hospital Network",
    description: "Deployed a machine learning platform that predicts patient readmission risk, enabling care teams to intervene proactively and reduce unnecessary hospital stays.",
    stack: ["Python", "scikit-learn", "BERT", "FastAPI", "PostgreSQL", "AWS"],
    metrics: [
      { icon: TrendingUp, value: "91%", label: "Prediction accuracy" },
      { icon: Clock, value: "38%", label: "Readmission reduction" },
      { icon: Zap, value: "$4.6M", label: "Annual savings" },
    ],
    accent: "#00ff88",
  },
];

export default function Home() {
  usePageTitle("Home");

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <HeroSection />
      <TrustedBySection />
      <ServicesPreview />
      <PortfolioHighlights />
      <TestimonialsSection />
      <CTABanner />
    </div>
  );
}

function ServicesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #0066ff 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">What We Do</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            Services That{" "}
            <span style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Move the Needle
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            Every engagement is built around delivering measurable business outcomes —
            not just impressive demos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewServices.map((service, i) => {
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
                data-testid={`home-service-card-${i}`}
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
                  data-testid={`link-home-service-learn-more-${i}`}
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide gap-2 shadow-lg shadow-[#00c8ff]/15"
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

function PortfolioHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
      <div
        className="absolute top-1/2 left-0 w-96 h-96 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Case Studies</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            AI That Delivers{" "}
            <span style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Real Results
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
            We don't build demos. We build systems that operate at scale and move business metrics.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {previewCaseStudies.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group flex flex-col gap-0 rounded-xl border overflow-visible hover-elevate"
              style={{
                background: "var(--joe-card)",
                borderColor: "var(--joe-card-border)",
              }}
              data-testid={`home-portfolio-card-${i}`}
            >
              <div className="p-6" style={{ borderBottom: "1px solid var(--joe-card-border)" }}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full"
                      style={{
                        background: `${cs.accent}15`,
                        color: cs.accent,
                        border: `1px solid ${cs.accent}30`,
                      }}
                    >
                      {cs.tag}
                    </span>
                    <span className="text-joe-text/30 text-xs">{cs.client}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-joe-text/20 group-hover:text-joe-text/50 transition-colors flex-shrink-0 mt-0.5" />
                </div>
                <h3 className="font-heading font-bold text-joe-text text-xl mb-2">{cs.title}</h3>
                <p className="text-joe-text/55 text-sm leading-relaxed">{cs.description}</p>
              </div>

              <div className="grid grid-cols-3" style={{ borderBottom: "1px solid var(--joe-divide)" }}>
                {cs.metrics.map((metric, mi) => {
                  const MetricIcon = metric.icon;
                  return (
                    <div
                      key={mi}
                      className="flex flex-col items-center gap-1 p-4 text-center"
                      style={mi < 2 ? { borderRight: "1px solid var(--joe-divide)" } : undefined}
                    >
                      <MetricIcon className="w-4 h-4 mb-1 opacity-40" style={{ color: cs.accent }} />
                      <span className="font-heading font-bold text-xl" style={{ color: cs.accent }}>
                        {metric.value}
                      </span>
                      <span className="text-joe-text/40 text-xs">{metric.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="p-5 flex flex-wrap gap-2">
                {cs.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md border text-joe-text/45 font-mono"
                    style={{
                      background: "var(--joe-overlay)",
                      borderColor: "var(--joe-card-border)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/portfolio">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold gap-2 shadow-lg shadow-[#00c8ff]/15"
              data-testid="button-home-portfolio-cta"
            >
              See All Case Studies
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-3)" }}>
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--joe-glow-opacity)",
          backgroundImage:
            `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #0066ff 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-8"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Let's Talk</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text">
            Ready to Build Something{" "}
            <span style={{
              background: "linear-gradient(135deg, #00c8ff 0%, #0066ff 50%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Intelligent?
            </span>
          </h2>
          <p className="text-joe-text/50 text-lg max-w-2xl leading-relaxed">
            Whether you're exploring AI for the first time or scaling an existing system,
            we're here to help you build something that matters.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide gap-2 shadow-lg shadow-[#00c8ff]/20"
                data-testid="button-home-cta-contact"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-joe-text/20 text-joe-text/80 bg-joe-text/5 font-semibold tracking-wide gap-2"
                data-testid="button-home-cta-services"
              >
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
