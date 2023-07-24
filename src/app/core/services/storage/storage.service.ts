import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { JWT } from '@core/models/auth/jwt.model';
import { PatientModel } from '@core/models/patient/patient.model';

export const JWT_KEY = 'jwt';
export const USER_KEY = 'user';

@Injectable({ providedIn: 'root' })
export class StorageService {
  async storeUser(user: PatientModel) {
    await this.set(USER_KEY, JSON.stringify(user));
  }

  async getUser(): Promise<PatientModel> {
    const user = await this.get(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  async storeJWT(jwt: JWT) {
    await this.set(JWT_KEY, JSON.stringify(jwt));
  }

  async getJWT(): Promise<JWT> {
    const jwt = await this.get(JWT_KEY);
    return jwt ? JSON.parse(jwt) : null;
  }

  async getToken() {
    const token = await this.get(JWT_KEY);
    return token ? JSON.parse(token) : null;
  }

  async removeAll() {
    return await Preferences.clear();
  }

  private async set(key: string, value: string) {
    return Preferences.set({ key, value });
  }

  private async get(key: string) {
    return Preferences.get({ key }).then((value) => value?.value);
  }
}
