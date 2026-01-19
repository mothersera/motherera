import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingPage() {
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
      buttonVariant: "outline" as const,
      href: "/register"
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
      buttonText: "Subscribe Now",
      buttonVariant: "default" as const,
      href: "/register?plan=premium",
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
      buttonText: "Contact Us",
      buttonVariant: "outline" as const,
      href: "/contact"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
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
              <Link href={plan.href} className="w-full">
                <Button className="w-full" variant={plan.buttonVariant}>
                  {plan.buttonText}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
