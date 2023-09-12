import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private readonly http: HttpClient) {}

  findByPatientAndDate(patientId: string, date: string) {
    return this.http.get<any>(`${environment.api}/shoppingLists/findByPatientAndDate?patientId=${patientId}&date=${date}`);
  }

  create(createShoppingListDto: any) {
    return this.http.post<any>(`${environment.api}/shoppingLists`, createShoppingListDto);
  }

  update(shoppingListId: string, ingredientId: any, checked: boolean) {
    return this.http.put<any>(`${environment.api}/shoppingLists/${shoppingListId}`, { ingredientId, checked });
  }
}
