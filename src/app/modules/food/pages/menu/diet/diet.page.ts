import { Component } from '@angular/core';
import { DateRangeModel } from '@core/models/date/date-range.model';
import { FoodModel } from '@core/models/food/food.model';
import { Meal } from '@core/models/food/meal.model';
import { PatientModel } from '@core/models/patient/patient.model';
import { FoodsService } from '@core/services/api/food.service';
import { StorageService } from '@core/services/storage/storage.service';
import { getDay } from 'date-fns';
import { lastValueFrom } from 'rxjs';

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
    await this.initFoods(startDate, endDate);
  }

  private async initFoods(startDate: Date, endDate: Date) {
    const today = new Date();
    const range: DateRangeModel = { startDate, endDate };
    const currentFoods = await lastValueFrom(this.foodService.getFoodsByPatientAndDate(this.user._id, range));
    const lastFoodsAssigned = await lastValueFrom(this.foodService.getLastAssignedFoods(this.user._id, today.toISOString()));
    const foods = [...currentFoods, ...lastFoodsAssigned];
    const uniqueFoods = foods.reduce((acc: any, food: FoodModel) => {
      acc[food._id] = food;
      return acc;
    }, {});
    const uniqueFoodsArray: FoodModel[] = Object.values(uniqueFoods);
    this.initFoodsPerDay(uniqueFoodsArray);
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
    return foods.filter((food: FoodModel) => food.meal === meal && getDay(new Date(food.date)) === getDay(day));
  }

  private async initUser() {
    this.user = await this.storageService.getUser();
  }
}
