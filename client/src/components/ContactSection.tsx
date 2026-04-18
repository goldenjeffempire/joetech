import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(20, "Please provide a bit more detail (min 20 chars)"),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "jeffemuodafe124@gmail.com",
    href: "mailto:jeffemuodafe124@gmail.com",
    accent: "#00c8ff",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+234 901 704 8791",
    href: "https://wa.me/2349017048791?text=Hello%20Jeffery%2C%20I%20saw%20your%20website%20and%20I%27m%20interested%20in%20discussing%20a%20project.",
    accent: "#00ff88",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Global · Remote-First",
    href: null,
    accent: "#7c3aed",
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
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      message: "",
      website: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message received!",
        description: "Thank you for reaching out. Jeffery will get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or reach out via WhatsApp.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/2349017048791?text=Hello%20Jeffery%2C%20I%20visited%20joetechnologies.io%20and%20I%27d%20love%20to%20discuss%20a%20project.",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const messageValue = form.watch("message") || "";

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--joe-bg-3)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #00c8ff 0%, transparent 70%)", opacity: "var(--joe-glow-opacity)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#00c8ff] font-mono text-sm uppercase tracking-widest">Let's Connect</span>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-joe-text mt-3">
            Start Your AI
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Transformation
            </span>
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
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              const content = (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl border hover-elevate"
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
                    <Icon className="w-5 h-5" style={{ color: info.accent }} />
                  </div>
                  <div>
                    <p className="text-joe-text/40 text-xs font-mono uppercase tracking-wide mb-0.5">{info.label}</p>
                    <p className="text-joe-text font-medium text-sm">{info.value}</p>
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

            <div
              className="p-6 rounded-xl border border-[#00ff88]/20"
              style={{ background: "rgba(0, 255, 136, 0.05)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-5 h-5 text-[#00ff88]" />
                <span className="text-[#00ff88] font-semibold text-sm">Chat on WhatsApp</span>
              </div>
              <p className="text-joe-text/50 text-sm leading-relaxed mb-4">
                Prefer a quick chat? Reach Jeffery directly on WhatsApp for fast responses.
              </p>
              <Button
                onClick={handleWhatsApp}
                className="w-full border-[#00ff88] text-[#00ff88] bg-[#00ff88]/10 font-semibold gap-2"
                variant="outline"
                data-testid="button-whatsapp"
              >
                <MessageCircle className="w-4 h-4" />
                Open WhatsApp Chat
              </Button>
            </div>

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
              {mutation.isSuccess ? (
                <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#00c8ff]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-joe-text text-xl mb-2">Message Sent!</h3>
                    <p className="text-joe-text/55 text-sm leading-relaxed max-w-sm">
                      Thank you for reaching out. Jeffery will review your message and respond within 24 hours.
                    </p>
                  </div>
                  <Button
                    onClick={() => mutation.reset()}
                    variant="outline"
                    className="border-joe-text/20 text-joe-text/70"
                    data-testid="button-send-another"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1}
                      {...form.register("website")} />

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-joe-text/70 text-sm">Full Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Jeffery Smith"
                                className="bg-joe-text/5 border-joe-text/15 text-joe-text placeholder:text-joe-text/25 focus:border-[#00c8ff]/50"
                                data-testid="input-name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
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
                                placeholder="you@company.com"
                                type="email"
                                className="bg-joe-text/5 border-joe-text/15 text-joe-text placeholder:text-joe-text/25 focus:border-[#00c8ff]/50"
                                data-testid="input-email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
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
                            <FormLabel className="text-joe-text/70 text-sm">Company</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Acme Corp"
                                className="bg-joe-text/5 border-joe-text/15 text-joe-text placeholder:text-joe-text/25 focus:border-[#00c8ff]/50"
                                data-testid="input-company"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
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
                                placeholder="+1 555 000 0000"
                                type="tel"
                                className="bg-joe-text/5 border-joe-text/15 text-joe-text placeholder:text-joe-text/25 focus:border-[#00c8ff]/50"
                                data-testid="input-phone"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-joe-text/70 text-sm">Service of Interest</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger
                                className="bg-joe-text/5 border-joe-text/15 text-joe-text/70 focus:border-[#00c8ff]/50"
                                data-testid="select-service"
                              >
                                <SelectValue placeholder="Select a service..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent style={{ background: "var(--joe-nav-bg)", borderColor: "var(--joe-card-border)" }}>
                              {services.map((s) => (
                                <SelectItem key={s} value={s} className="text-joe-text/80 focus:bg-joe-text/10 focus:text-joe-text">
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-joe-text/70 text-sm">Your Message *</FormLabel>
                            <span className={`text-xs ${messageValue.length >= 20 ? "text-joe-text/30" : "text-joe-text/50"}`}>
                              {messageValue.length}/20 min
                            </span>
                          </div>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your project — what you're building, the problem you're solving, your timeline, and any technical context that's useful..."
                              rows={5}
                              className="bg-joe-text/5 border-joe-text/15 text-joe-text placeholder:text-joe-text/25 focus:border-[#00c8ff]/50 resize-none"
                              data-testid="textarea-message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={mutation.isPending}
                        className="flex-1 bg-gradient-to-r from-[#00c8ff] to-[#0066ff] text-white border-0 font-semibold tracking-wide gap-2 shadow-lg shadow-[#00c8ff]/15"
                        data-testid="button-submit-contact"
                      >
                        {mutation.isPending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        onClick={handleWhatsApp}
                        className="border-[#00ff88]/30 text-[#00ff88] bg-[#00ff88]/5 font-semibold gap-2"
                        data-testid="button-whatsapp-form"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Button>
                    </div>

                    <p className="text-joe-text/25 text-xs text-center">
                      By submitting this form, you agree that your information will be used to respond to your inquiry.
                      We never share your data with third parties.
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
