import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'micro-app-ui-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-component.component.html',
  styleUrl: './ui-component.component.css',
})
export class UiComponentComponent {}
