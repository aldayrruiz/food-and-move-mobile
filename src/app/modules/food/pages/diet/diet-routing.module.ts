import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DietPage } from './diet.page';

const routes: Routes = [
  {
    path: '',
    component: DietPage,
  },
  {
    path: 'food/:foodId',
    loadChildren: () => import('@modules/food/pages/food/food.module').then((m) => m.MealPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietPageRoutingModule {}
