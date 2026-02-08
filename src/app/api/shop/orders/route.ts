
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { productId, title, price, quantity, shopifyOrderId } = await req.json();

    const newOrder = await Order.create({
      userId: session.user.id,
      shopifyOrderId: shopifyOrderId || `ORDER-${Date.now()}`,
      products: [{
        productId,
        title,
        quantity,
        price
      }],
      totalAmount: (parseFloat(price) * quantity).toString(),
      currency: 'INR',
      status: 'completed'
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const orders = await Order.find({ userId: session.user.id }).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
