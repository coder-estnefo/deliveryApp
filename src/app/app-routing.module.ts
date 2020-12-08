import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { ShopPage } from './page/shop/shop.page';

const routes: Routes = [
 
  {
    // path: '',
    // redirectTo: 'home',
    // pathMatch: 'full'
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  {
    path: 'shop',
    component: ShopPage,
    children: [
      {
        path: 'register',
        loadChildren: () => import('./page/register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: 'items',
        loadChildren: () => import('./page/items/items.module').then( m => m.ItemsPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./page/cart/cart.module').then( m => m.CartPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./modal/order/order.module').then( m => m.OrderPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./page/customer/customer.module').then( m => m.CustomerPageModule)
      },
    ]
  },  {
    path: 'customer-menu',
    loadChildren: () => import('./page/menu/customer-menu/customer-menu.module').then( m => m.CustomerMenuPageModule)
  },

  

  // {
  //   path: 'shop',
  //   loadChildren: () => import('./page/shop/shop.module').then( m => m.ShopPageModule)
  // },


  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
