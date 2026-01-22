"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, ShieldCheck, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const currentPlan = session?.user?.subscriptionPlan || "free";
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 0,
      displayPrice: "₹0",
      description: "Essential guidance for every mother",
      features: [
        "Weekly development tracking",
        "Basic nutrition articles",
        "Community forum access",
        "Vaccination reminders"
      ],
      buttonText: "Current Plan",
      buttonVariant: "default" as const,
      disabled: true
    },
    {
      id: "premium",
      name: "Premium",
      price: 499,
      displayPrice: "₹499",
      period: "/month",
      description: "Personalized care and expert access",
      features: [
        "Everything in Basic",
        "Personalized nutrition plans",
        "Monthly expert consultation (1)",
        "Priority chat support",
        "Exclusive workshops"
      ],
      buttonText: "Upgrade to Premium",
      buttonVariant: "default" as const,
      disabled: false,
      highlight: true
    },
    {
      id: "specialized",
      name: "Specialized",
      price: 1499,
      displayPrice: "₹1499",
      period: "/month",
      description: "Intensive support for specific needs",
      features: [
        "Everything in Premium",
        "Weekly expert consultations",
        "Customized workout plans",
        "24/7 dedicated care manager",
        "Postpartum recovery program"
      ],
      buttonText: "Upgrade to Specialized",
      buttonVariant: "default" as const,
      disabled: false
    }
  ];

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async (planId: string, price: number) => {
    if (price === 0) return; // Basic plan logic

    setLoading(true);
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      // 1. Create Order
      console.log("Creating order...");
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, amount: price }),
      });

      const orderData = await orderRes.json();
      console.log("Order created:", orderData);

      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      if (!orderData.keyId) {
        throw new Error("Razorpay Key ID is missing from server response");
      }

      // 2. Open Razorpay Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Mother Era",
        description: `Upgrade to ${plans.find(p => p.id === planId)?.name} Plan`,
        image: "/logo.png",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // 3. Verify Payment
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyRes.ok) {
              router.refresh();
              router.push("/dashboard?payment=success");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (verifyError) {
            console.error("Verification error:", verifyError);
            alert("Payment verification failed.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            console.log("Checkout modal closed");
          }
        },
        prefill: {
          name: orderData.user.name,
          email: orderData.user.email,
          contact: orderData.user.contact || undefined,
        },
        theme: {
          color: "#be123c",
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold text-stone-900">Manage Subscription</h1>
         <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Payment</span>
         </div>
      </div>

      <div className="mb-8 p-6 bg-white rounded-xl border shadow-sm">
         <h2 className="text-lg font-semibold mb-2">Billing Information</h2>
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-8 bg-stone-100 rounded border flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-stone-400" />
               </div>
               <div>
                  <p className="text-stone-900 font-medium">
                    {currentPlan === 'free' || currentPlan === 'basic' ? 'No payment method added' : 'Razorpay UPI / Card'}
                  </p>
                  <p className="text-stone-500 text-sm">
                    {currentPlan === 'free' || currentPlan === 'basic' ? 'Add a method to upgrade your plan' : 'Your subscription is active'}
                  </p>
               </div>
            </div>
            {/* The "Add Method" button now triggers the Premium upgrade flow as a default action */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleUpgrade('premium', 499)}
              disabled={loading || currentPlan === 'premium' || currentPlan === 'specialized'}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add Method'}
            </Button>
         </div>
      </div>
      
      <h2 className="text-xl font-bold text-stone-900 mb-6">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id || (currentPlan === 'free' && plan.id === 'basic');
          return (
          <Card key={plan.id} className={`flex flex-col ${plan.highlight ? 'border-rose-200 shadow-lg ring-1 ring-rose-200' : ''} ${isCurrent ? 'bg-stone-50 border-stone-200' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                 <CardTitle className="text-xl">{plan.name}</CardTitle>
                 {isCurrent && <span className="bg-stone-200 text-stone-700 text-xs px-2 py-1 rounded-full">Active</span>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.displayPrice}</span>
                {plan.period && <span className="text-stone-500">{plan.period}</span>}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={`h-4 w-4 shrink-0 ${isCurrent ? 'text-stone-400' : 'text-green-500'}`} />
                    <span className="text-stone-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
                <Button 
                  className="w-full" 
                  variant={isCurrent ? "secondary" : plan.buttonVariant}
                  disabled={isCurrent || loading || (plan.id === 'basic')}
                  onClick={() => !isCurrent && handleUpgrade(plan.id, plan.price)}
                >
                  {loading && !isCurrent ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  {isCurrent ? "Current Plan" : plan.buttonText}
                </Button>
            </CardFooter>
          </Card>
        )})}
      </div>
    </div>
  );
}
