import { motion } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { Cookie, Info, Settings, ShieldCheck, ToggleLeft, Mail } from "lucide-react";

const sections = [
  {
    icon: Info,
    title: "What Are Cookies?",
    content: [
      "Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work more efficiently and to provide information to site owners.",
      "Cookies can be 'session' cookies (which are deleted when you close your browser) or 'persistent' cookies (which remain on your device for a set period or until you delete them).",
    ],
  },
  {
    icon: Settings,
    title: "Cookies We Use",
    content: [
      "JOE Technologies uses a minimal set of cookies — strictly limited to what's necessary for the website to function properly:",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Cookies We Do NOT Use",
    content: [
      "We are committed to your privacy. The following types of cookies are NOT used on this website:",
      "• Analytics or tracking cookies (Google Analytics, Hotjar, Mixpanel, etc.)",
      "• Advertising or remarketing cookies (Google Ads, Facebook Pixel, etc.)",
      "• Third-party social media tracking cookies",
      "• Cross-site tracking or fingerprinting technologies",
      "• Any cookies that collect personally identifiable information",
      "We believe in a clean, tracking-free web experience. Your browsing activity on our site is not monitored, recorded, or shared with any third parties.",
    ],
  },
  {
    icon: ToggleLeft,
    title: "Managing Your Cookies",
    content: [
      "Since we only use essential cookies stored via your browser's localStorage (not traditional HTTP cookies), you can manage them in the following ways:",
      "• Clear localStorage: Open your browser's Developer Tools (F12), go to Application → Local Storage, and delete entries starting with 'joe-'",
      "• Reset theme: Delete the 'joe-theme' entry to revert to the default dark theme",
      "• Reset cookie consent: Delete the 'joe-cookies-accepted' entry to see the consent banner again",
      "Most browsers also allow you to block all cookies through their settings. However, since our site only uses essential functionality cookies, blocking them may affect your experience (e.g., your theme preference won't be saved).",
    ],
  },
];

const cookieTable = [
  {
    name: "joe-theme",
    purpose: "Stores your preferred color theme (dark or light mode)",
    type: "localStorage",
    duration: "Persistent until cleared",
    category: "Essential / Functionality",
  },
  {
    name: "joe-cookies-accepted",
    purpose: "Records that you've acknowledged the cookie consent banner",
    type: "localStorage",
    duration: "Persistent until cleared",
    category: "Essential / Compliance",
  },
];

export default function CookiePolicy() {
  useSeo({
    title: "Cookie Policy",
    description: "JOE Technologies' Cookie Policy — what cookies we use, why we use them, and how you can manage them.",
    canonical: "/cookies",
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
              <Cookie className="w-5 h-5 text-[#48F2FB]" />
              <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">
                Legal
              </span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mb-4">
              Cookie{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #48F2FB, #E867EA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Policy
              </span>
            </h1>
            <p className="text-joe-text/50 text-lg max-w-2xl mx-auto" data-testid="text-cookies-subtitle">
              A transparent breakdown of how cookies and local storage are used on this website.
            </p>
            <p className="text-joe-text/30 text-sm font-mono mt-4" data-testid="text-cookies-updated">
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
              background: "rgba(72,242,251,0.04)",
              borderColor: "rgba(72,242,251,0.15)",
            }}
          >
            <p className="text-joe-text/65 text-sm leading-relaxed">
              JOE Technologies is committed to transparency about how we use technology on our
              website. This Cookie Policy explains what cookies and similar technologies we use,
              why we use them, and how you can control them. The short version: we use almost
              nothing — just two essential localStorage items for your preferences.
            </p>
          </motion.div>

          {sections.slice(0, 1).map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="p-6 rounded-xl border mb-6"
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`cookie-section-${i}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(72,242,251,0.1)", border: "1px solid rgba(72,242,251,0.2)" }}
                  >
                    <Icon className="w-4 h-4 text-[#48F2FB]" />
                  </div>
                  <h2 className="font-heading font-bold text-joe-text text-lg">{section.title}</h2>
                </div>
                <div className="flex flex-col gap-2">
                  {section.content.map((line, li) => (
                    <p key={li} className="text-joe-text/60 text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-xl border mb-6"
            style={{
              background: "var(--joe-card)",
              borderColor: "var(--joe-card-border)",
            }}
            data-testid="cookie-section-table"
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(72,242,251,0.1)", border: "1px solid rgba(72,242,251,0.2)" }}
              >
                <Settings className="w-4 h-4 text-[#48F2FB]" />
              </div>
              <h2 className="font-heading font-bold text-joe-text text-lg">Cookies We Use</h2>
            </div>

            <p className="text-joe-text/60 text-sm leading-relaxed mb-5">
              JOE Technologies uses a minimal set of cookies — strictly limited to what's
              necessary for the website to function properly:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--joe-card-border)" }}>
                    <th className="text-left text-joe-text/50 font-mono text-xs uppercase tracking-wider pb-3 pr-4">Name</th>
                    <th className="text-left text-joe-text/50 font-mono text-xs uppercase tracking-wider pb-3 pr-4">Purpose</th>
                    <th className="text-left text-joe-text/50 font-mono text-xs uppercase tracking-wider pb-3 pr-4 hidden sm:table-cell">Type</th>
                    <th className="text-left text-joe-text/50 font-mono text-xs uppercase tracking-wider pb-3 pr-4 hidden md:table-cell">Duration</th>
                    <th className="text-left text-joe-text/50 font-mono text-xs uppercase tracking-wider pb-3 hidden lg:table-cell">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieTable.map((cookie, ci) => (
                    <tr
                      key={ci}
                      style={{ borderBottom: ci < cookieTable.length - 1 ? "1px solid var(--joe-card-border-subtle)" : undefined }}
                      data-testid={`cookie-row-${ci}`}
                    >
                      <td className="py-3 pr-4">
                        <code className="text-[#48F2FB] font-mono text-xs px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(72,242,251,0.1)" }}>
                          {cookie.name}
                        </code>
                      </td>
                      <td className="py-3 pr-4 text-joe-text/60">{cookie.purpose}</td>
                      <td className="py-3 pr-4 text-joe-text/45 hidden sm:table-cell">{cookie.type}</td>
                      <td className="py-3 pr-4 text-joe-text/45 hidden md:table-cell">{cookie.duration}</td>
                      <td className="py-3 text-joe-text/45 hidden lg:table-cell">
                        <span className="px-2 py-0.5 rounded-full text-xs border"
                          style={{ background: "rgba(0,255,136,0.08)", borderColor: "rgba(0,255,136,0.2)", color: "#00ff88" }}>
                          {cookie.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {sections.slice(2).map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={i + 2}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.06 }}
                className="p-6 rounded-xl border mb-6"
                style={{
                  background: "var(--joe-card)",
                  borderColor: "var(--joe-card-border)",
                }}
                data-testid={`cookie-section-${i + 2}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(72,242,251,0.1)", border: "1px solid rgba(72,242,251,0.2)" }}
                  >
                    <Icon className="w-4 h-4 text-[#48F2FB]" />
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 p-6 rounded-xl border flex items-start gap-4"
            style={{
              background: "var(--joe-card)",
              borderColor: "var(--joe-card-border)",
            }}
          >
            <Mail className="w-5 h-5 text-[#48F2FB] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-bold text-joe-text text-base mb-1">
                Questions About Cookies?
              </h3>
              <p className="text-joe-text/55 text-sm leading-relaxed">
                If you have any questions about our use of cookies or this policy, please contact us at{" "}
                <a
                  href="mailto:jeffemuodafe124@gmail.com"
                  className="text-[#48F2FB] hover:underline"
                  data-testid="link-cookies-email"
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
