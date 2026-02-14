import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { Produto } from '../../models/produto.model';
import { Pedido } from '../../models/pedido.model';
import { ItemPedido } from '../../models/item-pedido.model';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css']
})
export class ProdutoDetalheComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private produtoService = inject(ProdutoService);
  private carrinhoService = inject(CarrinhoService);

  public produto?: Produto;
  public quantidade: number = 1;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.produtoService.buscarPorId(id).subscribe({
        next: (dado) => this.produto = dado,
        error: (erro) => console.error('Erro:', erro)
      });
    }
  }

  public adicionarCarrinho() {
    if (!this.produto) return;

    let pedido: Pedido;
    const jsonCarrinho = localStorage.getItem("carrinhoBarao");

    // 1. Recupera ou cria o carrinho
    if (jsonCarrinho) {
      pedido = JSON.parse(jsonCarrinho);
    } else {
      pedido = {
        idPedido: 0,
        status: 0,
        valorFrete: 0,
        retirar: 0,
        observacoes: '',
        valorTotal: 0,
        itensPedido: []
      };
    }

    // 2. VERIFICAÇÃO INTELIGENTE: O produto já existe na lista?
    const index = pedido.itensPedido.findIndex(item => item.produto.id === this.produto?.id);

    if (index !== -1) {
      // CASO A: JÁ EXISTE -> Apenas aumenta a quantidade
      pedido.itensPedido[index].qtdeItem = pedido.itensPedido[index].qtdeItem + this.quantidade;

      // Atualiza o preço total daquele item
      pedido.itensPedido[index].precoTotal = pedido.itensPedido[index].qtdeItem * pedido.itensPedido[index].precoUnitario;

    } else {
      // CASO B: NÃO EXISTE -> Cria um novo item na lista
      const novoItem: ItemPedido = {
        qtdeItem: this.quantidade,
        produto: this.produto,
        precoUnitario: this.produto.preco,
        precoTotal: this.produto.preco * this.quantidade
      };

      pedido.itensPedido.push(novoItem);
    }

    // 3. Recalcula o total geral do pedido
    pedido.valorTotal = pedido.itensPedido.reduce((total, item) => total + item.precoTotal, 0);

    // 4. Salva e avisa o Navbar
    localStorage.setItem("carrinhoBarao", JSON.stringify(pedido));
    this.carrinhoService.atualizarContagem();

    // 5. Vai para o carrinho
    this.router.navigate(['/carrinho']);
  }
}
