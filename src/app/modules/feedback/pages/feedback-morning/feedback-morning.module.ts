import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackMorningPageRoutingModule } from './feedback-morning-routing.module';

import { FeedbackComponentsModule } from '@modules/feedback/components/feedback-components.module';
import { ComponentsModule } from '@shared/components/components.module';
import { FeedbackMorningPage } from './feedback-morning.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FeedbackMorningPageRoutingModule, ComponentsModule, FeedbackComponentsModule],
  declarations: [FeedbackMorningPage],
})
export class FeedbackMorningPageModule {}
