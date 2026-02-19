import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/usuario';

  private getAuthHeaders() {
    const token = localStorage.getItem("BaraoAdminTk") || '';
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  public recuperarTodos(): Observable<Usuario[]> { return this.http.get<Usuario[]>(this.apiUrl, this.getAuthHeaders()); }
  public recuperarPeloId(id: number): Observable<Usuario> { return this.http.get<Usuario>(`${this.apiUrl}/${id}`, this.getAuthHeaders()); }
  public adicionarNovoUsuario(usuario: Usuario): Observable<Usuario> { return this.http.post<Usuario>(this.apiUrl, usuario, this.getAuthHeaders()); }
  public atualizarUsuario(usuario: Usuario): Observable<Usuario> { return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario, this.getAuthHeaders()); }
}
