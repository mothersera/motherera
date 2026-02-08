
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Package, ShoppingBag, ArrowRight, Clock, CheckCircle } from "lucide-react";
import { IOrder } from "@/models/Order";

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/shop/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/50 pb-20">
      <div className="bg-white border-b border-stone-100 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">My Orders</h1>
          <p className="text-stone-500">Track and manage your purchases.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">No orders yet</h3>
            <p className="text-stone-500 mb-8 max-w-md mx-auto">
              You haven't purchased anything from the shop yet. Explore our curated collection for moms and babies.
            </p>
            <Link href="/dashboard/shop">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={String(order._id)} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-white border-b border-stone-100 py-4 flex flex-row items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
                      Order #{order.shopifyOrderId}
                    </div>
                    <div className="text-sm font-medium text-stone-600 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 ${
                    order.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {order.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {order.status}
                  </div>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  {order.products.map((product, i) => (
                    <div key={i} className="flex items-center justify-between mb-4 last:mb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-stone-50 rounded-lg flex items-center justify-center text-stone-300">
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900">{product.title}</h4>
                          <p className="text-sm text-stone-500">Qty: {product.quantity}</p>
                        </div>
                      </div>
                      <div className="font-bold text-stone-900">
                        ₹{product.price}
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 pt-4 border-t border-stone-50 flex justify-between items-center">
                    <span className="text-stone-500 font-medium">Total Amount</span>
                    <span className="text-xl font-bold text-rose-600">₹{order.totalAmount}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
