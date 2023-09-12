import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingListPageRoutingModule } from './shopping-list-routing.module';

import { ComponentsModule } from '@shared/components/components.module';
import { ShoppingListPage } from './shopping-list.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ShoppingListPageRoutingModule, ComponentsModule],
  declarations: [ShoppingListPage],
})
export class ShoppingListPageModule {}
