import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction } from "@/lib/paystack";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { status: false, message: "Transaction reference is required." },
        { status: 400 }
      );
    }

    const verification = await verifyTransaction(reference);

    return NextResponse.json({
      status: true,
      data: verification.data,
      isSuccessful: verification.data.status === "success",
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error.message || "Failed to verify Paystack payment." },
      { status: 500 }
    );
  }
}
