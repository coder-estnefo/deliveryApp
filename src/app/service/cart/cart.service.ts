import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

export interface CartItems {
  no: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  quantity: number;
  total_price: number;
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  cartList: CartItems[] = [];

  constructor(public alertController: AlertController) {}

  addToCart(item) {
    const { no, name, description, price, image } = item;

    let quantity;
    let isFound = false;

    if (this.cartList.length > 0) {
      for (let current_item in this.cartList) {
        if (this.cartList[current_item]["no"] == no) {
          let price = this.cartList[current_item]["price"];
          this.cartList[current_item]["quantity"] += 1;
          this.cartList[current_item]["total_price"] += price;
          isFound = true;
          break;
        }
      }

      if (isFound == false) {
        this.cartList.push({
          no: no,
          name: name,
          desc: description,
          price: price,
          image: image,
          quantity: 1,
          total_price: price,
        });
      }
    } else {
      quantity = 1;
      let total_price = price;
      this.cartList.push({
        no: no,
        name: name,
        desc: description,
        price: price,
        image: image,
        quantity: quantity,
        total_price: total_price,
      });
    }

    //console.log(this.cartList);
  }

  removeItem(item) {
    let item_no = item.no;

    for (let current_item in this.cartList) {
      if (this.cartList[current_item]["no"] == item_no) {
        if (this.cartList[current_item]["quantity"] > 0) {
          let price = this.cartList[current_item]["price"];
          this.cartList[current_item]["total_price"] -= price;
          this.cartList[current_item]["quantity"] -= 1;
          break;
        }

        if (this.cartList[current_item]["quantity"] == 0) {
          this.cartList.splice(this.cartList.indexOf(item), 1);
          break;
        }
      }
    }
  }

  removeItems(item) {
    if (this.cartList.length > 0) {
      this.cartList.splice(this.cartList.indexOf(item), 1);
    }
  }

  getCartCount() {
    let total = 0;
    for (let current_item in this.cartList) {
      total += this.cartList[current_item]["quantity"];
    }

    return total;
  }

  getCartPrice() {
    let total = 0.0;
    for (let current_item in this.cartList) {
      total += this.cartList[current_item]["total_price"];
    }

    return total.toFixed(2);
  }

  clearCart() {
    this.presentAlertConfirm();
  }

  getCartItems() {
    return this.cartList;
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Confirm Action!",
      message: "<strong>Are you sure you want to clear Cart</strong>?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Yes",
          handler: () => {
            this.continueClearCart();
          },
        },
      ],
    });

    await alert.present();
  }

  continueClearCart() {
    if (this.cartList.length > 0) {
      this.cartList.splice(0, this.cartList.length);
    }
  }
}
