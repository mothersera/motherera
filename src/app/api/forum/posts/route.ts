import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import ForumPost from '@/models/ForumPost';
import UserModel from '@/models/User';

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

    // Fetch posts
    const posts = await ForumPost.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .select('-__v')
      .lean();

    // Enhance posts with author image from User model (single source of truth)
    const enhancedPosts = await Promise.all(posts.map(async (post: any) => {
      const author = await UserModel.findById(post.authorId).select('image').lean();
      return {
        ...post,
        authorImage: author?.image || null
      };
    }));

    return NextResponse.json(enhancedPosts);
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
