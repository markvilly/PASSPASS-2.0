import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribe.component.html'
})
export class SubscribeComponent {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  
  formData = {
    firstName: '',
    secondName: '',
    country: '',
    email: '',
    philosophicalAnswer: ''
  };

  countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Japan',
    'Other'
  ];

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    // Handle form submission
    console.log('Form submitted:', this.formData);
    // You can add your submission logic here
    // After successful submission, you might want to close the modal
    // this.closeModal();
  }
}

