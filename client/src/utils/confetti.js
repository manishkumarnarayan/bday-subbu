import confetti from 'canvas-confetti';

export const triggerConfetti = (type = 'default') => {
  try {
    if (type === 'cannon') {
      // Dual side cannons
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff6b8b', '#ffb6b9', '#fae3d9', '#bbded6', '#8ac6d1']
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff6b8b', '#ffb6b9', '#fae3d9', '#bbded6', '#8ac6d1']
      });
    } else if (type === 'hearts') {
      const end = Date.now() + 1200;
      const interval = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.5
          },
          shapes: ['circle', 'square'],
          colors: ['#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1', '#c77dff', '#ffbe0b']
        });
      }, 250);
    } else if (type === 'grand') {
      // Huge multi-wave fireworks
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      const fire = (particleRatio, opts) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#ff6b8b', '#f9a8d4', '#fde047']
      });
      fire(0.2, {
        spread: 60,
        colors: ['#a855f7', '#ec4899', '#f43f5e']
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ['#38bdf8', '#fb7185', '#fef08a']
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ['#ff007f', '#7928ca', '#ff0080']
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45
      });
    } else {
      // Default warm burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff8da1', '#ffc6a5', '#ff9a76', '#fcd34d', '#e879f9']
      });
    }
  } catch (e) {
    console.warn('Confetti error:', e);
  }
};
