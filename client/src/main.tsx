import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root");

function removeAppShell() {
  const shell = document.getElementById("app-shell");
  if (shell) {
    shell.style.opacity = "0";
    shell.style.transition = "opacity 0.15s ease";
    setTimeout(() => shell.remove(), 160);
  }
  if (typeof window.__joeShellWatchdog !== "undefined") {
    clearTimeout(window.__joeShellWatchdog);
  }
}

declare global {
  interface Window {
    __joeShellWatchdog?: ReturnType<typeof setTimeout>;
  }
}

if (!rootEl) {
  console.error("[JOE] #root element not found — cannot mount React app.");
  removeAppShell();
} else {
  try {
    createRoot(rootEl).render(<App />);
    // Remove the loading shell after React has had two animation frames to
    // complete its first paint. Double-rAF ensures the DOM is flushed.
    requestAnimationFrame(() => {
      requestAnimationFrame(removeAppShell);
    });
  } catch (err) {
    console.error("[JOE] React mount failed:", err);
    removeAppShell();
    rootEl.innerHTML = `
      <div style="position:fixed;inset:0;background:#060A10;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;font-family:sans-serif;text-align:center;padding:24px;">
        <div style="font-size:1.5rem;font-weight:700;color:#48F2FB">&lt;JOE/&gt;</div>
        <p style="color:rgba(255,255,255,0.6);max-width:320px">Something went wrong loading the platform. Please refresh the page.</p>
        <button onclick="location.reload()" style="background:linear-gradient(135deg,#48F2FB,#E867EA);color:#060A10;border:none;padding:10px 24px;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.9rem;">Refresh</button>
      </div>
    `;
  }
}
