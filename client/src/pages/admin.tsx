import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, RefreshCw, Download, Copy, CheckCheck,
  Mail, Users, MessageSquare, TrendingUp, Eye, EyeOff,
  ShieldCheck, AlertCircle, Inbox, ChevronDown, ChevronUp, BarChart2, Globe2, Target,
  Search, X, CalendarDays, ShieldCheck as ConsentIcon, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ContactSubmission, LeadSubmission, NewsletterSubscriber, PageViewStat, PageViewTimeline } from "@shared/schema";

const SESSION_KEY = "joe-admin-key";

async function adminFetch<T>(url: string, key: string): Promise<T> {
  const res = await fetch(url, { headers: { "x-api-key": key }, credentials: "include" });
  if (res.status === 403) throw new Error("403");
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch { return d; }
}

function sanitizeCsvField(value: string): string {
  const escaped = value.replace(/"/g, '""');
  // Prevent formula injection: Excel/Sheets treat cells starting with =, +, -, @, tab as formulas
  const sanitized = /^[=+\-@\t]/.test(escaped) ? `\t${escaped}` : escaped;
  return `"${sanitized}"`;
}

function exportCSV(rows: Record<string, unknown>[], name: string) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [
    keys.join(","),
    ...rows.map(r =>
      keys.map(k => sanitizeCsvField(String(r[k] ?? ""))).join(",")
    ),
  ].join("\n");
  const a = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })),
    download: name,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      title="Copy"
      className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-[#48F2FB]/70 hover:text-[#48F2FB]"
      data-testid={`copy-${text}`}
    >
      {copied ? <CheckCheck size={11} /> : <Copy size={11} />}
    </button>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const s: Record<string, string> = {
    "Startup":    "bg-slate-700/60   text-slate-300   border-slate-600/50",
    "High Value": "bg-amber-900/40   text-amber-300   border-amber-600/40",
    "Enterprise": "bg-[#48F2FB]/10   text-[#48F2FB]   border-[#48F2FB]/30",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-mono whitespace-nowrap ${s[tier] ?? s["Startup"]}`}>
      {tier}
    </span>
  );
}

function ScorePill({ score }: { score: number }) {
  const color = score >= 10 ? "#48F2FB" : score >= 6 ? "#f59e0b" : "#94a3b8";
  return (
    <span className="font-mono text-sm font-semibold" style={{ color }}>
      {score}<span className="text-white/25 font-normal">/13</span>
    </span>
  );
}

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-3 rounded bg-white/5 animate-pulse" style={{ width: `${60 + (i * 17) % 40}%` }} />
        </td>
      ))}
    </tr>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Inbox className="text-white/15 mb-3" size={40} />
      <p className="text-joe-text/35 text-sm font-mono">no {label} yet</p>
    </div>
  );
}

function TableWrapper({
  title, count, icon: Icon, accentColor, loading, refetching, onRefresh, onExport, children,
}: {
  title: string; count?: number; icon: React.ElementType; accentColor: string;
  loading: boolean; refetching: boolean; onRefresh: () => void; onExport: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--joe-card-border)" }}>
        <div className="flex items-center gap-2.5">
          <Icon size={16} style={{ color: accentColor }} />
          <span className="font-mono text-sm text-joe-text/80">{title}</span>
          {count !== undefined && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-joe-text/40 font-mono">{count}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost" size="sm" onClick={onRefresh} disabled={refetching}
            data-testid={`button-refresh-${title.toLowerCase()}`}
            className="text-joe-text/40 hover:text-joe-text gap-1.5 text-xs font-mono h-8 px-3"
          >
            <RefreshCw size={12} className={refetching ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button
            variant="ghost" size="sm" onClick={onExport}
            data-testid={`button-export-${title.toLowerCase()}`}
            className="text-joe-text/40 hover:text-joe-text gap-1.5 text-xs font-mono h-8 px-3"
          >
            <Download size={12} />
            <span className="hidden sm:inline">CSV</span>
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        {loading
          ? <table className="w-full text-sm"><tbody>{Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} cols={6} />)}</tbody></table>
          : children}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-mono text-joe-text/40 whitespace-nowrap border-b"
      style={{ borderColor: "var(--joe-card-border)" }}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`px-4 py-3 text-sm text-joe-text/75 align-top ${className}`}>{children}</td>
  );
}

function ExpandableMessage({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const short = text.length > 90;
  return (
    <span>
      {open || !short ? text : text.slice(0, 90) + "…"}
      {short && (
        <button onClick={() => setOpen(o => !o)} className="ml-1 text-[#48F2FB]/60 hover:text-[#48F2FB] inline-flex items-center">
          {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      )}
    </span>
  );
}

function ContactsTable({ data, loading, refetching, refetch }: {
  data?: ContactSubmission[]; loading: boolean; refetching: boolean; refetch: () => void;
}) {
  return (
    <TableWrapper
      title="Contact Submissions" count={data?.length} icon={MessageSquare} accentColor="#48F2FB"
      loading={loading} refetching={refetching} onRefresh={refetch}
      onExport={() => exportCSV((data ?? []) as unknown as Record<string, unknown>[], "contacts.csv")}
    >
      {!data?.length ? <EmptyState label="contacts" /> : (
        <table className="w-full text-sm">
          <thead>
            <tr>
              <Th>Date</Th><Th>Name</Th><Th>Email</Th><Th>Company</Th><Th>Service</Th><Th>Message</Th>
            </tr>
          </thead>
          <tbody>
            {[...data].reverse().map((c, i) => (
              <tr key={c.id} className={`group border-b transition-colors hover:bg-white/[0.02] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}
                style={{ borderColor: "var(--joe-card-border)" }}>
                <Td><span className="font-mono text-xs text-joe-text/40 whitespace-nowrap">{formatDate(c.createdAt)}</span></Td>
                <Td><span className="font-medium text-joe-text whitespace-nowrap">{c.name}</span></Td>
                <Td>
                  <span className="flex items-center whitespace-nowrap">
                    <span className="text-[#48F2FB]/80">{c.email}</span>
                    <CopyBtn text={c.email} />
                  </span>
                </Td>
                <Td>{c.company ?? <span className="text-joe-text/25">—</span>}</Td>
                <Td>
                  {c.service
                    ? <span className="text-xs px-2 py-0.5 rounded-full bg-[#48F2FB]/10 text-[#48F2FB]/80 border border-[#48F2FB]/20 whitespace-nowrap">{c.service}</span>
                    : <span className="text-joe-text/25">—</span>}
                </Td>
                <Td className="max-w-[280px]"><ExpandableMessage text={c.message} /></Td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TableWrapper>
  );
}

function LeadsTable({ data, loading, refetching, refetch }: {
  data?: LeadSubmission[]; loading: boolean; refetching: boolean; refetch: () => void;
}) {
  return (
    <TableWrapper
      title="Lead Submissions" count={data?.length} icon={TrendingUp} accentColor="#E867EA"
      loading={loading} refetching={refetching} onRefresh={refetch}
      onExport={() => exportCSV((data ?? []) as unknown as Record<string, unknown>[], "leads.csv")}
    >
      {!data?.length ? <EmptyState label="leads" /> : (
        <table className="w-full text-sm">
          <thead>
            <tr>
              <Th>Date</Th><Th>Name</Th><Th>Email</Th><Th>Company</Th><Th>Service</Th>
              <Th>Budget</Th><Th>Timeline</Th><Th>Score</Th><Th>Tier</Th>
            </tr>
          </thead>
          <tbody>
            {[...data].reverse().map((l, i) => (
              <tr key={l.id} className={`group border-b transition-colors hover:bg-white/[0.02] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}
                style={{ borderColor: "var(--joe-card-border)" }}>
                <Td><span className="font-mono text-xs text-joe-text/40 whitespace-nowrap">{formatDate(l.createdAt)}</span></Td>
                <Td><span className="font-medium text-joe-text whitespace-nowrap">{l.name}</span></Td>
                <Td>
                  <span className="flex items-center whitespace-nowrap">
                    <span className="text-[#E867EA]/80">{l.email}</span>
                    <CopyBtn text={l.email} />
                  </span>
                </Td>
                <Td>{l.company ?? <span className="text-joe-text/25">—</span>}</Td>
                <Td><span className="text-xs px-2 py-0.5 rounded-full bg-[#E867EA]/10 text-[#E867EA]/80 border border-[#E867EA]/20 whitespace-nowrap">{l.serviceType}</span></Td>
                <Td><span className="text-joe-text/60 whitespace-nowrap text-xs">{l.budget}</span></Td>
                <Td><span className="text-joe-text/60 whitespace-nowrap text-xs">{l.timeline}</span></Td>
                <Td><ScorePill score={l.score} /></Td>
                <Td><TierBadge tier={l.tier} /></Td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TableWrapper>
  );
}

function AnalyticsPanel({ data, loading, refetching, refetch }: {
  data?: PageViewStat[]; loading: boolean; refetching: boolean; refetch: () => void;
}) {
  const total = data?.reduce((s, d) => s + d.views, 0) ?? 0;
  const max = Math.max(...(data ?? []).map(d => d.views), 1);
  return (
    <TableWrapper
      title="Page Views" count={total} icon={BarChart2} accentColor="#f59e0b"
      loading={loading} refetching={refetching} onRefresh={refetch}
      onExport={() => exportCSV((data ?? []) as unknown as Record<string, unknown>[], "analytics.csv")}
    >
      {!data?.length ? <EmptyState label="analytics data" /> : (
        <table className="w-full text-sm">
          <thead>
            <tr>
              <Th>#</Th><Th>Page</Th><Th>Views</Th><Th>Relative Traffic</Th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.path} className={`group border-b transition-colors hover:bg-white/[0.02] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}
                style={{ borderColor: "var(--joe-card-border)" }}
                data-testid={`row-analytics-${i}`}>
                <Td><span className="font-mono text-xs text-joe-text/25">{i + 1}</span></Td>
                <Td><span className="font-mono text-xs text-[#f59e0b]/80 whitespace-nowrap">{row.path}</span></Td>
                <Td>
                  <span className="font-mono font-semibold text-joe-text">
                    {row.views.toLocaleString()}
                  </span>
                  <span className="ml-1.5 text-xs text-joe-text/30 font-mono">
                    ({Math.round((row.views / total) * 100)}%)
                  </span>
                </Td>
                <Td className="w-52">
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--joe-card-border)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(row.views / max) * 100}%`,
                          background: "linear-gradient(90deg, #f59e0b 0%, #E867EA 100%)",
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-joe-text/30 w-8 text-right shrink-0">
                      {Math.round((row.views / max) * 100)}%
                    </span>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TableWrapper>
  );
}

type ConversionRow = { page: string; toContact: number; toQualify: number; total: number };

function ConversionsPanel({ data, loading, refetching, refetch }: {
  data?: ConversionRow[];
  loading: boolean; refetching: boolean; refetch: () => void;
}) {
  const max = Math.max(...(data ?? []).map(d => d.total), 1);

  return (
    <TableWrapper
      title="Conversion Pathways"
      icon={Target}
      accentColor="#00ff88"
      count={data?.length}
      loading={loading}
      refetching={refetching}
      onRefresh={refetch}
      onExport={() => {}}
    >
      {loading ? (
        <div className="p-5 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 bg-white/5 rounded animate-pulse" style={{ opacity: 1 - i * 0.15 }} />
          ))}
        </div>
      ) : !data?.length ? (
        <EmptyState label="conversion data" />
      ) : (
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--joe-card-border)" }}>
              <th className="px-4 py-2.5 text-left text-joe-text/40 font-normal">Page</th>
              <th className="px-3 py-2.5 text-right text-[#48F2FB]/60 font-normal whitespace-nowrap">→ Contact</th>
              <th className="px-3 py-2.5 text-right text-[#E867EA]/60 font-normal whitespace-nowrap">→ Qualify</th>
              <th className="px-4 py-2.5 text-right text-joe-text/40 font-normal">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--joe-card-border)" }}>
            {data.map((row, i) => (
              <tr key={row.page}
                data-testid={`conversion-row-${i}`}
                className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <span className="text-joe-text/80 truncate block">{row.page}</span>
                      <div className="mt-1 h-0.5 rounded-full overflow-hidden"
                        style={{ background: "var(--joe-card-border)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(row.total / max) * 100}%`,
                            background: row.toContact >= row.toQualify
                              ? "linear-gradient(90deg, #48F2FB, #E867EA)"
                              : "linear-gradient(90deg, #E867EA, #48F2FB)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-right">
                  {row.toContact > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[#48F2FB] bg-[#48F2FB]/10">
                      {row.toContact}
                    </span>
                  ) : (
                    <span className="text-joe-text/20">—</span>
                  )}
                </td>
                <td className="px-3 py-3 text-right">
                  {row.toQualify > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[#E867EA] bg-[#E867EA]/10">
                      {row.toQualify}
                    </span>
                  ) : (
                    <span className="text-joe-text/20">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-joe-text/70">
                  {row.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TableWrapper>
  );
}

const SOURCE_GRADIENTS = [
  "linear-gradient(90deg, #48F2FB, #E867EA)",
  "linear-gradient(90deg, #E867EA, #f59e0b)",
  "linear-gradient(90deg, #f59e0b, #00ff88)",
  "linear-gradient(90deg, #00ff88, #48F2FB)",
];

function ReferrerPanel({ data, loading, refetching, refetch }: {
  data?: { source: string; views: number }[];
  loading: boolean; refetching: boolean; refetch: () => void;
}) {
  const total = data?.reduce((s, d) => s + d.views, 0) ?? 0;
  const max = Math.max(...(data ?? []).map(d => d.views), 1);

  return (
    <div className="rounded-2xl border overflow-hidden flex flex-col"
      style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}>
      <div className="flex items-center justify-between px-5 py-4 border-b shrink-0"
        style={{ borderColor: "var(--joe-card-border)" }}>
        <div className="flex items-center gap-2.5">
          <Globe2 size={15} className="text-[#48F2FB]" />
          <span className="font-mono text-sm text-joe-text/80">Traffic Sources</span>
          {total > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-joe-text/40 font-mono">{total}</span>
          )}
        </div>
        <Button
          variant="ghost" size="sm" onClick={refetch} disabled={refetching}
          data-testid="button-refresh-referrers"
          className="text-joe-text/40 hover:text-joe-text gap-1.5 text-xs font-mono h-8 px-3"
        >
          <RefreshCw size={12} className={refetching ? "animate-spin" : ""} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>

      {loading ? (
        <div className="p-5 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3 bg-white/5 rounded animate-pulse" style={{ width: `${80 - i * 12}%`, opacity: 1 - i * 0.12 }} />
              <div className="h-1 bg-white/5 rounded animate-pulse" style={{ width: `${70 - i * 10}%`, opacity: 1 - i * 0.12 }} />
            </div>
          ))}
        </div>
      ) : !data?.length ? (
        <EmptyState label="referrer data" />
      ) : (
        <div className="p-4 space-y-3 overflow-y-auto">
          {data.map((row, i) => (
            <div key={row.source} data-testid={`referrer-source-${i}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-joe-text/70 truncate max-w-[65%] flex items-center gap-1.5">
                  {row.source === "Direct" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#48F2FB] shrink-0 inline-block" />
                  )}
                  {row.source}
                </span>
                <span className="text-xs font-mono text-joe-text/40 shrink-0 ml-2">
                  {row.views.toLocaleString()}
                  <span className="text-joe-text/20 ml-1">
                    ({Math.round((row.views / total) * 100)}%)
                  </span>
                </span>
              </div>
              <div className="h-1 rounded-full overflow-hidden"
                style={{ background: "var(--joe-card-border)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(row.views / max) * 100}%`,
                    background: SOURCE_GRADIENTS[i % SOURCE_GRADIENTS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function fillMissingDates(data: PageViewTimeline[], days: number): PageViewTimeline[] {
  const map = new Map(data.map(d => [d.date, d.views]));
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(Date.now() - (days - 1 - i) * 86_400_000);
    const key = d.toISOString().slice(0, 10);
    return { date: key, views: map.get(key) ?? 0 };
  });
}

function TimelineChart({ data, days, onDaysChange, loading }: {
  data?: PageViewTimeline[]; days: number; onDaysChange: (d: number) => void; loading: boolean;
}) {
  const filled = fillMissingDates(data ?? [], days);
  const max = Math.max(...filled.map(d => d.views), 1);
  const total = filled.reduce((s, d) => s + d.views, 0);
  const avg = filled.length ? Math.round(total / days) : 0;
  const peakDay = filled.reduce((a, b) => (b.views > a.views ? b : a), { date: "", views: 0 });

  return (
    <div className="rounded-2xl border p-5" style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5 flex-wrap gap-y-1.5">
          <BarChart2 size={14} className="text-[#f59e0b] shrink-0" />
          <span className="font-mono text-sm text-joe-text/80">Daily Trend</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-joe-text/40 font-mono">
            {total.toLocaleString()} total
          </span>
          {peakDay.views > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b]/70 border border-[#f59e0b]/20 font-mono">
              peak {peakDay.date.slice(5)}: {peakDay.views}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {([7, 30, 90] as const).map(d => (
            <button
              key={d}
              onClick={() => onDaysChange(d)}
              data-testid={`button-timeline-${d}d`}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                days === d ? "text-[#060A10] font-semibold shadow-sm" : "text-joe-text/40 hover:text-joe-text/70"
              }`}
              style={days === d ? { background: "linear-gradient(135deg, #f59e0b 0%, #E867EA 100%)" } : {}}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-28 rounded-xl bg-white/5 animate-pulse" />
      ) : (
        <>
          <div className="flex items-end gap-px h-28">
            {filled.map((d) => (
              <div
                key={d.date}
                title={`${d.date}: ${d.views} view${d.views !== 1 ? "s" : ""}`}
                className="flex-1 rounded-t-sm transition-all duration-300 cursor-default"
                style={{
                  height: d.views > 0 ? `${Math.max((d.views / max) * 100, 6)}%` : "3%",
                  background: d.views > 0
                    ? "linear-gradient(to top, #f59e0b, #E867EA)"
                    : "rgba(255,255,255,0.05)",
                  opacity: d.views > 0 ? 1 : 0.5,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-mono text-joe-text/25">{filled[0]?.date.slice(5)}</span>
            <span className="text-xs font-mono text-joe-text/25">{avg} avg/day</span>
            <span className="text-xs font-mono text-joe-text/25">{filled[filled.length - 1]?.date.slice(5)}</span>
          </div>
        </>
      )}
    </div>
  );
}

function AnalyticsTab({ adminKey, pageData, pageLoading, pageRefetching, pageRefetch }: {
  adminKey: string;
  pageData?: PageViewStat[];
  pageLoading: boolean;
  pageRefetching: boolean;
  pageRefetch: () => void;
}) {
  const [days, setDays] = useState<7 | 30 | 90>(30);

  const timelineQ = useQuery<PageViewTimeline[]>({
    queryKey: ["/api/analytics/timeline", adminKey, days],
    queryFn: () => adminFetch(`/api/analytics/timeline?days=${days}`, adminKey),
    enabled: true,
    retry: false,
    refetchInterval: 60_000,
  });

  const referrerQ = useQuery<{ source: string; views: number }[]>({
    queryKey: ["/api/analytics/referrers", adminKey],
    queryFn: () => adminFetch("/api/analytics/referrers", adminKey),
    enabled: true,
    retry: false,
    refetchInterval: 60_000,
  });

  const conversionsQ = useQuery<ConversionRow[]>({
    queryKey: ["/api/analytics/conversions", adminKey],
    queryFn: () => adminFetch("/api/analytics/conversions", adminKey),
    enabled: true,
    retry: false,
    refetchInterval: 60_000,
  });

  return (
    <div className="space-y-4">
      <TimelineChart
        data={timelineQ.data}
        days={days}
        onDaysChange={(d) => setDays(d as 7 | 30 | 90)}
        loading={timelineQ.isLoading}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <AnalyticsPanel
            data={pageData}
            loading={pageLoading}
            refetching={pageRefetching}
            refetch={pageRefetch}
          />
        </div>
        <ReferrerPanel
          data={referrerQ.data}
          loading={referrerQ.isLoading}
          refetching={referrerQ.isFetching && !referrerQ.isLoading}
          refetch={() => referrerQ.refetch()}
        />
      </div>
      <ConversionsPanel
        data={conversionsQ.data}
        loading={conversionsQ.isLoading}
        refetching={conversionsQ.isFetching && !conversionsQ.isLoading}
        refetch={() => conversionsQ.refetch()}
      />
    </div>
  );
}

async function downloadNewsletterCSV(adminKey: string, setExporting: (v: boolean) => void) {
  setExporting(true);
  try {
    const res = await fetch("/api/newsletter/export", {
      headers: { "x-api-key": adminKey },
      credentials: "include",
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const dateStamp = new Date().toISOString().slice(0, 10);
    const filename = `joe-newsletter-subscribers-${dateStamp}.csv`;
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement("a"), { href: url, download: filename }).click();
    URL.revokeObjectURL(url);
  } finally {
    setExporting(false);
  }
}

function NewsletterStatCard({
  label, value, icon: Icon, color, loading, sub,
}: {
  label: string; value: string | number; icon: React.ElementType;
  color: string; loading: boolean; sub?: string;
}) {
  return (
    <div className="rounded-xl border p-4 flex flex-col gap-1"
      style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}>
      <div className="flex items-center gap-2 mb-1">
        <Icon size={13} style={{ color }} />
        <span className="text-joe-text/40 text-xs font-mono">{label}</span>
      </div>
      {loading
        ? <div className="h-7 w-16 bg-white/5 rounded animate-pulse" />
        : <div className="text-2xl font-bold font-heading" style={{ color }}>{value}</div>}
      {sub && !loading && (
        <p className="text-joe-text/30 text-[11px] font-mono">{sub}</p>
      )}
    </div>
  );
}

function NewsletterTab({
  adminKey, data, loading, refetching, refetch,
}: {
  adminKey: string;
  data?: NewsletterSubscriber[];
  loading: boolean;
  refetching: boolean;
  refetch: () => void;
}) {
  const [search, setSearch] = useState("");
  const [exporting, setExporting] = useState(false);

  const now = Date.now();
  const week = 7 * 24 * 60 * 60 * 1000;
  const month = 30 * 24 * 60 * 60 * 1000;

  const total = data?.length ?? 0;
  const newThisWeek = data?.filter(s => now - new Date(s.createdAt).getTime() < week).length ?? 0;
  const newThisMonth = data?.filter(s => now - new Date(s.createdAt).getTime() < month).length ?? 0;
  const consentRate = total > 0
    ? Math.round((data!.filter(s => s.consentGiven === "yes").length / total) * 100)
    : 100;

  const filtered = (data ?? [])
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .filter(s =>
      !search.trim() || s.email.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <NewsletterStatCard
          label="Total Subscribers" value={total} icon={Users}
          color="#00ff88" loading={loading} sub="all time"
        />
        <NewsletterStatCard
          label="New This Week" value={newThisWeek} icon={CalendarDays}
          color="#48F2FB" loading={loading}
          sub={total > 0 ? `${Math.round((newThisWeek / total) * 100)}% of total` : undefined}
        />
        <NewsletterStatCard
          label="New This Month" value={newThisMonth} icon={TrendingUp}
          color="#E867EA" loading={loading}
          sub={total > 0 ? `${Math.round((newThisMonth / total) * 100)}% of total` : undefined}
        />
        <NewsletterStatCard
          label="Consent Rate" value={`${consentRate}%`} icon={ConsentIcon}
          color="#f59e0b" loading={loading} sub="GDPR compliant"
        />
      </div>

      {/* Table card */}
      <div className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b"
          style={{ borderColor: "var(--joe-card-border)" }}>
          <div className="flex items-center gap-2.5">
            <Mail size={16} className="text-[#00ff88]" />
            <span className="font-mono text-sm text-joe-text/80">Newsletter Subscribers</span>
            {total > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-joe-text/40 font-mono">{total}</span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
              <input
                type="email"
                inputMode="email"
                placeholder="Filter by email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-8 pl-7 pr-7 text-xs font-mono rounded-lg border bg-transparent text-joe-text/70 placeholder:text-white/20 outline-none focus:border-[#00ff88]/40 transition-colors"
                style={{ borderColor: "var(--joe-card-border)", minWidth: 160 }}
                data-testid="input-newsletter-search"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={11} />
                </button>
              )}
            </div>

            {/* Refresh */}
            <Button
              variant="ghost" size="sm" onClick={refetch} disabled={refetching}
              data-testid="button-refresh-newsletter"
              className="text-joe-text/40 hover:text-joe-text gap-1.5 text-xs font-mono h-8 px-3"
            >
              <RefreshCw size={12} className={refetching ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            {/* Export CSV */}
            <Button
              variant="ghost" size="sm"
              onClick={() => downloadNewsletterCSV(adminKey, setExporting)}
              disabled={exporting || loading || total === 0}
              data-testid="button-export-newsletter"
              className="text-[#00ff88]/70 hover:text-[#00ff88] border gap-1.5 text-xs font-mono h-8 px-3 transition-colors"
              style={{ borderColor: "rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.04)" }}
            >
              {exporting
                ? <Loader2 size={12} className="animate-spin" />
                : <Download size={12} />}
              <span>Export CSV</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <table className="w-full text-sm">
              <tbody>{Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} cols={4} />)}</tbody>
            </table>
          ) : !filtered.length ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              {search ? (
                <>
                  <Search className="text-white/15 mb-3" size={36} />
                  <p className="text-joe-text/35 text-sm font-mono">no results for "{search}"</p>
                  <button onClick={() => setSearch("")} className="text-[#00ff88]/60 text-xs font-mono mt-2 hover:text-[#00ff88]">
                    clear filter
                  </button>
                </>
              ) : (
                <EmptyState label="subscribers" />
              )}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <Th>#</Th>
                  <Th>Email</Th>
                  <Th>Subscribed</Th>
                  <Th>Source</Th>
                  <Th>Consent</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((n, i) => (
                  <tr
                    key={n.id}
                    className={`group border-b transition-colors hover:bg-white/[0.02] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}
                    style={{ borderColor: "var(--joe-card-border)" }}
                    data-testid={`row-subscriber-${i}`}
                  >
                    <Td>
                      <span className="font-mono text-xs text-joe-text/25">{i + 1}</span>
                    </Td>
                    <Td>
                      <span className="flex items-center whitespace-nowrap gap-1">
                        <span className="text-[#00ff88]/80 font-mono text-xs">{n.email}</span>
                        <CopyBtn text={n.email} />
                      </span>
                    </Td>
                    <Td>
                      <span className="font-mono text-xs text-joe-text/40 whitespace-nowrap">
                        {formatDate(n.createdAt)}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-joe-text/50 border font-mono"
                        style={{ borderColor: "var(--joe-card-border)" }}>
                        {n.source}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88]/80 border border-[#00ff88]/20 font-mono">
                        ✓ given
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t flex items-center justify-between"
            style={{ borderColor: "var(--joe-card-border)" }}>
            <span className="text-joe-text/25 text-xs font-mono">
              {search ? `${filtered.length} of ${total} shown` : `${total} subscriber${total !== 1 ? "s" : ""} total`}
            </span>
            <button
              onClick={() => downloadNewsletterCSV(adminKey, setExporting)}
              disabled={exporting || total === 0}
              className="text-[#00ff88]/40 hover:text-[#00ff88]/70 text-xs font-mono flex items-center gap-1 transition-colors disabled:opacity-30"
              data-testid="button-export-newsletter-footer"
            >
              {exporting ? <Loader2 size={11} className="animate-spin" /> : <Download size={11} />}
              Download {total} subscriber{total !== 1 ? "s" : ""} as CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LoginGate({ onLogin }: { onLogin: (key: string) => void }) {
  const [key, setKey] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/contacts", { headers: { "x-api-key": key.trim() }, credentials: "include" });
      if (res.status === 403) { setError(true); }
      else { onLogin(key.trim()); }
    } catch { setError(true); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--joe-bg-solid)" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#48F2FB]/10 border border-[#48F2FB]/20 mb-5">
            <ShieldCheck className="text-[#48F2FB]" size={26} />
          </div>
          <h1 className="text-2xl font-bold text-joe-text font-heading tracking-tight">Admin Dashboard</h1>
          <p className="text-joe-text/40 text-sm mt-1.5 font-mono">JOE Technologies — restricted access</p>
        </div>

        <div className="rounded-2xl border p-6" style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-joe-text/60 text-xs font-mono mb-2 block uppercase tracking-widest">
                Admin Secret
              </label>
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  value={key}
                  onChange={e => { setKey(e.target.value); setError(false); }}
                  placeholder="Enter your admin secret key"
                  autoFocus
                  autoComplete="current-password"
                  className={`pr-10 bg-black/30 border-white/10 text-joe-text placeholder:text-white/20 font-mono text-sm focus-visible:ring-[#48F2FB]/30 focus-visible:border-[#48F2FB]/40 ${error ? "border-red-500/50 focus-visible:border-red-500/50" : ""}`}
                  data-testid="input-admin-secret"
                />
                <button
                  type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-xs mt-2 flex items-center gap-1.5 font-mono">
                    <AlertCircle size={11} /> Invalid admin secret
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <Button
              type="submit" disabled={loading || !key.trim()}
              data-testid="button-admin-login"
              className="w-full font-mono text-sm h-10 bg-gradient-to-r from-[#48F2FB] to-[#E867EA] text-[#060A10] font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {loading ? "Verifying…" : "Enter Dashboard →"}
            </Button>
          </form>
        </div>

        <p className="text-center text-joe-text/20 text-xs font-mono mt-5">
          Session ends when tab is closed
        </p>
      </motion.div>
    </div>
  );
}

type Tab = "contacts" | "leads" | "newsletter" | "analytics";

export default function AdminPage() {
  useEffect(() => { document.title = "Admin — JOE Technologies"; }, []);

  const stored = typeof window !== "undefined" ? sessionStorage.getItem(SESSION_KEY) : null;
  const [adminKey, setAdminKey] = useState<string | null>(stored);
  const [tab, setTab] = useState<Tab>("contacts");

  const handleLogin = useCallback((key: string) => {
    sessionStorage.setItem(SESSION_KEY, key);
    setAdminKey(key);
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setAdminKey(null);
  }, []);

  const contactsQ = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contacts", adminKey],
    queryFn: () => adminFetch("/api/contacts", adminKey!),
    enabled: !!adminKey,
    retry: false,
  });

  const leadsQ = useQuery<LeadSubmission[]>({
    queryKey: ["/api/leads", adminKey],
    queryFn: () => adminFetch("/api/leads", adminKey!),
    enabled: !!adminKey,
    retry: false,
  });

  const newsletterQ = useQuery<NewsletterSubscriber[]>({
    queryKey: ["/api/newsletter", adminKey],
    queryFn: () => adminFetch("/api/newsletter", adminKey!),
    enabled: !!adminKey,
    retry: false,
    refetchInterval: 60_000,
  });

  const analyticsQ = useQuery<PageViewStat[]>({
    queryKey: ["/api/analytics", adminKey],
    queryFn: () => adminFetch("/api/analytics", adminKey!),
    enabled: !!adminKey,
    retry: false,
    refetchInterval: 60_000,
  });

  // Handle expired / invalid API key returned from any query.
  // Must be in a useEffect — calling setState during render is a React
  // anti-pattern that causes infinite re-render loops.
  useEffect(() => {
    if (contactsQ.error?.message === "403" && adminKey) {
      sessionStorage.removeItem(SESSION_KEY);
      setAdminKey(null);
    }
  }, [contactsQ.error, adminKey]);

  if (!adminKey) return <LoginGate onLogin={handleLogin} />;

  const tabs: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: "contacts",   label: "Contacts",   icon: MessageSquare, count: contactsQ.data?.length },
    { id: "leads",      label: "Leads",      icon: TrendingUp,    count: leadsQ.data?.length },
    { id: "newsletter", label: "Newsletter", icon: Mail,          count: newsletterQ.data?.length },
    { id: "analytics",  label: "Analytics",  icon: BarChart2,     count: analyticsQ.data?.reduce((s, d) => s + d.views, 0) },
  ];

  const statCards = [
    { label: "Total Contacts",   value: contactsQ.data?.length,   icon: MessageSquare, color: "#48F2FB", loading: contactsQ.isLoading },
    { label: "Total Leads",      value: leadsQ.data?.length,      icon: TrendingUp,    color: "#E867EA", loading: leadsQ.isLoading },
    { label: "Subscribers",      value: newsletterQ.data?.length, icon: Users,         color: "#00ff88", loading: newsletterQ.isLoading },
    { label: "Page Views",       value: analyticsQ.data?.reduce((s, d) => s + d.views, 0), icon: BarChart2, color: "#f59e0b", loading: analyticsQ.isLoading },
  ];

  const enterpriseLeads = leadsQ.data?.filter(l => l.tier === "Enterprise").length ?? 0;
  const highValueLeads  = leadsQ.data?.filter(l => l.tier === "High Value").length ?? 0;

  return (
    <div className="min-h-screen" style={{ background: "var(--joe-bg-solid)" }}>
      {/* Sticky header */}
      <div className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ borderColor: "var(--joe-card-border)", background: "var(--joe-nav-bg)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={16} className="text-[#48F2FB]" />
            <span className="font-mono text-sm text-joe-text/70">admin</span>
            <span className="text-joe-text/20 font-mono text-xs hidden sm:inline">// joetechnologies.io</span>
          </div>
          <Button
            variant="ghost" size="sm" onClick={handleLogout}
            data-testid="button-logout"
            className="text-joe-text/40 hover:text-joe-text gap-1.5 font-mono text-xs h-8"
          >
            <LogOut size={12} /> Sign out
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Heading */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-joe-text font-heading tracking-tight">
            Dashboard
          </h1>
          <p className="text-joe-text/40 text-sm font-mono mt-1">
            All submissions, lead data, and visitor analytics for JOE Technologies
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
          {statCards.map(s => (
            <div key={s.label} className="rounded-xl border p-4"
              style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}>
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={13} style={{ color: s.color }} />
                <span className="text-joe-text/40 text-xs font-mono">{s.label}</span>
              </div>
              {s.loading
                ? <div className="h-7 w-12 bg-white/5 rounded animate-pulse" />
                : <div className="text-2xl font-bold font-heading" style={{ color: s.color }}>{(s.value ?? 0).toLocaleString()}</div>}
            </div>
          ))}
          {/* Enterprise / High Value breakdown */}
          <div className="rounded-xl border p-4" style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={13} className="text-amber-400" />
              <span className="text-joe-text/40 text-xs font-mono">Enterprise / High</span>
            </div>
            {leadsQ.isLoading
              ? <div className="h-7 w-16 bg-white/5 rounded animate-pulse" />
              : <div className="text-2xl font-bold font-heading text-amber-400">
                  {enterpriseLeads}
                  <span className="text-amber-400/40 text-lg font-normal">/{enterpriseLeads + highValueLeads}</span>
                </div>}
          </div>
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 rounded-xl p-1 w-fit border"
          style={{ background: "var(--joe-card)", borderColor: "var(--joe-card-border)" }}>
          {tabs.map(t => (
            <button
              key={t.id} onClick={() => setTab(t.id)}
              data-testid={`tab-${t.id}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 ${
                tab === t.id
                  ? "text-[#060A10] font-semibold shadow-sm"
                  : "text-joe-text/45 hover:text-joe-text/70"
              }`}
              style={tab === t.id ? { background: "linear-gradient(135deg, #48F2FB 0%, #E867EA 100%)" } : {}}
            >
              <t.icon size={13} />
              {t.label}
              {t.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${tab === t.id ? "bg-black/20 text-[#060A10]" : "bg-white/8 text-joe-text/30"}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tables */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {tab === "contacts" && (
              <ContactsTable
                data={contactsQ.data} loading={contactsQ.isLoading}
                refetching={contactsQ.isFetching && !contactsQ.isLoading}
                refetch={() => contactsQ.refetch()}
              />
            )}
            {tab === "leads" && (
              <LeadsTable
                data={leadsQ.data} loading={leadsQ.isLoading}
                refetching={leadsQ.isFetching && !leadsQ.isLoading}
                refetch={() => leadsQ.refetch()}
              />
            )}
            {tab === "newsletter" && (
              <NewsletterTab
                adminKey={adminKey!}
                data={newsletterQ.data} loading={newsletterQ.isLoading}
                refetching={newsletterQ.isFetching && !newsletterQ.isLoading}
                refetch={() => newsletterQ.refetch()}
              />
            )}
            {tab === "analytics" && (
              <AnalyticsTab
                adminKey={adminKey!}
                pageData={analyticsQ.data}
                pageLoading={analyticsQ.isLoading}
                pageRefetching={analyticsQ.isFetching && !analyticsQ.isLoading}
                pageRefetch={() => analyticsQ.refetch()}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
