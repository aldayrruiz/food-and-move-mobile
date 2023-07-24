import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackEveningPageRoutingModule } from './feedback-evening-routing.module';

import { FeedbackComponentsModule } from '@modules/feedback/components/feedback-components.module';
import { ComponentsModule } from '@shared/components/components.module';
import { FeedbackEveningPage } from './feedback-evening.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FeedbackEveningPageRoutingModule, FeedbackComponentsModule, ComponentsModule],
  declarations: [FeedbackEveningPage],
})
export class FeedbackEveningPageModule {}
