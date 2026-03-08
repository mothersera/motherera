import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { Firestore } from 'firebase-admin/firestore';

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Use the NextAuth ID as the Firebase UID to keep them consistent
  const userId = session.user.id || session.user.email;
  
  try {
    const adminAuth = getAdminAuth();
    const adminDb = getAdminDb();

    // Create custom token for the user
    // We can embed claims like 'plan' to use in Security Rules
    const additionalClaims = {
      plan: session.user.subscriptionPlan || 'basic',
      role: session.user.role || 'mother'
    };

    const token = await adminAuth.createCustomToken(userId, additionalClaims);
    
    // Sync user data to Firestore
    // This ensures the user document exists for profile display in chats
    await adminDb.collection('users').doc(userId).set({
        name: session.user.name || 'Anonymous',
        email: session.user.email,
        avatar: session.user.image || '',
        membershipPlan: session.user.subscriptionPlan || 'basic',
        role: session.user.role || 'mother',
        updatedAt: new Date()
    }, { merge: true });

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error creating custom token:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
