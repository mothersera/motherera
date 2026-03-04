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
              <Scale className="w-4 h-4" />
              <span>Legal Rights & Advocacy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Advanced IEP Navigation
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Move beyond basic compliance. Learn how to strategically navigate the Individualized Education Program (IEP) process to secure the services your child actually needs.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-24">
        
        {/* Section 1: Understanding the Power of the IEP */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">It Is Not Just a Plan, It Is a Contract</h2>
            <div className="prose prose-stone text-stone-600">
              <p className="mb-4">
                Many parents view the IEP as a list of "hopes" for the school year. Legally, it is a binding commitment under the Individuals with Disabilities Education Act (IDEA).
              </p>
              <p>
                An IEP controls three critical areas: <strong>Specialized Instruction</strong> (what is taught), <strong>Accommodations</strong> (how it is accessed), and <strong>Related Services</strong> (therapies like Speech or OT). If it is not written in the document, it does not exist.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm relative">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
              KEY CONCEPTS
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <FileText className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Present Levels (PLAAFP)</h4>
                  <p className="text-sm text-stone-500">The foundation. If a need isn't listed here, you cannot get a goal for it.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Shield className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Prior Written Notice (PWN)</h4>
                  <p className="text-sm text-stone-500">The school must explain in writing <em>why</em> they refuse a request. Always ask for this.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Section 2: Preparation Framework */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Strategic Preparation</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              The meeting is the final step. 90% of the work happens before you walk in the door.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">01</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Parent Concerns Letter</h3>
              <p className="text-stone-600 text-sm mb-4">
                Submit a formal letter 5 days before the meeting outlining your specific concerns. This legally forces the team to address them in the meeting notes.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">02</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Data Collection</h3>
              <p className="text-stone-600 text-sm mb-4">
                Do not rely on "teacher feelings." Bring your own data: work samples, private evaluation reports, and a log of behavioral incidents at home.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">03</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Draft Review</h3>
              <p className="text-stone-600 text-sm mb-4">
                Always request a draft of the IEP goals at least 3-5 days in advance. You cannot meaningfully participate if you are reading it for the first time at the table.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 3: Advocacy Scripts */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-50 rounded-[2rem] p-10 border border-stone-100"
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8">Advocacy Scripts: What to Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">When they say "We don't do that here"</h3>
              <p className="text-sm text-stone-600 italic">
                "I understand that might be general policy, but the IEP is an individualized document based on my child's unique needs. Can you show me the data that indicates this specific support is not appropriate for [Child's Name]?"
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">When they say "He's doing fine"</h3>
              <p className="text-sm text-stone-600 italic">
                "I'm glad to hear that. However, 'fine' is subjective. Can we look at the objective data for his progress on [Specific Goal]? I want to ensure he is not just passing, but closing the gap with his peers."
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">When they refuse a service</h3>
              <p className="text-sm text-stone-600 italic">
                "Please provide a Prior Written Notice (PWN) documenting your refusal of this request and the specific data you used to make that determination."
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">When you feel rushed</h3>
              <p className="text-sm text-stone-600 italic">
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
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">Common Pitfalls to Avoid</h2>
          <div className="grid gap-4 max-w-3xl mx-auto">
            <Card className="border-l-4 border-l-amber-500">
              <CardContent className="pt-6 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">Signing the IEP immediately</h4>
                  <p className="text-sm text-stone-600">Never sign at the meeting. Take it home. Read it calmly. You have the right to review it.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-amber-500">
              <CardContent className="pt-6 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">Focusing only on academics</h4>
                  <p className="text-sm text-stone-600">IEPs cover functional skills too (social, behavioral, emotional). Don't let them ignore the "whole child."</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-amber-500">
              <CardContent className="pt-6 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">Accepting vague goals</h4>
                  <p className="text-sm text-stone-600">"Will improve reading" is not a goal. "Will read 120 words per minute with 95% accuracy" is a goal.</p>
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
          className="bg-stone-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-8">Your Next Steps</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left mb-8">
              <div className="bg-stone-800 p-6 rounded-xl border border-stone-700">
                <h4 className="font-bold mb-2 flex items-center gap-2"><Calendar className="w-4 h-4 text-rose-400" /> Today</h4>
                <p className="text-sm text-stone-400">Locate your child's current IEP and read the "Present Levels" section. Does it sound like your child?</p>
              </div>
              <div className="bg-stone-800 p-6 rounded-xl border border-stone-700">
                <h4 className="font-bold mb-2 flex items-center gap-2"><Users className="w-4 h-4 text-rose-400" /> This Week</h4>
                <p className="text-sm text-stone-400">Start a "Communication Log." Document every email and conversation with the school.</p>
              </div>
              <div className="bg-stone-800 p-6 rounded-xl border border-stone-700">
                <h4 className="font-bold mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4 text-rose-400" /> Before Meeting</h4>
                <p className="text-sm text-stone-400">Draft your "Parent Concerns Letter" and email it to the case manager.</p>
              </div>
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
