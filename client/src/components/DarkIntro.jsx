import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, Star, ArrowRight, Heart } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { triggerConfetti } from '../utils/confetti';

export const DarkIntro = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const messages = [
    {
      subtitle: "DEEP SPACE LOG: 30.08.2007",
      title: "In a universe full of ordinary things...",
      desc: "One singularly iconic, fiercely dramatic, and lovable star came into existence.",
      badge: "✨ Celestial Discovery"
    },
    {
      subtitle: "IDENTITY VERIFICATION",
      title: "Official Record: Subechha",
      desc: "Preferred Name: Subbu. Alias: The Master of Mischief, Certified Aesthetic Queen.",
      badge: "🎂 August 30, 2007"
    },
    {
      subtitle: "ENERGY READINGS: 100% UNHINGED",
      title: "Caution: High Levels of Chaos Ahead",
      desc: null,
      badge: "🎉 Birthday Special Edition"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < messages.length - 1) {
          soundManager.playPop(1 + prev * 0.2);
          return prev + 1;
        }
        return prev;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [messages.length]);

  const handleStart = () => {
    soundManager.init();
    soundManager.playFanfare();
    triggerConfetti('default');
    setIsTransitioning(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-4 sm:px-6 bg-[#0c0c12] text-white overflow-hidden transition-all duration-700 ${
        isTransitioning ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background particles & glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[90px]" />

        {/* Twinkling stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: Math.random() * 0.7 + 0.3, scale: Math.random() * 0.8 + 0.4 }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.6, 1.2, 0.6]
            }}
            transition={{
              duration: 2.5 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i * 0.15) % 3
            }}
            className="absolute rounded-full bg-white"
            style={{
              top: `${(i * 37) % 95}%`,
              left: `${(i * 53) % 95}%`,
              width: i % 3 === 0 ? '4px' : '2px',
              height: i % 3 === 0 ? '4px' : '2px',
              boxShadow: '0 0 6px rgba(255,255,255,0.8)'
            }}
          />
        ))}
      </div>

      {/* Main Glassmorphic Dark Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 max-w-lg w-full glass-dark p-6 sm:p-10 rounded-3xl border border-white/10 text-center shadow-2xl backdrop-blur-2xl"
      >
        {/* Step indicator pills */}
        <div className="flex justify-center items-center gap-2 mb-6">
          {messages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundManager.playPop(1 + idx * 0.2);
                setCurrentStep(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentStep
                  ? 'w-8 bg-gradient-to-r from-rose-500 to-amber-400'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Content with animated presence */}
        <div className="min-h-[220px] flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-rose-300 border border-rose-500/30">
                <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
                {messages[currentStep].badge}
              </div>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase">
                {messages[currentStep].subtitle}
              </p>

              {/* Heading */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-amber-200 tracking-tight leading-tight">
                {messages[currentStep].title}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-md mx-auto">
                {messages[currentStep].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {currentStep < messages.length - 1 ? (
            <button
              onClick={() => {
                soundManager.playPop(1.2);
                setCurrentStep((prev) => prev + 1);
              }}
              className="neu-dark-btn w-full sm:w-auto px-6 py-3.5 rounded-2xl text-slate-200 hover:text-white font-medium flex items-center justify-center gap-2 text-sm transition-all group border border-white/10"
            >
              <span>Continue the story</span>
              <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStart}
              className="w-full px-7 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-rose-500/40 hover:shadow-rose-500/60 flex items-center justify-center gap-3 transition-all cursor-pointer font-fredoka tracking-wide border border-rose-300/40 animate-gentle-float"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Enter Subbu's Wonderland ✨</span>
              <Heart className="w-4 h-4 fill-white text-white" />
            </motion.button>
          )}
        </div>

        {/* Quick skip footer */}
        {currentStep < messages.length - 1 && (
          <button
            onClick={handleStart}
            className="mt-4 text-xs text-slate-500 hover:text-rose-300 transition-colors underline underline-offset-4"
          >
            Skip directly to celebration →
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};
