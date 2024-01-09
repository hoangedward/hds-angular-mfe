import { Component } from '@angular/core';
import { Observable } from 'rxjs';
// import { RouterModule } from '@angular/router';
// import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  // standalone: true,
  // imports: [NxWelcomeComponent, RouterModule],
  selector: 'micro-app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'shell';
  constructor() {
  }

}
