import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Globe, ShieldCheck, Stethoscope, Users, Baby, Activity, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Mother Era — Global Maternal & Family Wellness",
  description:
    "A guided journey through motherhood, nutrition, and family wellness. Global, inclusive, expert-backed guidance across pregnancy, postpartum, child nutrition, and family health.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-40 overflow-hidden bg-background">
        <div className="container-width relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Trusted by mothers worldwide
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
            Mother Era
          </h1>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            A gentle, expert-guided journey through <span className="text-primary italic">motherhood</span>, nutrition, and lifelong family wellness.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/register">
              <Button size="lg" className="px-10 h-14 text-lg">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="px-10 h-14 text-lg">
                Learn Our Philosophy
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Link href="/pregnancy" className="group" prefetch={false}>
              <Card className="h-full glass hover:bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-4 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                    <Heart className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Pregnancy Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">Global, trimester-wise nutrition and holistic wellness support.</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/postpartum" className="group" prefetch={false}>
              <Card className="h-full glass hover:bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Activity className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Postpartum Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">Recovery, mental wellness, and specialized nutrition for healing.</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/newborn-care" className="group" prefetch={false}>
              <Card className="h-full glass hover:bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                    <Baby className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Newborn Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">Expert guidance for the first hours, days, and weeks after birth.</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/family-health" className="group" prefetch={false}>
              <Card className="h-full glass hover:bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                    <Users className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Family Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">Pre-pregnancy wellness and habits for the whole family.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-96 h-96 bg-rose-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-[10%] w-96 h-96 bg-amber-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-[30%] w-96 h-96 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 bg-white border-y border-border">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">The Mother Era Standards</h2>
            <p className="text-lg text-muted-foreground">Built on trust, expertise, and global inclusivity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-6 group">
              <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 group-hover:rotate-6 transition-transform">
                <Stethoscope className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Expert-Backed</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every guide and plan is curated by healthcare professionals ensuring the highest standards of safety.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-6 group">
              <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-500 group-hover:-rotate-6 transition-transform">
                <Globe className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Globally Relevant</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Inclusive guidance that respects diverse cultures, regional availability, and varied dietary preferences.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-6 group">
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-500 group-hover:rotate-6 transition-transform">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Evidence-Based</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We bridge the gap between traditional wisdom and modern science with evidence-based methodologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-rose-50">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Ready to start your journey?</h2>
          <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto">
            Join thousands of mothers worldwide who trust Mother Era for their wellness journey.
          </p>
          <Link href="/register">
            <Button size="lg" className="px-12 h-14 text-lg group">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-stone-900 text-stone-300">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-serif font-bold text-white mb-6">Mother Era</h3>
              <p className="max-w-md mb-6 leading-relaxed">
                Dedicated to empowering mothers worldwide through expert guidance, 
                personalized nutrition, and a supportive community.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Explore</h4>
              <ul className="space-y-4">
                <li><Link href="/pregnancy" className="hover:text-white transition-colors">Pregnancy</Link></li>
                <li><Link href="/postpartum" className="hover:text-white transition-colors">Postpartum</Link></li>
                <li><Link href="/newborn-care" className="hover:text-white transition-colors">Newborn Care</Link></li>
                <li><Link href="/child" className="hover:text-white transition-colors">Child Nutrition</Link></li>
                <li><Link href="/family-health" className="hover:text-white transition-colors">Family Health</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Log In</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; 2024 Mother Era. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
