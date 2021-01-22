import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from "firebase/app";
import "firebase/firestore";
import { CartService } from "../cart/cart.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(
    private firestore: AngularFirestore,
    private cartService: CartService
  ) {}

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
      mm = "0" + month;
    } else {
      mm = month;
    }

    if (day < 10) {
      dd = "0" + day;
    } else {
      dd = day;
    }

    if (hours < 10) {
      hh = "0" + hours;
    } else {
      hh = hours;
    }

    if (minutes < 10) {
      mi = "0" + minutes;
    } else {
      mi = minutes;
    }

    if (seconds < 10) {
      ss = "0" + seconds;
    } else {
      ss = seconds;
    }

    let dateTime = "" + year + mm + dd + hh + mi + ss;

    return dateTime;
  }

  placeOrder(userID, order_items, cartTotal, coordinates) {
    let items_copy = order_items;
    let orderNo = this.getTime();
    this.firestore
      .collection("orders")
      .doc("history")
      .collection(userID)
      .doc(this.getTime())
      .set({
        order: {
          order_no: orderNo,
          user_id: userID,
          order_total: cartTotal,
        },
        location: coordinates,
        items: order_items,
      })
      .then(() => {
        //console.log('success');
        this.firestore
          .collection("orders-history")
          .doc(this.getTime())
          .set({
            order: {
              order_no: orderNo,
              user_id: userID,
              order_total: cartTotal,
            },
            location: coordinates,
            items: items_copy,
          });

        this.cartService.clearCart();
      })
      .catch((error) => {
        //console.log('failure=>', error);
      });
  }

  getOrders(userID) {
    return this.firestore.collection(`orders/history/${userID}`).valueChanges();
  }

  getOrdersHistory() {
    return this.firestore.collection("orders-history").valueChanges();
  }
}
