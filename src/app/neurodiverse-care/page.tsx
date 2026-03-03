"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, Heart, Brain, Users, Sparkles, Clock, AlertTriangle, Star, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function NeurodiverseCarePage() {
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
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200 text-rose-700 text-sm font-medium mb-6 shadow-sm">
              <Brain className="w-4 h-4" />
              <span>Family Support & Integration</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Neurodiverse <br/>
              <span className="text-rose-600">Care</span>
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-4 max-w-2xl mx-auto">
              Strategic Roadmap for Family Support & Community Integration
            </p>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed font-light">
              At Mother Era, we believe every child’s journey is meaningful, valuable, and worthy of celebration. Our Neurodiverse Care program provides a structured, compassionate roadmap that helps families move from uncertainty to confidence, from crisis to clarity, and from isolation to empowered community integration.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
        
        {/* Section 1: Redefining Success */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-x-12 gap-y-12 items-center"
        >
          <div className="md:col-span-1">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Redefining Success in Neurodevelopment</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              The diagnostic period can feel overwhelming — like a sudden collapse of expectations. Our philosophy shifts families from a “fixing” mindset to an evolutionary growth mindset.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6 font-medium italic border-l-4 border-rose-200 pl-4">
              Being “okay” does not mean curing. <br/>
              It means moving from the terrifying unknown to the managed known.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              We actively eliminate the “prejudice of low expectations.” We assume competence in every interaction. Every child has capacity. Every child deserves belief.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-[100px] -mr-8 -mt-8" />
              <h3 className="text-xl font-bold text-stone-900 mb-6 relative z-10">We Redefine Success Through:</h3>
              <ul className="space-y-4 relative z-10">
                {[
                  "Progress over perfection",
                  "Daily living milestones",
                  "Independence at any level",
                  "Internal joy rather than external comparison"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-rose-500" />
                    </div>
                    <span className="text-stone-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Section 2: From Crisis to Clarity */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-stone-100"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">From Diagnosis Crisis to Clarity</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                A diagnosis often triggers emotional disintegration. Our role is not just clinical. We are journey partners.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <p className="text-stone-600">We help families process:</p>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <Heart className="w-5 h-5 text-rose-400 shrink-0 mt-1" />
                    <div>
                      <span className="font-bold text-stone-800">Tears and anger</span>
                      <p className="text-sm text-stone-500">as natural responses</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Clock className="w-5 h-5 text-rose-400 shrink-0 mt-1" />
                    <div>
                      <span className="font-bold text-stone-800">Fear</span>
                      <p className="text-sm text-stone-500">by focusing on the next hour, not the next 20 years</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Shield className="w-5 h-5 text-rose-400 shrink-0 mt-1" />
                    <div>
                      <span className="font-bold text-stone-800">Denial</span>
                      <p className="text-sm text-stone-500">as a temporary shield</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Sparkles className="w-5 h-5 text-rose-400 shrink-0 mt-1" />
                    <div>
                      <span className="font-bold text-stone-800">Relief</span>
                      <p className="text-sm text-stone-500">as validation of parental intuition</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-rose-50/50 p-8 rounded-2xl border border-rose-100 flex flex-col justify-center">
                <p className="text-stone-700 text-lg leading-relaxed italic mb-4">
                  "Instead of overwhelming families with distant futures, we collapse the timeline into actionable next steps."
                </p>
                <div className="font-bold text-rose-800">
                  Stability begins with clarity. <br/>
                  Clarity begins with partnership.
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Managing Public Judgment */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-center"
        >
          <div className="order-2 md:order-1">
             <div className="bg-stone-900 text-white p-8 md:p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-stone-800 rounded-full blur-[60px] translate-x-1/3 -translate-y-1/3" />
                <h3 className="text-2xl font-serif font-bold mb-6 relative z-10">Public Interaction Toolkit</h3>
                <div className="space-y-6 relative z-10">
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                    <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">We Replace</p>
                    <p className="text-xl font-medium text-stone-300 line-through">"I'm sorry."</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-6 h-6 text-white/50 rotate-90 md:rotate-0" />
                  </div>
                  <div className="bg-rose-600 p-4 rounded-xl shadow-lg border border-rose-500">
                    <p className="text-rose-100 text-xs uppercase tracking-wider mb-1">With</p>
                    <p className="text-2xl font-bold text-white">"We are proud."</p>
                  </div>
                </div>
             </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Managing Public Judgment with Confidence</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Families of children with invisible disabilities often face social misunderstanding. To prevent isolation and burnout, we build tactical resilience.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              By reframing social encounters and empowering parents with communication strategies, we preserve family energy for what truly matters — growth and connection.
            </p>
            <p className="font-bold text-stone-900 text-lg">
              Thick skin is not personality. <br/>
              It is strategy.
            </p>
          </div>
        </motion.section>

        {/* Section 4: Building the Village */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Building the Village</h2>
            <p className="text-stone-600">No family thrives alone. Community is not accidental. It is designed.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Peers", desc: "Classmates for social inclusion" },
              { icon: Heart, title: "Family", desc: "Neighbors & extended family for acceptance" },
              { icon: Brain, title: "Clinical", desc: "Professionals for structured development" },
              { icon: Star, title: "Partners", desc: "Community for vocational pathways" }
            ].map((item, i) => (
              <Card key={i} className="border-stone-100 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto bg-rose-50 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-rose-500" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-stone-600">
                  {item.desc}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-stone-50 rounded-2xl p-8 border border-stone-200 text-center">
            <h3 className="font-serif font-bold text-stone-900 mb-6">Transforming Interests into Purpose</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-lg font-medium text-stone-700">
              <span>Interests</span>
              <ArrowRight className="w-5 h-5 text-rose-400 rotate-90 md:rotate-0" />
              <span>Passions</span>
              <ArrowRight className="w-5 h-5 text-rose-400 rotate-90 md:rotate-0" />
              <span>Purpose</span>
              <ArrowRight className="w-5 h-5 text-rose-400 rotate-90 md:rotate-0" />
              <span className="text-rose-600 font-bold">Meaningful Roles</span>
            </div>
            <p className="mt-6 text-stone-600 max-w-2xl mx-auto">
              When a child’s intense interests are nurtured instead of suppressed, they often become the foundation for independence and fulfillment.
            </p>
          </div>
        </motion.section>

        {/* Section 5: Transformation Table */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">From Disintegration to Joy</h2>
            <p className="text-stone-600">Raising a child with special needs reshapes perspective, patience, and humanity. The goal is resilience, integration, and sustainable joy.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-stone-900 text-white p-6 text-sm md:text-base font-serif font-bold tracking-wide">
              <div className="col-span-1">The Family Evolution</div>
              <div className="col-span-1 text-center text-rose-200">Early Stage <br/><span className="text-xs font-sans font-normal text-white/70">Disintegration</span></div>
              <div className="col-span-1 text-center text-sky-200">Later Stage <br/><span className="text-xs font-sans font-normal text-white/70">Hope & Integration</span></div>
            </div>
            
            <div className="divide-y divide-stone-100">
              {[
                { label: "Primary Goal", early: "Searching for cures", late: "Celebrating identity" },
                { label: "View of Future", early: "Paralyzing fear", late: "Focus on next step" },
                { label: "Source of Knowledge", early: "External fixes", late: "Community & lived experience" },
                { label: "Perspective", early: "Comparison to peers", late: "Celebration of milestones" },
                { label: "Community", early: "Isolation", late: "Integrated support network" }
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 p-6 text-sm md:text-base hover:bg-stone-50 transition-colors">
                  <div className="col-span-1 font-bold text-stone-900 flex items-center">{row.label}</div>
                  <div className="col-span-1 text-center text-stone-600 border-l border-stone-100 flex items-center justify-center px-2">{row.early}</div>
                  <div className="col-span-1 text-center text-stone-900 font-medium border-l border-stone-100 flex items-center justify-center px-2">{row.late}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-rose-50 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
           
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">You Are Not Alone</h2>
             <p className="text-lg text-stone-600 mb-8 leading-relaxed">
               Through belief, structured guidance, and community support, families move from instability to confidence. Every journey is different — and every journey is worthy.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button size="lg" className="rounded-full h-12 px-8 text-base bg-stone-900 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all">
                 Explore Support Programs
               </Button>
               <Link href="/community/neurodiverse-families">
                 <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-stone-300 hover:bg-white hover:text-stone-900">
                   Join Our Community
                 </Button>
               </Link>
             </div>
           </div>
        </motion.section>

      </div>
    </div>
  );
}
