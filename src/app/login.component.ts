import {Component} from '@angular/core';
import {ApiService} from './api.service';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <h4>Login</h4>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form>
          <mat-form-field>
            <input matInput [(ngModel)]="loginData.email" name="email" placeholder="email" type="email">
          </mat-form-field>
          <mat-form-field>
            <input  matInput [(ngModel)]="loginData.password" name="password" placeholder="password" type="password">
          </mat-form-field>
          <button (click)="post()" mat-raised-button color="primary">Login</button>
        </form>

      </mat-card-content>
      </mat-card>
  `
})
export class LoginComponent {
  loginData: any = {};
  constructor( private authService: AuthService) {}
  post() {
    console.log(this.loginData);
    this.authService.sendUserLogin(this.loginData);
  }
}
