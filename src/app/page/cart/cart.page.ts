import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderPage } from 'src/app/modal/order/order.page';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
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

}
