import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw, ArrowRight, CheckCircle2, Heart, Award } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { triggerConfetti } from '../../utils/confetti';
import { SUBBU_PHOTOS } from '../../utils/photos';

export const StageMemoryGame = ({ onNextStage, onUnlockBadge, isBadgeUnlocked }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [lastMatchedPhoto, setLastMatchedPhoto] = useState(null);

  // Initialize and shuffle deck
  const initGame = () => {
    // 4 photos x 2 = 8 cards
    const deck = [];
    SUBBU_PHOTOS.forEach((photo) => {
      deck.push({ ...photo, uniqueKey: `${photo.id}-1` });
      deck.push({ ...photo, uniqueKey: `${photo.id}-2` });
    });

    // Shuffle
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedIds([]);
    setMoves(0);
    setIsWon(false);
    setLastMatchedPhoto(null);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index) => {
    // If already 2 flipped, or clicking already flipped / matched card
    if (
      flippedIndices.length >= 2 ||
      flippedIndices.includes(index) ||
      matchedIds.includes(cards[index].id) ||
      isWon
    ) {
      return;
    }

    soundManager.playPop(1.1 + flippedIndices.length * 0.3);
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.id === secondCard.id) {
        // Matched!
        setTimeout(() => {
          soundManager.playPickup();
          triggerConfetti('default');
          const updatedMatched = [...matchedIds, firstCard.id];
          setMatchedIds(updatedMatched);
          setFlippedIndices([]);
          setLastMatchedPhoto(firstCard);

          // Check if all 4 matched
          if (updatedMatched.length === SUBBU_PHOTOS.length) {
            setIsWon(true);
            onUnlockBadge('memory');
            soundManager.playFanfare();
            triggerConfetti('cannon');
          }
        }, 500);
      } else {
        // Not a match -> flip back
        setTimeout(() => {
          soundManager.playOof();
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Header Card */}
      <div className="neu-card rounded-3xl p-5 sm:p-8 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-3 font-fredoka">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>TRIAL 1 • MEMORY PUZZLE</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-800 font-fredoka mb-2">
          Subbu Multiverse Match 🃏
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Flip and match all 4 iconic alter-egos of Subbu. Unlocks the <strong className="text-rose-600">Multiverse Explorer</strong> badge!
        </p>

        {/* Status Bar */}
        <div className="mt-5 flex items-center justify-center gap-4 sm:gap-8">
          <div className="neu-inset px-4 py-2 rounded-xl text-center">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Moves</span>
            <span className="text-lg sm:text-xl font-extrabold text-slate-800 font-fredoka">{moves}</span>
          </div>

          <div className="neu-inset px-4 py-2 rounded-xl text-center">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Matched</span>
            <span className="text-lg sm:text-xl font-extrabold text-rose-600 font-fredoka">
              {matchedIds.length} / {SUBBU_PHOTOS.length}
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              initGame();
            }}
            className="neu-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-rose-600 flex items-center gap-1.5"
            title="Reset Game"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx) || matchedIds.includes(card.id);
          const isMatched = matchedIds.includes(card.id);

          return (
            <motion.div
              key={card.uniqueKey}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleCardClick(idx)}
              className="aspect-[3/4] cursor-pointer relative perspective-[1000px] select-none"
            >
              <div
                className={`w-full h-full duration-500 transition-transform rounded-2xl relative ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Back (Hidden state) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl neu-card flex flex-col items-center justify-center p-4 border border-white/80"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-400 to-amber-300 flex items-center justify-center shadow-inner text-white text-xl font-bold font-fredoka mb-2">
                    ?
                  </div>
                  <span className="text-xs font-semibold text-slate-600 font-fredoka">Subbu Card</span>
                  <span className="text-[10px] text-slate-400 mt-1">Tap to flip ✨</span>
                </div>

                {/* Card Front (Flipped state) */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-2.5 flex flex-col bg-white shadow-xl overflow-hidden border-2 ${
                    isMatched ? 'border-emerald-400 shadow-emerald-200/50' : 'border-rose-300'
                  } [transform:rotateY(180deg)]`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="w-full h-3/4 rounded-xl overflow-hidden relative bg-slate-100">
                    <img
                      src={card.src}
                      alt={card.alt}
                      className="w-full h-full object-cover"
                    />
                    {isMatched && (
                      <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <div className="mt-1.5 text-center flex-1 flex flex-col justify-center">
                    <p className="font-handwriting text-sm sm:text-base font-bold text-slate-800 leading-none truncate">
                      {card.title}
                    </p>
                    <span className="text-[9px] font-semibold text-rose-500 uppercase tracking-tight">
                      {card.vibe}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Last Matched Hilarious Quote Toast */}
      <AnimatePresence>
        {lastMatchedPhoto && !isWon && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel p-4 rounded-2xl border border-rose-200/80 max-w-lg mx-auto text-center"
          >
            <p className="text-xs font-semibold text-rose-700 font-fredoka uppercase tracking-wider mb-1">
              ✨ Persona Unlocked: {lastMatchedPhoto.title}
            </p>
            <p className="font-handwriting text-base sm:text-lg text-slate-800 font-bold">
              {lastMatchedPhoto.funnyQuote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Victory Card when completed */}
      {isWon && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="neu-card rounded-3xl p-6 sm:p-8 text-center bg-gradient-to-br from-white to-rose-50/60 border-2 border-emerald-400 max-w-md mx-auto shadow-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Award className="w-8 h-8 animate-bounce" />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 font-fredoka mb-1">
            Trial 1 Cleared! 🎉
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            You matched all Subbu alter-egos in <strong className="text-rose-600">{moves} moves</strong>!
            Badge unlocked: <strong className="text-emerald-600">Multiverse Explorer</strong> 🌟
          </p>

          <button
            onClick={() => {
              soundManager.playFanfare();
              onNextStage();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-400/40 flex items-center justify-center gap-2 cursor-pointer font-fredoka hover:opacity-95 transition-all"
          >
            <span>Next Trial: Chaotic Vibe Check 👑</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
