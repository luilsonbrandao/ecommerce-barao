import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnderecoCEP } from '../models/endereco-cep.model';

@Injectable({ providedIn: 'root' })
export class BuscarcepService {
  private http = inject(HttpClient);

  public buscarCEP(cep: string): Observable<EnderecoCEP> {
    return this.http.get<EnderecoCEP>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
