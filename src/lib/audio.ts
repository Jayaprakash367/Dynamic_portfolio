// ─── Sound Synthesis Engine ───
// Pure Web Audio API — zero external audio files

let audioCtx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  gain: number,
  type: OscillatorType = 'sine',
  freqEnd?: number
) {
  if (muted) return;
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const vol = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (freqEnd !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + duration / 1000);
    }

    vol.gain.setValueAtTime(gain, ctx.currentTime);
    vol.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);

    osc.connect(vol);
    vol.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  } catch {
    // AudioContext not available — fail silently
  }
}

export const sound = {
  /** High-frequency soft sine beep for hover interactions */
  hover() {
    playTone(800 + Math.random() * 400, 40, 0.03, 'sine');
  },
  playHover() {
    this.hover();
  },

  /** Crisp tactile pop for click interactions */
  click() {
    playTone(400, 50, 0.08, 'sine', 120);
  },
  playClick() {
    this.click();
  },

  /** Mechanical terminal key click */
  terminalKey() {
    if (muted) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const vol = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'square';
      osc.frequency.setValueAtTime(1800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.02);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2000, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      vol.gain.setValueAtTime(0.04, ctx.currentTime);
      vol.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(filter);
      filter.connect(vol);
      vol.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // fail silently
    }
  },

  /** Harmonious ascending arpeggio chord (C5-E5-G5-C6) */
  success() {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 200, 0.06, 'sine'), i * 80);
    });
  },

  /** Toggle global mute state */
  toggleMute(): boolean {
    muted = !muted;
    return muted;
  },

  /** Check if audio is muted */
  isMuted(): boolean {
    return muted;
  },
};
