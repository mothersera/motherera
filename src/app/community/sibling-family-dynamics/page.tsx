"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Users, Heart, Sparkles, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function SiblingFamilyDynamicsPage() {
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
              <Users className="w-3 h-3" />
              <span>Whole Family Health</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
              Sibling & Family Dynamics — <br/>
              <span className="text-rose-600">Balance for Everyone</span>
            </h1>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              Strategies to support siblings, manage household equilibrium, and ensure every family member feels seen and valued.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/community/neurodiverse-families">
                <Button size="lg" className="rounded-full bg-stone-900 text-white hover:bg-stone-800">
                  Join Our Community
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="rounded-full border-stone-300 hover:bg-white">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-16">
        
        {/* Sibling Impacts */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Understanding the Sibling Experience</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
              <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" /> Common Challenges
              </h3>
              <ul className="space-y-2 text-stone-600 text-sm">
                <li>• Feeling "less important" or invisible</li>
                <li>• Pressure to be the "easy" child</li>
                <li>• Anxiety about future caregiving roles</li>
                <li>• Guilt over their own abilities</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
              <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-500" /> Unique Strengths
              </h3>
              <ul className="space-y-2 text-stone-600 text-sm">
                <li>• High levels of empathy & patience</li>
                <li>• Maturity beyond their years</li>
                <li>• Advocacy skills for others</li>
                <li>• Deep loyalty and protective instincts</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Practical Strategies */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Practical Family Strategies</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-white border border-stone-200 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-bold shrink-0">1</div>
              <div>
                <h4 className="font-bold text-stone-800">Scheduled 1:1 Time</h4>
                <p className="text-stone-600 text-sm">Even 15 minutes of undivided attention ("special time") per week can dramatically reduce resentment.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-white border border-stone-200 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-bold shrink-0">2</div>
              <div>
                <h4 className="font-bold text-stone-800">Age-Appropriate Information</h4>
                <p className="text-stone-600 text-sm">Explain the diagnosis clearly. Confusion breeds anxiety. Use books and simple language.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-white border border-stone-200 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-bold shrink-0">3</div>
              <div>
                <h4 className="font-bold text-stone-800">Safe Spaces</h4>
                <p className="text-stone-600 text-sm">Ensure siblings have a physical space (room, desk) that is off-limits to others to protect their belongings.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="gap-2 rounded-full">
              <Download className="w-4 h-4" /> Download Family Coping Guide
            </Button>
          </div>
        </motion.section>

        {/* Evidence Note */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-100 p-6 rounded-2xl"
        >
          <p className="text-stone-700 text-sm italic">
            "Sibling-mediated interventions not only help the neurodiverse child learn social skills but significantly improve the sibling's sense of competence and relationship quality."
          </p>
          <p className="mt-2 text-xs text-stone-400">Source: Research on sibling-mediated intervention outcomes.</p>
        </motion.section>

      </div>
    </div>
  );
}
