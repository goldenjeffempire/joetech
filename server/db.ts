import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@shared/schema";

// Export the pool so server/index.ts can close it during graceful shutdown.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Limit connections — free Render/Supabase DBs have a low max_connections cap.
  max: 10,
  // Return idle connections to the pool after 30 s so we never hold DB slots
  // open for minutes during low-traffic periods.
  idleTimeoutMillis: 30_000,
  // Fail fast if the DB is unreachable during a health check or request rather
  // than hanging for the OS TCP timeout (~2 min).
  connectionTimeoutMillis: 5_000,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err.message);
});

export const db = drizzle(pool, { schema });

export async function runMigrations(): Promise<void> {
  // pool.connect() is inside the try so any connection failure is caught and
  // logged — it will never propagate and crash the startup IIFE.
  let client;
  try {
    client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id varchar(255) PRIMARY KEY,
        username text NOT NULL UNIQUE,
        password text NOT NULL
      );

      CREATE TABLE IF NOT EXISTS contact_submissions (
        id varchar(255) PRIMARY KEY,
        name text NOT NULL,
        email text NOT NULL,
        company text,
        service text,
        phone text,
        message text NOT NULL,
        created_at text NOT NULL
      );

      CREATE TABLE IF NOT EXISTS lead_submissions (
        id varchar(255) PRIMARY KEY,
        name text NOT NULL,
        email text NOT NULL,
        company text,
        phone text,
        service_type text NOT NULL,
        project_description text,
        budget text NOT NULL,
        timeline text NOT NULL,
        company_size text NOT NULL,
        industry text,
        has_existing_solution text,
        adaptive_answers text,
        score integer NOT NULL,
        tier text NOT NULL,
        created_at text NOT NULL
      );

      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id varchar(255) PRIMARY KEY,
        email text NOT NULL UNIQUE,
        consent_given text NOT NULL,
        source text NOT NULL DEFAULT 'popup',
        created_at text NOT NULL
      );
    `);
    console.log("[db] Schema verified — all tables present");
  } catch (err) {
    console.error("[db] Migration error:", (err as Error).message);
  } finally {
    client?.release();
  }
}
