import { useEffect, lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/Layout";
import NotFound from "@/pages/not-found";
import { prefetchIdle } from "@/lib/prefetch";

const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const ServicesPage = lazy(() => import("@/pages/services"));
const Portfolio = lazy(() => import("@/pages/portfolio"));
const Contact = lazy(() => import("@/pages/contact"));
const PrivacyPolicy = lazy(() => import("@/pages/privacy"));
const TermsOfService = lazy(() => import("@/pages/terms"));
const CookiePolicy = lazy(() => import("@/pages/cookies"));

const AppDevelopmentPage = lazy(() => import("@/pages/services/app-development"));
const WebsiteDesignPage = lazy(() => import("@/pages/services/website-design"));
const UIUXDesignPage = lazy(() => import("@/pages/services/uiux-design"));
const AutomationPage = lazy(() => import("@/pages/services/automation"));
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
const QualifyPage = lazy(() => import("@/pages/qualify"));
const AdminPage = lazy(() => import("@/pages/admin"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function PageViewTracker() {
  const [location] = useLocation();
  useEffect(() => {
    fetch("/api/analytics/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: location, referrer: document.referrer || null }),
    }).catch(() => {});
  }, [location]);
  return null;
}

function IdlePrefetcher() {
  useEffect(() => {
    prefetchIdle([
      "/about",
      "/services",
      "/portfolio",
      "/contact",
      "/services/app-development",
      "/services/website-design",
      "/services/automation",
      "/services/custom-ai",
    ]);
  }, []);
  return null;
}

function PageLoader() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: "#48F2FB", borderRightColor: "#E867EA" }}
          />
        </div>
        <span
          className="font-heading text-sm tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Loading…
        </span>
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
        <Route path="/services/app-development" component={AppDevelopmentPage} />
        <Route path="/services/website-design" component={WebsiteDesignPage} />
        <Route path="/services/uiux-design" component={UIUXDesignPage} />
        <Route path="/services/automation" component={AutomationPage} />
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
        <Route path="/qualify" component={QualifyPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/cookies" component={CookiePolicy} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function AppWithBoundary() {
  const [location] = useLocation();
  return (
    <ErrorBoundary resetKey={location}>
      <Layout>
        <Router />
      </Layout>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ScrollToTop />
        <PageViewTracker />
        <IdlePrefetcher />
        <AppWithBoundary />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
