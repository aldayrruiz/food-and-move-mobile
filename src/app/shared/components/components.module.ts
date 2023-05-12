import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BigButtonIconComponent } from './big-button-icon/big-button-icon.component';
import { CardMealListComponent } from './card-meal-list/card-meal-list.component';
import { MotivationalPhraseComponent } from './motivational-phrase/motivational-phrase.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [BigButtonIconComponent, ToolbarComponent, MotivationalPhraseComponent, CardMealListComponent],
  imports: [CommonModule, IonicModule],
  exports: [BigButtonIconComponent, ToolbarComponent, MotivationalPhraseComponent, CardMealListComponent],
})
export class ComponentsModule {}
