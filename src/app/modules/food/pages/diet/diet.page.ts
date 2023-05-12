import { Component, OnInit } from '@angular/core';
import { DateRangeModel } from '@core/models/date/date-range.model';
import { FoodModel } from '@core/models/food/food.model';
import { Meal } from '@core/models/food/meal.model';
import { UserModel } from '@core/models/user/user.model';
import { FoodsService } from '@core/services/api/food.service';
import { StorageService } from '@core/services/storage/storage.service';
import { eachDayOfInterval, lastDayOfWeek, startOfToday, startOfWeek } from 'date-fns';

interface FoodDay {
  day?: Date;
  breakfasts?: FoodModel[];
  lunches?: FoodModel[];
  snacks?: FoodModel[];
  dinners?: FoodModel[];
}

@Component({
  selector: 'app-diet',
  templateUrl: './diet.page.html',
  styleUrls: ['./diet.page.scss'],
})
export class DietPage implements OnInit {
  user!: UserModel;
  backHref = '/members/menu';

  // Week variables
  days!: Date[];
  selectedDayString!: string;
  foodDays: FoodDay[] = [];

  // Date variables
  private firstDay!: Date;
  private lastDay!: Date;

  constructor(private foodService: FoodsService, private storageService: StorageService) {
    this.initDaysOfTheWeek();
  }

  async ngOnInit() {
    this.user = await this.storageService.getUser();
    this.initFoods();
  }

  private async initFoods() {
    const range: DateRangeModel = { startDate: this.firstDay, endDate: this.lastDay };
    this.foodService.getFoodsByPatientAndDate(this.user._id, range).subscribe((foods) => {
      this.initFoodsPerDay(foods);
    });
  }

  private initFoodsPerDay(foods: FoodModel[]) {
    this.days.forEach((day) => {
      const foodDay: FoodDay = { day };
      foodDay.breakfasts = this.getMealsByDay(foods, Meal.Desayuno, day);
      foodDay.lunches = this.getMealsByDay(foods, Meal.Almuerzo, day);
      foodDay.snacks = this.getMealsByDay(foods, Meal.Merienda, day);
      foodDay.dinners = this.getMealsByDay(foods, Meal.Cena, day);
      this.foodDays.push(foodDay);
    });
  }

  private getMealsByDay(foods: FoodModel[], meal: Meal, day: Date) {
    const dayUTC = day.toJSON();
    return foods.filter((food) => food.meal === meal && food.date == dayUTC);
  }

  private initDaysOfTheWeek() {
    const today = startOfToday();
    this.selectedDayString = today.toJSON();
    this.firstDay = startOfWeek(today, { weekStartsOn: 1 });
    this.lastDay = lastDayOfWeek(today, { weekStartsOn: 1 });
    this.days = eachDayOfInterval({ start: this.firstDay, end: this.lastDay });
  }
}
