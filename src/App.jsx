import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';

import BackgroundGlow from './components/BackgroundGlow';
import LockScreen from './components/LockScreen';
import Header from './components/Header';
import TimeCounter from './components/TimeCounter';
import LoveLetter from './components/LoveLetter';
import FlipCards from './components/FlipCards';
import PolaroidGallery from './components/PolaroidGallery';
import AudioPlayer from './components/AudioPlayer';
import SettingsModal from './components/SettingsModal';
import LightboxModal from './components/LightboxModal';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [partnerName, setPartnerName] = useState(() => localStorage.getItem('gfday_name') || 'Sophia');
  const [anniversaryDate, setAnniversaryDate] = useState(() => localStorage.getItem('gfday_date') || '2023-08-01');
  const [passcode, setPasscode] = useState(() => localStorage.getItem('gfday_pin') || '080123');

  const [selectedPhoto, setSelectedPhoto] = useState(null);
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

        {/* Feature 2 Section 1: Live Time Counter */}
        <TimeCounter anniversaryDate={anniversaryDate} />

        {/* Feature 2 Section 2: Interactive Love Letter */}
        <LoveLetter partnerName={partnerName} />

        {/* Feature 2 Section 3: "Reasons Why" Flip Cards */}
        <FlipCards />

        {/* Feature 2 Section 4: Floating Polaroid Photo Gallery */}
        <PolaroidGallery onSelectPhoto={(photo) => setSelectedPhoto(photo)} />

        {/* Footer Note */}
        <footer className="text-center py-8 text-xs text-slate-400 font-light tracking-wide">
          Crafted with endless love & devotion • Happy Girlfriend's Day
        </footer>

        {/* Feature 2 Section 5: Integrated Audio Player */}
        <AudioPlayer />
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

      <LightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
