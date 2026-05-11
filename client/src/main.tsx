import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  console.error("[JOE] #root element not found — cannot mount React app.");
} else {
  try {
    createRoot(rootEl).render(<App />);
  } catch (err) {
    console.error("[JOE] React mount failed:", err);
    rootEl.innerHTML = `
      <div style="position:fixed;inset:0;background:#060A10;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;font-family:sans-serif;text-align:center;padding:24px;">
        <div style="font-size:1.5rem;font-weight:700;color:#48F2FB">&lt;JOE/&gt;</div>
        <p style="color:rgba(255,255,255,0.6);max-width:320px">Something went wrong loading the platform. Please refresh the page.</p>
        <button onclick="location.reload()" style="background:linear-gradient(135deg,#48F2FB,#E867EA);color:#060A10;border:none;padding:10px 24px;border-radius:8px;font-weight:700;cursor:pointer;font-size:0.9rem;">Refresh</button>
      </div>
    `;
  }
}
