import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequestModel } from '@core/models/auth/auth-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private readonly http: HttpClient) { }

  
}
