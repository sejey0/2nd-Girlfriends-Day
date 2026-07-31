import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Sparkles,
  Heart,
} from "lucide-react";

export default function LoveLetter({ partnerName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const fullLetterText = `Hello mahal, sa pinaka magandang girlfriend sa balat ng lupa, happy girlfriends day po, alam mo po hindi kalang po basta girlfriend e, you're my asawa, you're my partner in life, my partner in everything, kaya laking pasalamat ko at dumating ka sa'kin, basta po nag-iba ako kumapara dati nailabas mo kung sino ako at syempre nilabasan rin ako sayo hehehe, basta mahal lagi mo tatandaan na proud na proud ako sayo sa lahat ng ginagawa mo, you're so brave and strong woman na magiging nanay ng mga anak natin kapag pinagkalooban po tayo, basta idol po kita mahal sa kung ano ang kaya mong mga gawin, daig mo pa nga ako e, kaya masasabe ko mas magaling ka sa'kin, super proud na proud bf here hehe, basta po andito lang ako lagi sa tabi mo, kasama mo sa lahat ng pagdadaanan mo you're my special someone my favorite girl, my baby girl, my everything, hindi ko man kaya ibigay sayo ang lahat ngayon, mahal na mahal naman po kita super pa sa super, kiss at mga yakap po ang nais, hirap mahiwalay sayo, i love you much lovelove ko, muuuaaahhh. 💍💜😚♾️♾️😚💜💍`;

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
      setDisplayedText("");
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
    setDisplayedText("");
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
    <section className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 relative overflow-hidden shadow-2xl glow-tri"
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
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-pink-500 via-purple-500 to-emerald-400 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300 border border-white/40 glow-tri">
                  <Mail className="w-12 h-12 text-white stroke-[1.25]" />
                </div>
                {/* Wax Seal Overlay Badge */}
                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 border-2 border-white/50 flex items-center justify-center text-xs text-white font-serif font-bold shadow-md">
                  💌
                </div>
              </div>

              <button className="glass-button px-6 py-2.5 rounded-full text-xs font-medium text-slate-100 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
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
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                    {isTyping
                      ? "Writing letter..."
                      : isCompleted
                        ? "Read Complete"
                        : "Paused"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!isCompleted && (
                    <button
                      onClick={togglePausePlay}
                      className="p-2 rounded-xl glass-card text-slate-300 hover:text-white hover:border-purple-400/40 transition-colors"
                      title={
                        isTyping ? "Pause Typewriter" : "Resume Typewriter"
                      }
                    >
                      {isTyping ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  <button
                    onClick={restartTypewriter}
                    className="p-2 rounded-xl glass-card text-slate-300 hover:text-white hover:border-pink-400/40 transition-colors"
                    title="Replay Animation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={revealFullText}
                    className="px-3 py-1.5 rounded-xl glass-card text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors hover:border-emerald-400/40"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Show Full</span>
                  </button>
                </div>
              </div>

              {/* Letter Paper Container */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 min-h-[400px] leading-relaxed font-serif text-base sm:text-lg md:text-xl text-slate-100 whitespace-pre-line shadow-inner relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-emerald-400" />
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-5 bg-gradient-to-b from-pink-400 to-emerald-400 ml-1 animate-pulse" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
