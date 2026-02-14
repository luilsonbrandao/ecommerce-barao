import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model'; // Certifique-se que o caminho está certo

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // 1. Injeção moderna do HttpClient
  private http = inject(HttpClient);

  // 2. URL do seu Back-end Java
  private apiUrl = 'http://localhost:8080/categoria';

  // 3. Método para buscar a lista
  public getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}
