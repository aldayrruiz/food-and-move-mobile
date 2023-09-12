import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FoodModel } from '@core/models/food/food.model';
import { FoodsService } from '@core/services/api/food.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodResolver implements Resolve<FoodModel> {
  constructor(private foodService: FoodsService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FoodModel> {
    const foodId = route.paramMap.get('foodId') || '';
    return this.foodService.getById(foodId);
  }
}
