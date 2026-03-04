"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, FileText, Shield, AlertTriangle, ArrowRight, BookOpen, Scale, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

export default function AdvancedIEPNavigationPage() {
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
              <Scale className="w-3 h-3 text-rose-500" />
              <span>Legal Rights & Advocacy</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-stone-900 mb-8 leading-[1.1] tracking-tight">
              Advanced IEP Navigation
            </h1>
            <p className="text-xl md:text-2xl font-light text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Move beyond basic compliance. Learn how to strategically navigate the Individualized Education Program (IEP) process to secure the services your child actually needs.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-32">
        
        {/* Section 1: Understanding the Power of the IEP */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-8">It Is Not Just a Plan, It Is a Contract</h2>
            <div className="prose prose-lg prose-stone text-stone-600">
              <p className="mb-6">
                Many parents view the IEP as a list of "hopes" for the school year. Legally, it is a <span className="font-medium text-stone-900 bg-rose-50 px-1 rounded">binding commitment</span> under the Individuals with Disabilities Education Act (IDEA).
              </p>
              <p>
                An IEP controls three critical areas: <strong>Specialized Instruction</strong> (what is taught), <strong>Accommodations</strong> (how it is accessed), and <strong>Related Services</strong> (therapies like Speech or OT). If it is not written in the document, it does not exist.
              </p>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
            <div className="absolute top-0 right-0 bg-rose-100/80 backdrop-blur-sm text-rose-900 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-bl-2xl rounded-tr-[2rem]">
              Key Concepts
            </div>
            <ul className="space-y-8 mt-4">
              <li className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">Present Levels (PLAAFP)</h4>
                  <p className="text-stone-500 leading-relaxed">The foundation. If a need isn't listed here, you cannot get a goal for it.</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg mb-1">Prior Written Notice (PWN)</h4>
                  <p className="text-stone-500 leading-relaxed">The school must explain in writing <em>why</em> they refuse a request. Always ask for this.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Section 2: Preparation Framework */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-6">Strategic Preparation</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light">
              The meeting is the final step. 90% of the work happens before you walk in the door.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-colors duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-serif font-bold text-stone-900 mb-8 shadow-sm text-xl">01</div>
              <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">Parent Concerns Letter</h3>
              <p className="text-stone-600 leading-relaxed">
                Submit a formal letter 5 days before the meeting outlining your specific concerns. This legally forces the team to address them in the meeting notes.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-colors duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-serif font-bold text-stone-900 mb-8 shadow-sm text-xl">02</div>
              <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">Data Collection</h3>
              <p className="text-stone-600 leading-relaxed">
                Do not rely on "teacher feelings." Bring your own data: work samples, private evaluation reports, and a log of behavioral incidents at home.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/50 shadow-sm hover:bg-white/60 transition-colors duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-serif font-bold text-stone-900 mb-8 shadow-sm text-xl">03</div>
              <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">Draft Review</h3>
              <p className="text-stone-600 leading-relaxed">
                Always request a draft of the IEP goals at least 3-5 days in advance. You cannot meaningfully participate if you are reading it for the first time at the table.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 3: Advocacy Scripts */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 border border-stone-200 shadow-sm"
        >
          <h2 className="text-3xl font-serif font-medium text-stone-900 mb-10 text-center">Advocacy Scripts: What to Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
              <h3 className="font-serif font-bold text-stone-900 mb-4 text-xl">When they say "We don't do that here"</h3>
              <p className="text-stone-600 italic leading-relaxed pl-4 border-l-2 border-rose-300">
                "I understand that might be general policy, but the IEP is an individualized document based on my child's unique needs. Can you show me the data that indicates this specific support is not appropriate for [Child's Name]?"
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
              <h3 className="font-serif font-bold text-stone-900 mb-4 text-xl">When they say "He's doing fine"</h3>
              <p className="text-stone-600 italic leading-relaxed pl-4 border-l-2 border-rose-300">
                "I'm glad to hear that. However, 'fine' is subjective. Can we look at the objective data for his progress on [Specific Goal]? I want to ensure he is not just passing, but closing the gap with his peers."
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
              <h3 className="font-serif font-bold text-stone-900 mb-4 text-xl">When they refuse a service</h3>
              <p className="text-stone-600 italic leading-relaxed pl-4 border-l-2 border-rose-300">
                "Please provide a Prior Written Notice (PWN) documenting your refusal of this request and the specific data you used to make that determination."
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-stone-100">
              <h3 className="font-serif font-bold text-stone-900 mb-4 text-xl">When you feel rushed</h3>
              <p className="text-stone-600 italic leading-relaxed pl-4 border-l-2 border-rose-300">
                "I don't feel we have adequately covered all the concerns today. I am not comfortable signing this yet. Let's schedule a continuation meeting to finish this discussion properly."
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Common Mistakes */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-serif font-medium text-stone-900 mb-10 text-center">Common Pitfalls to Avoid</h2>
          <div className="grid gap-6 max-w-4xl mx-auto">
            <Card className="border-none bg-amber-50/50 rounded-3xl overflow-hidden">
              <CardContent className="p-8 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-xl mb-2">Signing the IEP immediately</h4>
                  <p className="text-stone-600 leading-relaxed">Never sign at the meeting. Take it home. Read it calmly. You have the right to review it.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none bg-amber-50/50 rounded-3xl overflow-hidden">
              <CardContent className="p-8 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-xl mb-2">Focusing only on academics</h4>
                  <p className="text-stone-600 leading-relaxed">IEPs cover functional skills too (social, behavioral, emotional). Don't let them ignore the "whole child."</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none bg-amber-50/50 rounded-3xl overflow-hidden">
              <CardContent className="p-8 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-xl mb-2">Accepting vague goals</h4>
                  <p className="text-stone-600 leading-relaxed">"Will improve reading" is not a goal. "Will read 120 words per minute with 95% accuracy" is a goal.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Section 5: Action Plan */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-medium mb-12">Your Next Steps</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/20 transition-colors">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-rose-300 uppercase tracking-widest text-xs"><Calendar className="w-4 h-4" /> Today</h4>
                <p className="text-stone-300 font-light leading-relaxed">Locate your child's current IEP and read the "Present Levels" section. Does it sound like your child?</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/20 transition-colors">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-rose-300 uppercase tracking-widest text-xs"><Users className="w-4 h-4" /> This Week</h4>
                <p className="text-stone-300 font-light leading-relaxed">Start a "Communication Log." Document every email and conversation with the school.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/20 transition-colors">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-rose-300 uppercase tracking-widest text-xs"><BookOpen className="w-4 h-4" /> Before Meeting</h4>
                <p className="text-stone-300 font-light leading-relaxed">Draft your "Parent Concerns Letter" and email it to the case manager.</p>
              </div>
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
