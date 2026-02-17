import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarprodutobykeyService {
  // BehaviorSubject guarda o último valor emitido. Iniciamos vazio.
  private keywordSource = new BehaviorSubject<string>("");

  constructor() { }

  // Retorna o Subject para que outros possam se inscrever ou emitir novos valores
  public getKeyword() {
    return this.keywordSource;
  }
}
