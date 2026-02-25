import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    window.open(
      "https://wa.me/2349017048791?text=Hello%20Jeffery%2C%20I%20visited%20joetechnologies.io%20and%20I%27d%20love%20to%20discuss%20a%20project.",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-[#111827] border border-white/15 rounded-xl p-4 shadow-xl shadow-black/40 max-w-[220px] text-right"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-white font-semibold text-sm">Chat with Jeffery</p>
              <button
                onClick={() => setShowTooltip(false)}
                className="text-white/40 hover:text-white/70 transition-colors flex-shrink-0"
                aria-label="Close tooltip"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-white/55 text-xs leading-relaxed">
              Get a quick response on WhatsApp about your project.
            </p>
            <button
              onClick={handleClick}
              className="mt-3 w-full bg-[#25d366] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#20bd5c] transition-colors"
              data-testid="button-whatsapp-tooltip"
            >
              Start Chat
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.4, type: "spring" }}
        onClick={() => setShowTooltip(!showTooltip)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-black/50 cursor-pointer"
        style={{ background: "linear-gradient(135deg, #25d366, #128c4a)" }}
        aria-label="Chat on WhatsApp"
        data-testid="button-whatsapp-floating"
      >
        <MessageCircle className="w-7 h-7 text-white" />

        {/* Pulse ring */}
        <span className="absolute w-14 h-14 rounded-full animate-ping opacity-30 bg-[#25d366]" />
      </motion.button>
    </div>
  );
}
