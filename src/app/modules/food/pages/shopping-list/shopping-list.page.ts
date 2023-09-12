import { Component, OnInit } from '@angular/core';
import { FoodModel } from '@core/models/food/food.model';
import { IngredientModel } from '@core/models/food/ingredient.model';
import { PatientModel } from '@core/models/patient/patient.model';
import { ShoppingListModel } from '@core/models/shopping-list/shopping-list.model';
import { FoodsService } from '@core/services/api/food.service';
import { ShoppingListService } from '@core/services/api/shopping-list.service';
import { StorageService } from '@core/services/storage/storage.service';
import { addWeeks, endOfWeek, startOfWeek, subWeeks } from 'date-fns';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  backHref = '/members/menu';
  date = startOfWeek(new Date(), { weekStartsOn: 1 });
  patient!: PatientModel;
  shoppingList!: ShoppingListModel;

  constructor(
    private foodsService: FoodsService,
    private storageService: StorageService,
    private shoppingListService: ShoppingListService
  ) {}

  async ngOnInit() {
    this.patient = await this.storageService.getUser();
    await this.initShoppingList();
  }

  private async initShoppingList() {
    this.shoppingListService.findByPatientAndDate(this.patient._id, this.date.toJSON()).subscribe({
      next: (shoppingList) => {
        this.shoppingList = shoppingList.ingredients;
      },
      error: async () => {
        await this.loadShoppingList();
      },
    });
  }

  async loadShoppingList() {
    const limitDate = endOfWeek(this.date, { weekStartsOn: 1 }).toJSON();
    this.foodsService.getLastAssignedFoods(this.patient._id, limitDate).subscribe({
      next: (foods) => {
        const ingredients = this.extractIngredients(foods);
        const ingredientsMap = this.groupIngredients(ingredients);
        const unifiedIngredientsMap = this.unifyUnits(ingredientsMap);
        this.shoppingList = this.getShoppingList(unifiedIngredientsMap);
        console.log('Shopping List loaded', this.shoppingList);
      },
      error: () => {},
    });
  }

  onCheckBoxChanged(event: any, ingredient: IngredientModel) {
    ingredient.isChecked = event.target.checked;
    if (!this.shoppingList._id) {
      this.shoppingListService.create(this.shoppingList).subscribe({
        next: (shoppingList) => {
          this.shoppingList = shoppingList;
          console.log('Shopping list created', this.shoppingList);
        },
        error: () => {},
      });
    } else {
      this.shoppingListService.update(this.shoppingList._id, ingredient._id, ingredient.isChecked).subscribe({
        next: (shoppingList) => {
          this.shoppingList = shoppingList;
          console.log('Shopping list updated', this.shoppingList);
        },
        error: () => {},
      });
    }
  }

  async previousWeek() {
    this.date = subWeeks(this.date, 1);
    await this.initShoppingList();
  }

  async nextWeek() {
    this.date = addWeeks(this.date, 1);
    await this.initShoppingList();
  }

  isNextWeekDisabled() {
    const limitDate = addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), 1);
    return this.date >= limitDate;
  }

  isCheckboxDisabled() {
    const limitDate = subWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), 1);
    return this.date <= limitDate;
  }

  private extractIngredients(foods: FoodModel[]) {
    let ingredients: IngredientModel[] = [];
    foods.forEach((food) => {
      ingredients = [...ingredients, ...food.ingredients];
    });
    return ingredients;
  }

  /**
   /* Put ingredients into something like {
   Azucar: [{ name: 'Azucar', quantity: 1, unit: 'kg' }],
   Leche: [{ name: 'Leche', quantity: 1, unit: 'l' }]
   }
   * @param ingredients array of ingredients
   */
  private groupIngredients(ingredients: IngredientModel[]) {
    let ingredientsMap: Map<string, IngredientModel[]> = new Map();
    ingredients.forEach((ingredient) => {
      if (ingredientsMap.has(ingredient.name)) {
        // @ts-ignore
        ingredientsMap.get(ingredient.name).push(ingredient);
      } else {
        ingredientsMap.set(ingredient.name, [ingredient]);
      }
    });
    return ingredientsMap;
  }

  private unifyUnits(ingredientsMap: Map<string, IngredientModel[]>) {
    let unifiedIngredientsMap: Map<string, IngredientModel[]> = new Map();
    ingredientsMap.forEach((ingredients: IngredientModel[], key) => {
      let unifiedIngredients: IngredientModel[] = ingredients.map((ingredient: IngredientModel) => {
        if (ingredient.unit === 'kg' || ingredient.unit === 'Cucharadas' || ingredient.unit === 'Cucharaditas') {
          this.unifyToGrams(ingredient);
        }
        if (ingredient.unit === 'l' || ingredient.unit === 'Tazas') {
          this.unifyToMilliliters(ingredient);
        }
        return ingredient;
      });
      unifiedIngredientsMap.set(key, unifiedIngredients);
    });
    return unifiedIngredientsMap;
  }

  private unifyToGrams(ingredient: IngredientModel) {
    if (ingredient.unit === 'kg') {
      ingredient.unit = 'g';
      ingredient.quantity *= 1000;
    }
    if (ingredient.unit === 'Cucharadas') {
      ingredient.unit = 'g';
      ingredient.quantity *= 15;
    }
    if (ingredient.unit === 'Cucharaditas') {
      ingredient.unit = 'g';
      ingredient.quantity *= 5;
    }
  }

  private unifyToMilliliters(ingredient: IngredientModel) {
    if (ingredient.unit === 'l') {
      ingredient.unit = 'ml';
      ingredient.quantity *= 1000;
    }
    if (ingredient.unit === 'Tazas') {
      ingredient.unit = 'ml';
      ingredient.quantity *= 250;
    }
  }

  private getShoppingList(unifiedIngredientsMap: Map<string, IngredientModel[]>): ShoppingListModel {
    let ingredients: IngredientModel[] = [];
    unifiedIngredientsMap.forEach((ingredientList: IngredientModel[]) => {
      const ingredient = ingredientList[0];
      const quantity = ingredientList.reduce((prev, current) => prev + current.quantity, 0);
      ingredients.push({ ...ingredient, name: ingredient.name, quantity, unit: ingredient.unit });
    });
    return { patient: this.patient._id, date: this.date.toJSON(), ingredients };
  }
}
