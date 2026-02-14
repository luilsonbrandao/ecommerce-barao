import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-destaques',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.css'],
})
export class DestaquesComponent implements OnInit {
  // Armazena TODOS os produtos que vieram do banco
  private todosProdutos: Produto[] = [];

  // Armazena apenas os produtos da PÁGINA ATUAL (ex: apenas 4)
  public listaExibida: Produto[] = [];

  public pageNumber: number = 1;
  public totalPages: number = 0;
  private itensPorPagina: number = 4; // Mude aqui para 8 ou 12 se quiser mais itens

  private service = inject(ProdutoService);

  ngOnInit(): void {
    this.carregarProdutos();
  }

  public carregarProdutos() {
    this.service.getAllProdutos().subscribe({
      next: (res: Produto[]) => {
        this.todosProdutos = res;
        this.calcularPaginacao();
        this.atualizarPagina();
      },
      error: (err) => console.error(err),
    });
  }

  // Lógica para cortar a lista e mostrar só a página certa
  private atualizarPagina() {
    const inicio = (this.pageNumber - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.listaExibida = this.todosProdutos.slice(inicio, fim);
  }

  private calcularPaginacao() {
    this.totalPages = Math.ceil(
      this.todosProdutos.length / this.itensPorPagina,
    );
  }

  // Botão Anterior
  public paginaAnterior() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.atualizarPagina();
    }
  }

  // Botão Próximo
  public proximaPagina() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.atualizarPagina();
    }
  }
}
