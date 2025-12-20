import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html'
})
export class LandingComponent implements AfterViewInit, OnDestroy {
  @Output() openSubscribe = new EventEmitter<void>();
  @ViewChild('artistsSpan', { static: false }) artistsSpan!: ElementRef<HTMLSpanElement>;

  private animationInterval: any;
  private currentFontIndex = 0;
  
  // Array of diverse font families including Asian fonts
  private fontFamilies: string[] = [
    // Sans-serif fonts
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    // Serif fonts
    'Times New Roman, serif',
    'Georgia, serif',
    'Palatino, serif',
    'Garamond, serif',
    'Baskerville, serif',
    'Book Antiqua, serif',
    // Monospace fonts
    'Courier New, monospace',
    'Monaco, monospace',
    'Consolas, monospace',
    // Japanese fonts (web fonts)
    'Noto Sans JP, sans-serif',
    'Noto Serif JP, serif',
    'Hiragino Kaku Gothic ProN, Noto Sans JP, sans-serif',
    'Hiragino Mincho ProN, Noto Serif JP, serif',
    'Yu Gothic, Noto Sans JP, sans-serif',
    'Meiryo, Noto Sans JP, sans-serif',
    // Chinese fonts (web fonts)
    'Noto Sans SC, sans-serif',
    'Noto Serif SC, serif',
    'Noto Sans TC, sans-serif',
    'Noto Serif TC, serif',
    'Microsoft YaHei, Noto Sans SC, sans-serif',
    'SimHei, Noto Sans SC, sans-serif',
    'SimSun, Noto Serif SC, serif',
    // Korean fonts (web fonts)
    'Noto Sans KR, sans-serif',
    'Noto Serif KR, serif',
    'Malgun Gothic, Noto Sans KR, sans-serif',
    'Nanum Gothic, Noto Sans KR, sans-serif',
    'Nanum Myeongjo, Noto Serif KR, serif',
    // Decorative/Display fonts
    'Brush Script MT, cursive',
    'Papyrus, fantasy',
    'Chalkduster, fantasy'
  ];

  ngAfterViewInit(): void {
    if (this.artistsSpan?.nativeElement) {
      this.startFontAnimation();
    }
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private startFontAnimation(): void {
    const element = this.artistsSpan.nativeElement;
    
    // Set initial font (random)
    const initialIndex = Math.floor(Math.random() * this.fontFamilies.length);
    this.currentFontIndex = initialIndex;
    gsap.set(element, { fontFamily: this.fontFamilies[initialIndex] });

    // Create animation function with random font selection
    const animateFont = () => {
      let newIndex;
      // Ensure we don't select the same font twice in a row
      do {
        newIndex = Math.floor(Math.random() * this.fontFamilies.length);
      } while (newIndex === this.currentFontIndex && this.fontFamilies.length > 1);
      
      this.currentFontIndex = newIndex;
      
      gsap.to(element, {
        fontFamily: this.fontFamilies[newIndex],
        duration: 0.5,
        ease: 'power2.inOut'
      });
    };

    // Start interval - animate every 5 seconds (pauses for 5 seconds between changes)
    this.animationInterval = setInterval(animateFont, 5000);
    
    // Trigger first animation after 5 seconds
    setTimeout(animateFont, 5000);
  }

  onOpenSubscribe(): void {
    this.openSubscribe.emit();
  }
}

