import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login/login.service';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  showProfile;
  showHistory;
  historyArr;

  constructor(
    private menuController: MenuController,
    private loginService: LoginService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

  getHistory() {
    const userID = this.loginService.getUserID();
    this.orderService.getOrders(userID).subscribe(item => {
      this.historyArr = item;
    });
  }

  closeMenu() {
    this.menuController.close('customerMenu');
  }

  profile() {
    this.showProfile = true;
    this.showHistory = false;
    this.closeMenu();
  }

  history() {
    this.showHistory = true;
    this.showProfile = false;
    this.getHistory();
    this.closeMenu();
    console.log(this.historyArr);
  }

  test() {
    console.log(this.historyArr);
  }

}
