import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { NxWelcomeComponent } from './nx-welcome.component';
import { AuthenStoreFacade } from '@micro-app/app-store';

@Component({
  // standalone: true,
  // imports: [CommonModule, NxWelcomeComponent],
  selector: 'micro-app-login-entry',
  template: `<div class="d-flex justify-content-center">
  <form id="loginForm" class="row row-cols-lg-auto align-items-center">
      <div class="col-12">
          <input class="form-control"
                 name="userName" #userName
                 placeholder="Username"
                 type="text"
                 (keyup.enter)="login()"/>
      </div>
      <div class="col-12">
          <button class="btn btn-primary"
                  type="submit"
                  (click)="login()">
              Login
          </button>
      </div>
      <div *ngIf="isLoggedIn$ | async">User is logged in!</div>
  </form>
</div>
`,
})
export class RemoteEntryComponent {
  isLoggedIn$ = this.authenStoreFacade.isLogin$;
  constructor(private authenStoreFacade: AuthenStoreFacade) {}


  login() {
    this.authenStoreFacade.login()
    this.authenStoreFacade.navigate(['home'])
  }
}
