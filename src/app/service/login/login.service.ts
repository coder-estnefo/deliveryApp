import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private customerService: CustomerService,
    public alertController: AlertController
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
          this.presentAlert();
        });
      } else {
          this.presentAlert(); 
      }
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
          this.router.navigate(['/shop/home']);
      }).catch(error => {
          this.presentAlert();
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

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Login Failed',
      message: 'Incorrect Login details',
      buttons: ['OK']
    });

    await alert.present();
  }
}
