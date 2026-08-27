import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Crown, CheckCircle, XCircle, ArrowRight, Award, HelpCircle, Heart } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { triggerConfetti } from '../../utils/confetti';
import { imgJoker, imgSunGoddess, imgBaby } from '../../utils/photos';

export const StageVibeQuiz = ({ onNextStage, onUnlockBadge, isBadgeUnlocked }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      image: imgBaby,
      imageAlt: "Baby Subbu pulling ears",
      imageCaption: "Exhibit A: The origin of mischief",
      question: "What cosmic milestone happened on August 30, 2007 (dd-mm-yyyy)?",
      options: [
        { text: "The universe gained a certified menace & aesthetic queen", isCorrect: true },
        { text: "Global drama levels plummeted to zero", isCorrect: false },
        { text: "A very calm and quiet baby was born", isCorrect: false },
      ],
      explanation: "Since day one, she was already pulling ears and sticking her tongue out! 😜"
    },
    {
      id: 2,
      image: null,
      question: "Subbu ka favourite nasha kya hai?",
      options: [
        { text: "Ganja", isCorrect: false },
        { text: "Bhang", isCorrect: false },
        { text: "whisky", isCorrect: false },
      ],
      explanation: "It's galat ladko se attach hona 😔"
    },
    {
      id: 3,
      image: imgJoker,
      imageAlt: "Subbu Joker Makeup",
      imageCaption: "Exhibit B: Certified Nasedi Mode",
      question: "Which thought does runs in subbu's brain at 3AM?",
      options: [
        { text: "Raatiya ke 3 baje make-up ke sath bakchodi krna ", isCorrect: true },
        { text: "Planning an early 5:00 AM jog and healthy salad breakfast", isCorrect: false },
        { text: "Wondering why anyone would ever take life too seriously", isCorrect: false },
      ],
      explanation: "Bakchodi rukni nhi chahiye 🃏✨"
    },
    {
      id: 4,
      image: imgSunGoddess,
      imageAlt: "Subbu Sun Art Face Paint",
      imageCaption: "Exhibit C: Main Character Artistry",
      question: "When doing artistic sun face paint and golden eyeliner, the goal is:",
      options: [
        { text: "Look like a celestial goddess, take 300 photos, slay the universe", isCorrect: true },
        { text: "Take one blurry selfie and call it a day", isCorrect: false },
        { text: "Be subtle and blend into the background", isCorrect: false },
      ],
      explanation: "☀️👑"
    }
  ];

  const currentQ = questions[currentQIndex];

  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted) return;
    soundManager.playPop(1.2);
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = currentQ.options[selectedOption].isCorrect;

    if (isCorrect) {
      soundManager.playPickup();
      triggerConfetti('default');
      setScore((s) => s + 1);
    } else {
      soundManager.playOof();
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      soundManager.playPop();
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizComplete(true);
      onUnlockBadge('quiz');
      soundManager.playFanfare();
      triggerConfetti('cannon');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header Card */}
      <div className="neu-card rounded-3xl p-5 sm:p-8 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-3 font-fredoka">
          <Crown className="w-3.5 h-3.5 text-purple-600" />
          <span>TRIAL 2 • PERSONALITY & LORE</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-800 font-fredoka mb-2">
          The Subbu Vibe & Nasedi Check 👑
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Prove your mastery of Subbu's unmatched charisma, habits, and August 30 lore!
        </p>

        {/* Progress bar */}
        <div className="mt-4 max-w-xs mx-auto">
          <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1 font-fredoka">
            <span>Question {currentQIndex + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full h-2 rounded-full neu-inset overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-rose-500 transition-all duration-300 rounded-full"
              style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      {!isQuizComplete ? (
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="neu-card rounded-3xl p-6 sm:p-8 space-y-6"
        >
          {/* Question Text */}
          <h2 className="text-lg sm:text-2xl font-bold text-slate-800 font-fredoka text-center leading-snug">
            "{currentQ.question}"
          </h2>

          {/* Optional Photo Attachment */}
          {currentQ.image && (
            <div className="max-w-xs mx-auto text-center">
              <div className="polaroid">
                <div className="aspect-[4/3] sm:aspect-square w-full rounded-md overflow-hidden bg-slate-100 mb-2">
                  <img
                    src={currentQ.image}
                    alt={currentQ.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-handwriting text-base font-bold text-slate-700">
                  {currentQ.imageCaption}
                </p>
              </div>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 max-w-xl mx-auto">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'neu-btn hover:border-purple-300';

              if (isAnswerSubmitted) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-800 shadow-md';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-800 shadow-md';
                } else {
                  btnStyle = 'opacity-50 neu-flat';
                }
              } else if (isSelected) {
                btnStyle = 'border-2 border-purple-500 bg-purple-50/80 text-purple-900 shadow-md';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl text-left font-medium text-sm sm:text-base flex items-center justify-between transition-all duration-200 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl neu-inset flex items-center justify-center font-bold text-xs font-fredoka text-slate-600">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt.text}</span>
                  </div>

                  {isAnswerSubmitted && opt.isCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswerSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-purple-50/90 border border-purple-200 text-center max-w-xl mx-auto"
            >
              <p className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-0.5 font-fredoka">
                The Truth:
              </p>
              <p className="text-sm text-slate-700 font-medium">
                {currentQ.explanation}
              </p>
            </motion.div>
          )}

          {/* Action button */}
          <div className="text-center pt-2">
            {!isAnswerSubmitted ? (
              <button
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className={`px-8 py-3.5 rounded-2xl font-bold font-fredoka text-base shadow-lg transition-all ${
                  selectedOption !== null
                    ? 'bg-gradient-to-r from-purple-600 to-rose-500 text-white shadow-purple-400/30 cursor-pointer hover:opacity-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Confirm Answer ✨
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold font-fredoka text-base shadow-lg shadow-purple-500/30 cursor-pointer hover:opacity-95 flex items-center gap-2 mx-auto"
              >
                <span>{currentQIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        /* Quiz Complete Screen */
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="neu-card rounded-3xl p-8 sm:p-10 text-center max-w-md mx-auto shadow-2xl bg-gradient-to-br from-white to-purple-50/50 border-2 border-purple-300"
        >
          <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Award className="w-8 h-8 animate-bounce" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-fredoka mb-1">
            Vibe Check Passed! 👑✨
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            You scored <strong className="text-purple-600">{score}/{questions.length}</strong>! Badge unlocked: <strong className="text-purple-600">Certified Diva</strong>!
          </p>

          <button
            onClick={() => {
              soundManager.playFanfare();
              onNextStage();
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 text-white font-bold text-base shadow-xl shadow-purple-500/30 flex items-center justify-center gap-2 cursor-pointer font-fredoka hover:opacity-95 transition-all"
          >
            <span>Next: Blow Out 19 Birthday Candles 🎂</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
