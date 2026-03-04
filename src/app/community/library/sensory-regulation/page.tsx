"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, Zap, CloudRain, Activity, Home, School, Layout, Smile } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function SensoryRegulationPage() {
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
              <Activity className="w-4 h-4" />
              <span>Sensory Processing & Regulation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Sensory Regulation
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Behavior is often a response to sensory input. Learn to decode your child's sensory signals and build an environment where they can thrive.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-24">
        
        {/* Section 1: Understanding Sensory Profiles */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">The "Cup" Analogy</h2>
            <div className="prose prose-stone text-stone-600">
              <p className="mb-4">
                Imagine every child has a "sensory cup."
              </p>
              <p className="mb-4">
                <strong>Sensory Avoiders</strong> have a tiny cup. It overflows quickly with just a little noise, light, or touch, causing a meltdown (Fight/Flight).
              </p>
              <p>
                <strong>Sensory Seekers</strong> have a massive cup with a hole in the bottom. They constantly need movement, crashing, and intense input just to feel "normal" and regulated.
              </p>
              <p>
                Most neurodiverse children are a mix of both, depending on the sense.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm relative">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
              COMMON TRIGGERS
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Zap className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Vestibular (Movement)</h4>
                  <p className="text-sm text-stone-500">Sense of balance. Seekers spin/rock; avoiders fear feet leaving the ground.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Layout className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Proprioception (Body Position)</h4>
                  <p className="text-sm text-stone-500">The "grounding" sense. Heavy work (pushing, pulling) is almost always calming for everyone.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Section 2: Regulation Strategies */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Regulation Toolkit</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Tools to help manage the "overflow" or fill the cup.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6">
                <Home className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">At Home</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Heavy Work:</strong> Carrying groceries, pushing a laundry basket.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Calm Corner:</strong> A tent or corner with low light and soft pillows.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Visuals:</strong> Reduce visual clutter to lower anxiety.</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6">
                <School className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">At School</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Movement Breaks:</strong> Permission to walk to the water fountain.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Fidgets:</strong> Silent tools (putty, velcro) for desk work.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Transitions:</strong> Warnings before bells or loud changes.</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6">
                <CloudRain className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Meltdown Management</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Safety First:</strong> Move to a safe, quiet spot.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Less Talk:</strong> Language processing shuts down. Use few words.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> <strong>Co-Regulation:</strong> Lend them your calm nervous system.</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 3: The Path to Self-Regulation */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-50 rounded-[2rem] p-10 border border-stone-100"
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8">From Co-Regulation to Self-Regulation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                <Smile className="w-5 h-5 text-rose-500" /> The Goal
              </h3>
              <p className="text-sm text-stone-600 mb-4">
                We want children to eventually recognize their own body signals ("I feel jittery") and choose a tool ("I need to jump") without adult prompting. This takes years of practice.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                <Activity className="w-5 h-5 text-rose-500" /> The Sensory Diet
              </h3>
              <p className="text-sm text-stone-600 mb-4">
                A "Sensory Diet" is a personalized schedule of sensory activities provided throughout the day to keep the nervous system balanced, preventing the cup from overflowing.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Parent Toolkit */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Build Your Sensory Toolkit</h2>
            <p className="text-stone-300 mb-8 max-w-xl mx-auto">
              Start simply. You don't need expensive equipment to make a difference.
            </p>
            
            <div className="text-left max-w-2xl mx-auto bg-stone-800/50 p-6 rounded-xl border border-stone-700 mb-8">
              <h4 className="font-bold mb-4 text-rose-400">Quick Wins:</h4>
              <ul className="space-y-3 text-sm text-stone-300">
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-rose-500 flex items-center justify-center text-xs">1</div>
                  <span>Observe: For 3 days, track when meltdowns happen. Is it loud? Crowded? Transition time?</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-rose-500 flex items-center justify-center text-xs">2</div>
                  <span>Create a "Crash Pad": A pile of pillows or beanbags for safe jumping/crashing.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-rose-500 flex items-center justify-center text-xs">3</div>
                  <span>Hydration: Drinking water through a straw provides calming oral input.</span>
                </li>
              </ul>
            </div>

            <Link href="/community/neurodiversity">
              <Button size="lg" className="rounded-full bg-white text-stone-900 hover:bg-stone-100 gap-2">
                <ArrowRight className="w-4 h-4" /> Return to Community
              </Button>
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
