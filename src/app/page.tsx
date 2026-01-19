import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Globe, ShieldCheck, Stethoscope, Users, Baby, Activity } from "lucide-react";

export const metadata = {
  title: "Mother Era — Global Maternal & Family Wellness",
  description:
    "A guided journey through motherhood, nutrition, and family wellness. Global, inclusive, expert-backed guidance across pregnancy, postpartum, child nutrition, and family health.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-rose-50">
        <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-900 mb-6">
            Mother Era
          </h1>
          <p className="text-xl md:text-2xl font-medium text-stone-700 max-w-2xl mx-auto mb-4">
            A guided journey through motherhood, nutrition, and family wellness
          </p>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-10">
            Expert-backed guidance, personalized nutrition philosophies, and support through every stage of motherhood. Global, inclusive, and calm.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link href="/pregnancy" className="group" prefetch={false}>
              <Card className="h-full bg-white/60 hover:bg-white transition-all hover:shadow-lg border-stone-200 cursor-pointer group-hover:border-rose-200">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-2 group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-stone-900">Pregnancy Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-stone-500">Global, trimester-wise nutrition and wellness support.</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/postpartum" className="group" prefetch={false}>
              <Card className="h-full bg-white/60 hover:bg-white transition-all hover:shadow-lg border-stone-200 cursor-pointer group-hover:border-blue-200">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-stone-900">Postpartum Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-stone-500">Recovery, mental wellness, and nutrition for healing.</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/child" className="group" prefetch={false}>
              <Card className="h-full bg-white/60 hover:bg-white transition-all hover:shadow-lg border-stone-200 cursor-pointer group-hover:border-green-200">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 group-hover:scale-110 transition-transform">
                    <Baby className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-stone-900">Child Nutrition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-stone-500">Guidance for 0-5 years, from breastfeeding to family meals.</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/family-health" className="group" prefetch={false}>
              <Card className="h-full bg-white/60 hover:bg-white transition-all hover:shadow-lg border-stone-200 cursor-pointer group-hover:border-amber-200">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-2 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-stone-900">Family Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-stone-500">Pre-pregnancy wellness and healthy habits for the whole family.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-rose-50 rounded-full">
                <Stethoscope className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900">Expert-Backed</h3>
              <p className="text-stone-600">
                Curated by health professionals for safety and accuracy.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-amber-50 rounded-full">
                <Globe className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900">Globally Relevant</h3>
              <p className="text-stone-600">
                Inclusive guidance respecting diverse cultures and diets.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-blue-50 rounded-full">
                <ShieldCheck className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900">Evidence-Based</h3>
              <p className="text-stone-600">
                Scientifically proven methods for maternal and child health.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
