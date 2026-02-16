import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { PaginaProduto } from '../../models/pagina-produto.model';

@Component({
  selector: 'app-destaques',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.css'],
})
export class DestaquesComponent implements OnInit {

  public listaExibida: Produto[] = [];

  // Controle de Paginação
  public pageNumber: number = 0;
  public totalPages: number = 0;

  // Controles visuais para os botões
  public isFirst: boolean = true;
  public isLast: boolean = false;

  private service = inject(ProdutoService);

  ngOnInit(): void {
    this.carregarProdutos(0); 
  }

  public carregarProdutos(pagina: number) {
    this.service.getAllProdutos(pagina).subscribe({
      next: (res: PaginaProduto) => {
        // Extrai os dados do JSON do Spring
        this.listaExibida = res.content;
        this.totalPages = res.totalPages;
        this.pageNumber = res.number;
        this.isFirst = res.first;
        this.isLast = res.last;

        // Scroll suave para o topo ao mudar de página
        const el = document.getElementById('destaque');
        if(el) el.scrollIntoView({ behavior: 'smooth' });
      },
      error: (err) => console.error("Erro ao carregar produtos:", err),
    });
  }

  // Botão Anterior
  public paginaAnterior() {
    if (!this.isFirst) {
      this.carregarProdutos(this.pageNumber - 1);
    }
  }

  // Botão Próximo
  public proximaPagina() {
    if (!this.isLast) {
      this.carregarProdutos(this.pageNumber + 1);
    }
  }
}
