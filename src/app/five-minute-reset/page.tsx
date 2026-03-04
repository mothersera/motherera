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
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
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

  // Handle TTS
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Stop any ongoing speech if inactive
    if (!isActive) {
      window.speechSynthesis.cancel();
      return;
    }

    if (isActive && isVoiceEnabled) {
      // Get current text
      const currentSegments = TRANSCRIPTS[activeActivity];
      if (transcriptIndex < currentSegments.length) {
        const text = currentSegments[transcriptIndex].text;
        
        // Cancel previous
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.volume = 1.0; // Voice always full volume
        utterance.rate = 0.9; // Slightly slower for calm effect
        utterance.pitch = 1.0;
        
        // Try to select a good voice
        const voices = window.speechSynthesis.getVoices();
        // Prefer "Google US English" or "Samantha" or "Microsoft Zira"
        const preferredVoice = voices.find(v => 
          v.name.includes("Google US English") || 
          v.name.includes("Samantha") || 
          v.name.includes("Zira")
        );
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
      }
    }
  }, [transcriptIndex, isActive, isVoiceEnabled, activeActivity]);

  const toggleTimer = () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    
    // Explicit audio control for click interaction
    if (audioRef.current) {
      if (newActiveState) {
        // This is a direct user interaction, so we can play audio
        audioRef.current.play().catch(e => {
            console.error("Play failed:", e);
            // If play fails on user click, we might need to recreate the audio context or instance
            // But usually this means the file isn't loaded or supported
        });
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
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center relative overflow-hidden px-4 py-8 selection:bg-rose-100 selection:text-rose-900 font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-rose-100/40 rounded-full blur-[120px] mix-blend-multiply" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2], 
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-purple-100/30 rounded-full blur-[120px] mix-blend-multiply" 
        />
      </div>

      {/* Header */}
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center mb-12 relative z-20">
        <Link href="/emotional-well-being">
          <Button variant="ghost" className="rounded-full text-stone-500 hover:text-stone-900 hover:bg-white/50 -ml-4 transition-all">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
        </Link>
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/40 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-stone-600">Sanctuary Mode</span>
        </div>
        <div className="w-20"></div> {/* Spacer */}
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column: Timer (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-[340px] h-[340px] md:w-[450px] md:h-[450px] flex items-center justify-center mb-10 group cursor-pointer" onClick={toggleTimer}>
             {/* Glow Effect */}
             <div className={cn(
               "absolute inset-0 rounded-full blur-[60px] transition-all duration-1000",
               isActive ? "bg-rose-200/40 scale-110" : "bg-stone-200/20 scale-100"
             )} />
             
             {/* Glass Container */}
             <div className="absolute inset-4 rounded-full bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)]" />

             {/* Circular Progress SVG */}
             <svg className="absolute inset-0 w-full h-full rotate-[-90deg] p-8 drop-shadow-lg" viewBox="0 0 260 260">
                {/* Track */}
                <circle
                  cx="130"
                  cy="130"
                  r="120"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="2"
                />
                {/* Progress */}
                <motion.circle
                  cx="130"
                  cy="130"
                  r="120"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1, ease: "linear" }}
                  className="filter drop-shadow-[0_0_10px_rgba(225,29,72,0.3)]"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fb7185" /> {/* rose-400 */}
                    <stop offset="100%" stopColor="#e11d48" /> {/* rose-600 */}
                  </linearGradient>
                </defs>
             </svg>
             
             {/* Timer Display */}
             <div className="text-center z-10 relative">
                <span className={cn(
                  "text-7xl md:text-9xl font-serif font-light text-stone-800 tabular-nums block leading-none tracking-tighter transition-all duration-500",
                  isActive ? "scale-105" : "scale-100 opacity-80"
                )}>
                  {formatTime(timeLeft)}
                </span>
                <div className="h-8 flex items-center justify-center mt-2">
                  {isActive && !isFinished ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50/50 border border-rose-100/50"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-rose-900/60 text-[10px] font-bold uppercase tracking-widest">Active</span>
                    </motion.div>
                  ) : (
                    <span className="text-stone-400 text-xs font-medium uppercase tracking-widest">Tap to {timeLeft === 0 ? "Reset" : "Start"}</span>
                  )}
                </div>
             </div>
          </div>
          
          {/* Completion State */}
          <AnimatePresence>
            {isFinished && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-xl"
              >
                <div className="text-center p-12 max-w-md">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-900/5"
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </motion.div>
                  <h2 className="text-4xl font-serif font-medium text-stone-900 mb-4">Well Done.</h2>
                  <p className="text-stone-500 mb-10 text-lg leading-relaxed">You showed up for yourself today. Take this calmness with you.</p>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={resetTimer} variant="outline" className="rounded-full h-12 px-8 border-stone-200 hover:bg-stone-50">Replay</Button>
                    <Link href="/emotional-well-being">
                      <Button className="rounded-full h-12 px-8 bg-stone-900 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all">Done</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Controls & Transcript (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10 h-full justify-center">
          
          {/* Activity Selector */}
          <div>
            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4 pl-1">Select Focus</h3>
            <div className="flex flex-wrap gap-3">
              {ACTIVITIES.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => changeActivity(activity.id)}
                  className={cn(
                    "px-5 py-3 rounded-2xl border transition-all duration-300 flex items-center gap-3",
                    activeActivity === activity.id 
                      ? "bg-stone-900 text-white border-stone-900 shadow-lg scale-105" 
                      : "bg-white/60 backdrop-blur-sm text-stone-600 border-white/60 hover:bg-white hover:border-stone-200 hover:scale-105"
                  )}
                >
                  <span className="text-xl">{activity.icon}</span>
                  <span className="text-sm font-bold">{activity.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Transcript / Guidance */}
          <div className="relative min-h-[300px] flex flex-col justify-center">
             {/* Decorative Quote Mark */}
             <div className="absolute top-0 left-0 text-9xl font-serif text-rose-100/50 -translate-x-4 -translate-y-8 select-none">“</div>
             
             <div className="relative z-10 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={transcriptIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-[120px]"
                  >
                    <p className="text-2xl md:text-3xl font-serif font-medium text-stone-800 leading-relaxed">
                      {TRANSCRIPTS[activeActivity][transcriptIndex]?.text}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Audio Controls (Minimal) */}
                <div className="flex items-center gap-6 pt-8 border-t border-stone-200/30">
                  <button onClick={toggleTimer} className="group flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {isActive ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                    </div>
                    <span className="text-sm font-bold text-stone-900 uppercase tracking-widest">{isActive ? "Pause" : "Start"} Session</span>
                  </button>

                  <div className="h-8 w-px bg-stone-200/50 mx-2" />

                  <button onClick={() => setIsVoiceEnabled(!isVoiceEnabled)} className={cn("flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors", isVoiceEnabled ? "text-stone-900" : "text-stone-300 line-through")}>
                    <div className={cn("w-2 h-2 rounded-full", isVoiceEnabled ? "bg-green-500" : "bg-stone-300")} />
                    Voice Guide
                  </button>

                  <button onClick={() => setIsMuted(!isMuted)} className={cn("flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors", !isMuted ? "text-stone-900" : "text-stone-300 line-through")}>
                     {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                     Ambience
                  </button>

                  <button onClick={resetTimer} className="ml-auto text-stone-400 hover:text-rose-500 transition-colors">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
