import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart/cart.service';
import { ItemService } from 'src/app/service/item/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  itemsList;
  cartCount;

  constructor(
    private itemService: ItemService,
    public cartService: CartService
  ) { }

  ngOnInit() {
    this.getItems();
    this.cartCount = this.cartService.getCartCount();
  }

  getItems() {
    this.itemService.getItems().subscribe(item => {
      this.itemsList = item;
    });
  }

  addItem(item) {
    this.cartService.addToCart(item);
    this.cartCount = this.cartService.getCartCount();
  }

  deleteItem(item) {
    this.cartService.removeItem(item);
    this.cartCount = this.cartService.getCartCount();
  }

}
