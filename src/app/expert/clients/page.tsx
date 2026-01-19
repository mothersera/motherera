"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Clock } from "lucide-react";

interface Appointment {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export default function ExpertClientsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch('/api/appointments');
        if (res.ok) {
          const data = await res.json();
          setAppointments(data);
        }
      } catch (err) {
        console.error("Failed to load appointments", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-6">My Appointments</h1>
      
      {appointments.length === 0 ? (
        <div className="text-center py-12 bg-stone-50 rounded-lg">
          <p className="text-stone-500">No appointments scheduled yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((apt) => (
            <Card key={apt._id}>
              <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold overflow-hidden shrink-0">
                     {apt.userId.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={apt.userId.image} alt={apt.userId.name} className="w-full h-full object-cover" />
                     ) : (
                        apt.userId.name ? apt.userId.name.charAt(0).toUpperCase() : 'U'
                     )}
                   </div>
                   <div>
                     <h3 className="font-semibold text-stone-900">{apt.userId.name || 'Unknown User'}</h3>
                     <div className="flex items-center gap-4 text-sm text-stone-500 mt-1">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(apt.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                     </div>
                     {apt.notes && (
                        <p className="text-sm text-stone-400 mt-1 italic">&quot;{apt.notes}&quot;</p>
                     )}
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                        ${apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 
                          apt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                    `}>
                        {apt.status}
                    </span>
                    <Button variant="outline" size="sm">View Details</Button>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
