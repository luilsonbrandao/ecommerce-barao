import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css']
})
export class ProdutoDetalheComponent implements OnInit {
  // Injeções de dependência
  private route = inject(ActivatedRoute);
  private produtoService = inject(ProdutoService); 

  produto?: Produto; // Pode ser undefined enquanto carrega

  ngOnInit() {
    // Pega o ID da rota (ex: /detalhe/1 -> id = 1)
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.produtoService.buscarPorId(id).subscribe({
        next: (dado) => this.produto = dado,
        error: (erro) => console.error('Erro ao buscar produto:', erro)
      });
    }
  }
}
