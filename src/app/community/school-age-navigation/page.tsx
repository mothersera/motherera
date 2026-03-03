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

export default function SchoolAgeNavigationPage() {
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
              <FileText className="w-3 h-3" />
              <span>Advocacy & Strategies</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
              School-Age Navigation — <br/>
              <span className="text-rose-600">IEPs & Classrooms</span>
            </h1>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              Empowering parents with knowledge of IEP rights, effective classroom strategies, and confident advocacy for their child's education.
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
        
        {/* IEP Basics */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Understanding IEPs & 504 Plans</h2>
          <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm space-y-4">
            <p className="text-stone-700">An <strong>IEP (Individualized Education Program)</strong> is a legal document ensuring specialized instruction. A <strong>504 Plan</strong> provides accommodations for equal access.</p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-stone-50 p-4 rounded-xl">
                <h3 className="font-bold text-stone-800 mb-2">IEP Includes:</h3>
                <ul className="text-sm text-stone-600 list-disc list-inside">
                  <li>Specific goals (measurable)</li>
                  <li>Specialized instruction minutes</li>
                  <li>Accommodations & modifications</li>
                </ul>
              </div>
              <div className="bg-stone-50 p-4 rounded-xl">
                <h3 className="font-bold text-stone-800 mb-2">Key Parent Rights:</h3>
                <ul className="text-sm text-stone-600 list-disc list-inside">
                  <li>Right to request evaluation</li>
                  <li>Right to bring an advocate</li>
                  <li>Right to disagree (Due Process)</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs text-stone-400 italic">Source: US Dept of Education / IDEA Guidelines.</p>
          </div>
        </motion.section>

        {/* Practical Prep */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Meeting Preparation Checklist</h2>
          <div className="grid gap-4">
            {[
              "Review current IEP draft 3-5 days before the meeting.",
              "Prepare a 'Parent Vision Statement' (1 paragraph on strengths/concerns).",
              "Bring data: work samples, private evaluation reports, or behavior logs.",
              "List 3 specific goals you want added or updated.",
              "Request a draft of meeting notes before leaving."
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
              <Download className="w-4 h-4" /> Download Meeting Template
            </Button>
          </div>
        </motion.section>

        {/* Classroom Strategies */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Effective Classroom Supports</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white border-stone-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Visual Supports</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600">
                Visual schedules, task checklists, and clearly labeled organization bins reduce anxiety and build independence.
              </CardContent>
            </Card>
            <Card className="bg-white border-stone-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Sensory Breaks</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600">
                Scheduled movement breaks, quiet corners, or noise-canceling headphones help regulation during busy days.
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Scripts */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-100 rounded-3xl p-8"
        >
          <h2 className="text-xl font-bold text-stone-900 mb-6">Advocacy Scripts</h2>
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <h3 className="font-bold text-stone-800 mb-2">Requesting an Evaluation</h3>
              <p className="text-stone-600 text-sm italic">"I am writing to formally request a comprehensive evaluation for [Child's Name] to determine eligibility for special education services. I have concerns regarding [Specific Area]."</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <h3 className="font-bold text-stone-800 mb-2">Addressing a Concern</h3>
              <p className="text-stone-600 text-sm italic">"I've noticed [Issue] occurring frequently. Can we schedule a brief call to discuss potential strategies or adjustments to the current support plan?"</p>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
