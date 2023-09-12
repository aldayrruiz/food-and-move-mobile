import { IngredientModel } from '@core/models/food/ingredient.model';

export interface ShoppingListModel {
  _id?: string;
  patient: string;
  date: string;
  ingredients: IngredientModel[];
}
