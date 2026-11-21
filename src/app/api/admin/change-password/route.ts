import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifySession, signSession } from "@/lib/auth/token";
import { changeAdminPassword } from "@/lib/auth/credentials";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to update your password." },
        { status: 401 }
      );
    }

    const session = await verifySession(token);
    if (!session) {
      return NextResponse.json(
        { error: "Session expired or invalid. Please sign in again." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required." },
        { status: 400 }
      );
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and password confirmation do not match." },
        { status: 400 }
      );
    }

    const result = await changeAdminPassword(currentPassword, newPassword);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Password update failed." },
        { status: 400 }
      );
    }

    // Refresh session token
    const newToken = await signSession({
      id: session.id,
      email: session.email,
      name: session.name,
      role: session.role,
    });

    const response = NextResponse.json({
      success: true,
      message: "Password updated successfully. Use your new password for subsequent logins.",
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400,
    });

    return response;
  } catch (err: any) {
    console.error("Change password error:", err);
    return NextResponse.json(
      { error: "Failed to update password. Please try again." },
      { status: 500 }
    );
  }
}
