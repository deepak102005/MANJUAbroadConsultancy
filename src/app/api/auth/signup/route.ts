import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql, initDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await initDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await sql`
      SELECT id FROM users WHERE LOWER(email) = LOWER(${email})
    `;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Hash password and insert
    const hashed = await bcrypt.hash(password, 10);
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashed})
    `;

    return NextResponse.json(
      { message: "Account created successfully." },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[SIGNUP ERROR]", err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
