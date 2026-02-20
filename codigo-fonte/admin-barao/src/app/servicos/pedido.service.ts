import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { FiltroPedidoDTO } from '../models/filtro-pedido-dto.model';
import { VendasPorDataDTO } from '../models/vendas-por-data-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/pedido';

  private getAuthHeaders() {
    const token = localStorage.getItem("BaraoAdminTk") || '';
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  public getAllPedidos(filtro: FiltroPedidoDTO): Observable<Pedido[]> {
    return this.http.post<Pedido[]>(`${this.apiUrl}/filtrar`, filtro, this.getAuthHeaders());
  }

  public alterarStatus(pedido: Pedido, status: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${pedido.idPedido}?status=${status}`, this.getAuthHeaders());
  }

  public recuperarTotaisDaSemana(inicio: string, fim: string): Observable<VendasPorDataDTO[]> {
    return this.http.get<VendasPorDataDTO[]>(`${this.apiUrl}/recentes?inicio=${inicio}&fim=${fim}`, this.getAuthHeaders());
  }

  public atualizarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(this.apiUrl, pedido, this.getAuthHeaders());
  }

  public getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  public getPedidoCompleto(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/detalhes/${id}`, this.getAuthHeaders());
  }
}
