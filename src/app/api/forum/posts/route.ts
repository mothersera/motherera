import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import ForumPost from '@/models/ForumPost';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    
    const query: any = { isHidden: false };
    if (category && category !== 'All') {
      query.category = category;
    }

    const posts = await ForumPost.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .select('-authorId -__v'); // Hide internal IDs

    return NextResponse.json(posts);
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
    const { title, content, category } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const newPost = await ForumPost.create({
      authorId: session.user.id,
      authorName: session.user.name || 'Anonymous',
      title,
      content,
      category: category || 'General',
    });

    const { authorId, __v, ...safePost } = newPost.toObject();

    return NextResponse.json(safePost, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
