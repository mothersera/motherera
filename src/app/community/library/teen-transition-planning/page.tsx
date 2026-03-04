"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, Briefcase, GraduationCap, Users, Clock, Map, Target, Heart } from "lucide-react";
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

export default function TeenTransitionPlanningPage() {
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
              <Map className="w-3 h-3 text-rose-500" />
              <span>Future Planning (Ages 14-21)</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-stone-900 mb-8 leading-[1.1] tracking-tight">
              Teen Transition Planning
            </h1>
            <p className="text-xl md:text-2xl font-light text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Preparing neurodiverse youth for adulthood requires intentional planning. Discover the frameworks for independence, employment, and social fulfillment.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-32">
        
        {/* Section 1: The Critical Shift */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-8">From Entitlement to Eligibility</h2>
            <div className="prose prose-lg prose-stone text-stone-600">
              <p className="mb-6">
                The most important concept to understand is the <span className="font-medium text-stone-900 bg-rose-50 px-1 rounded">Service Cliff</span>. In public school (under IDEA), your child is <strong>entitled</strong> to services. Once they graduate or turn 22, they enter the adult world (under ADA) where they are only <strong>eligible</strong> for services if they apply, qualify, and funding is available.
              </p>
              <p>
                This shift means the burden of advocacy moves from the school to the young adult. Preparation must start early—ideally by age 14—to build the skills necessary to bridge this gap.
              </p>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
            <div className="absolute top-0 right-0 bg-rose-100/80 backdrop-blur-sm text-rose-900 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-bl-2xl rounded-tr-[2rem]">
              Core Pillars
            </div>
            <ul className="space-y-8 mt-4">
              <li className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">Self-Advocacy</h4>
                  <p className="text-stone-500 leading-relaxed">The ability to disclose one's disability and request specific accommodations is the #1 predictor of post-secondary success.</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                  <Briefcase className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">Vocational Skills</h4>
                  <p className="text-stone-500 leading-relaxed">Early work experiences (volunteering, internships) are vital. We move from "what can they do?" to "what do they <em>want</em> to do?"</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Section 2: Life Skills Roadmap */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-6">Independent Living Roadmap</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light">
              Academic success is important, but daily living skills are the engine of independence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-colors duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <Clock className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">Executive Function</h3>
              <ul className="space-y-4 text-stone-600">
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed">Managing a personal calendar</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed">Setting alarms/reminders</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed">Breaking big tasks into steps</span></li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-colors duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <Heart className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">Health & Hygiene</h3>
              <ul className="space-y-4 text-stone-600">
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed">Scheduling doctor appointments</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed">Managing medication refills</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed">Understanding sensory needs</span></li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-colors duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <Users className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">Social Safety</h3>
              <ul className="space-y-4 text-stone-600">
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed">Navigating public transport</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed">Understanding boundaries</span></li>
                <li className="flex gap-3 items-start"><Check className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" /> <span className="leading-relaxed">Identifying safe strangers</span></li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 3: Education & Career */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 border border-stone-200 shadow-sm"
        >
          <h2 className="text-3xl font-serif font-medium text-stone-900 mb-10 text-center">Pathways After High School</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
              <h3 className="font-serif font-bold text-stone-900 mb-4 flex items-center gap-3 text-xl">
                <div className="p-2 bg-rose-50 rounded-full"><GraduationCap className="w-5 h-5 text-rose-500" /></div>
                Higher Education
              </h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                Colleges have Disability Services offices, but the student must initiate contact. 504 plans do not automatically transfer.
              </p>
              <div className="text-xs bg-rose-50 text-rose-800 p-4 rounded-xl font-medium border border-rose-100">
                <strong className="block mb-1">Action Item:</strong> Have your teen practice emailing teachers about accommodations now.
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
              <h3 className="font-serif font-bold text-stone-900 mb-4 flex items-center gap-3 text-xl">
                <div className="p-2 bg-rose-50 rounded-full"><Briefcase className="w-5 h-5 text-rose-500" /></div>
                Employment
              </h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                Explore "Supported Employment" or "Customized Employment" where roles are carved out based on strengths.
              </p>
              <div className="text-xs bg-rose-50 text-rose-800 p-4 rounded-xl font-medium border border-rose-100">
                <strong className="block mb-1">Action Item:</strong> Contact your state's Vocational Rehabilitation (VR) agency at age 16.
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Future Planning Toolkit */}
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
            <h2 className="text-4xl font-serif font-medium mb-6">Start Planning Today</h2>
            <p className="text-stone-300 mb-12 text-lg font-light">
              Transition is a marathon, not a sprint. We have broken it down into manageable steps.
            </p>
            
            <div className="text-left bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 mb-12">
              <h4 className="font-bold mb-6 text-rose-300 uppercase tracking-widest text-xs">Immediate Action Items</h4>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full border border-rose-400 flex items-center justify-center text-xs font-bold text-rose-300 shrink-0">1</div>
                  <span className="text-stone-200 font-light text-lg">Check if your child's IEP has a "Transition Plan" section (Required by age 16, typically earlier).</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full border border-rose-400 flex items-center justify-center text-xs font-bold text-rose-300 shrink-0">2</div>
                  <span className="text-stone-200 font-light text-lg">Identify one household chore your teen can take full ownership of this month.</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full border border-rose-400 flex items-center justify-center text-xs font-bold text-rose-300 shrink-0">3</div>
                  <span className="text-stone-200 font-light text-lg">Discuss "disclosure" – does your teen understand their diagnosis and how to explain it?</span>
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
