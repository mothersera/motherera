"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, FileText, Calendar, Activity, Phone, Download, Clock, GraduationCap, Briefcase, Heart, Landmark, BookOpen } from "lucide-react";
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

export default function TeenageTransitionYearsPage() {
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
              <GraduationCap className="w-4 h-4" />
              <span>Identity & Independence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Teenage Transition Years — <br/>
              <span className="text-rose-600">Planning for Future</span>
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Navigating the critical shift from school-based services to adult independence. Evidence-based planning for employment, independent living, and legal rights before age 22.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/community/neurodiverse-families">
                <Button size="lg" className="rounded-full h-12 px-8 text-base bg-stone-900 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all">
                  Join Family Community
                </Button>
              </Link>
              <Link href="#timeline">
                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-stone-300 hover:bg-white hover:text-stone-900">
                  View Timeline
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-24">
        
        {/* Clinical Insight: The Service Cliff */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Navigating "The Service Cliff"</h2>
            <div className="prose prose-stone text-stone-600">
              <p className="mb-4">
                Upon graduation or age 22, the legal framework shifts from <strong>Entitlement</strong> (IDEA: school <em>must</em> provide services) to <strong>Eligibility</strong> (ADA: adult services <em>may</em> be provided if qualified and funded).
              </p>
              <p>
                <strong>The Daily Living Skills Gap:</strong> A longitudinal study in the <em>Journal of Consulting and Clinical Psychology</em> found that "Daily Living Skills" (cooking, transport, hygiene) were a stronger predictor of positive adult outcomes than IQ or autism symptom severity. Transition planning often over-focuses on academics and under-focuses on these life skills.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm relative">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
              CORE PILLARS
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Briefcase className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Vocational Skills</h4>
                  <p className="text-sm text-stone-500">Supported employment models show ~80% retention vs &lt;10% for sheltered workshops (Wehman et al.).</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Heart className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Social Identity</h4>
                  <p className="text-sm text-stone-500">Understanding one's own diagnosis ("Self-Determination") reduces anxiety and depression in adulthood.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Transition Timeline */}
        <motion.section 
          id="timeline"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Age-Based Transition Timeline</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Federal law (IDEA) requires transition planning to start by age 16 (14 in some states). Start early.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Phase 1 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">14-16</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Discovery Phase</h3>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Formal Transition Plan added to IEP (goals for post-school).</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Interest inventories & vocational assessments.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Begin travel training (using public transport/Uber).</span>
                </li>
              </ul>
            </motion.div>

            {/* Phase 2 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">17-18</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Linkage Phase</h3>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Apply to state Vocational Rehabilitation (VR) agencies.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Explore Guardianship vs. Supported Decision Making (SDM).</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Apply for SSI (Supplemental Security Income) at age 18.</span>
                </li>
              </ul>
            </motion.div>

            {/* Phase 3 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">19-21</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Launch Phase</h3>
              <ul className="space-y-3">
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Community college disability services registration.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Job trials or internship placements.</span>
                </li>
                <li className="flex gap-2 items-start text-sm text-stone-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>Establish adult medical care (transition from pediatrician).</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Supported Employment Evidence */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-50 rounded-[2rem] p-10 border border-stone-100"
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8">The Case for Supported Employment</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">What It Is</h3>
              <p className="text-sm text-stone-600 mb-4">
                Supported Employment (SE) places individuals in competitive jobs alongside non-disabled peers, with ongoing support from a job coach. It contrasts with "sheltered workshops" where pay is sub-minimum wage.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">Outcomes</h3>
              <p className="text-sm text-stone-600 mb-4">
                Systematic reviews (Hedley et al., 2017) confirm SE leads to higher wages, better quality of life, and longer job retention. Focus on <strong>customized employment</strong> (carving out specific roles) is most effective.
              </p>
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
              <AccordionTrigger className="text-left font-medium text-stone-900">What if my child isn't ready for college?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                That is completely okay. "Transition programs" (18-21 programs) offered by school districts focus on life skills and job training. Gap years, trade schools, or part-time community college with reduced course loads are also valid paths.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium text-stone-900">Do I need Guardianship?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                Guardianship removes legal rights. Consider <strong>Supported Decision Making (SDM)</strong> first, which allows the individual to retain rights but choose trusted advisors to help with medical/financial decisions. It is less restrictive and promotes autonomy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium text-stone-900">How do we prevent social isolation?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                Structured interest groups (Dungeons & Dragons, coding clubs, anime meets) are more effective than generic "social skills groups" for adults. Focus on "shared joy" activities.
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
            <h2 className="text-3xl font-serif font-bold mb-4">Start Your Plan</h2>
            <p className="text-stone-300 mb-8 max-w-xl mx-auto">
              Download our "Transition Worksheet" to map out vocational goals, independent living skills, and legal deadlines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full bg-white text-stone-900 hover:bg-stone-100 gap-2">
                <Download className="w-4 h-4" /> Download Worksheet
              </Button>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="rounded-full border-stone-600 text-stone-200 hover:bg-stone-800 hover:text-white">
                  Go to Dashboard Planner
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
            <li>Hedley, D., et al. (2017). Employment programs and interventions targeting adults with autism spectrum disorder: A systematic review. <em>Autism</em>.</li>
            <li>Wehman, P., et al. (2016). Competitive Employment for Youth with Autism Spectrum Disorder. <em>Journal of Autism and Developmental Disorders</em>.</li>
            <li>Bal, V. H., et al. (2015). Daily living skills in individuals with autism spectrum disorder from 2 to 21 years of age. <em>Autism</em>.</li>
            <li>US Department of Education. <em>A Transition Guide to Postsecondary Education and Employment for Students and Youth with Disabilities</em>.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
