import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';
import { PaginaProduto } from '../models/pagina-produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private http = inject(HttpClient);

  private apiUrl =
    'https://interlocutorily-thermonuclear-toshia.ngrok-free.dev/produto';

  constructor() {}

  public getAllProdutos(page: number = 0): Observable<PaginaProduto> {
    return this.http.get<PaginaProduto>(`${this.apiUrl}?page=${page}`);
  }

  // Busca por ID (Mantém igual)
  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  buscarPorTermo(termo: string, page: number = 0): Observable<PaginaProduto> {
    return this.http.get<PaginaProduto>(
      `${this.apiUrl}/busca?key=${termo}&page=${page}`,
    );
  }

  public buscarPorCategoria(
    idCategoria: number,
    page: number = 0,
  ): Observable<PaginaProduto> {
    return this.http.get<PaginaProduto>(
      `${this.apiUrl}/categoria/${idCategoria}?page=${page}`,
    );
  }
}
