import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Award, Globe, TrendingUp, ExternalLink } from "lucide-react";

const achievements = [
  "Led AI engineering teams at scale across 3 continents",
  "Architected systems processing millions of inferences daily",
  "Delivered AI transformations for Fortune 500 companies",
  "Open-source contributor with 2k+ GitHub stars",
  "Speaker at NeurIPS, PyCon, and AI Summit conferences",
  "MSc in Computer Science with AI specialization",
];

const values = [
  {
    icon: TrendingUp,
    title: "Impact Over Vanity",
    description: "We measure success by the real-world results our systems deliver, not by the complexity of our code.",
  },
  {
    icon: Award,
    title: "Engineering Excellence",
    description: "Every system we build is production-ready, maintainable, and designed to scale gracefully.",
  },
  {
    icon: Globe,
    title: "Systems Thinking",
    description: "We see the full picture — from data pipelines to inference endpoints to business outcomes.",
  },
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return { ref, isInView };
}

export default function AboutSection() {
  const { ref, isInView } = useScrollInView();

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--joe-bg-1)" }}>
      <div className="absolute inset-0"
        style={{
          opacity: "var(--joe-glow-opacity)",
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">About the Founder</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            Built by an Engineer
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Who Builds AI
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 relative">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center font-heading font-bold text-2xl text-white"
                  style={{ background: "linear-gradient(135deg, #00c8ff 0%, #0066ff 50%, #7c3aed 100%)" }}>
                  JOE
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00ff88] flex items-center justify-center"
                  style={{ border: "2px solid var(--joe-bg-solid)" }}>
                  <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-joe-text">Jeffery Onome Emuodafevware</h3>
                <p className="text-[#00c8ff] text-sm font-medium mt-0.5">Founder & Chief AI Architect</p>
                <p className="text-joe-text/40 text-sm mt-1 font-mono">JOE Technologies</p>
                <a
                  href="https://onome-portfolio-ten.vercel.app/?/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00c8ff] hover:text-[#0066ff] transition-colors mt-2"
                  data-testid="link-founder-portfolio"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Personal Portfolio
                </a>
              </div>
            </div>

            <div className="space-y-4 text-joe-text/65 leading-relaxed">
              <p>
                Jeffery Onome Emuodafevware is a software engineer and AI architect with a singular focus:
                building intelligent systems that solve real problems at real scale. With roots in West Africa
                and a career spanning startups to global enterprises, Jeffery brings a rare combination of
                deep technical depth and business pragmatism to every engagement.
              </p>
              <p>
                He founded <span className="text-joe-text font-semibold">JOE Technologies</span> — where JOE stands for his
                initials — after recognizing a critical gap: companies needed more than AI consulting.
                They needed an engineering partner who could architect, build, and deploy production-grade AI
                that actually works in the real world.
              </p>
              <p>
                His expertise spans machine learning infrastructure, natural language processing, computer vision,
                and full-stack engineering — always with Python and Django at the core.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {achievements.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3"
                  data-testid={`achievement-${i}`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00c8ff] flex-shrink-0 mt-0.5" />
                  <span className="text-joe-text/60 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                  className="flex items-start gap-5 p-6 rounded-xl border hover-elevate"
                  style={{
                    background: "var(--joe-card)",
                    borderColor: "var(--joe-card-border)",
                  }}
                  data-testid={`value-card-${i}`}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.2)" }}>
                    <Icon className="w-5 h-5 text-[#00c8ff]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-joe-text text-lg">{value.title}</h4>
                    <p className="text-joe-text/55 mt-1 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-2 p-6 rounded-xl border border-[#00c8ff]/20"
              style={{ background: "rgba(0,200,255,0.05)" }}
            >
              <p className="text-joe-text/75 text-base italic leading-relaxed">
                "The best AI systems aren't just technically impressive — they create compounding value
                for the businesses and people who depend on them every day."
              </p>
              <p className="text-[#00c8ff] text-sm font-semibold mt-3 font-mono">
                — Jeffery Onome Emuodafevware
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
