"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, FileText, Calendar, Activity, Phone, Download, Clock, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TeenageTransitionYearsPage() {
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
              <GraduationCap className="w-3 h-3" />
              <span>Identity & Independence</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
              Teenage Transition Years — <br/>
              <span className="text-rose-600">Planning for Future</span>
            </h1>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              Navigating the shift from school-based services to adult independence, focusing on vocational skills, social identity, and legal planning.
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
        
        {/* Core Goals */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Core Transition Goals</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Employment & Vocation", desc: "Exploring job coaching, internships, and supported employment options." },
              { title: "Independent Living", desc: "Building daily skills: cooking, budgeting, transport navigation." },
              { title: "Social Connection", desc: "Finding community groups, hobbies, and sustainable peer relationships." },
              { title: "Legal & Financial", desc: "Understanding guardianship options, SSI/SSDI, and ABLE accounts." }
            ].map((item, i) => (
              <Card key={i} className="bg-white border-stone-100">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-stone-600">
                  {item.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Transition Checklist */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Transition Planning Timeline</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <h3 className="font-bold text-rose-600 mb-3">Age 14-16</h3>
              <ul className="list-disc list-inside text-stone-600 space-y-2">
                <li>Formal transition planning begins in IEP meeting.</li>
                <li>Interest inventories & vocational assessments.</li>
                <li>Practice self-advocacy (attending IEP meetings).</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <h3 className="font-bold text-rose-600 mb-3">Age 17-18</h3>
              <ul className="list-disc list-inside text-stone-600 space-y-2">
                <li>Explore post-secondary options (college, trade school).</li>
                <li>Connect with state vocational rehabilitation agencies.</li>
                <li>Review guardianship/alternatives before age 18.</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="gap-2 rounded-full">
              <Download className="w-4 h-4" /> Download Transition Worksheet
            </Button>
          </div>
        </motion.section>

        {/* Supported Employment */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-50 p-8 rounded-2xl border border-stone-100"
        >
          <h2 className="text-xl font-bold text-stone-900 mb-4">Supported Employment Evidence</h2>
          <p className="text-stone-700 leading-relaxed mb-4">
            Research confirms that <strong>supported employment</strong> (job coaching + placement) significantly improves long-term outcomes compared to sheltered workshops. A meta-analysis of employment programs for adults with autism found that individualized supported employment models yielded employment rates of 75-80%, compared to less than 10% for traditional day services (Hedley et al., 2017). Focus on strengths-based placement leads to higher retention and satisfaction.
          </p>
          <p className="text-xs text-stone-400 italic">Source: Systematic reviews on vocational outcomes for autistic adults (Hedley et al., 2017; Wehman et al., 2016).</p>
        </motion.section>

        {/* CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center bg-white p-10 rounded-3xl border border-stone-200 shadow-sm"
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Start Your Plan</h2>
          <p className="text-stone-600 mb-8 max-w-lg mx-auto">
            Use our digital tools to map out goals, track progress, and store important documents.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="rounded-full bg-stone-900 text-white hover:bg-stone-800">
              Go to Dashboard Planner
            </Button>
          </Link>
        </motion.section>

      </div>
    </div>
  );
}
