type NoteSpec = {
  freq: number;
  start: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
};

class RetroSfxEngine {
  private ctx: AudioContext | null = null;
  private enabled = true;

  setEnabled(value: boolean) {
    this.enabled = value;
  }

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private playSequence(notes: NoteSpec[]) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    for (const note of notes) {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = note.type ?? 'square';
      osc.frequency.setValueAtTime(note.freq, now + note.start);

      const peak = note.gain ?? 0.06;
      gainNode.gain.setValueAtTime(0.0001, now + note.start);
      gainNode.gain.exponentialRampToValueAtTime(peak, now + note.start + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + note.start + note.duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now + note.start);
      osc.stop(now + note.start + note.duration + 0.02);
    }
  }

  playClick() {
    this.playSequence([{ freq: 740, start: 0, duration: 0.045, type: 'square', gain: 0.04 }]);
  }

  playCorrect() {
    this.playSequence([
      { freq: 523.25, start: 0, duration: 0.08, type: 'square', gain: 0.06 },
      { freq: 659.25, start: 0.07, duration: 0.08, type: 'square', gain: 0.06 },
      { freq: 783.99, start: 0.14, duration: 0.09, type: 'square', gain: 0.065 },
      { freq: 1046.5, start: 0.22, duration: 0.16, type: 'square', gain: 0.07 },
    ]);
  }

  playWrong() {
    this.playSequence([
      { freq: 240, start: 0, duration: 0.11, type: 'sawtooth', gain: 0.06 },
      { freq: 165, start: 0.11, duration: 0.2, type: 'sawtooth', gain: 0.065 },
    ]);
  }

  playCoinReset() {
    this.playSequence([
      { freq: 987.77, start: 0, duration: 0.075, type: 'square', gain: 0.055 },
      { freq: 1318.51, start: 0.075, duration: 0.22, type: 'square', gain: 0.065 },
    ]);
  }

  playVictory(isPerfect: boolean) {
    if (isPerfect) {
      this.playSequence([
        { freq: 523.25, start: 0, duration: 0.08, type: 'square', gain: 0.06 },
        { freq: 659.25, start: 0.08, duration: 0.08, type: 'square', gain: 0.06 },
        { freq: 783.99, start: 0.16, duration: 0.08, type: 'square', gain: 0.06 },
        { freq: 1046.5, start: 0.25, duration: 0.12, type: 'square', gain: 0.07 },
        { freq: 783.99, start: 0.39, duration: 0.08, type: 'square', gain: 0.06 },
        { freq: 1046.5, start: 0.48, duration: 0.28, type: 'square', gain: 0.075 },
      ]);
      return;
    }

    this.playSequence([
      { freq: 440, start: 0, duration: 0.09, type: 'square', gain: 0.055 },
      { freq: 554.37, start: 0.09, duration: 0.09, type: 'square', gain: 0.055 },
      { freq: 659.25, start: 0.18, duration: 0.18, type: 'square', gain: 0.065 },
    ]);
  }
}

export const sfx = new RetroSfxEngine();
