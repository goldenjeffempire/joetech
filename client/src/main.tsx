import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

declare global {
  interface Window {
    __joeShellWatchdog?: ReturnType<typeof setTimeout>;
    __joeShellWarmup?:   ReturnType<typeof setTimeout>;
  }
}

function removeAppShell() {
  if (typeof window.__joeShellWatchdog !== "undefined") {
    clearTimeout(window.__joeShellWatchdog);
    delete window.__joeShellWatchdog;
  }
  if (typeof window.__joeShellWarmup !== "undefined") {
    clearTimeout(window.__joeShellWarmup);
    delete window.__joeShellWarmup;
  }
  const shell = document.getElementById("app-shell");
  if (!shell) return;
  shell.style.opacity = "0";
  shell.style.transition = "opacity 0.2s ease";
  setTimeout(() => {
    shell.parentNode?.removeChild(shell);
  }, 220);
}

const rootEl = document.getElementById("root");

if (!rootEl) {
  // #root is missing — structural HTML bug. Remove spinner and show nothing.
  console.error("[JOE] #root element not found — cannot mount app.");
  removeAppShell();
} else {
  // ── Observe #root for React's first commit ──────────────────────────────────
  // React 18 concurrent mode schedules work asynchronously. requestAnimationFrame
  // fires ~16ms after render() — long before React has finished downloading
  // vendor chunks and committing the tree. Using MutationObserver means we wait
  // for React's ACTUAL first DOM commit before hiding the loading shell, so
  // users never see a blank-page gap between spinner removal and app paint.
  const observer = new MutationObserver(() => {
    if (rootEl.childNodes.length > 0) {
      observer.disconnect();
      removeAppShell();
    }
  });
  observer.observe(rootEl, { childList: true, subtree: false });

  // Safety: if the observer never fires (React crash before first commit),
  // the HTML watchdog (12 s) already shows "Reload Page". Clean up the
  // observer at 20 s so we don't keep it alive forever.
  const observerCleanup = setTimeout(() => {
    observer.disconnect();
  }, 20_000);

  try {
    createRoot(rootEl).render(<App />);
  } catch (err) {
    // Synchronous mount failure — clean up observer and show error UI
    clearTimeout(observerCleanup);
    observer.disconnect();
    console.error("[JOE] React mount failed:", err);
    removeAppShell();
    rootEl.innerHTML = `
      <div style="position:fixed;inset:0;background:#060A10;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;font-family:sans-serif;text-align:center;padding:24px;z-index:9998;">
        <div style="font-size:1.5rem;font-weight:700;color:#48F2FB">&lt;JOE/&gt;</div>
        <p style="color:rgba(255,255,255,0.6);max-width:320px;font-size:0.9rem;line-height:1.6;margin:0;">Something went wrong loading the platform. Please refresh the page.</p>
        <button onclick="location.reload()" style="background:linear-gradient(135deg,#48F2FB,#E867EA);color:#060A10;border:none;padding:10px 24px;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.9rem;">Refresh</button>
      </div>
    `;
  }
}
