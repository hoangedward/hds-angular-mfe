import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'micro-app-cart-entry',
  template: `<micro-app-nx-welcome></micro-app-nx-welcome>`,
})
export class RemoteEntryComponent {}
