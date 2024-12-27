import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiBaseUrl } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${apiBaseUrl}api`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }
}
