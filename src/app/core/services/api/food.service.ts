import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateRangeModel } from '@core/models/date/date-range.model';
import { FoodModel } from '@core/models/food/food.model';
import { IngredientModel } from '@core/models/food/ingredient.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  constructor(private readonly http: HttpClient) {}

  getById(id: string): Observable<FoodModel> {
    const url = `${environment.apiUrl}/foods/${id}`;
    return this.http.get<FoodModel>(url);
  }

  getFoodsByPatientAndDate(id: string, date: DateRangeModel): Observable<FoodModel[]> {
    return this.http.post<FoodModel[]>(`${environment.apiUrl}/foods/findByPatient/${id}`, date);
  }

  findIngredients(idPatient: string, date: DateRangeModel) {
    const url = `${environment.apiUrl}/foods/findIngredients/${idPatient}`;
    return this.http.post<IngredientModel[]>(url, date);
  }

  checkIngredient(idFood: string, nameIngredient: string) {
    const url = `${environment.apiUrl}/foods/checkIngredient/${idFood}/${nameIngredient}`;
    return this.http.get<FoodModel>(url);
  }

  // getAttachmentById(idAttachment: string) {
  //   const url = `${environment.apiUrl}/attachments/findOne/${idAttachment}`;
  //   return this.http.get<AttachmentModel>(url);
  // }
}
