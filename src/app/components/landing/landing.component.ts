import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html'
})
export class LandingComponent {
  @Output() openSubscribe = new EventEmitter<void>();

  onOpenSubscribe(): void {
    this.openSubscribe.emit();
  }
}

