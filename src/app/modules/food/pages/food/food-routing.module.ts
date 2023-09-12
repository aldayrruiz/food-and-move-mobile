import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FoodResolver } from '@core/resolvers/food.resolver';
import { FoodPage } from './food.page';

const routes: Routes = [
  {
    path: '',
    component: FoodPage,
    resolve: {
      food: FoodResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodPageRoutingModule {}
