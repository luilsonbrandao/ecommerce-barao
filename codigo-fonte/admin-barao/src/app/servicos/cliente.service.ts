import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/cliente';

  private getAuthHeaders() {
    const token = localStorage.getItem("BaraoAdminTk") || '';
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  public buscarTodos(): Observable<Cliente[]> { return this.http.get<Cliente[]>(this.apiUrl, this.getAuthHeaders()); }
  public buscarPorLetra(letra: string): Observable<Cliente[]> { return this.http.get<Cliente[]>(`${this.apiUrl}/nome/${letra}`, this.getAuthHeaders()); }
  public buscarPorPalavraChave(keyword: string): Observable<Cliente[]> { return this.http.get<Cliente[]>(`${this.apiUrl}/busca/${keyword}`, this.getAuthHeaders()); }
  public buscarAniversariantes(mes: number): Observable<Cliente[]> { return this.http.get<Cliente[]>(`${this.apiUrl}/aniversario/${mes}`, this.getAuthHeaders()); }

  public adicionarNovo(cliente: Cliente): Observable<Cliente> { return this.http.post<Cliente>(this.apiUrl, cliente, this.getAuthHeaders()); }
  public atualizarDados(cliente: Cliente): Observable<Cliente> { return this.http.put<Cliente>(this.apiUrl, cliente, this.getAuthHeaders()); }
}
