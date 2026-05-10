import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";

const STORAGE_KEY = "joe_newsletter_dismissed";
const DELAY_MS = 4000;

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  consent: z.boolean().refine((v) => v === true, { message: "Please agree to continue" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", consent: false },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) =>
      apiRequest("POST", "/api/newsletter", {
        email: data.email,
        consentGiven: "yes",
        source: "popup",
      }),
    onSuccess: () => {
      setDone(true);
      localStorage.setItem(STORAGE_KEY, "1");
      setTimeout(() => setVisible(false), 3200);
    },
    onError: (err: any) => {
      const msg = err?.message ?? "";
      if (msg.includes("already subscribed") || msg.includes("duplicate")) {
        setDone(true);
        localStorage.setItem(STORAGE_KEY, "1");
        setTimeout(() => setVisible(false), 3200);
      }
    },
  });

  const onSubmit = (data: FormValues) => mutation.mutate(data);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998]"
            style={{ background: "rgba(6,10,16,0.72)", backdropFilter: "blur(4px)" }}
            onClick={dismiss}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[9999] bottom-0 left-0 right-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-md w-full"
            role="dialog"
            aria-modal="true"
            aria-label="Newsletter signup"
          >
            <div
              className="relative overflow-hidden sm:rounded-2xl"
              style={{
                background: "linear-gradient(145deg, #0a0f1e 0%, #060A10 100%)",
                border: "1px solid rgba(72,242,251,0.18)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(72,242,251,0.06)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, transparent, #48F2FB 40%, #E867EA 60%, transparent)" }}
              />
              <div
                className="absolute top-0 right-0 w-[300px] h-[200px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #48F2FB 0%, transparent 70%)", opacity: 0.04 }}
              />
              <div
                className="absolute bottom-0 left-0 w-[200px] h-[150px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #E867EA 0%, transparent 70%)", opacity: 0.04 }}
              />

              <button
                onClick={dismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors z-10"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                aria-label="Close"
                data-testid="button-newsletter-close"
              >
                <X className="w-4 h-4 text-white/40" />
              </button>

              <div className="relative z-10 p-7 sm:p-8">
                {done ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center text-center gap-4 py-4"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(72,242,251,0.1)", border: "1px solid rgba(72,242,251,0.25)" }}
                    >
                      <CheckCircle2 className="w-7 h-7 text-[#48F2FB]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white text-xl">You're in!</h3>
                      <p className="text-white/45 text-sm mt-1.5 leading-relaxed">
                        Welcome to the JOE Technologies inner circle. Expect sharp insights, no fluff.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(72,242,251,0.1)", border: "1px solid rgba(72,242,251,0.2)" }}
                      >
                        <Mail className="w-5 h-5 text-[#48F2FB]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#E867EA]" />
                          <span className="text-[#E867EA] font-mono text-xs uppercase tracking-widest">Exclusive Updates</span>
                        </div>
                        <h2 className="font-heading font-bold text-white text-xl leading-snug">
                          Stay Ahead with JOE Technologies
                        </h2>
                      </div>
                    </div>

                    <p className="text-white/45 text-sm leading-relaxed mb-6">
                      Get early access to insights on AI, automation, and digital product engineering — plus exclusive resources and company news delivered straight to your inbox.
                    </p>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                      <div>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          data-testid="input-newsletter-email"
                          className="h-11 text-white placeholder:text-white/25 border-white/10 focus:border-[#48F2FB]/50"
                          style={{ background: "rgba(255,255,255,0.04)" }}
                          {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-400 text-xs mt-1.5">{form.formState.errors.email.message}</p>
                        )}
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer group" data-testid="label-newsletter-consent">
                        <div className="relative flex-shrink-0 mt-0.5">
                          <input
                            type="checkbox"
                            className="sr-only"
                            data-testid="checkbox-newsletter-consent"
                            {...form.register("consent")}
                          />
                          <div
                            className="w-4 h-4 rounded border flex items-center justify-center transition-all"
                            style={{
                              background: form.watch("consent") ? "rgba(72,242,251,0.2)" : "rgba(255,255,255,0.04)",
                              borderColor: form.watch("consent") ? "rgba(72,242,251,0.6)" : "rgba(255,255,255,0.15)",
                            }}
                            onClick={() => form.setValue("consent", !form.watch("consent"), { shouldValidate: true })}
                          >
                            {form.watch("consent") && (
                              <svg className="w-2.5 h-2.5 text-[#48F2FB]" fill="none" viewBox="0 0 10 8">
                                <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-white/35 text-xs leading-relaxed">
                          I agree to receive marketing emails from JOE Technologies. I can unsubscribe at any time.
                        </span>
                      </label>
                      {form.formState.errors.consent && (
                        <p className="text-red-400 text-xs -mt-2">{form.formState.errors.consent.message}</p>
                      )}

                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full h-11 border-0 font-semibold text-[#060A10] gap-2 transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          background: "linear-gradient(135deg, #48F2FB, #E867EA)",
                          boxShadow: "0 8px 24px rgba(72,242,251,0.2)",
                        }}
                        data-testid="button-newsletter-submit"
                      >
                        {mutation.isPending ? (
                          <div className="w-4 h-4 border-2 border-[#060A10]/30 border-t-[#060A10] rounded-full animate-spin" />
                        ) : (
                          "Subscribe — It's Free"
                        )}
                      </Button>

                      <button
                        type="button"
                        onClick={dismiss}
                        className="text-white/25 text-xs text-center hover:text-white/40 transition-colors"
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
