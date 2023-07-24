import { Rating } from '../rating.model';
import { Dish } from './dish.model';
import { IngredientModel } from './ingredient.model';
import { Meal } from './meal.model';

export interface FoodModel {
  _id: string;
  patient: string;
  title: string;
  description?: string;
  meal: Meal;
  dish: Dish;
  links: string[];
  videos: string[];
  ingredients: IngredientModel[];
  comments?: string;
  date: string;
  done?: boolean;
  rating: Rating;
  attachment: string;
}
