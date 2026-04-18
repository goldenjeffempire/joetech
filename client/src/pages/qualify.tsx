import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { usePageTitle } from "@/hooks/use-page-title";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import PageHero from "@/components/PageHero";
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Building2,
  Cpu,
  Layout,
  PenTool,
  Lightbulb,
  Check,
  Star,
  Zap,
  Crown,
  ArrowRight,
  User,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";

const TOTAL_STEPS = 5;

const SERVICE_GROUPS = {
  ai: ["Custom AI Solutions", "AI Strategy & Consulting", "MLOps & Infrastructure", "AI Integration", "Process Automation"],
  webdev: ["App Development", "Website Design", "Full-Stack Development"],
  design: ["UI/UX Design"],
  advisory: ["Technology Advisory"],
};

function getServiceGroup(service: string): "ai" | "webdev" | "design" | "advisory" {
  if (SERVICE_GROUPS.ai.includes(service)) return "ai";
  if (SERVICE_GROUPS.webdev.includes(service)) return "webdev";
  if (SERVICE_GROUPS.design.includes(service)) return "design";
  return "advisory";
}

const ADAPTIVE_QUESTIONS: Record<string, { label: string; options: string[] }[]> = {
  ai: [
    {
      label: "How would you describe your current data infrastructure?",
      options: [
        "No structured data yet",
        "Some data, not well organised",
        "Well-organised data systems",
        "Enterprise-grade data infrastructure",
      ],
    },
    {
      label: "Are you currently using any AI or ML tools?",
      options: [
        "No, this would be our first",
        "Exploring options only",
        "Using some basic tools",
        "Have in-house AI capabilities",
      ],
    },
  ],
  webdev: [
    {
      label: "What platform is this project targeting?",
      options: ["Web only", "Mobile only", "Both web and mobile", "Not decided yet"],
    },
    {
      label: "What's the starting point for this project?",
      options: [
        "Starting from scratch",
        "Redesigning an existing product",
        "Adding features to an existing system",
        "Migrating from another platform",
      ],
    },
  ],
  design: [
    {
      label: "Do you have existing brand guidelines?",
      options: [
        "No, starting completely fresh",
        "Some basic guidelines",
        "Full brand guide exists",
        "Comprehensive design system",
      ],
    },
    {
      label: "What stage is your product at?",
      options: [
        "New concept or idea",
        "Early prototype / MVP",
        "Existing product needing redesign",
        "Enterprise-scale product",
      ],
    },
  ],
  advisory: [
    {
      label: "What is your primary goal?",
      options: [
        "Cost reduction",
        "Revenue growth",
        "Process improvement",
        "Strategic transformation",
      ],
    },
    {
      label: "Have you worked with technology consultants before?",
      options: [
        "No, this is new to us",
        "Yes, with limited success",
        "Yes, with good results",
        "We have ongoing consulting relationships",
      ],
    },
  ],
};

function scoreLead(data: {
  budget: string;
  timeline: string;
  companySize: string;
  hasExistingSolution: string;
}): { score: number; tier: "Startup" | "High Value" | "Enterprise" } {
  let score = 0;

  const budgetScores: Record<string, number> = {
    "under-5k": 1,
    "5k-25k": 2,
    "25k-100k": 3,
    "100k+": 4,
  };
  const timelineScores: Record<string, number> = {
    "flexible": 1,
    "3-6-months": 2,
    "1-3-months": 3,
    "asap": 4,
  };
  const companySizeScores: Record<string, number> = {
    "1-10": 1,
    "11-50": 2,
    "51-200": 3,
    "200+": 4,
  };

  score += budgetScores[data.budget] ?? 1;
  score += timelineScores[data.timeline] ?? 1;
  score += companySizeScores[data.companySize] ?? 1;
  if (data.hasExistingSolution === "yes") score += 1;

  let tier: "Startup" | "High Value" | "Enterprise";
  if (score <= 5) tier = "Startup";
  else if (score <= 9) tier = "High Value";
  else tier = "Enterprise";

  return { score, tier };
}

const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  phone: z.string().optional(),
});

const step2Schema = z.object({
  serviceType: z.string().min(1, "Please select a service"),
  projectDescription: z.string().optional(),
});

const step3Schema = z.object({
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
});

const step4Schema = z.object({
  companySize: z.string().min(1, "Please select your company size"),
  industry: z.string().optional(),
  hasExistingSolution: z.string().min(1, "Please select an option"),
  adaptive1: z.string().min(1, "Please select an option"),
  adaptive2: z.string().min(1, "Please select an option"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type Step4Data = z.infer<typeof step4Schema>;

type AllData = Step1Data & Step2Data & Step3Data & Step4Data;

interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  testId?: string;
}

function OptionCard({ label, selected, onClick, icon, testId }: OptionCardProps) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      className="w-full text-left rounded-xl px-4 py-3 border transition-all duration-200 flex items-center gap-3 group"
      style={{
        background: selected ? "rgba(0,200,255,0.08)" : "var(--joe-card)",
        borderColor: selected ? "#00c8ff" : "var(--joe-card-border)",
        boxShadow: selected ? "0 0 0 2px rgba(0,200,255,0.18)" : "none",
      }}
    >
      <div
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
        style={{
          borderColor: selected ? "#00c8ff" : "rgba(0,0,0,0.2)",
          background: selected ? "#00c8ff" : "transparent",
        }}
      >
        {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>
      {icon && <span className="text-joe-text/50 group-hover:text-joe-text/70 transition-colors">{icon}</span>}
      <span className="text-sm font-medium text-joe-text">{label}</span>
    </button>
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="transition-all duration-300 rounded-full"
          style={{
            width: i + 1 === current ? 24 : 8,
            height: 8,
            background: i + 1 < current
              ? "#00c8ff"
              : i + 1 === current
              ? "linear-gradient(90deg, #00c8ff, #7c3aed)"
              : "rgba(0,0,0,0.12)",
          }}
        />
      ))}
    </div>
  );
}

const TIER_CONFIG = {
  Startup: {
    color: "#22c55e",
    gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.3)",
    icon: <Zap className="w-8 h-8" />,
    badge: "Startup Track",
    headline: "Great fit for a growth-stage project",
    description: "We love working with focused teams and ambitious startups. Our Startup Track offers streamlined delivery, clear milestones, and budget-conscious scoping.",
    cta: "Let's build something lean and powerful together.",
  },
  "High Value": {
    color: "#00c8ff",
    gradient: "linear-gradient(135deg, #00c8ff, #0066ff)",
    bg: "rgba(0,200,255,0.08)",
    border: "rgba(0,200,255,0.3)",
    icon: <Star className="w-8 h-8" />,
    badge: "High Value Partner",
    headline: "You're a priority engagement",
    description: "Your project scope and vision align perfectly with our High Value track. Expect dedicated resources, strategic collaboration, and a senior-led delivery team.",
    cta: "We're ready to commit at the level your project deserves.",
  },
  Enterprise: {
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #7c3aed, #4f46e5)",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.3)",
    icon: <Crown className="w-8 h-8" />,
    badge: "Enterprise Client",
    headline: "You qualify for our Enterprise Program",
    description: "Your organisation meets the criteria for our full Enterprise engagement. We'll dedicate a cross-functional team, provide executive-level strategy, and ensure long-term partnership alignment.",
    cta: "A senior team member will reach out within 24 hours.",
  },
};

export default function QualifyPage() {
  usePageTitle("Smart Lead Qualification");
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AllData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ tier: "Startup" | "High Value" | "Enterprise"; score: number } | null>(null);

  const step1Form = useForm<Step1Data>({ resolver: zodResolver(step1Schema), defaultValues: { name: "", email: "", company: "", phone: "" } });
  const step2Form = useForm<Step2Data>({ resolver: zodResolver(step2Schema), defaultValues: { serviceType: "", projectDescription: "" } });
  const step3Form = useForm<Step3Data>({ resolver: zodResolver(step3Schema), defaultValues: { budget: "", timeline: "" } });
  const step4Form = useForm<Step4Data>({ resolver: zodResolver(step4Schema), defaultValues: { companySize: "", industry: "", hasExistingSolution: "", adaptive1: "", adaptive2: "" } });

  const selectedService = step2Form.watch("serviceType") || formData.serviceType || "";
  const serviceGroup = selectedService ? getServiceGroup(selectedService) : "advisory";
  const adaptiveQs = ADAPTIVE_QUESTIONS[serviceGroup];

  const mutation = useMutation({
    mutationFn: async (data: AllData) => {
      const { score, tier } = scoreLead({
        budget: data.budget,
        timeline: data.timeline,
        companySize: data.companySize,
        hasExistingSolution: data.hasExistingSolution,
      });
      const adaptiveAnswers = JSON.stringify({
        q1: data.adaptive1,
        q2: data.adaptive2,
      });
      return apiRequest("POST", "/api/leads", {
        name: data.name,
        email: data.email,
        company: data.company || undefined,
        phone: data.phone || undefined,
        serviceType: data.serviceType,
        projectDescription: data.projectDescription || undefined,
        budget: data.budget,
        timeline: data.timeline,
        companySize: data.companySize,
        industry: data.industry || undefined,
        hasExistingSolution: data.hasExistingSolution,
        adaptiveAnswers,
        score,
        tier,
      });
    },
    onSuccess: (_res, variables) => {
      const { score, tier } = scoreLead({
        budget: variables.budget,
        timeline: variables.timeline,
        companySize: variables.companySize,
        hasExistingSolution: variables.hasExistingSolution,
      });
      setResult({ score, tier });
      setSubmitted(true);
    },
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    },
  });

  const goNext = useCallback(async () => {
    if (step === 1) {
      const valid = await step1Form.trigger();
      if (!valid) return;
      setFormData(prev => ({ ...prev, ...step1Form.getValues() }));
    } else if (step === 2) {
      const valid = await step2Form.trigger();
      if (!valid) return;
      setFormData(prev => ({ ...prev, ...step2Form.getValues() }));
    } else if (step === 3) {
      const valid = await step3Form.trigger();
      if (!valid) return;
      setFormData(prev => ({ ...prev, ...step3Form.getValues() }));
    } else if (step === 4) {
      const valid = await step4Form.trigger();
      if (!valid) return;
      setFormData(prev => ({ ...prev, ...step4Form.getValues() }));
    } else if (step === TOTAL_STEPS) {
      const all = {
        ...formData,
        ...step4Form.getValues(),
      } as AllData;
      mutation.mutate(all);
      return;
    }
    setStep(s => s + 1);
  }, [step, step1Form, step2Form, step3Form, step4Form, formData, mutation]);

  const goBack = useCallback(() => {
    setStep(s => Math.max(1, s - 1));
  }, []);

  if (submitted && result) {
    const config = TIER_CONFIG[result.tier];
    return (
      <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
        <PageHero
          label="Qualification Complete"
          title="Your Lead"
          highlightedTitle="Score"
          subtitle="We've analysed your answers and matched you to the right engagement tier."
          size="sm"
          accentColor={config.color}
        />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-2xl border p-8 sm:p-12 text-center flex flex-col items-center gap-6"
            style={{ background: config.bg, borderColor: config.border }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: config.gradient, color: "white" }}
              data-testid="icon-tier"
            >
              {config.icon}
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
                style={{ background: config.bg, border: `1px solid ${config.border}` }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: config.color }} />
                <span className="font-mono text-xs uppercase tracking-widest font-semibold" style={{ color: config.color }}>
                  {config.badge}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-bold text-joe-text mb-3"
                data-testid="text-tier-headline"
              >
                {config.headline}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-joe-text/60 leading-relaxed max-w-md mx-auto"
                data-testid="text-tier-description"
              >
                {config.description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="w-full rounded-xl px-6 py-4"
              style={{ background: "var(--joe-card)", border: "1px solid var(--joe-card-border)" }}
            >
              <p className="text-sm text-joe-text/50 font-mono uppercase tracking-widest mb-3">Qualification Summary</p>
              <div className="grid grid-cols-2 gap-3 text-sm text-left">
                <div>
                  <span className="text-joe-text/40 text-xs">Service</span>
                  <p className="font-medium text-joe-text" data-testid="text-summary-service">{formData.serviceType}</p>
                </div>
                <div>
                  <span className="text-joe-text/40 text-xs">Budget</span>
                  <p className="font-medium text-joe-text" data-testid="text-summary-budget">
                    {formData.budget === "under-5k" ? "Under $5K"
                      : formData.budget === "5k-25k" ? "$5K – $25K"
                      : formData.budget === "25k-100k" ? "$25K – $100K"
                      : "$100K+"}
                  </p>
                </div>
                <div>
                  <span className="text-joe-text/40 text-xs">Timeline</span>
                  <p className="font-medium text-joe-text" data-testid="text-summary-timeline">
                    {formData.timeline === "flexible" ? "Flexible"
                      : formData.timeline === "3-6-months" ? "3–6 months"
                      : formData.timeline === "1-3-months" ? "1–3 months"
                      : "ASAP"}
                  </p>
                </div>
                <div>
                  <span className="text-joe-text/40 text-xs">Team Size</span>
                  <p className="font-medium text-joe-text" data-testid="text-summary-size">{formData.companySize} employees</p>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="text-joe-text/50 text-sm italic"
            >
              {config.cta}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              className="flex flex-col sm:flex-row gap-3 w-full"
            >
              <Button
                asChild
                className="flex-1 h-11"
                style={{ background: config.gradient, border: "none" }}
                data-testid="button-contact-us"
              >
                <a href="/contact">
                  Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-11"
                onClick={() => { setSubmitted(false); setResult(null); setStep(1); setFormData({}); step1Form.reset(); step2Form.reset(); step3Form.reset(); step4Form.reset(); }}
                data-testid="button-start-over"
              >
                Start Over
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      <PageHero
        label="Smart Qualification"
        title="Find Your"
        highlightedTitle="Fit"
        subtitle="Answer a few tailored questions and we'll match you to the right engagement track — instantly."
        size="sm"
        accentColor="#00c8ff"
        data-testid-label="text-qualify-label"
        data-testid-title="text-qualify-title"
        data-testid-subtitle="text-qualify-subtitle"
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8 flex flex-col items-center gap-3">
          <StepIndicator current={step} total={TOTAL_STEPS} />
          <p className="text-xs text-joe-text/40 font-mono uppercase tracking-widest">
            Step {step} of {TOTAL_STEPS}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="rounded-2xl border p-6 sm:p-8"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,200,255,0.1)" }}>
                    <User className="w-5 h-5" style={{ color: "#00c8ff" }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-joe-text">Let's start with you</h2>
                    <p className="text-sm text-joe-text/50">Basic contact information</p>
                  </div>
                </div>

                <Form {...step1Form}>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={step1Form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-joe-text/70 text-sm">Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Alex Johnson" data-testid="input-name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={step1Form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-joe-text/70 text-sm">Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="alex@company.com" data-testid="input-email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={step1Form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-joe-text/70 text-sm">Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Corp" data-testid="input-company" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={step1Form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-joe-text/70 text-sm">Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 555 000 0000" data-testid="input-phone" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="rounded-2xl border p-6 sm:p-8"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,200,255,0.1)" }}>
                    <Briefcase className="w-5 h-5" style={{ color: "#00c8ff" }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-joe-text">What are you building?</h2>
                    <p className="text-sm text-joe-text/50">Select your service and describe your project</p>
                  </div>
                </div>

                <Form {...step2Form}>
                  <form className="space-y-5">
                    <FormField
                      control={step2Form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-joe-text/70 text-sm mb-2 block">Service Type *</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-1 gap-2">
                              {[
                                { group: "AI & Automation", icon: <Cpu className="w-4 h-4" />, services: SERVICE_GROUPS.ai },
                                { group: "Web & App Development", icon: <Layout className="w-4 h-4" />, services: SERVICE_GROUPS.webdev },
                                { group: "Design", icon: <PenTool className="w-4 h-4" />, services: SERVICE_GROUPS.design },
                                { group: "Advisory", icon: <Lightbulb className="w-4 h-4" />, services: SERVICE_GROUPS.advisory },
                              ].map(({ group, icon, services }) => (
                                <div key={group}>
                                  <p className="text-xs text-joe-text/40 font-mono uppercase tracking-widest mb-1.5 mt-3 first:mt-0">{group}</p>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                    {services.map(service => (
                                      <OptionCard
                                        key={service}
                                        label={service}
                                        selected={field.value === service}
                                        onClick={() => field.onChange(service)}
                                        icon={icon}
                                        testId={`option-service-${service.toLowerCase().replace(/\s+/g, "-")}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step2Form.control}
                      name="projectDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-joe-text/70 text-sm">Project Description <span className="text-joe-text/30">(optional)</span></FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Briefly describe what you're looking to build or achieve..."
                              className="resize-none min-h-[90px]"
                              data-testid="input-project-description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="rounded-2xl border p-6 sm:p-8"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,200,255,0.1)" }}>
                    <Sparkles className="w-5 h-5" style={{ color: "#00c8ff" }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-joe-text">Budget & Timeline</h2>
                    <p className="text-sm text-joe-text/50">This helps us scope the right solution for you</p>
                  </div>
                </div>

                <Form {...step3Form}>
                  <form className="space-y-6">
                    <FormField
                      control={step3Form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-joe-text/70 text-sm mb-2 block">Budget Range *</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                { value: "under-5k", label: "Under $5,000", sub: "Lean & focused scope" },
                                { value: "5k-25k", label: "$5,000 – $25,000", sub: "Growth-stage projects" },
                                { value: "25k-100k", label: "$25,000 – $100,000", sub: "Substantial builds" },
                                { value: "100k+", label: "$100,000+", sub: "Enterprise-scale work" },
                              ].map(({ value, label, sub }) => (
                                <button
                                  key={value}
                                  type="button"
                                  data-testid={`option-budget-${value}`}
                                  onClick={() => field.onChange(value)}
                                  className="text-left rounded-xl px-4 py-3.5 border transition-all duration-200"
                                  style={{
                                    background: field.value === value ? "rgba(0,200,255,0.08)" : "var(--joe-overlay)",
                                    borderColor: field.value === value ? "#00c8ff" : "var(--joe-card-border)",
                                    boxShadow: field.value === value ? "0 0 0 2px rgba(0,200,255,0.18)" : "none",
                                  }}
                                >
                                  <p className="font-semibold text-sm text-joe-text">{label}</p>
                                  <p className="text-xs text-joe-text/40 mt-0.5">{sub}</p>
                                </button>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step3Form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-joe-text/70 text-sm mb-2 block">Project Timeline *</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                { value: "flexible", label: "Flexible", sub: "No strict deadline" },
                                { value: "3-6-months", label: "3–6 months", sub: "Standard delivery window" },
                                { value: "1-3-months", label: "1–3 months", sub: "Accelerated timeline" },
                                { value: "asap", label: "ASAP", sub: "Immediate priority" },
                              ].map(({ value, label, sub }) => (
                                <button
                                  key={value}
                                  type="button"
                                  data-testid={`option-timeline-${value}`}
                                  onClick={() => field.onChange(value)}
                                  className="text-left rounded-xl px-4 py-3.5 border transition-all duration-200"
                                  style={{
                                    background: field.value === value ? "rgba(0,200,255,0.08)" : "var(--joe-overlay)",
                                    borderColor: field.value === value ? "#00c8ff" : "var(--joe-card-border)",
                                    boxShadow: field.value === value ? "0 0 0 2px rgba(0,200,255,0.18)" : "none",
                                  }}
                                >
                                  <p className="font-semibold text-sm text-joe-text">{label}</p>
                                  <p className="text-xs text-joe-text/40 mt-0.5">{sub}</p>
                                </button>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="rounded-2xl border p-6 sm:p-8"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,200,255,0.1)" }}>
                    <Building2 className="w-5 h-5" style={{ color: "#00c8ff" }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-joe-text">About your organisation</h2>
                    <p className="text-sm text-joe-text/50">A few more targeted questions</p>
                  </div>
                </div>

                <Form {...step4Form}>
                  <form className="space-y-6">
                    <FormField
                      control={step4Form.control}
                      name="companySize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-joe-text/70 text-sm mb-2 block">Team / Company Size *</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {[
                                { value: "1-10", label: "1–10" },
                                { value: "11-50", label: "11–50" },
                                { value: "51-200", label: "51–200" },
                                { value: "200+", label: "200+" },
                              ].map(({ value, label }) => (
                                <button
                                  key={value}
                                  type="button"
                                  data-testid={`option-size-${value}`}
                                  onClick={() => field.onChange(value)}
                                  className="text-center rounded-xl px-3 py-3 border transition-all duration-200"
                                  style={{
                                    background: field.value === value ? "rgba(0,200,255,0.08)" : "var(--joe-overlay)",
                                    borderColor: field.value === value ? "#00c8ff" : "var(--joe-card-border)",
                                    boxShadow: field.value === value ? "0 0 0 2px rgba(0,200,255,0.18)" : "none",
                                  }}
                                >
                                  <p className="font-semibold text-sm text-joe-text">{label}</p>
                                  <p className="text-xs text-joe-text/40 mt-0.5">employees</p>
                                </button>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step4Form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-joe-text/70 text-sm">Industry <span className="text-joe-text/30">(optional)</span></FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. FinTech, Healthcare, SaaS..." data-testid="input-industry" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step4Form.control}
                      name="hasExistingSolution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-joe-text/70 text-sm mb-2 block">Do you have an existing solution you're looking to replace or improve? *</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-2 gap-2">
                              <OptionCard
                                label="No, starting fresh"
                                selected={field.value === "no"}
                                onClick={() => field.onChange("no")}
                                testId="option-existing-no"
                              />
                              <OptionCard
                                label="Yes, looking to upgrade"
                                selected={field.value === "yes"}
                                onClick={() => field.onChange("yes")}
                                testId="option-existing-yes"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-2 border-t" style={{ borderColor: "var(--joe-divide)" }}>
                      <p className="text-xs text-joe-text/40 font-mono uppercase tracking-widest mb-4">
                        {selectedService ? `Tailored for: ${selectedService}` : "Tailored questions"}
                      </p>

                      <div className="space-y-5">
                        <FormField
                          control={step4Form.control}
                          name="adaptive1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-joe-text/70 text-sm mb-2 block">{adaptiveQs[0].label} *</FormLabel>
                              <FormControl>
                                <div className="grid grid-cols-1 gap-1.5">
                                  {adaptiveQs[0].options.map((opt, i) => (
                                    <OptionCard
                                      key={opt}
                                      label={opt}
                                      selected={field.value === opt}
                                      onClick={() => field.onChange(opt)}
                                      testId={`option-adaptive1-${i}`}
                                    />
                                  ))}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={step4Form.control}
                          name="adaptive2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-joe-text/70 text-sm mb-2 block">{adaptiveQs[1].label} *</FormLabel>
                              <FormControl>
                                <div className="grid grid-cols-1 gap-1.5">
                                  {adaptiveQs[1].options.map((opt, i) => (
                                    <OptionCard
                                      key={opt}
                                      label={opt}
                                      selected={field.value === opt}
                                      onClick={() => field.onChange(opt)}
                                      testId={`option-adaptive2-${i}`}
                                    />
                                  ))}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="rounded-2xl border p-6 sm:p-8 text-center flex flex-col items-center gap-5"
                style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(0,200,255,0.15), rgba(124,58,237,0.15))" }}
                >
                  <Sparkles className="w-8 h-8" style={{ color: "#00c8ff" }} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-joe-text mb-2">Ready to reveal your score?</h2>
                  <p className="text-joe-text/50 text-sm max-w-sm mx-auto">
                    We've collected everything we need. Click below to analyse your responses and get your personalised engagement tier.
                  </p>
                </div>

                <div
                  className="w-full rounded-xl px-5 py-4 text-left"
                  style={{ background: "var(--joe-overlay)", border: "1px solid var(--joe-card-border)" }}
                >
                  <p className="text-xs text-joe-text/40 font-mono uppercase tracking-widest mb-3">Your Answers</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-joe-text/40 text-xs">Name</span>
                      <p className="font-medium text-joe-text truncate" data-testid="text-review-name">{formData.name}</p>
                    </div>
                    <div>
                      <span className="text-joe-text/40 text-xs">Email</span>
                      <p className="font-medium text-joe-text truncate" data-testid="text-review-email">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-joe-text/40 text-xs">Service</span>
                      <p className="font-medium text-joe-text" data-testid="text-review-service">{formData.serviceType}</p>
                    </div>
                    <div>
                      <span className="text-joe-text/40 text-xs">Budget</span>
                      <p className="font-medium text-joe-text" data-testid="text-review-budget">
                        {formData.budget === "under-5k" ? "Under $5K"
                          : formData.budget === "5k-25k" ? "$5K – $25K"
                          : formData.budget === "25k-100k" ? "$25K – $100K"
                          : "$100K+"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={step === 1 || mutation.isPending}
            data-testid="button-back"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>

          <Button
            onClick={goNext}
            disabled={mutation.isPending}
            data-testid="button-next"
            className="flex items-center gap-2 px-6"
            style={{
              background: "linear-gradient(135deg, #00c8ff, #0066ff)",
              border: "none",
            }}
          >
            {mutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analysing...
              </>
            ) : step === TOTAL_STEPS ? (
              <>
                <Sparkles className="w-4 h-4" />
                Get My Score
              </>
            ) : (
              <>
                Continue <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
