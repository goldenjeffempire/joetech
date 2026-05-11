import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  service: text("service"),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const leadSubmissions = pgTable("lead_submissions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  serviceType: text("service_type").notNull(),
  projectDescription: text("project_description"),
  budget: text("budget").notNull(),
  timeline: text("timeline").notNull(),
  companySize: text("company_size").notNull(),
  industry: text("industry"),
  hasExistingSolution: text("has_existing_solution"),
  adaptiveAnswers: text("adaptive_answers"),
  score: integer("score").notNull(),
  tier: text("tier").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

export const insertLeadSchema = createInsertSchema(leadSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service"),
  projectDescription: z.string().optional(),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  companySize: z.string().min(1, "Please select your company size"),
  industry: z.string().optional(),
  hasExistingSolution: z.string().optional(),
  adaptiveAnswers: z.string().optional(),
  score: z.number().int().min(0),
  tier: z.enum(["Startup", "High Value", "Enterprise"]),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id", { length: 255 }).primaryKey(),
  email: text("email").notNull().unique(),
  consentGiven: text("consent_given").notNull(),
  source: text("source").notNull().default("popup"),
  createdAt: text("created_at").notNull(),
});

export const insertNewsletterSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  consentGiven: z.literal("yes", { errorMap: () => ({ message: "You must agree to receive emails" }) }),
  source: z.string().optional(),
});

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

export const pageViews = pgTable("page_views", {
  id: varchar("id", { length: 255 }).primaryKey(),
  path: text("path").notNull(),
  referrer: text("referrer"),
  viewedAt: text("viewed_at").notNull(),
});

export type PageViewStat = { path: string; views: number };
export type PageViewTimeline = { date: string; views: number };

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type LeadSubmission = typeof leadSubmissions.$inferSelect;
