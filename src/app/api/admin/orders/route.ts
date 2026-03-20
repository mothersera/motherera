import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    // 1. Authenticate Admin
    const session: any = await getServerSession(authOptions);
    
    if (!session || session.user?.email !== 'support@motherera.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Setup Shopify Admin API Credentials
    const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN; // Note: Needs to be added to .env

    if (!shopifyDomain || !adminToken) {
      console.error("Missing Shopify Admin API credentials");
      return NextResponse.json({ error: 'Shopify configuration missing' }, { status: 500 });
    }

    // 3. Fetch Orders using Admin API (REST)
    // We use a relatively recent API version (e.g., 2024-01 or 2023-10)
    // status=any fetches all orders (open, closed, cancelled)
    const response = await fetch(`https://${shopifyDomain}/admin/api/2024-01/orders.json?status=any&limit=50`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Shopify Admin API Error:", errorText);
      return NextResponse.json({ error: 'Failed to fetch orders from Shopify' }, { status: response.status });
    }

    const data = await response.json();

    // 4. Transform data for the frontend
    const orders = data.orders.map((order: any) => ({
      id: order.id,
      orderNumber: order.order_number,
      customer: {
        firstName: order.customer?.first_name || '',
        lastName: order.customer?.last_name || '',
        email: order.email || order.contact_email || 'N/A',
      },
      totalPrice: order.total_price,
      currency: order.currency,
      financialStatus: order.financial_status, // pending, authorized, partially_paid, paid, partially_refunded, refunded, voided
      fulfillmentStatus: order.fulfillment_status || 'unfulfilled', // fulfilled, null, partial, restocked
      createdAt: order.created_at,
      lineItems: order.line_items.map((item: any) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price
      }))
    }));

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error("Error fetching admin orders:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}