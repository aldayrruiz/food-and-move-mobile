import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { RouterService } from '@core/services/router/router.service';
import { StorageService } from '@core/services/storage/storage.service';

@Injectable({ providedIn: 'root' })
export class CanGoToMembers implements CanLoad {
  constructor(private storageService: StorageService, private routerService: RouterService) {}

  async canLoad() {
    const jwt = await this.storageService.getJWT();
    if (!jwt) {
      await this.routerService.goToLogin();
      return false;
    }
    return true;
  }
}
