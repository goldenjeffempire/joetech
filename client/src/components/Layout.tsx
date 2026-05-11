import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CookieConsent from "@/components/CookieConsent";
import NewsletterPopup from "@/components/NewsletterPopup";

interface LayoutProps {
  children: React.ReactNode;
}

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] },
};

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <ScrollProgressBar />
      <Navigation />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={location}
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          transition={pageTransition.transition}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
      <NewsletterPopup />
    </div>
  );
}
