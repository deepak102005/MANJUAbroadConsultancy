import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
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
      visaCategory,
      numApplicants,
      ds160Confirmation,
      requiredDates,
      location,
      message,
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
      !visaCategory ||
      !numApplicants ||
      !ds160Confirmation ||
      !requiredDates ||
      !location
    ) {
      return NextResponse.json(
        { error: "Required fields are missing. Please complete all fields." },
        { status: 400 }
      );
    }

    // Node.js Backend mock persistence (database logs / security check logs)
    console.log("==================================================");
    console.log("NEW VISA SLOT BOOKING REQUEST RECEIVED:");
    console.log(`Client Name: ${name}`);
    console.log(`Phone: ${phone} (WhatsApp: ${whatsapp})`);
    console.log(`Email: ${email} | City: ${city}`);
    console.log("--------------------------------------------------");
    console.log("USA VISA PORTAL LOGIN DETAILS:");
    console.log(`User ID: ${userId}`);
    console.log(`Password: ${password}`);
    console.log(`Q1: ${secQuestion1 || "N/A"} -> Ans: ${secAns1 || "N/A"}`);
    console.log(`Q2: ${secQuestion2 || "N/A"} -> Ans: ${secAns2 || "N/A"}`);
    console.log(`Q3: ${secQuestion3 || "N/A"} -> Ans: ${secAns3 || "N/A"}`);
    console.log("--------------------------------------------------");
    console.log("APPOINTMENT BOOKING DETAILS:");
    console.log(`Type of Visa: ${visaCategory}`);
    console.log(`No. of Applicants: ${numApplicants}`);
    console.log(`DS-160 Confirmation No: ${ds160Confirmation}`);
    console.log(`Required Dates: ${requiredDates}`);
    console.log(`Target Location: ${location}`);
    console.log(`Client Message: ${message || "N/A"}`);
    console.log("==================================================");

    // Return success
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
