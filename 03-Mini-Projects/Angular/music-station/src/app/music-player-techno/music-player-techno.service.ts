import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MusicPlayerTechnoService {
  private _audioContext: AudioContext | null = null;
  private _isPlaying: boolean = false;
  private _currentTrack: string | null = null;
  private _stopTimeout: any = null;

  // Define five techno tracks with unique characteristics
  private _tracks: {
    [key: string]: { tempo: number; pattern: [number, string, number][] };
  } = {
    "Techno Track 1": {
      tempo: 120,
      pattern: [
        [0, "kick", 100],
        [0.5, "hihat", 0],
        [1, "kick", 100],
        [1.5, "hihat", 0],
        [2, "kick", 100],
        [2.5, "hihat", 0],
        [3, "kick", 100],
        [3.5, "hihat", 0],
        [0, "synth", 261.63],
        [2, "synth", 329.63],
      ],
    },
    "Techno Track 2": {
      tempo: 128,
      pattern: [
        [0, "kick", 100],
        [0.5, "hihat", 0],
        [1, "kick", 100],
        [1.5, "hihat", 0],
        [2, "kick", 100],
        [2.5, "hihat", 0],
        [3, "kick", 100],
        [3.5, "hihat", 0],
        [0, "synth", 293.66],
        [1, "synth", 349.23],
        [2, "synth", 392.0],
        [3, "synth", 440.0],
      ],
    },
    "Techno Track 3": {
      tempo: 132,
      pattern: [
        [0, "kick", 100],
        [0.5, "hihat", 0],
        [1, "kick", 100],
        [1.5, "hihat", 0],
        [2, "kick", 100],
        [2.5, "hihat", 0],
        [3, "kick", 100],
        [3.5, "hihat", 0],
        [0, "synth", 261.63],
        [1.5, "synth", 329.63],
        [3, "synth", 392.0],
      ],
    },
    "Techno Track 4": {
      tempo: 136,
      pattern: [
        [0, "kick", 100],
        [0.5, "hihat", 0],
        [1, "kick", 100],
        [1.5, "hihat", 0],
        [2, "kick", 100],
        [2.5, "hihat", 0],
        [3, "kick", 100],
        [3.5, "hihat", 0],
        [0, "synth", 329.63],
        [1, "synth", 392.0],
        [2, "synth", 440.0],
        [3, "synth", 261.63],
      ],
    },
    "Techno Track 5": {
      tempo: 140,
      pattern: [
        [0, "kick", 100],
        [0.5, "hihat", 0],
        [1, "kick", 100],
        [1.5, "hihat", 0],
        [2, "kick", 100],
        [2.5, "hihat", 0],
        [3, "kick", 100],
        [3.5, "hihat", 0],
        [0, "synth", 440.0],
        [0.5, "synth", 392.0],
        [1, "synth", 349.23],
        [1.5, "synth", 293.66],
        [2, "synth", 261.63],
        [3, "synth", 329.63],
      ],
    },
    "Techno Track 6": {
      tempo: 145,
      pattern: [
        [0, "kick", 100],
        [0.25, "hihat", 0],
        [0.5, "kick", 100],
        [0.75, "hihat", 0],
        [1, "kick", 100],
        [1.25, "hihat", 0],
        [1.5, "kick", 100],
        [1.75, "hihat", 0],
        [2, "kick", 100],
        [2.25, "hihat", 0],
        [2.5, "kick", 100],
        [2.75, "hihat", 0],
        [3, "kick", 100],
        [3.25, "hihat", 0],
        [3.5, "kick", 100],
        [3.75, "hihat", 0],
        [0, "synth", 392.0],
        [1, "synth", 440.0],
        [2, "synth", 493.88],
        [3, "synth", 329.63],
      ],
    },
    "DJ Agustino Inspired": {
      tempo: 138,
      pattern: [
        [0, "kick", 100],
        [0.5, "hihat", 0],
        [1, "kick", 100],
        [1.5, "hihat", 0],
        [2, "kick", 100],
        [2.5, "hihat", 0],
        [3, "kick", 100],
        [3.5, "hihat", 0],
        [0, "synth", 261.63],
        [2, "synth", 261.63], // Minimal, repetitive synth for peak-time techno
        [0, "bass", 130.81],
        [1, "bass", 130.81],
        [2, "bass", 130.81],
        [3, "bass", 130.81], // Deep bassline
      ],
    },
    "Armin van Buuren Inspired": {
      tempo: 142,
      pattern: [
        [0, "kick", 100],
        [0.25, "hihat", 0],
        [0.5, "kick", 100],
        [0.75, "hihat", 0],
        [1, "kick", 100],
        [1.25, "hihat", 0],
        [1.5, "kick", 100],
        [1.75, "hihat", 0],
        [2, "kick", 100],
        [2.25, "hihat", 0],
        [2.5, "kick", 100],
        [2.75, "hihat", 0],
        [3, "kick", 100],
        [3.25, "hihat", 0],
        [3.5, "kick", 100],
        [3.75, "hihat", 0],
        [0, "synth", 329.63],
        [0.5, "synth", 392.0],
        [1, "synth", 440.0],
        [1.5, "synth", 493.88],
        [2, "synth", 440.0],
        [2.5, "synth", 392.0],
        [3, "synth", 329.63],
        [3.5, "synth", 261.63], // Layered, festival-style synths
      ],
    },
    "Scooter Inspired": {
      tempo: 150,
      pattern: [
        [0, "kick", 100],
        [0.25, "hihat", 0],
        [0.5, "kick", 100],
        [0.75, "hihat", 0],
        [1, "kick", 100],
        [1.25, "hihat", 0],
        [1.5, "kick", 100],
        [1.75, "hihat", 0],
        [2, "kick", 100],
        [2.25, "hihat", 0],
        [2.5, "kick", 100],
        [2.75, "hihat", 0],
        [3, "kick", 100],
        [3.25, "hihat", 0],
        [3.5, "kick", 100],
        [3.75, "hihat", 0],
        [0, "synth", 440.0],
        [0.5, "synth", 493.88],
        [1, "synth", 523.25],
        [1.5, "synth", 587.33],
        [2, "synth", 440.0],
        [2.5, "synth", 493.88],
        [3, "synth", 523.25],
        [3.5, "synth", 587.33], // Rapid, high-pitched synths
      ],
    },
    "Melodic Techno (Anyma Style)": {
      tempo: 126,
      pattern: [
        [0, "kick", 100],
        [0.5, "hihat", 0],
        [1, "kick", 100],
        [1.5, "hihat", 0],
        [2, "kick", 100],
        [2.5, "hihat", 0],
        [3, "kick", 100],
        [3.5, "hihat", 0],
        [0, "synth", 261.63],
        [1, "synth", 329.63],
        [2, "synth", 392.0],
        [3, "synth", 329.63],
        [0, "bass", 130.81],
        [1, "bass", 130.81],
        [2, "bass", 130.81],
        [3, "bass", 130.81],
      ],
    },
    "Hard Techno (Nico Moreno Style)": {
      tempo: 145,
      pattern: [
        [0, "kick", 100],
        [0.25, "hihat", 0],
        [0.5, "kick", 100],
        [0.75, "hihat", 0],
        [1, "kick", 100],
        [1.25, "hihat", 0],
        [1.5, "kick", 100],
        [1.75, "hihat", 0],
        [2, "kick", 100],
        [2.25, "hihat", 0],
        [2.5, "kick", 100],
        [2.75, "hihat", 0],
        [3, "kick", 100],
        [3.25, "hihat", 0],
        [3.5, "kick", 100],
        [3.75, "hihat", 0],
        [0, "synth", 293.66],
        [2, "synth", 293.66], // Gritty, repetitive synth
      ],
    },
    "Acid Techno": {
      tempo: 135,
      pattern: [
        [0, "kick", 100],
        [0.5, "hihat", 0],
        [1, "kick", 100],
        [1.5, "hihat", 0],
        [2, "kick", 100],
        [2.5, "hihat", 0],
        [3, "kick", 100],
        [3.5, "hihat", 0],
        [0, "synth", 349.23],
        [0.5, "synth", 349.23],
        [1, "synth", 349.23],
        [1.5, "synth", 349.23],
        [2, "synth", 392.0],
        [2.5, "synth", 392.0],
        [3, "synth", 392.0],
        [3.5, "synth", 392.0],
      ],
    },
    "Psytrance Techno": {
      tempo: 140,
      pattern: [
        [0, "kick", 100],
        [0.25, "hihat", 0],
        [0.5, "kick", 100],
        [0.75, "hihat", 0],
        [1, "kick", 100],
        [1.25, "hihat", 0],
        [1.5, "kick", 100],
        [1.75, "hihat", 0],
        [2, "kick", 100],
        [2.25, "hihat", 0],
        [2.5, "kick", 100],
        [2.75, "hihat", 0],
        [3, "kick", 100],
        [3.25, "hihat", 0],
        [3.5, "kick", 100],
        [3.75, "hihat", 0],
        [0, "bass", 196.0],
        [0.5, "bass", 196.0],
        [1, "bass", 196.0],
        [1.5, "bass", 196.0],
        [2, "synth", 440.0],
        [3, "synth", 493.88],
      ],
    },
    "Minimal Techno": {
      tempo: 130,
      pattern: [
        [0, "kick", 100],
        [0.5, "hihat", 0],
        [1, "kick", 100],
        [1.5, "hihat", 0],
        [2, "kick", 100],
        [2.5, "hihat", 0],
        [3, "kick", 100],
        [3.5, "hihat", 0],
        [0, "synth", 261.63],
        [2, "synth", 261.63],
      ],
    },
    "Dark Techno": {
      tempo: 138,
      pattern: [
        [0, "kick", 100],
        [0.5, "hihat", 0],
        [1, "kick", 100],
        [1.5, "hihat", 0],
        [2, "kick", 100],
        [2.5, "hihat", 0],
        [3, "kick", 100],
        [3.5, "hihat", 0],
        [0, "synth", 246.94],
        [2, "synth", 246.94], // Lower, darker synths
        [0, "bass", 123.47],
        [1, "bass", 123.47],
        [2, "bass", 123.47],
        [3, "bass", 123.47],
      ],
    },
    "Peak Time Techno": {
      tempo: 140,
      pattern: [
        [0, "kick", 100],
        [0.25, "hihat", 0],
        [0.5, "kick", 100],
        [0.75, "hihat", 0],
        [1, "kick", 100],
        [1.25, "hihat", 0],
        [1.5, "kick", 100],
        [1.75, "hihat", 0],
        [2, "kick", 100],
        [2.25, "hihat", 0],
        [2.5, "kick", 100],
        [2.75, "hihat", 0],
        [3, "kick", 100],
        [3.25, "hihat", 0],
        [3.5, "kick", 100],
        [3.75, "hihat", 0],
        [0, "synth", 392.0],
        [1, "synth", 440.0],
        [2, "synth", 493.88],
      ],
    },
    "Hypnotic Techno": {
      tempo: 132,
      pattern: [
        [0, "kick", 100],
        [0.5, "hihat", 0],
        [1, "kick", 100],
        [1.5, "hihat", 0],
        [2, "kick", 100],
        [2.5, "hihat", 0],
        [3, "kick", 100],
        [3.5, "hihat", 0],
        [0, "synth", 329.63],
        [1, "synth", 329.63],
        [2, "synth", 329.63],
        [3, "synth", 329.63],
      ],
    },
    "Festival Techno": {
      tempo: 142,
      pattern: [
        [0, "kick", 100],
        [0.25, "hihat", 0],
        [0.5, "kick", 100],
        [0.75, "hihat", 0],
        [1, "kick", 100],
        [1.25, "hihat", 0],
        [1.5, "kick", 100],
        [1.75, "hihat", 0],
        [2, "kick", 100],
        [2.25, "hihat", 0],
        [2.5, "kick", 100],
        [2.75, "hihat", 0],
        [3, "kick", 100],
        [3.25, "hihat", 0],
        [3.5, "kick", 100],
        [3.75, "hihat", 0],
        [0, "synth", 440.0],
        [1, "synth", 493.88],
        [2, "synth", 523.25],
        [3, "synth", 587.33],
        [0, "bass", 130.81],
        [1, "bass", 130.81],
        [2, "bass", 130.81],
        [3, "bass", 130.81],
      ],
    },
    "Industrial Techno": {
      tempo: 140,
      pattern: [
        [0, "kick", 100],
        [0.5, "hihat", 0],
        [1, "kick", 100],
        [1.5, "hihat", 0],
        [2, "kick", 100],
        [2.5, "hihat", 0],
        [3, "kick", 100],
        [3.5, "hihat", 0],
        [0, "synth", 246.94],
        [1, "synth", 246.94],
        [2, "synth", 246.94],
        [3, "synth", 246.94],
        [0, "bass", 123.47],
        [1, "bass", 123.47],
        [2, "bass", 123.47],
        [3, "bass", 123.47],
      ],
    },
  };

  public playTrack(trackName: string) {
    if (!this._tracks[trackName]) return;
    if (this._isPlaying) this.stop();

    this._audioContext = new AudioContext();
    this._isPlaying = true;
    this._currentTrack = trackName;

    const tempo = this._tracks[trackName].tempo;
    const beatDuration = 60 / tempo;
    const pattern = this._tracks[trackName].pattern;
    const patternLength = 4 * beatDuration; // 4-beat bar
    const totalDuration = 30;

    let currentTime = this._audioContext.currentTime;
    const repeats = Math.ceil(totalDuration / patternLength);

    for (
      let i = 0;
      i < repeats &&
      currentTime < this._audioContext.currentTime + totalDuration;
      i++
    ) {
      pattern.forEach(([beat, instrument, freq]) => {
        const absoluteTime = currentTime + beat * beatDuration;

        if (this._audioContext)
          if (absoluteTime < this._audioContext.currentTime + totalDuration) {
            if (instrument === "kick") this._playKick(freq, absoluteTime);
            else if (instrument === "hihat") this._playHiHat(absoluteTime);
            else if (instrument === "synth")
              this._playSynth(freq, absoluteTime);
            else if (instrument === "bass") this._playBass(freq, absoluteTime);
          }
      });
      currentTime += patternLength;
    }

    this._stopTimeout = setTimeout(() => this.stop(), totalDuration * 1000);
  }

  public stop() {
    this._isPlaying = false;
    this._currentTrack = null;
    if (this._stopTimeout) clearTimeout(this._stopTimeout);
    if (this._audioContext) {
      this._audioContext.close().then(() => {
        this._audioContext = null;
      });
    }
  }

  public getTrackNames(): string[] {
    return Object.keys(this._tracks);
  }

  public getCurrentTrack(): string | null {
    return this._currentTrack;
  }

  private _playKick(frequency: number, startTime: number) {
    if (!this._audioContext) return;
    const oscillator = this._audioContext.createOscillator();
    const gainNode = this._audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, startTime + 0.1);

    gainNode.gain.setValueAtTime(1, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

    oscillator.connect(gainNode);
    gainNode.connect(this._audioContext.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.3);
  }

  private _playHiHat(startTime: number) {
    if (!this._audioContext) return;
    const bufferSize = this._audioContext.sampleRate * 0.1;
    const buffer = this._audioContext.createBuffer(
      1,
      bufferSize,
      this._audioContext.sampleRate
    );
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this._audioContext.createBufferSource();
    const gainNode = this._audioContext.createGain();
    const filter = this._audioContext.createBiquadFilter();

    filter.type = "highpass";
    filter.frequency.setValueAtTime(7000, startTime);
    gainNode.gain.setValueAtTime(0.5, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this._audioContext.destination);

    source.start(startTime);
    source.stop(startTime + 0.1);
  }

  private _playSynth(frequency: number, startTime: number) {
    if (!this._audioContext) return;
    const oscillator = this._audioContext.createOscillator();
    const gainNode = this._audioContext.createGain();

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, startTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(this._audioContext.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.5);
  }

  private _playBass(frequency: number, startTime: number) {
    if (!this._audioContext) return;
    const oscillator = this._audioContext.createOscillator();
    const gainNode = this._audioContext.createGain();

    oscillator.type = "square"; // Square wave for deep bass
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.4, startTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, startTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(this._audioContext.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.5);
  }
}
