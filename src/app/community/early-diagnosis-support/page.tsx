"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Activity, Download, BookOpen, HelpCircle, Users, Clock, ShieldCheck, Brain } from "lucide-react";
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

export default function EarlyDiagnosisSupportPage() {
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
              <Activity className="w-4 h-4" />
              <span>Clinical Guidance & First Steps</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Early Diagnosis Support — <br/>
              <span className="text-rose-600">From Confusion to Action</span>
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              The first 90 days after a concern is raised can feel overwhelming. We provide an evidence-based roadmap to navigate evaluations, secure services, and support your child’s unique developmental path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/community/neurodiverse-families">
                <Button size="lg" className="rounded-full h-12 px-8 text-base bg-stone-900 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all">
                  Join Family Community
                </Button>
              </Link>
              <Link href="#roadmap">
                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-stone-300 hover:bg-white hover:text-stone-900">
                  View 90-Day Roadmap
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-24">
        
        {/* Clinical Insight: Why Early Matters */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Why "Wait and See" Is Outdated</h2>
            <div className="prose prose-stone text-stone-600">
              <p className="mb-4">
                Historical advice often encouraged parents to wait until school age. Modern neuroscience contradicts this. The brain's neuroplasticity—its ability to form new connections—is highest in the first 5 years of life.
              </p>
              <p>
                <strong>The "Active Waiting" Approach:</strong> Even while waiting for a formal diagnosis, you can begin parent-mediated interventions at home. Research confirms that when parents learn specific interaction strategies, child outcomes improve significantly, regardless of the official label.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm relative">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
              EVIDENCE
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Brain className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Neuroplasticity Window</h4>
                  <p className="text-sm text-stone-500">Early support builds neural pathways for communication more effectively than later intervention (Harvard Center on the Developing Child).</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Users className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Parent-Mediated Efficacy</h4>
                  <p className="text-sm text-stone-500">Meta-analyses show parent-delivered interventions moderately improve child socialization and communication (Nevill et al., 2018).</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* The 90-Day Roadmap */}
        <motion.section 
          id="roadmap"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Your First 90 Days: A Clinical Roadmap</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Breaking down the complex administrative and emotional tasks into manageable phases.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Phase 1 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">01</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Days 1–30: Gather & Request</h3>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Request "comprehensive developmental evaluation" from pediatrician.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Contact Early Intervention (0-3) or School District (3+) for free evaluation.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Start a "Concern Log": document sleep, sensory, and communication patterns.</span>
                </li>
              </ul>
            </motion.div>

            {/* Phase 2 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">02</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Days 31–60: Assess & Learn</h3>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Attend evaluation appointments. Bring your concern log.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Verify insurance coverage for Speech, OT, and Behavioral therapies.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Connect with one other parent or support group (isolation is a risk factor).</span>
                </li>
              </ul>
            </motion.div>

            {/* Phase 3 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">03</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Days 61–90: Mobilize</h3>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Review evaluation report. Ask for "plain language" explanation.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Set up first therapy intake appointments.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Establish a home routine using visual supports (schedule, choices).</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Evidence-Based Interventions */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-50 rounded-[2rem] p-10 border border-stone-100"
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8">Understanding Intervention Options</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">Naturalistic Developmental Behavioral Interventions (NDBI)</h3>
              <p className="text-sm text-stone-600 mb-4">
                Approaches like <strong>ESDM (Early Start Denver Model)</strong> or <strong>JASPER</strong> combine behavioral principles with play. They are conducted in natural settings (play, mealtime) rather than strict table-top drills.
              </p>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">High Evidence Base</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">Parent-Mediated Intervention (PMI)</h3>
              <p className="text-sm text-stone-600 mb-4">
                Training parents to use therapeutic strategies during daily life. Research shows this empowers families and increases the "dosage" of intervention without burning out the child.
              </p>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">Recommended First Step</span>
            </div>
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
              <AccordionTrigger className="text-left font-medium text-stone-900">What if the waitlist for evaluation is 6+ months?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                This is a common systemic issue. <strong>Do not wait to start support.</strong> You do not need a medical diagnosis to access Early Intervention (0-3) services in the US; you only need a documented delay. You can also start private Speech or OT if insurance allows, often with just a pediatrician's referral.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium text-stone-900">Will my child "grow out of it"?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                Developmental trajectories vary, but "growing out of" autism is not the right framework. Children grow <em>into</em> their skills. Early intervention provides the tools for them to navigate the world effectively. Ignoring signs usually leads to compounded challenges in social and academic settings later.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium text-stone-900">How do I manage my own anxiety during this?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                Parental regulation is critical. Your stress levels impact your child's regulation. Connect with a community of parents who "get it" (like our Neurodiverse Family Community) and prioritize your own sleep and basic needs. It is a marathon, not a sprint.
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
            <h2 className="text-3xl font-serif font-bold mb-4">Start With A Plan</h2>
            <p className="text-stone-300 mb-8 max-w-xl mx-auto">
              Download our "First 90 Days" checklist PDF to keep track of calls, appointments, and observations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full bg-white text-stone-900 hover:bg-stone-100 gap-2">
                <Download className="w-4 h-4" /> Download Checklist
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
            <li>Fuller, E. A., & Kaiser, A. P. (2020). The Effects of Early Intervention on Social Communication Outcomes for Children with Autism Spectrum Disorder: A Meta-analysis. <em>Journal of Autism and Developmental Disorders</em>.</li>
            <li>Nevill, R. E., Lecavalier, L., & Stratis, E. A. (2018). Meta-analysis of parent-mediated interventions for young children with autism spectrum disorder. <em>Autism</em>.</li>
            <li>Center on the Developing Child at Harvard University (2007). <em>The Science of Early Childhood Development</em>.</li>
            <li>Guralnick, M. J. (2011). Why Early Intervention Works: A Systems Perspective. <em>Infants & Young Children</em>.</li>
            <li>American Academy of Pediatrics (2020). <em>Identification, Evaluation, and Management of Children With Autism Spectrum Disorder</em>.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
