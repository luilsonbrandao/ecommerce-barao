import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  // O BehaviorSubject guarda o estado e emite para quem estiver ouvindo
  private numberOfItens = new BehaviorSubject<number>(0);

  constructor() {
    // A MÁGICA: Assim que o serviço nasce, ele verifica se já tem coisas salvas
    this.atualizarContagem();
  }

  // Retorna o Observable para o Navbar se inscrever
  public getNumberOfItems() {
    return this.numberOfItens;
  }

  // Método novo que vamos chamar sempre que mexer no carrinho
  public atualizarContagem() {
    const json = localStorage.getItem("carrinhoBarao");

    if (json) {
      const pedido: Pedido = JSON.parse(json);
      // Atualiza o número com a quantidade de itens na lista
      this.numberOfItens.next(pedido.itensPedido.length);
    } else {
      this.numberOfItens.next(0);
    }
  }
}
