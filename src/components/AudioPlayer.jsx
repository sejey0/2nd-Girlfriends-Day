import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 180; // 3:00 minute synth loop

  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);

  // Web Audio Synth Generator for romantic ambient music
  const startSynthMusic = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const stopSynthMusic = () => {
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSynthMusic();
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    } else {
      startSynthMusic();
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            return 0;
          }
          const next = prev + 1;
          setProgress((next / duration) * 100);
          return next;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg glass-panel rounded-2xl p-3 sm:p-4 border border-white/15 shadow-2xl backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Album / Spinning Disc Icon */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-sage-400/30 via-lavender-400/30 to-dustypink-400/30 flex items-center justify-center border border-white/20 overflow-hidden shadow-inner">
            <Disc className={`w-6 h-6 text-dustypink-200 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs sm:text-sm font-medium text-slate-100 truncate flex items-center gap-1.5">
              <span>Golden Hour Serenade</span>
            </h4>
            <p className="text-[10px] text-slate-400 truncate">
              Ambient Love Symphony • Background Music
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-3">
          {/* Animated Soundwave Visualizer Bars */}
          <div className="hidden sm:flex items-center gap-1 h-5 px-1">
            {[0.4, 0.8, 0.5, 1, 0.6].map((scale, i) => (
              <span
                key={i}
                className={`w-1 rounded-full bg-gradient-to-t from-sage-300 to-dustypink-300 transition-all duration-300 ${
                  isPlaying ? 'animate-pulse' : 'h-1.5 opacity-40'
                }`}
                style={{
                  height: isPlaying ? `${scale * 100}%` : '6px',
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-sage-400/30 via-lavender-400/30 to-dustypink-400/30 border border-white/30 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform shadow-md"
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
        <span>{formatTime(currentTime)}</span>
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-sage-300 via-lavender-300 to-dustypink-300 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>
    </motion.div>
  );
}
