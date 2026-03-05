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

  const handleAccess = () => {
    const plan = session?.user?.subscriptionPlan;
    if (plan === "premium" || plan === "specialized") {
      router.push("/community/neurodiversity");
    } else {
      router.push("/pricing?error=premium_required");
    }
  };

  const handleHowItWorks = () => {
    router.push("/community/neurodiversity/how-it-works");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCF8] selection:bg-rose-100 selection:text-rose-900">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-rose-100/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-100/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow delay-1000" />
        <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-amber-50/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow delay-2000" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/60 text-stone-600 text-xs font-medium uppercase tracking-widest mb-8 shadow-sm">
              <Lock className="w-3 h-3 text-rose-500" />
              <span>Private Sanctuary</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-stone-900 mb-8 leading-[1.1] tracking-tight">
              A Private Community for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">Neurodiverse Families</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-stone-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              You do not have to navigate diagnosis, schooling, regulation, or burnout alone. This is a structured, moderated space designed for clarity and strength.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" onClick={handleAccess} className="rounded-full h-14 px-10 text-base bg-stone-900 hover:bg-stone-800 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Request Community Access
              </Button>
              <Button size="lg" variant="ghost" onClick={handleHowItWorks} className="rounded-full h-14 px-10 text-base text-stone-600 hover:bg-white/50 hover:text-stone-900 border border-transparent hover:border-stone-200 transition-all">
                Explore How It Works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-7xl space-y-32 relative z-10">
        
        {/* Section 1: Why We Built This */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-6 leading-tight">Why We Built This</h2>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                Many parents of neurodiverse children experience isolation, conflicting advice, and emotional exhaustion. Social media groups often amplify fear instead of offering grounded support.
              </p>
              <div className="h-1 w-20 bg-rose-500 rounded-full" />
            </div>
            <div className="md:col-span-7 grid gap-6">
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
                <motion.div 
                  key={i} 
                  whileHover={{ x: 10 }}
                  className="group flex items-start gap-6 p-6 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 hover:bg-white/80 transition-all duration-300 shadow-sm"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <card.icon className="w-6 h-6 text-stone-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">{card.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 2: Structured Pathways */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-6">Find Your Path</h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light">
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
                  whileHover={{ y: -8 }}
                  className="h-full bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-stone-300 group-hover:text-rose-300 transition-colors">0{i+1}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-stone-900 mb-3 group-hover:text-rose-600 transition-colors">{item.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Section 3: What You'll Receive (Glass Card) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative rounded-[3rem] overflow-hidden"
        >
          <div className="absolute inset-0 bg-stone-900" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
          
          <div className="relative z-10 p-10 md:p-20 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-10">What You’ll Receive</h2>
              <ul className="space-y-6">
                {[
                  "Weekly guided discussion threads",
                  "Monthly live expert Q&A",
                  "Resource library curated by professionals",
                  "Emotional regulation workshops",
                  "Parent roundtables",
                  "Downloadable planning templates"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-center text-stone-300">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/10">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 relative transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <Sparkles className="w-10 h-10 text-rose-300/80 absolute top-8 right-8" />
              <p className="text-2xl font-serif italic text-white leading-relaxed mb-8 opacity-90">
                “This is the first place I felt understood — not judged. The structure made all the difference.”
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full" />
                <div>
                  <p className="text-base font-bold text-white">Sarah J.</p>
                  <p className="text-sm text-stone-400">Parent of two</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Access Options */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-medium text-stone-900">Choose Your Access</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-stone-200 hover:border-stone-300 transition-all shadow-sm group">
              <span className="inline-block px-4 py-1 bg-stone-100 rounded-full text-xs font-bold text-stone-600 mb-6 tracking-wide uppercase">Community Access</span>
              <h3 className="text-3xl font-serif font-medium text-stone-900 mb-4">Request Access</h3>
              <p className="text-stone-500 mb-8 text-lg leading-relaxed">Join the discussion, connect with other parents, and access our curated resources.</p>
              <Button variant="outline" onClick={handleAccess} className="w-full h-14 rounded-full border-stone-300 text-stone-600 hover:bg-stone-50 hover:text-stone-900 text-lg">Join Community</Button>
            </div>
            
            <div className="bg-gradient-to-br from-stone-900 to-stone-800 p-10 rounded-[2.5rem] border border-stone-700 text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/30 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 group-hover:scale-125 transition-transform duration-1000" />
              <span className="inline-block px-4 py-1 bg-rose-600 rounded-full text-xs font-bold text-white mb-6 tracking-wide uppercase shadow-lg shadow-rose-900/20">Recommended</span>
              <h3 className="text-3xl font-serif font-medium text-white mb-4">Full Membership</h3>
              <p className="text-stone-400 mb-8 text-lg leading-relaxed">
                Unlock the full ecosystem of support, including all expert sessions, archives, and specialized pathways.
              </p>
              <Button onClick={handleAccess} className="w-full h-14 rounded-full bg-white text-stone-900 hover:bg-stone-100 text-lg font-medium shadow-xl">Request Access</Button>
            </div>
          </div>
        </motion.section>

        {/* Footer CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center py-20"
        >
           <h2 className="text-4xl md:text-6xl font-serif font-medium text-stone-900 mb-8">You Are Not Alone.</h2>
           <Button size="lg" onClick={handleAccess} className="rounded-full h-16 px-12 text-xl bg-stone-900 hover:bg-stone-800 text-white shadow-2xl hover:-translate-y-1 transition-all duration-300">
             Join the Community
           </Button>
        </motion.section>

      </div>
    </div>
  );
}
