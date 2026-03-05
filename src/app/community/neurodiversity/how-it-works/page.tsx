"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Check, Heart, Brain, Users, Sparkles, Shield, ArrowRight, MessageCircle, Lock, GraduationCap, Map, Target, Clock, Smile, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
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

export default function HowItWorksPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAccess = () => {
    const plan = session?.user?.subscriptionPlan;
    if (plan === "premium" || plan === "specialized") {
      router.push("/community/neurodiversity");
    } else {
      router.push("/pricing?error=premium_required");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCF8] selection:bg-rose-100 selection:text-rose-900 font-sans">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-rose-100/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-purple-100/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow delay-1000" />
      </div>

      {/* Section 1: Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/60 text-stone-600 text-xs font-medium uppercase tracking-widest mb-8 shadow-sm">
              <Map className="w-3 h-3 text-rose-500" />
              <span>Community Guide</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-stone-900 mb-8 leading-[1.1] tracking-tight">
              A Structured Support System <br/> for <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">Neurodiverse Families</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-stone-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Navigating diagnosis, schooling, therapy, and emotional regulation can be overwhelming. MotherEra provides a calm, structured community for guidance and support.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-32 relative z-10">
        
        {/* Section 2: Why Community Support Matters */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-8">Why This Matters</h2>
            <div className="prose prose-lg prose-stone text-stone-600">
              <p className="mb-6">
                Isolation is the single biggest challenge for parents of neurodiverse children. The complexity of navigating medical, educational, and therapeutic systems often leads to significant emotional strain.
              </p>
              <p>
                Research consistently shows that <strong>peer support combined with expert guidance</strong> improves family outcomes. It reduces parental burnout, increases confidence in advocacy, and helps maintain a regulated home environment.
              </p>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/50 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px]" />
             <ul className="space-y-6 relative z-10">
               <li className="flex gap-5">
                 <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                   <Heart className="w-6 h-6 text-rose-500" />
                 </div>
                 <div>
                   <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">Emotional Resilience</h4>
                   <p className="text-stone-500 leading-relaxed">Shared experiences validate your journey and reduce the stigma often felt in traditional parenting circles.</p>
                 </div>
               </li>
               <li className="flex gap-5">
                 <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                   <Brain className="w-6 h-6 text-rose-500" />
                 </div>
                 <div>
                   <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">Collective Knowledge</h4>
                   <p className="text-stone-500 leading-relaxed">Access to "lived expertise" regarding IEPs, sensory diets, and local resources that you won't find in textbooks.</p>
                 </div>
               </li>
             </ul>
          </div>
        </motion.section>

        {/* Section 3: What You Get Inside */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-6">Inside the Sanctuary</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light">
              A comprehensive ecosystem designed to replace chaos with clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <MessageCircle className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Discussion Rooms</h3>
              <p className="text-stone-600 leading-relaxed text-sm">
                Dedicated spaces for real conversations. Ask questions, vent safely, and share wins that others might not understand.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Map className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Support Pathways</h3>
              <p className="text-stone-600 leading-relaxed text-sm">
                Structured tracks for every stage: Early Diagnosis, School Navigation, Teen Transition, and Parent Burnout.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <BookOpen className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Expert Library</h3>
              <p className="text-stone-600 leading-relaxed text-sm">
                Deep-dive guides on IEPs, sensory regulation, and behavior, curated by clinical professionals.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Shield className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">Moderated Safety</h3>
              <p className="text-stone-600 leading-relaxed text-sm">
                A zero-tolerance policy for judgment. Our moderators ensure every interaction is respectful and constructive.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 4: How It Helps */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-12">Empowering Your Family Journey</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/10">
                <h4 className="font-bold mb-4 text-rose-300 uppercase tracking-widest text-xs">For the Child</h4>
                <p className="text-stone-200 font-light leading-relaxed text-lg">
                  We help you understand their unique needs, decoding behaviors not as defiance, but as communication. This shifts the dynamic from conflict to connection.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/10">
                <h4 className="font-bold mb-4 text-rose-300 uppercase tracking-widest text-xs">For the Parent</h4>
                <p className="text-stone-200 font-light leading-relaxed text-lg">
                  We provide tools to regulate your own stress response. When you are grounded, you can advocate more effectively and parent with confidence.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 5: Community Journey */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-6">Your Journey With Us</h2>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
             {/* Connector Line */}
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-stone-200 -z-10 -translate-y-1/2" />
             
             <div className="grid md:grid-cols-4 gap-8">
               {[
                 { step: "01", title: "Join", desc: "Request access and enter the sanctuary." },
                 { step: "02", title: "Explore", desc: "Find the room that matches your current stage." },
                 { step: "03", title: "Learn", desc: "Access the expert library and toolkits." },
                 { step: "04", title: "Connect", desc: "Engage with parents who truly get it." }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center text-center bg-[#FDFCF8] p-4">
                   <div className="w-16 h-16 bg-white rounded-full border-4 border-stone-100 flex items-center justify-center text-xl font-bold text-rose-500 shadow-sm mb-6 z-10">
                     {item.step}
                   </div>
                   <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                   <p className="text-stone-500 text-sm">{item.desc}</p>
                 </div>
               ))}
             </div>
          </div>
        </motion.section>

        {/* Section 6: Who This Is For */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 border border-stone-200 shadow-sm text-center"
        >
          <h2 className="text-3xl font-serif font-medium text-stone-900 mb-10">Who This Community Is For</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Autism Spectrum", "ADHD", "Sensory Processing Differences", 
              "Learning Differences (Dyslexia, Dyscalculia)", 
              "Developmental Delays", "Twice Exceptional (2e)", 
              "Anxiety & Mood Regulation"
            ].map((tag, i) => (
              <span key={i} className="px-6 py-3 rounded-full bg-white border border-stone-200 text-stone-600 text-sm font-medium shadow-sm">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-10 text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Whether you have a formal diagnosis or are just beginning to notice differences, you are welcome here. We focus on needs, not just labels.
          </p>
        </motion.section>

        {/* Section 7: CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center py-20"
        >
           <h2 className="text-4xl md:text-6xl font-serif font-medium text-stone-900 mb-8">Ready to Find Your Village?</h2>
           <Button size="lg" onClick={handleAccess} className="rounded-full h-16 px-12 text-xl bg-stone-900 hover:bg-stone-800 text-white shadow-2xl hover:-translate-y-1 transition-all duration-300">
             Request Community Access
           </Button>
        </motion.section>

      </div>
    </div>
  );
}