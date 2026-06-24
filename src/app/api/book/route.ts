import { NextResponse } from "next/server";
import { sql, initBookingsDB } from "@/lib/db";

export async function POST(request: Request) {
  try {
    await initBookingsDB();

    const body = await request.json();
    const {
      name,
      phone,
      whatsapp,
      email,
      city,
      userId,
      password,
      secQuestion1,
      secAns1,
      secQuestion2,
      secAns2,
      secQuestion3,
      secAns3,
      applicants,
    } = body;

    // Backend validation for required fields
    if (
      !name ||
      !phone ||
      !whatsapp ||
      !email ||
      !city ||
      !userId ||
      !password ||
      !applicants ||
      !Array.isArray(applicants) ||
      applicants.length === 0
    ) {
      return NextResponse.json(
        { error: "Required fields are missing. Please complete all fields." },
        { status: 400 }
      );
    }

    // Validate each applicant's details
    for (let i = 0; i < applicants.length; i++) {
      const app = applicants[i];
      if (
        !app.visaCategory ||
        !app.ds160Confirmation ||
        !app.requiredDates ||
        !app.location
      ) {
        return NextResponse.json(
          { error: `Required details for Applicant #${i + 1} are missing.` },
          { status: 400 }
        );
      }
    }

    // Save to Neon DB
    await sql`
      INSERT INTO bookings (
        name, phone, whatsapp, email, city,
        user_id, password,
        sec_question1, sec_ans1,
        sec_question2, sec_ans2,
        sec_question3, sec_ans3,
        applicants
      ) VALUES (
        ${name}, ${phone}, ${whatsapp}, ${email}, ${city},
        ${userId}, ${password},
        ${secQuestion1 || null}, ${secAns1 || null},
        ${secQuestion2 || null}, ${secAns2 || null},
        ${secQuestion3 || null}, ${secAns3 || null},
        ${JSON.stringify(applicants)}
      )
    `;

    console.log(`[BOOKING] Saved to DB: ${name} <${email}>`);

    return NextResponse.json(
      {
        success: true,
        message: "Your USA visa slot booking request has been received.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Backend Error in slot booking API:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await initBookingsDB();
    const bookings = await sql`
      SELECT * FROM bookings ORDER BY created_at DESC
    `;
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings." },
      { status: 500 }
    );
  }
}
