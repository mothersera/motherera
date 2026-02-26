"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Heart, Brain, Users, Sparkles, Clock, AlertTriangle, Shield, ArrowRight, Sun, Leaf, Battery, Zap, Activity, Link as LinkIcon, MessageCircle } from "lucide-react";
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

export default function PartnershipWellnessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-rose-50/50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-sky-100/40 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200 text-rose-700 text-sm font-medium mb-6 shadow-sm">
              <Users className="w-4 h-4" />
              <span>Relationship Resilience</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Partnership <br/>
              <span className="text-rose-600">Wellness</span>
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-4 max-w-2xl mx-auto">
              Strengthening your relationship through pregnancy, childbirth, and early parenthood.
            </p>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              The transition into parenthood is one of the most profound emotional and relational shifts a couple will ever experience. While childbirth brings joy and meaning, it also introduces stress, exhaustion, identity changes, and communication strain. Partnership Wellness is designed to help couples move from survival mode to intentional connection — protecting the relationship while welcoming new life.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
        
        {/* Section 1: The Childbirth Transition */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-x-12 gap-y-12 items-center"
        >
          <div className="md:col-span-1">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">The Childbirth Transition: A Shared Journey</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Childbirth is not an individual event — it is a relational transformation. While the physical experience belongs primarily to one partner, the emotional and psychological journey is shared.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6 font-medium italic border-l-4 border-rose-200 pl-4">
              When couples approach this as a team — rather than two individuals coping separately — resilience increases significantly.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 h-full">
              <h3 className="text-xl font-bold text-stone-900 mb-6">Key Phases & Impact</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-rose-600 text-sm uppercase tracking-wider mb-2">Pregnancy</h4>
                  <ul className="text-sm text-stone-600 space-y-1">
                    <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-rose-400 rounded-full"/>Hormonal changes & identity shifts</li>
                    <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-rose-400 rounded-full"/>Anxiety about the future</li>
                    <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-rose-400 rounded-full"/>Changing physical intimacy</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-rose-600 text-sm uppercase tracking-wider mb-2">Labour & Birth</h4>
                  <ul className="text-sm text-stone-600 space-y-1">
                    <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-rose-400 rounded-full"/>Heightened stress & vulnerability</li>
                    <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-rose-400 rounded-full"/>Need for advocacy</li>
                    <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-rose-400 rounded-full"/>Risk of birth trauma</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-rose-600 text-sm uppercase tracking-wider mb-2">Postpartum</h4>
                  <ul className="text-sm text-stone-600 space-y-1">
                    <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-rose-400 rounded-full"/>Sleep deprivation & identity erosion</li>
                    <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-rose-400 rounded-full"/>Unequal labour division</li>
                    <li className="flex gap-2 items-center"><div className="w-1 h-1 bg-rose-400 rounded-full"/>Reduced couple time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Emotional Support for Both Partners */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-stone-100"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Emotional Support for Both Partners</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Emotional support must be reciprocal. A supported partner is better able to support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
                <h3 className="font-bold text-rose-800 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" /> Birthing Partner Needs
                </h3>
                <ul className="space-y-3">
                  {[
                    "Validation without minimisation",
                    "Reassurance of love and attraction",
                    "Presence without distraction",
                    "Emotional safety to express fear",
                    "Confidence that partner is engaged"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm text-stone-700">
                      <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-sky-50/50 p-6 rounded-2xl border border-sky-100">
                <h3 className="font-bold text-sky-800 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" /> Non-Birthing Partner Needs
                </h3>
                <ul className="space-y-3">
                  {[
                    "Space to express fear or helplessness",
                    "Recognition of emotional experience",
                    "Inclusion in bonding",
                    "Support against suppression of stress",
                    "Awareness of postnatal depression risks"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm text-stone-700">
                      <Check className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="text-center bg-stone-50 p-6 rounded-xl border border-stone-100">
              <h4 className="font-bold text-stone-900 mb-2">Daily Practice</h4>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-stone-600">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5-min emotional check-in</span>
                <span className="hidden md:inline text-stone-300">•</span>
                <span>Reflective listening</span>
                <span className="hidden md:inline text-stone-300">•</span>
                <span>Explicit requests</span>
                <span className="hidden md:inline text-stone-300">•</span>
                <span>Appreciation</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Communication Framework */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Communication Framework for High-Stress Periods</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Common breakdowns include assumptions, criticism, and stonewalling. Here are constructive tools to rebuild connection.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: MessageCircle, title: "Soft Startup", desc: "“I feel overwhelmed when…” instead of “You never…”" },
              { icon: Activity, title: "Repair Attempts", desc: "Humour, touch, pause, reset when tension rises." },
              { icon: LinkIcon, title: "State of Union", desc: "Weekly dedicated conversation about the relationship — not logistics." },
              { icon: Heart, title: "Clear Bids", desc: "Explicitly asking for connection: “I need reassurance right now.”" }
            ].map((item, i) => (
              <Card key={i} className="border-stone-100 shadow-md hover:shadow-lg transition-shadow bg-white h-full">
                <CardHeader className="text-center pb-2">
                  <div className="w-12 h-12 mx-auto bg-rose-50 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-rose-500" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-stone-600">
                  {item.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Section 4 & 5: Postpartum Strategy & Intimacy */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-x-12 gap-y-12"
        >
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Postpartum Relationship Protection</h2>
            <p className="text-stone-600 mb-6">
              Research shows relationship satisfaction declines for many couples after childbirth — but it is preventable with intention.
            </p>
            <div className="bg-stone-50 p-6 rounded-2xl border-l-4 border-stone-800">
              <h4 className="font-bold text-stone-900 mb-3">Protective Behaviours</h4>
              <ul className="space-y-2">
                {[
                  "Divide responsibilities clearly",
                  "Renegotiate weekly",
                  "Maintain non-sexual physical affection",
                  "Reintroduce couple time gradually",
                  "Celebrate small wins"
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 items-center text-sm text-stone-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Intimacy & Physical Reconnection</h2>
            <p className="text-stone-600 mb-6">
              Physical intimacy after birth requires communication, not timelines. Intimacy rebuilds gradually.
            </p>
            <div className="bg-rose-50 p-6 rounded-2xl border-l-4 border-rose-400">
              <h4 className="font-bold text-stone-900 mb-3">Key Principles</h4>
              <ul className="space-y-2">
                {[
                  "Remove pressure",
                  "Separate affection from sexual obligation",
                  "Respect physical healing timelines",
                  "Discuss readiness openly",
                  "Prioritise safety and consent"
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 items-center text-sm text-stone-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Section 6 & 7: Mental Health & Load */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-900 text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-stone-800 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-4 text-white">Mental Health Awareness</h2>
              <p className="text-stone-400 mb-6">
                Postnatal Depression & Anxiety can affect 1 in 5 birthing mothers and 1 in 10 non-birthing partners.
              </p>
              <div className="bg-white/10 p-5 rounded-xl border border-white/10">
                <h4 className="font-bold text-rose-300 mb-2 text-sm uppercase">Warning Signs</h4>
                <p className="text-sm text-stone-300">
                  Persistent low mood, emotional detachment, intrusive thoughts, irritability, withdrawal.
                </p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-sm font-bold text-white">Seek urgent support if safety concerns arise.</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold mb-4 text-white">The Mental Load & Equity</h2>
              <p className="text-stone-400 mb-6">
                Instead of “helping,” partners should take full ownership of specific domains (planning, scheduling, emotional management).
              </p>
              <div className="bg-white/10 p-5 rounded-xl border border-white/10">
                <h4 className="font-bold text-sky-300 mb-2 text-sm uppercase">Shared Responsibility Agreement</h4>
                <ul className="space-y-2 text-sm text-stone-300">
                  <li>• List all tasks</li>
                  <li>• Assign ownership clearly</li>
                  <li>• Review weekly</li>
                  <li>• Adjust without blame</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-sm font-bold text-white">Fair means aligned with capacity, not always equal.</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 8: Professional Support */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">When to Seek Professional Support</h2>
          <p className="text-stone-600 mb-8">
            Seeking support is strength, not failure. Individual therapy helps with trauma history or persistent anxiety. Couples therapy is proactive — valuable before crisis hits.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Emotionally Focused Therapy (EFT)", "Gottman Method", "Perinatal-informed therapy"].map((item, i) => (
              <span key={i} className="px-4 py-2 bg-white border border-stone-200 rounded-full text-sm font-medium text-stone-600 shadow-sm">
                {item}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-rose-50 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
           
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">Your Relationship Is the Foundation</h2>
             <p className="text-lg text-stone-600 mb-8 leading-relaxed">
               Children thrive in emotionally secure environments. Protecting your partnership is not selfish — it is strategic. When couples invest in connection, they evolve through parenthood together.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button size="lg" className="rounded-full h-12 px-8 text-base bg-stone-900 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all">
                 Explore Relationship Resources
               </Button>
               <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-stone-300 hover:bg-white hover:text-stone-900">
                 Join a Partnership Circle
               </Button>
             </div>
           </div>
        </motion.section>

      </div>
    </div>
  );
}
