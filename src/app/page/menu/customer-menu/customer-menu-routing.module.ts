import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerMenuPage } from './customer-menu.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerMenuPageRoutingModule {}
