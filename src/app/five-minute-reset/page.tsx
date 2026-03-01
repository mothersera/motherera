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
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-100/40 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-100/30 rounded-full blur-[80px]" 
        />
      </div>

      {/* Back Button */}
      <Link href="/emotional-well-being" className="absolute top-8 left-8 z-20">
        <Button variant="ghost" className="rounded-full text-stone-500 hover:text-stone-900 hover:bg-white/50">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </Button>
      </Link>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        
        {/* Breathing Guide Circle */}
        <div className="relative mb-12">
          <motion.div
            variants={breatheVariants}
            animate={isActive && !isFinished ? "inhale" : "exhale"}
            transition={{ duration: 4, ease: "easeInOut", repeat: isActive && !isFinished ? Infinity : 0, repeatType: "reverse" }}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-2xl shadow-rose-100/50 flex items-center justify-center border border-white/50 backdrop-blur-sm"
          >
            <AnimatePresence mode="wait">
              {!isFinished ? (
                <motion.div
                  key="timer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center"
                >
                  <span className="text-6xl md:text-7xl font-sans font-light text-stone-800 tracking-tight tabular-nums block">
                    {formatTime(timeLeft)}
                  </span>
                  {isActive && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 8, repeat: Infinity }}
                      className="text-stone-400 text-sm font-medium uppercase tracking-widest mt-4"
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
                  className="text-center p-6"
                >
                  <Check className="w-12 h-12 text-rose-400 mx-auto mb-4" />
                  <p className="text-lg font-serif text-stone-800 font-medium">
                    You showed up for yourself today.
                  </p>
                  <p className="text-stone-500 mt-2">That matters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Outer Pulse Ring */}
          {isActive && (
            <motion.div
              animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-rose-200 pointer-events-none"
            />
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-6 items-center">
          {!isFinished ? (
            <>
              <Button
                onClick={toggleTimer}
                size="lg"
                className="rounded-full w-16 h-16 bg-stone-900 hover:bg-stone-800 text-white shadow-lg hover:shadow-xl transition-all"
              >
                {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </Button>
              
              <Button
                onClick={resetTimer}
                size="icon"
                variant="outline"
                className="rounded-full w-12 h-12 border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-white"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <Button
              onClick={resetTimer}
              size="lg"
              className="rounded-full px-8 bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-all"
            >
              Start Again
            </Button>
          )}
        </div>

        {/* Caption */}
        <p className="mt-12 text-stone-400 text-sm font-medium text-center max-w-xs mx-auto leading-relaxed">
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
