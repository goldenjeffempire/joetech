import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { usePageTitle } from "@/hooks/use-page-title";
import { Code2, ArrowRight, Brain, Layers, Eye, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const accent = "#0066ff";

const included = [
  {
    icon: Brain,
    title: "Custom Model Training",
    description: "Purpose-built machine learning models trained on your proprietary data to solve your specific business challenges with maximum accuracy.",
  },
  {
    icon: Layers,
    title: "Fine-Tuning & Transfer Learning",
    description: "Adapt state-of-the-art foundation models to your domain, reducing training time and cost while achieving superior performance.",
  },
  {
    icon: MessageSquare,
    title: "NLP & Language Models",
    description: "Build intelligent text processing systems — from sentiment analysis and entity extraction to domain-specific chatbots and content generation.",
  },
  {
    icon: Eye,
    title: "Computer Vision Pipelines",
    description: "End-to-end image and video analysis systems for object detection, classification, segmentation, and visual inspection workflows.",
  },
  {
    icon: Star,
    title: "Recommendation Systems",
    description: "Personalized recommendation engines that learn from user behavior to surface the most relevant products, content, or actions.",
  },
];

const useCases = [
  {
    title: "Building a domain-specific chatbot",
    description: "Fine-tune a language model on your company's knowledge base to create an AI assistant that understands your products, processes, and terminology inside out.",
  },
  {
    title: "Automating document processing",
    description: "Deploy NLP pipelines that extract, classify, and route information from invoices, contracts, and support tickets — eliminating manual data entry.",
  },
  {
    title: "Creating a visual inspection system",
    description: "Train computer vision models to detect defects, anomalies, or quality issues in manufacturing, logistics, or healthcare imaging workflows.",
  },
];

const techStack = ["Python", "PyTorch", "TensorFlow", "Transformers", "Hugging Face", "Django", "scikit-learn"];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function CustomAIPage() {
  usePageTitle("Custom AI Development");
  const { ref: overviewRef, isInView: overviewInView } = useScrollInView();
  const { ref: includedRef, isInView: includedInView } = useScrollInView();
  const { ref: useCasesRef, isInView: useCasesInView } = useScrollInView();
  const { ref: techRef, isInView: techInView } = useScrollInView();
  const { ref: ctaRef, isInView: ctaInView } = useScrollInView();

  return (
    <div>
      <section
        className="relative pt-32 pb-16 overflow-hidden"
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
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent} 0%, transparent 70%)`, opacity: "var(--joe-glow-opacity)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5" style={{ color: accent }} />
              <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>
                Service
              </span>
            </div>
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mb-4" data-testid="heading-custom-ai">
              Custom AI{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, #00c8ff, ${accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Development
              </span>
            </h1>
            <p className="text-joe-text/50 text-lg max-w-2xl mx-auto leading-relaxed" data-testid="text-custom-ai-subtitle">
              Bespoke AI systems built on your data, optimized for your domain — from fine-tuned language models to production-grade computer vision pipelines.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={overviewRef}
            initial={{ opacity: 0, y: 20 }}
            animate={overviewInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-joe-text mb-6" data-testid="heading-overview">
              Overview
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-joe-text/60 leading-relaxed">
                Off-the-shelf AI tools get you 80% of the way. The last 20% — where the real competitive advantage lives — requires custom development. We build bespoke AI systems trained on your proprietary data and tailored to your specific domain, delivering models that outperform generic solutions by understanding the nuances of your business.
              </p>
              <p className="text-joe-text/60 leading-relaxed">
                Whether you need a fine-tuned language model that speaks your industry's language, a computer vision pipeline that detects defects invisible to the human eye, or a recommendation engine that truly understands your users — we handle the full lifecycle from data preparation and model architecture through training, evaluation, and production deployment.
              </p>
              <p className="text-joe-text/60 leading-relaxed">
                Our approach combines deep ML expertise with rigorous software engineering practices. Every model we build comes with comprehensive evaluation metrics, reproducible training pipelines, and clear documentation — so your team can understand, maintain, and iterate on what we deliver.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={includedRef}
            initial={{ opacity: 0, y: 20 }}
            animate={includedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>
              Capabilities
            </span>
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-joe-text mt-3" data-testid="heading-included">
              What's Included
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={includedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="p-6 rounded-xl border"
                  style={{
                    background: "var(--joe-card)",
                    borderColor: "var(--joe-card-border)",
                  }}
                  data-testid={`included-card-${i}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: `${accent}15`,
                      border: `1px solid ${accent}30`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-base mb-2">{item.title}</h3>
                  <p className="text-joe-text/55 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={useCasesRef}
            initial={{ opacity: 0, y: 20 }}
            animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>
              Real-World Applications
            </span>
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-joe-text mt-3" data-testid="heading-use-cases">
              Use Cases
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="p-6 rounded-xl border"
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`use-case-${i}`}
              >
                <h3 className="font-heading font-bold text-joe-text text-base mb-2">{uc.title}</h3>
                <p className="text-joe-text/55 text-sm leading-relaxed">{uc.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={techRef}
            initial={{ opacity: 0, y: 20 }}
            animate={techInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: accent }}>
              Tools & Frameworks
            </span>
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-joe-text mt-3" data-testid="heading-tech-stack">
              Tech Stack
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={techInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg text-sm font-mono font-medium border"
                style={{
                  background: `${accent}10`,
                  borderColor: `${accent}25`,
                  color: accent,
                }}
                data-testid={`tech-tag-${tech.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-3)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center p-10 rounded-xl border"
            style={{
              background: "var(--joe-card)",
              borderColor: "var(--joe-card-border)",
            }}
          >
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-joe-text mb-4" data-testid="heading-cta">
              Ready to Get Started?
            </h2>
            <p className="text-joe-text/50 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Let's discuss how custom AI development can give your business the competitive edge it needs. We'll scope the opportunity and define a path to production.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide gap-2 shadow-lg shadow-[#00c8ff]/15"
                data-testid="button-custom-ai-cta"
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
