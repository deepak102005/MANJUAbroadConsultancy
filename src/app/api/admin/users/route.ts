import { NextResponse } from "next/server";
import { sql, initDB } from "@/lib/db";

export async function GET() {
  try {
    await initDB();
    const users = await sql`
      SELECT id, name, email, created_at FROM users ORDER BY created_at DESC
    `;
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users." }, { status: 500 });
  }
}
