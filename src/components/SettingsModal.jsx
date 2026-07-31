import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Calendar, Key, Heart } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  partnerName,
  setPartnerName,
  anniversaryDate,
  setAnniversaryDate,
  passcode,
  setPasscode
}) {
  const [tempName, setTempName] = useState(partnerName);
  const [tempDate, setTempDate] = useState(anniversaryDate);
  const [tempPin, setTempPin] = useState(passcode);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setPartnerName(tempName);
    setAnniversaryDate(tempDate);
    if (tempPin.length === 6) {
      setPasscode(tempPin);
    }
    localStorage.setItem('gfday_name', tempName);
    localStorage.setItem('gfday_date', tempDate);
    localStorage.setItem('gfday_pin', tempPin);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkbg/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-card text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-2xl font-serif text-slate-100 font-medium mb-1">
          Website Settings
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Personalize your romantic dates, partner name, and security PIN code.
        </p>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-dustypink-300" />
              <span>Partner's Name</span>
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-dustypink-300/60 transition-colors"
              placeholder="Enter her name..."
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sage-300" />
              <span>Anniversary Date</span>
            </label>
            <input
              type="date"
              value={tempDate}
              onChange={(e) => setTempDate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-sage-300/60 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-lavender-300" />
              <span>Vault Secret Passcode (6 Digits)</span>
            </label>
            <input
              type="text"
              maxLength={6}
              value={tempPin}
              onChange={(e) => setTempPin(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 text-sm font-mono tracking-widest focus:outline-none focus:border-lavender-300/60 transition-colors"
              placeholder="080123"
              required
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl glass-card text-slate-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 glass-button py-2.5 rounded-xl text-slate-100 font-medium flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
