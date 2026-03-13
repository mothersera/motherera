import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await dbConnect();
    const userId = (await params).userId;
    
    // Validate if userId is a valid ObjectId (optional but good practice)
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    // }

    const user = await User.findById(userId).select("-password -__v");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
