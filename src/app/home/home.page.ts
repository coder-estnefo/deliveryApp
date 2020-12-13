import { Component } from '@angular/core';
import { ItemService } from '../service/item/item.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  itemList;
  
  constructor(public itemService: ItemService) {
    this.getItems();
  }

  getItems() {
    this.itemService.getHomeItems().subscribe(items => {
      this.itemList = items;
    });
  }

  test() {
    this.getItems();
  }

}
