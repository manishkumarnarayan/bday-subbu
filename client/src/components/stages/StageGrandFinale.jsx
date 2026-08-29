import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, PartyPopper, MessageSquare, Send, RotateCcw, Share2, Music, Check, Star } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { triggerConfetti } from '../../utils/confetti';
import { SUBBU_PHOTOS } from '../../utils/photos';

export const StageGrandFinale = ({ onRestartExperience }) => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [flippedPhotoId, setFlippedPhotoId] = useState(null);
  const [wishesList, setWishesList] = useState([
    { id: 1, author: 'Bestie', text: 'Happiest 19th birthday to the most dramatic, funny, and precious person on the planet! 💖', time: 'Just now' },
    { id: 2, author: 'Meme Squad', text: 'May your year be as legendary as your Joker face makeup and as sweet as boba! 🧋✨', time: '5m ago' }
  ]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newWish, setNewWish] = useState('');
  const [hasCelebrated, setHasCelebrated] = useState(false);

  useEffect(() => {
    // Initial grand fireworks
    triggerConfetti('grand');
    soundManager.playFanfare();
  }, []);

  const handleOpenLetter = () => {
    soundManager.playChime();
    triggerConfetti('hearts');
    setIsLetterOpen(true);
  };

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!newWish.trim()) return;

    soundManager.playPickup();
    triggerConfetti('default');

    const added = {
      id: Date.now(),
      author: newAuthor.trim() || 'Anonymous Admirer',
      text: newWish.trim(),
      time: 'Just now'
    };

    setWishesList([added, ...wishesList]);
    setNewAuthor('');
    setNewWish('');
  };

  const flipPhoto = (id) => {
    soundManager.playPop();
    setFlippedPhotoId(flippedPhotoId === id ? null : id);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-24">
      {/* Grand Title Hero Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="neu-card rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden bg-gradient-to-b from-white via-rose-50/40 to-amber-50/50 border-2 border-rose-200"
      >
        {/* Glow ambient spots */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-rose-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl" />

        {/* Crown & Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-700 text-xs sm:text-sm font-semibold mb-4 border border-rose-200 shadow-sm font-fredoka">
          <PartyPopper className="w-4 h-4 text-rose-500 animate-bounce" />
          <span>OFFICIAL 19TH BIRTHDAY VAULT UNLOCKED</span>
          <PartyPopper className="w-4 h-4 text-rose-500 animate-bounce" />
        </div>

        {/* THE IMMERSIVE GRAND HEADLINE */}
        <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-fredoka leading-tight mb-4">
          <span className="gradient-text-cute drop-shadow-sm">
            Happiest Birthday Nasedi
          </span>{' '}
          🎉
        </h1>

        {/* Subtitle Dedication */}
        <p className="text-slate-700 text-base sm:text-xl font-medium max-w-xl mx-auto leading-relaxed mb-6">
          To our one and only <strong className="text-rose-600 font-bold">Subbu</strong> —
          the nasedi baddie <br /> <strong className="text-amber-600">30.08.2007</strong>! ✨
        </p>

        {/* Quick Celebration Burst Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundManager.playFanfare();
              triggerConfetti('grand');
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold font-fredoka text-sm sm:text-base shadow-lg shadow-rose-400/40 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Launch Fireworks 🎆</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundManager.playChime();
              triggerConfetti('hearts');
            }}
            className="neu-btn px-6 py-3 rounded-2xl text-slate-700 font-bold font-fredoka text-sm sm:text-base flex items-center gap-2 cursor-pointer hover:text-rose-600"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span>Shower Hearts 💖</span>
          </motion.button>
        </div>
      </motion.div>


      {/* The 4 Iconic Photos Polaroid Interactive Album */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-3xl font-bold text-slate-800 font-fredoka">
            The Subbu Lore Scrapbook 📸
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Tap any polaroid to flip and reveal the secret note behind it!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
          {SUBBU_PHOTOS.map((photo) => {
            const isFlipped = flippedPhotoId === photo.id;

            return (
              <div
                key={photo.id}
                onClick={() => flipPhoto(photo.id)}
                className="cursor-pointer perspective-[1000px] h-[340px]"
              >
                <div
                  className={`w-full h-full duration-500 transition-transform rounded-2xl relative ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front: Polaroid Photo */}
                  <div
                    className="absolute inset-0 w-full h-full polaroid flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="aspect-[4/5] w-full rounded-md overflow-hidden bg-slate-100 relative">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/80 backdrop-blur-sm text-slate-800 shadow">
                        {photo.vibe}
                      </span>
                    </div>
                    <div className="text-center mt-2">
                      <p className="font-handwriting text-lg font-bold text-slate-800 leading-tight">
                        {photo.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">Tap to read back note ↩</p>
                    </div>
                  </div>

                  {/* Back: Handwritten Note */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl neu-card p-6 flex flex-col justify-between text-center border-2 border-rose-300 [transform:rotateY(180deg)]"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                      <Star className="w-5 h-5 fill-rose-500 text-rose-500" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-fredoka font-bold text-sm text-rose-600 uppercase tracking-wider">
                        {photo.vibe} Log
                      </h4>
                      <p className="font-handwriting text-lg sm:text-xl text-slate-700 font-bold leading-snug">
                        {photo.funnyQuote}
                      </p>
                      <p className="text-xs text-slate-500">
                        {photo.subtitle}
                      </p>
                    </div>

                    <span className="text-[10px] text-rose-400 font-semibold">
                      Aug 30, 2007 • Subbu Edition
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Replay / Restart Experience */}
      <div className="text-center pt-4">
        <button
          onClick={() => {
            soundManager.playPop();
            onRestartExperience();
          }}
          className="neu-btn px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-rose-600 inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay from the dark intro screen</span>
        </button>
      </div>
    </div>
  );
};
