import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';

  // Método auxiliar para montar o Header com o Token
  private getAuthHeaders() {
    // Pegamos o token com o nome atualizado do nosso Admin
    const token = localStorage.getItem("BaraoAdminTk") || '';
    return {
      headers: new HttpHeaders({
        // O Spring Boot geralmente espera a palavra 'Bearer ' antes do token
        'Authorization': `Bearer ${token}`
      })
    };
  }

  public getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categoriabyid`, this.getAuthHeaders());
  }

  public getById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/categoria/${id}`, this.getAuthHeaders());
  }

  public incluirNovaCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/categoria`, categoria, this.getAuthHeaders());
  }

  public atualizarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/categoria`, categoria, this.getAuthHeaders());
  }
}
