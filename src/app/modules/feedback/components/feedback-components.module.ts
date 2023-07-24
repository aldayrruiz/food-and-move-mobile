import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeedbackInputComponent } from '@modules/feedback/components/feedback-input/feedback-input.component';

@NgModule({
  declarations: [FeedbackInputComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [FeedbackInputComponent],
})
export class FeedbackComponentsModule {}
