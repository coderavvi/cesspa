import { NextResponse } from "next/server";
import { resetDemoCredentials, DEFAULT_PASSWORD_DISPLAY } from "@/lib/auth/credentials";

export async function POST() {
  resetDemoCredentials();
  return NextResponse.json({
    success: true,
    message: `Demo password reset to default: ${DEFAULT_PASSWORD_DISPLAY}`,
    defaultPassword: DEFAULT_PASSWORD_DISPLAY,
  });
}
