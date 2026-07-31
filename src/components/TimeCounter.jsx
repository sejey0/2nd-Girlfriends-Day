import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Sparkles } from 'lucide-react';

export default function TimeCounter({ anniversaryDate }) {
  const [timeSpent, setTimeSpent] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(anniversaryDate);
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - start.getTime());

      const secondsTotal = Math.floor(diffMs / 1000);
      const minutesTotal = Math.floor(secondsTotal / 60);
      const hoursTotal = Math.floor(minutesTotal / 60);
      const daysTotal = Math.floor(hoursTotal / 24);

      const years = Math.floor(daysTotal / 365);
      const remainingDays = daysTotal % 365;
      const hours = hoursTotal % 24;
      const minutes = minutesTotal % 60;
      const seconds = secondsTotal % 60;

      setTimeSpent({
        years,
        days: remainingDays,
        hours,
        minutes,
        seconds,
        totalDays: daysTotal,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate]);

  const cards = [
    { label: 'Years', value: timeSpent.years, color: 'from-sage-300/30 to-sage-400/10' },
    { label: 'Days', value: timeSpent.days, color: 'from-lavender-300/30 to-lavender-400/10' },
    { label: 'Hours', value: timeSpent.hours, color: 'from-dustypink-300/30 to-dustypink-400/10' },
    { label: 'Minutes', value: timeSpent.minutes, color: 'from-sage-300/30 to-lavender-400/10' },
    { label: 'Seconds', value: timeSpent.seconds, color: 'from-dustypink-300/30 to-sage-400/10' },
  ];

  const formattedStartDate = new Date(anniversaryDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8">
      {/* Container Glass Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden shadow-2xl"
      >
        {/* Top Label */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sage-400/15 border border-sage-300/20 text-sage-300">
              <Clock className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-slate-100 font-medium tracking-wide">
                Time Spent Together
              </h3>
              <p className="text-xs text-slate-400 font-light">
                Counting every heartbeat since {formattedStartDate}
              </p>
            </div>
          </div>

          <div className="glass-pill px-3 py-1 rounded-full text-xs text-dustypink-300 flex items-center gap-1.5 border border-dustypink-300/20">
            <Sparkles className="w-3 h-3" />
            <span>{timeSpent.totalDays} Total Days of Love</span>
          </div>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden border border-white/10 group hover:border-white/20 transition-all"
            >
              {/* Subtle Ambient Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Value */}
              <span className="text-3xl md:text-4xl font-serif font-bold text-slate-100 tracking-tight relative z-10 mb-1">
                {String(card.value).padStart(2, '0')}
              </span>
              
              {/* Label */}
              <span className="text-[11px] uppercase tracking-widest text-slate-400 font-medium relative z-10">
                {card.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
