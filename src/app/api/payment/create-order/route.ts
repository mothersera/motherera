import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Assuming this is where authOptions are
import dbConnect from "@/lib/db";
import Payment from "@/models/Payment";
import User from "@/models/User";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    console.log("Create Order API called");
    console.log("Key ID present:", !!process.env.RAZORPAY_KEY_ID);
    console.log("Key Secret present:", !!process.env.RAZORPAY_KEY_SECRET);

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan, amount } = await req.json();

    if (!plan || !amount) {
      return NextResponse.json({ error: "Plan and amount are required" }, { status: 400 });
    }

    await dbConnect();

    // Verify user exists
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Create Payment Record
    await Payment.create({
      userId: user._id,
      razorpayOrderId: order.id,
      amount: amount,
      currency: "INR",
      status: "created",
      plan: plan,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: options.amount,
      currency: options.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      user: {
        name: user.name,
        email: user.email,
        contact: "", // Add if you have phone number in user model
      },
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    // Return the actual error message for debugging (in production, you might want to hide this)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
