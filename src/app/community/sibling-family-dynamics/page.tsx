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
      <section className="relative py-20 md:py-32 overflow-hidden bg-rose-50/50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-100/40 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200 text-rose-700 text-sm font-medium mb-6 shadow-sm">
              <Users className="w-4 h-4" />
              <span>Whole Family Health</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Sibling & Family Dynamics — <br/>
              <span className="text-rose-600">Balance for Everyone</span>
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Strategies to support siblings, manage household equilibrium, and ensure every family member feels seen and valued.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/community/neurodiverse-families">
                <Button size="lg" className="rounded-full h-12 px-8 text-base bg-stone-900 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all">
                  Join Our Community
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-stone-300 hover:bg-white hover:text-stone-900">
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
            "Sibling-mediated interventions not only help the neurodiverse child learn social skills but significantly improve the sibling's sense of competence and relationship quality. Studies indicate that structured sibling involvement can reduce family stress and improve the psychological well-being of neurotypical siblings by giving them a defined, positive role (Ferraioli & Harris, 2011)."
          </p>
          <p className="mt-2 text-xs text-stone-400">Source: Research on sibling-mediated intervention outcomes (Ferraioli & Harris, 2011; Shivers & Plavnick, 2014).</p>
        </motion.section>

      </div>
    </div>
  );
}
