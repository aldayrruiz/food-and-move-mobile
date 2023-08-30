import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseModel } from '@core/models/exercise/exercise.model';
import { ExerciseService } from '@core/services/api/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  backHref = '/members/exercises';
  exercise?: ExerciseModel;
  youtubeVideosIds: string[] = [];

  constructor(private exerciseService: ExerciseService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getExercise();
  }

  getExercise() {
    const exerciseId = this.route.snapshot.paramMap.get('exerciseId') || '';
    this.exerciseService.getById(exerciseId).subscribe((exercise) => {
      this.exercise = exercise;
      this.initYoutubeVideosIds();
    });
  }

  private initYoutubeVideosIds() {
    this.exercise?.videos?.forEach((link) => {
      // creo que es videos y no links
      this.youtubeVideosIds.push(this.getYoutubeVideoId(link));
    });
  }

  private getYoutubeVideoId(link: string) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
    const matches = regex.exec(link);
    return matches ? matches[1] : '';
  }
}
