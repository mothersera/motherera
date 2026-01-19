import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Activity, CheckCircle, Apple } from 'lucide-react';

export const metadata = {
  title: "Family & Pre-Pregnancy Wellness — Mother Era",
  description:
    "Prepare for parenthood with global preconception guidance: maternal nutrition, partner roles, and healthy home habits.",
};

export default function FamilyHealthPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/* Hero Section */}
      <section className="relative py-16 bg-emerald-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">
            Family & Pre-Pregnancy Wellness
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
            Building a healthy future starts before conception. A global approach to preparing your body, mind, and home for parenthood.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-5xl space-y-16">
        
        {/* Section 1: Preparing for Parenthood */}
        <section>
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-emerald-100 rounded-full">
                <Users className="w-6 h-6 text-emerald-600" />
             </div>
             <h2 className="text-2xl font-bold text-stone-800">Preparing for Parenthood</h2>
          </div>
          <div className="prose prose-stone max-w-none text-stone-600">
            <p className="mb-4">
              The journey to parenthood is one of the most significant transitions in life. While much attention is placed on pregnancy itself, 
              the months leading up to conception—the preconception period—are a golden window of opportunity to optimize health for both partners.
            </p>
            <p className="mb-4">
              Pre-pregnancy health is not just about fertility; it is about establishing a foundation of vitality that supports a healthy pregnancy 
              and a healthy child. It involves looking at nutrition, lifestyle, environmental factors, and emotional readiness.
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 my-6">
              <h3 className="text-lg font-semibold text-stone-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> Both Partners Play a Role
              </h3>
              <p>
                It takes two to create a healthy embryo. Sperm health is just as critical as egg health. 
                Both partners should focus on nutrient-dense foods, reducing stress, and avoiding harmful substances 
                at least 3-6 months before trying to conceive.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Pre-Pregnancy Nutrition (Women) */}
        <section>
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-rose-100 rounded-full">
                <Heart className="w-6 h-6 text-rose-600" />
             </div>
             <h2 className="text-2xl font-bold text-stone-800">Pre-Pregnancy Nutrition (Maternal)</h2>
          </div>
          <div className="prose prose-stone max-w-none text-stone-600 mb-8">
            <p>
              Your body is the first home your baby will ever know. Nourishing it before conception helps ensure that your nutrient stores are full, 
              supporting the intense demands of early pregnancy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-stone-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Apple className="w-5 h-5 text-rose-500" /> Focus on Nourishment
                </CardTitle>
              </CardHeader>
              <CardContent className="text-stone-600 space-y-3">
                <p>
                  <strong>Balanced Diet:</strong> Aim for a colorful variety of fruits, vegetables, whole grains, proteins, and healthy fats.
                </p>
                <p>
                  <strong>Folate/Folic Acid:</strong> Crucial for early neural development. Found in leafy greens, legumes, and fortified foods.
                </p>
                <p>
                  <strong>Iron Stores:</strong> Build up iron reserves now with leafy greens, lean meats, or legumes + Vitamin C.
                </p>
              </CardContent>
            </Card>

            <Card className="border-stone-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-rose-500" /> Lifestyle Shifts
                </CardTitle>
              </CardHeader>
              <CardContent className="text-stone-600 space-y-3">
                <p>
                  <strong>Avoid Extreme Dieting:</strong> Crash diets or restrictive eating patterns can disrupt hormonal balance and ovulation. 
                  Focus on consistency and long-term nourishment.
                </p>
                <p>
                  <strong>Gentle Movement:</strong> Establish a regular exercise routine you enjoy—walking, yoga, swimming, or strength training.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

         {/* Section 3: General Family Wellness */}
         <section>
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
             </div>
             <h2 className="text-2xl font-bold text-stone-800">Building a Healthy Home Environment</h2>
          </div>
          <div className="prose prose-stone max-w-none text-stone-600">
            <p className="mb-6">
              Wellness is contagious. When the whole family participates in healthy habits, it becomes a lifestyle rather than a chore. 
              Creating a supportive environment where healthy food is accessible and movement is fun sets the stage for a thriving family.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-white p-5 rounded-lg border border-stone-200">
                  <h4 className="font-semibold text-stone-800 mb-2">Shared Meals</h4>
                  <p className="text-sm">Eating together promotes better nutrition and emotional connection for all ages.</p>
               </div>
               <div className="bg-white p-5 rounded-lg border border-stone-200">
                  <h4 className="font-semibold text-stone-800 mb-2">Sleep Hygiene</h4>
                  <p className="text-sm">Prioritizing rest for parents is just as important as it is for children.</p>
               </div>
               <div className="bg-white p-5 rounded-lg border border-stone-200">
                  <h4 className="font-semibold text-stone-800 mb-2">Stress Reduction</h4>
                  <p className="text-sm">Mindfulness, nature walks, and open communication help manage family stress.</p>
               </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-rose-50 rounded-2xl p-8 text-center mt-12">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Ready to start your journey?</h2>
          <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
            Whether you are planning for a baby, currently expecting, or raising a family, Mother Era is here to support you with expert-backed guidance.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register" prefetch={false}>
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white">
                Join Mother Era
              </Button>
            </Link>
            <Link href="/pregnancy" prefetch={false}>
               <Button variant="outline" size="lg" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                 Explore Pregnancy Care
               </Button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
