"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stageParam = searchParams.get("stage");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<'mother' | 'expert'>('mother');
  const [stage, setStage] = useState(stageParam || 'pregnancy');
  const [objectives, setObjectives] = useState<string[]>([]);

  const toggleObjective = (value: string) => {
    setObjectives(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const expectedDueDate = String(formData.get("expectedDueDate") || "").trim() || undefined;
    const childBirthDate = String(formData.get("childBirthDate") || "").trim() || undefined;
    const gestationalAgeWeeksRaw = String(formData.get("gestationalAgeWeeks") || "").trim();
    const gestationalAgeWeeks = gestationalAgeWeeksRaw ? Number(gestationalAgeWeeksRaw) : undefined;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          motherhoodStage: role === 'mother' ? stage : undefined,
          expectedDueDate: role === "mother" ? expectedDueDate : undefined,
          childBirthDate: role === "mother" ? childBirthDate : undefined,
          gestationalAgeWeeks: role === "mother" && Number.isFinite(gestationalAgeWeeks) ? gestationalAgeWeeks : undefined,
          wellnessObjectives: role === "mother" ? objectives : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = data.error || "Registration failed";
        if (data.details) {
           if (Array.isArray(data.details)) {
             // Handle Zod issue array or string array
             const detailsStr = data.details
               .map((d: unknown) => typeof d === 'string' ? d : (d as { message?: unknown })?.message)
               .map((v: unknown) => String(v || ""))
               .filter(Boolean)
               .join(", ");
             errorMessage += `: ${detailsStr}`;
           } else {
             errorMessage += `: ${data.details}`;
           }
        }
        throw new Error(errorMessage);
      }

      // Automatically sign in after registration
      router.push("/login?registered=true");
    } catch (err: unknown) {
      setError((err as Error).message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-center">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Join Mother Era for your guided journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex gap-4 mb-4">
             <Button
               type="button"
               variant={role === 'mother' ? 'default' : 'outline'}
               className="flex-1"
               onClick={() => setRole('mother')}
             >
               I&apos;m a Mother
             </Button>
             <Button
               type="button"
               variant={role === 'expert' ? 'default' : 'outline'}
               className="flex-1"
               onClick={() => setRole('expert')}
             >
               I&apos;m an Expert
             </Button>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium leading-none">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>

          {role === 'mother' && (
            <>
              <div className="space-y-2">
                <label htmlFor="stage" className="text-sm font-medium leading-none">
                  Current Stage
                </label>
                <select
                  id="stage"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                >
                  <option value="pregnancy">Pregnancy</option>
                  <option value="postpartum">Postpartum</option>
                  <option value="child_0_5">Child (0-5 Years)</option>
                </select>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white/60 p-4 space-y-3">
                <div className="text-sm font-semibold text-stone-900">Lifecycle Mapping Engine</div>
                <div className="text-xs text-stone-500">Add one detail for smarter personalization. You can edit later.</div>

                {stage === "pregnancy" ? (
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1.5">
                      <label htmlFor="expectedDueDate" className="text-xs font-medium text-stone-700">
                        Expected due date (optional)
                      </label>
                      <Input id="expectedDueDate" name="expectedDueDate" type="date" disabled={isLoading} />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="gestationalAgeWeeks" className="text-xs font-medium text-stone-700">
                        Gestational age in weeks (optional)
                      </label>
                      <Input id="gestationalAgeWeeks" name="gestationalAgeWeeks" type="number" min={0} max={42} disabled={isLoading} placeholder="e.g. 18" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label htmlFor="childBirthDate" className="text-xs font-medium text-stone-700">
                      Child birth date (optional)
                    </label>
                    <Input id="childBirthDate" name="childBirthDate" type="date" disabled={isLoading} />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-xs font-medium text-stone-700">Wellness focus (optional)</div>
                  <div className="flex flex-wrap gap-2">
                    {["Sleep", "Nutrition", "Mental Wellness", "Recovery", "Baby Care", "Routine"].map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => toggleObjective(o)}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                          objectives.includes(o)
                            ? "bg-rose-50 border-rose-200 text-rose-700"
                            : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                        }`}
                        disabled={isLoading}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {error && (
            <div className="text-sm text-red-500 font-medium">
              {error}
            </div>
          )}

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-center text-sm text-stone-600">
        <div>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-rose-600 hover:text-rose-500">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-stone-50 px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
