import { Component } from '@angular/core';
import { DateRangeModel } from '@core/models/date/date-range.model';
import { ExerciseModel } from '@core/models/exercise/exercise.model';
import { PatientModel } from '@core/models/patient/patient.model';
import { ExerciseService } from '@core/services/api/exercise.service';
import { RouterService } from '@core/services/router/router.service';
import { StorageService } from '@core/services/storage/storage.service';
import { isSameDay } from 'date-fns';

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
    this.initExercises(startDate, endDate);
  }

  async goToExercise(exercise: ExerciseModel) {
    await this.routerService.goToExercise(exercise._id);
  }

  private initExercises(startDate: Date, endDate: Date) {
    const range: DateRangeModel = { startDate, endDate };
    this.exerciseService.getExercisesByPatientAndDate(this.user._id, range).subscribe({
      next: (exercises: ExerciseModel[]): void => {
        this.initExercisesPerDay(exercises);
      },
    });
  }

  private initExercisesPerDay(exercises: ExerciseModel[]) {
    this.days.forEach((day: Date) => {
      console.log(day);
      const exercisesPerDay: ExerciseModel[] = exercises.filter((exercise: ExerciseModel) => isSameDay(new Date(exercise.date), day));
      this.exerciseDays.push({ day, exercises: exercisesPerDay });
    });
  }

  private async initUser() {
    this.user = await this.storageService.getUser();
  }
}
