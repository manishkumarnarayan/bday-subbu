import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, Heart, Trophy, Crown, Cake } from 'lucide-react';
import { soundManager } from '../utils/sound';

export const STAGES = [
  { id: 'welcome', name: 'Hub', icon: Sparkles, badge: 'Celebration' },
  { id: 'memory', name: 'Game 1', icon: Trophy, badge: 'Multiverse Match' },
  { id: 'quiz', name: 'Game 2', icon: Crown, badge: 'Vibe Check' },
  { id: 'cake', name: 'Game 3', icon: Cake, badge: 'Blow Candles' },
  { id: 'finale', name: 'Surprise', icon: Gift, badge: 'The Grand Finale' },
];

export const StageNavigator = ({ currentStage, onSelectStage, unlockedBadges }) => {
  const currentIdx = STAGES.findIndex((s) => s.id === currentStage);

  return (
    <header className="sticky top-3 z-40 max-w-4xl mx-auto px-3 sm:px-4 w-full">
      <nav aria-label="Birthday Stage Navigation" className="glass-panel rounded-2xl p-2 sm:p-2.5 shadow-lg flex items-center justify-between border border-white/80">
        {/* Left Brand Badge */}
        <button
          onClick={() => {
            soundManager.playPop();
            onSelectStage('welcome');
          }}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-white/60 transition-all text-left"
        >
          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-400 to-amber-300 flex items-center justify-center text-white shadow-sm font-fredoka text-sm">
            ✨
          </span>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 font-fredoka flex items-center gap-1">
              Subbu's B'day
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </span>
            <span className="text-[10px] text-slate-500 hidden sm:block font-medium">
              Aug 30 • 19 Years of Awesome
            </span>
          </div>
        </button>

        {/* Center Stage Dots / Stepper */}
        <div className="flex items-center gap-1 sm:gap-2">
          {STAGES.map((stg, idx) => {
            const isCurrent = stg.id === currentStage;
            const isCompleted = unlockedBadges.includes(stg.id);
            const Icon = stg.icon;

            return (
              <button
                key={stg.id}
                onClick={() => {
                  soundManager.playPop(1 + idx * 0.1);
                  onSelectStage(stg.id);
                }}
                className={`relative px-2 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-300/60 scale-105'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100/70 border border-emerald-200/60'
                    : 'text-slate-600 hover:bg-white/70'
                }`}
                title={stg.badge}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'animate-bounce' : ''}`} />
                <span className="hidden md:inline font-fredoka">{stg.name}</span>
                {isCompleted && !isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Counter / Progress Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl neu-inset text-xs font-semibold text-slate-700">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>{unlockedBadges.length} / 3 Badges</span>
        </div>
      </nav>
    </header>
  );
};
