import { StreamClient } from "@stream-io/node-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const secret = process.env.STREAM_SECRET_KEY;

  if (!apiKey || !secret) {
    console.error("Missing Stream API Key or Secret");
    return NextResponse.json(
      { error: "Server configuration error: Missing Stream API keys" },
      { status: 500 }
    );
  }

  const client = new StreamClient(apiKey, secret);

  try {
    const body = await req.json();
    const { userId, name, image } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Determine role based on user ID or other logic
    // In production, you should verify this against your database/auth session
    // Here we use the specific email logic requested previously
    const isAdmin = userId.includes("support_motherera_com") || (name === "MotherEra Support"); 
    // Note: Since we are passing userId from client, this is not fully secure. 
    // Ideally, we should get the user session here on the server side using auth() or getSession()
    
    // Create or update user in Stream with correct role
    await client.upsertUsers([
      {
        id: userId,
        role: isAdmin ? "admin" : "user", // Stream has built-in roles: admin, user, anonymous
        name: name || userId,
        image: image,
      },
    ]);

    // Generate token (valid for 1 hour by default, can be customized)
    const token = client.createToken(userId);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
