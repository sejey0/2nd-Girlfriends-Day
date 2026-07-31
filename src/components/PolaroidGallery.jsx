import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Maximize2 } from 'lucide-react';

export default function PolaroidGallery({ onSelectPhoto }) {
  const photos = [
    {
      id: 1,
      title: 'Morning Coffee Date',
      date: 'Autumn Afternoon',
      src: '/photos/coffee.png',
      caption: 'Warm ceramic cups & quiet conversations in our favorite little café.',
      rotation: '-rotate-2',
    },
    {
      id: 2,
      title: 'Golden Sunset Walk',
      date: 'Golden Hour Memory',
      src: '/photos/sunset.png',
      caption: 'Walking hand in hand as the waves softly touch the shore.',
      rotation: 'rotate-3',
    },
    {
      id: 3,
      title: 'Pastel Bloom Bouquet',
      date: 'Just Because',
      src: '/photos/flowers.png',
      caption: 'Soft pink roses and eucalyptus to remind you how special you are.',
      rotation: '-rotate-1',
    },
    {
      id: 4,
      title: 'Under the Stars',
      date: 'Midnight Stargazing',
      src: '/photos/stargazing.png',
      caption: 'Sitting under a endless sky, dreaming about all our tomorrows.',
      rotation: 'rotate-2',
    },
  ];

  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <span className="glass-pill px-3 py-1 rounded-full text-xs text-sage-300 tracking-wider uppercase inline-flex items-center gap-1.5 border border-sage-300/20">
          <Camera className="w-3.5 h-3.5 text-sage-300" />
          Captured Moments
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-slate-100 mt-2 font-normal">
          Floating Polaroid Gallery
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
          Click any polaroid frame to expand and read the full memory story.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
            className={`cursor-pointer transition-transform duration-300 ${photo.rotation}`}
            onClick={() => onSelectPhoto(photo)}
          >
            {/* Polaroid Frame */}
            <div className="bg-slate-100/95 text-slate-800 rounded-lg p-3 shadow-2xl border border-white/20 relative group overflow-hidden">
              {/* Decorative Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/50 backdrop-blur-sm border border-amber-200/40 rotate-1 z-10 pointer-events-none shadow-sm" />

              {/* Photo Container */}
              <div className="relative aspect-square rounded-sm overflow-hidden bg-slate-900 mb-3">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Hover Overlay with Maximize Icon */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/40">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Caption Area */}
              <div className="px-1 pb-1">
                <h4 className="font-serif font-bold text-slate-800 text-lg leading-snug">
                  {photo.title}
                </h4>
                <p className="text-[11px] font-sans text-slate-500 font-medium mb-1">
                  {photo.date}
                </p>
                <p className="text-xs font-serif italic text-slate-600 line-clamp-2 leading-relaxed">
                  "{photo.caption}"
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
