import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/pedido';

  public inserirNovoPedido(novoPedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, novoPedido);
  }
}
