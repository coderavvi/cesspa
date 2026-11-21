import { NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/auth/credentials";
import { signSession, COOKIE_NAME } from "@/lib/auth/token";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const verification = await verifyAdminCredentials(email, password);
    if (!verification.success || !verification.user) {
      return NextResponse.json(
        { error: "Invalid email or password. Please verify your credentials." },
        { status: 401 }
      );
    }

    const token = await signSession({
      id: "admin-sec-01",
      email: verification.user.email,
      name: verification.user.name,
      role: verification.user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: verification.user,
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (err: any) {
    console.error("Login route error:", err);
    return NextResponse.json(
      { error: "Internal authentication error. Please try again." },
      { status: 500 }
    );
  }
}
