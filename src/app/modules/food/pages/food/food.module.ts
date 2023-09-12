import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@shared/components/components.module';
import { FoodPageRoutingModule } from './food-routing.module';
import { FoodPage } from './food.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FoodPageRoutingModule, ComponentsModule],
  declarations: [FoodPage],
})
export class MealPageModule {}
