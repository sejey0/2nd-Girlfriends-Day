import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sun, Heart, Smile, Compass, Feather, ShieldCheck, Star } from 'lucide-react';

export default function FlipCards() {
  const [flippedIds, setFlippedIds] = useState({});

  const reasons = [
    {
      id: 1,
      title: 'Your Kindness',
      icon: Heart,
      color: 'text-dustypink-300',
      message: 'The way you treat everyone with warmth and pure empathy makes my heart overflow every day.',
    },
    {
      id: 2,
      title: 'Your Radiant Smile',
      icon: Sun,
      color: 'text-sage-300',
      message: 'Whenever you smile, the room lights up. It instantly cures my hardest days.',
    },
    {
      id: 3,
      title: 'Unfiltered Laughter',
      icon: Smile,
      color: 'text-lavender-300',
      message: 'Our inside jokes and the sound of your genuine laugh are my absolute favorite sounds.',
    },
    {
      id: 4,
      title: 'My Safe Haven',
      icon: ShieldCheck,
      color: 'text-dustypink-300',
      message: 'Being with you feels like home—a place of total comfort, peace, and acceptance.',
    },
    {
      id: 5,
      title: 'Endless Adventures',
      icon: Compass,
      color: 'text-sage-300',
      message: 'From quiet coffee dates to spontaneous road trips, every moment with you is an adventure.',
    },
    {
      id: 6,
      title: 'Gentle Soul',
      icon: Feather,
      color: 'text-lavender-300',
      message: 'Your quiet strength and gentle wisdom guide us through everything seamlessly.',
    },
  ];

  const handleFlip = (id) => {
    setFlippedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <span className="glass-pill px-3 py-1 rounded-full text-xs text-lavender-300 tracking-wider uppercase inline-flex items-center gap-1.5 border border-lavender-300/20">
          <Star className="w-3 h-3 text-lavender-300" />
          Click Cards To Reveal
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-slate-100 mt-2 font-normal">
          Reasons Why I Love You
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
          A few of the endless reasons you mean the world to me.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          const isFlipped = !!flippedIds[reason.id];

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-52 perspective-1000 cursor-pointer group"
              onClick={() => handleFlip(reason.id)}
            >
              <div 
                className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-white/10 group-hover:border-white/20 backface-hidden shadow-lg">
                  <div className={`p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-3 ${reason.color}`}>
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-serif text-slate-100 font-medium mb-1">
                    {reason.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-light tracking-wide uppercase mt-2">
                    Click to flip
                  </span>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full glass-card bg-slate-900/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-dustypink-300/30 rotate-y-180 backface-hidden shadow-xl">
                  <Sparkles className={`w-4 h-4 mb-2 ${reason.color}`} />
                  <p className="text-sm font-light text-slate-200 leading-relaxed font-serif">
                    "{reason.message}"
                  </p>
                  <span className="text-[10px] text-slate-400 tracking-widest uppercase mt-3">
                    Tap to turn back
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
