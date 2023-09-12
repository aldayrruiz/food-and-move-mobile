export interface IngredientModel {
  _id?: string;
  title: string;
  food: string;
  name: string;
  date: Date;
  quantity: number;
  unit?: string;
  isChecked: boolean;
}
