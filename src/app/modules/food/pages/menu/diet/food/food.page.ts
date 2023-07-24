import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodModel } from '@core/models/food/food.model';
import { FoodsService } from '@core/services/api/food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  backHref = '/members/menu/diet';
  meal?: FoodModel;

  constructor(private foodService: FoodsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getMeal();
  }

  getMeal() {
    const foodId = this.route.snapshot.paramMap.get('mealId') || '';
    this.foodService.getById(foodId).subscribe((meal) => (this.meal = meal));
  }
}
