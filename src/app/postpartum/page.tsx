"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, HeartHandshake, User, Heart, Coffee, ShieldCheck } from "lucide-react";
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

export default function PostpartumPage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-blue-50/50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-6">
              The Fourth Trimester
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Postpartum <br/>
              <span className="text-blue-600">Recovery & Care</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
              Supporting your recovery, nourishment, and emotional well-being after childbirth. A gentle, non-judgmental space for your healing journey.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
        
        {/* Section 1: Understanding Recovery */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-8">Understanding Recovery</h2>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 text-left relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 opacity-50" />
             <div className="relative z-10 flex gap-6 flex-col md:flex-row items-start">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">A Process, Not a Destination</h3>
                  <p className="text-stone-600 leading-relaxed">
                    Recovery is non-linear. Your body has gone through a monumental transformation. Whether you had a vaginal birth or a C-section, breastfeeding or formula feeding, your journey is valid. Be kind to yourself.
                  </p>
                </div>
             </div>
          </div>
        </motion.section>

        {/* Nourishing Recovery Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 md:order-1 relative pl-12 md:pl-0">
             <div className="absolute left-0 md:right-[-28px] md:left-auto top-0 w-14 h-14 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center z-10 shadow-sm">
              <Heart className="w-6 h-6 text-blue-500" />
            </div>
            <Card className="border-none shadow-xl shadow-stone-200/50 bg-white overflow-hidden">
              <div className="h-2 bg-blue-500" />
              <CardContent className="p-8">
                <h4 className="font-bold text-stone-900 mb-6 text-lg">Key Nutrients for Healing</h4>
                <div className="space-y-4">
                  {[
                    { label: "Protein", desc: "Tissue repair (Lentils, eggs, tofu)" },
                    { label: "Iron", desc: "Replenish blood loss (Greens, dates)" },
                    { label: "Vitamin C", desc: "Wound healing (Citrus, berries)" },
                    { label: "Hydration", desc: "Critical for energy & milk production" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-stone-50">
                      <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-stone-900 block">{item.label}</span>
                        <span className="text-sm text-stone-600">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="order-1 md:order-2 md:pl-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Nourishing Your Body</h2>
            <p className="text-stone-600 leading-relaxed mb-8">
              Focus on healing, not weight loss. Your body needs energy to recover and care for your baby.
            </p>
            <div className="space-y-4">
               <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-700 font-bold text-xs">V</div>
                  <div>
                    <h4 className="font-bold text-stone-900">Vegetarian</h4>
                    <p className="text-sm text-stone-600">Warm, cooked foods like khichdi, soups, and stews are gentle on digestion.</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-700 font-bold text-xs">NV</div>
                  <div>
                    <h4 className="font-bold text-stone-900">Non-Vegetarian</h4>
                    <p className="text-sm text-stone-600">Bone broths are excellent for collagen and mineral replenishment.</p>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Breastfeeding Support */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="md:pr-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Breastfeeding Nutrition</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              If breastfeeding, you need approx. 500 extra calories a day. Don't restrict food groups unless medically advised.
            </p>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
               <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                 <Coffee className="w-4 h-4" /> Foods to Limit
               </h4>
               <ul className="space-y-2 text-sm text-blue-800">
                 <li className="flex gap-2"><span>•</span> Excess caffeine (may cause jitters)</li>
                 <li className="flex gap-2"><span>•</span> Alcohol (time carefully or avoid)</li>
                 <li className="flex gap-2"><span>•</span> Highly processed snacks</li>
               </ul>
            </div>
          </div>
          <div className="relative pl-12 md:pl-0">
             <div className="absolute left-0 md:left-[-28px] top-0 w-14 h-14 bg-white border-4 border-indigo-100 rounded-full flex items-center justify-center z-10 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-indigo-500" />
            </div>
            <Card className="border-none shadow-xl shadow-stone-200/50 bg-white overflow-hidden">
              <div className="h-2 bg-indigo-500" />
              <CardContent className="p-8">
                <h4 className="font-bold text-stone-900 mb-4 text-lg">Support Tips</h4>
                <ul className="space-y-4">
                  {[
                    "Keep water and snacks near your nursing spot",
                    "Galactagogues: Oats, fenugreek, brewers yeast",
                    "Listen to hunger cues; they exist for a reason"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-600">
                      <Check className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Mental Wellness (Footer Style) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-900 rounded-[2.5rem] p-8 md:p-16 text-center text-stone-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <HeartHandshake className="w-16 h-16 text-rose-400 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Mental & Emotional Wellness</h2>
            <p className="text-lg text-stone-400 mb-8 leading-relaxed">
              "Baby Blues" are common, but if feelings of sadness persist beyond 2 weeks, it could be Postpartum Depression. You are not alone.
            </p>
            <div className="bg-stone-800/50 p-8 rounded-3xl border border-stone-700/50">
              <p className="text-white text-lg font-medium">
                Reach out to your village. Asking for help is a sign of strength, not weakness.
              </p>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
