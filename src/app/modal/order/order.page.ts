import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { on } from "process";
import { CartService } from "src/app/service/cart/cart.service";
import { LoginService } from "src/app/service/login/login.service";
import { Feature, MapboxService } from "src/app/service/mapbox/mapbox.service";
import { OrderService } from "src/app/service/order/order.service";

import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;

declare var mapboxgl;
declare var MapboxGeocoder;

@Component({
  selector: "app-order",
  templateUrl: "./order.page.html",
  styleUrls: ["./order.page.scss"],
})
export class OrderPage implements OnInit {
  checkAddress = "";

  delivery = false;
  collect = true;
  coordinates: any;
  list: any;
  selectedAddress: string = "";
  lat;
  lng;
  addresses = [];

  map;
  coords;
  marker;
  continue = false;

  name;
  number;
  date;
  ccv;
  cart;

  constructor(
    public modalController: ModalController,
    private loginSerive: LoginService,
    public cartService: CartService,
    private orderService: OrderService,
    private mapboxService: MapboxService,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZXN0bmVmbyIsImEiOiJja2hrZ2xndnAxZ3J6MnJvOXRicTFuZmhnIn0.Kx8WzEt96j9aLBt0NhQoaQ";
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [28.112268, -26.27076],
      zoom: 5,
    });

    this.map.on("load", () => {
      this.map.resize();
    });

    this.cart = this.cartService.getCartItems();
  }

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.coordinates = features.map((feat) => feat.geometry);
          this.addresses = features.map((feat) => feat.place_name);
          this.list = features;
          //console.log(this.list)
        });
    } else {
      this.addresses = [];
    }
  }

  addressCheck(event) {
    this.checkAddress = event.target.value;
    //console.log("info",this.checkAddress);
  }

  onSelect(address, i) {
    this.selectedAddress = address;
    //  selectedcoodinates=

    //console.log("lng:" + JSON.stringify(this.list[i].geometry.coordinates[0]))
    //console.log("lat:" + JSON.stringify(this.list[i].geometry.coordinates[1]))
    this.lng = JSON.stringify(this.list[i].geometry.coordinates[0]);
    this.lat = JSON.stringify(this.list[i].geometry.coordinates[1]);
    // this.user.coords = [this.lng,this.lat];
    //console.log("index =" + i)
    //console.log(this.selectedAddress)
    // this.user.address = this.selectedAddress;
    this.addresses = [];

    if (this.marker != undefined) {
      this.marker.remove();
    }

    this.marker = new mapboxgl.Marker({
      draggable: true,
      color: "hsl(240, 100%, 60%)",
    })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);

    this.map.flyTo({
      center: [this.lng, this.lat],
      zoom: 15,
      essential: true,
    });

    this.coords = { lng: this.lng, lat: this.lat, address: this.checkAddress };
    this.continue = true;
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  order() {
    if (this.continue) {
      let lngLat = this.marker.getLngLat();
      const lng = lngLat.lng;
      const lat = lngLat.lat;
      this.coords = { lng: lng, lat: lat, address: this.checkAddress };

      const cartItems = this.cartService.getCartItems();
      const cartTotalPrice = this.cartService.getCartPrice();
      const userID = this.loginSerive.getUserID();

      this.orderService.placeOrder(
        userID,
        cartItems,
        cartTotalPrice,
        this.coords
      );
      //this.cartService.clearCart();
      this.dismiss();
      this.presentToast();
    } else {
      this.presentAlert();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Your order was successfull",
      duration: 1500,
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Alert",
      message: "Enter your location!",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      cssClass: "my-error-toast",
      message: "All Card Fields Are Required!",
      duration: 5000,
      position: "top",
    });
    toast.present();
  }

  async presentAlertPrompt() {
    if (this.continue) {
      const alert = await this.alertController.create({
        header: "Card Details",
        inputs: [
          {
            name: "name",
            type: "text",
            id: "name",
            value: this.name,
            placeholder: "Card Holder Name:",
          },
          {
            name: "number",
            type: "text",
            id: "number",
            value: this.number,
            placeholder: "Card Number:",
          },
          {
            name: "date",
            type: "text",
            id: "date",
            value: this.date,
            placeholder: "Expiry Date: mm/yy",
          },
          {
            name: "ccv",
            type: "number",
            id: "ccv",
            value: this.ccv,
            placeholder: "CCV:",
          },
        ],
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {},
          },
          {
            text: "Ok",
            handler: (data) => {
              this.name = data.name;
              this.number = data.number;
              this.date = data.date;
              this.ccv = data.ccv;

              if (
                this.name == "" ||
                this.number == "" ||
                this.date == "" ||
                this.ccv == ""
              ) {
                this.presentErrorToast();
              } else {
                this.order();
              }
            },
          },
        ],
      });

      await alert.present();
    } else {
      this.presentAlert();
    }
  }
}
