"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Heart, Brain, Users, Sparkles, Shield, ArrowRight, MessageCircle, Lock, GraduationCap, UserPlus, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

export default function NeurodiverseFamilyCommunityPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handlePreviewAccess = () => {
    const plan = session?.user?.subscriptionPlan;
    if (plan === "premium" || plan === "specialized") {
      router.push("/community/neurodiversity");
    } else {
      router.push("/pricing?error=premium_required");
    }
  };

  const handleFullAccess = () => {
    const plan = session?.user?.subscriptionPlan;
    if (plan === "specialized") {
      router.push("/community/neurodiversity");
    } else {
      router.push("/pricing?error=specialized_required");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-rose-50 to-stone-50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-100/30 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200 text-rose-700 text-sm font-medium mb-6 shadow-sm">
              <Lock className="w-4 h-4" />
              <span>Private Community Access</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              A Private Community for <br/>
              <span className="text-rose-600">Neurodiverse Families</span>
            </h1>
            <p className="text-lg md:text-xl font-serif font-medium text-stone-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              You do not have to navigate diagnosis, schooling, regulation, or burnout alone. This is a structured, moderated space designed for parents who want clarity, support, and strength.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full h-12 px-8 text-base bg-stone-900 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all">
                Request Community Access
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-stone-300 hover:bg-white hover:text-stone-900">
                Explore How It Works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
        
        {/* Section 1: Why We Built This */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Why We Built This</h2>
            <p className="text-stone-600 leading-relaxed text-lg">
              Many parents of neurodiverse children experience isolation, conflicting advice, and emotional exhaustion. Social media groups often amplify fear instead of offering grounded support. We created a calm, guided environment rooted in structure, lived experience, and professional insight.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Structured Conversations", 
                desc: "Organized rooms based on stage and needs — not chaos.",
                icon: MessageCircle 
              },
              { 
                title: "Moderated & Safe", 
                desc: "Respectful discussions. No misinformation. No judgment.",
                icon: Shield 
              },
              { 
                title: "Expert-Led Guidance", 
                desc: "Monthly sessions with therapists, educators, and specialists.",
                icon: GraduationCap 
              }
            ].map((card, i) => (
              <Card key={i} className="border-stone-100 shadow-sm hover:shadow-md transition-all bg-white h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-4">
                    <card.icon className="w-6 h-6 text-rose-500" />
                  </div>
                  <CardTitle className="text-xl font-serif text-stone-900">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Section 2: Structured Pathways */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Find Your Path</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              We guide you through specific stages of the journey, ensuring relevant support at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: "Early Diagnosis Support", 
                desc: "For parents navigating assessment, therapy options, and first steps.",
                href: "/community/early-diagnosis-support"
              },
              { 
                title: "School-Age Navigation", 
                desc: "IEPs, classroom strategies, advocacy, and communication with teachers.",
                href: "/community/school-age-navigation"
              },
              { 
                title: "Teenage & Transition Years", 
                desc: "Identity, independence, and long-term planning.",
                href: "/community/teenage-transition-years"
              },
              { 
                title: "Sibling & Family Dynamics", 
                desc: "Supporting the whole household equilibrium.",
                href: "/community/sibling-family-dynamics"
              },
              { 
                title: "Parent Regulation & Burnout", 
                desc: "Tools for emotional resilience and sustainable caregiving.",
                href: "/community/parent-regulation-burnout"
              }
            ].map((item, i) => (
              <Link key={i} href={item.href}>
                <motion.div 
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all cursor-pointer group h-full"
                >
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mb-4 group-hover:bg-rose-50 transition-colors">
                    <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-rose-500 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Section 3: What You'll Receive */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-stone-100 overflow-hidden relative"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">What You’ll Receive</h2>
              <ul className="space-y-4">
                {[
                  "Weekly guided discussion threads",
                  "Monthly live expert Q&A",
                  "Resource library curated by professionals",
                  "Emotional regulation workshops",
                  "Parent roundtables",
                  "Downloadable planning templates"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center text-stone-700">
                    <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-rose-500" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-50 p-10 rounded-3xl border border-stone-100 relative">
              <Sparkles className="w-8 h-8 text-rose-300 absolute top-6 right-6 opacity-50" />
              <p className="text-xl font-serif italic text-stone-800 leading-relaxed mb-6">
                “This is the first place I felt understood — not judged. The structure made all the difference.”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-200 rounded-full" />
                <div>
                  <p className="text-sm font-bold text-stone-900">Sarah J.</p>
                  <p className="text-xs text-stone-500">Parent of two</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: How It Works */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-12">Simple, Safe, Structured</h2>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-stone-200 -z-10" />
            
            {[
              { step: "01", title: "Request Access", desc: "Start your journey." },
              { step: "02", title: "Intake Form", desc: "Complete a short form so we can guide you correctly." },
              { step: "03", title: "Enter Pathway", desc: "Receive access to your structured community space." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center bg-stone-50 p-6 rounded-2xl md:bg-transparent md:p-0">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-stone-100 flex items-center justify-center text-2xl font-bold text-rose-500 shadow-sm mb-6 z-10">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 5: Access Options */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-stone-200 hover:border-stone-300 transition-all">
              <span className="inline-block px-3 py-1 bg-stone-100 rounded-full text-xs font-bold text-stone-600 mb-4">Preview</span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Preview (Premium Members)</h3>
              <p className="text-stone-500 mb-6 text-sm">Explore community discussions and attend one live session to experience the Neurodiverse Family Community.</p>
              <Button variant="outline" onClick={handlePreviewAccess} className="w-full rounded-full border-stone-300">Start Preview</Button>
            </div>
            
            <div className="bg-stone-900 p-8 rounded-3xl border border-stone-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2" />
              <span className="inline-block px-3 py-1 bg-rose-600 rounded-full text-xs font-bold text-white mb-4">Recommended</span>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">Full Membership (Specialized Members)</h3>
              <p className="text-stone-400 mb-6 text-sm">
                Includes: <br/>
                • Full community discussions <br/>
                • Live expert sessions <br/>
                • Complete resource library <br/>
                • Session archives <br/>
                • Guided support pathways <br/>
                • Neurodiversity expert frameworks
              </p>
              <Button onClick={handleFullAccess} className="w-full rounded-full bg-white text-stone-900 hover:bg-stone-100">Request Access</Button>
            </div>
          </div>
        </motion.section>

        {/* Footer CTA */}
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
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">You Are Not Alone in This Journey</h2>
             <p className="text-lg text-stone-600 mb-8 font-medium">
               Support is stronger when it is structured.
             </p>
             <Button size="lg" className="rounded-full h-14 px-10 text-lg bg-stone-900 hover:bg-stone-800 shadow-xl hover:shadow-2xl transition-all">
               Join the Neurodiverse Family Community
             </Button>
           </div>
        </motion.section>

      </div>
    </div>
  );
}
