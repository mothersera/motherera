"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Globe, ShieldCheck, Stethoscope, Users, Baby, Activity, ArrowRight, Sun, Sparkles } from "lucide-react";
import { ToothIcon } from "@/components/icons/ToothIcon";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const cardHoverVariants: Variants = {
  hover: { 
    y: -8, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 }
  }
};

export default function HomeClient() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-40 bg-stone-50/50">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-[20%] -right-[5%] w-[400px] h-[400px] bg-amber-200/30 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              y: [0, -50, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-0 left-[20%] w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[120px]" 
          />
        </div>

        <div className="container-width relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-rose-100 text-rose-700 text-sm font-medium mb-8 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            Trusted by mothers worldwide
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif font-bold tracking-tight text-stone-900 mb-6 drop-shadow-sm"
          >
            Mother Era
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-light text-stone-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            A gentle, expert-guided journey through <span className="text-rose-600 font-normal font-serif italic relative inline-block">
              motherhood
              <svg className="absolute w-full h-2 -bottom-1 left-0 text-rose-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>, nutrition, and lifelong family wellness.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
          >
            <Link href="/register">
              <Button size="lg" className="px-10 h-14 text-lg rounded-full bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all hover:scale-105">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="px-10 h-14 text-lg rounded-full border-stone-300 hover:bg-white hover:text-rose-600 hover:border-rose-200 transition-all">
                Our Philosophy
              </Button>
            </Link>
          </motion.div>
          
          {/* Feature Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
          >
            <motion.div variants={itemVariants} whileHover="hover">
              <Link href="/pregnancy" className="group block h-full">
                <motion.div variants={cardHoverVariants} className="h-full bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-1 overflow-hidden transition-colors hover:border-rose-100">
                  <div className="h-full bg-white/40 rounded-[20px] p-6 flex flex-col items-start text-left">
                    <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-5 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Heart className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-800 mb-2 group-hover:text-rose-600 transition-colors">Pregnancy Care</h3>
                    <p className="text-stone-500 leading-relaxed text-sm">Global, trimester-wise nutrition and holistic wellness support tailored for you.</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover">
              <Link href="/postpartum" className="group block h-full">
                <motion.div variants={cardHoverVariants} className="h-full bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-1 overflow-hidden transition-colors hover:border-blue-100">
                  <div className="h-full bg-white/40 rounded-[20px] p-6 flex flex-col items-start text-left">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-5 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Activity className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-800 mb-2 group-hover:text-blue-600 transition-colors">Postpartum Care</h3>
                    <p className="text-stone-500 leading-relaxed text-sm">Recovery, mental wellness, and specialized nutrition for your healing journey.</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover">
              <Link href="/newborn-care" className="group block h-full">
                <motion.div variants={cardHoverVariants} className="h-full bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-1 overflow-hidden transition-colors hover:border-purple-100">
                  <div className="h-full bg-white/40 rounded-[20px] p-6 flex flex-col items-start text-left">
                    <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-5 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Sun className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-800 mb-2 group-hover:text-purple-600 transition-colors">Newborn Care</h3>
                    <p className="text-stone-500 leading-relaxed text-sm">Expert guidance for the first hours, days, and weeks after birth.</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover">
              <Link href="/child" className="group block h-full">
                <motion.div variants={cardHoverVariants} className="h-full bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-1 overflow-hidden transition-colors hover:border-green-100">
                  <div className="h-full bg-white/40 rounded-[20px] p-6 flex flex-col items-start text-left">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 mb-5 group-hover:bg-green-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Baby className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-800 mb-2 group-hover:text-green-600 transition-colors">Child Nutrition</h3>
                    <p className="text-stone-500 leading-relaxed text-sm">Expert guidance from breastfeeding to healthy family meals.</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover">
              <Link href="/family-health" className="group block h-full">
                <motion.div variants={cardHoverVariants} className="h-full bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-1 overflow-hidden transition-colors hover:border-amber-100">
                  <div className="h-full bg-white/40 rounded-[20px] p-6 flex flex-col items-start text-left">
                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-5 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Users className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-800 mb-2 group-hover:text-amber-600 transition-colors">Family Health</h3>
                    <p className="text-stone-500 leading-relaxed text-sm">Pre-pregnancy wellness and healthy habits for the whole family.</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover">
              <Link href="/little-smiles" className="group block h-full">
                <motion.div variants={cardHoverVariants} className="h-full bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-1 overflow-hidden transition-colors hover:border-sky-100">
                  <div className="h-full bg-white/40 rounded-[20px] p-6 flex flex-col items-start text-left">
                    <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 mb-5 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm">
                      <ToothIcon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-800 mb-2 group-hover:text-sky-600 transition-colors">Little Smiles Care</h3>
                    <p className="text-stone-500 leading-relaxed text-sm">Gentle dental wellness and happy habits for your little one&apos;s bright smile.</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 bg-white relative z-10">
        <div className="container-width">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">The Mother Era Standards</h2>
            <p className="text-lg text-stone-500 font-light">Built on trust, expertise, and global inclusivity.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Stethoscope, 
                color: "rose", 
                title: "Expert-Backed", 
                desc: "Every guide and plan is curated by healthcare professionals ensuring the highest standards of safety." 
              },
              { 
                icon: Globe, 
                color: "amber", 
                title: "Globally Relevant", 
                desc: "Inclusive guidance that respects diverse cultures, regional availability, and varied dietary preferences." 
              },
              { 
                icon: ShieldCheck, 
                color: "blue", 
                title: "Evidence-Based", 
                desc: "We bridge the gap between traditional wisdom and modern science with evidence-based methodologies." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex flex-col items-center text-center space-y-6 group"
              >
                <div className={`w-20 h-20 bg-${item.color}-50 rounded-3xl flex items-center justify-center text-${item.color}-500 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <item.icon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">{item.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-rose-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,228,230,0.5),transparent_50%)]"></div>
        <div className="container-width text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="w-12 h-12 text-rose-400 mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6">Ready to start your journey?</h2>
            <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto font-light">
              Join thousands of mothers worldwide who trust Mother Era for their wellness journey.
            </p>
            <Link href="/register">
              <Button size="lg" className="px-12 h-16 text-xl rounded-full bg-stone-900 text-white hover:bg-stone-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 bg-stone-900 text-stone-300 border-t border-stone-800">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-serif font-bold text-white mb-6">Mother Era</h3>
              <p className="max-w-md mb-6 leading-relaxed text-stone-400">
                Dedicated to empowering mothers worldwide through expert guidance, 
                personalized nutrition, and a supportive community.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 tracking-wide uppercase text-sm">Explore</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Pregnancy', href: '/pregnancy' },
                  { name: 'Postpartum', href: '/postpartum' },
                  { name: 'Newborn Care', href: '/newborn-care' },
                  { name: 'Child Nutrition', href: '/child' },
                  { name: 'Family Health', href: '/family-health' },
                  { name: 'Little Smiles Care', href: '/little-smiles' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 tracking-wide uppercase text-sm">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Pricing', 'Log In'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '')}`} className="hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500">
            <p>&copy; 2024 Mother Era. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
