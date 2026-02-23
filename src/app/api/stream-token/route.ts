import { StreamClient } from "@stream-io/node-sdk";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secret = process.env.STREAM_SECRET_KEY;

if (!apiKey || !secret) {
  throw new Error("Missing Stream API Key or Secret");
}

const client = new StreamClient(apiKey, secret);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, name, image } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Create or update user in Stream
    await client.upsertUsers([
      {
        id: userId,
        role: "user",
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
