import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { PaginaProduto } from '../../models/pagina-produto.model';
import { ProdutoService } from '../../services/produto.service';
import { BuscarprodutobykeyService } from '../../services/buscarprodutobykey.service';

@Component({
  selector: 'app-buscapalavrachave',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buscapalavrachave.component.html',
  styleUrls: ['./buscapalavrachave.component.css']
})
export class BuscapalavrachaveComponent implements OnInit {

  private produtoService = inject(ProdutoService);
  private buscaService = inject(BuscarprodutobykeyService);

  public keyword: string = "";
  public listaProdutos: Produto[] = [];

  // Paginação
  public paginaAtual: number = 0;
  public totalPaginas: number = 0;
  public carregando: boolean = false;

  ngOnInit(): void {
    // Inscreve-se para saber qual é a palavra-chave atual
    this.buscaService.getKeyword().subscribe((termo: string) => {
      this.keyword = termo;

      if (this.keyword) {
        this.paginaAtual = 0; // Nova busca, volta pra página 0
        this.recuperarProdutos(0);
      }
    });
  }

  public recuperarProdutos(pagina: number) {
    this.carregando = true;

    // Chama o serviço de produtos buscando por termo e página
    this.produtoService.buscarPorTermo(this.keyword, pagina).subscribe({
      next: (res: PaginaProduto) => {
        this.listaProdutos = res.content;
        this.totalPaginas = res.totalPages;
        this.paginaAtual = pagina;
        this.carregando = false;

        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        console.error("Erro na busca", err);
        this.carregando = false;
      }
    });
  }

  // Navegação de páginas
  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.recuperarProdutos(this.paginaAtual + 1);
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 0) {
      this.recuperarProdutos(this.paginaAtual - 1);
    }
  }
}
