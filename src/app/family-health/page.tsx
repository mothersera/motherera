"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Activity, CheckCircle, Apple, Home, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function FamilyHealthPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-emerald-50/50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-wide uppercase mb-6">
              Holistic Wellness
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Family & <br/>
              <span className="text-emerald-600">Pre-Pregnancy Wellness</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
              Building a healthy future starts before conception. A global approach to preparing your body, mind, and home for parenthood.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
        
        {/* Section 1: Preparing for Parenthood */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
             <div className="inline-flex items-center gap-2 mb-4">
               <Users className="w-5 h-5 text-emerald-600" />
               <h3 className="text-emerald-600 font-bold tracking-wide uppercase text-sm">The Foundation</h3>
             </div>
             <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Preparing for Parenthood</h2>
             <p className="text-stone-600 leading-relaxed mb-6">
               The months leading up to conception—the preconception period—are a golden window to optimize health. It's not just about fertility; it's about establishing vitality that supports a healthy pregnancy and child.
             </p>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
               <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                 <CheckCircle className="w-5 h-5 text-emerald-500" /> It Takes Two
               </h4>
               <p className="text-sm text-stone-600">
                 Sperm health is just as critical as egg health. Both partners should focus on nutrient-dense foods and reducing stress 3-6 months before trying to conceive.
               </p>
             </div>
          </div>
          <div className="relative pl-12 md:pl-0">
             <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-100 rounded-full blur-[80px] opacity-50" />
             <div className="relative z-10 grid gap-6">
                <Card className="border-none shadow-lg shadow-emerald-100/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-emerald-800">
                      <Apple className="w-5 h-5" /> Nutrition
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-stone-600">
                    Whole foods, antioxidants, and hydration for cellular health.
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg shadow-emerald-100/50 ml-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-emerald-800">
                      <Activity className="w-5 h-5" /> Movement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-stone-600">
                    Consistent, gentle exercise to manage stress and blood flow.
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg shadow-emerald-100/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-emerald-800">
                      <Sun className="w-5 h-5" /> Environment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-stone-600">
                    Reducing exposure to toxins in home and personal care products.
                  </CardContent>
                </Card>
             </div>
          </div>
        </motion.section>

        {/* Section 2: Pre-Pregnancy Nutrition (Women) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Maternal Nutrition Focus</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Your body is the first home your baby will ever know. Nourishing it now builds the reserves needed for pregnancy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-stone-100 shadow-md hover:shadow-lg transition-shadow bg-rose-50/50 border-rose-100">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3 text-rose-700">
                  <Heart className="w-6 h-6" /> Key Nutrients
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <h4 className="font-bold text-stone-900 mb-1">Folate</h4>
                  <p className="text-sm text-stone-600">Crucial for early neural development. Leafy greens, legumes.</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <h4 className="font-bold text-stone-900 mb-1">Iron Stores</h4>
                  <p className="text-sm text-stone-600">Build reserves now. Lean meats, spinach + Vitamin C.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-stone-100 shadow-md hover:shadow-lg transition-shadow bg-emerald-50/50 border-emerald-100">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3 text-emerald-700">
                  <Activity className="w-6 h-6" /> Lifestyle Shifts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <h4 className="font-bold text-stone-900 mb-1">Avoid Crash Diets</h4>
                  <p className="text-sm text-stone-600">Restrictive eating disrupts hormones. Focus on nourishment.</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <h4 className="font-bold text-stone-900 mb-1">Gentle Movement</h4>
                  <p className="text-sm text-stone-600">Yoga, walking, or swimming to build strength without burnout.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

         {/* Section 3: General Family Wellness */}
         <motion.section 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeIn}
           className="bg-stone-900 rounded-[2.5rem] p-8 md:p-16 text-stone-300"
         >
           <div className="max-w-4xl mx-auto text-center">
             <Home className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
             <h2 className="text-3xl font-serif font-bold text-white mb-6">Building a Healthy Home</h2>
             <p className="text-lg text-stone-400 mb-12 leading-relaxed">
               Wellness is contagious. When the whole family participates, it becomes a lifestyle rather than a chore.
             </p>
             
             <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700">
                   <h4 className="font-bold text-white mb-2">Shared Meals</h4>
                   <p className="text-sm text-stone-400">Eating together promotes better nutrition and emotional connection.</p>
                </div>
                <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700">
                   <h4 className="font-bold text-white mb-2">Sleep Hygiene</h4>
                   <p className="text-sm text-stone-400">Prioritizing rest for parents is just as important as it is for children.</p>
                </div>
                <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700">
                   <h4 className="font-bold text-white mb-2">Stress Reduction</h4>
                   <p className="text-sm text-stone-400">Mindfulness, nature walks, and open communication.</p>
                </div>
             </div>
           </div>
         </motion.section>

        {/* CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-rose-50 rounded-[2.5rem] p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-stone-900 mb-6 font-serif">Ready to start your journey?</h2>
          <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
            Whether you are planning for a baby, currently expecting, or raising a family, Mother Era is here to support you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" prefetch={false}>
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 h-12">
                Join Mother Era
              </Button>
            </Link>
            <Link href="/pregnancy" prefetch={false}>
               <Button variant="outline" size="lg" className="border-rose-200 text-rose-700 hover:bg-rose-100 rounded-full px-8 h-12">
                 Explore Pregnancy Care
               </Button>
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
