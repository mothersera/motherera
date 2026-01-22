"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function CheckoutContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const planName = searchParams.get("plan");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/checkout?plan=${planName}`);
    }
  }, [status, router, planName]);

  const plans = {
    premium: {
      name: "Premium",
      price: 499,
      features: [
        "Everything in Basic",
        "Personalized nutrition plans",
        "Monthly expert consultation (1)",
        "Priority chat support",
        "Exclusive workshops"
      ]
    },
    specialized: {
      name: "Specialized",
      price: 1499,
      features: [
        "Everything in Premium",
        "Weekly expert consultations",
        "Customized workout plans",
        "24/7 dedicated care manager",
        "Postpartum recovery program"
      ]
    }
  };

  const selectedPlan = planName && (planName === 'premium' || planName === 'specialized') ? plans[planName] : null;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!selectedPlan || !session?.user) return;
    setLoading(true);

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      // 1. Create Order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName, amount: selectedPlan.price }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || "Something went wrong");
      }

      // 2. Open Razorpay Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Mother Era",
        description: `Subscription to ${selectedPlan.name} Plan`,
        image: "/logo.svg", // Make sure this exists
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // 3. Verify Payment
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok) {
            router.push("/dashboard?payment=success");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: orderData.user.name,
          email: orderData.user.email,
          contact: orderData.user.contact,
        },
        theme: {
          color: "#be123c", // rose-700
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error: any) {
      console.error("Payment error:", error);
      alert(error.message || "Something went wrong with payment");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;
  }

  if (!selectedPlan) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Plan not found</h1>
        <Button onClick={() => router.push("/pricing")}>Go to Pricing</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md border-rose-100 shadow-lg">
        <CardHeader className="bg-rose-50/50 rounded-t-xl">
          <CardTitle className="text-2xl text-center">Checkout</CardTitle>
          <CardDescription className="text-center">Complete your subscription</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
            <span className="font-medium text-lg">{selectedPlan.name} Plan</span>
            <span className="font-bold text-2xl text-rose-600">₹{selectedPlan.price}<span className="text-sm text-stone-500 font-normal">/mo</span></span>
          </div>
          
          <ul className="space-y-3 mb-6">
            {selectedPlan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0" />
                <span className="text-stone-600 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full h-12 text-lg" 
            onClick={handlePayment} 
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Pay via UPI / Cards
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
