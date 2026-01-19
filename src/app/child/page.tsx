import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Utensils, Baby } from "lucide-react";

export const metadata = {
  title: "Child Nutrition (0–5 Years) — Mother Era",
  description:
    "Global approach to early nutrition: breastfeeding, introducing solids, balanced meals, and building healthy food relationships.",
};

export default function ChildNutritionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">Child Nutrition (0-5 Years)</h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
            Building a foundation for lifelong health through global, responsive feeding practices.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16 max-w-5xl">
        
        {/* Section 1: Why it matters */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-green-200 pb-2">
            Why Early Nutrition Matters
          </h2>
          <div className="prose prose-stone max-w-none text-stone-600">
            <p className="mb-4">
              The first five years are a period of rapid growth and brain development. 
              The food choices made now shape your child&apos;s taste preferences, metabolism, and relationship with food for life.
            </p>
            <p>
              Our goal is to nurture competent eaters who listen to their hunger and fullness cues, 
              enjoy a variety of foods, and grow at a steady pace suited to their genetics.
            </p>
          </div>
        </section>

        {/* Section 2: 0-6 Months */}
        <section>
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-green-100 rounded-full"><Baby className="w-6 h-6 text-green-600" /></div>
             <h2 className="text-2xl font-bold text-stone-800">0–6 Months: Milk First</h2>
          </div>
          <Card className="bg-white border-stone-100 shadow-sm">
            <CardContent className="pt-6 text-stone-600 space-y-4">
               <p>
                 <span className="font-semibold text-green-700">Breast Milk or Formula:</span> For the first 6 months, this is all the nutrition your baby needs. 
                 It provides the perfect balance of fats, proteins, and antibodies (in breast milk).
               </p>
               <p>
                 <span className="font-semibold text-green-700">Responsive Feeding:</span> Feed on demand, not a strict schedule. Watch for cues like rooting, sucking on hands, or smacking lips. 
                 Crying is a late sign of hunger.
               </p>
               <div className="bg-green-50 p-4 rounded-lg text-sm">
                 <strong>Global Note:</strong> Cultural practices like giving water, honey, or teas before 6 months are not recommended by global health organizations (WHO/AAP) due to infection risks and filling tiny tummies without nutrition.
               </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: 6-12 Months */}
        <section>
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-amber-100 rounded-full"><Utensils className="w-6 h-6 text-amber-600" /></div>
             <h2 className="text-2xl font-bold text-stone-800">6–12 Months: Introducing Solids</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-800">Starting the Journey</h3>
                <p className="text-stone-600 text-sm">
                  Start when baby can sit up with support and holds head steady (around 6 months). 
                  Milk is still the primary source of nutrition; food is for exploration, texture, and allergens.
                </p>
                <ul className="space-y-2 text-stone-600 text-sm">
                   <li>• <span className="font-semibold">Iron-rich foods first:</span> Fortified cereals, pureed meats, or mashed lentils/beans.</li>
                   <li>• <span className="font-semibold">Texture progression:</span> Move from purees to mashed/lumpy textures quickly to help oral motor development.</li>
                   <li>• <span className="font-semibold">Allergens:</span> Introduce common allergens (peanut, egg, dairy) early and one at a time to monitor reactions.</li>
                </ul>
             </div>
             <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-800">Dietary Examples</h3>
                <Card className="bg-white">
                   <CardContent className="pt-6 text-sm space-y-2">
                      <p><strong>Vegetarian:</strong> Mashed lentils (dal), avocado, sweet potato, full-fat yogurt.</p>
                      <p><strong>Non-Vegetarian:</strong> Pureed chicken, soft flaky fish, scrambled egg.</p>
                      <p><strong>Safety:</strong> Avoid honey (botulism risk) and cow&apos;s milk as a main drink (intestinal bleeding risk) until age 1. No added salt or sugar.</p>
                   </CardContent>
                </Card>
             </div>
          </div>
        </section>

        {/* Section 4: 1-5 Years */}
        <section>
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-blue-100 rounded-full"><Utensils className="w-6 h-6 text-blue-600" /></div>
             <h2 className="text-2xl font-bold text-stone-800">1–5 Years: The Toddler Table</h2>
          </div>
          <div className="prose prose-stone max-w-none text-stone-600 mb-6">
            <p>
              Toddler appetites are erratic. They may eat a lot one day and nothing the next. This is normal. 
              Your job is to provide healthy options; their job is to decide how much to eat.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card>
                <CardHeader><CardTitle className="text-base">Balanced Plate Concept</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-2">
                   <p>• 1/2 Fruits & Vegetables (Colors!)</p>
                   <p>• 1/4 Whole Grains (Rice, oats, whole wheat bread)</p>
                   <p>• 1/4 Protein (Beans, eggs, meat, dairy)</p>
                   <p>• Healthy Fats (Olive oil, nut butters) for brain growth.</p>
                </CardContent>
             </Card>
             <Card>
                <CardHeader><CardTitle className="text-base">Foods to Limit</CardTitle></CardHeader>
                <CardContent className="text-sm space-y-2">
                   <p className="flex gap-2"><AlertCircle className="w-4 h-4 text-red-500" /> Added sugars (candy, soda).</p>
                   <p className="flex gap-2"><AlertCircle className="w-4 h-4 text-red-500" /> Sugary drinks (even excessive fruit juice).</p>
                   <p className="flex gap-2"><AlertCircle className="w-4 h-4 text-red-500" /> Choking hazards (whole grapes, nuts, popcorn) - cut them up!</p>
                </CardContent>
             </Card>
          </div>
        </section>

        {/* Section 6: Healthy Relationships */}
        <section className="bg-stone-100 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Building Healthy Food Relationships</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-700 text-sm">
             <div>
                <h3 className="font-bold mb-2 text-stone-900">Family Meals</h3>
                <p>Eat together whenever possible. Children learn by mimicking. If they see you enjoying broccoli, they might try it too eventually.</p>
             </div>
             <div>
                <h3 className="font-bold mb-2 text-stone-900">No Pressure</h3>
                <p>Avoid forcing bites or using food as a reward/punishment. &quot;Clean your plate&quot; rules can override natural hunger cues.</p>
             </div>
             <div>
                <h3 className="font-bold mb-2 text-stone-900">Curiosity</h3>
                <p>Involve kids in shopping or cooking. Talk about food&apos;s texture and color, not just &quot;healthy&quot; or &quot;unhealthy.&quot;</p>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
}
