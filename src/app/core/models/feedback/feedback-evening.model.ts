import { FeedbackInput } from '@core/models/feedback/feedback-input.model';

export interface FeedbackEvening {
  _id?: string;
  howHaveYouFeel: FeedbackInput;
  howIsItGoingTheDiet: FeedbackInput;
  howIsItGoingTheExercises: FeedbackInput;
}
