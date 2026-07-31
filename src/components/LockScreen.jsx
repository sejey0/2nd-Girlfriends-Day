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

  const handleQuickUnlock = () => {
    setPin(correctPasscode);
    playUnlockSound();
    onUnlock();
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkbg/90 backdrop-blur-2xl"
    >
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-sage-300/10 animate-pulse-slow" />
        <div className="w-[340px] h-[340px] rounded-full border border-lavender-300/10 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        animate={isShaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel rounded-3xl p-8 md:p-10 flex flex-col items-center border border-white/10 shadow-2xl relative z-10"
      >
        {/* Header Icon */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sage-400/20 via-lavender-400/20 to-dustypink-400/20 flex items-center justify-center border border-white/20 mb-6 shadow-inner"
        >
          <Lock className="w-8 h-8 text-dustypink-300 stroke-[1.5]" />
        </motion.div>

        {/* Title */}
        <motion.h2 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-serif text-center font-normal tracking-wide text-slate-100 mb-2"
        >
          Love Letter Vault
        </motion.h2>
        
        <p className="text-slate-400 text-xs md:text-sm font-light text-center mb-8 tracking-wider uppercase">
          Enter Passcode To Unlock {partnerName ? `${partnerName}'s` : ''} Message
        </p>

        {/* PIN Indicators (6 slots) */}
        <div className="flex gap-3 mb-6">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isFilled = pin.length > index;
            return (
              <motion.div
                key={index}
                animate={{
                  scale: isFilled ? 1.15 : 1,
                  backgroundColor: isFilled ? 'rgba(212, 154, 154, 0.9)' : 'rgba(255, 255, 255, 0.08)',
                  borderColor: isFilled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: isFilled ? '0 0 15px rgba(212, 154, 154, 0.5)' : 'none'
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
            className="flex items-center gap-1.5 text-dustypink-300 text-xs mb-4"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3.5 w-full max-w-[280px] mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              className="h-14 rounded-2xl glass-card text-lg font-medium text-slate-200 hover:text-white hover:border-sage-300/40 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          <button
            onClick={setShowHint.bind(null, !showHint)}
            className="h-14 rounded-2xl glass-card text-slate-400 hover:text-lavender-300 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center"
            title="Hint"
          >
            <HelpCircle className="w-5 h-5 stroke-[1.5]" />
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="h-14 rounded-2xl glass-card text-lg font-medium text-slate-200 hover:text-white hover:border-sage-300/40 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-14 rounded-2xl glass-card text-slate-400 hover:text-dustypink-300 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-xs font-mono uppercase"
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
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-xs text-slate-300 overflow-hidden mb-4"
            >
              <p className="flex items-center justify-center gap-1.5 text-lavender-300 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-medium">Lock Hint</span>
              </p>
              <p className="text-slate-400 font-light mb-2">
                Our Anniversary Date (MMDDYY)
              </p>
              <p className="font-mono text-dustypink-200 bg-white/5 py-1 px-3 rounded-lg inline-block text-xs border border-white/10 mb-2">
                Default Passcode: <span className="font-bold tracking-widest">{correctPasscode}</span>
              </p>
              <div>
                <button
                  onClick={handleQuickUnlock}
                  className="text-[11px] underline text-sage-300 hover:text-sage-200 transition-colors"
                >
                  Click to Auto-Unlock
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Unlock Footer Button */}
        <button
          onClick={handleQuickUnlock}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors pt-2"
        >
          <Unlock className="w-3.5 h-3.5" />
          <span>Quick Unlock Access</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
