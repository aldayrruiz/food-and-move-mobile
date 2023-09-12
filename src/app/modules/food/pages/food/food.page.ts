import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodModel } from '@core/models/food/food.model';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  backHref = '/members/menu/diet';
  food!: FoodModel;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.initFood();
  }

  initFood() {
    this.route.data.subscribe((data) => {
      this.food = data['food'];
      console.log(this.food.videos);
    });
  }
}
