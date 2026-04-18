import {
  type User,
  type InsertUser,
  type ContactSubmission,
  type InsertContact,
  type LeadSubmission,
  type InsertLead,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<ContactSubmission>;
  getContacts(): Promise<ContactSubmission[]>;
  createLead(lead: InsertLead): Promise<LeadSubmission>;
  getLeads(): Promise<LeadSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, ContactSubmission>;
  private leads: Map<string, LeadSubmission>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.leads = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const contact: ContactSubmission = {
      ...insertContact,
      id,
      company: insertContact.company ?? null,
      service: insertContact.service ?? null,
      phone: insertContact.phone ?? null,
      createdAt: new Date().toISOString(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<ContactSubmission[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createLead(insertLead: InsertLead): Promise<LeadSubmission> {
    const id = randomUUID();
    const lead: LeadSubmission = {
      ...insertLead,
      id,
      company: insertLead.company ?? null,
      phone: insertLead.phone ?? null,
      projectDescription: insertLead.projectDescription ?? null,
      industry: insertLead.industry ?? null,
      hasExistingSolution: insertLead.hasExistingSolution ?? null,
      adaptiveAnswers: insertLead.adaptiveAnswers ?? null,
      createdAt: new Date().toISOString(),
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<LeadSubmission[]> {
    return Array.from(this.leads.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();
