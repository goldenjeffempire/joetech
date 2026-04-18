import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { CloudCog, Server, GitBranch, Activity, RefreshCw, Database, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const ACCENT = "#7c3aed";

const includedItems = [
  {
    icon: Server,
    title: "Model Serving & Inference",
    description: "Deploy models behind scalable, low-latency endpoints with automatic load balancing, versioning, and A/B testing capabilities.",
  },
  {
    icon: GitBranch,
    title: "CI/CD for ML Pipelines",
    description: "Automated testing, validation, and deployment pipelines purpose-built for machine learning — from data ingestion to production rollout.",
  },
  {
    icon: Activity,
    title: "Monitoring & Drift Detection",
    description: "Real-time monitoring of model performance, data drift, and prediction quality with automated alerting when metrics degrade.",
  },
  {
    icon: RefreshCw,
    title: "Automated Retraining",
    description: "Trigger-based and scheduled retraining pipelines that keep your models accurate as data evolves, with automatic validation gates.",
  },
  {
    icon: Database,
    title: "Scalable Infrastructure",
    description: "Cloud-native infrastructure designed to handle production workloads — auto-scaling, cost optimization, and multi-region deployment.",
  },
];

const useCases = [
  {
    title: "Deploying models to production at scale",
    description: "Move from notebook experiments to production-grade serving infrastructure that handles millions of predictions reliably.",
  },
  {
    title: "Reducing model drift and performance degradation",
    description: "Implement continuous monitoring and automated retraining to maintain model accuracy as your data and business conditions evolve.",
  },
  {
    title: "Automating the ML lifecycle",
    description: "Replace manual, error-prone ML workflows with fully automated pipelines — from data preparation through deployment and monitoring.",
  },
];

const techStack = [
  "Kubernetes",
  "Docker",
  "AWS/GCP",
  "Kubeflow",
  "MLflow",
  "Airflow",
  "Prometheus",
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function MLOpsPage() {
  useSeo({
    title: "MLOps & AI Infrastructure",
    description: "MLOps and AI infrastructure engineering by JOE Technologies. Model serving, monitoring, CI/CD pipelines for ML, and production deployment of machine learning systems.",
    canonical: "/services/mlops",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "MLOps & AI Infrastructure",
      "provider": { "@id": "https://joetechnologies.io/#organization" },
      "url": "https://joetechnologies.io/services/mlops",
      "description": "MLOps infrastructure, model serving, monitoring, and production ML deployment.",
      "serviceType": "MLOps & Infrastructure",
      "areaServed": "Worldwide",
    },
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
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${ACCENT} 0%, transparent 70%)`, opacity: "var(--joe-glow-opacity)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={hero.ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hero.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <CloudCog className="w-5 h-5" style={{ color: ACCENT }} />
              <span className="font-mono text-sm uppercase tracking-widest" style={{ color: ACCENT }}>
                Service
              </span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mb-4" data-testid="text-mlops-title">
              MLOps &{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #a855f7)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Infrastructure
              </span>
            </h1>
            <p className="text-joe-text/50 text-lg max-w-2xl mx-auto leading-relaxed" data-testid="text-mlops-subtitle">
              Production-grade ML infrastructure that keeps your models performing at their best — from deployment to monitoring to automated retraining.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={overview.ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={overview.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-xl border"
            style={{
              background: `${ACCENT}08`,
              borderColor: `${ACCENT}20`,
            }}
            data-testid="section-mlops-overview"
          >
            <h2 className="font-heading font-bold text-joe-text text-2xl mb-4">Overview</h2>
            <div className="flex flex-col gap-3">
              <p className="text-joe-text/60 text-sm leading-relaxed">
                Building an AI model is only half the battle — getting it to production and keeping it there is where most teams struggle. We design and implement the full MLOps stack: model serving with scalable inference endpoints, CI/CD pipelines purpose-built for machine learning, continuous monitoring with drift detection, and automated retraining workflows.
              </p>
              <p className="text-joe-text/60 text-sm leading-relaxed">
                Whether you're deploying your first model or scaling an existing ML platform, we build infrastructure that's reliable, cost-efficient, and designed to evolve with your needs. Our approach ensures your models stay accurate, your deployments stay smooth, and your team stays productive.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={included.ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={included.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={included.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="flex flex-col gap-4 p-6 rounded-xl border"
                  style={{
                    background: "var(--joe-card)",
                    borderColor: "var(--joe-card-border)",
                  }}
                  data-testid={`mlops-included-${i}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${ACCENT}15`,
                      border: `1px solid ${ACCENT}30`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: ACCENT }} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-joe-text text-base mb-1">{item.title}</h3>
                    <p className="text-joe-text/55 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-3)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={cases.ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={cases.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
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
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-4 p-6 rounded-xl border"
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`mlops-usecase-${i}`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: `${ACCENT}15`,
                    border: `1px solid ${ACCENT}30`,
                  }}
                >
                  <span className="text-sm font-bold font-mono" style={{ color: ACCENT }}>
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

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-2)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={tech.ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tech.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="font-mono text-sm uppercase tracking-widest" style={{ color: ACCENT }}>
              Tools & Platforms
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
                data-testid={`mlops-tech-${i}`}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={cta.ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={cta.isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-joe-text mb-4">
              Ready to{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #a855f7)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Get Started?
              </span>
            </h2>
            <p className="text-joe-text/50 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Let's build the infrastructure your ML models deserve — scalable, monitored, and production-ready.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="font-semibold tracking-wide gap-2 shadow-lg text-white border-0"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #a855f7)`,
                  boxShadow: `0 8px 24px ${ACCENT}25`,
                }}
                data-testid="button-mlops-cta"
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