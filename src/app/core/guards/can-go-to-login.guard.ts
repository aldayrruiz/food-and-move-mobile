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
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanGoToLoginGuard implements CanLoad {
  constructor(
    private storageService: StorageService,
    private routerService: RouterService
  ) {}

  async canLoad(): Promise<boolean | UrlTree> {
    const jwt = await this.storageService.getToken();
    if (jwt) {
      await this.routerService.goToHome();
      return false;
    }
    return true;
  }
}