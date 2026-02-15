import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Frete } from '../models/frete.model';

@Injectable({ providedIn: 'root' })
export class FreteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/fretes';

  public recuperarPorPrefixo(prefixo: string): Observable<Frete> {
    // Tenta buscar do back-end. Se der erro no componente, ele trata.
    return this.http.get<Frete>(`${this.apiUrl}/prefixo/${prefixo}`);
  }
}
