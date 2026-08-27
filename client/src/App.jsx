import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DarkIntro } from './components/DarkIntro';
import { StageNavigator, STAGES } from './components/StageNavigator';
import { AudioController } from './components/AudioController';
import { StageWelcome } from './components/stages/StageWelcome';
import { StageMemoryGame } from './components/stages/StageMemoryGame';
import { StageVibeQuiz } from './components/stages/StageVibeQuiz';
import { StageCakeCandles } from './components/stages/StageCakeCandles';
import { StageGrandFinale } from './components/stages/StageGrandFinale';

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentStage, setCurrentStage] = useState('welcome');
  const [unlockedBadges, setUnlockedBadges] = useState([]);

  const handleUnlockBadge = (stageId) => {
    if (!unlockedBadges.includes(stageId)) {
      setUnlockedBadges((prev) => [...prev, stageId]);
    }
  };

  const handleNextStage = () => {
    const stageOrder = ['welcome', 'memory', 'quiz', 'cake', 'finale'];
    const currentIdx = stageOrder.indexOf(currentStage);
    if (currentIdx < stageOrder.length - 1) {
      setCurrentStage(stageOrder[currentIdx + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectStage = (stageId) => {
    setCurrentStage(stageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartExperience = () => {
    setShowIntro(true);
    setCurrentStage('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fcf8f5] text-slate-800 relative selection:bg-pink-300 selection:text-pink-950">
      {/* Stage 0: Dark Cinematic Intro Screen */}
      <AnimatePresence>
        {showIntro && (
          <DarkIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Warm Ambient Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-200/50 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-amber-200/50 rounded-full blur-[110px]" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-[120px]" />
      </div>

      {/* Main Content Area */}
      {!showIntro && (
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Top Sticky Navigator */}
          <StageNavigator
            currentStage={currentStage}
            onSelectStage={handleSelectStage}
            unlockedBadges={unlockedBadges}
          />

          {/* Main Stage Container with AnimatePresence */}
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
            <AnimatePresence mode="wait">
              {currentStage === 'welcome' && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <StageWelcome
                    onNextStage={handleNextStage}
                    unlockedBadges={unlockedBadges}
                    onSelectStage={handleSelectStage}
                  />
                </motion.div>
              )}

              {currentStage === 'memory' && (
                <motion.div
                  key="memory"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <StageMemoryGame
                    onNextStage={handleNextStage}
                    onUnlockBadge={handleUnlockBadge}
                    isBadgeUnlocked={unlockedBadges.includes('memory')}
                  />
                </motion.div>
              )}

              {currentStage === 'quiz' && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <StageVibeQuiz
                    onNextStage={handleNextStage}
                    onUnlockBadge={handleUnlockBadge}
                    isBadgeUnlocked={unlockedBadges.includes('quiz')}
                  />
                </motion.div>
              )}

              {currentStage === 'cake' && (
                <motion.div
                  key="cake"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <StageCakeCandles
                    onNextStage={handleNextStage}
                    onUnlockBadge={handleUnlockBadge}
                    isBadgeUnlocked={unlockedBadges.includes('cake')}
                  />
                </motion.div>
              )}

              {currentStage === 'finale' && (
                <motion.div
                  key="finale"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <StageGrandFinale
                    onRestartExperience={handleRestartExperience}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Floating Audio Controller */}
          <AudioController />
        </div>
      )}
    </div>
  );
}

export default App;
