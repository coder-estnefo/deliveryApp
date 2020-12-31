import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { on } from 'process';
import { CartService } from 'src/app/service/cart/cart.service';
import { LoginService } from 'src/app/service/login/login.service';
import { Feature, MapboxService } from 'src/app/service/mapbox/mapbox.service';
import { OrderService } from 'src/app/service/order/order.service';

import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

declare var mapboxgl;

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  coords;
  btnOrder = true;

  constructor(
    public modalController: ModalController,
    private loginSerive: LoginService,
    public cartService: CartService,
    private orderService: OrderService,
    private mapboxService: MapboxService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.getCoords();

    mapboxgl.accessToken = 'pk.eyJ1IjoiZXN0bmVmbyIsImEiOiJja2hrZ2xndnAxZ3J6MnJvOXRicTFuZmhnIn0.Kx8WzEt96j9aLBt0NhQoaQ';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [28.112268, -26.270760],
    zoom: 5
    });

    map.on('load', () => {
      map.resize();
    })
  }

  async getCoords() {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    const coordinates = await Geolocation.getCurrentPosition(options);
    this.coords = coordinates;

    //console.log(this.coords);
  }
  
  locate() {

    const lng = this.coords.coords.longitude;
    const lat = this.coords.coords.latitude;
      
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXN0bmVmbyIsImEiOiJja2hrZ2xndnAxZ3J6MnJvOXRicTFuZmhnIn0.Kx8WzEt96j9aLBt0NhQoaQ';
      var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat],
      zoom: 14
    });

    var marker = new mapboxgl.Marker()
      .setLngLat([ lng, lat])
      .addTo(map);

    map.on('load', () => {
      map.resize();
    });

    // navigator.geolocation.getCurrentPosition((position)=>{   
    //   const lng = position.coords.longitude;
    //   const lat = position.coords.latitude;
    //   this.coords = {"lng": lng, "lat": lat};
      
    //   mapboxgl.accessToken = 'pk.eyJ1IjoiZXN0bmVmbyIsImEiOiJja2hrZ2xndnAxZ3J6MnJvOXRicTFuZmhnIn0.Kx8WzEt96j9aLBt0NhQoaQ';
    //     var map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: [ lng, lat],
    //     zoom: 14
    //   });

    //   var marker = new mapboxgl.Marker()
    //     .setLngLat([ lng, lat])
    //     .addTo(map);

    //   map.on('load', () => {
    //     map.resize();
    //   })
      
    // });

    this.btnOrder = false;

  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  order() {
    const cartItems = this.cartService.getCartItems();
    const cartTotalPrice = this.cartService.getCartPrice();
    const userID = this.loginSerive.getUserID();
    this.orderService.placeOrder(userID, cartItems, cartTotalPrice, this.coords);
    this.cartService.clearCart();
    this.btnOrder = true;
    this.dismiss();
    this.presentToast();

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your order was successfull',
      duration: 2000
    });
    toast.present();
  }

}
