import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';
import { PathDTO } from '../models/path-dto.model';
import { CompradorDTO } from '../models/comprador-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/produto';

  private getAuthHeaders() {
    const token = localStorage.getItem("BaraoAdminTk") || '';
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  public recuperarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/todos`);
  }

  public recuperarPeloId(idProduto: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${idProduto}`);
  }

  public enviarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto, this.getAuthHeaders());
  }

  public atualizarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto, this.getAuthHeaders());
  }

  public uploadFoto(formData: FormData): Observable<PathDTO> {
    // O upload geralmente precisa do Token se a rota for protegida
    return this.http.post<PathDTO>(`${this.apiUrl}/upload`, formData, this.getAuthHeaders());
  }

  public buscarCompradoresDoProduto(idProduto: number): Observable<CompradorDTO[]> {
    return this.http.get<CompradorDTO[]>(`http://localhost:8080/pedido/produto/${idProduto}/compradores`, this.getAuthHeaders());
  }
}
