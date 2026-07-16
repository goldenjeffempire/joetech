import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Catch any uncaught errors and display them so we can diagnose blank-page issues
window.onerror = (msg, src, line, col, err) => {
  const root = document.getElementById("root");
  if (root && !root.hasChildNodes()) {
    root.innerHTML = `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#060A10;color:#fff;font-family:monospace;padding:24px;text-align:center;flex-direction:column;gap:12px">
      <div style="color:#48F2FB;font-size:1.2rem;font-weight:700">&lt;JOE/&gt; — Runtime Error</div>
      <pre style="background:#0f172a;padding:16px;border-radius:8px;color:#E867EA;max-width:700px;white-space:pre-wrap;font-size:0.8rem;text-align:left">${String(err?.stack || msg)}</pre>
      <div style="color:rgba(255,255,255,0.4);font-size:0.75rem">${src}:${line}:${col}</div>
      <button onclick="location.reload()" style="background:#48F2FB;color:#060A10;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;font-weight:700">Reload</button>
    </div>`;
  }
  return false;
};

window.addEventListener("unhandledrejection", (e) => {
  const root = document.getElementById("root");
  if (root && !root.hasChildNodes()) {
    root.innerHTML = `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#060A10;color:#fff;font-family:monospace;padding:24px;text-align:center;flex-direction:column;gap:12px">
      <div style="color:#48F2FB;font-size:1.2rem;font-weight:700">&lt;JOE/&gt; — Unhandled Promise Rejection</div>
      <pre style="background:#0f172a;padding:16px;border-radius:8px;color:#E867EA;max-width:700px;white-space:pre-wrap;font-size:0.8rem;text-align:left">${String(e.reason?.stack || e.reason)}</pre>
      <button onclick="location.reload()" style="background:#48F2FB;color:#060A10;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;font-weight:700">Reload</button>
    </div>`;
  }
});

const rootEl = document.getElementById("root");

if (rootEl) {
  try {
    createRoot(rootEl).render(<App />);
  } catch (err: unknown) {
    const e = err as Error;
    rootEl.innerHTML = `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#060A10;color:#fff;font-family:monospace;padding:24px;text-align:center;flex-direction:column;gap:12px">
      <div style="color:#48F2FB;font-size:1.2rem;font-weight:700">&lt;JOE/&gt; — Render Error</div>
      <pre style="background:#0f172a;padding:16px;border-radius:8px;color:#E867EA;max-width:700px;white-space:pre-wrap;font-size:0.8rem;text-align:left">${e?.stack || String(err)}</pre>
      <button onclick="location.reload()" style="background:#48F2FB;color:#060A10;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;font-weight:700">Reload</button>
    </div>`;
  }
}
