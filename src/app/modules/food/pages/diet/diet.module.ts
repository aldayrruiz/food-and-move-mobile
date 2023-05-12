import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietPageRoutingModule } from './diet-routing.module';

import { ComponentsModule } from '@shared/components/components.module';
import { DietPage } from './diet.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DietPageRoutingModule, ComponentsModule],
  declarations: [DietPage],
})
export class DietPageModule {}
