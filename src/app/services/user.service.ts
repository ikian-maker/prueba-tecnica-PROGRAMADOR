import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl = environment.endpoint;  // URL base del backend
  private myApiUrl = 'api/users';  // Endpoint de la API

  // Inyectar HttpClient correctamente en el constructor
  constructor(private http: HttpClient) {}

  // Método para enviar una petición POST al backend
  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }


  login(user: User): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
}
}

