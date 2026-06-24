import { NextResponse } from "next/server";
import { sql, initContactsDB } from "@/lib/db";

export async function POST(request: Request) {
  try {
    await initContactsDB();

    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    // Validation
    if (!name || !phone || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required. Please check your inputs." },
        { status: 400 }
      );
    }

    // Save to Neon DB
    await sql`
      INSERT INTO contacts (name, phone, email, subject, message)
      VALUES (${name}, ${phone}, ${email}, ${subject}, ${message})
    `;

    console.log(`[CONTACT] Saved: ${name} <${email}> — ${subject}`);

    return NextResponse.json(
      { success: true, message: "Message sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Backend Error in contact API:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await initContactsDB();
    const contacts = await sql`
      SELECT * FROM contacts ORDER BY created_at DESC
    `;
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}
