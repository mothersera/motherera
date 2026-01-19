import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ExpertProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-6">Expert Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Professional Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-sm font-medium">Name</label>
                   <Input defaultValue="Dr. Anjali Gupta" />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-medium">Specialization</label>
                   <Input defaultValue="Clinical Nutritionist" />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-medium">Experience (Years)</label>
                   <Input defaultValue="10" type="number" />
                </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Availability</label>
                   <Input defaultValue="Mon-Fri, 10am - 4pm" />
                </div>
             </div>
             <Button>Save Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
