import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Layers, CloudCog, Plug, Code2, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const services = [
  {
    icon: Brain,
    title: "AI Strategy & Architecture",
    description: "We assess your business context, define the AI opportunities with highest ROI, and architect a roadmap from prototype to production-scale deployment.",
    tags: ["LLMs", "MLOps", "Architecture Reviews"],
    accent: "#00c8ff",
  },
  {
    icon: Code2,
    title: "Custom AI Development",
    description: "From fine-tuned language models to computer vision pipelines — we build bespoke AI systems trained on your data, optimized for your domain.",
    tags: ["Python", "PyTorch", "Transformers", "Django"],
    accent: "#0066ff",
  },
  {
    icon: CloudCog,
    title: "MLOps & Infrastructure",
    description: "Scalable model serving, automated retraining pipelines, monitoring and drift detection — we build the infrastructure your AI needs to stay performant.",
    tags: ["Kubernetes", "AWS/GCP", "Kubeflow", "MLflow"],
    accent: "#7c3aed",
  },
  {
    icon: Plug,
    title: "AI Integration & APIs",
    description: "Connect OpenAI, Anthropic, Hugging Face and custom models into your existing stack via robust, low-latency APIs designed for production.",
    tags: ["REST APIs", "FastAPI", "OpenAI", "LangChain"],
    accent: "#00c8ff",
  },
  {
    icon: Layers,
    title: "Full-Stack Development",
    description: "End-to-end development from React frontends to Django backends. We build the complete product — not just the AI layer.",
    tags: ["React", "Django", "TypeScript", "PostgreSQL"],
    accent: "#0066ff",
  },
  {
    icon: Lightbulb,
    title: "Technical Advisory",
    description: "Fractional CTO and AI advisory services for startups and scale-ups navigating their AI transformation. Strategy, team building, and technical due diligence.",
    tags: ["Due Diligence", "Team Building", "Strategy"],
    accent: "#7c3aed",
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
              Discuss Your Needs
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
