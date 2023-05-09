import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RouterService } from '@core/services/router/router.service';
import { StorageService } from '@core/services/storage/storage.service';

@Injectable({ providedIn: 'root' })
export class CanGoToMembers implements CanLoad {
  constructor(
    private storageService: StorageService,
    private routerService: RouterService
  ) {}

  async canLoad() {
    const jwt = await this.storageService.getToken();
    if (!jwt) {
      await this.routerService.goToLogin();
      return false;
    }
    return true;
  }
}
