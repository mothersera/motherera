import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info } from "lucide-react";

export const metadata = {
  title: "Pregnancy Care — Mother Era",
  description:
    "Global, diet-inclusive pregnancy guidance: trimester nutrition, lifestyle, and myths debunked for supportive, calm care.",
};

export default function PregnancyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative py-16 bg-rose-100/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">Pregnancy Care</h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
            A global, inclusive guide to nourishing yourself and your growing baby. 
            Honoring every culture, diet, and body.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16 max-w-5xl">
        
        {/* Section 1: Global Perspective */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-rose-200 pb-2">
            Pregnancy & Nutrition: A Global Perspective
          </h2>
          <div className="prose prose-stone max-w-none text-stone-600">
            <p className="mb-4">
              Nutrition during pregnancy is not just about counting calories; it&apos;s about quality, variety, and listening to your body. 
              Around the world, expectant mothers have thrived on diverse diets for millennia. Whether you eat rice and lentils, pasta and cheese, 
              or meat and potatoes, the core principles remain the same: nourishment, hydration, and balance.
            </p>
            <p>
              Your nutritional needs are unique to your lifestyle, activity level, and cultural background. 
              There is no single &quot;perfect&quot; pregnancy diet. Instead, focus on nutrient-dense whole foods that make you feel energized and satisfied.
            </p>
          </div>
        </section>

        {/* Section 2: Trimester Overview */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-rose-200 pb-2">
            Trimester-Wise Nutrition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-stone-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-rose-600">First Trimester</CardTitle>
              </CardHeader>
              <CardContent className="text-stone-600 text-sm">
                <ul className="space-y-2">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0" /> Manage nausea with small, frequent meals.</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0" /> Focus on hydration (water, herbal teas).</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0" /> Gentle nourishment; don&apos;t force heavy meals.</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0" /> Folate-rich foods (greens, fortified grains).</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white border-stone-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-rose-600">Second Trimester</CardTitle>
              </CardHeader>
              <CardContent className="text-stone-600 text-sm">
                <ul className="space-y-2">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0" /> Appetite often returns; focus on quality.</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0" /> Increased protein needs for baby&apos;s growth.</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0" /> Calcium and Vitamin D for bone development.</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0" /> Iron-rich foods to support blood volume.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white border-stone-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-rose-600">Third Trimester</CardTitle>
              </CardHeader>
              <CardContent className="text-stone-600 text-sm">
                <ul className="space-y-2">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0" /> Steady nourishment for final growth spurt.</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0" /> Fiber-rich foods for digestive comfort.</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0" /> Omega-3s (DHA) for brain development.</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-rose-400 shrink-0" /> Preparing body for labor with energy-dense snacks.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Dietary Patterns */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-rose-200 pb-2">
            Inclusive Dietary Guidance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-700">Vegetarian</h3>
              <p className="text-stone-600 text-sm">
                Focus on diverse plant proteins like lentils, beans, tofu, and dairy (if consumed). 
                Pair iron-rich plant foods (spinach, legumes) with Vitamin C (citrus, peppers) to enhance absorption. 
                Ensure adequate Vitamin B12 intake through fortified foods or supplements.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-700">Non-Vegetarian</h3>
              <p className="text-stone-600 text-sm">
                Lean meats, poultry, and eggs are excellent protein sources. Include fish low in mercury (like salmon, sardines) for Omega-3s. 
                Balance meat intake with plenty of vegetables and whole grains to maintain digestive health.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-emerald-700">Plant-Based / Vegan</h3>
              <p className="text-stone-600 text-sm">
                A well-planned vegan diet is safe. Prioritize protein variety (quinoa, soy, chickpeas). 
                Pay special attention to Vitamin B12, Iron, Calcium, Iodine, and Choline. 
                Consider an algae-based DHA supplement for Omega-3s.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-700">Keto / Low-Carb</h3>
              <p className="text-stone-600 text-sm">
                <span className="font-bold">Note:</span> Consult a specialist before maintaining strict Keto during pregnancy. 
                Generally, focus on nutrient-dense whole foods (avocados, nuts, eggs, leafy greens) rather than just high fat. 
                Ensure you get enough electrolytes and hydration. Avoid processed &quot;keto&quot; snacks.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Foods to Avoid */}
        <section className="bg-red-50 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-stone-800 mb-4 flex items-center gap-2">
            <Info className="text-red-500" /> Foods & Habits to Limit
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-stone-700">
            <li>• Raw or undercooked meat, fish, and eggs (risk of bacteria).</li>
            <li>• Unpasteurized dairy and soft cheeses (Listeria risk).</li>
            <li>• High-mercury fish (shark, swordfish, king mackerel).</li>
            <li>• Excess caffeine (limit to ~200mg/day).</li>
            <li>• Alcohol and smoking (strictly avoid).</li>
            <li>• Ultra-processed foods with high added sugars/salts.</li>
          </ul>
        </section>

        {/* Section 5: Lifestyle */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-rose-200 pb-2">
            Lifestyle & Emotional Well-Being
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Rest & Movement</h3>
              <p className="text-stone-600 mb-4">
                Listen to your body. Gentle movement like walking, prenatal yoga, or swimming can boost mood and reduce discomfort. 
                Prioritize sleep—it&apos;s productive rest for building a baby.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">Emotional Health</h3>
              <p className="text-stone-600">
                Pregnancy is an emotional journey. It&apos;s okay to feel anxious or overwhelmed. 
                Connect with supportive friends, family, or communities. Your mental peace is as important as your nutrition.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Myths */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-rose-200 pb-2">
            Common Myths Debunked
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-stone-900">Myth: &quot;You must eat for two.&quot;</p>
              <p className="text-stone-600 text-sm mt-1">
                Fact: You only need about 300-500 extra calories in the second and third trimesters. Nutrient density matters more than quantity.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-stone-900">Myth: &quot;Avoid all seafood.&quot;</p>
              <p className="text-stone-600 text-sm mt-1">
                Fact: Fish is great for brain development! Just avoid high-mercury varieties and ensure it&apos;s cooked thoroughly.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
