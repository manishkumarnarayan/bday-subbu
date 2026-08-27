import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cake, Wind, ArrowRight, Heart, Gift, Award, Flame } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { triggerConfetti } from '../../utils/confetti';

export const StageCakeCandles = ({ onNextStage, onUnlockBadge, isBadgeUnlocked }) => {
  // 19 candles for 19th Birthday
  const totalCandles = 19;
  const [blownCandles, setBlownCandles] = useState(new Set());
  const [userWish, setUserWish] = useState('');
  const [isWishSaved, setIsWishSaved] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState(['🍓', '✨', '🍫']);
  const [isComplete, setIsComplete] = useState(false);

  const availableToppings = [
    { emoji: '🍓', name: 'Fresh Strawberries' },
    { emoji: '🍫', name: 'Choco Pearls' },
    { emoji: '🍒', name: 'Cherries' },
    { emoji: '✨', name: 'Golden Sparkles' },
    { emoji: '🧁', name: 'Macaron Bites' },
    { emoji: '💖', name: 'Love Sprinkles' }
  ];

  const handleBlowSingleCandle = (index) => {
    if (blownCandles.has(index)) return;

    soundManager.playBlowing();
    soundManager.playPop(1.4);

    const nextBlown = new Set(blownCandles);
    nextBlown.add(index);
    setBlownCandles(nextBlown);

    if (nextBlown.size === totalCandles) {
      handleAllBlown();
    }
  };

  const handleBlowAll = () => {
    soundManager.playBlowing();
    const all = new Set([...Array(totalCandles).keys()]);
    setBlownCandles(all);
    handleAllBlown();
  };

  const handleAllBlown = () => {
    setIsComplete(true);
    onUnlockBadge('cake');
    soundManager.playFanfare();
    triggerConfetti('grand');
  };

  const toggleTopping = (emoji) => {
    soundManager.playPop();
    if (selectedToppings.includes(emoji)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== emoji));
    } else {
      setSelectedToppings([...selectedToppings, emoji]);
    }
  };

  const handleSaveWish = (e) => {
    e.preventDefault();
    if (!userWish.trim()) return;
    soundManager.playChime();
    triggerConfetti('hearts');
    setIsWishSaved(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="neu-card rounded-3xl p-5 sm:p-8 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-3 font-fredoka">
          <Cake className="w-3.5 h-3.5 text-pink-600" />
          <span>TRIAL 3 • CANDLE BLOWOUT CEREMONY</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-800 font-fredoka mb-2">
          Subbu's 19 Candles Wish Cake 🎂
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Tap individual candles to blow them out, or make a grand wish and extinguish all 19!
        </p>

        {/* Counter */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="neu-inset px-4 py-1.5 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1.5 font-fredoka">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Candles Blown: {blownCandles.size} / {totalCandles}</span>
          </div>

          {blownCandles.size < totalCandles && (
            <button
              onClick={handleBlowAll}
              className="neu-btn px-4 py-1.5 rounded-full text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 cursor-pointer font-fredoka"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Blow All 19 At Once 💨</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Cake Stage Card */}
      <div className="neu-card rounded-3xl p-6 sm:p-10 relative overflow-hidden bg-gradient-to-b from-rose-50/50 via-white to-pink-50/40 border border-white">
        {/* Floating Toppings on Cake */}
        <div className="flex justify-center items-center gap-2 mb-6 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 font-fredoka mr-1">Cake Toppings:</span>
          {availableToppings.map((top) => {
            const isSelected = selectedToppings.includes(top.emoji);
            return (
              <button
                key={top.emoji}
                onClick={() => toggleTopping(top.emoji)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-sm scale-105'
                    : 'neu-btn text-slate-600'
                }`}
                title={top.name}
              >
                <span>{top.emoji}</span> <span className="hidden sm:inline text-[10px]">{top.name}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Tiered Cake Illustration with 19 interactive candles */}
        <div className="max-w-md mx-auto relative pt-12 pb-4 flex flex-col items-center">
          {/* Top Row Candles (10 candles) */}
          <div className="flex items-end justify-center gap-2 sm:gap-2.5 mb-1 z-20">
            {[...Array(10)].map((_, i) => {
              const isBlown = blownCandles.has(i);
              return (
                <button
                  key={i}
                  onClick={() => handleBlowSingleCandle(i)}
                  className="flex flex-col items-center group cursor-pointer select-none transition-transform hover:scale-125 focus:outline-none"
                  title={isBlown ? "Blown out" : "Tap to blow candle"}
                >
                  {/* Flame or smoke puff */}
                  {!isBlown ? (
                    <div className="candle-flame w-2.5 h-4 sm:w-3 sm:h-5 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full shadow-[0_0_10px_#f59e0b] mb-0.5" />
                  ) : (
                    <div className="w-2 h-3 text-[10px] text-slate-400 opacity-80 animate-ping">
                      💨
                    </div>
                  )}
                  {/* Candle Stick */}
                  <div
                    className={`w-1.5 sm:w-2 h-6 sm:h-8 rounded-t-sm shadow-sm ${
                      i % 2 === 0
                        ? 'bg-gradient-to-b from-rose-300 to-rose-400'
                        : 'bg-gradient-to-b from-amber-300 to-amber-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Tier 1 (Top cake tier) */}
          <div className="w-48 sm:w-56 h-14 sm:h-16 bg-gradient-to-r from-pink-200 via-rose-100 to-amber-100 rounded-2xl shadow-md border-2 border-white relative z-10 flex items-center justify-center overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-b-xl flex justify-around">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-white/90 rounded-full -mt-1 shadow-sm" />
              ))}
            </div>
            {/* Toppings scatter */}
            <div className="flex gap-2 text-base z-10">
              {selectedToppings.slice(0, 3).map((t, idx) => (
                <span key={idx} className="animate-gentle-float">{t}</span>
              ))}
            </div>
          </div>

          {/* Bottom Row Candles (9 candles) on Tier 2 ledge */}
          <div className="flex items-end justify-center gap-3 sm:gap-4 -mt-2 z-20">
            {[...Array(9)].map((_, i) => {
              const candleIdx = i + 10;
              const isBlown = blownCandles.has(candleIdx);
              return (
                <button
                  key={candleIdx}
                  onClick={() => handleBlowSingleCandle(candleIdx)}
                  className="flex flex-col items-center group cursor-pointer select-none transition-transform hover:scale-125 focus:outline-none"
                  title={isBlown ? "Blown out" : "Tap to blow candle"}
                >
                  {!isBlown ? (
                    <div className="candle-flame w-2.5 h-4 sm:w-3 sm:h-5 bg-gradient-to-t from-pink-500 via-amber-400 to-yellow-200 rounded-full shadow-[0_0_10px_#ec4899] mb-0.5" />
                  ) : (
                    <div className="w-2 h-3 text-[10px] text-slate-400 opacity-80 animate-ping">
                      💨
                    </div>
                  )}
                  <div
                    className={`w-1.5 sm:w-2 h-6 sm:h-8 rounded-t-sm shadow-sm ${
                      i % 2 === 0
                        ? 'bg-gradient-to-b from-purple-300 to-purple-400'
                        : 'bg-gradient-to-b from-pink-300 to-pink-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Tier 2 (Bottom cake tier) */}
          <div className="w-64 sm:w-76 h-20 sm:h-24 bg-gradient-to-r from-rose-200 via-pink-100 to-peach-100 rounded-3xl shadow-lg border-2 border-white relative flex flex-col items-center justify-center overflow-hidden">
            {/* Frosting scalloped edge */}
            <div className="absolute top-0 inset-x-0 h-5 bg-white/90 rounded-b-2xl flex justify-around items-center">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 bg-white rounded-full -mt-1 shadow-sm" />
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 text-lg z-10 font-fredoka font-bold text-rose-700">
              <span>✨ 19th Birthday Subbu ✨</span>
            </div>

            {/* Sprinkles on cake base */}
            <div className="flex gap-3 text-sm mt-1">
              {selectedToppings.map((t, idx) => (
                <span key={idx}>{t}</span>
              ))}
            </div>
          </div>

          {/* Plate / Stand */}
          <div className="w-72 sm:w-88 h-4 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-full shadow-lg border border-slate-300 -mt-1" />
        </div>

        {/* Secret Birthday Wish Input Box */}
        <div className="mt-8 max-w-md mx-auto">
          {!isWishSaved ? (
            <form onSubmit={handleSaveWish} className="glass-panel p-4 rounded-2xl border border-rose-200/80 space-y-3">
              <label className="block text-xs sm:text-sm font-bold text-slate-700 font-fredoka text-center">
                ✨ Make a Secret Wish for Subbu's 19th Year ✨
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userWish}
                  onChange={(e) => setUserWish(e.target.value)}
                  placeholder="e.g. Endless happiness, 100/10 selfies & zero stress!"
                  className="flex-1 px-4 py-2.5 rounded-xl neu-inset text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <button
                  type="submit"
                  disabled={!userWish.trim()}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm font-fredoka transition-all ${
                    userWish.trim()
                      ? 'bg-rose-500 text-white shadow-md hover:bg-rose-600 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Seal Wish 💖
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center"
            >
              <span className="text-xs font-bold text-emerald-700 font-fredoka uppercase tracking-wider block mb-1">
                ✓ Wish Sealed in the Birthday Vault!
              </span>
              <p className="font-handwriting text-base sm:text-lg text-slate-800 font-bold">
                "{userWish}"
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Completion & Final Stage Unlocked Banner */}
      {isComplete && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="neu-card rounded-3xl p-6 sm:p-10 text-center max-w-lg mx-auto shadow-2xl bg-gradient-to-br from-white via-rose-50 to-amber-50 border-2 border-rose-400"
        >
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Gift className="w-8 h-8 animate-bounce" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-fredoka mb-1">
            All 3 Trials Cleared! 🏆✨
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            You've unlocked the highest forbidden title and the secret final celebration vault!
          </p>

          <button
            onClick={() => {
              soundManager.playFanfare();
              triggerConfetti('grand');
              onNextStage();
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-rose-500/40 flex items-center justify-center gap-2 cursor-pointer font-fredoka hover:opacity-95 transition-all"
          >
            <span>Open The Grand Finale & Final Message 💌</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
