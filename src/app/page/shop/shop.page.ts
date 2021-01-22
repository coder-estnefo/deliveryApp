import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { CartService } from "src/app/service/cart/cart.service";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.page.html",
  styleUrls: ["./shop.page.scss"],
})
export class ShopPage implements OnInit {
  cartCount;
  user;

  constructor(
    public cartService: CartService,
    public auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartCount = this.cartService.getCartCount();
  }

  navigateTo() {
    this.auth.user.subscribe((user) => {
      if (user) {
        if (user.isAnonymous) {
          this.router.navigate(["/shop/admin"]);
        } else {
          this.router.navigate(["/shop/customer"]);
        }
      } else {
        this.router.navigate(["/shop/login"]);
      }
    });
  }
}
