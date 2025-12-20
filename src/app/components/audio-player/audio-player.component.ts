import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audio-player.component.html'
})
export class AudioPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  @ViewChild('seekSlider') seekSlider!: ElementRef<HTMLInputElement>;
  @ViewChild('volumeSlider') volumeSlider!: ElementRef<HTMLInputElement>;

  playState: string = 'play';
  muteState: string = 'unmute';
  currentTime: string = '0:00';
  duration: string = '0:00';
  volume: number = 50;
  seekValue: number = 0;
  maxSeek: number = 100;
  bufferedWidth: string = '0%';
  seekBeforeWidth: string = '0%';
  volumeBeforeWidth: string = '50%';
  isShuffle: boolean = false;
  isRepeat: boolean = false;
  songTitle: string = 'AJIONA';
  songArtist: string = 'Amateur Lover';

  private raf: number | null = null;
  private audio: HTMLAudioElement | null = null;
  private isSeeking: boolean = false;

  ngOnInit(): void {
    // Initialize values
  }

  ngAfterViewInit(): void {
    this.audio = this.audioElement.nativeElement;
    
    // Initialize audio volume
    if (this.audio) {
      this.audio.volume = this.volume / 100;
    }
    
    this.setupAudioListeners();
    this.setupSliderListeners();
  }

  ngOnDestroy(): void {
    if (this.raf !== null) {
      cancelAnimationFrame(this.raf);
    }
  }

  private setupAudioListeners(): void {
    if (!this.audio) return;

    if (this.audio.readyState > 0) {
      this.displayDuration();
      this.setSliderMax();
    } else {
      this.audio.addEventListener('loadedmetadata', () => {
        this.displayDuration();
        this.setSliderMax();
      });
    }

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio && !this.isSeeking) {
        this.seekValue = Math.floor(this.audio.currentTime);
        this.currentTime = this.calculateTime(this.audio.currentTime);
      }
    });

    this.audio.addEventListener('ended', () => {
      if (!this.isRepeat) {
        this.playState = 'play';
        this.stopAnimationFrame();
      }
    });

    this.audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
    });
  }

  private setupSliderListeners(): void {
    // Seek slider input handler is handled by template binding
    // Volume slider input handler is handled by template binding
  }

  togglePlay(): void {
    if (!this.audio) return;

    if (this.playState === 'play') {
      this.audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
      this.startAnimationFrame();
      this.playState = 'pause';
    } else {
      this.audio.pause();
      this.stopAnimationFrame();
      this.playState = 'play';
    }
  }

  toggleMute(): void {
    if (!this.audio) return;

    if (this.muteState === 'unmute') {
      this.audio.muted = true;
      this.muteState = 'mute';
    } else {
      this.audio.muted = false;
      this.muteState = 'unmute';
    }
  }

  skipBackward(): void {
    if (!this.audio) return;
    this.audio.currentTime = Math.max(0, this.audio.currentTime - 10);
  }

  skipForward(): void {
    if (!this.audio) return;
    this.audio.currentTime = Math.min(this.audio.duration, this.audio.currentTime + 10);
  }

  toggleShuffle(): void {
    this.isShuffle = !this.isShuffle;
  }

  toggleRepeat(): void {
    this.isRepeat = !this.isRepeat;
    if (this.audio) {
      this.audio.loop = this.isRepeat;
    }
  }

  onSeekInput(value: string | number): void {
    this.isSeeking = true;
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    this.seekValue = Math.floor(numValue);
    this.currentTime = this.calculateTime(this.seekValue);
    if (this.audio && !this.audio.paused) {
      this.stopAnimationFrame();
    }
  }

  onSeekChange(value: string | number): void {
    if (this.audio) {
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      this.audio.currentTime = numValue;
      this.seekValue = Math.floor(numValue);
      this.currentTime = this.calculateTime(numValue);
      this.isSeeking = false;
      if (!this.audio.paused) {
        this.startAnimationFrame();
      }
    }
  }

  onVolumeInput(value: string | number): void {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    this.volume = Math.round(numValue);
    this.volumeBeforeWidth = `${this.volume}%`;
    if (this.audio) {
      this.audio.volume = this.volume / 100;
    }
  }

  private calculateTime(secs: number): string {
    if (isNaN(secs) || !isFinite(secs)) {
      return '0:00';
    }
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  }

  private displayDuration(): void {
    if (this.audio && this.audio.duration) {
      this.duration = this.calculateTime(this.audio.duration);
    }
  }

  private setSliderMax(): void {
    if (this.audio && this.audio.duration) {
      this.maxSeek = Math.floor(this.audio.duration);
    }
  }

  private startAnimationFrame(): void {
    this.stopAnimationFrame();
    const whilePlaying = () => {
      if (this.audio && !this.audio.paused && !this.isSeeking) {
        this.seekValue = Math.floor(this.audio.currentTime);
        this.currentTime = this.calculateTime(this.audio.currentTime);
        this.raf = requestAnimationFrame(whilePlaying);
      }
    };
    this.raf = requestAnimationFrame(whilePlaying);
  }

  private stopAnimationFrame(): void {
    if (this.raf !== null) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
  }
}

