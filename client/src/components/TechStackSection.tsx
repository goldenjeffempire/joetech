import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiPython, SiDjango, SiPytorch, SiTensorflow, SiOpenai,
  SiReact, SiTypescript, SiPostgresql, SiDocker, SiKubernetes,
  SiFastapi, SiGooglecloud, SiRedis,
  SiMongodb, SiNextdotjs, SiNodedotjs, SiGit, SiGithub, SiLangchain, SiHuggingface, SiAmazon
} from "react-icons/si";

const categories = [
  {
    label: "AI / ML",
    color: "#00c8ff",
    techs: [
      { icon: SiPytorch, name: "PyTorch", color: "#EE4C2C" },
      { icon: SiTensorflow, name: "TensorFlow", color: "#FF6F00" },
      { icon: SiOpenai, name: "OpenAI API", color: "#74AA9C" },
      { icon: SiLangchain, name: "LangChain", color: "#1C3C3C" },
      { icon: SiHuggingface, name: "HuggingFace", color: "#FFD21E" },
    ],
  },
  {
    label: "Backend",
    color: "#0066ff",
    techs: [
      { icon: SiPython, name: "Python", color: "#3776AB" },
      { icon: SiDjango, name: "Django", color: "#092E20" },
      { icon: SiFastapi, name: "FastAPI", color: "#009688" },
      { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
    ],
  },
  {
    label: "Frontend",
    color: "#7c3aed",
    techs: [
      { icon: SiReact, name: "React", color: "#61DAFB" },
      { icon: SiNextdotjs, name: "Next.js", color: "#e0e0e0" },
      { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    ],
  },
  {
    label: "Data & Storage",
    color: "#00c8ff",
    techs: [
      { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
      { icon: SiRedis, name: "Redis", color: "#DC382D" },
      { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
    ],
  },
  {
    label: "Cloud & DevOps",
    color: "#0066ff",
    techs: [
      { icon: SiAmazon, name: "AWS", color: "#FF9900" },
      { icon: SiGooglecloud, name: "GCP", color: "#4285F4" },
      { icon: SiDocker, name: "Docker", color: "#2496ED" },
      { icon: SiKubernetes, name: "Kubernetes", color: "#326CE5" },
    ],
  },
  {
    label: "Engineering",
    color: "#7c3aed",
    techs: [
      { icon: SiGit, name: "Git", color: "#F05032" },
      { icon: SiGithub, name: "GitHub", color: "#e0e0e0" },
    ],
  },
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function TechStackSection() {
  const { ref, isInView } = useScrollInView();

  return (
    <section id="tech-stack" className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--joe-bg-3)" }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Our Arsenal</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            Technology
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              We Master
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
            A carefully curated, battle-tested stack — chosen for performance, reliability, and
            the ability to scale from startup to enterprise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + ci * 0.1 }}
              className="p-6 rounded-xl border"
              style={{
                background: "var(--joe-card)",
                borderColor: "var(--joe-card-border)",
              }}
              data-testid={`tech-category-${ci}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="h-0.5 w-6 rounded-full"
                  style={{ background: cat.color }}
                />
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {cat.techs.map((tech, ti) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={ti}
                      className="flex items-center gap-3 p-3 rounded-lg border hover-elevate"
                      style={{
                        background: "var(--joe-overlay)",
                        borderColor: "var(--joe-card-border-subtle)",
                      }}
                      data-testid={`tech-item-${ci}-${ti}`}
                    >
                      <Icon
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: tech.color }}
                      />
                      <span className="text-joe-text/70 text-sm font-medium">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
