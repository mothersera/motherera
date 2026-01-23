import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Mission Section */}
      <section className="mb-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-6">
          Empowering Mothers Globally
        </h1>
        <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed mb-10">
          Mother Era was born from a simple belief: every mother deserves access to expert, culturally relevant, and compassionate healthcare guidance. We bridge the gap between traditional wisdom and modern medical science to support you through the most transformative journey of your life.
        </p>
        
        {/* Desktop Hero Image */}
        <div className="hidden md:block relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/motherera-hero.webp"
            alt="A calm, nurturing moment between a mother and her baby"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* Mobile Hero Image */}
        <div className="block md:hidden relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/motherera-hero.webp"
            alt="Close, centered portrait of a mother with her baby"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg">
           <Image
             src="/motherera-about.webp"
             alt="Mother gently holding her baby in natural light"
             fill
             className="object-cover"
             sizes="(max-width: 768px) 100vw, 50vw"
           />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-stone-900 mb-6">Why We Exist</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-rose-600 mb-2">Expert-First Approach</h3>
              <p className="text-stone-600">
                We partner with certified gynecologists, pediatricians, and nutritionists to ensure every piece of advice is medically sound and safe.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-rose-600 mb-2">Culturally Rooted</h3>
              <p className="text-stone-600">
                We understand the Indian context—our diets, our family structures, and our traditions. Our plans respect and integrate these nuances.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-rose-600 mb-2">Privacy & Trust</h3>
              <p className="text-stone-600">
                Your health data is sacred. We employ top-tier security measures to keep your personal information private and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rose-50 rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">
          Ready to start your journey?
        </h2>
        <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
          Join thousands of mothers who trust Mother Era for their health and wellness.
        </p>
        <Link href="/register">
          <Button size="lg" className="px-8">
            Join Mother Era Today
          </Button>
        </Link>
      </section>
    </div>
  );
}
