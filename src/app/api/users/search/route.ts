import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    await connectDB();

    // Search by name (case-insensitive)
    const users = await User.find({
      name: { $regex: query, $options: 'i' },
      _id: { $ne: session.user.id } // Don't return the current user
    })
    .limit(10)
    .select('_id name image email'); // Only return necessary fields

    const formattedUsers = users.map(u => ({
      id: u._id.toString(),
      name: u.name,
      avatar: u.image || null,
      email: u.email
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
