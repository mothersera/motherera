import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Postpartum Care — Mother Era",
  description:
    "Support recovery, nourishment, breastfeeding and mental wellness with global, non-judgmental guidance for the fourth trimester.",
};

export default function PostpartumPage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">Postpartum Care</h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
            Supporting your recovery, nourishment, and emotional well-being after childbirth. 
            A gentle, non-judgmental space for the &quot;fourth trimester.&quot;
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16 max-w-5xl">
        
        {/* Section 1: Understanding Recovery */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-blue-200 pb-2">
            Understanding Postpartum Recovery
          </h2>
          <div className="prose prose-stone max-w-none text-stone-600">
            <p className="mb-4">
              Recovery is a process, not a destination. Your body has gone through a monumental transformation. 
              Healing takes time, and it&apos;s non-linear. Some days you will feel energetic, others you may need deep rest.
            </p>
            <p>
              Every mother&apos;s experience is different. Whether you had a vaginal birth or a C-section, whether you are breastfeeding or formula feeding, 
              your journey is valid. Be kind to yourself.
            </p>
          </div>
        </section>

        {/* Section 2: Nutrition */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-blue-200 pb-2">
            Nourishing Your Recovery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white border-stone-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-600">Key Nutrients for Healing</CardTitle>
              </CardHeader>
              <CardContent className="text-stone-600 text-sm space-y-2">
                <p><span className="font-semibold">Protein:</span> Essential for tissue repair. (Lentils, eggs, lean meats, tofu).</p>
                <p><span className="font-semibold">Iron:</span> To replenish blood loss. (Leafy greens, dates, organ meats, fortified cereals).</p>
                <p><span className="font-semibold">Vitamin C:</span> Aids wound healing and iron absorption. (Citrus, berries, peppers).</p>
                <p><span className="font-semibold">Hydration:</span> Critical for milk production and energy. Drink to thirst.</p>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-stone-800">Diet-Inclusive Tips</h3>
              <ul className="space-y-3 text-stone-600 text-sm">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-semibold">Vegetarian:</span> Warm, cooked foods like khichdi, soups, and stews are gentle on digestion.
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-semibold">Non-Vegetarian:</span> Bone broths are excellent for collagen and minerals.
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-semibold">Plant-Based:</span> Focus on nutrient-dense fats like avocados, nuts, and seeds for energy.
                </li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mt-4">
                <strong>Note:</strong> Focus on healing, not weight loss. Your body needs energy to recover and care for your baby.
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Breastfeeding Support */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-blue-200 pb-2">
            Breastfeeding Nutrition Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             <div>
                <p className="text-stone-600 mb-4">
                  If you are breastfeeding, your body requires significantly more energy—approx. 500 extra calories a day. 
                  Don&apos;t restrict food groups unless advised by a doctor for allergies.
                </p>
                <ul className="space-y-2 text-stone-600 text-sm">
                   <li>• Keep water and snacks near your nursing spot.</li>
                   <li>• Galactagogues (milk-boosting foods) vary by culture: oats, fenugreek, brewers yeast, green papaya.</li>
                   <li>• Listen to your hunger cues; they are there for a reason.</li>
                </ul>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                <h3 className="text-lg font-semibold text-stone-800 mb-3">Foods & Habits to Limit</h3>
                <ul className="space-y-2 text-stone-600 text-sm">
                   <li className="flex items-start gap-2"><Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5"/> Excess caffeine (may cause jitters in baby).</li>
                   <li className="flex items-start gap-2"><Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5"/> Alcohol (time intake carefully or avoid).</li>
                   <li className="flex items-start gap-2"><Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5"/> Highly processed snacks (low energy return).</li>
                </ul>
             </div>
          </div>
        </section>

        {/* Section 5: Mental Wellness */}
        <section className="bg-stone-100 p-8 rounded-2xl">
          <div className="flex items-start gap-4">
             <HeartHandshake className="w-10 h-10 text-rose-500 shrink-0" />
             <div>
                <h2 className="text-2xl font-bold text-stone-800 mb-4">Mental & Emotional Wellness</h2>
                <div className="space-y-4 text-stone-700">
                   <p>
                     The &quot;Baby Blues&quot; (mood swings, crying spells) are common in the first two weeks due to hormonal drops. 
                     However, if feelings of sadness, anxiety, or emptiness persist beyond 2 weeks, it could be Postpartum Depression (PPD) or Anxiety.
                   </p>
                   <p>
                     <strong>You are not alone, and this is not your fault.</strong> Reach out to your partner, a friend, or a healthcare provider. 
                     Building a support system—a &quot;village&quot;—is vital. Don&apos;t hesitate to ask for help with chores, meals, or holding the baby while you shower.
                   </p>
                </div>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
}
