import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userID;

  constructor(private auth: AngularFireAuth, private router: Router) { }

  createUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      console.log('registerd');
    }).catch(error => {
      console.log('error ->',error);
    });
  }

  login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      console.log('logged in');
      this.getUserID();
    }).catch(error => {
      console.log('Unable to login -> ',error);
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      console.log('logged out');
    }).catch(error => {
      console.log('Unable to login ->', error);
    });
  }

  getUserID() {
    let user = firebase.auth().currentUser;
    this.userID = user.uid;
  }
}
