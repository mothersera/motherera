"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, User as UserIcon } from "lucide-react";

interface Expert {
  _id: string;
  name: string;
  specialization: string;
  experience: number;
  bio: string;
  image?: string;
}

export default function ExpertsPage() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    async function fetchExperts() {
      try {
        const res = await fetch('/api/experts');
        if (res.ok) {
          const data = await res.json();
          setExperts(data);
        }
      } catch (err) {
        console.error("Failed to load experts", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchExperts();
  }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpert || !bookingDate) return;
    
    setIsBooking(true);
    setBookingStatus(null);

    try {
        const res = await fetch('/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                expertId: selectedExpert._id,
                date: bookingDate,
                notes: bookingNotes
            })
        });

        if (res.ok) {
            setBookingStatus({ type: 'success', text: 'Appointment booked successfully!' });
            setTimeout(() => {
                setSelectedExpert(null);
                setBookingDate("");
                setBookingNotes("");
                setBookingStatus(null);
            }, 2000);
        } else {
            const data = await res.json();
            setBookingStatus({ type: 'error', text: data.error || 'Failed to book appointment' });
        }
    } catch (err) {
        console.error(err);
        setBookingStatus({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
        setIsBooking(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold text-stone-900 mb-6">Find an Expert</h1>
      {experts.length === 0 ? (
        <div className="text-center text-stone-500 py-12">
          No experts found at the moment. Please check back later.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <Card key={expert._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 overflow-hidden">
                    {expert.image && !expert.image.includes('default') ? (
                       // eslint-disable-next-line @next/next/no-img-element
                       <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                    ) : (
                       <UserIcon className="h-8 w-8" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{expert.name}</CardTitle>
                    <p className="text-rose-600 text-sm font-medium">{expert.specialization}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-stone-600 text-sm mb-4 line-clamp-3">
                  {expert.bio || "Experienced professional dedicated to maternal health."}
                </p>
                <div className="flex justify-between items-center text-sm text-stone-500 mb-4">
                   <span>{expert.experience ? `${expert.experience} Yrs Exp` : 'Experienced'}</span>
                   <span>Verified</span>
                </div>
                <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setSelectedExpert(expert)}
                >
                    Book Consultation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Booking Modal Overlay */}
      {selectedExpert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-white">
                <CardHeader>
                    <CardTitle>Book with {selectedExpert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleBook} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">Preferred Date & Time</label>
                            <input 
                                type="datetime-local" 
                                required
                                className="w-full border rounded-md p-2 text-stone-900"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">Reason / Notes</label>
                            <textarea 
                                className="w-full border rounded-md p-2 text-stone-900"
                                rows={3}
                                placeholder="Briefly describe your concern..."
                                value={bookingNotes}
                                onChange={(e) => setBookingNotes(e.target.value)}
                            />
                        </div>

                        {bookingStatus && (
                            <div className={`text-sm p-2 rounded ${bookingStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {bookingStatus.text}
                            </div>
                        )}

                        <div className="flex gap-2 justify-end mt-4">
                            <Button type="button" variant="ghost" onClick={() => {
                                setSelectedExpert(null);
                                setBookingStatus(null);
                            }}>Cancel</Button>
                            <Button type="submit" disabled={isBooking}>
                                {isBooking ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Confirm Booking
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
