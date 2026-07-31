import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Settings, Lock } from 'lucide-react';

export default function Header({ partnerName, onOpenSettings, onLock }) {
  return (
    <header className="relative z-10 w-full pt-10 pb-6 px-4 max-w-5xl mx-auto flex flex-col items-center text-center">
      {/* Top Glass Badge */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-pill px-4 py-1.5 rounded-full flex items-center gap-2 mb-6 border border-white/10"
      >
        <span className="w-2 h-2 rounded-full bg-dustypink-400 animate-ping" />
        <span className="text-xs uppercase tracking-widest text-slate-300 font-medium">
          Girlfriend's Day Special Edition
        </span>
      </motion.div>

      {/* Main Title & Subtitle */}
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-serif text-slate-100 font-normal tracking-tight leading-tight mb-4"
      >
        To My Dearest <span className="italic bg-gradient-to-r from-sage-200 via-lavender-200 to-dustypink-300 bg-clip-text text-transparent">{partnerName || 'Love'}</span>
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-slate-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-6"
      >
        A digital sanctuary celebrating our story, timeless memories, and every single second we spend side by side.
      </motion.p>

      {/* Header Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3"
      >
        <button
          onClick={onOpenSettings}
          className="glass-card px-3.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white flex items-center gap-2 transition-all hover:bg-white/10"
        >
          <Settings className="w-3.5 h-3.5 text-lavender-300 stroke-[1.5]" />
          <span>Customize Dates & PIN</span>
        </button>

        <button
          onClick={onLock}
          className="glass-card px-3.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white flex items-center gap-2 transition-all hover:bg-white/10"
          title="Relock Vault"
        >
          <Lock className="w-3.5 h-3.5 text-dustypink-300 stroke-[1.5]" />
          <span>Lock Vault</span>
        </button>
      </motion.div>
    </header>
  );
}
