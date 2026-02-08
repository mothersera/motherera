
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchProductByHandle } from "@/lib/shopify";

function ShopSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState("");

  const handle = searchParams.get('product');
  const quantity = parseInt(searchParams.get('qty') || '1');

  useEffect(() => {
    if (!handle) {
      setError("Invalid order details");
      setIsProcessing(false);
      return;
    }

    processOrder();
  }, [handle]);

  const processOrder = async () => {
    try {
      // 1. Fetch product details to confirm price/title
      const product = await fetchProductByHandle(handle as string);
      
      if (!product) throw new Error("Product not found");

      // 2. Call internal API to record the order
      const res = await fetch('/api/shop/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: quantity,
          shopifyOrderId: `SH-${Math.floor(Math.random() * 100000)}` // Mock ID
        })
      });

      if (!res.ok) throw new Error("Failed to record order");

      setIsProcessing(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <Loader2 className="h-12 w-12 animate-spin text-rose-500 mb-4" />
        <h2 className="text-xl font-medium text-stone-600">Verifying your order...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Something went wrong</h2>
          <p className="text-stone-500 mb-6">{error}</p>
          <Link href="/dashboard/shop">
            <Button>Return to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
      <div className="bg-white p-10 rounded-[2rem] shadow-xl text-center max-w-md border border-stone-100">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Order Placed!</h1>
        <p className="text-stone-500 mb-8">
          Thank you for shopping with Mother Era. Your order has been confirmed and will be shipped shortly.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/dashboard">
            <Button className="w-full bg-stone-900 hover:bg-stone-800 h-12 rounded-xl">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/shop">
            <Button variant="outline" className="w-full h-12 rounded-xl">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ShopSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <ShopSuccessContent />
    </Suspense>
  );
}
