import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormaPagamento } from '../models/forma-pagamento.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FormapagamentoService {
  private http = inject(HttpClient);
  private tokenSrv = inject(TokenService);
  private apiUrl = 'http://localhost:8080/formaspagamento';

  public recuperarTodasFormasPgto(): Observable<FormaPagamento[]> {
    return this.http.get<FormaPagamento[]>(`${this.apiUrl}?visivel=0`, this.tokenSrv.getHeader());
  }

  public recuperarPeloId(id: number): Observable<FormaPagamento> {
    return this.http.get<FormaPagamento>(`${this.apiUrl}/${id}`, this.tokenSrv.getHeader());
  }

  public inserirNovo(forma: FormaPagamento): Observable<FormaPagamento> {
    return this.http.post<FormaPagamento>(this.apiUrl, forma, this.tokenSrv.getHeader());
  }

  public atualizar(forma: FormaPagamento): Observable<FormaPagamento> {
    return this.http.put<FormaPagamento>(this.apiUrl, forma, this.tokenSrv.getHeader());
  }
}
