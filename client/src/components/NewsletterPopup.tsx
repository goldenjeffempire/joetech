import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  X, Mail, Sparkles, CheckCircle2, AlertCircle, WifiOff, UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

// ─── Config ────────────────────────────────────────────────────────────────────
const DELAY_MS = 6000;            // show after 6 s of idle
const SCROLL_PCT = 0.40;          // OR after 40 % scroll depth
const SESSION_KEY = "joe-nl-dismissed"; // sessionStorage — resets each visit
const SUBSCRIBED_KEY = "joe-newsletter-subscribed"; // localStorage — permanent

// Pages where the popup would be intrusive / irrelevant
const SUPPRESSED_PATHS = new Set([
  "/admin", "/qualify", "/privacy", "/terms", "/cookies",
]);

// ─── Schema ────────────────────────────────────────────────────────────────────
const schema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "Please tick the box to continue" }),
  website: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

type ErrorKind = "validation" | "rate_limit" | "network" | "server" | null;

function parseApiError(err: unknown): { kind: ErrorKind; message: string } {
  const raw = err instanceof Error ? err.message : String(err);

  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return {
      kind: "network",
      message: "You appear to be offline. Check your connection and try again.",
    };
  }
  if (raw.startsWith("429")) {
    return { kind: "rate_limit", message: "Too many attempts. Please wait a moment and try again." };
  }
  if (raw.startsWith("400")) {
    return { kind: "validation", message: "Please enter a valid email address." };
  }
  if (/^5\d{2}/.test(raw)) {
    return { kind: "server", message: "Something went wrong on our end. Please try again shortly." };
  }
  return { kind: "server", message: "Unable to subscribe right now. Please try again." };
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function NewsletterPopup() {
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errorKind, setErrorKind] = useState<ErrorKind>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggeredRef = useRef(false);

  // ── Trigger logic: timer OR scroll depth, whichever fires first ─────────────
  useEffect(() => {
    // Reset between navigations so the popup can re-evaluate
    triggeredRef.current = false;
    setVisible(false);
    setDone(false);
    setAlreadySubscribed(false);
    setSubmitError(null);
    setErrorKind(null);

    if (SUPPRESSED_PATHS.has(location)) return;

    // Guard: subscribed (permanent) or dismissed this session
    try {
      if (localStorage.getItem(SUBSCRIBED_KEY)) return;
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch { /* storage unavailable — show popup */ }

    const trigger = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      setVisible(true);
    };

    const timer = setTimeout(trigger, DELAY_MS);

    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= SCROLL_PCT) trigger();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [location]);

  // ── Dismiss: store in sessionStorage so popup reappears on next visit ────────
  const dismiss = useCallback(() => {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ignore */ }
    setVisible(false);
  }, []);

  // ── Body scroll lock ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [visible]);

  // ── Focus management + keyboard handling ─────────────────────────────────────
  useEffect(() => {
    if (!visible) return;

    // Focus the close button as soon as the modal mounts
    requestAnimationFrame(() => closeRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.closest('[aria-hidden="true"]'));

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  // ── Form ─────────────────────────────────────────────────────────────────────
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", consent: false, website: "" },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          consentGiven: "yes",
          source: "popup",
          website: values.website ?? "", // honeypot
        }),
        credentials: "include",
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw Object.assign(
          new Error(`${res.status}: ${(json as { message?: string })?.message ?? res.statusText}`),
          { status: res.status, body: json }
        );
      }

      return json as { success: boolean; alreadyExists?: boolean };
    },

    onSuccess: (data) => {
      setSubmitError(null);
      setErrorKind(null);
      setAlreadySubscribed(data.alreadyExists === true);
      setDone(true);
      // Permanently suppress — subscribed users never see this again
      try { localStorage.setItem(SUBSCRIBED_KEY, "true"); } catch { /* ignore */ }
      setTimeout(() => setVisible(false), 4000);
    },

    onError: (err) => {
      const { kind, message } = parseApiError(err);
      setSubmitError(message);
      setErrorKind(kind);
    },
  });

  const onSubmit = (values: FormValues) => {
    setSubmitError(null);
    setErrorKind(null);
    mutation.mutate(values);
  };

  const consentChecked = form.watch("consent");

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="nl-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[9998]"
            style={{
              background: "rgba(6,10,16,0.80)",
              backdropFilter: "blur(7px)",
              WebkitBackdropFilter: "blur(7px)",
            }}
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* ── Modal ── */}
          <motion.div
            key="nl-modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="nl-title"
            aria-describedby="nl-desc"
            initial={{ opacity: 0, y: 52, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 36, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[9999] inset-x-0 bottom-0 sm:inset-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-[440px]"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div
              className="relative overflow-hidden sm:rounded-2xl"
              style={{
                background: "linear-gradient(155deg, #0c1222 0%, #060A10 100%)",
                border: "1px solid rgba(72,242,251,0.18)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.72), 0 0 60px rgba(72,242,251,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Accent line */}
              <div
                className="absolute top-0 inset-x-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #48F2FB 35%, #E867EA 65%, transparent 100%)",
                }}
              />
              {/* Glow orbs */}
              <div
                className="absolute top-0 right-0 w-72 h-56 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, rgba(72,242,251,0.08) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-52 h-44 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom left, rgba(232,103,234,0.07) 0%, transparent 70%)",
                }}
              />

              {/* Close button */}
              <button
                ref={closeRef}
                onClick={dismiss}
                aria-label="Close newsletter signup"
                data-testid="button-newsletter-close"
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#48F2FB]/50"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.13)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)")
                }
              >
                <X className="w-3.5 h-3.5 text-white/50" />
              </button>

              {/* ── Content ── */}
              <div className="relative z-10 p-6 sm:p-8">

                {/* Success state */}
                {done ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center text-center gap-5 py-2"
                  >
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 280, damping: 22 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: alreadySubscribed
                          ? "rgba(232,103,234,0.1)"
                          : "rgba(72,242,251,0.1)",
                        border: `1px solid ${alreadySubscribed ? "rgba(232,103,234,0.32)" : "rgba(72,242,251,0.32)"}`,
                      }}
                    >
                      {alreadySubscribed ? (
                        <UserCheck className="w-7 h-7 text-[#E867EA]" />
                      ) : (
                        <CheckCircle2 className="w-7 h-7 text-[#48F2FB]" />
                      )}
                    </motion.div>

                    <div className="space-y-2">
                      <h3
                        id="nl-title"
                        className="font-heading font-bold text-white text-xl"
                      >
                        {alreadySubscribed ? "Already on the list!" : "You're in!"}
                      </h3>
                      <p
                        id="nl-desc"
                        className="text-white/45 text-sm leading-relaxed max-w-xs mx-auto"
                      >
                        {alreadySubscribed
                          ? "You're already subscribed — keep an eye on your inbox for the latest from JOE Technologies."
                          : "Welcome to the JOE Technologies inner circle. Sharp insights, zero fluff — straight to your inbox."}
                      </p>
                    </div>
                  </motion.div>

                ) : (
                  /* Form state */
                  <>
                    {/* Header */}
                    <div className="flex items-start gap-3.5 mb-5">
                      <div
                        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          background: "rgba(72,242,251,0.09)",
                          border: "1px solid rgba(72,242,251,0.2)",
                        }}
                        aria-hidden="true"
                      >
                        <Mail className="w-5 h-5 text-[#48F2FB]" />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3 h-3 text-[#E867EA]" aria-hidden="true" />
                          <span className="text-[#E867EA] font-mono text-[10.5px] uppercase tracking-widest">
                            Exclusive Updates
                          </span>
                        </div>
                        <h2
                          id="nl-title"
                          className="font-heading font-bold text-white text-[1.12rem] leading-snug"
                        >
                          Stay Ahead with JOE Technologies
                        </h2>
                      </div>
                    </div>

                    <p
                      id="nl-desc"
                      className="text-white/40 text-[13px] leading-relaxed mb-5"
                    >
                      Get early access to insights on AI, automation, and digital product engineering — plus exclusive resources delivered straight to your inbox.
                    </p>

                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col gap-3.5"
                      noValidate
                    >
                      {/* Honeypot — invisible to real users, catches bots */}
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: "-9999px",
                          width: "1px",
                          height: "1px",
                          opacity: 0,
                        }}
                        {...form.register("website")}
                      />

                      {/* Email */}
                      <div>
                        <Input
                          id="nl-email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="your@email.com"
                          data-testid="input-newsletter-email"
                          aria-label="Email address"
                          aria-required="true"
                          aria-invalid={!!form.formState.errors.email}
                          aria-describedby={
                            form.formState.errors.email ? "nl-email-err" : undefined
                          }
                          className="h-11 text-white placeholder:text-white/20 focus-visible:ring-[#48F2FB]/40 transition-colors"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: `1px solid ${form.formState.errors.email ? "rgba(248,113,113,0.55)" : "rgba(255,255,255,0.10)"}`,
                          }}
                          {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                          <p
                            id="nl-email-err"
                            role="alert"
                            className="flex items-center gap-1 text-red-400 text-xs mt-1.5"
                          >
                            <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Consent */}
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
                              aria-required="true"
                              aria-describedby={
                                form.formState.errors.consent ? "nl-consent-err" : undefined
                              }
                              className="absolute inset-0 w-4 h-4 opacity-0 cursor-pointer z-10"
                              {...form.register("consent")}
                            />
                            <div
                              className="w-4 h-4 rounded flex items-center justify-center pointer-events-none transition-all duration-150"
                              style={{
                                background: consentChecked
                                  ? "rgba(72,242,251,0.16)"
                                  : "rgba(255,255,255,0.05)",
                                border: `1px solid ${
                                  consentChecked
                                    ? "rgba(72,242,251,0.52)"
                                    : form.formState.errors.consent
                                    ? "rgba(248,113,113,0.55)"
                                    : "rgba(255,255,255,0.14)"
                                }`,
                              }}
                            >
                              {consentChecked && (
                                <svg
                                  className="w-2.5 h-2.5 text-[#48F2FB]"
                                  fill="none"
                                  viewBox="0 0 10 8"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M1 4l3 3 5-6"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-white/35 text-xs leading-relaxed">
                            I agree to receive marketing emails from JOE Technologies. I can
                            unsubscribe at any time.
                          </span>
                        </label>

                        {form.formState.errors.consent && (
                          <p
                            id="nl-consent-err"
                            role="alert"
                            className="flex items-center gap-1 text-red-400 text-xs mt-1.5"
                          >
                            <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                            {form.formState.errors.consent.message}
                          </p>
                        )}
                      </div>

                      {/* Error banner */}
                      <AnimatePresence>
                        {submitError && !mutation.isPending && (
                          <motion.div
                            key="nl-err"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div
                              role="alert"
                              aria-live="assertive"
                              className="flex items-start gap-2.5 p-3 rounded-lg text-xs overflow-hidden"
                              style={{
                                background:
                                  errorKind === "network"
                                    ? "rgba(251,191,36,0.08)"
                                    : "rgba(248,113,113,0.08)",
                                border: `1px solid ${
                                  errorKind === "network"
                                    ? "rgba(251,191,36,0.25)"
                                    : "rgba(248,113,113,0.25)"
                                }`,
                              }}
                            >
                              {errorKind === "network" ? (
                                <WifiOff
                                  className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-400"
                                  aria-hidden="true"
                                />
                              ) : (
                                <AlertCircle
                                  className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-red-400"
                                  aria-hidden="true"
                                />
                              )}
                              <span
                                style={{
                                  color:
                                    errorKind === "network"
                                      ? "rgba(251,191,36,0.85)"
                                      : "rgba(248,113,113,0.85)",
                                }}
                              >
                                {submitError}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        data-testid="button-newsletter-submit"
                        aria-busy={mutation.isPending}
                        className="w-full h-11 border-0 font-semibold text-[#060A10] gap-2 transition-all duration-200 hover:opacity-90 hover:scale-[1.013] active:scale-[0.988] focus-visible:ring-2 focus-visible:ring-[#48F2FB]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060A10] disabled:opacity-60 disabled:scale-100"
                        style={{
                          background:
                            "linear-gradient(135deg, #48F2FB 0%, #E867EA 100%)",
                          boxShadow: mutation.isPending
                            ? "none"
                            : "0 6px 22px rgba(72,242,251,0.20)",
                        }}
                      >
                        {mutation.isPending ? (
                          <span className="flex items-center gap-2">
                            <span
                              className="w-4 h-4 rounded-full border-2 border-[#060A10]/25 border-t-[#060A10] animate-spin"
                              aria-hidden="true"
                            />
                            Subscribing…
                          </span>
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
                        data-testid="button-newsletter-skip"
                        className="text-white/22 text-xs text-center hover:text-white/42 transition-colors py-0.5 focus-visible:outline-none focus-visible:text-white/55"
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
