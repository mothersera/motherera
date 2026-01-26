"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { Heart, Shield, Globe, Users, Sparkles, Stethoscope, ArrowRight } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const imageReveal: Variants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

export default function AboutClient() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] bg-rose-100/40 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], x: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[100px]" 
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-rose-100 text-rose-700 text-sm font-medium mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Our Mission</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-8 leading-tight">
              Empowering Mothers <br/>
              <span className="text-rose-600 italic">Globally</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-stone-600 leading-relaxed mb-12 font-light">
              Mother Era was born from a simple belief: every mother deserves access to expert, culturally relevant, and compassionate healthcare guidance. We bridge the gap between traditional wisdom and modern medical science.
            </motion.p>
          </motion.div>

          {/* Hero Image Parallax */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mt-8"
          >
            <motion.div variants={imageReveal} className="w-full h-full relative">
              <Image
                src="/motherera-hero.webp"
                alt="A calm, nurturing moment between a mother and her baby"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-12"
            >
              <div>
                <motion.h2 variants={fadeInUp} className="text-4xl font-serif font-bold text-stone-900 mb-6">Why We Exist</motion.h2>
                <motion.p variants={fadeInUp} className="text-lg text-stone-500 font-light">
                  We are redefining maternal care by combining medical expertise with the warmth of community support.
                </motion.p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: Stethoscope,
                    title: "Expert-First Approach",
                    desc: "Partnering with certified gynecologists, pediatricians, and nutritionists to ensure medically sound advice.",
                    color: "rose"
                  },
                  {
                    icon: Globe,
                    title: "Culturally Rooted",
                    desc: "Integrating local traditions, dietary habits, and family structures into our care plans.",
                    color: "amber"
                  },
                  {
                    icon: Shield,
                    title: "Privacy & Trust",
                    desc: "Your health data is sacred. We employ top-tier security measures to keep your information safe.",
                    color: "blue"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={fadeInUp}
                    className="flex gap-6 group"
                  >
                    <div className={`w-14 h-14 shrink-0 bg-${item.color}-50 rounded-2xl flex items-center justify-center text-${item.color}-600 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">{item.title}</h3>
                      <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl md:translate-y-12"
            >
               <Image
                 src="/motherera-about.webp"
                 alt="Mother gently holding her baby in natural light"
                 fill
                 className="object-cover transition-transform duration-700 hover:scale-105"
                 sizes="(max-width: 1024px) 100vw, 50vw"
               />
               {/* Floating Card */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50"
               >
                 <div className="flex items-center gap-4 mb-3">
                   <div className="flex -space-x-3">
                     {[1,2,3,4].map((i) => (
                       <div key={i} className="w-10 h-10 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center text-xs font-bold text-stone-500 overflow-hidden">
                         <Users className="w-5 h-5 text-stone-400" />
                       </div>
                     ))}
                   </div>
                   <div className="text-sm font-semibold text-stone-900">
                     Join 10,000+ Mothers
                   </div>
                 </div>
                 <p className="text-stone-600 text-sm">
                   "Mother Era gave me the confidence I needed during my first pregnancy. The expert advice felt personal and reassuring."
                 </p>
               </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-rose-900">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/20 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[150px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 text-rose-200 border border-white/10">
              <Heart className="w-8 h-8 fill-current" />
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to start your journey?
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-xl text-rose-100 mb-10 font-light leading-relaxed">
              Join a community that understands, supports, and empowers you through every step of motherhood.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <Link href="/register">
                <Button size="lg" className="px-10 h-16 text-lg rounded-full bg-white text-rose-900 hover:bg-rose-50 shadow-xl transition-all hover:scale-105 group">
                  Join Mother Era Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
