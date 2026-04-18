import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CookieConsent from "@/components/CookieConsent";

interface LayoutProps {
  children: React.ReactNode;
}

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: "easeInOut" },
};

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <ScrollProgressBar />
      <Navigation />
      <AnimatePresence mode="wait">
        <motion.main
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
    </div>
  );
}
