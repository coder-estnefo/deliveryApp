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
      //this.router.navigate(['/shop/login']);
      this.router.navigate(['/shop/customer']);
    }).catch(error => {
      //console.log('error ->',error);
      alert('registration failed')
    });
  }

  login(email, password) {
    if (email == 'admin') {
      if(password == 'admin') {
        firebase.auth().signInAnonymously().then(() => {
          this.router.navigate(['/shop/admin']);
        }).catch(error => {
          alert('login failed')
        });
      } else {
          alert('login failed') 
      }
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        //console.log('logged in');
        this.router.navigate(['/shop/home']);
      }).catch(error => {
        //console.log('Unable to login -> ',error);
        alert('login failed')
      });
    }
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
