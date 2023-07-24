import { Component, Input } from '@angular/core';
import { FeedbackInput } from '@core/models/feedback/feedback-input.model';

@Component({
  selector: 'app-feedback-input',
  templateUrl: './feedback-input.component.html',
  styleUrls: ['./feedback-input.component.scss'],
})
export class FeedbackInputComponent {
  @Input() question!: string;
  selectedButton!: FeedbackInput;

  constructor() {}

  changeSelection(newSelection: any) {
    this.selectedButton = newSelection;
  }
}
