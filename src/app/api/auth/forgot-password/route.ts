import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql, initDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await initDB();

    const { email, newPassword } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Check email exists
    const rows = await sql`
      SELECT id FROM users WHERE LOWER(email) = LOWER(${email})
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "No account found with this email address." },
        { status: 404 }
      );
    }

    // If newPassword provided, update it
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters." },
          { status: 400 }
        );
      }
      const hashed = await bcrypt.hash(newPassword, 10);
      await sql`
        UPDATE users SET password = ${hashed}
        WHERE LOWER(email) = LOWER(${email})
      `;
      return NextResponse.json(
        { message: "Password reset successfully." },
        { status: 200 }
      );
    }

    // Just verifying email exists
    return NextResponse.json({ message: "Email verified." }, { status: 200 });
  } catch (err: any) {
    console.error("[FORGOT-PASSWORD ERROR]", err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
