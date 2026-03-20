"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Shield, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Lock, 
  Calendar, 
  Mic, 
  Activity, 
  Sparkles,
  Leaf,
  Baby,
  Brain,
  Smile,
  Zap,
  Coffee,
  Sun,
  Moon,
  Star,
  Battery,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Animation variants
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

export default function PartnershipCirclePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("communication");
  const [showCounselorForm, setShowCounselorForm] = useState(false);
  const [counselorRequestSent, setCounselorRequestSent] = useState(false);
  const [weeklyCheckInStep, setWeeklyCheckInStep] = useState(0);
  const [weeklyCheckInAnswers, setWeeklyCheckInAnswers] = useState<string[]>([]);

  // Membership Gating Logic
  useEffect(() => {
    if (status === "loading") return;

    const userPlan = session?.user?.subscriptionPlan || "basic";
    
    // If not logged in or basic plan, redirect to pricing
    if (!session || userPlan === "basic") {
      // We'll show a teaser/locked view instead of immediate redirect for better UX?
      // The prompt says: "When they try to access it, redirect to /pricing... Show message: Partnership Circle is available for Premium and Specialized members."
      // For a smoother experience, we can redirect or show a "Locked" overlay. Let's follow the prompt strictly: redirect to pricing.
      // However, usually it's better to show a "Join Now" page. But I will follow instructions.
      // Wait, let's allow rendering the page but overlay a "Premium Only" modal on load?
      // No, prompt says: "Basic Plan Users cannot access Partnership Circle. When they try to access it, redirect to /pricing"
      
      // I will implement a check that runs on mount.
      if (status === "unauthenticated" || userPlan === "basic") {
         router.push("/pricing?reason=partnership-circle-access");
      }
    }
  }, [session, status, router]);

  // If loading or unauthorized, show loading state
  if (status === "loading" || !session || session?.user?.subscriptionPlan === "basic") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600 font-medium">Verifying membership access...</p>
        </div>
      </div>
    );
  }

  const userPlan = session?.user?.subscriptionPlan || "basic";
  const isSpecialized = userPlan === "specialized";

  // --- Data ---

  const DISCUSSION_ROOMS = [
    {
      id: "relationship-after-baby",
      title: "Relationship After Baby",
      desc: "Navigating sleep deprivation, new roles, and identity shifts.",
      icon: Baby,
      color: "bg-rose-100 text-rose-600",
      activeUsers: 124
    },
    {
      id: "communication-conflict",
      title: "Communication & Conflict",
      desc: "Healthy ways to navigate disagreements and misunderstandings.",
      icon: MessageCircle,
      color: "bg-sky-100 text-sky-600",
      activeUsers: 89
    },
    {
      id: "emotional-burnout",
      title: "Emotional Burnout",
      desc: "Managing parenting stress together as a team.",
      icon: Battery, // Using Battery for burnout metaphor
      color: "bg-amber-100 text-amber-600",
      activeUsers: 56
    },
    {
      id: "rebuilding-connection",
      title: "Rebuilding Connection",
      desc: "Restoring emotional closeness and intimacy.",
      icon: Heart,
      color: "bg-purple-100 text-purple-600",
      activeUsers: 210
    },
    {
      id: "parent-stories",
      title: "Parent Partnership Stories",
      desc: "Real experiences and insights from other couples.",
      icon: Users,
      color: "bg-emerald-100 text-emerald-600",
      activeUsers: 145
    }
  ];

  const RESOURCE_LIBRARY = {
    communication: {
      title: "Communication Frameworks",
      icon: MessageCircle,
      content: [
        { title: "Soft Startups", desc: "Begin difficult conversations gently. Instead of 'You never...', try 'I feel overwhelmed when...'. This reduces defensiveness by 90%." },
        { title: "The 'Pause' Method", desc: "When flooded with emotion, agree to a 20-minute break. Physical soothing must happen before rational conversation can resume." },
        { title: "State of the Union", desc: "A weekly 30-minute meeting to discuss relationship logistics and emotional needs, separate from daily chaos." }
      ]
    },
    conflict: {
      title: "Conflict Repair Methods",
      icon: Shield,
      content: [
        { title: "Repair Attempts", desc: "Small gestures (a joke, a touch, an apology) during an argument to lower tension. Learn to recognize and accept them." },
        { title: "Aftermath of a Fight", desc: "Process a disagreement only after both partners are calm. Focus on understanding each other's reality, not establishing 'truth'." },
        { title: "The 5:1 Ratio", desc: "Stable relationships maintain 5 positive interactions for every 1 negative interaction, even during conflict." }
      ]
    },
    regulation: {
      title: "Emotional Regulation Tools",
      icon: Brain,
      content: [
        { title: "Co-Regulation", desc: "Your calm nervous system can soothe your partner's. Breathe deeply and slow your speech when your partner is stressed." },
        { title: "Naming the invisible", desc: "Acknowledge the 'mental load' explicitly. Validate the invisible labor your partner carries to reduce resentment." },
        { title: "Self-Soothing", desc: "Identify your own stress signals (tight chest, racing thoughts) and take responsibility for calming yourself before engaging." }
      ]
    },
    alignment: {
      title: "Parenting Alignment",
      icon: Scale, // Using Scale for balance/alignment
      content: [
        { title: "Values Clarification", desc: "Discuss your top 3 parenting values. Where do they align? Where do they differ? Create a shared family mission." },
        { title: "The 'Fair Play' Deck", desc: "Treat the household like a business. Explicitly assign ownership of tasks (planning + execution) to prevent 'nagging'." },
        { title: "United Front", desc: "Agree on discipline strategies privately. Support each other in front of the children, even if you disagree in the moment." }
      ]
    },
    connection: {
      title: "Connection Rituals",
      icon: Sparkles,
      content: [
        { title: "Micro-Moments", desc: "The 6-second kiss: Long enough to release oxytocin. Do this when leaving or returning home." },
        { title: "Daily Stress-Reducing Conversation", desc: "Spend 20 minutes discussing stress *outside* the relationship. Take turns listening without offering solutions." },
        { title: "Appreciation Journal", desc: "Write down one thing you appreciate about your partner daily. Share it with them at the end of the week." }
      ]
    }
  };

  const WEEKLY_CHECKIN_PROMPTS = [
    "What helped you feel supported by your partner this week?",
    "Was there a moment where you felt disconnected?",
    "What could help you feel more supported next week?",
    "Did you express appreciation to your partner this week?"
  ];

  const JOURNEY_STAGES = [
    { title: "Pregnancy", desc: "Preparing emotionally for parenthood.", icon: Moon },
    { title: "Newborn Phase", desc: "Managing sleep deprivation and emotional stress.", icon: Baby },
    { title: "Early Parenting", desc: "Balancing responsibilities and routines.", icon: Sun },
    { title: "School Years", desc: "Aligning parenting strategies.", icon: BookOpen },
    { title: "Teen Years", desc: "Maintaining partnership while parenting adolescents.", icon: Users }
  ];

  // Handlers

  const handleWeeklyCheckInSubmit = () => {
    // In a real app, save to DB
    setWeeklyCheckInStep(WEEKLY_CHECKIN_PROMPTS.length + 1);
  };

  const handleCounselorRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const time = (form.elements.namedItem('time') as HTMLSelectElement).value;
    const concern = (form.elements.namedItem('concern') as HTMLSelectElement).value;

    try {
      // 1. Save to Firestore
      await addDoc(collection(db, "counselor_requests"), {
        name,
        email,
        preferredTime: time,
        concern,
        status: "pending",
        createdAt: serverTimestamp(),
        userId: session?.user?.id || "anonymous"
      });

      // 2. Send Email Notification
      const res = await fetch('/api/send-counselor-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, preferredTime: time, concern })
      });

      if (!res.ok) {
        console.error("Failed to send email notification", await res.text());
      }

      // 3. Show Success UI
      setCounselorRequestSent(true);
      setTimeout(() => {
        setShowCounselorForm(false);
        setCounselorRequestSent(false);
      }, 4000);

    } catch (error) {
      console.error("Error submitting counselor request:", error);
      alert("There was an issue submitting your request. Please try again or contact support directly.");
    }
  };

  const handleOpenCommunity = () => {
    router.push('/dashboard/community?category=Partnership%20%26%20Relationships');
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 font-sans selection:bg-rose-100 selection:text-rose-900">
      
      {/* SECTION 1: HERO */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-rose-50/60 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-50/60 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
              <Users className="w-3 h-3 text-rose-500" />
              <span>Premium Community Access</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-stone-900 mb-6 leading-tight">
              Partnership <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">Circle</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-stone-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              A private support space for couples navigating the emotional challenges of parenting. 
              Because a strong partnership is the foundation of a stable family.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-32">

        {/* SECTION 2: HOW IT WORKS */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-4 gap-6"
        >
          {[
            { step: "01", title: "Join the Circle", desc: "Enter a private, judgment-free space for relationship growth." },
            { step: "02", title: "Check-In", desc: "Use our tools to understand your current relationship dynamics." },
            { step: "03", title: "Reflect Weekly", desc: "Respond to guided prompts that spark meaningful conversation." },
            { step: "04", title: "Get Support", desc: "Learn from experts and peers to navigate challenges together." }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeIn} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm relative overflow-hidden group hover:border-rose-100 transition-colors">
              <div className="text-6xl font-serif text-stone-100 absolute top-4 right-4 group-hover:text-rose-50 transition-colors font-bold">{item.step}</div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-stone-900 mb-3">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* SECTION 3: COMMUNITY DISCUSSION ROOMS - REMOVED, NOW A GATEWAY TO MAIN COMMUNITY */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center"
        >
          <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-stone-100 shadow-sm">
            <h2 className="text-3xl font-serif font-medium text-stone-900 mb-4">Join the Conversation</h2>
            <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
              Our relationship discussions have moved to the main community hub. Connect with other parents in the dedicated "Partnership & Relationships" space.
            </p>
            <Button 
              onClick={handleOpenCommunity}
              size="lg" 
              className="rounded-full h-14 px-8 text-lg bg-stone-900 hover:bg-stone-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Open Relationship Community
            </Button>
          </div>
        </motion.section>

        {/* SECTION 4: RESOURCE LIBRARY */}
        <motion.section 
          id="resource-library"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-900 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">Relationship Resource Library</h2>
              <p className="text-stone-400 max-w-2xl mx-auto">
                Research-backed strategies to strengthen your partnership during parenthood.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {Object.entries(RESOURCE_LIBRARY).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === key 
                      ? "bg-white text-stone-900 shadow-lg scale-105" 
                      : "bg-white/10 text-stone-300 hover:bg-white/20"
                  }`}
                >
                  <data.icon className="w-4 h-4" />
                  {data.title}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {RESOURCE_LIBRARY[activeTab as keyof typeof RESOURCE_LIBRARY].content.map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-xl font-bold text-rose-300 mb-3">{item.title}</h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 5: WEEKLY CHECK-IN */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-medium text-stone-900 mb-4">Weekly Relationship Check-In</h2>
            <p className="text-stone-600">
              Small moments of reflection prevent big drifts. Take 5 minutes to connect.
            </p>
          </div>

          <Card className="border-stone-200 shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-10">
              {weeklyCheckInStep < WEEKLY_CHECKIN_PROMPTS.length ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-stone-400">
                    <span>Question {weeklyCheckInStep + 1} of {WEEKLY_CHECKIN_PROMPTS.length}</span>
                    <span>{Math.round(((weeklyCheckInStep) / WEEKLY_CHECKIN_PROMPTS.length) * 100)}% Complete</span>
                  </div>
                  
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-rose-500" 
                      initial={{ width: 0 }}
                      animate={{ width: `${((weeklyCheckInStep) / WEEKLY_CHECKIN_PROMPTS.length) * 100}%` }}
                    />
                  </div>

                  <h3 className="text-2xl font-serif text-stone-900 leading-snug">
                    {WEEKLY_CHECKIN_PROMPTS[weeklyCheckInStep]}
                  </h3>

                  <textarea 
                    placeholder="Reflect here..." 
                    className="flex min-h-[120px] w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors"
                    value={weeklyCheckInAnswers[weeklyCheckInStep] || ""}
                    onChange={(e) => {
                      const newAnswers = [...weeklyCheckInAnswers];
                      newAnswers[weeklyCheckInStep] = e.target.value;
                      setWeeklyCheckInAnswers(newAnswers);
                    }}
                  />

                  <div className="flex justify-between pt-4">
                    <Button 
                      variant="ghost" 
                      onClick={() => setWeeklyCheckInStep(Math.max(0, weeklyCheckInStep - 1))}
                      disabled={weeklyCheckInStep === 0}
                      className="text-stone-500 hover:text-stone-900"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => {
                        if (weeklyCheckInStep < WEEKLY_CHECKIN_PROMPTS.length - 1) {
                          setWeeklyCheckInStep(weeklyCheckInStep + 1);
                        } else {
                          handleWeeklyCheckInSubmit();
                        }
                      }}
                      className="rounded-full px-8 bg-stone-900 hover:bg-stone-800 text-white"
                      disabled={!weeklyCheckInAnswers[weeklyCheckInStep]}
                    >
                      {weeklyCheckInStep === WEEKLY_CHECKIN_PROMPTS.length - 1 ? "Complete Check-In" : "Next Question"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif text-stone-900 mb-4">Check-In Complete!</h3>
                  <p className="text-stone-600 mb-8 max-w-md mx-auto">
                    You've taken a meaningful step for your relationship today. Consider sharing your answers with your partner tonight.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setWeeklyCheckInStep(0);
                      setWeeklyCheckInAnswers([]);
                    }}
                    className="rounded-full border-stone-200"
                  >
                    Start New Check-In
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.section>

        {/* SECTION 6: COUNSELOR SUPPORT (SPECIALIZED ONLY) */}
        {isSpecialized ? (
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-rose-50 rounded-[3rem] p-10 md:p-16 border border-rose-100"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-200 text-rose-800 text-xs font-bold uppercase tracking-widest mb-6">
                  <Star className="w-3 h-3 fill-rose-800" />
                  <span>Specialized Plan Feature</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-6">
                  Private Counselor Support
                </h2>
                <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                  Sometimes you need more than a guide—you need a guide who listens. 
                  Request a private session to navigate communication breakdowns, emotional disconnection, or parenting disagreements.
                </p>
                <Button 
                  onClick={() => setShowCounselorForm(true)}
                  size="lg" 
                  className="rounded-full h-14 px-8 text-lg bg-rose-600 hover:bg-rose-700 text-white shadow-lg hover:shadow-rose-200 hover:-translate-y-1 transition-all"
                >
                  Request a Session
                </Button>
              </div>
              <div className="relative h-full min-h-[300px] bg-white rounded-3xl p-8 shadow-sm rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 bg-stone-200 rounded-full" />
                   <div>
                     <div className="h-4 w-32 bg-stone-200 rounded mb-2" />
                     <div className="h-3 w-20 bg-stone-100 rounded" />
                   </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-full bg-stone-100 rounded" />
                  <div className="h-3 w-5/6 bg-stone-100 rounded" />
                  <div className="h-3 w-4/6 bg-stone-100 rounded" />
                </div>
                <div className="mt-8 pt-8 border-t border-stone-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-stone-400 uppercase">Next Available</span>
                    <span className="text-sm font-bold text-stone-900">Tomorrow, 10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-stone-100 rounded-[3rem] p-10 md:p-16 border border-stone-200 text-center relative overflow-hidden"
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <Lock className="w-12 h-12 text-stone-400 mx-auto mb-6" />
              <h2 className="text-2xl font-serif font-medium text-stone-900 mb-4">
                Unlock Private Counselor Support
              </h2>
              <p className="text-stone-600 mb-8">
                Upgrade to the Specialized Plan to get access to 1-on-1 counselor sessions, personalized relationship insights, and priority expert access.
              </p>
              <Link href="/dashboard/subscription">
                <Button variant="outline" className="rounded-full border-stone-300 hover:bg-white">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          </motion.section>
        )}

        {/* SECTION 7: IMPROVEMENT GUIDES */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium text-stone-900 mb-4">Relationship Improvement Guides</h2>
            <p className="text-stone-600">Practical tools you can apply today.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Communication Exercises", desc: "Scripts and active listening drills.", icon: MessageCircle, color: "text-sky-600 bg-sky-50" },
              { title: "Conflict De-escalation", desc: "Strategies to stop fights before they explode.", icon: Shield, color: "text-rose-600 bg-rose-50" },
              { title: "Weekly Check-In Templates", desc: "Structured agendas for couple meetings.", icon: Calendar, color: "text-emerald-600 bg-emerald-50" },
              { title: "Appreciation Practices", desc: "Daily habits to build a culture of gratitude.", icon: Heart, color: "text-purple-600 bg-purple-50" }
            ].map((guide, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-stone-100 hover:shadow-md transition-all flex items-start gap-4 cursor-pointer group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${guide.color} group-hover:scale-110 transition-transform`}>
                  <guide.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900 mb-1">{guide.title}</h3>
                  <p className="text-stone-500 text-sm">{guide.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-stone-300 ml-auto self-center group-hover:text-stone-900 transition-colors" />
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION 8: JOURNEY PATH */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-6">The Relationship Journey</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Your partnership evolves as your children grow. We support you at every stage.
            </p>
          </div>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-100 -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {JOURNEY_STAGES.map((stage, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-white border-4 border-stone-100 rounded-full flex items-center justify-center mb-4 group-hover:border-rose-200 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <stage.icon className="w-6 h-6 text-stone-600 group-hover:text-rose-500" />
                  </div>
                  <h4 className="font-bold text-stone-900 mb-2 text-sm">{stage.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed px-2">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 9: FINAL CLOSING SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-50 rounded-[3rem] p-12 md:p-24 text-center text-stone-900 border border-stone-100"
        >
           <div className="relative z-10 max-w-3xl mx-auto">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
               <Heart className="w-8 h-8 text-rose-500" />
             </div>
             <h2 className="text-3xl md:text-5xl font-serif font-medium mb-6">
               Strong Partnerships Build Strong Families
             </h2>
             <p className="text-lg text-stone-600 mb-10 leading-relaxed">
               Maintaining a healthy relationship during parenting isn't always easy. Connection grows through small moments of reflection, honest communication, and shared support. We're here to walk this path with you.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button 
                 onClick={() => {
                   const element = document.getElementById('resource-library');
                   element?.scrollIntoView({ behavior: 'smooth' });
                 }}
                 variant="outline"
                 className="rounded-full h-12 px-8 border-stone-300 hover:bg-white hover:text-stone-900"
               >
                 Explore Resources
               </Button>
               <Button 
                 onClick={handleOpenCommunity}
                 className="rounded-full h-12 px-8 bg-stone-900 hover:bg-stone-800 text-white shadow-lg"
               >
                 Join Community Discussions
               </Button>
             </div>
           </div>
        </motion.section>

      </div>

      {/* Counselor Form Modal */}
      <AnimatePresence>
        {showCounselorForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCounselorForm(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full relative z-10 shadow-2xl"
            >
              {!counselorRequestSent ? (
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-serif font-medium text-stone-900 mb-2">Request Counselor Session</h3>
                    <p className="text-stone-500 text-sm">A licensed relationship specialist will contact you to schedule.</p>
                  </div>
                  <form onSubmit={handleCounselorRequest} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Your Name</label>
                      <Input id="name" placeholder="Enter your full name" required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Address</label>
                      <Input id="email" type="email" placeholder="Enter your email" required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="time" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Preferred Meeting Time</label>
                      <div className="relative">
                        <select id="time" className="flex h-10 w-full items-center justify-between rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none">
                          <option value="" disabled selected>Select a time preference</option>
                          <option value="morning">Morning (8am - 12pm)</option>
                          <option value="afternoon">Afternoon (12pm - 5pm)</option>
                          <option value="evening">Evening (5pm - 8pm)</option>
                          <option value="weekend">Weekend</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
                          <ArrowRight className="h-4 w-4 rotate-90" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="concern" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Primary Concern</label>
                      <div className="relative">
                        <select id="concern" className="flex h-10 w-full items-center justify-between rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none">
                          <option value="" disabled selected>What would you like to discuss?</option>
                          <option value="communication">Communication Breakdown</option>
                          <option value="conflict">Frequent Conflict</option>
                          <option value="intimacy">Intimacy & Connection</option>
                          <option value="parenting">Parenting Disagreements</option>
                          <option value="stress">General Stress/Burnout</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
                          <ArrowRight className="h-4 w-4 rotate-90" />
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 flex gap-3">
                      <Button type="button" variant="ghost" onClick={() => setShowCounselorForm(false)} className="flex-1 rounded-full">Cancel</Button>
                      <Button type="submit" className="flex-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white">Submit Request</Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Request Sent!</h3>
                  <p className="text-stone-600 mb-6">
                    We have received your request. A care manager will reach out to you within 24 hours to confirm your appointment.
                  </p>
                  <Button onClick={() => setShowCounselorForm(false)} variant="outline" className="rounded-full">Close</Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
