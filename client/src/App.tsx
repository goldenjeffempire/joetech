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

function PageSkeleton() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--joe-bg-solid)" }}
      aria-hidden="true"
    >
      <div
        className="fixed top-0 left-0 right-0 h-16 z-40"
        style={{ background: "var(--joe-nav-bg)", borderBottom: "1px solid var(--joe-nav-border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-md skeleton-pulse" style={{ background: "rgba(72,242,251,0.15)" }} />
            <div className="w-28 h-4 rounded skeleton-pulse" style={{ background: "rgba(72,242,251,0.1)" }} />
          </div>
          <div className="hidden md:flex items-center gap-6">
            {[60, 48, 56, 68, 52].map((w, i) => (
              <div key={i} className="h-3 rounded skeleton-pulse" style={{ width: w, background: "rgba(255,255,255,0.07)" }} />
            ))}
          </div>
          <div className="w-28 h-8 rounded-lg skeleton-pulse" style={{ background: "rgba(72,242,251,0.12)" }} />
        </div>
      </div>

      <div
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100vh", paddingTop: "4rem" }}
      >
        <div className="skeleton-hero-glow" />
        <div className="relative z-10 flex flex-col items-center gap-5 px-6 w-full max-w-3xl mx-auto">
          <div className="w-32 h-5 rounded-full skeleton-pulse" style={{ background: "rgba(72,242,251,0.15)" }} />
          <div className="flex flex-col gap-3 w-full items-center">
            <div className="w-full max-w-xl h-10 rounded-xl skeleton-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
            <div className="w-3/4 h-10 rounded-xl skeleton-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>
          <div className="flex flex-col gap-2 w-full items-center max-w-lg">
            <div className="w-full h-4 rounded skeleton-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="w-5/6 h-4 rounded skeleton-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
          </div>
          <div className="flex gap-4 mt-2">
            <div className="w-36 h-11 rounded-xl skeleton-pulse" style={{ background: "rgba(72,242,251,0.2)" }} />
            <div className="w-36 h-11 rounded-xl skeleton-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-4 skeleton-pulse"
              style={{
                background: "var(--joe-card)",
                border: "1px solid var(--joe-card-border)",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <div className="w-10 h-10 rounded-xl" style={{ background: "rgba(72,242,251,0.1)" }} />
              <div className="h-5 rounded w-3/4" style={{ background: "rgba(255,255,255,0.07)" }} />
              <div className="flex flex-col gap-2">
                <div className="h-3 rounded w-full" style={{ background: "rgba(255,255,255,0.05)" }} />
                <div className="h-3 rounded w-5/6" style={{ background: "rgba(255,255,255,0.04)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageSkeleton />}>
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
