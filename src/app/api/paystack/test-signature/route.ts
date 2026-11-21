import { NextRequest, NextResponse } from "next/server";
import { computeWebhookSignature } from "@/lib/paystack";

export async function POST(req: NextRequest) {
  try {
    const { rawBody } = await req.json();
    if (!rawBody) {
      return NextResponse.json({ error: "rawBody is required" }, { status: 400 });
    }
    const signature = computeWebhookSignature(rawBody);
    return NextResponse.json({ signature });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
