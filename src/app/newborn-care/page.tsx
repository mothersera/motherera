"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, Heart, Shield, Clock, Activity, Baby, AlertTriangle, Syringe, Eye, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

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

export default function NewbornCarePage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-purple-50/50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold tracking-wide uppercase mb-6">
              Welcome to the World
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Newborn Care <br/>
              <span className="text-purple-600">& First Days</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
              Guidance for the precious first hours, days, and weeks. From skin-to-skin bonding to safe sleep and feeding essentials.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
        
        {/* Section 1: The Golden Hour */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-purple-600" />
              <h3 className="text-purple-600 font-bold tracking-wide uppercase text-sm">Immediate Post-Birth</h3>
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">The Golden Hour</h2>
            <div className="space-y-6">
              {[
                { title: "Skin-to-Skin", desc: "Regulates heart rate, breathing, and temperature immediately." },
                { title: "Bonding", desc: "Triggers oxytocin, reducing stress and promoting attachment." },
                { title: "Physiological", desc: "Stabilizes blood sugar and encourages breastfeeding instincts." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">{item.title}</h4>
                    <p className="text-stone-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-transparent rounded-[2rem] -rotate-3" />
             <div className="relative bg-white p-8 rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100">
                <h3 className="font-bold text-lg text-stone-900 mb-6">Standard Procedures</h3>
                <div className="grid gap-4">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex gap-4">
                    <Syringe className="w-8 h-8 text-indigo-500" />
                    <div>
                      <h4 className="font-bold text-stone-800">Vitamin K</h4>
                      <p className="text-xs text-stone-500">Essential for blood clotting to prevent bleeding.</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex gap-4">
                    <Eye className="w-8 h-8 text-indigo-500" />
                    <div>
                      <h4 className="font-bold text-stone-800">Eye Ointment</h4>
                      <p className="text-xs text-stone-500">Prevents conjunctivitis from birth canal bacteria.</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </motion.section>

        {/* Section 2: Safety & Screenings */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Safety & Screenings</h2>
            <p className="text-stone-600">Standard checks to ensure your baby is thriving.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-stone-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-8 h-8 text-purple-500 mb-2" />
                <CardTitle>Hospital Security</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600 space-y-2">
                <p>• Matched ID bands for parents & baby.</p>
                <p>• Electronic security tags.</p>
                <p>• Always transport in bassinet (no carrying in halls).</p>
              </CardContent>
            </Card>
            <Card className="border-stone-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Activity className="w-8 h-8 text-purple-500 mb-2" />
                <CardTitle>Health Checks</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600 space-y-2">
                <p>• <strong>PKU:</strong> Heel prick for genetics.</p>
                <p>• <strong>Jaundice:</strong> Bilirubin level check.</p>
                <p>• <strong>CCHD:</strong> Heart oxygen levels.</p>
                <p>• <strong>Hearing:</strong> Soft sound response.</p>
              </CardContent>
            </Card>
            <Card className="border-stone-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Thermometer className="w-8 h-8 text-purple-500 mb-2" />
                <CardTitle>Vaccines</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600 space-y-2">
                <p>• <strong>Hep B:</strong> First dose usually before discharge.</p>
                <p>• Comfort measures (swaddling/sucking) used during any pricks.</p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Section 3: Feeding & Diapers */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-purple-900 rounded-[2.5rem] p-8 md:p-12 text-purple-50 overflow-hidden relative"
        >
           <div className="absolute top-0 right-0 w-96 h-96 bg-purple-800/50 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
           <div className="relative z-10 grid md:grid-cols-2 gap-12">
             <div>
               <h2 className="text-3xl font-serif font-bold text-white mb-6">Feeding Basics</h2>
               <ul className="space-y-4">
                 <li className="flex gap-4 items-center bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                   <Clock className="w-6 h-6 text-purple-300" />
                   <div>
                     <span className="block font-bold text-white">Frequency</span>
                     <span className="text-sm text-purple-200">Every 2-3 hours (8-12 times daily)</span>
                   </div>
                 </li>
                 <li className="flex gap-4 items-center bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                   <Baby className="w-6 h-6 text-purple-300" />
                   <div>
                     <span className="block font-bold text-white">Cues</span>
                     <span className="text-sm text-purple-200">Rooting, sucking hands. Crying is late!</span>
                   </div>
                 </li>
               </ul>
             </div>
             <div>
               <h2 className="text-3xl font-serif font-bold text-white mb-6">Diaper Tracker</h2>
               <div className="grid grid-cols-2 gap-4">
                 {[
                   { day: "Day 1", count: "1 Wet, 1 Dirty" },
                   { day: "Day 2", count: "2 Wet, 2 Dirty" },
                   { day: "Day 3", count: "3 Wet, 3 Dirty" },
                   { day: "Day 4+", count: "6+ Heavy Wet" },
                 ].map((d, i) => (
                   <div key={i} className="bg-purple-800/50 p-4 rounded-xl text-center border border-purple-700">
                     <span className="block text-purple-300 text-xs uppercase tracking-wide">{d.day}</span>
                     <span className="font-bold text-white">{d.count}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        </motion.div>

        {/* Section 4: Safe Sleep (ABCs) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center"
        >
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-10">The ABCs of Safe Sleep</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-purple-100/50 border border-purple-50">
              <span className="block text-6xl font-black text-purple-100 mb-4">A</span>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Alone</h3>
              <p className="text-stone-600 text-sm">No pillows, blankets, or toys. Just baby.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-purple-100/50 border border-purple-50">
              <span className="block text-6xl font-black text-purple-100 mb-4">B</span>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Back</h3>
              <p className="text-stone-600 text-sm">Always place baby on their back to sleep.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-purple-100/50 border border-purple-50">
              <span className="block text-6xl font-black text-purple-100 mb-4">C</span>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Crib</h3>
              <p className="text-stone-600 text-sm">Firm mattress with a fitted sheet only.</p>
            </div>
          </div>
          <div className="mt-8 bg-orange-50 border border-orange-100 p-4 rounded-xl inline-flex items-center gap-3 text-left max-w-2xl mx-auto">
             <AlertTriangle className="w-6 h-6 text-orange-600 shrink-0" />
             <p className="text-sm text-orange-800">
               <span className="font-bold">Critical Safety:</span> Never shake a baby. If overwhelmed, place baby safely in crib and walk away for 5-10 mins.
             </p>
          </div>
        </motion.section>

        {/* Section 5: Going Home Checklist (Footer Style) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-100 rounded-[2.5rem] p-8 md:p-16"
        >
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Ready for Home?</h2>
            <p className="text-stone-600">The journey begins now. Ensure you have these covered before discharge.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-4">Discharge Checks</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 items-center text-sm text-stone-600"><Check className="w-4 h-4 text-green-500" /> Mother's recovery check</li>
                <li className="flex gap-3 items-center text-sm text-stone-600"><Check className="w-4 h-4 text-green-500" /> Baby's weight & jaundice</li>
                <li className="flex gap-3 items-center text-sm text-stone-600"><Check className="w-4 h-4 text-green-500" /> Pediatrician booked (2-3 days)</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-stone-900 mb-4">Car Seat Safety</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 items-center text-sm text-stone-600"><Check className="w-4 h-4 text-green-500" /> Properly installed rear-facing</li>
                <li className="flex gap-3 items-center text-sm text-stone-600"><Check className="w-4 h-4 text-green-500" /> Snug straps (no bulky coats)</li>
                <li className="flex gap-3 items-center text-sm text-stone-600"><Check className="w-4 h-4 text-green-500" /> Chest clip at armpit level</li>
              </ul>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
