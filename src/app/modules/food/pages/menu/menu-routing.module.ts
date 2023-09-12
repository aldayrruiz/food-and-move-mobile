import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
  },
  {
    path: 'diet',
    loadChildren: () => import('@modules/food/pages/diet/diet.module').then((m) => m.DietPageModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('@modules/food/pages/shopping-list/shopping-list.module').then((m) => m.ShoppingListPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
