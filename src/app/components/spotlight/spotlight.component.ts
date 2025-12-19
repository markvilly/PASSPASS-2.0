import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-spotlight',
  standalone: true,
  templateUrl: './spotlight.component.html'
})
export class SpotlightComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  showPlaceholder: boolean = true;

  ngAfterViewInit(): void {
    const video = this.videoElement?.nativeElement;
    if (video) {
      // Check if video has a valid source
      const hasSource = video.src && video.src.trim() !== '';
      
      // Listen for when video loads
      video.addEventListener('loadedmetadata', () => {
        this.showPlaceholder = false;
      });
      
      // If no source initially, show placeholder
      if (!hasSource) {
        this.showPlaceholder = true;
      } else {
        this.showPlaceholder = false;
      }
    }
  }
}

