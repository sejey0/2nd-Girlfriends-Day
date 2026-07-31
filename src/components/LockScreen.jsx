import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, HelpCircle, KeyRound, Sparkles, AlertCircle } from 'lucide-react';

export default function LockScreen({ onUnlock, correctPasscode, partnerName }) {
  const [pin, setPin] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleKeyPress = (num) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      setErrorMsg('');

      if (newPin.length === 6) {
        verifyPin(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const verifyPin = (enteredPin) => {
    if (enteredPin === correctPasscode) {
      // Play audio chime via Web Audio API
      playUnlockSound();
      onUnlock();
    } else {
      setIsShaking(true);
      setErrorMsg('Incorrect passcode. Try again!');
      setTimeout(() => {
        setIsShaking(false);
        setPin('');
      }, 600);
    }
  };

  const playUnlockSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.3); // C6

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // Audio context fallbacks
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkbg/90 backdrop-blur-2xl overflow-hidden"
    >
      {/* Rich Background Decorative Layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Central Radial Spotlight */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-radial from-purple-500/15 via-pink-500/10 to-transparent blur-2xl" />

        {/* Concentric Rotating Orbit Rings */}
        <div className="w-[640px] h-[640px] rounded-full border border-dashed border-pink-400/20 animate-spin" style={{ animationDuration: '40s' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-purple-400/25 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
        <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-emerald-400/20 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute w-[240px] h-[240px] rounded-full border border-pink-300/20 animate-pulse-slow" />

        {/* Floating Gradient Orbs */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-15, 15, -15], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-12 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [15, -15, 15], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-12 right-12 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [-15, 15, -15], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-60 h-60 bg-emerald-400/15 rounded-full blur-3xl"
        />

        {/* Floating Sparkle Particles */}
        {[
          { top: '15%', left: '20%', size: 'w-2 h-2', color: 'bg-pink-300', delay: 0 },
          { top: '25%', right: '18%', size: 'w-3 h-3', color: 'bg-purple-300', delay: 1 },
          { bottom: '20%', left: '25%', size: 'w-2.5 h-2.5', color: 'bg-emerald-300', delay: 2 },
          { bottom: '30%', right: '22%', size: 'w-2 h-2', color: 'bg-pink-200', delay: 1.5 },
          { top: '65%', left: '15%', size: 'w-3 h-3', color: 'bg-purple-200', delay: 2.5 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-12, 12, -12],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
            style={{ top: particle.top, left: particle.left, right: particle.right, bottom: particle.bottom }}
            className={`absolute rounded-full ${particle.size} ${particle.color} shadow-lg blur-[0.5px]`}
          />
        ))}
      </div>

      <motion.div
        animate={isShaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel rounded-3xl p-8 md:p-10 flex flex-col items-center border border-white/20 shadow-2xl relative z-10 glow-tri overflow-hidden"
      >
        {/* Top Decorative Glowing Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-400" />

        {/* Top Security Badge */}
        <div className="glass-pill px-3.5 py-1 rounded-full flex items-center gap-1.5 mb-6 border border-pink-400/30 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-pink-200 font-medium">Secret Love Vault</span>
        </div>

        {/* Header Icon */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500/30 via-purple-500/30 to-emerald-400/30 flex items-center justify-center border border-white/30 mb-5 shadow-inner glow-pink relative"
        >
          <Lock className="w-8 h-8 text-pink-200 stroke-[1.5]" />
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-ping" />
        </motion.div>

        {/* Title */}
        <motion.h2 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-serif text-center font-normal tracking-wide text-tri-gradient mb-2"
        >
          Love Letter Vault
        </motion.h2>
        
        <p className="text-slate-400 text-xs md:text-sm font-light text-center mb-8 tracking-wider uppercase">
          Enter Passcode To Unlock {partnerName ? `${partnerName}'s` : ''} Message
        </p>

        {/* PIN Indicators (6 slots) */}
        <div className="flex gap-3.5 mb-7">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isFilled = pin.length > index;
            const fillGradients = [
              'linear-gradient(135deg, #f472b6, #ec4899)',
              'linear-gradient(135deg, #e879f9, #c084fc)',
              'linear-gradient(135deg, #a855f7, #8b5cf6)',
              'linear-gradient(135deg, #6366f1, #3b82f6)',
              'linear-gradient(135deg, #34d399, #10b981)',
              'linear-gradient(135deg, #f472b6, #34d399)'
            ];
            return (
              <motion.div
                key={index}
                animate={{
                  scale: isFilled ? 1.25 : 1,
                  background: isFilled ? fillGradients[index % fillGradients.length] : 'rgba(255, 255, 255, 0.08)',
                  borderColor: isFilled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: isFilled ? '0 0 16px rgba(244, 114, 182, 0.7)' : 'none'
                }}
                className="w-4 h-4 rounded-full border transition-all duration-200"
              />
            );
          })}
        </div>

        {/* Error Message */}
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-pink-300 text-xs mb-4 bg-pink-500/10 border border-pink-500/20 py-1.5 px-3 rounded-full"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3.5 w-full max-w-[290px] mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              className="h-14 rounded-2xl glass-card text-lg font-medium text-slate-200 hover:text-white hover:border-purple-300/50 hover:bg-white/15 active:scale-95 transition-all flex items-center justify-center shadow-sm"
            >
              {num}
            </button>
          ))}
          <button
            onClick={setShowHint.bind(null, !showHint)}
            className="h-14 rounded-2xl glass-card text-purple-300 hover:text-white hover:border-purple-300/40 hover:bg-white/15 active:scale-95 transition-all flex items-center justify-center"
            title="Hint"
          >
            <HelpCircle className="w-5 h-5 stroke-[1.5]" />
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="h-14 rounded-2xl glass-card text-lg font-medium text-slate-200 hover:text-white hover:border-emerald-300/50 hover:bg-white/15 active:scale-95 transition-all flex items-center justify-center shadow-sm"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-14 rounded-2xl glass-card text-pink-300 hover:text-white hover:border-pink-300/40 hover:bg-white/15 active:scale-95 transition-all flex items-center justify-center text-xs font-mono uppercase tracking-wider"
          >
            Delete
          </button>
        </div>

        {/* Hint Accordion */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-xs text-slate-300 overflow-hidden mb-2"
            >
              <p className="flex items-center justify-center gap-1.5 text-purple-300 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-medium">Vault Hint</span>
              </p>
              <p className="text-slate-400 font-light mb-2">
                Our Anniversary Date (MMDDYY)
              </p>
              <p className="font-mono text-pink-200 bg-white/5 py-1 px-3 rounded-lg inline-block text-xs border border-white/10">
                Default Passcode: <span className="font-bold tracking-widest">{correctPasscode}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Glowing Accent Line */}
        <div className="w-24 h-0.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-emerald-400 opacity-60 mt-2" />
      </motion.div>
    </motion.div>
  );
}
