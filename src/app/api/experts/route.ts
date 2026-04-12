import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import UserModel from '@/models/User';
import { canAccessPremium, isAdminEmail, normalizeEmail } from '@/lib/access';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const user = await UserModel.findById(session.user.id);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const email = normalizeEmail(user.email);
    const isAdmin = isAdminEmail(email);
    if (!isAdmin && !canAccessPremium(user)) {
      return NextResponse.json({ error: 'UPGRADE_REQUIRED', message: 'Upgrade to access this feature' }, { status: 403 });
    }

    const experts = await UserModel.find({ role: 'expert' })
      .select('name image specialization experience bio')
      .lean();

    return NextResponse.json(experts);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
