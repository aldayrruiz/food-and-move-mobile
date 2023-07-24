import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT } from '@core/models/auth/jwt.model';
import { PatientsService } from '@core/services/api/patients.service';
import { RouterService } from '@core/services/router/router.service';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private storageService: StorageService,
    private routerService: RouterService,
    private http: HttpClient,
    private patientService: PatientsService
  ) {}

  signIn(phone: string, password: string) {
    return this.http.post<JWT>(`${environment.api}/auth/patient/signIn`, { phone, password });
  }

  async logout() {
    await this.storageService.removeAll();
    await this.routerService.goToLogin();
  }

  async refreshToken() {
    const jwt = await this.storageService.getJWT();
    const refreshToken = jwt.refreshToken;
    const headers = { Authorization: `Bearer ${refreshToken}` };
    return this.http.get<JWT>(`${environment.api}/auth/patient/refresh`, { headers });
  }

  getPayloadFromJwt(jwtToken: string) {
    const parts = jwtToken.split('.');
    const payload = window.atob(parts[1]);
    return JSON.parse(payload);
  }

  async storeImportantVariables(jwt: JWT) {
    // Store JWT
    await this.storageService.storeJWT(jwt);

    // Get and store user
    const userId = this.getPayloadFromJwt(jwt.accessToken).sub;
    const user = await lastValueFrom(this.patientService.getPatient(userId));
    await this.storageService.storeUser(user);
  }
}
