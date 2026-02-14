import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Pedido } from '../../models/pedido.model';
import { ItemPedido } from '../../models/item-pedido.model';
import { CarrinhoService } from '../../services/carrinho.service'; // <--- Importe

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {

  private router = inject(Router);
  private carrinhoService = inject(CarrinhoService); // <--- INJETE AQUI

  public pedido: Pedido = {
    idPedido: 0,
    status: 0,
    valorTotal: 0,
    valorFrete: 0,
    retirar: 0,
    observacoes: '',
    itensPedido: []
  };

  ngOnInit(): void {
    this.carregarDoLocalStorage();
  }

  public carregarDoLocalStorage() {
    const json = localStorage.getItem("carrinhoBarao");
    if (json) {
      this.pedido = JSON.parse(json);
    }
  }

  public removerItem(idProduto: number | undefined) {
    if (!idProduto) return;

    this.pedido.itensPedido = this.pedido.itensPedido.filter(
      (item) => item.produto.id !== idProduto
    );

    this.calcularTotal();

    localStorage.setItem("carrinhoBarao", JSON.stringify(this.pedido));

    // <--- ADICIONE ISSO: Atualiza o contador no topo
    this.carrinhoService.atualizarContagem();
  }

  public calcularTotal() {
    this.pedido.valorTotal = this.pedido.itensPedido.reduce(
      (total, item) => total + item.precoTotal, 0
    );
  }

  public limparCarrinho() {
    localStorage.removeItem("carrinhoBarao");
    this.pedido.itensPedido = [];
    this.pedido.valorTotal = 0;

    // <--- ADICIONE ISSO TAMBÉM: Zera o contador
    this.carrinhoService.atualizarContagem();
  }

  public efetivarCompra() {
    if (this.pedido.itensPedido.length > 0) {
      alert("Indo para o Checkout (Próxima aula!)");
    }
  }
}
