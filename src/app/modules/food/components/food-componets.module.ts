import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CardMealListComponent } from '@modules/food/components/card-meal-list/card-meal-list.component';

@NgModule({
  declarations: [CardMealListComponent],
  imports: [CommonModule, IonicModule],
  exports: [CardMealListComponent],
})
export class FoodComponentsModule {}
