"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, Smile, Baby, Utensils, Shield, Sparkles, Clock, AlertTriangle, Music, Star, Users } from "lucide-react";
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

export default function LittleSmilesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-sky-50/50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-sky-200 text-sky-700 text-sm font-medium mb-6 shadow-sm">
              <Smile className="w-4 h-4" />
              <span>Gentle Dental Wellness</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
              Little Smiles <br/>
              <span className="text-sky-600">Care Guide</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
              A parent’s guide to building healthy smiles from day one. From soothing teething gums to teaching your toddler how to brush.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
        
        {/* Section 1: Oral Care Before Teeth */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-x-12 gap-y-6"
        >
          {/* Header Row (Left) */}
          <div className="md:col-span-1">
            <div className="inline-flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-sky-600" />
              <h3 className="text-sky-600 font-bold tracking-wide uppercase text-sm">0–6 Months</h3>
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Care Before Teeth</h2>
          </div>
          
          {/* Spacer for Right Column (Desktop only) */}
          <div className="hidden md:block"></div>

          {/* Left Content Card */}
          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 h-full">
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Clean the Gums</h4>
                    <p className="text-stone-600 text-sm">Wipe gently with a warm, damp washcloth after feeding.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Bedtime Routine</h4>
                    <p className="text-stone-600 text-sm">Make gum cleaning a ritual to remove bacteria early.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  <span className="font-bold">No Bedtime Bottles:</span> Pooling milk can cause rapid "baby bottle tooth decay."
                </p>
              </div>
            </div>
          </div>

          {/* Right Content Card */}
          <div className="md:col-span-1 relative pl-12 md:pl-0">
             <div className="absolute right-0 bottom-0 w-64 h-64 bg-sky-100 rounded-full blur-[80px] opacity-50" />
             <div className="relative z-10 h-full">
                <Card className="border-none shadow-xl shadow-sky-100/50 h-full">
                  <div className="h-2 bg-sky-500" />
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3 text-stone-900">
                      <Baby className="w-6 h-6 text-sky-500" /> First Tooth & Teething
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold text-stone-900 mb-2 text-sm uppercase tracking-wide">Signs</h4>
                      <p className="text-stone-600 text-sm">Drooling, chewing on hands, fussiness, swollen gums.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-2 text-sm uppercase tracking-wide">Soothing</h4>
                      <ul className="space-y-2 text-sm text-stone-600">
                        <li className="flex gap-2"><span className="text-sky-500">•</span> Gentle gum massage</li>
                        <li className="flex gap-2"><span className="text-sky-500">•</span> Chilled (not frozen) teething ring</li>
                        <li className="flex gap-2"><span className="text-sky-500">•</span> Extra cuddles</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
             </div>
          </div>
        </motion.section>

        {/* Section 2: First Dental Visit */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-sky-600 text-white p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/50 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <Sparkles className="w-12 h-12 text-sky-200 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold mb-4">The First Dental Visit</h2>
            <p className="text-xl text-sky-100 mb-8">
              Schedule by the <span className="font-bold text-white">first birthday</span> or within 6 months of the first tooth.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
                <h3 className="font-bold text-lg mb-2">Why So Early?</h3>
                <p className="text-sky-100 text-sm">Helps your child get comfortable and allows the dentist to catch early signs of decay.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
                <h3 className="font-bold text-lg mb-2">What to Expect</h3>
                <p className="text-sky-100 text-sm">A gentle "happy visit" to count teeth, check gums, and discuss care.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Habits & Diet */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Healthy Habits at Home</h2>
            <p className="text-stone-600">Daily routines that build strong smiles.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-stone-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Smile className="w-8 h-8 text-sky-500 mb-2" />
                <CardTitle>Brushing Basics</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600 space-y-2">
                <p>• Twice a day as soon as teeth appear.</p>
                <p>• Smear of toothpaste (rice grain) for under 3s.</p>
                <p>• Pea-sized amount for ages 3-6.</p>
              </CardContent>
            </Card>
            <Card className="border-stone-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Utensils className="w-8 h-8 text-sky-500 mb-2" />
                <CardTitle>Smart Snacking</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600 space-y-2">
                <p>• Limit sticky candies and sugary snacks.</p>
                <p>• Juice has as much sugar as soda—limit it.</p>
                <p>• Water is the best drink for teeth.</p>
              </CardContent>
            </Card>
            <Card className="border-stone-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-8 h-8 text-sky-500 mb-2" />
                <CardTitle>Parent Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-stone-600 space-y-2">
                <p>• <strong>Spit, Don't Rinse:</strong> Let fluoride sit.</p>
                <p>• <strong>Supervise:</strong> Help brush until age 7-8.</p>
                <p>• Make it fun with songs or charts.</p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Section: Common Challenges & Solutions */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-sky-600" />
            <h2 className="text-3xl font-serif font-bold text-stone-900">Common Challenges & Solutions</h2>
          </div>
          
          <div className="grid gap-6">
            {/* Card 1: Pacifiers */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-stone-900 mb-3">Pacifiers & Thumb Sucking</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Sucking is a natural soothing reflex, but prolonged habits (past age 3) can affect how teeth align and how the jaw grows.
              </p>
              <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
                <p className="text-stone-700 text-sm">
                  <span className="font-bold text-sky-700">Gentle Tip:</span> Use positive reinforcement (praise, sticker charts) to encourage stopping. Avoid scolding, which can increase anxiety and sucking.
                </p>
              </div>
            </div>

            {/* Card 2: Making Brushing Fun */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-stone-900 mb-6">Making Brushing Fun</h3>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                    <Music className="w-4 h-4 text-pink-500" />
                  </div>
                  <span className="text-stone-600 font-medium">Play a 2-minute "brushing song".</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Baby className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-stone-600 font-medium">Let them brush a toy's teeth.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 text-yellow-500" />
                  </div>
                  <span className="text-stone-600 font-medium">Use a sticker reward chart.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-stone-600 font-medium">Brush together as a family.</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Myths vs Facts (Footer Style) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-stone-900 rounded-[2.5rem] p-8 md:p-16 text-stone-300 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-stone-800/50 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-white mb-10 text-center">Myths vs Facts</h2>
            <div className="grid gap-6">
              {[
                { myth: "Baby teeth don't matter, they fall out.", fact: "They guide permanent teeth and are vital for eating/speech." },
                { myth: "Fruit juice is healthy for teeth.", fact: "It's high in acid and sugar. Water is always safer." },
                { myth: "Wait until teeth appear to clean mouth.", fact: "Clean gums from day one to remove bacteria." }
              ].map((item, i) => (
                <div key={i} className="bg-stone-800/50 p-6 rounded-2xl border border-stone-700/50 flex flex-col md:flex-row gap-4 items-start">
                  <div className="md:w-1/3">
                    <span className="text-rose-400 font-bold text-xs uppercase tracking-wide block mb-1">Myth</span>
                    <p className="font-medium text-white">"{item.myth}"</p>
                  </div>
                  <div className="md:w-2/3">
                    <span className="text-sky-400 font-bold text-xs uppercase tracking-wide block mb-1">Fact</span>
                    <p className="text-stone-400 text-sm">{item.fact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
