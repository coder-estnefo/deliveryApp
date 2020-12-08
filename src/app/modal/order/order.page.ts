import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/service/cart/cart.service';
import { LoginService } from 'src/app/service/login/login.service';
import { Feature, MapboxService } from 'src/app/service/mapbox/mapbox.service';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {


  //
  checkAddress ="";

  delivery = false;
  collect = true;
  coordinates : any;
  list : any;
  selectedAddress : string= "";
  lat;
  lng;


  addresses = [];
  //

  constructor(
    public modalController: ModalController,
    private loginSerive: LoginService,
    public cartService: CartService,
    private orderService: OrderService,
    private mapboxService: MapboxService
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
    this.cartService.clearCart();
  }

  //
  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService.search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.coordinates = features.map(feat => feat.geometry)
          this.addresses = features.map(feat => feat.place_name)
          this.list = features;
          console.log(this.list)
        });
    } else {
      this.addresses = [];
    }
  }

  addressCheck(event){
    this.checkAddress = event.target.value;
    console.log("info",this.checkAddress);
  }

  onSelect(address, i) {
    this.selectedAddress = address;
    //  selectedcoodinates=
  
    console.log("lng:" + JSON.stringify(this.list[i].geometry.coordinates[0]))
    console.log("lat:" + JSON.stringify(this.list[i].geometry.coordinates[1]))
    this.lng = JSON.stringify(this.list[i].geometry.coordinates[0])
    this.lat = JSON.stringify(this.list[i].geometry.coordinates[1])
    // this.user.coords = [this.lng,this.lat];
    console.log("index =" + i)
    console.log(this.selectedAddress)
    // this.user.address = this.selectedAddress;
    this.addresses = [];
  }
  //

}
