import React from 'react';

export default function BackgroundGlow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft Pink Ambient Glow Blob */}
      <div 
        className="absolute -top-[12%] -left-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-pink-500/22 blur-[140px] animate-blob-1"
      />
      {/* Vibrant Purple Ambient Glow Blob */}
      <div 
        className="absolute top-[30%] -right-[12%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-purple-500/22 blur-[140px] animate-blob-2"
      />
      {/* Fresh Emerald Green Ambient Glow Blob */}
      <div 
        className="absolute -bottom-[12%] left-[15%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-emerald-400/20 blur-[140px] animate-blob-3"
      />
      {/* Center Tri-Color Blend Mesh */}
      <div 
        className="absolute top-[20%] left-[25%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-emerald-400/10 blur-[120px] animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      {/* Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}

