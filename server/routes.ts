import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertLeadSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";
import rateLimit from "express-rate-limit";

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many submissions. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many submissions. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      if (req.body.website) {
        return res.json({ success: true, id: "ok" });
      }

      const data = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(data);
      res.json({ success: true, id: contact.id });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      console.error("Contact form error:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    const secret = process.env.ADMIN_SECRET;
    const provided = req.headers["x-api-key"];
    if (!secret || provided !== secret) {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/leads", leadLimiter, async (req, res) => {
    try {
      const data = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(data);
      res.json({ success: true, id: lead.id, tier: lead.tier, score: lead.score });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      console.error("Lead form error:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/api/leads", async (req, res) => {
    const secret = process.env.ADMIN_SECRET;
    const provided = req.headers["x-api-key"];
    if (!secret || provided !== secret) {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/newsletter", newsletterLimiter, async (req, res) => {
    try {
      const data = insertNewsletterSchema.parse(req.body);
      const { subscriber, alreadyExists } = await storage.createNewsletterSubscriber(data);
      res.json({ success: true, id: subscriber.id, alreadyExists });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      console.error("Newsletter error:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/api/newsletter", async (req, res) => {
    const secret = process.env.ADMIN_SECRET;
    const provided = req.headers["x-api-key"];
    if (!secret || provided !== secret) {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      res.json(subscribers);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/robots.txt", (_req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.send(
`User-agent: *
Allow: /
Disallow: /qualify
Disallow: /admin
Disallow: /privacy
Disallow: /terms
Disallow: /cookies
Disallow: /api/

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

Sitemap: https://joetechnologies.io/sitemap.xml
`
    );
  });

  app.get("/sitemap.xml", (_req, res) => {
    const BASE = "https://joetechnologies.io";
    const now = new Date().toISOString().split("T")[0];

    const pages = [
      { path: "/", priority: "1.0", freq: "weekly" },
      { path: "/about", priority: "0.8", freq: "monthly" },
      { path: "/services", priority: "0.9", freq: "monthly" },
      { path: "/services/app-development", priority: "0.9", freq: "monthly" },
      { path: "/services/website-design", priority: "0.9", freq: "monthly" },
      { path: "/services/uiux-design", priority: "0.8", freq: "monthly" },
      { path: "/services/automation", priority: "0.8", freq: "monthly" },
      { path: "/services/ai-strategy", priority: "0.9", freq: "monthly" },
      { path: "/services/custom-ai", priority: "0.9", freq: "monthly" },
      { path: "/services/mlops", priority: "0.8", freq: "monthly" },
      { path: "/services/ai-integration", priority: "0.8", freq: "monthly" },
      { path: "/services/full-stack", priority: "0.8", freq: "monthly" },
      { path: "/services/advisory", priority: "0.7", freq: "monthly" },
      { path: "/portfolio", priority: "0.8", freq: "monthly" },
      { path: "/why-us", priority: "0.7", freq: "monthly" },
      { path: "/process", priority: "0.7", freq: "monthly" },
      { path: "/tech-stack", priority: "0.6", freq: "monthly" },
      { path: "/faq", priority: "0.7", freq: "monthly" },
      { path: "/contact", priority: "0.8", freq: "monthly" },
    ];

    const urls = pages
      .map(
        ({ path, priority, freq }) =>
          `  <url>\n    <loc>${BASE}${path}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
      )
      .join("\n");

    res.setHeader("Content-Type", "application/xml");
    res.send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
    );
  });

  return httpServer;
}
