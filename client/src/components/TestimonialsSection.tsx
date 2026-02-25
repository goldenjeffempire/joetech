import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Working with Jeffery and JOE Technologies transformed our engineering culture. He didn't just deliver an AI system — he leveled up our entire team's understanding of what's possible. The code review platform he built is now the backbone of our development workflow.",
    author: "Sarah Chen",
    role: "Chief Technology Officer",
    company: "Nexus Financial",
    stars: 5,
    initials: "SC",
    accentColor: "#00c8ff",
  },
  {
    quote: "The AI system JOE Technologies built for us is now core to how we operate. Patient readmission predictions have saved millions in costs and, more importantly, improved care quality measurably. Jeffery has a rare gift for translating clinical complexity into engineering precision.",
    author: "Dr. Marcus Obi",
    role: "Chief Medical Officer",
    company: "HealthSense Network",
    stars: 5,
    initials: "MO",
    accentColor: "#00ff88",
  },
  {
    quote: "Exceptionally talented. Jeffery thinks in complete systems — from data to deployment to business impact. He embedded with our team, understood our domain deeply, and built something that felt exactly right. The precision and accountability he brings is rare.",
    author: "Priya Sharma",
    role: "VP Engineering",
    company: "LegalEdge International",
    stars: 5,
    initials: "PS",
    accentColor: "#7c3aed",
  },
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function TestimonialsSection() {
  const { ref, isInView } = useScrollInView();

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--joe-bg-2)" }}>
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
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Social Proof</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            What Clients
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Say About Us
            </span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-xl mx-auto">
            Don't take our word for it — hear from the leaders who've built AI systems with us.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="flex flex-col gap-6 p-7 rounded-xl border hover-elevate"
              style={{
                background: "var(--joe-card)",
                borderColor: "var(--joe-card-border)",
              }}
              data-testid={`testimonial-card-${i}`}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-[#ffd700] text-[#ffd700]" />
                ))}
              </div>

              <Quote className="w-8 h-8 opacity-20" style={{ color: t.accentColor }} />

              <p className="text-joe-text/65 text-sm leading-relaxed flex-1 italic">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4 pt-4" style={{ borderTop: "1px solid var(--joe-card-border)" }}>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.accentColor}80, ${t.accentColor}40)`, border: `1px solid ${t.accentColor}30` }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-joe-text font-semibold text-sm">{t.author}</p>
                  <p className="text-joe-text/40 text-xs mt-0.5">{t.role}</p>
                  <p className="text-xs font-mono mt-0.5" style={{ color: t.accentColor }}>{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {[
            "Confidential NDAs Signed",
            "Results-Based Engagements",
            "Long-Term Partnerships",
            "100% Reference Available",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-joe-text/35 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00c8ff]/50" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
