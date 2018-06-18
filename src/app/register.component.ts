import {Component} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  registerData: any = {};
  constructor( private authService: AuthService) {}
  post() {
    console.log(this.registerData);
    this.authService.sendUserRegistration(this.registerData);
  }
}
