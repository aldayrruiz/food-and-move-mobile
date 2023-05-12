import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { UserModel } from '@core/models/user/user.model';

export enum Key {
  user = 'user',
  jwt = 'jwt',
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() {}

  async storeUser(user: UserModel) {
    const stringified = JSON.stringify(user);
    return this.store(Key.user, stringified);
  }

  async getUser() {
    const user = await this.get(Key.user);
    return user ? JSON.parse(user) : null;
  }

  async storeToken(token: string) {
    const stringified = JSON.stringify({ accessToken: token });
    return this.store(Key.jwt, stringified);
  }

  async getToken() {
    const token = await this.get(Key.jwt);
    return token ? JSON.parse(token) : null;
  }

  async clearAll() {
    return await Preferences.clear();
  }

  private async store(key: string, value: string) {
    return Preferences.set({ key, value });
  }

  private async get(key: string) {
    return Preferences.get({ key }).then((value) => value?.value);
  }
}
