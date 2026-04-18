import { motion } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { FileText, Handshake, Scale, AlertTriangle, Banknote, ShieldCheck, RefreshCw, Mail } from "lucide-react";

const sections = [
  {
    icon: Handshake,
    title: "1. Engagement & Scope",
    content: [
      "JOE Technologies provides enterprise technology services including, but not limited to: application development, website design and development, automation systems, business process optimization, UI/UX design, digital systems engineering, AI and machine learning solutions, AI integration, full-stack development, and technical advisory services.",
      "All engagements begin with a mutual agreement on scope, deliverables, timeline, and pricing. A formal Statement of Work (SOW) or engagement letter will be provided before any paid work commences.",
      "The scope of work for each engagement is defined in the SOW. Any changes to scope, timeline, or deliverables must be agreed upon in writing by both parties before implementation.",
    ],
  },
  {
    icon: Banknote,
    title: "2. Pricing & Payment",
    content: [
      "Pricing is based on the engagement model selected:",
      "• Project-based — Fixed scope, fixed timeline, fixed price",
      "• Retainer — Dedicated monthly capacity at an agreed rate",
      "• Embedded — Staffing arrangement with defined billing terms",
      "Payment terms, including deposit requirements, milestone payments, and final payments, will be specified in each engagement's SOW. Unless otherwise agreed, invoices are due within 14 days of issuance.",
      "Late payments may incur a charge of 1.5% per month on the outstanding balance. JOE Technologies reserves the right to pause work on an engagement if payment is more than 30 days overdue.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "3. Intellectual Property",
    content: [
      "Upon full payment, all custom code, models, and deliverables created specifically for the client's engagement are assigned to the client, unless otherwise specified in the SOW.",
      "JOE Technologies retains ownership of:",
      "• Pre-existing tools, frameworks, libraries, and methodologies used in the engagement",
      "• General knowledge, techniques, and expertise gained during the engagement",
      "• Open-source contributions made during or as a result of the engagement",
      "JOE Technologies may reference the engagement (without disclosing confidential details) in marketing materials, case studies, and portfolio presentations, unless a Non-Disclosure Agreement (NDA) explicitly prohibits this.",
    ],
  },
  {
    icon: Scale,
    title: "4. Confidentiality",
    content: [
      "Both parties agree to keep confidential any proprietary information, trade secrets, technical data, business strategies, or other sensitive information shared during the engagement.",
      "Confidentiality obligations survive the termination of the engagement for a period of two (2) years, unless otherwise specified in an NDA.",
      "Confidential information does not include information that is publicly available, independently developed, or rightfully received from a third party without restriction.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "5. Limitation of Liability",
    content: [
      "JOE Technologies provides services on an 'as-is' basis. While we strive for the highest quality in all deliverables, we do not guarantee that AI models will achieve specific accuracy, performance, or business outcome targets unless explicitly stated in the SOW.",
      "In no event shall JOE Technologies' total liability for any claim arising from or related to an engagement exceed the total fees paid by the client for that specific engagement.",
      "JOE Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, even if advised of the possibility of such damages.",
    ],
  },
  {
    icon: RefreshCw,
    title: "6. Termination",
    content: [
      "Either party may terminate an engagement with 14 days' written notice. Upon termination:",
      "• The client is responsible for payment of all work completed up to the termination date",
      "• JOE Technologies will deliver all completed work and work-in-progress to the client",
      "• Any prepaid amounts for undelivered work will be refunded on a pro-rata basis",
      "JOE Technologies reserves the right to terminate an engagement immediately if the client breaches the terms of the SOW, fails to make payment, or engages in conduct that is harmful to JOE Technologies' reputation or business.",
    ],
  },
  {
    icon: FileText,
    title: "7. Website Use",
    content: [
      "This website is provided for informational purposes. By using this website, you agree to:",
      "• Use the contact form only for legitimate project inquiries",
      "• Not attempt to exploit, hack, or abuse any functionality on this website",
      "• Not submit false, misleading, or spam content through the contact form",
      "JOE Technologies reserves the right to block or restrict access to users who violate these terms or abuse the contact form (rate limiting is enforced at 5 submissions per 15 minutes).",
    ],
  },
  {
    icon: Scale,
    title: "8. Governing Law",
    content: [
      "These Terms of Service are governed by and construed in accordance with applicable laws. Any disputes arising from these terms or any engagement with JOE Technologies shall be resolved through good-faith negotiation first, followed by mediation if necessary.",
      "If mediation is unsuccessful, disputes may be submitted to binding arbitration in a jurisdiction agreed upon by both parties.",
    ],
  },
];

export default function TermsOfService() {
  useSeo({
    title: "Terms of Service",
    description: "JOE Technologies' Terms of Service — the terms governing your engagement with us for app development, AI, automation, and other digital services.",
    canonical: "/terms",
    noindex: true,
  });

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
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-[#00c8ff]" />
              <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">
                Legal
              </span>
            </div>
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mb-4">
              Terms of{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00c8ff, #0066ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Service
              </span>
            </h1>
            <p className="text-joe-text/50 text-lg max-w-2xl mx-auto" data-testid="text-terms-subtitle">
              The terms governing your use of our website and engagement with JOE Technologies.
            </p>
            <p className="text-joe-text/30 text-sm font-mono mt-4" data-testid="text-terms-updated">
              Last updated: February 2026
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ background: "var(--joe-bg-1)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-xl border mb-10"
            style={{
              background: "rgba(0,200,255,0.04)",
              borderColor: "rgba(0,200,255,0.15)",
            }}
          >
            <p className="text-joe-text/65 text-sm leading-relaxed">
              Please read these Terms of Service ("Terms") carefully before using the JOE Technologies
              website or engaging our consulting services. By accessing our website or entering into an
              engagement with us, you agree to be bound by these Terms. If you do not agree, please
              refrain from using our website or services.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
                  className="p-6 rounded-xl border"
                  style={{
                    background: "var(--joe-card)",
                    borderColor: "var(--joe-card-border)",
                  }}
                  data-testid={`terms-section-${i}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.2)" }}
                    >
                      <Icon className="w-4 h-4 text-[#00c8ff]" />
                    </div>
                    <h2 className="font-heading font-bold text-joe-text text-lg">{section.title}</h2>
                  </div>
                  <div className="flex flex-col gap-2">
                    {section.content.map((line, li) => (
                      <p
                        key={li}
                        className={`text-sm leading-relaxed ${
                          line.startsWith("•") ? "text-joe-text/55 pl-4" : "text-joe-text/60"
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 p-6 rounded-xl border flex items-start gap-4"
            style={{
              background: "var(--joe-card)",
              borderColor: "var(--joe-card-border)",
            }}
          >
            <Mail className="w-5 h-5 text-[#00c8ff] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-joe-text text-base mb-1">
                Questions About These Terms?
              </h3>
              <p className="text-joe-text/55 text-sm leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{" "}
                <a
                  href="mailto:jeffemuodafe124@gmail.com"
                  className="text-[#00c8ff] hover:underline"
                  data-testid="link-terms-email"
                >
                  jeffemuodafe124@gmail.com
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
