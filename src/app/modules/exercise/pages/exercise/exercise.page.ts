import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AttachmentModel } from '@core/models/attachment/attachment.model';
import { ExerciseModel } from '@core/models/exercise/exercise.model';
import { ExerciseService } from '@core/services/api/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  backHref = '/members/exercises';
  exercise!: ExerciseModel;
  pdfUrl: any;
  attachment!: AttachmentModel;

  constructor(private exerciseService: ExerciseService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getExercise();
  }

  getExercise() {
    const exerciseId = this.route.snapshot.paramMap.get('exerciseId') || '';
    this.exerciseService.getById(exerciseId).subscribe((exercise) => {
      this.exercise = exercise;
      this.initPdfUrl();
    });
  }

  initPdfUrl() {
    this.exerciseService.getAttachmentById(this.exercise.attachment).subscribe({
      next: (res: AttachmentModel) => {
        this.attachment = res;
        try {
          const pdfUrl = `https://foodandmove.app.bluece.eu/api/files/attachment/${this.attachment.filename}`;
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(encodeURI(pdfUrl));
        } catch (error) {
          console.log(error);
        }
      },
      error: (err: any) => {},
    });
  }
}
