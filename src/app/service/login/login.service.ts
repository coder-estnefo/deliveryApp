import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { CustomerService } from '../customer/customer.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private auth: AngularFireAuth, 
    private router: Router,
    private customerService: CustomerService
  ) { }

  createUser(name, surname, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      //console.log('registerd');
      let id = this.getUserID();
      console.log(id);
      this.customerService.setUser(id,name, surname, email);
      this.router.navigate(['/shop/login']);
    }).catch(error => {
      //console.log('error ->',error);
    });
  }

  login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      //console.log('logged in');
      this.router.navigate(['/shop/home']);
    }).catch(error => {
      //console.log('Unable to login -> ',error);
    });
  }

  loginStatus() {
    return 0;
  }

  logout() {
    firebase.auth().signOut().then(() => {
      //console.log('logged out');
    }).catch(error => {
      //console.log('Unable to login ->', error);
    });
  }

  getUserID() {
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    return userID;
  }
}
