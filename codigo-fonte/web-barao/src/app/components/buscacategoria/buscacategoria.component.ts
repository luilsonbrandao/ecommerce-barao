import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { PaginaProduto } from '../../models/pagina-produto.model'; // Importe isso!

@Component({
  selector: 'app-buscacategoria',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buscacategoria.component.html',
  styleUrls: ['./buscacategoria.component.css']
})
export class BuscacategoriaComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private produtoService = inject(ProdutoService);

  public listaProdutos: Produto[] = [];
  public idCategoria: number = 0;

  // Controle de Paginação
  public paginaAtual: number = 0;
  public totalPaginas: number = 0;
  public carregando: boolean = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idCategoria = Number(params.get('id'));

      if (this.idCategoria) {
        this.paginaAtual = 0; // Reseta ao trocar de categoria
        this.carregarProdutos(0);
      }
    });
  }

  public carregarProdutos(pagina: number) {
    this.carregando = true;
    // Passamos a página para o serviço
    this.produtoService.buscarPorCategoria(this.idCategoria, pagina).subscribe({
      next: (res: PaginaProduto) => {
        // Agora o resultado vem dentro de 'content'
        this.listaProdutos = res.content;
        this.totalPaginas = res.totalPages;
        this.paginaAtual = pagina;
        this.carregando = false;

        // Rolar para o topo suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        console.error("Erro ao buscar categoria", err);
        this.carregando = false;
      }
    });
  }

  // Botões
  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.carregarProdutos(this.paginaAtual + 1);
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 0) {
      this.carregarProdutos(this.paginaAtual - 1);
    }
  }
}
