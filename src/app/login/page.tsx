"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight, Heart } from "lucide-react";
import { motion, Variants } from "framer-motion";

const backgroundVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "mirror"
    }
  }
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md relative z-10"
    >
      <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-xl">
        <CardHeader className="space-y-3 pb-8 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-2 text-rose-600 shadow-sm"
          >
            <Heart className="w-8 h-8 fill-current" />
          </motion.div>
          <CardTitle className="text-3xl font-serif font-bold tracking-tight text-stone-900">
            Welcome back
          </CardTitle>
          <CardDescription className="text-stone-500 text-base">
            Enter your email to sign in to your journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none text-stone-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                disabled={isLoading}
                className="h-12 bg-white/50 border-stone-200 focus:border-rose-300 focus:ring-rose-200 transition-all"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none text-stone-700">
                  Password
                </label>
                <Link href="#" className="text-xs text-rose-600 hover:text-rose-700 font-medium">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                disabled={isLoading}
                className="h-12 bg-white/50 border-stone-200 focus:border-rose-300 focus:ring-rose-200 transition-all"
              />
            </div>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-sm text-red-600 bg-red-50 p-3 rounded-lg font-medium border border-red-100 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </motion.div>
            )}
            <Button 
              className="w-full h-12 text-base font-medium bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all hover:scale-[1.02]" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-stone-400">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <Button 
               variant="outline" 
               className="h-11 border-stone-200 hover:bg-stone-50" 
               onClick={() => signIn("google", { callbackUrl })}
               disabled={isLoading}
             >
               Google
             </Button>
             <Button 
               variant="outline" 
               className="h-11 border-stone-200 hover:bg-stone-50" 
               onClick={() => signIn("apple", { callbackUrl })}
               disabled={isLoading}
             >
               Apple
             </Button>
          </div>

        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-stone-600 pb-8">
          <div>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-rose-600 hover:text-rose-500 hover:underline underline-offset-4">
              Create account
            </Link>
          </div>
        </CardFooter>
      </Card>
      
      <p className="text-center text-xs text-stone-400 mt-8">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center relative overflow-hidden bg-stone-50">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          variants={backgroundVariants}
          animate="animate"
          className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-[100px]" 
        />
        <motion.div 
          variants={backgroundVariants}
          animate="animate"
          className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[100px]" 
        />
        <motion.div 
          variants={backgroundVariants}
          animate="animate"
          className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[100px]" 
        />
      </div>

      <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
