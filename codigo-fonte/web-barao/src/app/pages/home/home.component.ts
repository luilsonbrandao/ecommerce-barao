import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Injeção do serviço para buscar os dados
  private produtoService = inject(ProdutoService);

  // Lista de produtos
  produtos: Produto[] = [];

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listarTodos().subscribe({
      next: (dados) => {
        this.produtos = dados;
      },
      error: (erro) => console.error('Erro ao buscar produtos:', erro)
    });
  }
}
