import { SiWhatsapp } from "react-icons/si";
import { ChevronRight } from "lucide-react";

export const WA_CONTACTS = [
  {
    label: "JOE Technologies",
    number: "08159088343",
    wa: (msg?: string) =>
      `https://wa.me/2348159088343?text=${encodeURIComponent(
        msg ?? "Hello JOE Technologies, I'd love to discuss a project."
      )}`,
    tag: "Business inquiries",
  },
  {
    label: "JOE Technologies",
    number: "09017048791",
    wa: (msg?: string) =>
      `https://wa.me/2349017048791?text=${encodeURIComponent(
        msg ?? "Hello JOE Technologies, I'd love to discuss a project."
      )}`,
    tag: "Business inquiries",
  },
];

interface WhatsAppContactPickerProps {
  message?: string;
  className?: string;
}

export default function WhatsAppContactPicker({
  message,
  className = "",
}: WhatsAppContactPickerProps) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(145deg, rgba(8,13,28,0.96), rgba(3,8,18,0.98))",
        borderColor: "rgba(0,255,136,0.18)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.45), 0 0 30px rgba(0,255,136,0.06)",
      }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3.5 border-b"
        style={{ borderColor: "rgba(0,255,136,0.1)", background: "rgba(0,255,136,0.03)" }}
      >
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#00ff88]/12 border border-[#00ff88]/25 flex items-center justify-center">
            <SiWhatsapp className="w-5 h-5 text-[#00ff88]" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00ff88] border-2 border-[#04060d]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-heading font-semibold text-sm leading-tight">JOE Technologies</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <p className="text-[#00ff88] text-xs font-mono">Online · Typically replies fast</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-3.5 pb-4">
        <p className="text-white/28 text-[10px] font-mono uppercase tracking-widest mb-2.5">Select a contact</p>
        <div className="flex flex-col gap-2">
          {WA_CONTACTS.map((n, i) => (
            <a
              key={i}
              href={n.wa(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200"
              style={{ background: "rgba(0,255,136,0.03)", borderColor: "rgba(0,255,136,0.1)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,255,136,0.09)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,136,0.28)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,255,136,0.03)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,136,0.1)";
              }}
              data-testid={`wa-contact-${i}`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)" }}
              >
                <SiWhatsapp className="w-4 h-4 text-[#25d366]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-sm font-semibold leading-tight">{n.label}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <p className="text-white/30 text-xs font-mono">{n.number}</p>
                  <span
                    className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full leading-none"
                    style={{
                      background: "rgba(0,255,136,0.1)",
                      color: "#00ff88",
                      border: "1px solid rgba(0,255,136,0.2)",
                    }}
                  >
                    {n.tag}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#25d366]/30 group-hover:text-[#25d366] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
