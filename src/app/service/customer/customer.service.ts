import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  
  setUser(userID, name,surname, email) {
    //this.firestore.collection('orders').doc('history').collection(userID).doc(this.getTime()).set({
    this.firestore.collection('users').doc('users').collection(userID).doc().set({
      name: name,
      surname: surname,
      email: email
    }).then(()=> {
      console.log('user added');
    }).catch((error) => {
      console.log('user not added ', error);
    })
  }

  getUserDetails(userID) {
    return this.firestore.collection(`users/users/${userID}`).valueChanges();
  }

  setLocation(lat, lng) {

  }


  updateLocation(lat, lng) {

  }
}
