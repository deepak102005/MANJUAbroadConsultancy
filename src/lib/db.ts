import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

export const sql = neon(process.env.DATABASE_URL);

/** Call once to create the users table if it doesn't exist */
export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(255)        NOT NULL,
      email      VARCHAR(255) UNIQUE NOT NULL,
      password   VARCHAR(255)        NOT NULL,
      created_at TIMESTAMPTZ         DEFAULT NOW()
    )
  `;
}

/** Call once to create the contacts table if it doesn't exist */
export async function initContactsDB() {
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
}
export async function initBookingsDB() {
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
}
