import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  // 1. lista fora para todos os métodos acessarem (simulando um banco de dados)
  private listaProdutosFake: Produto[] = [
    { id: 1, nome: 'Lavagem Simples', preco: 35.00, descricao: 'Lavagem externa completa', imagemUrl: 'assets/carro1.jpg' },
    { id: 2, nome: 'Lavagem Premium', preco: 50.00, descricao: 'Inclui cera e aspiração', imagemUrl: 'assets/carro2.jpg' },
    { id: 3, nome: 'Polimento', preco: 120.00, descricao: 'Revitalização da pintura', imagemUrl: 'assets/carro3.jpg' },
    { id: 4, nome: 'Higienização', preco: 80.00, descricao: 'Limpeza profunda de bancos', imagemUrl: 'assets/carro4.jpg' },
  ];

  constructor() { }

  // 2. A Home chama este método
  listarTodos(): Observable<Produto[]> {
    return of(this.listaProdutosFake);
  }

  // 3. A Página de Detalhes chama este novo método.
  buscarPorId(id: number): Observable<Produto | undefined> {
    const produtoEncontrado = this.listaProdutosFake.find(p => p.id === id);
    return of(produtoEncontrado);
  }
}
