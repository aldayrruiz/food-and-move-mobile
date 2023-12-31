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
  exercise!: ExerciseModel;

  constructor(private exerciseService: ExerciseService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getExercise();
  }

  getExercise() {
    const exerciseId = this.route.snapshot.paramMap.get('exerciseId') || '';
    this.exerciseService.getById(exerciseId).subscribe((exercise) => {
      this.exercise = exercise;
    });
  }
}
