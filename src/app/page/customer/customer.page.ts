import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { LoginService } from 'src/app/service/login/login.service';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  showProfile = true;
  showHistory;
  historyArr;
  profileDetails;

  constructor(
    private menuController: MenuController,
    private loginService: LoginService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    // this.auth.user.subscribe(user => {
    //   if(!user) {
    //     this.router.navigate(['/shop/login']);
    //   }
    // });
    this.getProfile();
  }

  getHistory() {
    const userID = this.loginService.getUserID();
    this.orderService.getOrders(userID).subscribe(itemObj => {
      this.historyArr = itemObj;
    });
  }

  getProfile() {
    const userID = this.loginService.getUserID();
    this.customerService.getUserDetails(userID).subscribe(details => {
      this.profileDetails = details;
    })
  }

  closeMenu() {
    this.menuController.close('customerMenu');
  }

  profile() {
    this.showProfile = true;
    this.showHistory = false;
    this.getProfile();
    this.closeMenu();
  }

  history() {
    this.showHistory = true;
    this.showProfile = false;
    this.getHistory();
    this.closeMenu();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/shop/home']);
  }
}
