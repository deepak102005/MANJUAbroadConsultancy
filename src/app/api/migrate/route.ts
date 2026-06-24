import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  const results: Record<string, string> = {};

  try {
    // 1. users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(255)        NOT NULL,
        email      VARCHAR(255) UNIQUE NOT NULL,
        password   VARCHAR(255)        NOT NULL,
        created_at TIMESTAMPTZ         DEFAULT NOW()
      )
    `;
    results.users = "✅ Created / Already exists";
  } catch (e: any) {
    results.users = `❌ ${e.message}`;
  }

  try {
    // 2. contacts table
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id         SERIAL PRIMARY KEY,
        name       VARCHAR(255) NOT NULL,
        phone      VARCHAR(50)  NOT NULL,
        email      VARCHAR(255) NOT NULL,
        subject    VARCHAR(255) NOT NULL,
        message    TEXT         NOT NULL,
        created_at TIMESTAMPTZ  DEFAULT NOW()
      )
    `;
    results.contacts = "✅ Created / Already exists";
  } catch (e: any) {
    results.contacts = `❌ ${e.message}`;
  }

  try {
    // 3. bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id             SERIAL PRIMARY KEY,
        name           VARCHAR(255)  NOT NULL,
        phone          VARCHAR(50)   NOT NULL,
        whatsapp       VARCHAR(50)   NOT NULL,
        email          VARCHAR(255)  NOT NULL,
        city           VARCHAR(255)  NOT NULL,
        user_id        VARCHAR(255)  NOT NULL,
        password       VARCHAR(255)  NOT NULL,
        sec_question1  TEXT,
        sec_ans1       TEXT,
        sec_question2  TEXT,
        sec_ans2       TEXT,
        sec_question3  TEXT,
        sec_ans3       TEXT,
        applicants     JSONB         NOT NULL,
        created_at     TIMESTAMPTZ   DEFAULT NOW()
      )
    `;
    results.bookings = "✅ Created / Already exists";
  } catch (e: any) {
    results.bookings = `❌ ${e.message}`;
  }

  const allOk = Object.values(results).every((v) => v.startsWith("✅"));

  return NextResponse.json(
    {
      status: allOk ? "✅ All tables ready" : "⚠️ Some tables failed",
      tables: results,
    },
    { status: allOk ? 200 : 500 }
  );
}
