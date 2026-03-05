"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Heart, Brain, Users, Sparkles, Clock, AlertTriangle, Shield, ArrowRight, Sun, Leaf, Battery, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

export default function EmotionalWellBeingPage() {
  const router = useRouter();

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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200 text-rose-700 text-sm font-medium mb-6 shadow-sm">
              <Heart className="w-4 h-4" />
              <span>Identity & Resilience</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Emotional <br/>
              <span className="text-rose-600">Well-Being</span>
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-4 max-w-2xl mx-auto">
              Strategic Identity Framework for Sustainable Self-Care
            </p>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              In high-pressure roles — whether as a caregiver, professional, parent, or leader — emotional resilience is not a luxury. It is a strategic necessity. Emotional Well-Being at MotherEra focuses on identity preservation, micro self-care, and sustainable capacity so that you can lead, care, and perform without losing yourself in the process.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
        
        {/* Section 1: The Paradigm of Strategic Self-Care */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-x-12 gap-y-12 items-center"
        >
          <div className="md:col-span-1">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">The Paradigm of Strategic Self-Care</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              In high-stakes environments, constant sacrifice becomes operational risk. When personal needs are continuously subordinated to the needs of others, burnout becomes inevitable.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6 font-medium italic border-l-4 border-rose-200 pl-4">
              Sustainable identity preservation is not selfish — it is strategic. <br/>
              We redefine self-care from indulgence to investment.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              To lead or care effectively, you must first preserve the person everyone depends on.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-[100px] -mr-8 -mt-8" />
              
              <div className="grid gap-8 relative z-10">
                <div>
                  <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">Traditional View (Selfish)</h3>
                  <ul className="space-y-2">
                    {["Taking away from others", "Guilt-driven", "Reactive and volatile", "Viewed as luxury"].map((item, i) => (
                      <li key={i} className="flex gap-3 items-center text-stone-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-rose-600 uppercase tracking-wider mb-3">Strategic View (Investment)</h3>
                  <ul className="space-y-2">
                    {["Source of energy and light", "Capacity-driven", "Emotionally equanimous", "Generous and sustainable"].map((item, i) => (
                      <li key={i} className="flex gap-3 items-center text-stone-800 font-medium">
                        <Check className="w-4 h-4 text-rose-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Identity Preservation Mandate */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-stone-100"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Identity Preservation Mandate</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Psychological health depends on maintaining a distinct identity outside of roles. You are a person first.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10 items-center">
              <div className="space-y-6">
                <p className="text-stone-600">
                  External success — healthy children, strong performance, completed responsibilities — cannot compensate for internal depletion.
                </p>
                <p className="text-stone-600">
                  Without identity preservation, you risk performing the mechanics of success while experiencing internal collapse.
                </p>
                <div className="bg-rose-50 rounded-xl p-6 border border-rose-100">
                  <h4 className="font-bold text-rose-800 mb-2">Restoration Improves:</h4>
                  <ul className="space-y-2">
                    {["Emotional regulation", "Leadership presence", "Quality of care", "Professional performance"].map((item, i) => (
                      <li key={i} className="flex gap-2 items-center text-rose-700 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center text-center p-8 bg-stone-50 rounded-3xl border border-stone-100">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                  <UserIcon className="w-10 h-10 text-stone-400" />
                </div>
                <p className="text-lg font-serif text-stone-800 italic mb-2">
                  "Self-care is not withdrawal. <br/>
                  It is reinvestment."
                </p>
                <div className="h-1 w-20 bg-rose-200 rounded-full mt-4" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Micro Self-Care */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Micro Self-Care: The Five-Minute Method</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              The greatest myth about wellness is that it requires large amounts of time. High-impact emotional regulation can be achieved in five minutes or less.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Activity, title: "Movement", desc: "Short bursts of activity reset stress hormones and generate immediate energy shifts." },
              { icon: Leaf, title: "Writing", desc: "Reflective journaling offloads pressure from the body to the page." },
              { icon: Sun, title: "Affirmations", desc: "Positive self-talk builds psychological resilience against high-pressure environments." },
              { icon: Brain, title: "Meditation", desc: "Breath awareness restores cognitive clarity and reduces reactivity." }
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
          
          <div className="mt-8 text-center">
            <p className="text-stone-500 text-sm italic">
              The Five-Minute Rule: Consistency matters more than duration.
            </p>
          </div>
        </motion.section>

        {/* Section 4: ROI of Emotional Regulation */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-900 text-white rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-stone-800 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-8">The ROI of Emotional Regulation</h2>
            <p className="text-stone-300 text-lg mb-10 max-w-2xl mx-auto">
              Self-care is not separate from performance — it enhances it. Well-being creates cognitive bandwidth. And cognitive bandwidth creates opportunity.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { title: "Executive Empathy", desc: "Understanding needs without absorbing stress." },
                { title: "Decision Making", desc: "Clarity over reactivity in high-stakes moments." },
                { title: "Problem Solving", desc: "Enhanced creativity from a regulated state." }
              ].map((item, i) => (
                <div key={i} className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                  <h3 className="font-bold text-lg mb-2 text-rose-200">{item.title}</h3>
                  <p className="text-stone-300 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 5: The Modeling Effect */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-center"
        >
          <div className="order-2 md:order-1">
             <div className="bg-rose-50 p-8 md:p-10 rounded-3xl border border-rose-100 relative">
                <Users className="w-12 h-12 text-rose-300 absolute top-6 right-6 opacity-50" />
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-6">Self-care is Leadership</h3>
                <ul className="space-y-4">
                  {[
                    "Healthier family dynamics",
                    "Less reactive discipline",
                    "Stronger workplace culture",
                    "A legacy of stability rather than burnout"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                        <Check className="w-3 h-3 text-rose-500" />
                      </div>
                      <span className="text-stone-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">The Modeling Effect: Wellness as Leadership</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Children, teams, and families model observed behavior — not instructions.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex gap-4 p-4 bg-stone-50 rounded-xl border-l-4 border-stone-300">
                <Battery className="w-6 h-6 text-stone-400 shrink-0" />
                <p className="text-stone-600 text-sm">If you embody depletion, they internalize depletion.</p>
              </div>
              <div className="flex gap-4 p-4 bg-rose-50 rounded-xl border-l-4 border-rose-400">
                <Zap className="w-6 h-6 text-rose-500 shrink-0" />
                <p className="text-stone-800 text-sm font-medium">If you embody resilience, they internalize resilience.</p>
              </div>
            </div>
            <p className="font-bold text-stone-900 text-lg">
              Consistency in wellness creates generational impact.
            </p>
          </div>
        </motion.section>

        {/* Section 6: Inner Child Reset Protocol */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6 text-rose-600 font-bold tracking-wide uppercase text-sm">
            <Sparkles className="w-4 h-4" />
            <span>The Five-Minute Visualization</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-10">The Inner Child Reset Protocol</h2>
          
          <div className="space-y-6 text-left">
            {[
              { step: 1, title: "Emotional Anchoring", desc: "Close your eyes and visualize someone you love deeply." },
              { step: 2, title: "Self-Recognition", desc: "Imagine yourself at five years old — innocent, vibrant, deserving." },
              { step: 3, title: "Love Transfer", desc: "Transfer the same love you feel toward others to your younger self." },
              { step: 4, title: "Three-Breath Cycle", desc: "Take three slow, intentional breaths." }
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start p-6 bg-white rounded-2xl shadow-sm border border-stone-100 hover:border-rose-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold font-serif text-lg shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-stone-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-stone-600 font-medium italic">
            "The most dangerous mindset is postponement. Start today."
          </p>
        </motion.section>

        {/* Comparison Table */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-stone-900 text-white p-6 text-sm md:text-base font-serif font-bold tracking-wide">
              <div className="col-span-1">Comparison</div>
              <div className="col-span-1 text-center text-stone-400">Depletion Mode</div>
              <div className="col-span-1 text-center text-rose-200">Sustainable Mode</div>
            </div>
            
            <div className="divide-y divide-stone-100">
              {[
                { label: "Energy", bad: "Chronically drained", good: "Intentionally replenished" },
                { label: "Mindset", bad: "Guilt-driven", good: "Capacity-driven" },
                { label: "Leadership", bad: "Reactive", good: "Equanimous" },
                { label: "Self-View", bad: "Role-defined", good: "Identity-preserved" },
                { label: "Outcome", bad: "Burnout cycle", good: "Sustainable performance" }
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 p-6 text-sm md:text-base hover:bg-stone-50 transition-colors">
                  <div className="col-span-1 font-bold text-stone-900 flex items-center">{row.label}</div>
                  <div className="col-span-1 text-center text-stone-500 border-l border-stone-100 flex items-center justify-center px-2">{row.bad}</div>
                  <div className="col-span-1 text-center text-stone-900 font-medium border-l border-stone-100 flex items-center justify-center px-2">{row.good}</div>
                </div>
              ))}
            </div>
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
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">Preserve the Person Who Leads and Loves</h2>
             <p className="text-lg text-stone-600 mb-8 leading-relaxed">
               Emotional well-being is not indulgence — it is strategic alignment. When you invest in your identity, you strengthen every relationship and responsibility connected to you.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button 
                 size="lg" 
                 variant="outline" 
                 className="rounded-full h-12 px-8 text-base border-stone-300 hover:bg-white hover:text-stone-900"
                 onClick={() => router.push('/five-minute-reset')}
               >
                 Start Your Five-Minute Reset
               </Button>
             </div>
           </div>
        </motion.section>

      </div>
    </div>
  );
}

// Simple user icon component for Section 2
function UserIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
