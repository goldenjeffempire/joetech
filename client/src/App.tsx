import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/Layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import ServicesPage from "@/pages/services";
import Portfolio from "@/pages/portfolio";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy";
import TermsOfService from "@/pages/terms";
import CookiePolicy from "@/pages/cookies";
import AIStrategyPage from "@/pages/services/ai-strategy";
import CustomAIPage from "@/pages/services/custom-ai";
import MLOpsPage from "@/pages/services/mlops";
import AIIntegrationPage from "@/pages/services/ai-integration";
import FullStackPage from "@/pages/services/full-stack";
import AdvisoryPage from "@/pages/services/advisory";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
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
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/cookies" component={CookiePolicy} />
      <Route component={NotFound} />
    </Switch>
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
