import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Award, Globe, TrendingUp, ExternalLink, Target, Zap, Users, Code2 } from "lucide-react";
import { SiInstagram, SiFacebook, SiGithub } from "react-icons/si";

const stats = [
  { value: "50+", label: "Projects Shipped", accent: "#48F2FB", icon: Code2 },
  { value: "5+", label: "Years Experience", accent: "#00ff88", icon: Award },
  { value: "4.9/5", label: "Client Rating", accent: "#f59e0b", icon: TrendingUp },
  { value: "100%", label: "References Available", accent: "#E867EA", icon: Users },
];

const achievements = [
  "Built and shipped 50+ digital products across 5 service pillars",
  "Architected AI systems processing millions of inferences daily",
  "Delivered enterprise platforms for global organizations",
  "Full-stack + AI engineer: Python, Django, React, TypeScript",
  "Computer Science background with AI & Machine Learning focus",
  "Remote-first, serving clients globally across time zones",
];

const values = [
  {
    icon: Target,
    title: "Impact Over Vanity",
    description: "We measure success by real-world results — faster operations, higher conversions, smarter workflows — not by how complex our code looks.",
    accent: "#48F2FB",
  },
  {
    icon: Award,
    title: "Engineering Excellence",
    description: "Every system we build is production-ready, well-documented, maintainable, and designed to scale gracefully as your business grows.",
    accent: "#00ff88",
  },
  {
    icon: Globe,
    title: "Full-Spectrum Thinking",
    description: "We see the complete picture — from data models and APIs to user interfaces and business outcomes — delivering coherent digital systems, not patchwork solutions.",
    accent: "#E867EA",
  },
  {
    icon: Zap,
    title: "Speed Without Compromise",
    description: "We move fast, communicate clearly, and ship in weeks — not months. Quality and velocity are not trade-offs; they're the standard.",
    accent: "#f59e0b",
  },
];

const socialLinks = [
  {
    icon: SiInstagram,
    label: "Instagram",
    href: "https://instagram.com/joetech.ai",
    accent: "#ec4899",
    handle: "@joetech.ai",
  },
  {
    icon: SiFacebook,
    label: "Facebook",
    href: "https://facebook.com/search/top?q=JOE%20Technologies",
    accent: "#48F2FB",
    handle: "JOE Technologies",
  },
  {
    icon: SiGithub,
    label: "GitHub",
    href: "https://github.com/joe-technologies",
    accent: "#48F2FB",
    handle: "joe-technologies",
  },
  {
    icon: ExternalLink,
    label: "Website",
    href: "https://joetech.com.ng",
    accent: "#00ff88",
    handle: "joetech.com.ng",
  },
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function AboutSection() {
  const { ref: statsRef, isInView: statsInView } = useScrollInView();
  const { ref: bioRef, isInView: bioInView } = useScrollInView();
  const { ref: valuesRef, isInView: valuesInView } = useScrollInView();

  return (
    <div>
      <section className="relative py-16 lg:py-20 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.1 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border text-center hover-elevate"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`about-stat-${i}`}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.accent}12`, border: `1px solid ${s.accent}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: s.accent }} />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-3xl" style={{ color: s.accent }}>{s.value}</div>
                    <div className="text-joe-text/40 text-xs font-mono uppercase tracking-wide mt-1">{s.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section
        id="about"
        className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
        style={{ background: "var(--joe-bg-1)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            opacity: "var(--joe-glow-opacity)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #48F2FB 0%, transparent 70%)", opacity: 0.05 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={bioRef}
            initial={{ opacity: 0, y: 30 }}
            animate={bioInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">About the Co-Founders</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
              Built by Engineers Who{" "}
              <span className="text-gradient-cyber">Build Products</span>
            </h2>
            <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
              JOE Technologies is a two-founder, highly specialized studio delivering enterprise-grade digital products — apps, websites, automation systems, UI/UX, and AI.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={bioInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-8"
            >
              <div
                className="flex items-start gap-5 p-6 rounded-xl border"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
              >
                <div className="flex-shrink-0 relative">
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center font-heading font-bold text-2xl text-white"
                    style={{ background: "linear-gradient(135deg, #48F2FB 0%, #48F2FB 50%, #E867EA 100%)" }}
                  >
                    JOE
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00ff88] flex items-center justify-center animate-pulse"
                    style={{ border: "2px solid var(--joe-bg-solid)" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-xl text-joe-text">Jeffery Onome Emuodafevware</h3>
                  <p className="text-[#48F2FB] text-sm font-medium mt-0.5">Co-Founder & Chief Engineer</p>
                  <p className="text-joe-text/35 text-sm mt-0.5 font-mono">JOE Technologies</p>
                  <div className="flex items-center gap-3 mt-3">
                    <a
                      href="https://onome-portfolio-ten.vercel.app/?/projects"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#48F2FB] hover:text-[#48F2FB] transition-colors"
                      data-testid="link-founder-portfolio"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Personal Portfolio
                    </a>
                    <span className="text-joe-text/20">·</span>
                    <a
                      href="https://joetech.com.ng"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E867EA] hover:text-[#48F2FB] transition-colors"
                      data-testid="link-website"
                    >
                      <Globe className="w-3 h-3" />
                      joetech.com.ng
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-joe-text/60 leading-relaxed">
                <p>
                  Jeffery Onome Emuodafevware is a full-stack software engineer and AI architect focused on building
                  intelligent, scalable digital systems that solve real-world problems. With roots in West Africa and
                  experience across startups and enterprise environments, he combines deep technical expertise with
                  strong business pragmatism to deliver production-grade solutions that perform in the real world.
                </p>
                <p>
                  He is the Co-Founder of <span className="text-joe-text font-semibold">JOE Technologies</span> — a
                  company name derived from his initials — established in response to a clear market gap: businesses
                  don't just need consultants or freelancers; they need a reliable engineering partner capable of
                  designing, building, and deploying end-to-end systems including applications, websites, automation
                  pipelines, and AI-powered infrastructure that drive measurable results.
                </p>
                <p>
                  His expertise covers the full product lifecycle, including UX and interface design, frontend and
                  backend engineering, system architecture, database design, automation systems, and machine learning
                  infrastructure — all guided by a commitment to clarity, quality, and business impact.
                </p>
              </div>

              <div
                className="flex items-start gap-5 p-6 rounded-xl border mt-2"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
              >
                <div className="flex-shrink-0 relative">
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center font-heading font-bold text-2xl text-white"
                    style={{ background: "linear-gradient(135deg, #E867EA 0%, #7b2ee0 100%)" }}
                  >
                    DCN
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00ff88] flex items-center justify-center animate-pulse"
                    style={{ border: "2px solid var(--joe-bg-solid)" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-xl text-joe-text">Dominion Chidiebere Nkwachukwu</h3>
                  <p className="text-[#E867EA] text-sm font-medium mt-0.5">Co-Founder</p>
                  <p className="text-joe-text/35 text-sm mt-0.5 font-mono">JOE Technologies</p>
                  <p className="text-joe-text/55 text-sm mt-3 leading-relaxed">
                    Dominion provides strategic leadership and operational oversight at JOE Technologies. With strong
                    capabilities in business development, client engagement, and project execution, she ensures seamless
                    delivery across all engagements. Her role focuses on aligning technical execution with business
                    goals, strengthening client relationships, and driving consistent, measurable outcomes across projects.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {achievements.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={bioInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                    className="flex items-start gap-3"
                    data-testid={`achievement-${i}`}
                  >
                    <CheckCircle className="w-4 h-4 text-[#48F2FB] flex-shrink-0 mt-0.5" />
                    <span className="text-joe-text/55 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div>
                <p className="text-joe-text/30 text-xs font-mono uppercase tracking-widest mb-3">Connect</p>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border hover-elevate transition-all duration-200"
                        style={{ background: "var(--joe-overlay)", borderColor: "var(--joe-card-border)" }}
                        data-testid={`social-${s.label.toLowerCase()}`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" style={{ color: s.accent }} />
                        <div className="min-w-0">
                          <p className="text-joe-text/35 text-xs font-mono">{s.label}</p>
                          <p className="text-joe-text/70 text-xs font-medium truncate">{s.handle}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-5">
              {values.map((value, i) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={bioInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                    className="flex items-start gap-5 p-6 rounded-xl border hover-elevate relative overflow-hidden"
                    style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                    data-testid={`value-card-${i}`}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: `linear-gradient(90deg, transparent, ${value.accent}50, transparent)` }}
                    />
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                      style={{ background: `${value.accent}12`, border: `1px solid ${value.accent}25` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: value.accent }} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-joe-text text-base">{value.title}</h4>
                      <p className="text-joe-text/50 mt-1 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={bioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-1 p-7 rounded-xl border border-[#48F2FB]/15 relative overflow-hidden"
                style={{ background: "rgba(72,242,251,0.04)" }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(72,242,251,0.4), transparent)" }}
                />
                <p className="text-joe-text/70 text-base italic leading-relaxed">
                  "The best digital systems aren't just technically impressive — they create compounding value
                  for the businesses and people who depend on them every single day."
                </p>
                <div className="flex items-center gap-3 mt-5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-xs text-white"
                    style={{ background: "linear-gradient(135deg, #48F2FB90, #48F2FB60)" }}
                  >
                    JOE
                  </div>
                  <div>
                    <p className="text-[#48F2FB] text-sm font-semibold font-mono">Jeffery Onome Emuodafevware</p>
                    <p className="text-joe-text/35 text-xs">Co-Founder, JOE Technologies</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
