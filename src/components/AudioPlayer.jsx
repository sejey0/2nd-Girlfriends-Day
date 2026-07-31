import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Disc } from 'lucide-react';

export default function AudioPlayer({ isUnlocked }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  // Auto-play music when the vault / message is unlocked
  useEffect(() => {
    if (isUnlocked && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log('Autoplay deferred by browser policy until interaction:', err);
      });
    }
  }, [isUnlocked]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => console.error(err));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg glass-panel rounded-2xl p-3 sm:p-4 border border-white/15 shadow-2xl backdrop-blur-xl glow-tri"
    >
      {/* HTML Audio element */}
      <audio
        ref={audioRef}
        src="music/Aphrodite - The Ridleys (Lyrics).mp3"
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="flex items-center justify-between gap-3">
        {/* Album / Spinning Disc Icon */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-pink-500/30 via-purple-500/30 to-emerald-400/30 flex items-center justify-center border border-white/30 overflow-hidden shadow-inner">
            <Disc className={`w-6 h-6 text-pink-200 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs sm:text-sm font-medium text-slate-100 truncate flex items-center gap-1.5 font-serif">
              <span>Aphrodite</span>
            </h4>
            <p className="text-[10px] text-slate-400 truncate">
              The Ridleys • Background Music
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
                className={`w-1 rounded-full bg-gradient-to-t from-pink-400 via-purple-400 to-emerald-400 transition-all duration-300 ${
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
            onClick={toggleMute}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-pink-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-400 border border-white/40 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform shadow-md"
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

      {/* Interactive Progress Bar */}
      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
        <span>{formatTime(currentTime)}</span>
        <div className="flex-1 relative flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercent}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-400"
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>
    </motion.div>
  );
}

