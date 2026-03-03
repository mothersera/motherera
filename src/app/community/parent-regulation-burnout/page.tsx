"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Battery, Coffee, Sun, Shield, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ParentRegulationBurnoutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-rose-50/50 border-b border-rose-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Battery className="w-3 h-3" />
              <span>Micro Self-Care</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
              Parent Regulation — <br/>
              <span className="text-rose-600">Burnout Prevention</span>
            </h1>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              You cannot pour from an empty cup. Evidence-based strategies to manage caregiver stress, regulate your nervous system, and build sustainable resilience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/five-minute-reset">
                <Button size="lg" className="rounded-full bg-stone-900 text-white hover:bg-stone-800">
                  Start Five-Minute Reset
                </Button>
              </Link>
              <Link href="/community/neurodiverse-families">
                <Button size="lg" variant="outline" className="rounded-full border-stone-300 hover:bg-white">
                  Join Support Group
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-16">
        
        {/* Why Regulation Matters */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">The Science of Co-Regulation</h2>
          <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
            <p className="text-stone-700 leading-relaxed mb-4">
              Caregiver stress is the strongest predictor of family functioning. Research shows that children co-regulate with their parents; a calm caregiver provides a biological "anchor" for a child's nervous system. Chronic parental burnout is linked to higher rates of child behavioral challenges, creating a cycle that can only be broken by supporting the parent first (Hastings et al., 2005).
            </p>
            <div className="flex items-center gap-4 bg-rose-50 p-4 rounded-xl">
              <Shield className="w-6 h-6 text-rose-500 shrink-0" />
              <p className="text-sm font-medium text-rose-800">Self-care is not selfish. It is a strategic parenting tool.</p>
            </div>
            <p className="mt-4 text-xs text-stone-400 italic">Source: "Systems analysis of stress and positive perceptions in mothers and fathers of pre-school children with autism" (Hastings et al., 2005).</p>
          </div>
        </motion.section>

        {/* Micro Practices */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Daily Micro-Practices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white border-stone-100">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center mb-2">
                  <Coffee className="w-5 h-5 text-sky-500" />
                </div>
                <CardTitle className="text-lg font-bold">The Morning Anchor</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600">
                Before the chaos starts, take 2 minutes to drink water and breathe. Set one intention for the day.
              </CardContent>
            </Card>
            <Card className="bg-white border-stone-100">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center mb-2">
                  <Sun className="w-5 h-5 text-amber-500" />
                </div>
                <CardTitle className="text-lg font-bold">Sensory Reset</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600">
                Step outside, feel the sun, or wash your hands with cold water to physically reset your nervous system.
              </CardContent>
            </Card>
            <Card className="bg-white border-stone-100">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center mb-2">
                  <Check className="w-5 h-5 text-rose-500" />
                </div>
                <CardTitle className="text-lg font-bold">The "Done" List</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600">
                Instead of a to-do list, write down 3 things you <em>did</em> do today. Celebrate survival.
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Resources & Plan */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-100 rounded-3xl p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-2">Build Your Resilience Plan</h2>
              <p className="text-stone-600 text-sm max-w-md">
                Download our template to map out your support network, emergency contacts, and personal joy triggers.
              </p>
            </div>
            <Button className="rounded-full gap-2 bg-stone-900 hover:bg-stone-800">
              <Download className="w-4 h-4" /> Download Plan PDF
            </Button>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
