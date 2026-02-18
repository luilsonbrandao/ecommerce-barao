import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWTToken } from '../models/JWTToken';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/login';

  public logarUsuario(user: Usuario): Observable<JWTToken> {
    return this.http.post<JWTToken>(this.apiUrl, user);
  }
}
