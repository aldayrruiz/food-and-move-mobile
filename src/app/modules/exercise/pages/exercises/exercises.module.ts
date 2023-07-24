import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExercisesPageRoutingModule } from './exercises-routing.module';

import { FoodComponentsModule } from '@modules/food/components/food-componets.module';
import { ComponentsModule } from '@shared/components/components.module';
import { ExercisesPage } from './exercises.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExercisesPageRoutingModule, ComponentsModule, FoodComponentsModule],
  declarations: [ExercisesPage],
})
export class ExercisesPageModule {}
