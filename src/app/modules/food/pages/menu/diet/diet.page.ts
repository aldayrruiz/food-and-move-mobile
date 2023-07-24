import { Component } from '@angular/core';
import { DateRangeModel } from '@core/models/date/date-range.model';
import { FoodModel } from '@core/models/food/food.model';
import { Meal } from '@core/models/food/meal.model';
import { PatientModel } from '@core/models/patient/patient.model';
import { FoodsService } from '@core/services/api/food.service';
import { StorageService } from '@core/services/storage/storage.service';
import { isSameDay } from 'date-fns';

interface FoodDay {
  day: Date;
  breakfasts: FoodModel[];
  lunches: FoodModel[];
  snacks: FoodModel[];
  dinners: FoodModel[];
}

@Component({
  selector: 'app-diet',
  templateUrl: './diet.page.html',
  styleUrls: ['./diet.page.scss'],
})
export class DietPage {
  user!: PatientModel;
  backHref = '/members/menu';

  // Week variables
  selectedDayString!: string;
  foodDays: FoodDay[] = [];

  private days!: Date[];

  constructor(private foodService: FoodsService, private storageService: StorageService) {}

  selectedDayChanged(day: string) {
    this.selectedDayString = day;
  }

  async initUI(days: Date[]) {
    this.days = days;
    const startDate = days[0];
    const endDate = days[days.length - 1];
    await this.initUser();
    this.initFoods(startDate, endDate);
  }

  private initFoods(startDate: Date, endDate: Date) {
    const range: DateRangeModel = { startDate, endDate };
    this.foodService.getFoodsByPatientAndDate(this.user._id, range).subscribe({
      next: (foods: FoodModel[]): void => {
        this.initFoodsPerDay(foods);
      },
    });
  }

  private initFoodsPerDay(foods: FoodModel[]) {
    this.days.forEach((day: Date) => {
      const breakfasts: FoodModel[] = this.getMealsByDay(foods, Meal.Desayuno, day);
      const lunches: FoodModel[] = this.getMealsByDay(foods, Meal.Almuerzo, day);
      const snacks: FoodModel[] = this.getMealsByDay(foods, Meal.Merienda, day);
      const dinners: FoodModel[] = this.getMealsByDay(foods, Meal.Cena, day);
      const foodDay: FoodDay = { day, breakfasts, lunches, snacks, dinners };
      this.foodDays.push(foodDay);
    });
  }

  private getMealsByDay(foods: FoodModel[], meal: Meal, day: Date): FoodModel[] {
    return foods.filter((food: FoodModel) => food.meal === meal && isSameDay(new Date(food.date), day));
  }

  private async initUser() {
    this.user = await this.storageService.getUser();
  }
}
