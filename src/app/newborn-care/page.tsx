import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, Heart, Shield, Clock, Activity, Baby, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Newborn Care & First Days | MotherEra",
  description:
    "Expert-backed guidance for newborn bonding, feeding, sleep, safety, and care during the first hours, days, and weeks.",
};

export default function NewbornCarePage() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="relative py-16 bg-purple-100/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">Newborn Care & Your First Days</h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto">
            Guidance for the precious first hours, days, and weeks. 
            From skin-to-skin bonding to safe sleep and feeding essentials.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16 max-w-5xl">
        
        {/* Section 1: First Hours */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-purple-200 pb-2 flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-600" /> The First Hours After Birth
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
            <div className="prose prose-stone max-w-none text-stone-600">
              <h3 className="text-lg font-semibold text-stone-800 mb-3">The Golden Hour</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-stone-900">Skin-to-Skin Contact:</span> Regulates baby&apos;s heart rate, breathing, and temperature immediately after birth.
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-stone-900">Emotional Bonding:</span> Triggers oxytocin (the love hormone) in mother and baby, reducing stress and promoting attachment.
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-stone-900">Physiological Benefits:</span> Helps stabilize baby&apos;s blood sugar and encourages early breastfeeding instincts.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Immediate Care */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-purple-200 pb-2 flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-600" /> Immediate Newborn Procedures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-stone-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-purple-700">Vitamin K Injection</CardTitle>
              </CardHeader>
              <CardContent className="text-stone-600 text-sm">
                <p>Newborns have low Vitamin K levels, which is essential for blood clotting. A single injection prevents Vitamin K Deficiency Bleeding (VKDB), a rare but serious condition.</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-stone-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-purple-700">Eye Ointment</CardTitle>
              </CardHeader>
              <CardContent className="text-stone-600 text-sm">
                <p>Antibiotic eye drops or ointment are applied to prevent neonatal conjunctivitis, which can be caused by bacteria present in the birth canal.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Safety & Security */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-purple-200 pb-2 flex items-center gap-2">
            <Shield className="w-6 h-6 text-purple-600" /> Baby Safety & Security
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-stone-700">
            <li className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm">
              <span className="font-semibold block mb-1">Identification Bands</span>
              Matched bands for baby, mother, and partner are checked every time baby is brought to you.
            </li>
            <li className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm">
              <span className="font-semibold block mb-1">Security Sensors</span>
              Many hospitals use electronic tags that trigger alarms if a baby is moved near exits.
            </li>
            <li className="bg-white p-4 rounded-lg border border-stone-100 shadow-sm">
              <span className="font-semibold block mb-1">Transport Safety</span>
              Babies should always be transported in bassinets in hallways, not carried in arms (to prevent falls).
            </li>
          </ul>
        </section>

        {/* Section 4: Health Screenings */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-purple-200 pb-2 flex items-center gap-2">
            <Check className="w-6 h-6 text-purple-600" /> Essential Health Screenings
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-100">
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-stone-900">Standard Tests</h3>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li>• <span className="font-medium">Metabolic Screening (PKU):</span> Heel prick test for genetic disorders.</li>
                  <li>• <span className="font-medium">Jaundice Check:</span> Monitoring skin/blood for bilirubin levels.</li>
                  <li>• <span className="font-medium">Hearing Screen:</span> Checking response to soft sounds.</li>
                  <li>• <span className="font-medium">CCHD:</span> Pulse oximetry to check heart oxygen levels.</li>
                </ul>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-stone-900">Vaccines & Care</h3>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li>• <span className="font-medium">Hepatitis B:</span> First dose usually given before discharge.</li>
                  <li>• <span className="font-medium">Pain Management:</span> Comfort measures (swaddling, sucking) during pricks.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Feeding & Nutrition */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-purple-200 pb-2 flex items-center gap-2">
            <Baby className="w-6 h-6 text-purple-600" /> Feeding & Nutrition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-stone-800">Feeding Basics</h3>
              <ul className="space-y-2 text-stone-600 text-sm">
                <li>• <span className="font-medium">Frequency:</span> Every 2-3 hours (8-12 times a day).</li>
                <li>• <span className="font-medium">Hunger Cues:</span> Rooting, sucking hands, smacking lips (crying is a late sign).</li>
                <li>• <span className="font-medium">Weight:</span> Babies lose up to 10% weight initially but regain it by 2 weeks.</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Diaper Tracking</h3>
              <div className="space-y-2 text-sm text-purple-800">
                <p>Day 1: 1 wet, 1 dirty (meconium)</p>
                <p>Day 2: 2 wet, 2 dirty</p>
                <p>Day 3: 3 wet, 3 dirty</p>
                <p>Day 4+: 6+ heavy wet diapers daily</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Safe Sleep */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-purple-200 pb-2 flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-600" /> Safe Sleep & Comfort
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
              <h3 className="text-lg font-semibold text-stone-900 mb-2">The ABCs of Safe Sleep</h3>
              <p className="text-stone-600 text-sm mb-4">To prevent SIDS (Sudden Infant Death Syndrome):</p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <li className="bg-stone-50 p-3 rounded-lg"><span className="font-bold text-purple-600 block text-xl">A</span> Alone (no pillows/toys)</li>
                <li className="bg-stone-50 p-3 rounded-lg"><span className="font-bold text-purple-600 block text-xl">B</span> Back (always place on back)</li>
                <li className="bg-stone-50 p-3 rounded-lg"><span className="font-bold text-purple-600 block text-xl">C</span> Crib (firm mattress)</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg flex gap-3 items-start">
              <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div className="text-sm text-orange-800">
                <span className="font-bold">Critical Safety:</span> Never shake a baby. If you feel overwhelmed, place the baby safely in the crib and walk away for a few minutes to calm down.
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Going Home */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-purple-200 pb-2">
            Preparing for Home
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-stone-800 mb-3">Discharge Checklist</h3>
              <ul className="space-y-2 text-stone-600 text-sm">
                <li className="flex gap-2"><Check className="w-4 h-4 text-purple-500 shrink-0" /> Mother&apos;s recovery check.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-purple-500 shrink-0" /> Baby&apos;s weight & jaundice check.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-purple-500 shrink-0" /> Pediatrician appointment scheduled (usually 2-3 days after).</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-stone-800 mb-3">Car Seat Safety</h3>
              <p className="text-stone-600 text-sm mb-2">
                A properly installed rear-facing car seat is non-negotiable. 
              </p>
              <ul className="space-y-2 text-stone-600 text-sm">
                <li className="flex gap-2"><Check className="w-4 h-4 text-purple-500 shrink-0" /> Snug straps (no bulky coats).</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-purple-500 shrink-0" /> Chest clip at armpit level.</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
