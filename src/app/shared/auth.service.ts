import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../shared/interfaces';
import { Observable, tap } from 'rxjs';
import { LOCALSTORAGE_LOGIN_ACCESS_TOKEN } from '../app.module';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private static API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Handles Login Auth
   * @param loginRequest LoginRequest holding credentials
   * @returns Post Observable
   */
  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(`${AuthService.API_URL}/login`, loginRequest ).pipe(
      tap((res) => {
        localStorage.setItem(LOCALSTORAGE_LOGIN_ACCESS_TOKEN, res.accessToken)})
    )
  }

  /**
   * Checks if there is an user logged in
   * @returns Whether login present
   */
  isLoggedIn() {
    return !!localStorage.getItem(LOCALSTORAGE_LOGIN_ACCESS_TOKEN)
  }
}
