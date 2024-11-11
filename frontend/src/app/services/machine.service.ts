import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  // Define the API base URL
  private apiUrl = 'http://localhost:8000/api/machine';

  constructor(private http: HttpClient) {}

  // Get all machines
  getMachines(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
