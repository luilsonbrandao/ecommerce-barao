import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http = inject(HttpClient);
  // Ajuste a porta se o seu Java não estiver na 8080
  private apiUrl =
    'https://interlocutorily-thermonuclear-toshia.ngrok-free.dev/cliente';

  public buscarClientePeloTelefone(telefone: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${telefone}`);
  }
}
