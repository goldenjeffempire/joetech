const ROUTE_CHUNKS: Record<string, () => Promise<unknown>> = {
  "/":                            () => import("@/pages/home"),
  "/about":                       () => import("@/pages/about"),
  "/services":                    () => import("@/pages/services"),
  "/portfolio":                   () => import("@/pages/portfolio"),
  "/contact":                     () => import("@/pages/contact"),
  "/why-us":                      () => import("@/pages/why-us"),
  "/process":                     () => import("@/pages/process"),
  "/tech-stack":                  () => import("@/pages/tech-stack"),
  "/faq":                         () => import("@/pages/faq"),
  "/qualify":                     () => import("@/pages/qualify"),
  "/services/app-development":    () => import("@/pages/services/app-development"),
  "/services/website-design":     () => import("@/pages/services/website-design"),
  "/services/uiux-design":        () => import("@/pages/services/uiux-design"),
  "/services/automation":         () => import("@/pages/services/automation"),
  "/services/ai-strategy":        () => import("@/pages/services/ai-strategy"),
  "/services/custom-ai":          () => import("@/pages/services/custom-ai"),
  "/services/mlops":              () => import("@/pages/services/mlops"),
  "/services/ai-integration":     () => import("@/pages/services/ai-integration"),
  "/services/full-stack":         () => import("@/pages/services/full-stack"),
  "/services/advisory":           () => import("@/pages/services/advisory"),
};

const prefetched = new Set<string>();

export function prefetchRoute(path: string): void {
  if (prefetched.has(path)) return;
  const loader = ROUTE_CHUNKS[path];
  if (!loader) return;
  prefetched.add(path);
  loader().catch(() => {});
}

const idleSchedule =
  typeof requestIdleCallback === "function"
    ? requestIdleCallback
    : (fn: IdleRequestCallback) => setTimeout(fn, 150);

export function prefetchIdle(paths: string[]): void {
  idleSchedule(() => {
    paths.forEach((p, i) => setTimeout(() => prefetchRoute(p), i * 80));
  });
}
