"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, FileText, Calendar, Activity, Phone, Download, Clock, Shield, Scale, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export default function SchoolAgeNavigationPage() {
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
              <FileText className="w-4 h-4" />
              <span>Advocacy & Strategies</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              School-Age Navigation — <br/>
              <span className="text-rose-600">IEPs & Classrooms</span>
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Empowering parents with knowledge of legal rights, effective classroom strategies, and confident advocacy to ensure your child isn't just attending school, but thriving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/community/neurodiverse-families">
                <Button size="lg" className="rounded-full h-12 px-8 text-base bg-stone-900 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all">
                  Join Family Community
                </Button>
              </Link>
              <Link href="#framework">
                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-stone-300 hover:bg-white hover:text-stone-900">
                  IEP Strategy Guide
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-24">
        
        {/* Clinical Insight: Rights & Research */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">The Law & The Evidence</h2>
            <div className="prose prose-stone text-stone-600">
              <p className="mb-4">
                Under the <strong>IDEA (Individuals with Disabilities Education Act)</strong>, every eligible child is entitled to a "Free Appropriate Public Education" (FAPE) in the "Least Restrictive Environment" (LRE). This is not a favor; it is a civil right.
              </p>
              <p>
                <strong>Why Specificity Matters:</strong> Research by <em>Ruble et al. (2012)</em> demonstrates that "Specific, Measurable" (SMART) goals are significantly correlated with better educational outcomes. Vague goals like "will improve social skills" often lead to stagnation.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm relative">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
              LEGAL FRAMEWORK
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Scale className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">IEP vs. 504 Plan</h4>
                  <p className="text-sm text-stone-500">
                    <strong>IEP:</strong> Specialized instruction, modifying <em>what</em> is learned.<br/>
                    <strong>504:</strong> Accommodations, modifying <em>how</em> it is learned (access).
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Shield className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Procedural Safeguards</h4>
                  <p className="text-sm text-stone-500">You have the right to request an evaluation at any time, review all records, and bring an advocate to any meeting.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* The IEP Lifecycle Framework */}
        <motion.section 
          id="framework"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">The Strategic IEP Lifecycle</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Moving from reactive meetings to proactive management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Phase 1 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">01</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Prep (30 Days Prior)</h3>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Request draft goals 5 days before meeting (in writing).</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Draft "Parent Vision Statement" – your long-term goals for your child.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Compile private evaluation data to share with the team.</span>
                </li>
              </ul>
            </motion.div>

            {/* Phase 2 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">02</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">The Meeting</h3>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Bring a photo of your child to place on the table (humanize the data).</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Use the phrase: "Show me the data supporting that decision."</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Do not sign the IEP immediately. Take it home to review.</span>
                </li>
              </ul>
            </motion.div>

            {/* Phase 3 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">03</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Monitoring</h3>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Track progress reports quarterly against the specific goals.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Maintain a "Communication Log" of all emails with teachers.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Request an amendment meeting if progress stalls.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Classroom Strategies */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-50 rounded-[2rem] p-10 border border-stone-100"
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8">Evidence-Based Accommodations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">Visual & Structural Supports</h3>
              <p className="text-sm text-stone-600 mb-4">
                Research confirms visual schedules reduce anxiety and transition behaviors.
              </p>
              <ul className="text-sm text-stone-500 space-y-1 list-disc list-inside">
                <li>Visual timer for tasks</li>
                <li>"Finished" bin for completed work</li>
                <li>Color-coded organization systems</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">Sensory Regulation</h3>
              <p className="text-sm text-stone-600 mb-4">
                Proactive sensory breaks improve focus and reduce "meltdowns" (which are often sensory overwhelm).
              </p>
              <ul className="text-sm text-stone-500 space-y-1 list-disc list-inside">
                <li>Scheduled movement breaks</li>
                <li>Noise-canceling headphones option</li>
                <li>Preferential seating (away from distractions)</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Advocacy Scripts */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">Scripts for Common Scenarios</h2>
          <div className="grid gap-4 max-w-3xl mx-auto">
            <Card className="border-l-4 border-l-rose-500">
              <CardContent className="pt-6">
                <h4 className="font-bold text-stone-900 mb-2">Scenario: School says "We don't do that here."</h4>
                <p className="text-stone-600 italic">"I understand that might be typical policy, but the IEP is an individualized document based on my child's unique needs, not general school policy. Can you provide the data showing why this specific support isn't appropriate for [Child's Name]?"</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <h4 className="font-bold text-stone-900 mb-2">Scenario: Requesting an Evaluation</h4>
                <p className="text-stone-600 italic">"I am writing to formally request a comprehensive psycho-educational evaluation for [Child's Name] to determine eligibility for special education services under IDEA. I have specific concerns regarding [Area]."</p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8 text-center">Common Questions</h2>
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-medium text-stone-900">What if the school refuses to evaluate?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                They must provide "Prior Written Notice" (PWN) explaining exactly why. You can challenge this via mediation or Due Process. Often, requesting the PWN makes them reconsider the refusal.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium text-stone-900">Can I record the IEP meeting?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                In many states, yes, but you usually must notify the team in advance (often 24-48 hours). Check your specific state laws. Recording ensures an accurate record of what was promised.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium text-stone-900">Is a 1:1 aide realistic?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                It depends on the data. Schools often resist due to cost, but if data shows the child cannot access the curriculum or is a safety risk without one, the team must consider it.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.section>

        {/* Downloads & CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Prepare for Your Next Meeting</h2>
            <p className="text-stone-300 mb-8 max-w-xl mx-auto">
              Download our "IEP Strategy Template" to organize your goals, concerns, and data before you walk into the room.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full bg-white text-stone-900 hover:bg-stone-100 gap-2">
                <Download className="w-4 h-4" /> Download Template
              </Button>
              <Link href="/community/neurodiverse-families">
                <Button size="lg" variant="outline" className="rounded-full border-stone-600 text-stone-200 hover:bg-stone-800 hover:text-white">
                  Join Support Community
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* References Footer */}
        <div className="border-t border-stone-200 pt-10 text-stone-500 text-sm">
          <h4 className="font-bold text-stone-700 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Evidence & References
          </h4>
          <ul className="space-y-2 list-disc list-inside">
            <li>US Department of Education. <em>Individuals with Disabilities Education Act (IDEA) Sec. 300.320</em>.</li>
            <li>Ruble, L. A., McGrew, J. H., & Toland, M. D. (2012). Goal attainment scaling as an outcome measure for randomized controlled trials of psychosocial interventions in autism. <em>Journal of Autism and Developmental Disorders</em>.</li>
            <li>Wright, P. W. D., & Wright, P. D. (2006). <em>Wrightslaw: From Emotions to Advocacy</em>.</li>
            <li>Hume, K., et al. (2021). Evidence-Based Practices for Children, Youth, and Young Adults with Autism. <em>FPG Child Development Institute</em>.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
