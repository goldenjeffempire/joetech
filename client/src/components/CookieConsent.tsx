import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("joe-cookies-accepted");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("joe-cookies-accepted", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
          data-testid="cookie-consent"
        >
          <div
            className="max-w-4xl mx-auto p-4 sm:p-5 rounded-xl border backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{
              background: "var(--joe-nav-bg)",
              borderColor: "var(--joe-card-border)",
            }}
          >
            <p className="text-joe-text/60 text-sm leading-relaxed flex-1">
              We use essential cookies to ensure this website functions properly. No tracking or
              advertising cookies are used. By continuing to use this site, you consent to our use
              of essential cookies.
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                onClick={accept}
                size="sm"
                className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold text-xs"
                data-testid="button-accept-cookies"
              >
                Accept
              </Button>
              <button
                onClick={accept}
                className="p-1.5 rounded-md text-joe-text/40 hover:text-joe-text/70 transition-colors"
                aria-label="Dismiss cookie notice"
                data-testid="button-dismiss-cookies"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
