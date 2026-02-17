import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { BuscarprodutobykeyService } from '../../services/buscarprodutobykey.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public listaCategorias: Categoria[] = [];
  public qtdItens: number = 0;
  public keyword: string = "";

  private categoriaService = inject(CategoriaService);
  private carrinhoService = inject(CarrinhoService);
  private buscaService = inject(BuscarprodutobykeyService);
  private router = inject(Router);

  ngOnInit(): void {
    this.carregarCategorias();

    this.carrinhoService.getNumberOfItems().subscribe(
      (numero) => {
        this.qtdItens = numero;
      }
    );
  }

  public carregarCategorias() {
    this.categoriaService.getAllCategorias().subscribe({
      next: (res: Categoria[]) => this.listaCategorias = res,
      error: (err) => console.error("Erro ao buscar categorias:", err)
    });
  }

  public buscar() {
    if (this.keyword && this.keyword.trim().length > 0) {
      // 1. Atualiza o termo no serviço compartilhado
      this.buscaService.getKeyword().next(this.keyword);

      // 2. Navega para a página de resultados
      this.router.navigate(['/busca']);

      // Limpar o campo após buscar
      this.keyword = "";
    }
  }
}
