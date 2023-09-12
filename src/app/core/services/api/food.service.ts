import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttachmentModel } from '@core/models/attachment/attachment.model';
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
    const url = `${environment.api}/foods/${id}`;
    return this.http.get<FoodModel>(url);
  }

  getFoodsByPatientAndDate(id: string, dateRange: DateRangeModel): Observable<FoodModel[]> {
    return this.http.post<FoodModel[]>(`${environment.api}/foods/findByPatient/${id}`, dateRange);
  }

  findIngredients(idPatient: string, date: DateRangeModel) {
    const url = `${environment.api}/foods/findIngredients/${idPatient}`;
    return this.http.post<IngredientModel[]>(url, date);
  }

  checkIngredient(idFood: string, nameIngredient: string) {
    const url = `${environment.api}/foods/checkIngredient/${idFood}/${nameIngredient}`;
    return this.http.get<FoodModel>(url);
  }

  getLastAssignedFoods(patientId: string, limitDate: string) {
    const params = new HttpParams().set('limitDate', limitDate);
    const url = `${environment.api}/foods/lastAssigned/${patientId}`;
    return this.http.get<FoodModel[]>(url, { params });
  }

  getAttachmentById(idAttachment: string) {
    const url = `${environment.api}/attachments/findOne/${idAttachment}`;
    return this.http.get<AttachmentModel>(url);
  }
}
