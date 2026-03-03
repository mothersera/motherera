"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Battery, Coffee, Sun, Shield, Download, Brain, Heart, BookOpen } from "lucide-react";
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

export default function ParentRegulationBurnoutPage() {
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
              <Battery className="w-4 h-4" />
              <span>Caregiver Resilience</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Parent Regulation — <br/>
              <span className="text-rose-600">Burnout Prevention</span>
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              You cannot pour from an empty cup. Evidence-based strategies to manage caregiver stress, regulate your nervous system, and build sustainable resilience for the long journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/five-minute-reset">
                <Button size="lg" className="rounded-full h-12 px-8 text-base bg-stone-900 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all">
                  Start Five-Minute Reset
                </Button>
              </Link>
              <Link href="/community/neurodiverse-families">
                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-stone-300 hover:bg-white hover:text-stone-900">
                  Join Support Group
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-24">
        
        {/* Clinical Insight: Co-Regulation */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">The Science of Co-Regulation</h2>
            <div className="prose prose-stone text-stone-600">
              <p className="mb-4">
                Caregiver stress is the strongest predictor of family functioning. Research shows that children co-regulate with their parents; a calm caregiver provides a biological "anchor" for a child's nervous system.
              </p>
              <p>
                <strong>The Burnout Cycle:</strong> Chronic parental burnout is linked to higher rates of child behavioral challenges, creating a feedback loop. Breaking this cycle requires a radical shift: prioritizing parent regulation as a <em>clinical necessity</em>, not a luxury (Hastings et al., 2005).
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm relative">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
              NERVOUS SYSTEM
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Brain className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Vagus Nerve Regulation</h4>
                  <p className="text-sm text-stone-500">Stimulating the vagus nerve (via breath or cold water) signals safety to the brain, lowering cortisol levels instantly.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Shield className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Protective Factors</h4>
                  <p className="text-sm text-stone-500">Social support and "positive reframing" are the two highest indicators of resilience in neurodiverse parenting (Pakenham et al.).</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Micro-Practices */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Micro-Practices for Regulation</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Sustainable caregiving happens in small, consistent moments, not just occasional vacations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mb-6">
                <Coffee className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">The Morning Anchor</h3>
              <p className="text-stone-600 text-sm mb-4">
                Before the chaos starts, take 2 minutes to drink water and breathe. Set one intention: "Today, I will focus on my own breath during difficult moments."
              </p>
              <div className="text-xs font-bold text-stone-400">TIME: 2 MIN</div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                <Sun className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Sensory Reset</h3>
              <p className="text-stone-600 text-sm mb-4">
                When feeling "flooded," physically change your environment. Step outside, feel the sun, or wash your hands with cold water to reset your nervous system.
              </p>
              <div className="text-xs font-bold text-stone-400">TIME: 30 SEC</div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">The "Done" List</h3>
              <p className="text-stone-600 text-sm mb-4">
                Instead of a to-do list, write down 3 things you <em>did</em> achieve today (e.g., "I remained calm during the IEP call"). Celebrate survival and small wins.
              </p>
              <div className="text-xs font-bold text-stone-400">TIME: 1 MIN</div>
            </motion.div>
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
              <AccordionTrigger className="text-left font-medium text-stone-900">How do I find time for self-care when I'm 24/7?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                Shift the definition of self-care from "activities" to "regulation." You don't need an hour at the gym; you need 30 seconds of deep breathing while the microwave is running. These <strong>micro-moments</strong> add up to prevent full system collapse.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium text-stone-900">I feel guilty when I'm not focusing on my child.</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                Guilt is a common but destructive emotion. Reframe it: <strong>Regulating yourself is the best gift you can give your child.</strong> A regulated parent is a more effective advocate and a safer emotional harbor.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium text-stone-900">What are the signs of caregiver burnout?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                Signs include chronic exhaustion that sleep doesn't fix, increased irritability, feeling "numb" or detached, and loss of interest in things you once enjoyed. If you feel these, it is time to mobilize your support network.
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
            <h2 className="text-3xl font-serif font-bold mb-4">Build Your Resilience Plan</h2>
            <p className="text-stone-300 mb-8 max-w-xl mx-auto">
              Download our "Caregiver Resilience Template" to map out your support network, emergency contacts, and personal regulation triggers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full bg-white text-stone-900 hover:bg-stone-100 gap-2">
                <Download className="w-4 h-4" /> Download Plan PDF
              </Button>
              <Link href="/five-minute-reset">
                <Button size="lg" variant="outline" className="rounded-full border-stone-600 text-stone-200 hover:bg-stone-800 hover:text-white">
                  Try 5-Minute Reset
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
            <li>Hastings, R. P., et al. (2005). Systems analysis of stress and positive perceptions in mothers and fathers of pre-school children with autism. <em>Journal of Autism and Developmental Disorders</em>.</li>
            <li>Pakenham, K. I., et al. (2005). Relations between social support, appraisal, and coping and adjustmet in mothers of children with autism. <em>Autism</em>.</li>
            <li>Zablotsky, B., et al. (2013). The association between child autism symptomatology, maternal depression, and the parent-child relationship. <em>Journal of Autism and Developmental Disorders</em>.</li>
            <li>Dykens, E. M., et al. (2014). Reducing distress in mothers of children with autism and other disabilities: A randomized trial. <em>Pediatrics</em>.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

