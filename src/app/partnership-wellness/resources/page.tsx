"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Heart, Brain, Users, Sparkles, Clock, AlertTriangle, Shield, ArrowRight, Sun, Leaf, Battery, Zap, Activity, Link as LinkIcon, MessageCircle, Moon, Scale } from "lucide-react";
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

export default function RelationshipResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCF8] selection:bg-rose-100 selection:text-rose-900 font-sans">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-rose-100/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-sky-100/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/60 text-stone-600 text-xs font-medium uppercase tracking-widest mb-8 shadow-sm">
              <Heart className="w-3 h-3 text-rose-500" />
              <span>Relationship Knowledge Hub</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-stone-900 mb-8 leading-[1.1] tracking-tight">
              Strengthening Your Partnership <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">Through Parenthood</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-stone-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Parenting places profound emotional and logistical strain on relationships. A strong partnership is not a luxury — it is the emotional foundation for your entire family.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-32 relative z-10">
        
        {/* Section 2: Why Relationships Change */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-8">The "New Normal" Challenge</h2>
            <div className="prose prose-lg prose-stone text-stone-600">
              <p className="mb-6">
                After childbirth, relationship satisfaction often dips. This is not a sign of failure; it is a sign of transition. The "couple bubble" expands to include a demanding third party.
              </p>
              <p>
                Sleep deprivation erodes patience. Identity shifts create distance. The "mental load" of parenting can breed resentment. Understanding these forces is the first step to neutralizing them.
              </p>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/50 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-[40px]" />
             <ul className="space-y-6 relative z-10">
               <li className="flex gap-5">
                 <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                   <Moon className="w-6 h-6 text-stone-700" />
                 </div>
                 <div>
                   <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">Sleep Deprivation</h4>
                   <p className="text-stone-500 leading-relaxed">Reduces emotional regulation, making small conflicts feel catastrophic.</p>
                 </div>
               </li>
               <li className="flex gap-5">
                 <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                   <Scale className="w-6 h-6 text-stone-700" />
                 </div>
                 <div>
                   <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">Role Imbalance</h4>
                   <p className="text-stone-500 leading-relaxed">The shift from "partners" to "manager/helper" dynamic creates distance.</p>
                 </div>
               </li>
             </ul>
          </div>
        </motion.section>

        {/* Section 3: Core Relationship Skills */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-6">Core Relationship Skills</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light">
              Love is an action. These foundational skills help you weather the storms of early parenthood.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <MessageCircle className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Healthy Communication</h3>
              <p className="text-stone-600 leading-relaxed text-sm mb-4">
                Replace criticism ("You never help") with specific requests ("I need you to take the baby for 20 mins").
              </p>
              <div className="text-xs font-bold text-rose-600 uppercase tracking-widest">Strategy: Soft Startup</div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Brain className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Emotional Regulation</h3>
              <p className="text-stone-600 leading-relaxed text-sm mb-4">
                When flooded with anger, nothing productive happens. Take a 20-minute break to lower your heart rate.
              </p>
              <div className="text-xs font-bold text-sky-600 uppercase tracking-widest">Strategy: The Pause</div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <LinkIcon className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Conflict Repair</h3>
              <p className="text-stone-600 leading-relaxed text-sm mb-4">
                The goal isn't to never fight; it's to repair quickly. Apologize for your part, even if small.
              </p>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-widest">Strategy: Repair Attempts</div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Connection Rituals</h3>
              <p className="text-stone-600 leading-relaxed text-sm mb-4">
                Small habits maintain the bond. A 6-second hug releases oxytocin and reduces stress.
              </p>
              <div className="text-xs font-bold text-purple-600 uppercase tracking-widest">Strategy: Micro-Moments</div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 4: After Baby Relationship Shifts */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 border border-stone-200 shadow-sm"
        >
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-serif font-bold text-stone-900 mb-4 text-2xl">Identity Changes</h3>
              <p className="text-stone-600 leading-relaxed">
                You are both becoming new people. The "old you" is gone, and the "new you" is under construction. Be curious about who your partner is becoming, rather than critical that they've changed.
              </p>
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 mb-4 text-2xl">Emotional Exhaustion</h3>
              <p className="text-stone-600 leading-relaxed">
                When you are "touched out" and emotionally drained, you have little left for a partner. Acknowledge this openly: "I love you, but I have zero capacity right now."
              </p>
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 mb-4 text-2xl">Intimacy Shifts</h3>
              <p className="text-stone-600 leading-relaxed">
                Sex may be off the table for a while, but intimacy shouldn't be. Focus on non-sexual touch (hand holding, back rubs) to keep the physical bridge open without pressure.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 5: Navigating Conflict */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div className="order-2 md:order-1 bg-stone-900 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-rose-500/20 rounded-full blur-[100px]" />
             <div className="relative z-10">
               <h3 className="font-serif font-bold text-2xl mb-6">The "Team" Framework</h3>
               <p className="text-stone-300 mb-8 leading-relaxed">
                 Stop facing each other as enemies. Face the problem together as a team.
               </p>
               <div className="space-y-4">
                 <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                   <p className="font-bold text-rose-300 text-sm mb-1">Instead of:</p>
                   <p className="text-stone-300 italic">"You never help with bedtime."</p>
                 </div>
                 <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                   <p className="font-bold text-emerald-300 text-sm mb-1">Try:</p>
                   <p className="text-stone-300 italic">"I'm exhausted by bedtime. Can we make a plan together so I can get a break tonight?"</p>
                 </div>
               </div>
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-8">Navigating Conflict</h2>
            <div className="prose prose-lg prose-stone text-stone-600">
              <p className="mb-6">
                Parenting disagreements are inevitable. You will disagree on discipline, safety, and sleep training.
              </p>
              <p>
                The key is <strong>deciding who owns the decision</strong>. If one parent does 90% of the bedtime routine, their method should likely prevail. Pick your battles based on who carries the load for that specific task.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 6: Rebuilding Connection */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-12">Rebuilding Connection</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-[2rem] bg-rose-50/50 border border-rose-100">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600 font-bold">1</div>
              <h4 className="font-bold text-stone-900 mb-2">Weekly Check-in</h4>
              <p className="text-stone-600 text-sm">15 mins/week. Logistics first, then emotional needs. "How is your tank?"</p>
            </div>
            <div className="p-6 rounded-[2rem] bg-purple-50/50 border border-purple-100">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 font-bold">2</div>
              <h4 className="font-bold text-stone-900 mb-2">No-Kid Talk</h4>
              <p className="text-stone-600 text-sm">Commit to 10 mins/day talking about anything <em>except</em> the baby or chores.</p>
            </div>
            <div className="p-6 rounded-[2rem] bg-amber-50/50 border border-amber-100">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 font-bold">3</div>
              <h4 className="font-bold text-stone-900 mb-2">Appreciation</h4>
              <p className="text-stone-600 text-sm">Notice the invisible labor. "Thank you for handling the doctor appointment."</p>
            </div>
          </div>
        </motion.section>

        {/* Section 7: Professional Support */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-10 border border-stone-200 shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center shrink-0">
              <Shield className="w-8 h-8 text-stone-500" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">When to Seek Support</h2>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Therapy isn't just for crises. It's a tool for growth. Consider <strong>Emotionally Focused Therapy (EFT)</strong> or the <strong>Gottman Method</strong> if you feel stuck in repetitive loops of conflict or disconnection.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white rounded-full text-xs font-bold text-stone-500 border border-stone-100">EFT</span>
                <span className="px-4 py-2 bg-white rounded-full text-xs font-bold text-stone-500 border border-stone-100">Gottman Method</span>
                <span className="px-4 py-2 bg-white rounded-full text-xs font-bold text-stone-500 border border-stone-100">Perinatal Therapy</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 8: Toolkit & CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center py-20"
        >
           <h2 className="text-4xl md:text-6xl font-serif font-medium text-stone-900 mb-8">Invest in Us.</h2>
           <p className="text-lg text-stone-600 mb-12 max-w-2xl mx-auto">
             Your relationship is the soil in which your family grows. Keep it healthy.
           </p>
           <Button size="lg" className="rounded-full h-16 px-12 text-xl bg-stone-900 hover:bg-stone-800 text-white shadow-2xl hover:-translate-y-1 transition-all duration-300">
             Join a Partnership Circle
           </Button>
        </motion.section>

      </div>
    </div>
  );
}