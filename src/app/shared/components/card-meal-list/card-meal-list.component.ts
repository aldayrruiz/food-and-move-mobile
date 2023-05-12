import { Component, Input, OnInit } from '@angular/core';
import { FoodModel } from '@core/models/food/food.model';
import { RouterService } from '@core/services/router/router.service';

@Component({
  selector: 'app-card-meal-list',
  templateUrl: './card-meal-list.component.html',
  styleUrls: ['./card-meal-list.component.scss'],
})
export class CardMealListComponent implements OnInit {
  @Input() foods?: FoodModel[] = [];
  @Input() title!: string;
  @Input() iconSrc!: string;

  constructor(private routerService: RouterService) {}

  ngOnInit() {}

  goToMeal(food: FoodModel) {
    this.routerService.goToMeal(food._id);
  }
}
