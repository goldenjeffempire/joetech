import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { Link } from "wouter";
import { Plug, ArrowRight, Search, MessageSquare, Workflow, Webhook, Gauge, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const ACCENT = "#48F2FB";

const includedItems = [
  {
    icon: Cpu,
    title: "API Design & Development",
    description: "Production-grade RESTful and GraphQL APIs built for reliability, scalability, and developer experience — with comprehensive documentation and versioning.",
  },
  {
    icon: MessageSquare,
    title: "LLM Integration (OpenAI, Anthropic)",
    description: "Seamless integration of leading large language models into your applications, with prompt engineering, token management, and fallback strategies.",
  },
  {
    icon: Search,
    title: "RAG Systems",
    description: "Retrieval-Augmented Generation pipelines that ground LLM responses in your proprietary data — reducing hallucinations and increasing accuracy.",
  },
  {
    icon: Webhook,
    title: "Webhook & Event-Driven Architecture",
    description: "Real-time event processing and webhook infrastructure that keeps your systems in sync, with retry logic, dead-letter queues, and monitoring.",
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    description: "Latency reduction, caching strategies, request batching, and load balancing to ensure your AI-powered endpoints perform at production scale.",
  },
];

const useCases = [
  {
    title: "Adding AI-powered search to your product",
    description: "Embed semantic search and intelligent retrieval capabilities into your existing product, letting users find relevant content with natural language queries instead of keyword matching.",
  },
  {
    title: "Building a conversational AI assistant",
    description: "Create a context-aware, multi-turn conversational assistant that integrates with your knowledge base and business systems to automate customer support and internal workflows.",
  },
  {
    title: "Integrating third-party AI into existing workflows",
    description: "Connect external AI services — OpenAI, Anthropic, or custom models — into your existing tech stack without disrupting current operations, with proper error handling and observability.",
  },
];

const techStack = [
  "REST APIs",
  "FastAPI",
  "OpenAI",
  "LangChain",
  "Anthropic",
  "Redis",
  "PostgreSQL",
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function AIIntegrationPage() {
  useSeo({
    title: "AI Integration & API Development | JOE Technologies",
    description: "AI integration and API development by JOE Technologies. Connect LLMs, ML models, and AI services to your existing systems via robust, scalable API layers.",
    canonical: "/services/ai-integration",
    keywords: "AI integration, API development, LLM integration, OpenAI API integration, REST API, GraphQL API, AI-powered applications, JOE Technologies",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "AI Integration & API Development",
        "provider": { "@id": "https://joetech.com.ng/#organization" },
        "url": "https://joetech.com.ng/services/ai-integration",
        "description": "Connect LLMs, ML models, and AI services to your existing systems via robust, production-grade REST and GraphQL API layers.",
        "serviceType": "AI Integration",
        "areaServed": "Worldwide",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://joetech.com.ng/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://joetech.com.ng/services" },
          { "@type": "ListItem", "position": 3, "name": "AI Integration & API Development", "item": "https://joetech.com.ng/services/ai-integration" },
        ],
      },
    ],
  });
  const hero = useScrollInView();
  const overview = useScrollInView();
  const included = useScrollInView();
  const cases = useScrollInView();
  const tech = useScrollInView();
  const cta = useScrollInView();

  return (
    <div>
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: "var(--joe-bg-hero)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: "var(--joe-glow-opacity)",
            backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${ACCENT} 0%, transparent 70%)`, opacity: "var(--joe-glow-opacity)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={hero.ref}
            initial={{ opacity: 0, y: 20 }}
            animate={hero.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}30` }}
            >
              <Plug className="w-7 h-7" style={{ color: ACCENT }} />
            </div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="font-mono text-sm uppercase tracking-widest" style={{ color: ACCENT }}>
                Service
              </span>
            </div>
            <h1
              className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mb-4"
              data-testid="text-service-title"
            >
              AI Integration{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #48F2FB)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                & APIs
              </span>
            </h1>
            <p
              className="text-joe-text/50 text-lg max-w-2xl mx-auto leading-relaxed"
              data-testid="text-service-subtitle"
            >
              Connecting AI models into your existing systems via robust, production-grade APIs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={overview.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={overview.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: ACCENT }}>
              Overview
            </span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3 mb-6">
              Bridge the gap between AI and your product
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-joe-text/60 text-base leading-relaxed" data-testid="text-overview-1">
                Whether you're looking to embed OpenAI, Anthropic, or a custom-trained model into your existing platform, the challenge is rarely the model itself — it's the engineering around it. Production AI integrations demand low-latency APIs, robust error handling, intelligent caching, and thoughtful prompt management.
              </p>
              <p className="text-joe-text/60 text-base leading-relaxed" data-testid="text-overview-2">
                We design and build the connective tissue between AI models and your systems. From RESTful APIs and webhook architectures to Retrieval-Augmented Generation (RAG) pipelines, we ensure AI capabilities are delivered reliably to your users — with the observability and resilience that production demands.
              </p>
              <p className="text-joe-text/60 text-base leading-relaxed" data-testid="text-overview-3">
                Our integrations are built to scale. We implement rate limiting, request queuing, response streaming, and fallback strategies so your AI-powered features remain performant even under heavy load or provider outages.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={included.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={included.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: ACCENT }}>
              Deliverables
            </span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">
              What's Included
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={included.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="flex flex-col gap-4 p-7 rounded-xl border"
                  style={{
                    background: "var(--joe-card)",
                    borderColor: "var(--joe-card-border)",
                  }}
                  data-testid={`included-card-${i}`}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${ACCENT}15`,
                      border: `1px solid ${ACCENT}30`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: ACCENT }} />
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-base">{item.title}</h3>
                  <p className="text-joe-text/55 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={cases.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={cases.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: ACCENT }}>
              When You Need This
            </span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">
              Use Cases
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={cases.isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="p-6 rounded-xl border flex gap-4 items-start"
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`usecase-card-${i}`}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: `${ACCENT}15`,
                    border: `1px solid ${ACCENT}30`,
                  }}
                >
                  <span className="font-mono font-bold text-sm" style={{ color: ACCENT }}>
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-joe-text text-base mb-1">{uc.title}</h3>
                  <p className="text-joe-text/55 text-sm leading-relaxed">{uc.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={tech.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={tech.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: ACCENT }}>
              Tools & Frameworks
            </span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">
              Tech Stack
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={tech.isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                className="px-4 py-2 rounded-lg text-sm font-mono font-medium border"
                style={{
                  background: `${ACCENT}10`,
                  borderColor: `${ACCENT}25`,
                  color: ACCENT,
                }}
                data-testid={`tech-tag-${i}`}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-3)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            ref={cta.ref}
            initial={{ opacity: 0, y: 30 }}
            animate={cta.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mb-4">
              Ready to{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #48F2FB)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                get started?
              </span>
            </h2>
            <p className="text-joe-text/50 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Let's discuss how we can integrate AI capabilities into your existing systems with reliable, production-grade APIs.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#48F2FB] to-[#E867EA] text-[#060A10] border-0 font-semibold tracking-wide gap-2 shadow-lg shadow-[#48F2FB]/15"
                data-testid="button-cta-contact"
              >
                Discuss Your Project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
