import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Mail, MapPin, Send, CheckCircle2, Globe, Phone } from "lucide-react";
import { SiInstagram, SiWhatsapp, SiFacebook } from "react-icons/si";
import WhatsAppContactPicker from "@/components/WhatsAppContactPicker";
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
    accent: "#48F2FB",
  },
  {
    icon: SiWhatsapp,
    label: "WhatsApp",
    value: "09017048791  ·  08159088343",
    href: "https://wa.me/2349017048791?text=Hello%20Jeffery%2C%20I%20visited%20joetechnologies.io%20and%20I%27d%20love%20to%20discuss%20a%20project.",
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
    value: "joetechnologies.io",
    href: "https://joetechnologies.io",
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
        description: "Thank you for reaching out. Our team will get back to you within 24 hours.",
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
              {mutation.isSuccess ? (
                <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#48F2FB]/10 border border-[#48F2FB]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#48F2FB]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-joe-text text-xl mb-2">Message Sent!</h3>
                    <p className="text-joe-text/55 text-sm leading-relaxed max-w-sm">
                      Thank you for reaching out. Our team will review your message and respond within 24 hours.
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
                    <input type="text" className="hidden" aria-hidden="true" tabIndex={-1}
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
                      disabled={mutation.isPending}
                      className="w-full bg-gradient-to-r from-[#48F2FB] to-[#E867EA] text-[#060A10] border-0 font-semibold gap-2 shadow-xl shadow-[#48F2FB]/15 hover:shadow-[#48F2FB]/25 transition-shadow"
                      data-testid="button-submit"
                    >
                      {mutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Project Brief
                        </>
                      )}
                    </Button>

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
