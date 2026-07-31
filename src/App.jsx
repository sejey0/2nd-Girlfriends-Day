import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

import BackgroundGlow from './components/BackgroundGlow';
import LockScreen from './components/LockScreen';
import Header from './components/Header';
import LoveLetter from './components/LoveLetter';
import AudioPlayer from './components/AudioPlayer';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [partnerName, setPartnerName] = useState(() => localStorage.getItem('gfday_name') || 'Sophia');
  const [anniversaryDate, setAnniversaryDate] = useState(() => localStorage.getItem('gfday_date') || '2023-08-01');
  const [passcode, setPasscode] = useState(() => localStorage.getItem('gfday_pin') || '080123');

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    // Fire subtle pastel confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a7c4b0', '#b8a9c9', '#e8b4b4', '#ffffff'],
    });
  };

  const handleLock = () => {
    setIsUnlocked(false);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden text-slate-100 flex flex-col justify-between pb-24">
      {/* Background Ambient Glows */}
      <BackgroundGlow />

      {/* Feature 1: Lock Screen View */}
      <AnimatePresence>
        {!isUnlocked && (
          <LockScreen
            onUnlock={handleUnlock}
            correctPasscode={passcode}
            partnerName={partnerName}
          />
        )}
      </AnimatePresence>

      {/* Main Website Content (Visible after lock screen is unlocked) */}
      <div className={`transition-all duration-1000 ${isUnlocked ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        {/* Header & Title */}
        <Header
          partnerName={partnerName}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onLock={handleLock}
        />

        {/* Feature Section 1: Interactive Love Letter */}
        <LoveLetter partnerName={partnerName} />

        {/* Feature Section 2: Integrated Audio Player */}
        <AudioPlayer isUnlocked={isUnlocked} />
      </div>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        partnerName={partnerName}
        setPartnerName={setPartnerName}
        anniversaryDate={anniversaryDate}
        setAnniversaryDate={setAnniversaryDate}
        passcode={passcode}
        setPasscode={setPasscode}
      />
    </div>
  );
}

