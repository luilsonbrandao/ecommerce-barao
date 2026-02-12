import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  // injeta dependências no Angular 17+
  private http = inject(HttpClient);

  // URL da sua API Java 
  private apiUrl = 'http://localhost:8080/produtos';

  constructor() { }

  // Buscar todos os produtos para a Home
  listarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  // Buscar um produto específico para a Página de Detalhes
  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }
}
