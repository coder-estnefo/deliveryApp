import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm;
  alert;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(form) {
    let name = form.value.name.toLowerCase();
    let surname = form.value.surname.toLowerCase();
    let email = form.value.email;
    let password = form.value.password;
    this.loginService.createUser(name, surname, email, password);
  }

  login(email, password) {
    this.loginService.login(email, password);
  }

  logout() {
    this.loginService.logout();
  }

}
