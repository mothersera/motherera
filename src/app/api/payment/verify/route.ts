import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Subscription from "@/models/Subscription";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await dbConnect();

    // 1. Update Payment Status
    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
    if (!payment) {
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = "paid";
    await payment.save();

    // 2. Update/Create Subscription
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const currentDate = new Date();
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // Check if subscription exists
    let subscription = await Subscription.findOne({ userId: user._id });

    if (subscription) {
      subscription.plan = payment.plan;
      subscription.status = 'active';
      subscription.razorpayPaymentId = razorpay_payment_id;
      subscription.currentPeriodStart = currentDate;
      subscription.currentPeriodEnd = nextMonth;
      await subscription.save();
    } else {
      await Subscription.create({
        userId: user._id,
        plan: payment.plan,
        status: 'active',
        razorpayPaymentId: razorpay_payment_id,
        currentPeriodStart: currentDate,
        currentPeriodEnd: nextMonth,
      });
    }

    // 3. Update User Profile
    user.subscriptionPlan = payment.plan;
    user.subscriptionStatus = 'active';
    await user.save();

    return NextResponse.json({ success: true, message: "Payment verified and subscription updated" });

  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
