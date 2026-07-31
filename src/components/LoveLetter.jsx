import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Play, Pause, RotateCcw, Eye, Sparkles, Heart } from 'lucide-react';

export default function LoveLetter({ partnerName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const fullLetterText = `My Dearest ${partnerName || 'Love'},

Happy Girlfriend's Day! 

From the very first moment our paths crossed, my world felt warmer, brighter, and infinitely more meaningful. You have a way of bringing peace into my busy days and laughter into quiet moments.

Thank you for being my anchor, my favorite conversation, and my gentlest comfort. Every shared smile, late-night talks, and simple moments together have built a tapestry of memories I cherish deeply.

On this special day, I want you to know how immensely grateful I am for your presence in my life. You inspire me to be better every single day, and loving you is the easiest, sweetest thing I have ever known.

Forever & Always,
Yours.`;

  const typingIndex = useRef(0);
  const timerRef = useRef(null);

  const startTypewriter = () => {
    setIsTyping(true);
    timerRef.current = setInterval(() => {
      if (typingIndex.current < fullLetterText.length) {
        setDisplayedText(fullLetterText.slice(0, typingIndex.current + 1));
        typingIndex.current += 1;
      } else {
        clearInterval(timerRef.current);
        setIsTyping(false);
        setIsCompleted(true);
      }
    }, 28);
  };

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      typingIndex.current = 0;
      setDisplayedText('');
      setIsCompleted(false);
      setTimeout(() => {
        startTypewriter();
      }, 500);
    }
  };

  const togglePausePlay = () => {
    if (isTyping) {
      clearInterval(timerRef.current);
      setIsTyping(false);
    } else if (!isCompleted) {
      startTypewriter();
    }
  };

  const restartTypewriter = () => {
    clearInterval(timerRef.current);
    typingIndex.current = 0;
    setDisplayedText('');
    setIsCompleted(false);
    startTypewriter();
  };

  const revealFullText = () => {
    clearInterval(timerRef.current);
    setDisplayedText(fullLetterText);
    setIsTyping(false);
    setIsCompleted(true);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <span className="glass-pill px-3 py-1 rounded-full text-xs text-dustypink-300 tracking-wider uppercase inline-flex items-center gap-1.5 border border-dustypink-300/20">
          <Heart className="w-3 h-3 fill-dustypink-300" />
          A Personal Message
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-slate-100 mt-2 font-normal">
          Interactive Love Letter
        </h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Envelope View */
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-12 px-4 text-center cursor-pointer group"
              onClick={handleOpenEnvelope}
            >
              {/* Wax Seal Visual */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-dustypink-600 via-dustypink-500 to-lavender-500 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300 border border-white/30 glow-pink">
                  <Mail className="w-12 h-12 text-white stroke-[1.25]" />
                </div>
                {/* Wax Seal Overlay Badge */}
                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-dustypink-700 border-2 border-white/40 flex items-center justify-center text-xs text-white font-serif font-bold shadow-md">
                  💌
                </div>
              </div>

              <h3 className="text-2xl font-serif text-slate-100 font-medium mb-2 group-hover:text-dustypink-200 transition-colors">
                Unseal Love Letter
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light max-w-sm mb-6">
                Click to break the wax seal and reveal your handwritten note.
              </p>

              <button className="glass-button px-6 py-2.5 rounded-full text-xs font-medium text-slate-100 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-dustypink-300" />
                <span>Read Letter</span>
              </button>
            </motion.div>
          ) : (
            /* Open Letter View with Typewriter */
            <motion.div
              key="open-letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Top Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-dustypink-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                    {isTyping ? 'Writing letter...' : isCompleted ? 'Read Complete' : 'Paused'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!isCompleted && (
                    <button
                      onClick={togglePausePlay}
                      className="p-2 rounded-xl glass-card text-slate-300 hover:text-white transition-colors"
                      title={isTyping ? 'Pause Typewriter' : 'Resume Typewriter'}
                    >
                      {isTyping ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  )}
                  <button
                    onClick={restartTypewriter}
                    className="p-2 rounded-xl glass-card text-slate-300 hover:text-white transition-colors"
                    title="Replay Animation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={revealFullText}
                    className="px-3 py-1.5 rounded-xl glass-card text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-sage-300" />
                    <span>Show Full</span>
                  </button>
                </div>
              </div>

              {/* Letter Paper Container */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 min-h-[300px] leading-relaxed font-serif text-lg sm:text-xl text-slate-200 whitespace-pre-line shadow-inner">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-5 bg-dustypink-300 ml-1 animate-pulse" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
