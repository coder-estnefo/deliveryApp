import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart/cart.service';
import { ItemService } from 'src/app/service/item/item.service';
import { LoginService } from 'src/app/service/login/login.service';
import firebase from 'firebase/app';
import 'firebase/auth';

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
    public cartService: CartService,
    public loginService: LoginService
  ) { }

  ngOnInit() {
    this.getItems();
    this.cartCount = this.cartService.getCartCount();
  }

  getItems() {
    this.itemService.getItems().subscribe(items => {
      this.itemsList = items;
    });
  }

  addItem(item) {
    this.cartService.addToCart(item);
    this.cartCount = this.cartService.getCartCount();
  }

  deleteItem(item) {
    this.cartService.removeItems(item);
    this.cartCount = this.cartService.getCartCount();
  }

  filter(key) {
    this.itemService.getFilteredItems(key).subscribe(items => {
      this.itemsList = items;
    })
  }

}
