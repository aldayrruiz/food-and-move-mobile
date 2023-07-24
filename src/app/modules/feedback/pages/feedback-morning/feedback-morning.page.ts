import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientModel } from '@core/models/patient/patient.model';
import { FeedbackService } from '@core/services/api/feedback.service';
import { RouterService } from '@core/services/router/router.service';
import { SnackerService } from '@core/services/view/snacker.service';
import { FeedbackInputComponent } from '@modules/feedback/components/feedback-input/feedback-input.component';

@Component({
  selector: 'app-feedback-morning',
  templateUrl: './feedback-morning.page.html',
  styleUrls: ['./feedback-morning.page.scss'],
})
export class FeedbackMorningPage implements OnInit {
  @ViewChild('howDoYouFeelInput') howDoYouFeelInput!: FeedbackInputComponent;
  user!: PatientModel;
  backHref = '/members/home';

  constructor(private feedbackService: FeedbackService, private routerService: RouterService, private snackerService: SnackerService) {}

  ngOnInit() {}

  async save() {
    const feedback = await this.getFeedback();
    if (!feedback) return;
    this.feedbackService.saveFeedbackMorning(feedback).subscribe({
      next: async () => {
        await this.snackerService.showSuccessful('Feedback enviado con éxito!');
        await this.routerService.goToHome();
      },
      error: async () => {
        await this.snackerService.showFailed('Error al enviar el feedback');
      },
    });
  }

  async getFeedback() {
    const howDoYouFeel = this.howDoYouFeelInput.selectedButton;
    if (!howDoYouFeel) {
      await this.snackerService.showFailed('Por favor, responda todas las preguntas');
      return;
    }
    return { howDoYouFeel };
  }
}
