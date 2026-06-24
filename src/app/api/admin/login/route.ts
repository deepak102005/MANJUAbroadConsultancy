import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
      sameSite: "strict",
    });
    return res;
  }

  return NextResponse.json(
    { error: "Invalid admin credentials." },
    { status: 401 }
  );
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
  return res;
}
