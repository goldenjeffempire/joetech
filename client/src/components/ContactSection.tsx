import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Send, CheckCircle2, Globe, ChevronUp, ChevronDown } from "lucide-react";
import { SiInstagram, SiWhatsapp, SiFacebook } from "react-icons/si";
import WhatsAppContactPicker from "@/components/WhatsAppContactPicker";
import { WA_CONTACTS } from "@/lib/wa-contacts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(20, "Please provide a bit more detail (min 20 chars)"),
});

type FormValues = z.infer<typeof formSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@joetech.com.ng",
    href: "mailto:info@joetech.com.ng",
    accent: "#48F2FB",
  },
  {
    icon: SiWhatsapp,
    label: "WhatsApp",
    value: "09017048791",
    href: "https://wa.me/2349017048791?text=Hello%20JOE%20Technologies%2C%20I%20visited%20joetech.com.ng%20and%20I%27d%20love%20to%20discuss%20a%20project.",
    accent: "#00ff88",
  },
  {
    icon: SiInstagram,
    label: "Instagram",
    value: "@joetech.ai",
    href: "https://instagram.com/joetech.ai",
    accent: "#ec4899",
  },
  {
    icon: SiFacebook,
    label: "Facebook",
    value: "JOE Technologies",
    href: "https://facebook.com/search/top?q=JOE%20Technologies",
    accent: "#48F2FB",
  },
  {
    icon: Globe,
    label: "Website",
    value: "joetech.com.ng",
    href: "https://joetech.com.ng",
    accent: "#E867EA",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Global · Remote-First",
    href: null,
    accent: "#f59e0b",
  },
];

const services = [
  "App Development",
  "Website Design & Development",
  "Automation Systems",
  "UI/UX Design",
  "AI & Machine Learning Solutions",
  "Digital Systems Engineering",
  "Other",
];

function useScrollInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export default function ContactSection() {
  const { ref, isInView } = useScrollInView();
  const [waOpen, setWaOpen] = useState(false);
  const [emailDraft, setEmailDraft] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const subject = `Project inquiry${data.service ? ` — ${data.service}` : ""}`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : "",
      data.phone ? `Phone: ${data.phone}` : "",
      data.service ? `Service: ${data.service}` : "",
      "",
      data.message,
    ].filter((line) => line !== "").join("\n");
    const draft = `mailto:info@joetech.com.ng?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setEmailDraft(draft);
    window.location.href = draft;
  };

  const watchedName = useWatch({ control: form.control, name: "name" });
  const watchedService = useWatch({ control: form.control, name: "service" });
  const watchedMessage = useWatch({ control: form.control, name: "message" });

  function buildWaMessage() {
    const parts: string[] = ["Hi JOE Technologies! I came from your website and would love to discuss a project."];
    if (watchedName?.trim()) parts.push(`Name: ${watchedName.trim()}`);
    if (watchedService?.trim()) parts.push(`Service: ${watchedService.trim()}`);
    if (watchedMessage?.trim()) parts.push(`\nDetails:\n${watchedMessage.trim()}`);
    return parts.join("\n");
  }


  return (
    <section id="contact" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--joe-bg-3)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #48F2FB 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#48F2FB] font-mono text-sm uppercase tracking-widest">Let's Connect</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-joe-text mt-3">
            Start Your Digital{" "}
            <span className="text-gradient-cyber">Transformation</span>
          </h2>
          <p className="text-joe-text/50 mt-4 text-lg max-w-2xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours.
            Every engagement starts with a free strategy call.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              const content = (
                <div
                  className="flex items-center gap-4 p-4 rounded-xl border hover-elevate transition-all duration-200"
                  style={{
                    background: "var(--joe-card)",
                    borderColor: "var(--joe-card-border)",
                  }}
                  data-testid={`contact-info-${i}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${info.accent}15`,
                      border: `1px solid ${info.accent}25`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: info.accent }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-joe-text/35 text-xs font-mono uppercase tracking-wide">{info.label}</p>
                    <p className="text-joe-text/80 font-medium text-sm truncate">{info.value}</p>
                  </div>
                </div>
              );

              return info.href ? (
                <a key={i} href={info.href} target="_blank" rel="noopener noreferrer" className="block no-underline">
                  {content}
                </a>
              ) : (
                <div key={i}>{content}</div>
              );
            })}

            <WhatsAppContactPicker
              message="Hello JOE Technologies, I visited your website and I'd love to discuss a project."
            />

            <div className="flex items-center gap-3 p-4 rounded-xl border"
              style={{
                background: "var(--joe-overlay)",
                borderColor: "var(--joe-card-border)",
              }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse flex-shrink-0" />
              <div>
                <p className="text-joe-text/70 text-sm font-medium">Currently accepting new clients</p>
                <p className="text-joe-text/35 text-xs mt-0.5">Limited spots available for Q2 2026</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div
              className="p-8 rounded-xl border"
              style={{
                background: "var(--joe-card)",
                borderColor: "var(--joe-card-border)",
              }}
            >
              {emailDraft ? (
                <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#48F2FB]/10 border border-[#48F2FB]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#48F2FB]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-joe-text text-xl mb-2">Your Email Draft Is Ready</h3>
                    <p className="text-joe-text/55 text-sm leading-relaxed max-w-sm">
                      Your brief has not been sent yet. Send it from your email app to finish.
                      If your email app did not open, use the link below or contact us on WhatsApp.
                    </p>
                  </div>
                  <Button asChild className="bg-[#48F2FB] text-[#060A10]" data-testid="button-open-email">
                    <a href={emailDraft}>Open Email Draft</a>
                  </Button>
                  <Button
                    onClick={() => setEmailDraft(null)}
                    variant="outline"
                    className="border-joe-text/20 text-joe-text/70"
                    data-testid="button-send-another"
                  >
                    Edit Project Brief
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <p className="text-joe-text/55 text-sm leading-relaxed">
                      Prepare your brief below, then send it using your email app or WhatsApp.
                      This website does not submit or store form entries.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-joe-text/70 text-sm">Full Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Jane Smith"
                                className="bg-joe-overlay border-joe-card-border text-joe-text placeholder:text-joe-text/25"
                                data-testid="input-name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-joe-text/70 text-sm">Email Address *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="jane@company.com"
                                className="bg-joe-overlay border-joe-card-border text-joe-text placeholder:text-joe-text/25"
                                data-testid="input-email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-joe-text/70 text-sm">Company / Organization</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Acme Corp"
                                className="bg-joe-overlay border-joe-card-border text-joe-text placeholder:text-joe-text/25"
                                data-testid="input-company"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-joe-text/70 text-sm">Phone / WhatsApp</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+1 555 000 0000"
                                className="bg-joe-overlay border-joe-card-border text-joe-text placeholder:text-joe-text/25"
                                data-testid="input-phone"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-joe-text/70 text-sm">Service Interested In</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger
                                className="bg-joe-overlay border-joe-card-border text-joe-text"
                                data-testid="select-service"
                              >
                                <SelectValue placeholder="Select a service..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-joe-text/70 text-sm flex items-center justify-between">
                            <span>Project Details *</span>
                            <span className="text-joe-text/25 font-normal text-xs">{field.value?.length || 0} chars</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your project, goals, timeline, and any relevant context..."
                              rows={5}
                              className="bg-joe-overlay border-joe-card-border text-joe-text placeholder:text-joe-text/25 resize-none"
                              data-testid="textarea-message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-[#48F2FB] to-[#E867EA] text-[#060A10] border-0 font-semibold gap-2 shadow-xl shadow-[#48F2FB]/15 hover:shadow-[#48F2FB]/25 transition-shadow"
                      data-testid="button-submit"
                    >
                      <Send className="w-4 h-4" />
                      Prepare Email Brief
                    </Button>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px" style={{ background: "var(--joe-card-border)" }} />
                      <span className="text-joe-text/25 text-xs font-mono">or</span>
                      <div className="flex-1 h-px" style={{ background: "var(--joe-card-border)" }} />
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setWaOpen((v) => !v)}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366]/50"
                        style={{
                          background: waOpen ? "rgba(37,211,102,0.15)" : "rgba(37,211,102,0.08)",
                          border: "1px solid rgba(37,211,102,0.25)",
                          color: "#25d366",
                        }}
                        data-testid="button-whatsapp-quick"
                        aria-expanded={waOpen}
                        aria-controls="wa-quick-picker"
                      >
                        <SiWhatsapp className="w-4 h-4" />
                        Send via WhatsApp
                        {waOpen ? (
                          <ChevronUp className="w-3.5 h-3.5 ml-auto opacity-60" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 ml-auto opacity-60" />
                        )}
                      </button>

                      <AnimatePresence>
                        {waOpen && (
                          <motion.div
                            id="wa-quick-picker"
                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            transition={{ duration: 0.18 }}
                            className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden z-20 shadow-2xl shadow-black/40"
                            style={{
                              background: "var(--joe-card)",
                              border: "1px solid rgba(37,211,102,0.2)",
                            }}
                          >
                            <p className="text-joe-text/35 text-[11px] font-mono uppercase tracking-widest px-4 pt-3 pb-2">
                              Select a contact
                            </p>
                            {WA_CONTACTS.map((n, i) => (
                              <a
                                key={i}
                                href={n.wa(buildWaMessage())}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setWaOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-[#25d366]/8 transition-colors group"
                                data-testid={`button-wa-contact-${i}`}
                              >
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{
                                    background: "rgba(37,211,102,0.1)",
                                    border: "1px solid rgba(37,211,102,0.2)",
                                  }}
                                >
                                  <SiWhatsapp className="w-3.5 h-3.5 text-[#25d366]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-joe-text/80 text-sm font-semibold leading-tight">{n.label}</p>
                                  <p className="text-joe-text/35 text-xs font-mono mt-0.5">{n.number}</p>
                                </div>
                                <ChevronDown className="w-3.5 h-3.5 text-[#25d366]/30 group-hover:text-[#25d366] -rotate-90 transition-colors flex-shrink-0" />
                              </a>
                            ))}
                            <div className="px-4 pb-3 pt-1">
                              <p className="text-joe-text/25 text-[11px] text-center">
                                Your form details will be pre-filled in the chat
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <p className="text-joe-text/30 text-xs text-center">
                      We'll respond within 24 hours. Free strategy call included with every inquiry.
                    </p>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
