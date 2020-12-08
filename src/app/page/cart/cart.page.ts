import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderPage } from 'src/app/modal/order/order.page';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartList;

  constructor(
    public modalController: ModalController,
    public cartService: CartService
  ) { }

  ngOnInit() {
    this.cartList = this.cartService.getCartItems();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: OrderPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  order() {
    this.presentModal();
  }

  clear() {
    this.cartService.clearCart();
  }

  addItem(item) {
    this.cartService.addToCart(item);
  }

  removeItem(item) {
    this.cartService.removeItem(item);
  }

  removeItems(item) {
    this.cartService.removeItems(item);
  }

}
