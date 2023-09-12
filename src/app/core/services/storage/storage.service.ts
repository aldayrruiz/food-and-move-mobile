import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { JWT } from '@core/models/auth/jwt.model';
import { PatientModel } from '@core/models/patient/patient.model';

export const JWT_KEY = 'jwt';
export const USER_KEY = 'user';
export const REMEMBER_KEY = 'remember';

export interface RememberPhone {
  phone: string;
  choice: boolean;
}

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

  async storeRememberPhone(rememberPhone: RememberPhone) {
    await this.set(REMEMBER_KEY, JSON.stringify(rememberPhone));
  }

  async getRememberPhone(): Promise<RememberPhone> {
    const rememberPhone = await this.get(REMEMBER_KEY);
    return rememberPhone ? JSON.parse(rememberPhone) : null;
  }

  async removeAll() {
    return await Preferences.clear();
  }

  async removeAuthRelated() {
    await this.removeJWT();
    await this.removeUser();
  }

  async removeJWT() {
    return await Preferences.remove({ key: JWT_KEY });
  }

  async removeUser() {
    return await Preferences.remove({ key: USER_KEY });
  }

  async removeRememberPhone() {
    return await Preferences.remove({ key: REMEMBER_KEY });
  }

  private async set(key: string, value: string) {
    return Preferences.set({ key, value });
  }

  private async get(key: string) {
    return Preferences.get({ key }).then((value) => value?.value);
  }
}
