import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql, initDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please enter your email and password." },
        { status: 400 }
      );
    }

    // ── Admin shortcut: check against env credentials ──
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (
      email.toLowerCase() === adminEmail?.toLowerCase() &&
      password === adminPassword
    ) {
      const res = NextResponse.json(
        {
          user: { id: 0, name: "Admin", email },
          isAdmin: true,
        },
        { status: 200 }
      );
      // Set the admin session cookie so /admin routes are accessible
      res.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        maxAge: 60 * 60 * 8, // 8 hours
        path: "/",
        sameSite: "strict",
      });
      return res;
    }

    // ── Regular user login ──
    await initDB();

    const rows = await sql`
      SELECT id, name, email, password FROM users
      WHERE LOWER(email) = LOWER(${email})
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password. Please try again." },
        { status: 401 }
      );
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password. Please try again." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { user: { id: user.id, name: user.name, email: user.email }, isAdmin: false },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[SIGNIN ERROR]", err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
