import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  constructor() {}

  get(error: any): string {
    return error?.error?.message;
  }
}
