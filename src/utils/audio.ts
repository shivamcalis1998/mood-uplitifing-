export class AudioManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  playDing() {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      1200,
      this.audioContext.currentTime + 0.1
    );

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.2
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.2);
  }

  playCelebration() {
    if (!this.enabled || !this.audioContext) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      oscillator.frequency.setValueAtTime(freq, this.audioContext!.currentTime + i * 0.15);

      gainNode.gain.setValueAtTime(0.2, this.audioContext!.currentTime + i * 0.15);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext!.currentTime + i * 0.15 + 0.3
      );

      oscillator.start(this.audioContext!.currentTime + i * 0.15);
      oscillator.stop(this.audioContext!.currentTime + i * 0.15 + 0.3);
    });
  }
}

export const audioManager = new AudioManager();
