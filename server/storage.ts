import {
  type User,
  type InsertUser,
  type ContactSubmission,
  type InsertContact,
  type LeadSubmission,
  type InsertLead,
  type InsertNewsletter,
  type NewsletterSubscriber,
  type PageViewStat,
  users,
  contactSubmissions,
  leadSubmissions,
  newsletterSubscribers,
  pageViews,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { eq, desc, sql } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<ContactSubmission>;
  getContacts(): Promise<ContactSubmission[]>;
  createLead(lead: InsertLead): Promise<LeadSubmission>;
  getLeads(): Promise<LeadSubmission[]>;
  createNewsletterSubscriber(data: InsertNewsletter): Promise<{ subscriber: NewsletterSubscriber; alreadyExists: boolean }>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  trackPageView(path: string, referrer?: string | null): Promise<void>;
  getPageViewStats(): Promise<PageViewStat[]>;
  getPageViewTimeline(days: number): Promise<{ date: string; views: number }[]>;
  getReferrerStats(): Promise<{ source: string; views: number }[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const [user] = await db.insert(users).values({ ...insertUser, id }).returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const [contact] = await db
      .insert(contactSubmissions)
      .values({
        ...insertContact,
        id,
        company: insertContact.company ?? null,
        service: insertContact.service ?? null,
        phone: insertContact.phone ?? null,
        createdAt: new Date().toISOString(),
      })
      .returning();
    return contact;
  }

  async getContacts(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createLead(insertLead: InsertLead): Promise<LeadSubmission> {
    const id = randomUUID();
    const [lead] = await db
      .insert(leadSubmissions)
      .values({
        ...insertLead,
        id,
        company: insertLead.company ?? null,
        phone: insertLead.phone ?? null,
        projectDescription: insertLead.projectDescription ?? null,
        industry: insertLead.industry ?? null,
        hasExistingSolution: insertLead.hasExistingSolution ?? null,
        adaptiveAnswers: insertLead.adaptiveAnswers ?? null,
        createdAt: new Date().toISOString(),
      })
      .returning();
    return lead;
  }

  async getLeads(): Promise<LeadSubmission[]> {
    return db.select().from(leadSubmissions).orderBy(desc(leadSubmissions.createdAt));
  }

  async createNewsletterSubscriber(data: InsertNewsletter): Promise<{ subscriber: NewsletterSubscriber; alreadyExists: boolean }> {
    const [existing] = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, data.email));

    if (existing) {
      return { subscriber: existing, alreadyExists: true };
    }

    const id = randomUUID();
    // Use ON CONFLICT DO NOTHING to handle the rare race condition where two
    // concurrent requests for the same email both pass the select check above.
    // If the row already existed, .returning() returns an empty array — we
    // re-fetch and return { alreadyExists: true } in that case.
    const [subscriber] = await db
      .insert(newsletterSubscribers)
      .values({
        ...data,
        id,
        source: data.source ?? "popup",
        createdAt: new Date().toISOString(),
      })
      .onConflictDoNothing()
      .returning();

    if (!subscriber) {
      const [raceWinner] = await db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.email, data.email));
      return { subscriber: raceWinner!, alreadyExists: true };
    }

    return { subscriber, alreadyExists: false };
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
  }

  async trackPageView(path: string, referrer?: string | null): Promise<void> {
    await db.insert(pageViews).values({
      id: randomUUID(),
      path,
      referrer: referrer ?? null,
      viewedAt: new Date().toISOString(),
    });
  }

  async getPageViewStats(): Promise<PageViewStat[]> {
    const rows = await db
      .select({
        path: pageViews.path,
        views: sql<number>`cast(count(*) as int)`,
      })
      .from(pageViews)
      .groupBy(pageViews.path)
      .orderBy(sql`count(*) desc`);
    return rows.map(r => ({ path: r.path, views: r.views }));
  }

  async getReferrerStats(): Promise<{ source: string; views: number }[]> {
    const rows = await db
      .select({
        referrer: pageViews.referrer,
        views: sql<number>`cast(count(*) as int)`,
      })
      .from(pageViews)
      .groupBy(pageViews.referrer)
      .orderBy(sql`count(*) desc`);

    // Aggregate by extracted domain so multiple referrer paths from the same
    // site collapse into one row.  We do this in TS rather than SQL to avoid
    // complex regex differences across Postgres versions.
    const domainMap = new Map<string, number>();
    for (const row of rows) {
      let source = "Direct";
      if (row.referrer) {
        try {
          const url = new URL(row.referrer);
          source = url.hostname.replace(/^www\./, "");
        } catch {
          source = row.referrer.length > 60
            ? row.referrer.slice(0, 60) + "…"
            : row.referrer;
        }
      }
      domainMap.set(source, (domainMap.get(source) ?? 0) + row.views);
    }

    return Array.from(domainMap.entries())
      .map(([source, views]) => ({ source, views }))
      .sort((a, b) => b.views - a.views);
  }

  async getPageViewTimeline(days: number): Promise<{ date: string; views: number }[]> {
    const since = new Date(Date.now() - days * 86_400_000).toISOString();
    const rows = await db
      .select({
        date: sql<string>`substr(viewed_at, 1, 10)`,
        views: sql<number>`cast(count(*) as int)`,
      })
      .from(pageViews)
      .where(sql`viewed_at >= ${since}`)
      .groupBy(sql`substr(viewed_at, 1, 10)`)
      .orderBy(sql`substr(viewed_at, 1, 10) asc`);
    return rows.map(r => ({ date: r.date, views: r.views }));
  }
}

export const storage = new DatabaseStorage();
