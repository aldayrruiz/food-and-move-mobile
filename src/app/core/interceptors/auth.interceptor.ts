import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { from, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const jwt = await this.storageService.getToken();
    const { accessToken } = jwt;
    if (accessToken) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
    }
    return await lastValueFrom(next.handle(req));
  }
}
