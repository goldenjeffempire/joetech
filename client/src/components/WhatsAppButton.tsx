import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ChevronRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useLocation } from "wouter";
import { WA_CONTACTS } from "@/lib/wa-contacts";

const PAGE_MESSAGES: Record<string, string> = {
  "/services/app-development":
    "Hi JOE Technologies! I'm interested in App Development services. I visited your site and would love to discuss building an app for my project.",
  "/services/website-design":
    "Hi JOE Technologies! I'm interested in Website Design & Development. I visited your site and would love to discuss a website for my business.",
  "/services/uiux-design":
    "Hi JOE Technologies! I'm interested in UI/UX Design services. I visited your site and would love to talk about designing a great user experience.",
  "/services/automation":
    "Hi JOE Technologies! I'm interested in Automation Systems. I visited your site and would love to discuss automating workflows for my business.",
  "/services/ai-strategy":
    "Hi JOE Technologies! I'm interested in AI Strategy & Architecture. I visited your site and would love to explore an AI roadmap for my organisation.",
  "/services/custom-ai":
    "Hi JOE Technologies! I'm interested in Custom AI Development. I visited your site and would love to discuss building a custom AI solution.",
  "/services/mlops":
    "Hi JOE Technologies! I'm interested in MLOps & Infrastructure. I visited your site and would love to discuss ML pipeline and infrastructure needs.",
  "/services/ai-integration":
    "Hi JOE Technologies! I'm interested in AI Integration & APIs. I visited your site and would love to discuss integrating AI into my existing systems.",
  "/services/full-stack":
    "Hi JOE Technologies! I'm interested in Full-Stack Development. I visited your site and would love to discuss a digital systems project.",
  "/services/advisory":
    "Hi JOE Technologies! I'm interested in your Digital Advisory service. I visited your site and would love to explore how you can guide my technology strategy.",
  "/services":
    "Hi JOE Technologies! I visited your services page and I'd love to discuss which service best fits my needs.",
  "/portfolio":
    "Hi JOE Technologies! I saw your portfolio and I'm really impressed. I'd love to discuss a project with your team.",
  "/about":
    "Hi JOE Technologies! I've been learning about your team and I'd love to have a conversation about working together.",
  "/qualify":
    "Hi JOE Technologies! I've just completed your qualification form and I'd love to chat further about my project.",
};

const DEFAULT_MESSAGE =
  "Hello JOE Technologies! I visited joetechnologies.io and I'd love to discuss a project with your team.";

function usePageMessage(): string {
  const [location] = useLocation();
  return PAGE_MESSAGES[location] ?? DEFAULT_MESSAGE;
}

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const pageMessage = usePageMessage();
  const [open, setOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    setShowBadge(false);
    const handleOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  return (
    <div
      ref={panelRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      data-testid="whatsapp-float-container"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "linear-gradient(145deg, rgba(8,13,28,0.98), rgba(3,8,18,0.99))",
              borderColor: "rgba(0,255,136,0.18)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,136,0.08)",
              width: "284px",
            }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3.5 border-b"
              style={{ borderColor: "rgba(0,255,136,0.1)", background: "rgba(0,255,136,0.03)" }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#00ff88]/12 border border-[#00ff88]/25 flex items-center justify-center">
                  <SiWhatsapp className="w-5 h-5 text-[#00ff88]" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00ff88] border-2 border-[#04060d]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-heading font-semibold text-sm leading-tight">JOE Technologies</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                  <p className="text-[#00ff88] text-xs font-mono">Online · Typically replies fast</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/25 hover:text-white/55 hover:bg-white/5 transition-all"
                aria-label="Close chat panel"
                data-testid="whatsapp-float-close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="px-4 pt-3.5 pb-2">
              <div
                className="rounded-xl px-4 py-3 mb-4 text-sm text-white/55 leading-relaxed"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                👋 Hi there! Ready to discuss your project? Choose a number below to start chatting on WhatsApp.
              </div>

              <p className="text-white/28 text-[10px] font-mono uppercase tracking-widest mb-2.5">Select a contact</p>
              <div className="flex flex-col gap-2">
                {WA_CONTACTS.map((n, i) => (
                  <a
                    key={i}
                    href={n.wa(pageMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200"
                    style={{
                      background: "rgba(0,255,136,0.03)",
                      borderColor: "rgba(0,255,136,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,255,136,0.09)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,136,0.28)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,255,136,0.03)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,136,0.1)";
                    }}
                    data-testid={`whatsapp-float-number-${i}`}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)" }}
                    >
                      <SiWhatsapp className="w-4 h-4 text-[#25d366]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm font-semibold leading-tight">{n.label}</p>
                      <p className="text-white/30 text-xs font-mono mt-0.5">{n.number}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#25d366]/30 group-hover:text-[#25d366] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            <div
              className="px-4 py-3 border-t mt-1"
              style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.25)" }}
            >
              <p className="text-white/18 text-[10px] text-center font-mono">
                JOE Technologies · joetechnologies.io
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.4, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="relative"
          >
            <AnimatePresence>
              {showBadge && !open && (
                <motion.div
                  initial={{ opacity: 0, x: 6, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 6, scale: 0.85 }}
                  transition={{ delay: 0.6, duration: 0.22 }}
                  className="absolute -top-2 right-16 z-10 whitespace-nowrap"
                >
                  <span
                    className="text-[11px] font-mono font-bold text-white px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5"
                    style={{
                      background: "linear-gradient(135deg, #25d366, #128c7e)",
                      boxShadow: "0 4px 16px rgba(37,211,102,0.45)",
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Chat with us
                  </span>
                  <div
                    className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft: "6px solid #128c7e",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setOpen((p) => !p)}
              className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
              style={{
                background: open
                  ? "linear-gradient(135deg, #1a1e2e, #0d1018)"
                  : "linear-gradient(135deg, #25d366, #128c7e)",
                boxShadow: open
                  ? "0 8px 28px rgba(0,0,0,0.55)"
                  : "0 8px 28px rgba(37,211,102,0.45)",
              }}
              aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
              data-testid="whatsapp-float-toggle"
            >
              {!open && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.45, 0, 0.45] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: "rgba(37,211,102,0.35)" }}
                />
              )}

              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="w-6 h-6 text-white/60" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="chat"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.18 }}
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
