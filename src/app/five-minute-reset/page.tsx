"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FiveMinuteResetPage() {
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const [isActive, setIsActive] = useState(true); // Start automatically
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(300);
    setIsFinished(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Breathing animation variants
  const breatheVariants = {
    inhale: { scale: 1.05, opacity: 0.8 },
    exhale: { scale: 1, opacity: 0.4 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-white flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-100/40 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-100/30 rounded-full blur-[100px]" 
        />
      </div>

      {/* Back Button */}
      <Link href="/emotional-well-being" className="absolute top-8 left-8 z-20 group">
        <Button variant="ghost" className="rounded-full text-stone-500 hover:text-stone-900 hover:bg-white/80 transition-all duration-300">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back
        </Button>
      </Link>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        
        {/* Breathing Guide Circle */}
        <div className="relative mb-16">
          <motion.div
            variants={breatheVariants}
            animate={isActive && !isFinished ? "inhale" : "exhale"}
            transition={{ duration: 4, ease: "easeInOut", repeat: isActive && !isFinished ? Infinity : 0, repeatType: "reverse" }}
            className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center justify-center border border-white/60 backdrop-blur-md relative z-10"
          >
            <AnimatePresence mode="wait">
              {!isFinished ? (
                <motion.div
                  key="timer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="text-center flex flex-col items-center justify-center h-full"
                >
                  <span className="text-7xl md:text-8xl font-sans font-extralight text-stone-800 tracking-tight tabular-nums block leading-none">
                    {formatTime(timeLeft)}
                  </span>
                  {isActive && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.8, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="text-stone-400 text-sm font-medium uppercase tracking-[0.3em] mt-6 absolute bottom-16"
                    >
                      Breathe
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-8 flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <Check className="w-8 h-8 text-rose-400" />
                  </div>
                  <p className="text-xl font-serif text-stone-800 font-medium mb-2">
                    You showed up today.
                  </p>
                  <p className="text-stone-500 font-light">That matters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Outer Pulse Rings */}
          {isActive && (
            <>
              <motion.div
                animate={{ scale: [1, 1.3], opacity: [0.4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-rose-200/60 pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                className="absolute inset-0 rounded-full border border-rose-100/40 pointer-events-none"
              />
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-8 items-center">
          {!isFinished ? (
            <>
              <Button
                onClick={toggleTimer}
                size="lg"
                className="rounded-full w-20 h-20 bg-stone-900 hover:bg-stone-800 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95"
              >
                {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 ml-1 fill-current" />}
              </Button>
              
              <Button
                onClick={resetTimer}
                size="icon"
                variant="outline"
                className="rounded-full w-14 h-14 border-stone-200 text-stone-400 hover:text-stone-900 hover:bg-white hover:border-stone-300 transition-all duration-300 bg-transparent"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </>
          ) : (
            <Button
              onClick={resetTimer}
              size="lg"
              className="rounded-full px-10 h-14 bg-rose-600 hover:bg-rose-700 text-white shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 text-lg"
            >
              Start Again
            </Button>
          )}
        </div>

        {/* Caption */}
        <p className="mt-16 text-stone-400 text-xs md:text-sm font-medium text-center max-w-xs mx-auto leading-relaxed tracking-wide opacity-80">
          "Consistency matters more than duration. Even five minutes changes the trajectory of your day."
        </p>
      </div>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
