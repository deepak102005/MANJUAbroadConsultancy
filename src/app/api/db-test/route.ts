import { NextResponse } from "next/server";
import { sql, initDB, initContactsDB, initBookingsDB } from "@/lib/db";

export async function GET() {
  try {
    // Ensure all tables exist
    await initDB();
    await initContactsDB();
    await initBookingsDB();

    // Ping the server
    const time = await sql`SELECT NOW() AS current_time`;

    // Count rows in each table
    const [users, contacts, bookings] = await Promise.all([
      sql`SELECT COUNT(*) AS total FROM users`,
      sql`SELECT COUNT(*) AS total FROM contacts`,
      sql`SELECT COUNT(*) AS total FROM bookings`,
    ]);

    return NextResponse.json({
      status: "✅ Connected",
      database: "Neon PostgreSQL",
      server_time: time[0].current_time,
      tables: {
        users: Number(users[0].total),
        contacts: Number(contacts[0].total),
        bookings: Number(bookings[0].total),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: "❌ Connection Failed", error: err.message },
      { status: 500 }
    );
  }
}
