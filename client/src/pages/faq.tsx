import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { usePageTitle } from "@/hooks/use-page-title";
import { Plus, Minus, ArrowRight, HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const faqCategories = [
  {
    category: "Getting Started",
    color: "#00c8ff",
    faqs: [
      {
        q: "How do we get started?",
        a: "Everything begins with a free 45-minute strategy call. We discuss your goals, technical landscape, and the specific outcomes you want AI to drive. From there, we'll propose a tailored engagement structure — whether that's a focused discovery sprint, a full-stack build, or ongoing advisory.",
      },
      {
        q: "What's a typical project timeline?",
        a: "It depends on scope. A focused AI integration or MVP typically takes 6–10 weeks. A full-scale production system — with custom model training, MLOps infrastructure, and a polished front-end — usually runs 3–6 months. We always define clear milestones upfront so you know what to expect at every stage.",
      },
      {
        q: "Do you work with non-technical founders?",
        a: "Absolutely. Some of our best work has been with founders who have a clear vision but limited technical background. We translate complexity into plain language, involve you in every major decision, and ensure you understand what's being built and why. You'll never feel lost in your own project.",
      },
    ],
  },
  {
    category: "Engagement & Pricing",
    color: "#0066ff",
    faqs: [
      {
        q: "What engagement models do you offer?",
        a: "We offer three primary models: (1) Project-based — fixed scope, fixed timeline, fixed price; (2) Retainer — dedicated capacity each month for ongoing AI development or advisory; (3) Embedded — Jeffery or a JOE Technologies engineer works as part of your internal team. We'll recommend the best fit based on your situation.",
      },
      {
        q: "How is pricing structured?",
        a: "Pricing depends on the engagement model and scope. Project-based work starts with a detailed proposal and fixed price. Retainer engagements are billed monthly based on hours committed. Embedded engagements are priced as a monthly rate. We're transparent about costs from the first conversation.",
      },
      {
        q: "Do you offer a money-back guarantee?",
        a: "We don't offer blanket money-back guarantees because custom engineering isn't a commodity product. However, we do structure every project with clear milestones and checkpoints. If we're not meeting agreed-upon benchmarks, we work together to course-correct or adjust scope.",
      },
    ],
  },
  {
    category: "Technical & Industry",
    color: "#7c3aed",
    faqs: [
      {
        q: "What industries do you specialize in?",
        a: "Our deepest experience is in FinTech, Healthcare, Legal Tech, and E-Commerce — industries where data complexity and regulatory requirements make AI engineering particularly challenging. That said, we've successfully delivered projects across logistics, edtech, and SaaS as well.",
      },
      {
        q: "Can you work with our existing tech stack?",
        a: "Yes. We integrate with your existing infrastructure rather than forcing a complete rewrite. Whether you're running on AWS, GCP, Azure, or on-premise, we adapt our approach to work within your technical constraints while still delivering modern AI capabilities.",
      },
      {
        q: "How do you handle data privacy and security?",
        a: "We take security extremely seriously. All code is written with security best practices, data handling follows least-privilege principles, and for regulated industries (healthcare, finance) we ensure compliance with relevant standards (HIPAA, SOC 2, GDPR). NDAs are signed before any sensitive information is shared.",
      },
    ],
  },
  {
    category: "Ongoing Support",
    color: "#00c8ff",
    faqs: [
      {
        q: "Do you provide post-launch support?",
        a: "Yes. Every project includes a 30-day post-launch support period at no extra cost. After that, we offer ongoing maintenance retainers that cover model monitoring, retraining, performance optimization, and feature development. Most clients stay with us well beyond the initial build.",
      },
      {
        q: "Can you work with our existing team?",
        a: "Yes — this is actually one of our preferred modes. We collaborate effectively with internal engineering teams, providing specialized AI expertise while your team handles domain-specific and product work. We're also happy to do knowledge transfer and upskilling so your team can maintain the systems we build.",
      },
    ],
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="border rounded-xl overflow-hidden"
      style={{
        background: open ? "rgba(0,200,255,0.04)" : "var(--joe-card)",
        borderColor: "var(--joe-card-border)",
      }}
      data-testid={`faq-item-${index}`}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
      >
        <span className="font-heading font-semibold text-joe-text text-base leading-snug">{q}</span>
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200"
          style={{
            borderColor: open ? "rgba(0,200,255,0.4)" : "var(--joe-card-border)",
            background: open ? "rgba(0,200,255,0.12)" : "var(--joe-overlay)",
          }}
        >
          {open ? <Minus className="w-3.5 h-3.5 text-[#00c8ff]" /> : <Plus className="w-3.5 h-3.5 text-joe-text/50" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5" style={{ borderTop: "1px solid var(--joe-card-border-subtle)" }}>
              <p className="text-joe-text/60 text-sm leading-relaxed pt-4">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  usePageTitle("FAQ");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  let globalIndex = 0;

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "var(--joe-bg-hero)" }}>
        <div className="absolute inset-0" style={{
          opacity: "var(--joe-glow-opacity)",
          backgroundImage: `linear-gradient(var(--joe-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--joe-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7c3aed]/20 bg-[#7c3aed]/8 mb-6">
              <HelpCircle className="w-4 h-4 text-[#7c3aed]" />
              <span className="text-[#7c3aed] text-sm font-mono font-medium">FAQ</span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-joe-text leading-tight">
              Questions We{" "}
              <span style={{
                background: "linear-gradient(135deg, #00c8ff, #0066ff, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Get Asked
              </span>
            </h1>
            <p className="text-joe-text/55 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know before starting a conversation with us. Can't find your answer? Reach out directly.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "var(--joe-bg-1)" }}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isInView && faqCategories.map((cat, ci) => {
            const startIndex = globalIndex;
            globalIndex += cat.faqs.length;
            return (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
                className="mb-12 last:mb-0"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-0.5 w-6 rounded-full" style={{ background: cat.color }} />
                  <h2 className="font-heading font-bold text-xl text-joe-text">{cat.category}</h2>
                </div>

                <div className="flex flex-col gap-3">
                  {cat.faqs.map((faq, fi) => (
                    <FAQItem key={fi} q={faq.q} a={faq.a} index={startIndex + fi} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative py-24 overflow-hidden" style={{ background: "var(--joe-bg-2)" }}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-3xl text-joe-text mb-4">
              Still Have Questions?
            </h2>
            <p className="text-joe-text/50 text-lg">
              We're happy to answer anything — no question is too early or too small.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "WhatsApp",
                description: "Quick questions? Chat with us directly on WhatsApp.",
                action: "Start Chat",
                href: "https://wa.me/2349017048791?text=Hi%20JOE%20Technologies%2C%20I%20have%20a%20question.",
                external: true,
                accent: "#00c8ff",
              },
              {
                icon: Mail,
                title: "Email",
                description: "Prefer email? We respond within 24 hours.",
                action: "Send Email",
                href: "mailto:jeffemuodafe124@gmail.com",
                external: true,
                accent: "#0066ff",
              },
              {
                icon: Phone,
                title: "Schedule a Call",
                description: "Book a free 45-minute strategy call with Jeffery.",
                action: "Get in Touch",
                href: "/contact",
                external: false,
                accent: "#7c3aed",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-xl border text-center hover-elevate"
                  style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
                  data-testid={`contact-method-${i}`}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${item.accent}12`, border: `1px solid ${item.accent}28` }}>
                    <Icon className="w-5 h-5" style={{ color: item.accent }} />
                  </div>
                  <h3 className="font-heading font-bold text-joe-text text-base mb-2">{item.title}</h3>
                  <p className="text-joe-text/50 text-sm leading-relaxed mb-4">{item.description}</p>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="font-semibold gap-2" style={{ borderColor: `${item.accent}30`, color: item.accent }}
                        data-testid={`button-faq-${item.title.toLowerCase()}`}>
                        {item.action}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  ) : (
                    <Link href={item.href}>
                      <Button variant="outline" className="font-semibold gap-2" style={{ borderColor: `${item.accent}30`, color: item.accent }}
                        data-testid={`button-faq-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                        {item.action}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
