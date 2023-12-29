import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'micro-app-core',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './core.component.html',
  styleUrl: './core.component.css',
})
export class CoreComponent {}
