import { Component } from '@angular/core';
import { DateRangeModel } from '@core/models/date/date-range.model';
import { ExerciseModel } from '@core/models/exercise/exercise.model';
import { PatientModel } from '@core/models/patient/patient.model';
import { ExerciseService } from '@core/services/api/exercise.service';
import { RouterService } from '@core/services/router/router.service';
import { StorageService } from '@core/services/storage/storage.service';
import { getDay } from 'date-fns';
import { lastValueFrom } from 'rxjs';

interface ExerciseDay {
  day: Date;
  exercises: ExerciseModel[];
}

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage {
  user!: PatientModel;
  backHref = '/members/home';

  // Week variables
  selectedDayString!: string;
  exerciseDays: ExerciseDay[] = [];

  private days!: Date[];

  constructor(private storageService: StorageService, private exerciseService: ExerciseService, private routerService: RouterService) {}

  selectedDayChanged(day: string) {
    this.selectedDayString = day;
  }

  async initUI(days: Date[]) {
    this.days = days;
    const startDate = days[0];
    const endDate = days[days.length - 1];
    await this.initUser();
    await this.initExercises(startDate, endDate);
  }

  async goToExercise(exercise: ExerciseModel) {
    await this.routerService.goToExercise(exercise._id);
  }

  private async initExercises(startDate: Date, endDate: Date) {
    const today = new Date();
    const range: DateRangeModel = { startDate, endDate };
    const currentExercises = await lastValueFrom(this.exerciseService.getExercisesByPatientAndDate(this.user._id, range));
    const lastExercisesAssigned = await lastValueFrom(this.exerciseService.getLastAssignedExercises(this.user._id, today.toISOString()));
    const exercises = [...currentExercises, ...lastExercisesAssigned];
    const uniqueFoods = exercises.reduce((acc: any, exercise: ExerciseModel) => {
      acc[exercise._id] = exercise;
      return acc;
    }, {});
    const uniqueExercises: ExerciseModel[] = Object.values(uniqueFoods);
    this.initExercisesPerDay(uniqueExercises);
  }

  private initExercisesPerDay(exercises: ExerciseModel[]) {
    this.days.forEach((day: Date) => {
      const exercisesPerDay: ExerciseModel[] = exercises.filter(
        (exercise: ExerciseModel) => getDay(new Date(exercise.date)) === getDay(day)
      );
      this.exerciseDays.push({ day, exercises: exercisesPerDay });
    });
  }

  private async initUser() {
    this.user = await this.storageService.getUser();
  }
}
