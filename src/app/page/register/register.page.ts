import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  register(email, password) {
    this.loginService.createUser(email, password);
  }

  login(email, password) {
    this.loginService.login(email, password);
  }

  logout() {
    this.loginService.logout();
  }

  getUser() {
    this.loginService.getUserID();
    console.log('registerPage -> ', this.loginService.userID);
  }

}
