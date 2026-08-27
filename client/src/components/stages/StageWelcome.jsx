import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Clock, ArrowRight, Trophy, Star, Gift, Smile, PartyPopper } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { triggerConfetti } from '../../utils/confetti';
import { SUBBU_PHOTOS } from '../../utils/photos';

export const StageWelcome = ({ onNextStage, unlockedBadges, onSelectStage }) => {
  // Birthday: 30 August 2007
  const [timeAlive, setTimeAlive] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const birthDate = new Date('2007-08-30T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - birthDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeAlive({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const questList = [
    {
      id: 'memory',
      title: 'Trial 1: Multiverse Match',
      desc: 'Find all matching alter-egos of Subbu in the memory deck',
      icon: '🃏',
      badge: 'Multiverse Explorer',
      unlocked: unlockedBadges.includes('memory')
    },
    {
      id: 'quiz',
      title: 'Trial 2: The Chaotic Vibe Check',
      desc: 'Answer hilarious trivia about Subbu\'s 10/10 personality',
      icon: '👑',
      badge: 'Certified Diva',
      unlocked: unlockedBadges.includes('quiz')
    },
    {
      id: 'cake',
      title: 'Trial 3: The 19 Candles Ritual',
      desc: 'Make a secret birthday wish and blow out all glowing candles',
      icon: '🎂',
      badge: 'Wish Granted',
      unlocked: unlockedBadges.includes('cake')
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Hero Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="neu-card rounded-3xl p-6 sm:p-10 relative overflow-hidden text-center"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-200/40 to-amber-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-200/40 to-pink-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Top Floating Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 text-rose-700 text-xs sm:text-sm font-semibold mb-4 border border-rose-200/80 shadow-sm font-fredoka">
          <PartyPopper className="w-4 h-4 text-rose-500 animate-bounce" />
          <span>OFFICIAL BIRTHDAY HEADQUARTERS</span>
          <PartyPopper className="w-4 h-4 text-rose-500 animate-bounce" />
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-6xl font-extrabold text-slate-800 tracking-tight font-fredoka mb-3">
          Happy Birthday, <span className="gradient-text-cute">Subbu!</span> ✨
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-6 font-medium">
          Born on <strong className="text-rose-600 font-semibold">30th August 2007</strong> (Subechha in documents, but forever our irreplaceable <strong className="text-pink-600">Subbu</strong>).
          Welcome to your custom digital wonderland!
        </p>

        {/* Live Milestone Time Ticker */}
        <div className="glass-panel rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto border border-white/80 shadow-inner">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Time radiating pure iconic energy</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="neu-inset p-2.5 sm:p-4 rounded-xl">
              <span className="block text-lg sm:text-3xl font-extrabold text-slate-800 font-fredoka">
                {timeAlive.days.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">Days</span>
            </div>
            <div className="neu-inset p-2.5 sm:p-4 rounded-xl">
              <span className="block text-lg sm:text-3xl font-extrabold text-rose-600 font-fredoka">
                {timeAlive.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">Hours</span>
            </div>
            <div className="neu-inset p-2.5 sm:p-4 rounded-xl">
              <span className="block text-lg sm:text-3xl font-extrabold text-pink-600 font-fredoka">
                {timeAlive.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">Mins</span>
            </div>
            <div className="neu-inset p-2.5 sm:p-4 rounded-xl">
              <span className="block text-lg sm:text-3xl font-extrabold text-amber-600 font-fredoka">
                {timeAlive.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">Secs</span>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              soundManager.playFanfare();
              triggerConfetti('cannon');
              onNextStage();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-base sm:text-lg shadow-lg shadow-rose-500/30 flex items-center justify-center gap-3 cursor-pointer font-fredoka transition-all"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>Start Mini-Game 1: Multiverse Match</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <button
            onClick={() => {
              soundManager.playPop();
              triggerConfetti('hearts');
            }}
            className="neu-btn px-6 py-4 rounded-2xl text-slate-700 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            {/* <span>Send Love & Confetti</span> */}
          </button>
        </div>
      </motion.div>

      {/* Meet the 4 Personas Gallery Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-fredoka">
              The 4 Legendary Personas 📸
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {SUBBU_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => {
                soundManager.playPop(1 + index * 0.15);
              }}
              className="polaroid cursor-pointer group"
            >
              <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-slate-100 mb-2 relative">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/60 text-white backdrop-blur-sm">
                  {photo.vibe}
                </span>
              </div>
              <p className="font-handwriting text-base sm:text-lg text-slate-800 font-bold leading-tight line-clamp-1">
                {photo.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quest Road Map Cards */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-fredoka px-2">
          Subbu's Birthday Quest Road 🗺️
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {questList.map((quest) => (
            <div
              key={quest.id}
              className={`neu-card p-5 rounded-2xl flex items-start gap-4 transition-all ${
                quest.unlocked ? 'border-emerald-300/80 bg-emerald-50/30' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-2xl flex-shrink-0">
                {quest.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base font-fredoka">
                    {quest.title}
                  </h3>
                  {quest.unlocked ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                      ✓ Cleared
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                      Ready
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  {quest.desc}
                </p>
                <button
                  onClick={() => {
                    soundManager.playPop();
                    onSelectStage(quest.id);
                  }}
                  className="neu-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5"
                >
                  <span>Play This Trial</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
