import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';

export interface Item {
  no: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
}) 
export class ItemService {

  uploadPercent;

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getItems() {
    return this.firestore.collection<Item>('items').valueChanges();
  }

  uploadFile(event) {
    let file = event.target.files[0];
    let fileName = file.name;
    let fileExt = fileName.split('.').pop();
    let filePath = Math.random().toString(36).substring(2) + '.' + fileExt;
    let fileRef = this.storage.ref(`images/${filePath}`);
    let task = this.storage.upload(`images/${filePath}`, file);

    //task.percentageChanges()


    //NOT DONE              
  }

  addItem(item) {
    let docID = this.firestore.createId();

    let no = item.no; // Create/Generate ???
    let name = item.name;
    let desc = item.description;
    let price = item.price;
    let image = item.image;

    this.firestore.collection('items').doc(docID).set({
      no: no,
      name: name,
      description: desc,
      price: price,
      image: image
    }).then(() => {
      console.log('item added');
    }).catch( error => {
      console.error(error);
    })
  }

  updateItem() {

  }

  deleteItem() {
    
  }
}
