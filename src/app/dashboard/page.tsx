import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Utensils, Calendar, User } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">
            Welcome back, {session.user.name?.split(' ')[0]}
          </h1>
          <p className="text-stone-600 mt-1 capitalize">
            Stage: {session.user.motherhoodStage?.replace(/_/g, ' ') || 'Not set'}
          </p>
        </div>
        <Link href="/dashboard/subscription">
           <Button variant={session.user.subscriptionPlan === 'basic' ? "default" : "outline"}>
             {session.user.subscriptionPlan === 'basic' ? 'Upgrade Plan' : 'Manage Subscription'}
           </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Status</CardTitle>
            <Activity className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-stone-500">Last check-in: 2 days ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Meal</CardTitle>
            <Utensils className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Lunch</div>
            <p className="text-xs text-stone-500">Spinach Dal & Roti</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tomorrow</div>
            <p className="text-xs text-stone-500">Dr. Sharma (Gyn) - 10:00 AM</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
            <User className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-stone-500">Complete your profile</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link href="/dashboard/community" className="block">
           <Card className="hover:border-rose-200 transition-colors cursor-pointer h-full">
             <CardHeader className="flex flex-row items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                 <MessageSquare className="h-6 w-6 text-rose-600" />
               </div>
               <div>
                 <CardTitle className="text-lg">Community Forum</CardTitle>
                 <p className="text-sm text-stone-500">Connect with other mothers</p>
               </div>
             </CardHeader>
             <CardContent>
               <p className="text-stone-600">Join discussions on pregnancy, postpartum care, and parenting tips. You are not alone!</p>
             </CardContent>
           </Card>
        </Link>
        <Link href="/dashboard/support" className="block">
           <Card className="hover:border-rose-200 transition-colors cursor-pointer h-full">
             <CardHeader className="flex flex-row items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                 <HeartHandshake className="h-6 w-6 text-emerald-600" />
               </div>
               <div>
                 <CardTitle className="text-lg">Support Chat</CardTitle>
                 <p className="text-sm text-stone-500">Talk to MotherEra Team</p>
               </div>
             </CardHeader>
             <CardContent>
               <p className="text-stone-600">Have a question? Chat privately with our support team for guidance and help.</p>
             </CardContent>
           </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Nutrition Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-stone-900">Breakfast</h4>
                    <p className="text-sm text-stone-600">Oats Porridge with Almonds</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded">Completed</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-stone-900">Lunch</h4>
                    <p className="text-sm text-stone-600">Spinach Dal, Roti & Curd</p>
                  </div>
                   <Button size="sm" variant="outline">Mark Done</Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-stone-900">Dinner</h4>
                    <p className="text-sm text-stone-600">Grilled Paneer Salad</p>
                  </div>
                   <Button size="sm" variant="outline">Mark Done</Button>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/dashboard/nutrition-plan">
                  <Button variant="link" className="px-0 text-rose-600">View Full Plan &rarr;</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Experts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-500">
                     Dr
                   </div>
                   <div>
                     <h4 className="font-medium text-stone-900">Dr. Anjali Gupta</h4>
                     <p className="text-xs text-stone-500">Nutritionist • 10 Yrs Exp</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-500">
                     Ms
                   </div>
                   <div>
                     <h4 className="font-medium text-stone-900">Ms. Riya Singh</h4>
                     <p className="text-xs text-stone-500">Yoga Expert • 5 Yrs Exp</p>
                   </div>
                 </div>
              </div>
              <div className="mt-4">
                <Link href="/dashboard/experts">
                  <Button className="w-full" variant="outline">Find More Experts</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
