"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, ArrowLeft, Volume2, VolumeX, Download, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Types
type ActivityType = 'meditation' | 'breathing' | 'movement' | 'writing' | 'affirmations';

interface Activity {
  id: ActivityType;
  title: string;
  icon: string;
  duration: number; // seconds
}

const ACTIVITIES: Activity[] = [
  { id: 'meditation', title: 'Guided Meditation', icon: '🧘‍♀️', duration: 300 },
  { id: 'breathing', title: 'Box Breathing', icon: '🌬️', duration: 300 },
  { id: 'movement', title: 'Desk Movement', icon: '🙆‍♀️', duration: 300 },
  { id: 'writing', title: 'Journaling', icon: '✍️', duration: 300 },
  { id: 'affirmations', title: 'Affirmations', icon: '✨', duration: 240 },
];

const TRANSCRIPTS: Record<ActivityType, { time: number; text: string }[]> = {
  meditation: [
    { time: 0, text: "Find a comfortable seated position. Rest your hands in your lap. If it feels safe, gently close your eyes. Begin by noticing the surface beneath you — the support you have in this moment." },
    { time: 30, text: "Take a long, slow inhale through the nose for 4 counts… hold for 2… and exhale through the mouth for 6 counts. Again: inhale 4… hold 2… exhale 6. Continue breathing slowly and gently." },
    { time: 75, text: "Shift your attention to the top of the head, then gently scan down: forehead, eyes, jaw — release any tension. Soften shoulders on the outbreath. Continue to breathe calmly." },
    { time: 150, text: "Bring to mind one small thing you can be grateful for today — a sip of tea, a steady breath, a kind word. Hold that small thing with curiosity and warmth." },
    { time: 210, text: "If the mind wanders, that is OK. Notice the thought and let it pass like a cloud. Return to the breath. Breathe in presence; breathe out distraction." },
    { time: 270, text: "Take a final deep inhalation… and exhale fully. When ready, open your eyes slowly. You’ve completed your five-minute reset." }
  ],
  breathing: [
    { time: 0, text: "Sit upright, feet on the floor. Place one hand on the belly. Let’s start with slow grounding breaths." },
    { time: 20, text: "Box breathing: inhale for 4… hold for 4… exhale for 4… hold for 4. I’ll guide a few rounds with a soft bell at each change." },
    { time: 60, text: "Continue at your pace. Notice how the inhalation fills the belly, the hold brings stability, the exhale releases." },
    { time: 120, text: "Now lengthen the exhale slightly: inhale 4… hold 2… exhale 6. Use this longer exhale to let go of tension." },
    { time: 210, text: "Return to easy breathing. Notice the rhythm of your breath and the solidity of your body in the chair." },
    { time: 270, text: "Take one final deep breath in… exhale slowly. When you feel ready, open your eyes." }
  ],
  movement: [
    { time: 0, text: "Stand comfortably (or stay seated if you need to). We’ll do gentle movement to energize you." },
    { time: 20, text: "Neck rolls: drop chin to chest, roll slowly to one side, then the other. Repeat twice each direction." },
    { time: 50, text: "Shoulder rolls: inhale as you lift shoulders up to ears; exhale roll them back and down. Repeat 6x." },
    { time: 90, text: "Side stretch: reach right arm overhead and lean left — gentle stretch on the side body. Hold 10s. Switch sides." },
    { time: 150, text: "Hip and hamstring wake: if seated, extend one leg, flex the ankle and lift slightly; alternate 8x per leg. Or march in place gently." },
    { time: 210, text: "Wrist and hand reset: open and close hands, stretch fingers wide, rotate wrists." },
    { time: 270, text: "Finish: take three deep breaths; notice how your body feels lighter." }
  ],
  writing: [
    { time: 0, text: "Set a timer to five minutes. Prompt: 'What is one practical thing I can do in the next 24 hours to make today easier for me?' Write without censoring for five minutes. Focus on action, not perfection." },
    { time: 30, text: "Alternative Prompts: 'One small win I had this week was…' | 'A support I’m thankful for is…' | 'If I had 15 extra minutes in my day I would…'" },
    { time: 120, text: "Keep writing. Don't worry about grammar or spelling. Just let the thoughts flow onto the page." },
    { time: 240, text: "One minute left. Start to wrap up your thoughts." },
    { time: 290, text: "Finish your last sentence. Take a deep breath." }
  ],
  affirmations: [
    { time: 0, text: "Repeat after me (either out loud or in your head): 'I am doing my best with the resources I have. I can take the next small step.'" },
    { time: 45, text: "'I am worthy of rest. I give myself permission to be human.'" },
    { time: 90, text: "'I trust my intuition. I am capable of handling what comes my way.'" },
    { time: 135, text: "'My needs matter. Taking care of myself allows me to care for others.'" },
    { time: 180, text: "Now, take a moment to craft your own personal affirmation. What do you need to hear right now? Repeat it three times." },
    { time: 220, text: "Let these words sink in. Carry this feeling with you." }
  ]
};

export default function FiveMinuteResetPage() {
  const [activeActivity, setActiveActivity] = useState<ActivityType>('meditation');
  const [timeLeft, setTimeLeft] = useState(300);
  // Default to false so user MUST click play to start - solving the autoplay block issue completely
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mock Analytics - Replace with real implementation (GA4, Segment, etc.)
  const trackEvent = (eventName: string, data?: any) => {
    console.log(`[Analytics] ${eventName}`, data);
    // window.gtag?.('event', eventName, data);
  };
  
  // Initialize from localStorage or default
  useEffect(() => {
    const savedActivity = localStorage.getItem('motherera_reset_activity') as ActivityType;
    if (savedActivity && ACTIVITIES.find(a => a.id === savedActivity)) {
      setActiveActivity(savedActivity);
      // Reset timer based on activity duration
      const activity = ACTIVITIES.find(a => a.id === savedActivity);
      if (activity) setTimeLeft(activity.duration);
    }
  }, []);

  // Audio initialization and control
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/spiritual_serenity_rain_temple_bell_5min.mp3");
      audioRef.current.loop = false;
      audioRef.current.preload = "auto";
      audioRef.current.onerror = (e) => console.error("Audio load error:", e);
    }

    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;

    // Handle play/pause based on isActive state
    const handleAudio = async () => {
      if (isActive && !isFinished) {
        try {
          // Check if context is suspended (Chrome policy)
          // Just try playing
          await audio.play();
        } catch (error) {
          console.error("Audio autoplay blocked:", error);
          setIsActive(false); // Pause UI if autoplay fails
        }
      } else {
        audio.pause();
      }
    };

    handleAudio();

    return () => {
      audio.pause();
    };
  }, [isActive, isFinished, isMuted, volume]);

  // Handle audio fade out at the end
  useEffect(() => {
    if (timeLeft <= 3 && timeLeft > 0 && isActive && audioRef.current) {
      const fadeInterval = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05);
        } else if (audioRef.current) {
          audioRef.current.pause();
          clearInterval(fadeInterval);
        }
      }, 100);
      return () => clearInterval(fadeInterval);
    }
  }, [timeLeft, isActive]);

  // Timer Logic
  useEffect(() => {
    // Only run if active
    if (isActive && timeLeft > 0) {
      // Clear any existing interval to avoid duplicates
      if (timerRef.current) clearInterval(timerRef.current);
      
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
      trackEvent('reset_completed', { activity: activeActivity, duration: ACTIVITIES.find(a => a.id === activeActivity)?.duration });
      
      if (audioRef.current) {
        // Audio pause handled by fade out logic or isActive effect
        audioRef.current.currentTime = 0;
        audioRef.current.volume = volume; // Reset volume for next time
      }
      if (timerRef.current) clearInterval(timerRef.current);
    } else if (!isActive) {
      // If paused, clear interval
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, volume, activeActivity]);

  // Sync audio time with timer if drift occurs
  useEffect(() => {
    if (audioRef.current && isActive && !audioRef.current.paused) {
      const currentActivity = ACTIVITIES.find(a => a.id === activeActivity);
      if (currentActivity) {
        const expectedAudioTime = currentActivity.duration - timeLeft;
        // Only sync if drift is > 1s and we are not in the fade-out window
        if (timeLeft > 5 && Math.abs(audioRef.current.currentTime - expectedAudioTime) > 1) {
          audioRef.current.currentTime = expectedAudioTime;
        }
      }
    }
  }, [timeLeft, isActive, activeActivity]);

  // Update Transcript based on time elapsed
  useEffect(() => {
    const activity = ACTIVITIES.find(a => a.id === activeActivity);
    if (!activity) return;
    
    const timeElapsed = activity.duration - timeLeft;
    const currentTranscript = TRANSCRIPTS[activeActivity];
    
    // Find the latest transcript segment that matches the elapsed time
    const index = currentTranscript.reduce((acc, segment, idx) => {
      return timeElapsed >= segment.time ? idx : acc;
    }, 0);
    
    setTranscriptIndex(index);
  }, [timeLeft, activeActivity]);

  const toggleTimer = () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    
    // Explicit audio control for click interaction
    if (audioRef.current) {
      if (newActiveState) {
        // This is a direct user interaction, so we can play audio
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.error("Play failed:", e);
                // If play fails on user click, we might need to recreate the audio context or instance
                // But usually this means the file isn't loaded or supported
            });
        }
      } else {
        audioRef.current.pause();
      }
    }
    
    trackEvent(newActiveState ? 'reset_resumed' : 'reset_paused', { timeLeft });
  };

  const resetTimer = () => {
    setIsActive(false);
    const activity = ACTIVITIES.find(a => a.id === activeActivity);
    setTimeLeft(activity?.duration || 300);
    setIsFinished(false);
    setTranscriptIndex(0);
    trackEvent('reset_restarted', { activity: activeActivity });
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = volume;
    }
  };

  const changeActivity = (id: ActivityType) => {
    setActiveActivity(id);
    localStorage.setItem('motherera_reset_activity', id);
    const activity = ACTIVITIES.find(a => a.id === id);
    setTimeLeft(activity?.duration || 300);
    // Don't auto-start on activity change, let user decide
    setIsActive(false); 
    setIsFinished(false);
    setTranscriptIndex(0);
    trackEvent('reset_started', { activity: id });

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause(); // Ensure paused
      audioRef.current.volume = volume;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Progress calculation
  const currentDuration = ACTIVITIES.find(a => a.id === activeActivity)?.duration || 300;
  const progress = ((currentDuration - timeLeft) / currentDuration) * 100;
  const circumference = 2 * Math.PI * 120; // Radius approx 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center relative overflow-hidden px-4 py-8">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-rose-50/50 to-stone-50/50" 
        />
      </div>

      {/* Header */}
      <div className="w-full max-w-5xl mx-auto flex justify-between items-center mb-8 relative z-20">
        <Link href="/emotional-well-being">
          <Button variant="ghost" className="rounded-full text-stone-500 hover:text-stone-900 -ml-4">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </Link>
        <h1 className="text-xl font-serif font-bold text-stone-800 hidden md:block">Five-Minute Reset</h1>
        <div className="w-20"></div> {/* Spacer */}
      </div>

      <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start relative z-10">
        
        {/* Left Column: Timer */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center mb-8">
             {/* Circular Progress SVG */}
             <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 260 260">
                <circle
                  cx="130"
                  cy="130"
                  r="120"
                  fill="none"
                  stroke="#e7e5e4" // stone-200
                  strokeWidth="8"
                />
                <motion.circle
                  cx="130"
                  cy="130"
                  r="120"
                  fill="none"
                  stroke="#e11d48" // rose-600
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.5, ease: "linear" }}
                />
             </svg>
             
             {/* Timer Display */}
             <div className="text-center z-10">
                <span className="text-6xl md:text-8xl font-sans font-light text-stone-800 tabular-nums block leading-none" aria-live="polite">
                  {formatTime(timeLeft)}
                </span>
                {isActive && !isFinished && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-stone-400 text-xs font-bold uppercase tracking-widest mt-4"
                  >
                    Reseting...
                  </motion.p>
                )}
             </div>
          </div>
          
          {/* Completion State */}
          <AnimatePresence>
            {isFinished && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-3xl"
              >
                <div className="text-center p-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Complete — Well Done</h2>
                  <p className="text-stone-600 mb-8">You showed up for yourself today. That matters.</p>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={resetTimer} variant="outline" className="rounded-full">Replay</Button>
                    <Link href="/emotional-well-being">
                      <Button className="rounded-full bg-stone-900 hover:bg-stone-800">Back to Well-Being</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Controls & Transcript */}
        <div className="flex flex-col gap-8">
          
          {/* Activity Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ACTIVITIES.map((activity) => (
              <button
                key={activity.id}
                onClick={() => changeActivity(activity.id)}
                className={cn(
                  "p-3 rounded-xl border text-left transition-all hover:scale-105",
                  activeActivity === activity.id 
                    ? "bg-stone-900 text-white border-stone-900 shadow-md" 
                    : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                )}
              >
                <div className="text-2xl mb-1">{activity.icon}</div>
                <div className="text-xs font-bold truncate">{activity.title}</div>
              </button>
            ))}
          </div>

          {/* Main Controls */}
          <div className="flex gap-4 items-center justify-center lg:justify-start bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
             <Button
                onClick={toggleTimer}
                size="lg"
                className="rounded-full w-16 h-16 bg-stone-900 hover:bg-stone-800 text-white shadow-lg transition-all active:scale-95"
                disabled={isFinished}
              >
                {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 ml-1 fill-current" />}
              </Button>
              
              <Button
                onClick={resetTimer}
                size="lg"
                variant="outline"
                className="rounded-full px-6 h-16 border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 font-medium"
              >
                Reset
              </Button>
              
              <div className="ml-auto flex items-center gap-2 px-4 border-l border-stone-100">
                 <button onClick={() => setIsMuted(!isMuted)} className="text-stone-400 hover:text-stone-900 transition-colors">
                   {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                 </button>
              </div>
          </div>

          {/* Transcript / Guidance */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex-1 min-h-[300px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-stone-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                Guidance
              </h3>
              <button className="text-xs font-medium text-stone-400 hover:text-stone-900 flex items-center gap-1">
                <Download className="w-3 h-3" /> Download Audio
              </button>
            </div>
            
            <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 scroll-smooth">
              {TRANSCRIPTS[activeActivity].map((segment, i) => (
                <div 
                  key={i}
                  className={cn(
                    "p-4 rounded-xl transition-all duration-500",
                    i === transcriptIndex 
                      ? "bg-rose-50 text-stone-900 border border-rose-100 shadow-sm scale-[1.02]" 
                      : "text-stone-400 hover:text-stone-600"
                  )}
                >
                  <p className="leading-relaxed">{segment.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
