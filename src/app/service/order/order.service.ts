import { getLocaleDateTimeFormat } from '@angular/common';
import { Injectable } from '@angular/core';
import  firebase  from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  getTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let mm;
    let dd;
    let hh;
    let mi;
    let ss;

    if (month < 10) {
      mm = '0' + month;
    } else {
      mm = month; 
    }

    if (day < 10) {
      dd = '0' + day;
    } else {
      dd = day; 
    }

    if (hours < 10) {
      hh = '0' + hours;
    } else {
      hh = hours; 
    }

    if (minutes < 10) {
      mi = '0' + minutes;
    } else {
      mi = minutes; 
    }

    if (seconds < 10) {
      ss = '0' + seconds;
    } else {
      ss = seconds;
    }

    let dateTime = '' + year + mm + dd+ hh + mi + ss;
  
    return dateTime;
  }

  placeOrder(order_items, userID) {
    firebase.firestore().collection('orders').doc(userID).collection(this.getTime()).doc().set({
      items: order_items,
      delivery_address: {'address': 'n/a', 'coordinates': 'n/a'}
    }).then(() => {
      console.log('success');
    }).catch(error => {
      console.log('failure=>', error);
    });
  }
}
