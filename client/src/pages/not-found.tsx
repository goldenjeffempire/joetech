import { motion } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "var(--joe-bg-solid)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-[#00c8ff] to-[#0066ff]">
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-heading font-bold text-xl text-joe-text tracking-wider">
            JOE<span className="text-[#00c8ff]">.</span>
          </span>
        </div>

        <h1
          className="font-heading font-bold text-joe-text mb-2"
          style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>
        </h1>

        <p className="font-heading font-semibold text-joe-text text-xl mb-2">
          Page Not Found
        </p>
        <p className="text-joe-text/50 text-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide gap-2"
          data-testid="button-404-home"
        >
          <a href="/">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </Button>
      </motion.div>
    </div>
  );
}
