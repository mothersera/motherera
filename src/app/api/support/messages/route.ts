import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import SupportMessage from '@/models/SupportMessage';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    // Only fetch messages for the logged-in user
    const messages = await SupportMessage.find({ userId: session.user.id })
      .sort({ createdAt: 1 }) // Chronological order
      .select('-userId -__v'); // Do not expose internal IDs

    return NextResponse.json(messages);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { message } = await req.json();

    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    const newMessage = await SupportMessage.create({
      userId: session.user.id,
      userName: session.user.name,
      userEmail: session.user.email,
      message,
      status: 'open',
    });

    // Return the created message without sensitive fields if any (though here we control the object)
    const { userId, __v, ...safeMessage } = newMessage.toObject();

    return NextResponse.json(safeMessage, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
