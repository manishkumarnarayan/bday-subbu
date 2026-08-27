import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';

export const AudioController = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted) {
        soundManager.init();
        setHasInteracted(true);
      }
    };
    window.addEventListener('click', handleFirstClick, { once: true });
    return () => window.removeEventListener('click', handleFirstClick);
  }, [hasInteracted]);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (muted) {
      setIsPlayingMusic(false);
    }
  };

  const handleToggleMusic = () => {
    soundManager.init();
    const playing = soundManager.toggleBgm();
    setIsPlayingMusic(playing);
    if (playing && isMuted) {
      setIsMuted(false);
      soundManager.isMuted = false;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2">
      {/* Music Toggle */}
      <button
        onClick={handleToggleMusic}
        title={isPlayingMusic ? "Pause Bday Melody" : "Play Cheerful Bday Melody"}
        className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
          isPlayingMusic
            ? 'bg-rose-500 text-white shadow-lg shadow-rose-300/50 scale-105 animate-pulse'
            : 'glass-pill text-rose-700 hover:bg-white/90 hover:scale-105'
        }`}
      >
        <Music className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isPlayingMusic ? 'animate-spin' : ''}`} />
        <span className="hidden sm:inline font-fredoka">
          {isPlayingMusic ? 'Birthday BGM 🎶' : 'Play Music 🎵'}
        </span>
        {isPlayingMusic && (
          <span className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-2.5 bg-white rounded-full animate-bounce"></span>
          </span>
        )}
      </button>

      {/* Mute/Unmute SFX Toggle */}
      <button
        onClick={handleToggleMute}
        title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
        className="p-2 sm:p-2.5 rounded-full glass-pill text-slate-700 hover:text-rose-600 hover:scale-110 active:scale-95 transition-all shadow-md"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
        ) : (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 animate-pulse" />
        )}
      </button>
    </div>
  );
};
