import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  cartCount;

  constructor(
    public cartService: CartService
  ) { }

  ngOnInit() {
    this.cartCount = this.cartService.getCartCount();
  }

}
