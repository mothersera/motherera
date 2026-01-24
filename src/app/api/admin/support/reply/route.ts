import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import SupportMessage from '@/models/SupportMessage';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || (session.user.role !== 'admin' && session.user.role !== 'expert')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { messageId, replyText } = await req.json();

    if (!messageId || !replyText) {
      return NextResponse.json({ error: 'Message ID and reply text are required' }, { status: 400 });
    }

    const updatedMessage = await SupportMessage.findByIdAndUpdate(
      messageId,
      {
        status: 'replied',
        adminReply: {
          text: replyText,
          repliedAt: new Date(),
          repliedBy: session.user.name || 'Admin',
        },
      },
      { new: true }
    );

    if (!updatedMessage) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: updatedMessage });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
