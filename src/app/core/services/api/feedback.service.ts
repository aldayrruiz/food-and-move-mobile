import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedbackEvening } from '@core/models/feedback/feedback-evening.model';
import { FeedbackMorning } from '@core/models/feedback/feedback-morning.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private readonly http: HttpClient) {}

  saveFeedbackMorning(feedback: FeedbackMorning): Observable<FeedbackMorning> {
    return this.http.put<FeedbackMorning>(`${environment.api}/feedback/`, feedback);
  }

  saveFeedbackEvening(feedback: FeedbackEvening): Observable<FeedbackEvening> {
    return this.http.put<FeedbackEvening>(`${environment.api}/feedback/`, feedback);
  }
}
