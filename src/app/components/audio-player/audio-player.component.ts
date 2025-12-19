import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var lottie: any;

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audio-player.component.html'
})
export class AudioPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  @ViewChild('playIconContainer') playIconContainer!: ElementRef<HTMLButtonElement>;
  @ViewChild('muteIconContainer') muteIconContainer!: ElementRef<HTMLButtonElement>;
  @ViewChild('audioPlayerContainer') audioPlayerContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('seekSlider') seekSlider!: ElementRef<HTMLInputElement>;
  @ViewChild('volumeSlider') volumeSlider!: ElementRef<HTMLInputElement>;
  @ViewChild('currentTimeDisplay') currentTimeDisplay!: ElementRef<HTMLSpanElement>;
  @ViewChild('durationDisplay') durationDisplay!: ElementRef<HTMLSpanElement>;
  @ViewChild('volumeOutput') volumeOutput!: ElementRef<HTMLOutputElement>;

  playState: string = 'play';
  muteState: string = 'unmute';
  currentTime: string = '0:00';
  duration: string = '0:00';
  volume: number = 100;
  seekValue: number = 0;
  maxSeek: number = 100;
  bufferedWidth: string = '0%';
  seekBeforeWidth: string = '0%';
  volumeBeforeWidth: string = '100%';

  private playAnimation: any;
  private muteAnimation: any;
  private raf: number | null = null;
  private audio: HTMLAudioElement | null = null;

  ngOnInit(): void {
    // Initialize values
  }

  ngAfterViewInit(): void {
    this.audio = this.audioElement.nativeElement;
    this.initializeLottieAnimations();
    this.setupAudioListeners();
    this.setupSliderListeners();
  }

  ngOnDestroy(): void {
    if (this.raf !== null) {
      cancelAnimationFrame(this.raf);
    }
    if (this.playAnimation) {
      this.playAnimation.destroy();
    }
    if (this.muteAnimation) {
      this.muteAnimation.destroy();
    }
  }

  private async initializeLottieAnimations(): Promise<void> {
    try {
      // Use dynamic import for lottie-web
      const lottieWebModule = await import('lottie-web');
      const lottieWeb = lottieWebModule.default || lottieWebModule;
      
      if (this.playIconContainer?.nativeElement) {
        this.playAnimation = lottieWeb.loadAnimation({
          container: this.playIconContainer.nativeElement,
          path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
          renderer: 'svg',
          loop: false,
          autoplay: false,
          name: 'Play Animation',
        });
        this.playAnimation.goToAndStop(14, true);
      }

      if (this.muteIconContainer?.nativeElement) {
        this.muteAnimation = lottieWeb.loadAnimation({
          container: this.muteIconContainer.nativeElement,
          path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json',
          renderer: 'svg',
          loop: false,
          autoplay: false,
          name: 'Mute Animation',
        });
      }
    } catch (error) {
      console.error('Error loading Lottie animations:', error);
    }
  }

  private setupAudioListeners(): void {
    if (!this.audio) return;

    if (this.audio.readyState > 0) {
      this.displayDuration();
      this.setSliderMax();
      this.displayBufferedAmount();
    } else {
      this.audio.addEventListener('loadedmetadata', () => {
        this.displayDuration();
        this.setSliderMax();
        this.displayBufferedAmount();
      });
    }

    this.audio.addEventListener('progress', () => {
      this.displayBufferedAmount();
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio) {
        this.seekValue = Math.floor(this.audio.currentTime);
        this.updateSeekProgress();
      }
    });
  }

  private setupSliderListeners(): void {
    // Seek slider input handler is handled by template binding
    // Volume slider input handler is handled by template binding
  }

  togglePlay(): void {
    if (!this.audio) return;

    if (this.playState === 'play') {
      this.audio.play();
      if (this.playAnimation) {
        this.playAnimation.playSegments([14, 27], true);
      }
      this.startAnimationFrame();
      this.playState = 'pause';
    } else {
      this.audio.pause();
      if (this.playAnimation) {
        this.playAnimation.playSegments([0, 14], true);
      }
      this.stopAnimationFrame();
      this.playState = 'play';
    }
  }

  toggleMute(): void {
    if (!this.audio) return;

    if (this.muteState === 'unmute') {
      if (this.muteAnimation) {
        this.muteAnimation.playSegments([0, 15], true);
      }
      this.audio.muted = true;
      this.muteState = 'mute';
    } else {
      if (this.muteAnimation) {
        this.muteAnimation.playSegments([15, 25], true);
      }
      this.audio.muted = false;
      this.muteState = 'unmute';
    }
  }

  onSeekInput(value: number): void {
    this.seekValue = value;
    this.currentTime = this.calculateTime(value);
    this.updateSeekProgress();
    if (this.audio && !this.audio.paused) {
      this.stopAnimationFrame();
    }
  }

  onSeekChange(value: number): void {
    if (this.audio) {
      this.audio.currentTime = value;
      if (!this.audio.paused) {
        this.startAnimationFrame();
      }
    }
  }

  onVolumeInput(value: number): void {
    this.volume = value;
    this.volumeBeforeWidth = `${value}%`;
    this.updateVolumeProgress();
    if (this.audio) {
      this.audio.volume = value / 100;
    }
  }

  private calculateTime(secs: number): string {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  }

  private displayDuration(): void {
    if (this.audio) {
      this.duration = this.calculateTime(this.audio.duration);
    }
  }

  private setSliderMax(): void {
    if (this.audio) {
      this.maxSeek = Math.floor(this.audio.duration);
    }
  }

  private displayBufferedAmount(): void {
    if (!this.audio || this.maxSeek === 0 || !this.audioPlayerContainer) return;

    const bufferedAmount = Math.floor(
      this.audio.buffered.end(this.audio.buffered.length - 1)
    );
    this.bufferedWidth = `${(bufferedAmount / this.maxSeek) * 100}%`;
    this.audioPlayerContainer.nativeElement.style.setProperty(
      '--buffered-width',
      this.bufferedWidth
    );
  }

  private updateSeekProgress(): void {
    if (this.maxSeek > 0 && this.audioPlayerContainer) {
      this.seekBeforeWidth = `${(this.seekValue / this.maxSeek) * 100}%`;
      this.audioPlayerContainer.nativeElement.style.setProperty(
        '--seek-before-width',
        this.seekBeforeWidth
      );
    }
  }

  private updateVolumeProgress(): void {
    if (this.audioPlayerContainer) {
      this.audioPlayerContainer.nativeElement.style.setProperty(
        '--volume-before-width',
        this.volumeBeforeWidth
      );
    }
  }

  private startAnimationFrame(): void {
    const whilePlaying = () => {
      if (this.audio && !this.audio.paused) {
        this.seekValue = Math.floor(this.audio.currentTime);
        this.currentTime = this.calculateTime(this.seekValue);
        this.updateSeekProgress();
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

