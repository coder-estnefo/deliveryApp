import { Injectable } from '@angular/core';

export interface Item {
  no: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  quantity: number;
  total_price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartList: Item[] = [];

  constructor() { }

  addToCart(item) {
    let item_no = item.no;
    let name = item.name;
    let desc = item.desc;
    let price = item.price;
    let image = item.image;
    let quantity = item.quantity;
    let total_price = item.total_price;
    let isFound = false;

    if (this.cartList.length > 0) {
      for (let current_item in this.cartList) {
        if (this.cartList[current_item]['no'] == item_no) {
          let price = this.cartList[current_item]['price'];
          let quantity = this.cartList[current_item]['quantity'];
          this.cartList[current_item]['quantity'] += quantity;
          this.cartList[current_item]['total_price'] += price;
          isFound = true;
          break; 
        }

        if (isFound == false) {
          this.cartList.push({'no': item_no, 'name': name,'desc': desc, 'price': price,
                          'image': image,'quantity': quantity, 'total_price': total_price});
        }
      }
    } else {
      this.cartList.push({'no': item_no, 'name': name,'desc': desc, 'price': price,
                          'image': image,'quantity': quantity, 'total_price': total_price});
    }
  }

  removeItem(item) {
    let item_no = item.no;

    for (let current_item in this.cartList) {
      if (this.cartList[current_item]['no'] == item_no) {
        if (this.cartList[current_item]['quantity'] > 0) {
          let price = this.cartList[current_item]['price'];
          let quantity = this.cartList[current_item]['quantity'];
          this.cartList[current_item]['total_price'] -= price;
          this.cartList[current_item]['quantity'] -= quantity;
        } else if (this.cartList[current_item]['quantity'] == 0) {
          this.cartList.splice(this.cartList.indexOf(item),1);
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
      total += this.cartList[current_item]['quantity'];
    }

    return total;
  }

  getCartPrice() {
    let total = 0.0;
    for (let current_item in this.cartList) {
      total += this.cartList[current_item]['total_price'];
    }
  }

  clearCart() {
    if (this.cartList.length > 0) {
      this.cartList.splice(0, this.cartList.length);
    }
  }

}
