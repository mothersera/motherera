"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Utensils, Baby, Heart, Apple, CheckCircle2, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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

import { useRouter } from "next/navigation";

export default function ChildNutritionPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-emerald-50/50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-wide uppercase mb-6">
              0 to 5 Years
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Nourishing Their <br/>
              <span className="text-emerald-600">Growing Future</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
              A comprehensive, expert-guided approach to early nutrition—from the first drop of milk to the first family meal.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
        
        {/* Section 1: Philosophy */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-8">Why Early Nutrition Matters</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Brain & Body Growth</h3>
              <p className="text-stone-600 leading-relaxed">
                The first five years are a period of rapid development. The nutrients provided now fuel metabolism, immunity, and lifelong cognitive health.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                <Apple className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Building Habits</h3>
              <p className="text-stone-600 leading-relaxed">
                We nurture competent eaters who listen to their bodies, explore diverse flavors, and develop a positive relationship with food.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <div className="relative">
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-stone-200 hidden md:block" />
          
          {/* 0-6 Months */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative grid md:grid-cols-2 gap-12 mb-24 items-center"
          >
            <div className="md:text-right md:pr-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">1</span>
                <h3 className="text-emerald-600 font-bold tracking-wide uppercase text-sm">The Foundation</h3>
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">0–6 Months: Milk First</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                For the first six months, breast milk or formula provides the perfect balance of fats, proteins, and antibodies. No water, no solids—just milk.
              </p>
              <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 inline-block text-left">
                <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Global Standard
                </h4>
                <p className="text-sm text-emerald-700">
                  Exclusive breastfeeding is recommended by WHO/AAP. Avoid water, honey, or teas to prevent infection and ensure proper nutrient intake.
                </p>
              </div>
            </div>
            <div className="relative pl-12 md:pl-0">
              <div className="absolute left-0 md:left-[-28px] top-0 w-14 h-14 bg-white border-4 border-emerald-100 rounded-full flex items-center justify-center z-10 shadow-sm">
                <Baby className="w-6 h-6 text-emerald-500" />
              </div>
              <Card className="border-none shadow-xl shadow-stone-200/50 bg-white overflow-hidden">
                <div className="h-2 bg-emerald-500" />
                <CardContent className="p-8">
                  <h4 className="font-bold text-stone-900 mb-4 text-lg">Responsive Feeding Cues</h4>
                  <ul className="space-y-4">
                    {[
                      "Rooting or turning head side to side",
                      "Sucking on hands or fingers",
                      "Smacking lips",
                      "Crying is a late sign of hunger—feed before tears"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-stone-600">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* 6-12 Months */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative grid md:grid-cols-2 gap-12 mb-24 items-center"
          >
            <div className="order-2 md:order-1 relative pl-12 md:pl-0">
               <div className="absolute left-0 md:right-[-28px] md:left-auto top-0 w-14 h-14 bg-white border-4 border-amber-100 rounded-full flex items-center justify-center z-10 shadow-sm">
                <Utensils className="w-6 h-6 text-amber-500" />
              </div>
              <Card className="border-none shadow-xl shadow-stone-200/50 bg-white overflow-hidden">
                <div className="h-2 bg-amber-500" />
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-stone-900 mb-3 text-sm uppercase tracking-wide">First Foods</h4>
                      <ul className="space-y-2 text-sm text-stone-600">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400"/>Iron-fortified cereals</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400"/>Pureed meats</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400"/>Mashed lentils (Dal)</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400"/>Soft avocado</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-3 text-sm uppercase tracking-wide">Safety Check</h4>
                      <ul className="space-y-2 text-sm text-stone-600">
                        <li className="flex items-center gap-2 text-rose-600"><AlertCircle className="w-4 h-4"/> No Honey (Botulism)</li>
                        <li className="flex items-center gap-2 text-rose-600"><AlertCircle className="w-4 h-4"/> No Cow's Milk drink</li>
                        <li className="flex items-center gap-2 text-rose-600"><AlertCircle className="w-4 h-4"/> No Added Salt/Sugar</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="order-1 md:order-2 md:pl-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">2</span>
                <h3 className="text-amber-600 font-bold tracking-wide uppercase text-sm">Exploration</h3>
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">6–12 Months: Introducing Solids</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Around 6 months, when baby can sit up and hold their head steady, the journey of texture and taste begins. Milk remains the primary nutrition source, but food is for learning.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-stone-600" />
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-900 text-sm">Texture Progression</h5>
                    <p className="text-sm text-stone-500">Move quickly from purees to mashed and lumpy textures to support oral motor skills.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-stone-600" />
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-900 text-sm">Allergen Introduction</h5>
                    <p className="text-sm text-stone-500">Introduce peanuts, eggs, and dairy early, one at a time, to monitor reactions.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 1-5 Years */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="md:text-right md:pr-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">3</span>
                <h3 className="text-blue-600 font-bold tracking-wide uppercase text-sm">Independence</h3>
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">1–5 Years: The Toddler Table</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Toddler appetites are unpredictable. Your job is to provide the <strong>what</strong>, <strong>when</strong>, and <strong>where</strong> of feeding. Their job is to decide <strong>how much</strong> and <strong>whether</strong> to eat.
              </p>
              <Button 
                variant="outline" 
                className="rounded-full border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={() => router.push('/pricing?source=child-nutrition-meal-plan')}
              >
                Download Meal Plan Guide
              </Button>
            </div>
            <div className="relative pl-12 md:pl-0">
              <div className="absolute left-0 md:left-[-28px] top-0 w-14 h-14 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center z-10 shadow-sm">
                <Apple className="w-6 h-6 text-blue-500" />
              </div>
              <Card className="border-none shadow-xl shadow-stone-200/50 bg-white overflow-hidden">
                <div className="h-2 bg-blue-500" />
                <CardContent className="p-8">
                  <h4 className="font-bold text-stone-900 mb-6 text-lg text-center">The Balanced Plate</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <span className="block text-2xl font-bold text-green-600 mb-1">50%</span>
                      <span className="text-xs font-bold text-green-800 uppercase tracking-wide">Fruits & Veggies</span>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-xl text-center">
                      <span className="block text-2xl font-bold text-amber-600 mb-1">25%</span>
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Whole Grains</span>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-xl text-center">
                      <span className="block text-2xl font-bold text-rose-600 mb-1">25%</span>
                      <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">Protein</span>
                    </div>
                    <div className="bg-stone-50 p-4 rounded-xl text-center flex items-center justify-center">
                      <span className="text-xs font-bold text-stone-500">Healthy Fats & Water</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Healthy Relationships Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-900 rounded-[2.5rem] p-8 md:p-16 text-center text-stone-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Building a Healthy Relationship with Food</h2>
            <p className="text-lg text-stone-400 mb-12 leading-relaxed">
              It's not just about nutrients. It's about joy, connection, and listening to our bodies.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Family Meals", desc: "Eat together. Children mimic what they see you enjoy." },
                { title: "No Pressure", desc: "Never force bites. Trust their natural hunger cues." },
                { title: "Curiosity", desc: "Involve them in cooking. Talk about texture and color." }
              ].map((item, i) => (
                <div key={i} className="bg-stone-800/50 p-6 rounded-2xl border border-stone-700/50 hover:bg-stone-800 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
