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
    <div className="flex flex-col min-h-screen bg-[#FDFCF8] selection:bg-rose-100 selection:text-rose-900 font-sans">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-rose-100/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-100/30 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow delay-1000" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto"
          >
            <Link href="/community/neurodiversity">
              <Button variant="ghost" className="mb-8 rounded-full text-stone-500 hover:text-stone-900 hover:bg-white/50">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Library
              </Button>
            </Link>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/60 text-stone-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
              <Activity className="w-3 h-3 text-rose-500" />
              <span>Deep Dive Series</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-stone-900 mb-8 leading-[1.1] tracking-tight">
              Sensory Regulation
            </h1>
            <p className="text-xl md:text-2xl font-light text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Behavior is often a response to sensory input. Learn to decode your child's signals and build an environment where they can thrive.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-32">
        
        {/* Section 1: Understanding Sensory Profiles */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-8">The "Cup" Analogy</h2>
            <div className="prose prose-lg prose-stone text-stone-600">
              <p className="mb-6">
                Imagine every child has a <span className="font-medium text-stone-900 bg-rose-50 px-1 rounded">sensory cup</span>.
              </p>
              <p className="mb-6">
                <strong>Sensory Avoiders</strong> have a tiny cup. It overflows quickly with just a little noise, light, or touch, causing a meltdown (Fight/Flight).
              </p>
              <p>
                <strong>Sensory Seekers</strong> have a massive cup with a hole in the bottom. They constantly need movement, crashing, and intense input just to feel "normal" and regulated.
              </p>
              <p className="mt-6 text-sm text-stone-400 italic">
                Most neurodiverse children are a mix of both, depending on the sense.
              </p>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
            <div className="absolute top-0 right-0 bg-rose-100/80 backdrop-blur-sm text-rose-900 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-bl-2xl rounded-tr-[2rem]">
              Common Triggers
            </div>
            <ul className="space-y-8 mt-4">
              <li className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">Vestibular (Movement)</h4>
                  <p className="text-stone-500 leading-relaxed">Sense of balance. Seekers spin/rock; avoiders fear feet leaving the ground.</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                  <Layout className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">Proprioception (Body Position)</h4>
                  <p className="text-stone-500 leading-relaxed">The "grounding" sense. Heavy work (pushing, pulling) is almost always calming for everyone.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Section 2: Regulation Strategies */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-6">Regulation Toolkit</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light">
              Tools to help manage the "overflow" or fill the cup.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-colors duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <Home className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">At Home</h3>
              <ul className="space-y-4 text-stone-600">
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed"><strong>Heavy Work:</strong> Carrying groceries, pushing a laundry basket.</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed"><strong>Calm Corner:</strong> A tent or corner with low light and soft pillows.</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed"><strong>Visuals:</strong> Reduce visual clutter to lower anxiety.</span></li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-colors duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <School className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">At School</h3>
              <ul className="space-y-4 text-stone-600">
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed"><strong>Movement Breaks:</strong> Permission to walk to the water fountain.</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed"><strong>Fidgets:</strong> Silent tools (putty, velcro) for desk work.</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed"><strong>Transitions:</strong> Warnings before bells or loud changes.</span></li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-colors duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <CloudRain className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">Meltdown Management</h3>
              <ul className="space-y-4 text-stone-600">
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed"><strong>Safety First:</strong> Move to a safe, quiet spot.</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed"><strong>Less Talk:</strong> Language processing shuts down. Use few words.</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed"><strong>Co-Regulation:</strong> Lend them your calm nervous system.</span></li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 3: The Path to Self-Regulation */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 border border-stone-200 shadow-sm"
        >
          <h2 className="text-3xl font-serif font-medium text-stone-900 mb-10 text-center">From Co-Regulation to Self-Regulation</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
              <h3 className="font-serif font-bold text-stone-900 mb-4 flex items-center gap-3 text-xl">
                <div className="p-2 bg-rose-50 rounded-full"><Smile className="w-5 h-5 text-rose-500" /></div>
                The Goal
              </h3>
              <p className="text-stone-600 leading-relaxed">
                We want children to eventually recognize their own body signals ("I feel jittery") and choose a tool ("I need to jump") without adult prompting. This takes years of practice.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
              <h3 className="font-serif font-bold text-stone-900 mb-4 flex items-center gap-3 text-xl">
                <div className="p-2 bg-rose-50 rounded-full"><Activity className="w-5 h-5 text-rose-500" /></div>
                The Sensory Diet
              </h3>
              <p className="text-stone-600 leading-relaxed">
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
          className="bg-stone-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-medium mb-6">Build Your Sensory Toolkit</h2>
            <p className="text-stone-300 mb-12 text-lg font-light">
              Start simply. You don't need expensive equipment to make a difference.
            </p>
            
            <div className="text-left bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 mb-12">
              <h4 className="font-bold mb-6 text-rose-300 uppercase tracking-widest text-xs">Quick Wins</h4>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full border border-rose-400 flex items-center justify-center text-xs font-bold text-rose-300 shrink-0">1</div>
                  <span className="text-stone-200 font-light text-lg">Observe: For 3 days, track when meltdowns happen. Is it loud? Crowded? Transition time?</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full border border-rose-400 flex items-center justify-center text-xs font-bold text-rose-300 shrink-0">2</div>
                  <span className="text-stone-200 font-light text-lg">Create a "Crash Pad": A pile of pillows or beanbags for safe jumping/crashing.</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full border border-rose-400 flex items-center justify-center text-xs font-bold text-rose-300 shrink-0">3</div>
                  <span className="text-stone-200 font-light text-lg">Hydration: Drinking water through a straw provides calming oral input.</span>
                </li>
              </ul>
            </div>

            <Link href="/community/neurodiversity">
              <Button size="lg" className="rounded-full h-14 px-10 bg-white text-stone-900 hover:bg-stone-100 gap-2 shadow-xl hover:shadow-2xl transition-all">
                <ArrowRight className="w-4 h-4 rotate-180" /> Return to Community
              </Button>
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
