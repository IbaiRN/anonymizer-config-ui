import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { getmovemodel } from './auth/move/movemodel';
import { catchError, tap,map,filter, switchMap } from 'rxjs/operators';
import { getrefactormodel } from './auth/refactor/refactormodel';
const apiUrl = 'http://localhost:8080/api/ref/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  constructor(private http: HttpClient) {

  }

  refactor(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'rename', data)
      .pipe(
        tap(_ => this.log('refactor')),
        catchError(this.handleError('refactor', []))
      );
  }
  getmove() {
    return this.http.get<getmovemodel[]>(apiUrl + 'getMoves');
  }

  movePath(data: any): Observable<any> {
  return this.http.post<any>(apiUrl + 'move', data)
    .pipe(
      tap(_ => this.log('move')),
      catchError(this.handleError('move', []))
    );

}


  getrefactor() {

    // alert(JSON.stringify(this.http.get(apiUrl + 'getRules')));
    return this.http.get<getrefactormodel[]>(apiUrl + 'getRules');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}
