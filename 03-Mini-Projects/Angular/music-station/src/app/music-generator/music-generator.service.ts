import { Injectable } from "@angular/core";

@Injectable()
export class MusicGeneratorService {
  private _audioContext: AudioContext | null = null;
  private _isPlaying: boolean = false;
  private _tempo: number = 120; // Beats per minute
  private _noteDuration: number = 0.5; // Seconds per note
  private _majorScale: number[] = [
    261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88,
  ]; // C major scale (C4 to B4)

  public start() {
    if (!this._audioContext) {
      this._audioContext = new AudioContext();
    }

    this._isPlaying = true;
    this.playSequence();
  }

  public stop() {
    this._isPlaying = false;

    if (this._audioContext) {
      this._audioContext.close().then(() => {
        this._audioContext = null;
      });
    }
  }

  public setTempo(bpm: number) {
    this._tempo = Math.max(60, Math.min(240, bpm));
    this._noteDuration = 60 / this._tempo / 2; // Quarter note duration
  }

  private playSequence() {
    if (!this._isPlaying || !this._audioContext) return;

    const now = this._audioContext.currentTime;
    const notes = this.generateMelody(8); // Generate 8-note melody

    notes.forEach((frequency, index) => {
      this.playNote(frequency, now + index * this._noteDuration);
    });

    // Schedule next sequence
    setTimeout(
      () => this.playSequence(),
      notes.length * this._noteDuration * 1000,
    );
  }

  private playNote(frequency: number, startTime: number) {
    if (!this._audioContext) return;

    const oscillator = this._audioContext.createOscillator();
    const gainNode = this._audioContext.createGain();

    oscillator.type = "sine"; // Sine wave for smooth sound
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.01); // Attack
    gainNode.gain.linearRampToValueAtTime(0, startTime + this._noteDuration); // Decay

    oscillator.connect(gainNode);
    gainNode.connect(this._audioContext.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + this._noteDuration);
  }

  private generateMelody(length: number): number[] {
    const melody: number[] = [];
    for (let i = 0; i < length; i++) {
      // Randomly select a note from the major scale
      const noteIndex = Math.floor(Math.random() * this._majorScale.length);
      melody.push(this._majorScale[noteIndex]);
    }
    return melody;
  }
}
