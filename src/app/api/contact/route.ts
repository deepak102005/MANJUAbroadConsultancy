import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    // Simple validation
    if (!name || !phone || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required. Please check your inputs." },
        { status: 400 }
      );
    }

    // Node.js Backend mock persistence (database logs or email dispatcher)
    console.log("==================================================");
    console.log("NEW CONTACT INQUIRY RECEIVED:");
    console.log(`Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log("==================================================");

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
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
