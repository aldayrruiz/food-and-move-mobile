import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '@shared/components/components.module';
import { MealPageRoutingModule } from './meal-routing.module';
import { MealPage } from './meal.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MealPageRoutingModule, ComponentsModule],
  declarations: [MealPage],
})
export class MealPageModule {}
