import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Heart } from 'lucide-react';

export default function LightboxModal({ photo, onClose }) {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkbg/90 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl glass-panel rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl relative overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 text-slate-300 hover:text-white transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Enlarged Photo Container */}
            <div className="bg-slate-100 rounded-2xl p-3 shadow-xl border border-white/40">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-auto rounded-xl object-cover aspect-square"
              />
            </div>

            {/* Memory Content */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-dustypink-300">
                <Calendar className="w-3.5 h-3.5" />
                <span>{photo.date}</span>
              </div>

              <h3 className="text-3xl font-serif text-slate-100 font-medium leading-tight">
                {photo.title}
              </h3>

              <p className="text-sm font-light text-slate-300 leading-relaxed font-serif italic border-l-2 border-dustypink-400/50 pl-4 py-1">
                "{photo.caption}"
              </p>

              <div className="pt-2 text-xs text-slate-400 font-sans leading-relaxed">
                Every photograph captures a moment, but with you, every single memory becomes a treasure I keep close to my heart forever.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
