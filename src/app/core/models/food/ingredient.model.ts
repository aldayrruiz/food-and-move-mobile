export interface IngredientModel {
  title: string;
  food: string;
  name: string;
  date: Date;
  quantity?: number;
  unit?: string;
  isChecked: boolean;
}
