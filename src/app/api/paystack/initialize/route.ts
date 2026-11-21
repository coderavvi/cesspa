import { NextRequest, NextResponse } from "next/server";
import { initializeTransaction } from "@/lib/paystack";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, amount, purpose, customerName, metadata, callbackUrl } = body;

    if (!email || !amount || amount <= 0) {
      return NextResponse.json(
        { status: false, message: "Valid email and positive amount are required." },
        { status: 400 }
      );
    }

    const init = await initializeTransaction({
      email,
      amount: Number(amount),
      callbackUrl,
      metadata: {
        ...metadata,
        purpose: purpose || "General Payment",
        customerName: customerName || "CESSPA Member",
      },
    });

    return NextResponse.json({
      status: true,
      message: "Payment initialized successfully",
      data: init.data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error.message || "Failed to initialize Paystack payment." },
      { status: 500 }
    );
  }
}
