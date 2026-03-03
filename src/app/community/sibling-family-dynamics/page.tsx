"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Users, Heart, Sparkles, Download, BookOpen, MessageCircle, Scale, Clock, Shield } from "lucide-react";
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

export default function SiblingFamilyDynamicsPage() {
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
              <Users className="w-4 h-4" />
              <span>Whole Family Health</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Sibling & Family Dynamics — <br/>
              <span className="text-rose-600">Balance for Everyone</span>
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Evidence-based strategies to support "glass children," manage household equilibrium, and ensure every family member feels seen and valued.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/community/neurodiverse-families">
                <Button size="lg" className="rounded-full h-12 px-8 text-base bg-stone-900 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all">
                  Join Family Community
                </Button>
              </Link>
              <Link href="#strategies">
                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-stone-300 hover:bg-white hover:text-stone-900">
                  Sibling Strategies
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-24">
        
        {/* Clinical Insight: The Glass Child */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">The "Glass Child" Phenomenon</h2>
            <div className="prose prose-stone text-stone-600">
              <p className="mb-4">
                Neurotypical siblings are sometimes called "glass children"—parents look right through them to see the needs of the neurodivergent child. While unintentional, this can lead to internalization of needs and anxiety.
              </p>
              <p>
                <strong>The Research Reality:</strong> Systematic reviews (Shivers et al., 2019) indicate that while siblings often develop higher levels of empathy and maturity, they are also at higher risk for depression if they feel their own needs are a burden to the family.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm relative">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
              DUAL IMPACT
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Heart className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Risk Factors</h4>
                  <p className="text-sm text-stone-500">Feeling "invisible," pressure to be perfect/low-maintenance, guilt over having typical abilities.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Sparkles className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900">Protective Factors</h4>
                  <p className="text-sm text-stone-500">Open communication about the diagnosis, scheduled 1:1 time with parents, and validation of negative feelings.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Practical Strategies */}
        <motion.section 
          id="strategies"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Practical Family Frameworks</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Structures to ensure fair attention distribution without burning out.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Strategy 1 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">01</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">The "15-Minute Anchor"</h3>
              <p className="text-stone-600 text-sm mb-4">
                Guaranteed daily 1:1 time for the sibling where <strong>no talk of the diagnosis is allowed</strong>. It must be inviolable—if therapy runs late, this time is rescheduled, not cancelled.
              </p>
              <div className="flex gap-2 items-center text-xs text-stone-500 bg-stone-50 p-2 rounded">
                <Clock className="w-3 h-3" /> Creates secure attachment.
              </div>
            </motion.div>

            {/* Strategy 2 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">02</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Information Access</h3>
              <p className="text-stone-600 text-sm mb-4">
                Use age-appropriate books to explain the diagnosis. Confusion breeds anxiety. When siblings understand <em>why</em> a behavior happens (sensory overload vs "being mean"), resentment decreases.
              </p>
              <div className="flex gap-2 items-center text-xs text-stone-500 bg-stone-50 p-2 rounded">
                <BookOpen className="w-3 h-3" /> Demystifies behavior.
              </div>
            </motion.div>

            {/* Strategy 3 */}
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-200 transition-colors">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center font-serif font-bold text-stone-900 mb-6">03</div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Safe Zones</h3>
              <p className="text-stone-600 text-sm mb-4">
                Physical boundaries are crucial. Ensure the sibling has a room or desk that is physically locked or off-limits to the neurodivergent child to protect their possessions and peace.
              </p>
              <div className="flex gap-2 items-center text-xs text-stone-500 bg-stone-50 p-2 rounded">
                <Shield className="w-3 h-3" /> Restores agency.
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Evidence Note */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-50 rounded-[2rem] p-10 border border-stone-100"
        >
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8">The Power of Sibling Involvement</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">Sibling-Mediated Intervention</h3>
              <p className="text-sm text-stone-600 mb-4">
                Research by Ferraioli & Harris (2011) shows that teaching siblings structured ways to play with their autistic brother/sister improves the sibling's sense of competence and relationship quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-2">Reframing the Narrative</h3>
              <p className="text-sm text-stone-600 mb-4">
                Using the "Double ABCX Model" of family stress, outcomes depend not just on the stressor, but on the family's <em>perception</em> of it. Framing neurodiversity as a difference rather than a tragedy protects sibling mental health.
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
              <AccordionTrigger className="text-left font-medium text-stone-900">How much caregiving should they do?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                Be cautious with "parentification." While small helping tasks build responsibility, siblings should not be primary caregivers or behavior managers. Their primary role should remain "brother" or "sister," not "junior therapist."
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium text-stone-900">Is it okay for them to feel angry?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                Yes. Validate negative emotions ("It is really frustrating when he breaks your legos") without judgment. If they feel they can't express anger safely at home, they may internalize it.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium text-stone-900">How do I explain "fairness"?</AccordionTrigger>
              <AccordionContent className="text-stone-600">
                Shift the conversation from "equal" to "equitable." Explain: "Fair means everyone gets what they need to be successful. Your brother needs headphones to handle noise; you need soccer practice to burn energy. We give you both what you need."
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
            <h2 className="text-3xl font-serif font-bold mb-4">Start the Conversation</h2>
            <p className="text-stone-300 mb-8 max-w-xl mx-auto">
              Download our "Family Meeting Guide" to structure a safe, open conversation about everyone's needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full bg-white text-stone-900 hover:bg-stone-100 gap-2">
                <Download className="w-4 h-4" /> Download Guide
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
            <li>Ferraioli, S. J., & Harris, S. L. (2011). Effective Educational Inclusion of Students on the Autism Spectrum. <em>Journal of Contemporary Psychotherapy</em>.</li>
            <li>Shivers, C. M., & Plavnick, J. B. (2014). Sibling involvement in interventions for individuals with autism spectrum disorders: A systematic review. <em>Journal of Autism and Developmental Disorders</em>.</li>
            <li>Meadan, H., Stoner, J. B., & Angell, M. E. (2010). Review of literature related to the social, emotional, and behavioral adjustment of siblings of individuals with autism spectrum disorder. <em>Journal of Developmental and Physical Disabilities</em>.</li>
            <li>McCubbin, H. I., & Patterson, J. M. (1983). The family stress process: The Double ABCX Model. <em>Social stress and the family</em>.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
