import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/service/cart/cart.service';
import { LoginService } from 'src/app/service/login/login.service';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor(
    public modalController: ModalController,
    private loginSerive: LoginService,
    public cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  order() {
    const cartItems = this.cartService.getCartItems();
    const userID = this.loginSerive.getUserID();
    this.orderService.placeOrder(cartItems, userID);
  }

}
