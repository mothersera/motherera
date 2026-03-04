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
              <Map className="w-4 h-4" />
              <span>Future Planning (Ages 14-21)</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Teen Transition Planning
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Preparing neurodiverse youth for adulthood requires intentional planning. Discover the frameworks for independence, employment, and social fulfillment.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-24">
        
        {/* Section 1: The Critical Shift */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">From Entitlement to Eligibility</h2>
            <div className="prose prose-stone text-stone-600">
              <p className="mb-4">
                The most important concept to understand is the "Service Cliff." In public school (under IDEA), your child is <strong>entitled</strong> to services. Once they graduate or turn 22, they enter the adult world (under ADA) where they are only <strong>eligible</strong> for services if they apply, qualify, and funding is available.
              </p>
              <p>
                This shift means the burden of advocacy moves from the school to the young adult. Preparation must start early—ideally by age 14—to build the skills necessary to bridge this gap.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm relative">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
              CORE PILLARS
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Target className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Self-Advocacy</h4>
                  <p className="text-sm text-stone-500">The ability to disclose one's disability and request specific accommodations is the #1 predictor of post-secondary success.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Briefcase className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Vocational Skills</h4>
                  <p className="text-sm text-stone-500">Early work experiences (volunteering, internships) are vital. We move from "what can they do?" to "what do they <em>want</em> to do?"</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Section 2: Life Skills Roadmap */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Independent Living Roadmap</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Academic success is important, but daily living skills are the engine of independence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Executive Function</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Managing a personal calendar</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Setting alarms/reminders</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Breaking big tasks into steps</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Health & Hygiene</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Scheduling doctor appointments</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Managing medication refills</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Understanding sensory needs</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-stone-900" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Social Safety</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Navigating public transport</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Understanding boundaries</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Identifying safe strangers</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 3: Education & Career */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-50 rounded-[2rem] p-10 border border-stone-100"
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8">Pathways After High School</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-rose-500" /> Higher Education
              </h3>
              <p className="text-sm text-stone-600 mb-4">
                Colleges have Disability Services offices, but the student must initiate contact. 504 plans do not automatically transfer.
              </p>
              <div className="text-xs bg-rose-50 text-rose-800 p-2 rounded">
                <strong>Action:</strong> Have your teen practice emailing teachers about accommodations now.
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-rose-500" /> Employment
              </h3>
              <p className="text-sm text-stone-600 mb-4">
                Explore "Supported Employment" or "Customized Employment" where roles are carved out based on strengths.
              </p>
              <div className="text-xs bg-rose-50 text-rose-800 p-2 rounded">
                <strong>Action:</strong> Contact your state's Vocational Rehabilitation (VR) agency at age 16.
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
          className="bg-stone-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Start Planning Today</h2>
            <p className="text-stone-300 mb-8 max-w-xl mx-auto">
              Transition is a marathon, not a sprint. We have broken it down into manageable steps.
            </p>
            
            <div className="text-left max-w-2xl mx-auto bg-stone-800/50 p-6 rounded-xl border border-stone-700 mb-8">
              <h4 className="font-bold mb-4 text-rose-400">Immediate Action Items:</h4>
              <ul className="space-y-3 text-sm text-stone-300">
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-rose-500 flex items-center justify-center text-xs">1</div>
                  <span>Check if your child's IEP has a "Transition Plan" section (Required by age 16, typically earlier).</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-rose-500 flex items-center justify-center text-xs">2</div>
                  <span>Identify one household chore your teen can take full ownership of this month.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-rose-500 flex items-center justify-center text-xs">3</div>
                  <span>Discuss "disclosure" – does your teen understand their diagnosis and how to explain it?</span>
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
