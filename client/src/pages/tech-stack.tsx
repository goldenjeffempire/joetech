import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import PageHero from "@/components/PageHero";
import { useSeo } from "@/hooks/use-seo";
import { ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  SiPython, SiDjango, SiPytorch, SiTensorflow, SiOpenai,
  SiReact, SiTypescript, SiPostgresql, SiDocker, SiKubernetes,
  SiFastapi, SiGooglecloud, SiRedis,
  SiMongodb, SiNextdotjs, SiNodedotjs, SiGit, SiGithub, SiLangchain, SiHuggingface, SiAmazon
} from "react-icons/si";

const categories = [
  {
    label: "AI / ML",
    color: "#48F2FB",
    description: "The core of our AI engineering — frameworks and platforms for building, training, and serving intelligent models.",
    techs: [
      { icon: SiPytorch, name: "PyTorch", color: "#EE4C2C", detail: "Primary deep learning framework for custom model development" },
      { icon: SiTensorflow, name: "TensorFlow", color: "#FF6F00", detail: "Production ML pipelines and TensorFlow Serving deployments" },
      { icon: SiOpenai, name: "OpenAI API", color: "#74AA9C", detail: "GPT-4, embeddings, and fine-tuned model integrations" },
      { icon: SiLangchain, name: "LangChain", color: "#1C3C3C", detail: "RAG pipelines, agent orchestration, and LLM tooling" },
      { icon: SiHuggingface, name: "HuggingFace", color: "#FFD21E", detail: "Model hub, Transformers library, and custom fine-tuning" },
    ],
  },
  {
    label: "Backend",
    color: "#48F2FB",
    description: "Robust server-side technologies for building scalable APIs, services, and data processing systems.",
    techs: [
      { icon: SiPython, name: "Python", color: "#3776AB", detail: "Our primary language for AI, backend, and data engineering" },
      { icon: SiDjango, name: "Django", color: "#092E20", detail: "Full-featured web framework with ORM, auth, and admin" },
      { icon: SiFastapi, name: "FastAPI", color: "#009688", detail: "High-performance async APIs with automatic docs" },
      { icon: SiNodedotjs, name: "Node.js", color: "#339933", detail: "Real-time applications and JavaScript-heavy stacks" },
    ],
  },
  {
    label: "Frontend",
    color: "#E867EA",
    description: "Modern frontend frameworks for building responsive, performant user interfaces and dashboards.",
    techs: [
      { icon: SiReact, name: "React", color: "#61DAFB", detail: "Component-based UIs with hooks and state management" },
      { icon: SiNextdotjs, name: "Next.js", color: "#e0e0e0", detail: "Full-stack React with SSR, API routes, and optimization" },
      { icon: SiTypescript, name: "TypeScript", color: "#3178C6", detail: "Type-safe code that scales with team and codebase size" },
    ],
  },
  {
    label: "Data & Storage",
    color: "#48F2FB",
    description: "Battle-tested databases and caching layers for structured data, vectors, and high-throughput workloads.",
    techs: [
      { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1", detail: "Primary relational database with pgvector for embeddings" },
      { icon: SiRedis, name: "Redis", color: "#DC382D", detail: "Caching, rate limiting, and real-time data processing" },
      { icon: SiMongodb, name: "MongoDB", color: "#47A248", detail: "Document storage for flexible, schema-less data models" },
    ],
  },
  {
    label: "Cloud & DevOps",
    color: "#48F2FB",
    description: "Infrastructure and deployment tools for running reliable, scalable systems in production.",
    techs: [
      { icon: SiAmazon, name: "AWS", color: "#FF9900", detail: "SageMaker, Lambda, ECS, S3, and full AWS ecosystem" },
      { icon: SiGooglecloud, name: "GCP", color: "#4285F4", detail: "Vertex AI, BigQuery, Cloud Run, and GKE deployments" },
      { icon: SiDocker, name: "Docker", color: "#2496ED", detail: "Containerized deployments for consistent environments" },
      { icon: SiKubernetes, name: "Kubernetes", color: "#326CE5", detail: "Orchestration for multi-service production workloads" },
    ],
  },
  {
    label: "Engineering",
    color: "#E867EA",
    description: "Version control and collaboration tools that power our engineering workflow.",
    techs: [
      { icon: SiGit, name: "Git", color: "#F05032", detail: "Version control with feature branching and code review" },
      { icon: SiGithub, name: "GitHub", color: "#e0e0e0", detail: "CI/CD pipelines, pull request workflows, and issue tracking" },
    ],
  },
];

const selectionCriteria = [
  { title: "Production-Proven", description: "Every tool in our stack has been battle-tested in real production environments serving real users.", accent: "#48F2FB" },
  { title: "Community & Support", description: "We choose technologies with strong communities, active development, and long-term viability.", accent: "#48F2FB" },
  { title: "Performance at Scale", description: "Our stack is optimized for handling millions of requests, large datasets, and complex ML workloads.", accent: "#E867EA" },
  { title: "Developer Experience", description: "Great tooling means faster development, fewer bugs, and happier engineers building your product.", accent: "#48F2FB" },
];

export default function TechStackPage() {
  useSeo({
    title: "Technology Stack",
    description: "Explore the technologies JOE Technologies masters: React, Python, Node.js, TypeScript, TensorFlow, LangChain, Kubernetes, PostgreSQL, and more. Built for production at scale.",
    canonical: "/tech-stack",
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <PageHero
        label="Our Arsenal"
        title="Technology"
        highlightedTitle="We Master"
        subtitle="A carefully curated, battle-tested stack — chosen for performance, reliability, and the ability to scale from startup to enterprise."
        accentColor="#E867EA"
      />

      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + ci * 0.1 }}
                className="p-6 rounded-xl border"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                data-testid={`tech-category-${ci}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-0.5 w-6 rounded-full" style={{ background: cat.color }} />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: cat.color }}>
                    {cat.label}
                  </span>
                </div>
                <p className="text-joe-text/40 text-xs leading-relaxed mb-5">{cat.description}</p>

                <div className="flex flex-col gap-3">
                  {cat.techs.map((tech, ti) => {
                    const Icon = tech.icon;
                    return (
                      <div
                        key={ti}
                        className="flex items-start gap-3 p-3 rounded-lg border hover-elevate"
                        style={{ background: "var(--joe-overlay)", borderColor: "var(--joe-card-border-subtle)" }}
                        data-testid={`tech-item-${ci}-${ti}`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: tech.color }} />
                        <div>
                          <span className="text-joe-text/70 text-sm font-medium block">{tech.name}</span>
                          <span className="text-joe-text/35 text-xs leading-relaxed">{tech.detail}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">Why This Stack</span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mt-3">
              How We{" "}
              <span style={{
                background: "linear-gradient(135deg, #48F2FB, #E867EA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Choose Our Tools
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectionCriteria.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-xl border text-center"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                data-testid={`criteria-card-${i}`}
              >
                <div className="w-2 h-2 rounded-full mx-auto mb-4" style={{ background: c.accent }} />
                <h3 className="font-heading font-bold text-joe-text text-base mb-2">{c.title}</h3>
                <p className="text-joe-text/50 text-sm leading-relaxed">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden" style={{ background: "var(--joe-bg-3)" }}>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl text-joe-text mb-4">
              Want to See Our Stack in Action?
            </h2>
            <p className="text-joe-text/50 mb-8 text-lg">
              Explore our case studies to see how we've used this technology to deliver real results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/portfolio">
                <Button className="bg-gradient-to-r from-[#48F2FB] to-[#E867EA] text-[#060A10] border-0 font-semibold px-8 py-6 text-base gap-2" data-testid="button-tech-portfolio-cta">
                  View Case Studies
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-[#48F2FB]/30 text-joe-text font-semibold px-8 py-6 text-base gap-2 hover:bg-[#48F2FB]/10" data-testid="button-tech-contact-cta">
                  Discuss Your Project
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
