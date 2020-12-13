import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ItemService } from 'src/app/service/item/item.service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  image;
  uploadPercent: Observable<number>;
  itemsList;
  
  addForm;

  showAdd = false;
  showView = true;

  constructor(
    public menuController: MenuController,
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      item: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      img: ['', Validators.required]
    });

    this.getItems();
  }

  openAddItem() {
    this.showAdd = true;
    this.showView = false;
    this.closeMenu();
  }

  openViewItems() {
    this.showView = true;
    this.showAdd = false;
    this.closeMenu();
  }

  closeMenu() {
    this.menuController.close('adminMenu');
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/shop/home']);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filename = file.name;
    const fileExt = filename.split('.').pop();
    const filePath = Math.random().toString(36).substring(2) + '.' + fileExt;
    const fileRef = this.storage.ref(`images/${filePath}`);
    const task = this.storage.upload(`images/${filePath}`, file);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(downloadURL => {
          this.image = downloadURL;
        });
      })
   )
  .subscribe()
  }

  uploadItem(form) {
    let item_no = this.makeItemNo();
    let item_name = form.value.item;
    let item_desc = form.value.description;
    let item_price = form.value.price;
    let item_image = this.image;

    const id = this.firestore.createId();

    this.firestore.collection("items").doc(id).set({
      no: item_no,
      name: item_name,
      description: item_desc,
      price: item_price,
      image: item_image
    }).then(() => {
      //console.log("added");
      alert('Item Added');
      this.router.navigate(['/shop/admin']);
    }).catch(() => {
      //console.log("item no added");
    });

  }

  getItems() {
    this.firestore.collection('items').valueChanges().subscribe(items => {
      this.itemsList = items;
    });
  }

  makeItemNo() {
    let max = 0;

    if(this.itemsList) {
      for (let item in this.itemsList) {
        if (this.itemsList[item]['no'] > max) {
          max = this.itemsList[item]['no']
        }
      }
    }

    return max + 1;

  }

  deleteItem(no, url) {
    this.itemService.deleteItem(no, url);
  }

}
