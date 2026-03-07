"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Heart, Brain, Users, Sparkles, Clock, AlertTriangle, Shield, ArrowRight, Sun, Leaf, Battery, Zap, Activity, Link as LinkIcon, MessageCircle, Moon, Scale, DollarSign, Baby, Coffee, PenTool, Book, Smile, ShieldCheck, UserCheck } from "lucide-react";
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

      {/* SECTION 1: HERO */}
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
              Strengthening Your Relationship <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">Through Parenthood</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-stone-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Parenting places profound emotional and logistical pressure on couples. A strong partnership creates stability for the entire family. MotherEra provides guidance to help you maintain connection and resilience.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-32 relative z-10">
        
        {/* SECTION 2: WHY RELATIONSHIPS CHANGE */}
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
                Sleep deprivation erodes patience. Identity shifts create distance. The "mental load" of parenting can breed resentment. Understanding these forces is the first step to neutralizing them. These changes are common, manageable, and a normal part of the journey.
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

        {/* SECTION 3: RELATIONSHIP HEALTH CHECK */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="bg-stone-900 rounded-[2.5rem] p-10 md:p-16 text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500/20 rounded-full blur-[100px]" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-medium mb-8">Relationship Check-In</h2>
            <p className="text-stone-300 mb-10 text-lg">
              Regular reflection prevents drift. Ask yourselves these questions weekly to stay aligned.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {[
                "Do we feel heard by each other recently?",
                "Are parenting responsibilities balanced fairly?",
                "Are we making time for connection?",
                "Do we resolve disagreements respectfully?"
              ].map((q, i) => (
                <div key={i} className="bg-white/10 p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 text-rose-300 font-bold text-sm">{i+1}</div>
                  <span className="text-stone-200 font-light">{q}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 text-sm text-stone-400">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Stable Relationship</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400" /> Relationship Under Stress</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-400" /> Needs Attention</span>
            </div>
          </div>
        </motion.section>

        {/* SECTION 4: COMMON CHALLENGES */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-6">Common Relationship Challenges</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light">
              You are not alone. These hurdles are experienced by almost every couple navigating parenthood.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-3">Sleep Deprivation</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Lack of sleep shortens fuses. Emotional reactivity increases, leading to arguments over minor issues.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mb-6">
                <Scale className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-3">Unequal Load</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                One partner often carries more "invisible labor" (scheduling, emotional management), breeding resentment.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                <Baby className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-3">Parenting Styles</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Conflicts arise when one parent is stricter and the other more permissive regarding discipline or routines.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-3">Loss of Couple Time</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Conversations become purely logistical ("Did you buy diapers?"), eroding emotional intimacy.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-3">Financial Stress</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                New costs combined with potential income loss create pressure that spills over into the relationship.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* SECTION 5: CORE SKILLS */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MessageCircle, color: "text-rose-500", title: "Healthy Communication", desc: "Listening actively and expressing emotions clearly without blame.", strat: "Soft Startup" },
              { icon: Brain, color: "text-sky-500", title: "Emotional Regulation", desc: "Managing emotional triggers during conflict to prevent flooding.", strat: "The Pause" },
              { icon: LinkIcon, color: "text-amber-500", title: "Conflict Repair", desc: "The goal isn't to never fight; it's to repair quickly and apologize.", strat: "Repair Attempts" },
              { icon: Scale, color: "text-emerald-500", title: "Shared Responsibility", desc: "Balancing parenting roles and expectations fairly.", strat: "Fair Play" },
              { icon: Sparkles, color: "text-purple-500", title: "Connection Rituals", desc: "Small daily habits that maintain closeness like a 6-second hug.", strat: "Micro-Moments" }
            ].map((card, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">{card.title}</h3>
                <p className="text-stone-600 leading-relaxed text-sm mb-4">{card.desc}</p>
                <div className={`text-xs font-bold ${card.color.replace('text', 'text')} uppercase tracking-widest`}>Strategy: {card.strat}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 6: HEALTHY COMMUNICATION SCRIPTS */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-50 rounded-[2.5rem] p-10 md:p-16 border border-stone-100"
        >
          <h2 className="text-3xl font-serif font-medium text-stone-900 mb-10 text-center">Healthy Communication Scripts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">×</div>
                <h4 className="font-bold text-stone-900">Instead of Saying:</h4>
              </div>
              <p className="text-stone-500 italic mb-6">"You never help with the baby. I do everything around here."</p>
              <div className="h-px bg-stone-100 mb-6" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">✓</div>
                <h4 className="font-bold text-stone-900">Try Saying:</h4>
              </div>
              <p className="text-stone-800 font-medium">"I feel overwhelmed today and could really use help with the bedtime routine."</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">×</div>
                <h4 className="font-bold text-stone-900">Instead of Saying:</h4>
              </div>
              <p className="text-stone-500 italic mb-6">"Why are you always so grumpy when you get home?"</p>
              <div className="h-px bg-stone-100 mb-6" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">✓</div>
                <h4 className="font-bold text-stone-900">Try Saying:</h4>
              </div>
              <p className="text-stone-800 font-medium">"I miss connecting with you. Can we take 10 minutes to decompress together?"</p>
            </div>
          </div>
        </motion.section>

        {/* SECTION 7: WEEKLY RITUALS */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-12">Simple Rituals That Strengthen Relationships</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-[2rem] bg-rose-50/50 border border-rose-100">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600 font-bold">1</div>
              <h4 className="font-bold text-stone-900 mb-2">Daily 10-Min Check-In</h4>
              <p className="text-stone-600 text-sm">Share one high and one low from your day. No logistics allowed.</p>
            </div>
            <div className="p-6 rounded-[2rem] bg-purple-50/50 border border-purple-100">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 font-bold">2</div>
              <h4 className="font-bold text-stone-900 mb-2">Weekly Logistics Meeting</h4>
              <p className="text-stone-600 text-sm">Discuss schedules, responsibilities, and childcare planning to prevent chaos.</p>
            </div>
            <div className="p-6 rounded-[2rem] bg-amber-50/50 border border-amber-100">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 font-bold">3</div>
              <h4 className="font-bold text-stone-900 mb-2">Appreciation Practice</h4>
              <p className="text-stone-600 text-sm">Share one thing you appreciate about your partner each week.</p>
            </div>
          </div>
        </motion.section>

        {/* SECTION 8: PARENT BURNOUT */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-900 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[120px]" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-medium mb-6">Parent Burnout & Relationship Protection</h2>
              <p className="text-stone-300 mb-6 leading-relaxed">
                Burnout isn't just being tired; it's emotional exhaustion that kills empathy. When you are empty, you cannot give to your partner.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3 items-center text-stone-200">
                  <Battery className="w-5 h-5 text-rose-400" /> Recognize signs: irritability, detachment, numbness.
                </li>
                <li className="flex gap-3 items-center text-stone-200">
                  <Shield className="w-5 h-5 text-rose-400" /> Protect each other: Offer "tap out" breaks without guilt.
                </li>
                <li className="flex gap-3 items-center text-stone-200">
                  <Heart className="w-5 h-5 text-rose-400" /> Prevent resentment: Acknowledge the invisible load.
                </li>
              </ul>
            </div>
            <div className="bg-white/10 p-8 rounded-3xl border border-white/10">
              <h4 className="font-bold text-white mb-4">Practical Strategy: The "Tap Out"</h4>
              <p className="text-stone-300 text-sm mb-4">
                Create a safe word or signal that means "I am at my limit and need 20 minutes alone." When used, the other partner steps in immediately, no questions asked.
              </p>
              <div className="inline-block bg-rose-500/20 text-rose-300 text-xs font-bold px-3 py-1 rounded-full">
                Prevents Meltdowns
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 9: ROADMAP */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-6">The Parenthood Relationship Roadmap</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">How your partnership evolves through the stages.</p>
          </div>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {[
              { stage: "Pregnancy", focus: "Preparation", desc: "Preparing emotionally and practically. Discussing expectations for roles and parenting styles." },
              { stage: "First Year", focus: "Survival & Adjustment", desc: "Navigating sleep deprivation. Prioritizing non-sexual intimacy and dividing care tasks." },
              { stage: "Early Childhood", focus: "Balancing Acts", desc: "Managing tantrums and routines. Finding pockets of time for couple connection." },
              { stage: "School Years", focus: "Alignment", desc: "Aligning on education, social values, and discipline. Supporting each other's careers." },
              { stage: "Teen Years", focus: "Independence", desc: "Supporting independence while presenting a united front. Rediscovering shared interests." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 p-6 bg-white border border-stone-100 rounded-2xl shadow-sm items-center">
                <div className="w-32 text-center md:text-left shrink-0 font-bold text-rose-500 uppercase tracking-widest text-xs">{item.stage}</div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-stone-900 mb-1">{item.focus}</h4>
                  <p className="text-stone-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 10: EXPERT APPROACHES */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 border border-stone-200 shadow-sm"
        >
          <h2 className="text-3xl font-serif font-medium text-stone-900 mb-10 text-center">Expert Relationship Approaches</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm">
              <h3 className="font-bold text-stone-900 mb-3">Emotionally Focused Therapy (EFT)</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Focuses on emotional bonding. Helps couples identify negative cycles ("The more I push, the more you withdraw") and create secure attachment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm">
              <h3 className="font-bold text-stone-900 mb-3">Gottman Method</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Research-based. Teaches specific skills to manage conflict, build friendship, and create shared meaning. Famous for the "Magic Ratio" of 5:1 positive interactions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm">
              <h3 className="font-bold text-stone-900 mb-3">Perinatal-Informed Therapy</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Specialized support for the transition to parenthood, addressing postpartum mood disorders, birth trauma, and identity shifts.
              </p>
            </div>
          </div>
        </motion.section>

        {/* SECTION 11: TOOLKIT */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-10">Relationship Toolkit</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-stone-100 p-6 rounded-2xl flex flex-col items-center gap-3 hover:bg-stone-200 transition-colors cursor-pointer">
              <PenTool className="w-6 h-6 text-stone-600" />
              <span className="font-bold text-stone-700 text-sm">Weekly Check-In</span>
            </div>
            <div className="bg-stone-100 p-6 rounded-2xl flex flex-col items-center gap-3 hover:bg-stone-200 transition-colors cursor-pointer">
              <ShieldCheck className="w-6 h-6 text-stone-600" />
              <span className="font-bold text-stone-700 text-sm">Conflict Repair Checklist</span>
            </div>
            <div className="bg-stone-100 p-6 rounded-2xl flex flex-col items-center gap-3 hover:bg-stone-200 transition-colors cursor-pointer">
              <Clock className="w-6 h-6 text-stone-600" />
              <span className="font-bold text-stone-700 text-sm">Responsibility Planner</span>
            </div>
            <div className="bg-stone-100 p-6 rounded-2xl flex flex-col items-center gap-3 hover:bg-stone-200 transition-colors cursor-pointer">
              <Smile className="w-6 h-6 text-stone-600" />
              <span className="font-bold text-stone-700 text-sm">Appreciation Practice</span>
            </div>
          </div>
        </motion.section>

        {/* SECTION 12: STORIES */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-rose-50/50 rounded-[2.5rem] p-10 md:p-16 border border-rose-100"
        >
          <h2 className="text-3xl font-serif font-medium text-stone-900 mb-10 text-center">Real Experiences</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm relative">
              <div className="absolute top-6 left-6 text-4xl text-rose-200 font-serif">“</div>
              <p className="text-stone-600 italic mb-4 relative z-10 pt-4">
                We didn't realize how much we were keeping score until we tried the Weekly Logistics Meeting. Just getting it all on paper stopped the daily bickering.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-xs font-bold text-rose-600">J</div>
                <span className="text-sm font-bold text-stone-900">James & Sarah, Parents of 2</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm relative">
              <div className="absolute top-6 left-6 text-4xl text-rose-200 font-serif">“</div>
              <p className="text-stone-600 italic mb-4 relative z-10 pt-4">
                The 'Soft Startup' changed everything. Instead of attacking him the moment he walked in, I learned to say 'I need help' and he actually listened.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-xs font-bold text-rose-600">M</div>
                <span className="text-sm font-bold text-stone-900">Maria, Mom of a Newborn</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 13: CTA */}
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