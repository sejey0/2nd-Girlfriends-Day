import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Settings, Lock } from 'lucide-react';

export default function Header({ partnerName, onOpenSettings, onLock }) {
  return (
    <header className="relative z-10 w-full pt-10 pb-6 px-4 max-w-5xl mx-auto flex flex-col items-center text-center">
      {/* Main Title */}
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-serif text-slate-100 font-normal tracking-tight leading-tight mb-4"
      >
        Happy 2nd <span className="italic bg-gradient-to-r from-pink-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">Girlfriends Day</span>
      </motion.h1>

      {/* Glowing Gradient Accent Line */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-1 w-28 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-emerald-400 mb-6 shadow-md opacity-80"
      />
      {/* Header Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3"
      >
        <button
          onClick={onOpenSettings}
          className="glass-card px-4 py-2 rounded-xl text-xs text-slate-200 hover:text-white flex items-center gap-2 transition-all hover:bg-white/10 hover:border-purple-300/40"
        >
          <Settings className="w-3.5 h-3.5 text-purple-300 stroke-[1.5]" />
          <span>Customize Dates & PIN</span>
        </button>

        <button
          onClick={onLock}
          className="glass-card px-4 py-2 rounded-xl text-xs text-slate-200 hover:text-white flex items-center gap-2 transition-all hover:bg-white/10 hover:border-pink-300/40"
          title="Relock Vault"
        >
          <Lock className="w-3.5 h-3.5 text-pink-300 stroke-[1.5]" />
          <span>Lock Vault</span>
        </button>
      </motion.div>
    </header>
  );
}

