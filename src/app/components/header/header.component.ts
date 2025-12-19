import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() openSubscribe = new EventEmitter<void>();

  onOpenSubscribe(): void {
    this.openSubscribe.emit();
  }
}

