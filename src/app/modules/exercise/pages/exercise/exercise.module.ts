import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExercisePageRoutingModule } from './exercise-routing.module';

import { ComponentsModule } from '@shared/components/components.module';
import { ExercisePage } from './exercise.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExercisePageRoutingModule, ComponentsModule],
  declarations: [ExercisePage],
})
export class ExercisePageModule {}
