import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Frete } from '../models/frete.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class FreteService {
  private http = inject(HttpClient);
  private tokenSrv = inject(TokenService);
  private apiUrl =
    'https://interlocutorily-thermonuclear-toshia.ngrok-free.dev/fretes';

  public recuperarTodos(): Observable<Frete[]> {
    return this.http.get<Frete[]>(this.apiUrl, this.tokenSrv.getHeader());
  }

  public recuperarPeloId(id: number): Observable<Frete> {
    return this.http.get<Frete>(
      `${this.apiUrl}/${id}`,
      this.tokenSrv.getHeader(),
    );
  }

  public inserirFrete(frete: Frete): Observable<Frete> {
    return this.http.post<Frete>(this.apiUrl, frete, this.tokenSrv.getHeader());
  }

  public atualizarFrete(frete: Frete): Observable<Frete> {
    return this.http.put<Frete>(this.apiUrl, frete, this.tokenSrv.getHeader());
  }
}
