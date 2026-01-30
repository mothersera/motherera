import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, Smile, Baby, Utensils, Shield, Sparkles, Clock, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Little Smiles Care | Mother Era",
  description:
    "A parent’s guide to building healthy smiles. Expert advice on baby and toddler oral hygiene, teething, and preventive dental care.",
};

export default function LittleSmilesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-sky-50/30">
      {/* Hero */}
      <section className="relative py-16 bg-sky-100/50">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-sky-200 text-sky-700 text-sm font-medium mb-6 shadow-sm">
            <Smile className="w-4 h-4" />
            <span>Gentle Dental Wellness</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
            Little Smiles Care
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto font-light">
            A Parent’s Guide to Building Healthy Smiles from Day One
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16 max-w-5xl">
        
        {/* Introduction */}
        <section className="text-center max-w-3xl mx-auto">
          <p className="text-lg text-stone-600 leading-relaxed">
            Protecting your child’s oral health starts long before their first tooth appears. 
            Little Smiles Care is here to guide you through every milestone—from soothing teething gums to teaching your toddler how to brush—helping you build healthy habits that last a lifetime.
          </p>
        </section>

        {/* Section 1: Oral Care Before Teeth */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-sky-200 pb-2 flex items-center gap-2">
            <Clock className="w-6 h-6 text-sky-600" /> Oral Care Before Teeth (0–6 Months)
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-sky-100">
            <div className="prose prose-stone max-w-none text-stone-600">
              <h3 className="text-lg font-semibold text-stone-800 mb-3">Start Early for a Lifetime of Health</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-stone-900">Clean the Gums:</span> Even before teeth erupt, wipe your baby&apos;s gums gently with a warm, damp washcloth or a dentist-approved gum wipe after feeding.
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-stone-900">Nightly Routine:</span> Make gum cleaning part of your bedtime ritual. It removes bacteria and gets your baby used to oral care.
                  </div>
                </li>
                <li className="flex gap-3 items-start bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-stone-900">Avoid Bedtime Bottles:</span> Never put your baby to bed with a bottle of milk or juice. The pooling liquid can cause rapid decay known as &quot;baby bottle tooth decay.&quot;
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: First Tooth & Teething */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-sky-200 pb-2 flex items-center gap-2">
            <Baby className="w-6 h-6 text-sky-600" /> First Tooth & Teething Care
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-sky-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-sky-700 text-lg">Signs of Teething</CardTitle>
              </CardHeader>
              <CardContent className="text-stone-600 text-sm space-y-2">
                <p>• Increased drooling and skin rashes around the mouth.</p>
                <p>• Chewing on hands, toys, or hard objects.</p>
                <p>• Fussiness, irritability, or disrupted sleep.</p>
                <p>• Swollen or tender gums.</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-sky-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-sky-700 text-lg">How to Soothe Discomfort</CardTitle>
              </CardHeader>
              <CardContent className="text-stone-600 text-sm space-y-2">
                <p>• <span className="font-medium">Massage:</span> Gently rub gums with a clean finger.</p>
                <p>• <span className="font-medium">Cool Relief:</span> Offer a chilled (not frozen) teething ring or a cold, damp washcloth.</p>
                <p>• <span className="font-medium">Comfort:</span> Extra cuddles and patience go a long way.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: First Dental Visit */}
        <section className="bg-sky-600 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-sky-200" /> The First Dental Visit
            </h2>
            <p className="text-lg mb-6 text-sky-50">
              We recommend scheduling your child&apos;s first dental visit by their <span className="font-bold text-white">first birthday</span> or within 6 months of their first tooth appearing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Why So Early?</h3>
                <p className="text-sm text-sky-100">It helps your child get comfortable with the dentist in a non-scary way and allows the dentist to check for early signs of decay.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <h3 className="font-semibold mb-2">What to Expect</h3>
                <p className="text-sm text-sky-100">A gentle "happy visit" where the dentist counts teeth, checks gums, and answers your questions about diet and care.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Healthy Brushing Habits */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-sky-200 pb-2 flex items-center gap-2">
            <Smile className="w-6 h-6 text-sky-600" /> Building Healthy Brushing Habits
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-800">The Basics</h3>
                <ul className="space-y-3 text-stone-600 text-sm">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-sky-500 shrink-0" /> Start brushing twice a day as soon as teeth appear.</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-sky-500 shrink-0" /> Use a soft-bristled, infant-sized toothbrush.</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-sky-500 shrink-0" /> <span className="font-medium">Toothpaste Amount:</span> Use a smear (grain of rice) for under 3s, and a pea-sized amount for ages 3-6.</li>
                </ul>
              </div>
              <div className="bg-sky-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-sky-900 mb-3">Parent Pro Tips</h3>
                <ul className="space-y-2 text-sm text-sky-800">
                  <li>• <strong>Spit, Don&apos;t Rinse:</strong> Encourage spitting out toothpaste but avoiding rinsing immediately to let fluoride protect the teeth.</li>
                  <li>• <strong>Supervision is Key:</strong> Assist with brushing until your child is about 7-8 years old to ensure they reach all spots.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Diet & Drinks */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-sky-200 pb-2 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-sky-600" /> Diet & Drinks for Healthy Teeth
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-stone-700">
            <li className="bg-white p-5 rounded-xl border border-stone-100 shadow-sm hover:border-sky-200 transition-colors">
              <span className="font-semibold block mb-2 text-sky-700">Sugar & Cavities</span>
              Bacteria in the mouth feed on sugar to create acid, which eats away enamel. Limit sticky candies and sugary snacks.
            </li>
            <li className="bg-white p-5 rounded-xl border border-stone-100 shadow-sm hover:border-sky-200 transition-colors">
              <span className="font-semibold block mb-2 text-sky-700">The Truth About Juice</span>
              Even 100% fruit juice is high in natural sugar and acid. Limit juice to meal times or dilute it with water.
            </li>
            <li className="bg-white p-5 rounded-xl border border-stone-100 shadow-sm hover:border-sky-200 transition-colors">
              <span className="font-semibold block mb-2 text-sky-700">Water is Best</span>
              Water rinses away food particles and is the healthiest drink for thirsty toddlers. Fluoridated water adds extra protection.
            </li>
          </ul>
        </section>

        {/* Section 6: Challenges & Solutions */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-sky-200 pb-2 flex items-center gap-2">
            <Shield className="w-6 h-6 text-sky-600" /> Common Challenges & Solutions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
              <h3 className="text-lg font-semibold text-stone-900 mb-2">Pacifiers & Thumb Sucking</h3>
              <p className="text-stone-600 text-sm mb-4">
                Sucking is a natural soothing reflex, but prolonged habits (past age 3) can affect how teeth align and how the jaw grows.
              </p>
              <div className="text-sm text-stone-600 bg-stone-50 p-4 rounded-lg">
                <strong>Gentle Tip:</strong> Use positive reinforcement (praise, sticker charts) to encourage stopping. Avoid scolding, which can increase anxiety and sucking.
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
              <h3 className="text-lg font-semibold text-stone-900 mb-2">Making Brushing Fun</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-600">
                <li className="flex gap-2"><span className="text-sky-500">🎵</span> Play a 2-minute "brushing song".</li>
                <li className="flex gap-2"><span className="text-sky-500">🧸</span> Let them brush a toy's teeth.</li>
                <li className="flex gap-2"><span className="text-sky-500">⭐</span> Use a sticker reward chart.</li>
                <li className="flex gap-2"><span className="text-sky-500">👨‍👩‍👧</span> Brush together as a family.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: Myth vs Fact */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-sky-200 pb-2">
            Myth vs. Fact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
              <span className="inline-block px-3 py-1 bg-rose-200 text-rose-800 text-xs font-bold rounded-full mb-3">MYTH</span>
              <p className="font-medium text-stone-800 mb-2">"Baby teeth don't matter because they fall out anyway."</p>
              <p className="text-sm text-stone-600"><strong>Fact:</strong> Baby teeth hold space for adult teeth. Early loss due to decay can cause crowding and alignment issues later.</p>
            </div>
            <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
              <span className="inline-block px-3 py-1 bg-sky-200 text-sky-800 text-xs font-bold rounded-full mb-3">MYTH</span>
              <p className="font-medium text-stone-800 mb-2">"Juice is a healthy drink for teeth."</p>
              <p className="text-sm text-stone-600"><strong>Fact:</strong> Juice bathes teeth in sugar and acid. Whole fruits are much better for dental health.</p>
            </div>
          </div>
        </section>

        {/* Section 8: Parent Checklist */}
        <section className="bg-stone-900 text-stone-300 p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Check className="w-6 h-6 text-sky-400" /> Daily Parent Checklist
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-sky-500 flex items-center justify-center shrink-0">
                <div className="w-3 h-3 bg-sky-500 rounded-full" />
              </div>
              <span>Brush twice a day (morning & night).</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-sky-500 flex items-center justify-center shrink-0">
                <div className="w-3 h-3 bg-sky-500 rounded-full" />
              </div>
              <span>Drink water after meals and snacks.</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-sky-500 flex items-center justify-center shrink-0">
                <div className="w-3 h-3 bg-sky-500 rounded-full" />
              </div>
              <span>Check gums and teeth regularly for spots or changes.</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-sky-500 flex items-center justify-center shrink-0">
                <div className="w-3 h-3 bg-sky-500 rounded-full" />
              </div>
              <span>Make brushing a happy, positive time!</span>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
}
