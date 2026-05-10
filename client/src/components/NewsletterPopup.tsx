import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Mail, Sparkles, CheckCircle2, AlertCircle, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DELAY_MS = 4000;

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  consent: z.boolean().refine((v) => v === true, { message: "You must agree to continue" }),
});

type FormValues = z.infer<typeof formSchema>;

type ErrorKind = "validation" | "rate_limit" | "network" | "server" | null;

function parseError(err: unknown): { kind: ErrorKind; message: string } {
  const raw = err instanceof Error ? err.message : String(err);

  if (!navigator.onLine) {
    return { kind: "network", message: "You appear to be offline. Please check your connection and try again." };
  }
  if (raw.startsWith("429")) {
    return { kind: "rate_limit", message: "Too many attempts. Please wait a moment and try again." };
  }
  if (raw.startsWith("400")) {
    return { kind: "validation", message: "Please enter a valid email address." };
  }
  if (raw.startsWith("5")) {
    return { kind: "server", message: "Something went wrong on our end. Please try again shortly." };
  }
  return { kind: "server", message: "Unable to subscribe right now. Please try again." };
}

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errorKind, setErrorKind] = useState<ErrorKind>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  // Show after delay — every session
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (visible) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [visible]);

  // Escape key dismiss + focus first element on open
  useEffect(() => {
    if (!visible) return;
    firstFocusRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
      if (e.key === "Tab") trapFocus(e);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (!modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, []);

  const dismiss = () => setVisible(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", consent: false },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, consentGiven: "yes", source: "popup" }),
        credentials: "include",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw Object.assign(new Error(`${res.status}: ${json?.message ?? res.statusText}`), { status: res.status, body: json });
      }
      return json as { success: boolean; alreadyExists?: boolean };
    },
    onSuccess: () => {
      setSubmitError(null);
      setErrorKind(null);
      setDone(true);
      setTimeout(() => setVisible(false), 3200);
    },
    onError: (err: unknown) => {
      const { kind, message } = parseError(err);
      setSubmitError(message);
      setErrorKind(kind);
    },
  });

  const onSubmit = (data: FormValues) => {
    setSubmitError(null);
    setErrorKind(null);
    mutation.mutate(data);
  };

  const consentValue = form.watch("consent");

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="nl-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998]"
            style={{ background: "rgba(6,10,16,0.78)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="nl-modal"
            ref={modalRef}
            initial={{ opacity: 0, y: 48, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="nl-title"
            aria-describedby="nl-desc"
            className="fixed z-[9999] inset-x-0 bottom-0 sm:inset-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div
              className="relative overflow-hidden sm:rounded-2xl"
              style={{
                background: "linear-gradient(150deg, #0c1120 0%, #060A10 100%)",
                border: "1px solid rgba(72,242,251,0.2)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(72,242,251,0.07), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent 0%, #48F2FB 35%, #E867EA 65%, transparent 100%)" }}
              />
              {/* Glow orbs */}
              <div className="absolute top-0 right-0 w-64 h-48 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(72,242,251,0.07) 0%, transparent 70%)" }} />
              <div className="absolute bottom-0 left-0 w-48 h-40 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom left, rgba(232,103,234,0.06) 0%, transparent 70%)" }} />

              {/* Close */}
              <button
                ref={firstFocusRef}
                onClick={dismiss}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#48F2FB]/50"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                aria-label="Close newsletter signup"
                data-testid="button-newsletter-close"
              >
                <X className="w-3.5 h-3.5 text-white/45" />
              </button>

              <div className="relative z-10 p-6 sm:p-8">
                {/* Success state */}
                {done ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center text-center gap-5 py-3"
                  >
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(72,242,251,0.1)", border: "1px solid rgba(72,242,251,0.3)" }}
                    >
                      <CheckCircle2 className="w-8 h-8 text-[#48F2FB]" />
                    </motion.div>
                    <div>
                      <h3 id="nl-title" className="font-heading font-bold text-white text-xl">You're in!</h3>
                      <p id="nl-desc" className="text-white/45 text-sm mt-2 leading-relaxed max-w-xs mx-auto">
                        Welcome to the JOE Technologies inner circle. Expect sharp insights, no fluff.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="flex items-start gap-3.5 mb-5">
                      <div
                        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(72,242,251,0.1)", border: "1px solid rgba(72,242,251,0.2)" }}
                        aria-hidden="true"
                      >
                        <Mail className="w-5 h-5 text-[#48F2FB]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3 h-3 text-[#E867EA]" aria-hidden="true" />
                          <span className="text-[#E867EA] font-mono text-[11px] uppercase tracking-widest">Exclusive Updates</span>
                        </div>
                        <h2 id="nl-title" className="font-heading font-bold text-white text-[1.15rem] leading-snug">
                          Stay Ahead with JOE Technologies
                        </h2>
                      </div>
                    </div>

                    <p id="nl-desc" className="text-white/42 text-sm leading-relaxed mb-5">
                      Get early access to insights on AI, automation, and digital product engineering — plus exclusive resources and company news delivered straight to your inbox.
                    </p>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3.5" noValidate>

                      {/* Email field */}
                      <div>
                        <Input
                          id="nl-email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="your@email.com"
                          data-testid="input-newsletter-email"
                          aria-label="Email address"
                          aria-invalid={!!form.formState.errors.email}
                          aria-describedby={form.formState.errors.email ? "nl-email-error" : undefined}
                          className="h-11 text-white placeholder:text-white/22 focus-visible:ring-[#48F2FB]/40 transition-colors"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: `1px solid ${form.formState.errors.email ? "rgba(248,113,113,0.6)" : "rgba(255,255,255,0.1)"}`,
                          }}
                          {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                          <p id="nl-email-error" role="alert" className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Consent checkbox */}
                      <div>
                        <label
                          className="flex items-start gap-2.5 cursor-pointer select-none"
                          data-testid="label-newsletter-consent"
                        >
                          <div className="relative flex-shrink-0 mt-0.5">
                            <input
                              type="checkbox"
                              id="nl-consent"
                              data-testid="checkbox-newsletter-consent"
                              aria-describedby={form.formState.errors.consent ? "nl-consent-error" : undefined}
                              className="absolute inset-0 w-4 h-4 opacity-0 cursor-pointer z-10"
                              {...form.register("consent")}
                            />
                            <div
                              className="w-4 h-4 rounded flex items-center justify-center pointer-events-none transition-all duration-150"
                              style={{
                                background: consentValue ? "rgba(72,242,251,0.18)" : "rgba(255,255,255,0.05)",
                                border: `1px solid ${consentValue ? "rgba(72,242,251,0.55)" : form.formState.errors.consent ? "rgba(248,113,113,0.6)" : "rgba(255,255,255,0.15)"}`,
                              }}
                            >
                              {consentValue && (
                                <svg className="w-2.5 h-2.5 text-[#48F2FB]" fill="none" viewBox="0 0 10 8" aria-hidden="true">
                                  <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-white/35 text-xs leading-relaxed">
                            I agree to receive marketing emails from JOE Technologies. I can unsubscribe at any time.
                          </span>
                        </label>
                        {form.formState.errors.consent && (
                          <p id="nl-consent-error" role="alert" className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            {form.formState.errors.consent.message}
                          </p>
                        )}
                      </div>

                      {/* Server / network error banner */}
                      {submitError && !mutation.isPending && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          role="alert"
                          aria-live="assertive"
                          className="flex items-start gap-2.5 p-3 rounded-lg text-xs"
                          style={{
                            background: errorKind === "network" ? "rgba(251,191,36,0.08)" : "rgba(248,113,113,0.08)",
                            border: `1px solid ${errorKind === "network" ? "rgba(251,191,36,0.25)" : "rgba(248,113,113,0.25)"}`,
                          }}
                        >
                          {errorKind === "network"
                            ? <WifiOff className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-400" />
                            : <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-red-400" />}
                          <span style={{ color: errorKind === "network" ? "rgba(251,191,36,0.85)" : "rgba(248,113,113,0.85)" }}>
                            {submitError}
                          </span>
                        </motion.div>
                      )}

                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full h-11 border-0 font-semibold text-[#060A10] gap-2 transition-all duration-200 hover:opacity-90 hover:scale-[1.015] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#48F2FB]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060A10]"
                        style={{
                          background: "linear-gradient(135deg, #48F2FB 0%, #E867EA 100%)",
                          boxShadow: mutation.isPending ? "none" : "0 6px 20px rgba(72,242,251,0.22)",
                        }}
                        data-testid="button-newsletter-submit"
                        aria-busy={mutation.isPending}
                      >
                        {mutation.isPending ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-[#060A10]/25 border-t-[#060A10] rounded-full animate-spin" />
                            <span>Subscribing…</span>
                          </div>
                        ) : submitError ? (
                          "Try Again"
                        ) : (
                          "Subscribe — It's Free"
                        )}
                      </Button>

                      {/* Skip */}
                      <button
                        type="button"
                        onClick={dismiss}
                        className="text-white/22 text-xs text-center hover:text-white/38 transition-colors py-1 focus-visible:outline-none focus-visible:text-white/50"
                        data-testid="button-newsletter-skip"
                      >
                        No thanks, I'll pass
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
