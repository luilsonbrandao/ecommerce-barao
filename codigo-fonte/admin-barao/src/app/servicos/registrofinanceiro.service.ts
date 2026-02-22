import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroFinanceiro } from '../models/registro-financeiro.model';
import { ItemFinanceiroDTO } from '../models/item-financeiro-dto.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrofinanceiroService {
  private http = inject(HttpClient);
  private tokenSrv = inject(TokenService);
  private apiUrl =
    'https://interlocutorily-thermonuclear-toshia.ngrok-free.dev/financeiro';

  public gerarRegistroFinanceiro(
    registro: RegistroFinanceiro,
  ): Observable<string> {
    return this.http.post(this.apiUrl, registro, {
      headers: this.tokenSrv.getHeader().headers,
      responseType: 'text',
    });
  }

  public recuperarRegistrosFinanceiros(): Observable<ItemFinanceiroDTO[]> {
    return this.http.get<ItemFinanceiroDTO[]>(
      this.apiUrl,
      this.tokenSrv.getHeader(),
    );
  }

  public alterarStatusItem(
    item: ItemFinanceiroDTO,
  ): Observable<ItemFinanceiroDTO> {
    return this.http.put<ItemFinanceiroDTO>(
      this.apiUrl,
      item,
      this.tokenSrv.getHeader(),
    );
  }
}
