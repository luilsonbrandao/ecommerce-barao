import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private http = inject(HttpClient);
  private apiUrl =
    'https://interlocutorily-thermonuclear-toshia.ngrok-free.dev/pedido';

  public inserirNovoPedido(novoPedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, novoPedido);
  }

  // Mudança de parametro de (id: number) para (uuid: string)
  public buscarPorUuid(uuid: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/search/${uuid}`);
  }
}
