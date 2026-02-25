import { useEffect, lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/Layout";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

const About = lazy(() => import("@/pages/about"));
const ServicesPage = lazy(() => import("@/pages/services"));
const Portfolio = lazy(() => import("@/pages/portfolio"));
const Contact = lazy(() => import("@/pages/contact"));
const PrivacyPolicy = lazy(() => import("@/pages/privacy"));
const TermsOfService = lazy(() => import("@/pages/terms"));
const CookiePolicy = lazy(() => import("@/pages/cookies"));
const AIStrategyPage = lazy(() => import("@/pages/services/ai-strategy"));
const CustomAIPage = lazy(() => import("@/pages/services/custom-ai"));
const MLOpsPage = lazy(() => import("@/pages/services/mlops"));
const AIIntegrationPage = lazy(() => import("@/pages/services/ai-integration"));
const FullStackPage = lazy(() => import("@/pages/services/full-stack"));
const AdvisoryPage = lazy(() => import("@/pages/services/advisory"));
const WhyUsPage = lazy(() => import("@/pages/why-us"));
const ProcessPage = lazy(() => import("@/pages/process"));
const TechStackPage = lazy(() => import("@/pages/tech-stack"));
const FAQPage = lazy(() => import("@/pages/faq"));

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--joe-bg-solid)" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#00c8ff] border-t-transparent rounded-full animate-spin" />
        <span className="text-joe-text/50 text-sm font-mono">Loading...</span>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services/ai-strategy" component={AIStrategyPage} />
        <Route path="/services/custom-ai" component={CustomAIPage} />
        <Route path="/services/mlops" component={MLOpsPage} />
        <Route path="/services/ai-integration" component={AIIntegrationPage} />
        <Route path="/services/full-stack" component={FullStackPage} />
        <Route path="/services/advisory" component={AdvisoryPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/why-us" component={WhyUsPage} />
        <Route path="/process" component={ProcessPage} />
        <Route path="/tech-stack" component={TechStackPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/cookies" component={CookiePolicy} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Layout>
            <Router />
          </Layout>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
