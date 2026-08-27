// Web Audio API Synthesizer for 100% reliable, zero-latency sound effects & cheerful music

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlayingBgm = false;
    this.bgmTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isPlayingBgm) {
      this.stopBgm();
    }
    return this.isMuted;
  }

  // Play a soft pleasant pop sound
  playPop(pitch = 1) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450 * pitch, now);
      osc.frequency.exponentialRampToValueAtTime(150 * pitch, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio pop error:', e);
    }
  }

  // Play a sparkly chime for UI interactions
  playChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + idx * 0.05;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      });
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  }

  // Play coin / score pickup sound for games
  playPickup() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn('Audio pickup error:', e);
    }
  }

  // Play mistake / collision sound
  playOof() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn('Audio oof error:', e);
    }
  }

  // Play victory fanfare on game win / stage clear
  playFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Little triumphant arpeggio
      const notes = [
        { f: 523.25, d: 0.12 }, // C5
        { f: 659.25, d: 0.12 }, // E5
        { f: 783.99, d: 0.12 }, // G5
        { f: 1046.5, d: 0.35 }  // C6
      ];

      let t = this.ctx.currentTime;
      notes.forEach((n) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, t);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + n.d);
        t += n.d * 0.8;
      });
    } catch (e) {
      console.warn('Audio fanfare error:', e);
    }
  }

  // Soft wind whoosh for blowing candles
  playBlowing() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Noise buffer for whoosh
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch (e) {
      console.warn('Audio blow error:', e);
    }
  }

  // Cheerful Birthday Lo-Fi / Music Box Sequencer
  startBgm() {
    if (this.isMuted || this.isPlayingBgm) return;
    this.init();
    if (!this.ctx) return;

    this.isPlayingBgm = true;

    // Happy Birthday notes (Note frequencies & durations)
    // "Happy Birthday to you, Happy Birthday to you, Happy Birthday dear Subbu, Happy Birthday to you!"
    const melody = [
      { f: 261.63, d: 300 }, // C4 - Hap-
      { f: 261.63, d: 200 }, // C4 - py
      { f: 293.66, d: 450 }, // D4 - birth-
      { f: 261.63, d: 450 }, // C4 - day
      { f: 349.23, d: 450 }, // F4 - to
      { f: 329.63, d: 800 }, // E4 - you~

      { f: 261.63, d: 300 }, // C4 - Hap-
      { f: 261.63, d: 200 }, // C4 - py
      { f: 293.66, d: 450 }, // D4 - birth-
      { f: 261.63, d: 450 }, // C4 - day
      { f: 392.00, d: 450 }, // G4 - to
      { f: 349.23, d: 800 }, // F4 - you~

      { f: 261.63, d: 300 }, // C4 - Hap-
      { f: 261.63, d: 200 }, // C4 - py
      { f: 523.25, d: 450 }, // C5 - birth-
      { f: 440.00, d: 450 }, // A4 - day
      { f: 349.23, d: 450 }, // F4 - dear
      { f: 329.63, d: 450 }, // E4 - Sub-
      { f: 293.66, d: 750 }, // D4 - bu~~

      { f: 466.16, d: 300 }, // Bb4 - Hap-
      { f: 466.16, d: 200 }, // Bb4 - py
      { f: 440.00, d: 450 }, // A4 - birth-
      { f: 349.23, d: 450 }, // F4 - day
      { f: 392.00, d: 450 }, // G4 - to
      { f: 349.23, d: 1000 } // F4 - you~~!
    ];

    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isPlayingBgm || this.isMuted || !this.ctx) return;

      const item = melody[noteIndex];
      const now = this.ctx.currentTime;

      // Soft music box timbre: Sine + soft harmonic
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(item.f * 1.5, now); // Gentle bright chime

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(item.f * 0.75, now); // Warm base

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + item.d / 1000 * 0.9);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + item.d / 1000);
      osc2.stop(now + item.d / 1000);

      noteIndex = (noteIndex + 1) % melody.length;
      const rest = noteIndex === 0 ? 1600 : item.d;
      this.bgmTimer = setTimeout(playNextNote, rest);
    };

    playNextNote();
  }

  stopBgm() {
    this.isPlayingBgm = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleBgm() {
    if (this.isPlayingBgm) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }
}

export const soundManager = new SoundManager();
