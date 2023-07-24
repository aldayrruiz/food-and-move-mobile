import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateRangeModel } from '@core/models/date/date-range.model';
import { ExerciseModel } from '@core/models/exercise/exercise.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private readonly http: HttpClient) {}

  getById(id: string): Observable<ExerciseModel> {
    return this.http.get<ExerciseModel>(`${environment.api}/moves/${id}`);
  }

  getExercisesByPatientAndDate(id: string, date: DateRangeModel): Observable<ExerciseModel[]> {
    return this.http.post<ExerciseModel[]>(`${environment.api}/moves/findByPatient/${id}`, date);
  }
}
