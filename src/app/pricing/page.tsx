"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ADMIN_EMAIL, normalizeEmail } from "@/lib/access";

export default function PricingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const isAdminUser = normalizeEmail(session?.user?.email) === ADMIN_EMAIL;

  const handleSubscribe = async (planName: string) => {
    if (!isAdminUser) {
      if (!session?.user) {
        router.push("/login");
        return;
      }
      router.push("/dashboard/subscription");
      return;
    }

    const plan = planName.toLowerCase();
    setLoadingPlan(plan);
    try {
      const res = await fetch(`/api/test/subscribe?plan=${plan}`);
      const data = await res.json();
      
      if (res.ok && data.success) {
        router.push('/dashboard?subscribed=true');
      } else {
        if (res.status === 401) {
          router.push('/login');
        } else {
          alert(data.error || 'Subscription failed');
        }
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      name: "Basic",
      price: "₹0",
      description: "Essential guidance for every mother",
      features: [
        "Weekly development tracking",
        "Basic nutrition articles",
        "Community forum access",
        "Vaccination reminders"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "default" as const,
      href: "/register",
      period: "" // Added for type consistency
    },
    {
      name: "Premium",
      price: "₹499",
      period: "/month",
      description: "Personalized care and expert access",
      features: [
        "Everything in Basic",
        "Personalized nutrition plans",
        "Monthly expert consultation (1)",
        "Priority chat support",
        "Exclusive workshops"
      ],
      buttonText: isAdminUser ? "Activate Free Test" : "Upgrade to Premium",
      buttonVariant: "default" as const,
      href: "/dashboard/subscription",
      highlight: true
    },
    {
      name: "Specialized",
      price: "₹1499",
      period: "/month",
      description: "Intensive support for specific needs",
      features: [
        "Everything in Premium",
        "Weekly expert consultations",
        "Customized workout plans",
        "24/7 dedicated care manager",
        "Postpartum recovery program"
      ],
      buttonText: isAdminUser ? "Activate Free Test" : "Upgrade to Specialized",
      buttonVariant: "default" as const,
      href: "/dashboard/subscription",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        {isAdminUser && (
          <div className="inline-block bg-amber-100 text-amber-800 text-sm font-bold px-4 py-2 rounded-full mb-6 border border-amber-200">
            🚧 TEST MODE ACTIVE: All Plans are FREE 🚧
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-4">
          Invest in Your Health Journey
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Choose the plan that fits your stage of motherhood. No hidden fees, cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.highlight ? 'border-rose-200 shadow-xl ring-1 ring-rose-200' : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-stone-500">{plan.period}</span>}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-stone-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.name === 'Basic' ? (
                <Link href={plan.href} className="w-full">
                  <Button className="w-full" variant={plan.buttonVariant}>
                    {plan.buttonText}
                  </Button>
                </Link>
              ) : (
                <Button 
                  className="w-full" 
                  variant={plan.buttonVariant}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={loadingPlan === plan.name.toLowerCase()}
                >
                  {loadingPlan === plan.name.toLowerCase() ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    plan.buttonText
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
