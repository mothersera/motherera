"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, ShieldCheck } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const currentPlan = session?.user?.subscriptionPlan || "free";

  const plans = [
    {
      id: "free",
      name: "Basic",
      price: "₹0",
      description: "Essential guidance for every mother",
      features: [
        "Weekly development tracking",
        "Basic nutrition articles",
        "Community forum access",
        "Vaccination reminders"
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      disabled: true
    },
    {
      id: "premium",
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
      buttonText: "Upgrade to Premium",
      buttonVariant: "default" as const,
      disabled: false,
      highlight: true
    },
    {
      id: "specialized",
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
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      disabled: false
    }
  ];

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
                  <p className="text-stone-900 font-medium">No payment method added</p>
                  <p className="text-stone-500 text-sm">Add a card to upgrade your plan</p>
               </div>
            </div>
            <Button variant="outline" size="sm">Add Method</Button>
         </div>
      </div>
      
      <h2 className="text-xl font-bold text-stone-900 mb-6">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;
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
                <span className="text-3xl font-bold">{plan.price}</span>
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
                  disabled={isCurrent}
                >
                  {isCurrent ? "Current Plan" : plan.buttonText}
                </Button>
            </CardFooter>
          </Card>
        )})}
      </div>
    </div>
  );
}
