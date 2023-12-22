import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'org-shop-entry',
  template: `<org-nx-welcome></org-nx-welcome>`,
})
export class RemoteEntryComponent {}
