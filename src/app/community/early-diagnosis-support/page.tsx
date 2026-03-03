"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, FileText, Calendar, Activity, Phone, Download, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function EarlyDiagnosisSupportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-rose-50/50 border-b border-rose-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Activity className="w-3 h-3" />
              <span>Support & Practical Steps</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
              Early Diagnosis Support — <br/>
              <span className="text-rose-600">Practical Next Steps</span>
            </h1>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              If you or your child's provider has concerns, here are immediate, evidence-based steps you can take today to get help and build a plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/community/neurodiverse-families">
                <Button size="lg" className="rounded-full bg-stone-900 text-white hover:bg-stone-800">
                  Join Our Community
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="rounded-full border-stone-300 hover:bg-white">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-16">
        
        {/* Why Early Matters */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Why Early Intervention Matters</h2>
          <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-rose-500" />
                </div>
                <p className="text-stone-700"><strong>Neuroplasticity:</strong> A young child's brain is highly adaptable. Early support builds new neural pathways more effectively than later intervention.</p>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-rose-500" />
                </div>
                <p className="text-stone-700"><strong>Family Confidence:</strong> Learning strategies early reduces parental stress and improves family dynamics.</p>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-rose-500" />
                </div>
                <p className="text-stone-700"><strong>Long-term Outcomes:</strong> Research consistently shows that earlier access to therapy improves communication and social skills.</p>
              </li>
            </ul>
            <p className="mt-6 text-xs text-stone-400 italic">Source: CDC Early Intervention reviews & NIH developmental studies.</p>
          </div>
        </motion.section>

        {/* First 30 Days Checklist */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">First 30 Days Checklist</h2>
          <div className="grid gap-4">
            {[
              "Gather developmental history, milestone dates, and screening forms.",
              "Request a formal evaluation via your pediatrician or local Early Intervention program.",
              "Ask for a written referral and contact list for local evidence-based services.",
              "Begin tracking daily routines and behaviors for one week to share with clinicians.",
              "Organize a binder (digital or physical) for all medical and school documents."
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white border border-stone-200 rounded-xl hover:border-rose-200 transition-colors">
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <p className="text-stone-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="gap-2 rounded-full">
              <Download className="w-4 h-4" /> Download 30-Day Checklist PDF
            </Button>
          </div>
        </motion.section>

        {/* Evidence Based Interventions */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Common Evidence-Based Approaches</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white border-stone-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Behavioral & Developmental</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600">
                Programs like ESDM (Early Start Denver Model) or PRT (Pivotal Response Treatment) focus on naturalistic play to build skills.
              </CardContent>
            </Card>
            <Card className="bg-white border-stone-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Speech & OT</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600">
                Speech therapy supports communication (verbal/non-verbal), while Occupational Therapy (OT) addresses sensory and motor needs.
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* FAQs */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-100 rounded-3xl p-8"
        >
          <h2 className="text-xl font-bold text-stone-900 mb-6">Common Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-stone-800 mb-2">What if I'm told to "wait and see"?</h3>
              <p className="text-stone-600 text-sm">Guidelines now recommend acting on concerns immediately. You can request an evaluation even if a provider suggests waiting.</p>
            </div>
            <div>
              <h3 className="font-bold text-stone-800 mb-2">How do we pay for this?</h3>
              <p className="text-stone-600 text-sm">In the US, Early Intervention (0-3) is often state-funded or sliding scale. Insurance and Medicaid also cover many therapies.</p>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
