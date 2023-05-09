import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequestModel } from '@core/models/auth/auth-request.model';
import { AuthResponseModel } from '@core/models/auth/auth-response.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  login(phone: string, password: string) {
    const body: AuthRequestModel = { phone, password };
    return this.http
      .post<AuthResponseModel>(`${environment.apiUrl}/auth/loginPatient`, body)
      .pipe(
        switchMap(async (response: AuthResponseModel) => {
          const user = response.user;
          const token = response.token;
          await this.storageService.storeUser(user);
          await this.storageService.storeToken(token);
          return response;
        })
      );
  }
}
