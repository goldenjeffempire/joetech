import {
  type User,
  type InsertUser,
  type ContactSubmission,
  type InsertContact,
  type LeadSubmission,
  type InsertLead,
  users,
  contactSubmissions,
  leadSubmissions,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { eq, desc } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<ContactSubmission>;
  getContacts(): Promise<ContactSubmission[]>;
  createLead(lead: InsertLead): Promise<LeadSubmission>;
  getLeads(): Promise<LeadSubmission[]>;
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
}

export const storage = new DatabaseStorage();
