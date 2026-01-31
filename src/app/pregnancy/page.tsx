"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, Heart, Baby, Calendar, ArrowRight, Salad, Activity } from "lucide-react";
import { motion } from "framer-motion";

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

export default function PregnancyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-rose-50/50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold tracking-wide uppercase mb-6">
              Expert Guidance
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Pregnancy <br/>
              <span className="text-rose-500">Care & Wellness</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
              A global, inclusive guide to nourishing yourself and your growing baby. Honoring every culture, diet, and body.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
        
        {/* Section 1: Global Perspective */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-8">Pregnancy & Nutrition: A Global Perspective</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Holistic Nourishment</h3>
              <p className="text-stone-600 leading-relaxed">
                Nutrition isn't just counting calories. It's about quality, variety, and listening to your body. Whether you eat rice and lentils or meat and potatoes, the core principles remain: nourishment, hydration, and balance.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                <Salad className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">No "Perfect" Diet</h3>
              <p className="text-stone-600 leading-relaxed">
                Your needs are unique to your lifestyle and culture. Focus on nutrient-dense whole foods that make you feel energized, rather than strict rules.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <div className="relative">
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-stone-200 hidden md:block" />
          
          {/* First Trimester */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative grid md:grid-cols-2 gap-12 mb-24 items-center"
          >
            <div className="md:text-right md:pr-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm">1</span>
                <h3 className="text-rose-600 font-bold tracking-wide uppercase text-sm">First Trimester</h3>
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Gentle Beginnings</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Focus on managing nausea and staying hydrated. Your body is doing the heavy lifting of forming new life.
              </p>
            </div>
            <div className="relative pl-12 md:pl-0">
              <div className="absolute left-0 md:left-[-28px] top-0 w-14 h-14 bg-white border-4 border-rose-100 rounded-full flex items-center justify-center z-10 shadow-sm">
                <Baby className="w-6 h-6 text-rose-500" />
              </div>
              <Card className="border-none shadow-xl shadow-stone-200/50 bg-white overflow-hidden">
                <div className="h-2 bg-rose-500" />
                <CardContent className="p-8">
                  <h4 className="font-bold text-stone-900 mb-4 text-lg">Key Focus Areas</h4>
                  <ul className="space-y-4">
                    {[
                      "Manage nausea with small, frequent meals",
                      "Focus on hydration (water, herbal teas)",
                      "Gentle nourishment; don't force heavy meals",
                      "Folate-rich foods (greens, fortified grains)"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-stone-600">
                        <Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Second Trimester */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative grid md:grid-cols-2 gap-12 mb-24 items-center"
          >
            <div className="order-2 md:order-1 relative pl-12 md:pl-0">
               <div className="absolute left-0 md:right-[-28px] md:left-auto top-0 w-14 h-14 bg-white border-4 border-amber-100 rounded-full flex items-center justify-center z-10 shadow-sm">
                <Activity className="w-6 h-6 text-amber-500" />
              </div>
              <Card className="border-none shadow-xl shadow-stone-200/50 bg-white overflow-hidden">
                <div className="h-2 bg-amber-500" />
                <CardContent className="p-8">
                  <h4 className="font-bold text-stone-900 mb-4 text-lg">Nutrient Needs</h4>
                   <ul className="space-y-4">
                    {[
                      "Appetite often returns; focus on quality",
                      "Increased protein needs for baby's growth",
                      "Calcium and Vitamin D for bone development",
                      "Iron-rich foods to support blood volume"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-stone-600">
                        <Check className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="order-1 md:order-2 md:pl-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">2</span>
                <h3 className="text-amber-600 font-bold tracking-wide uppercase text-sm">Second Trimester</h3>
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Growth & Energy</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Often called the "honeymoon phase," you might feel a burst of energy. Use this time to nourish your body and move gently.
              </p>
            </div>
          </motion.div>

          {/* Third Trimester */}
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
                <h3 className="text-blue-600 font-bold tracking-wide uppercase text-sm">Third Trimester</h3>
              </div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Preparation</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                As you approach the finish line, focus on steady nourishment, comfort, and preparing your body for labor.
              </p>
            </div>
            <div className="relative pl-12 md:pl-0">
              <div className="absolute left-0 md:left-[-28px] top-0 w-14 h-14 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center z-10 shadow-sm">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <Card className="border-none shadow-xl shadow-stone-200/50 bg-white overflow-hidden">
                <div className="h-2 bg-blue-500" />
                <CardContent className="p-8">
                  <h4 className="font-bold text-stone-900 mb-4 text-lg">Final Stretch Focus</h4>
                  <ul className="space-y-4">
                    {[
                      "Steady nourishment for final growth spurt",
                      "Fiber-rich foods for digestive comfort",
                      "Omega-3s (DHA) for brain development",
                      "Energy-dense snacks for labor prep"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-stone-600">
                        <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Inclusive Dietary Guidance */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-stone-100"
        >
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-10 text-center">Inclusive Dietary Guidance</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-green-50 rounded-2xl">
              <h3 className="text-xl font-bold text-green-800 mb-3">Vegetarian</h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                Focus on diverse plant proteins like lentils, beans, tofu, and dairy. Pair iron-rich plant foods with Vitamin C to enhance absorption. Ensure adequate Vitamin B12.
              </p>
            </div>
            <div className="p-6 bg-red-50 rounded-2xl">
              <h3 className="text-xl font-bold text-red-800 mb-3">Non-Vegetarian</h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                Lean meats, poultry, and eggs are excellent protein sources. Include low-mercury fish like salmon for Omega-3s. Balance with plenty of vegetables.
              </p>
            </div>
            <div className="p-6 bg-emerald-50 rounded-2xl">
              <h3 className="text-xl font-bold text-emerald-800 mb-3">Plant-Based / Vegan</h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                Prioritize protein variety (quinoa, soy). Pay special attention to Vitamin B12, Iron, Calcium, Iodine, and Choline. Consider algae-based DHA.
              </p>
            </div>
            <div className="p-6 bg-purple-50 rounded-2xl">
              <h3 className="text-xl font-bold text-purple-800 mb-3">Keto / Low-Carb</h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                Consult a specialist. Focus on nutrient-dense whole foods (avocados, nuts, eggs, leafy greens). Ensure electrolytes and hydration. Avoid processed "keto" snacks.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Myths vs Facts (Footer style) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-900 rounded-[2.5rem] p-8 md:p-16 text-center text-stone-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Common Myths Debunked</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
              <div className="bg-stone-800/50 p-6 rounded-2xl border border-stone-700/50">
                <h3 className="font-bold text-white mb-2">"You must eat for two"</h3>
                <p className="text-sm text-stone-400">
                  <span className="text-rose-400 font-bold">Fact:</span> You only need about 300-500 extra calories in the later trimesters. Quality over quantity.
                </p>
              </div>
              <div className="bg-stone-800/50 p-6 rounded-2xl border border-stone-700/50">
                <h3 className="font-bold text-white mb-2">"Avoid all seafood"</h3>
                <p className="text-sm text-stone-400">
                  <span className="text-rose-400 font-bold">Fact:</span> Fish is great for brain development! Just avoid high-mercury varieties and ensure it's cooked.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
