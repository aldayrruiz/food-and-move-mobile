import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '@shared/components/components.module';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MenuPageRoutingModule, ComponentsModule],
  declarations: [MenuPage],
})
export class MenuPageModule {}
