import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../servicos/produto.service';
import { CompradorDTO } from '../../models/comprador-dto.model';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  private service = inject(ProdutoService);
  private router = inject(Router);

  public lista: Produto[] = [];
  public compradores: CompradorDTO[] = [];

  ngOnInit(): void {
    this.carregarProdutos();
  }

  public carregarProdutos() {
    this.service.recuperarTodos().subscribe({
      next: (res: Produto[]) => {
        this.lista = res;
      },
      error: (err: any) => {
        if (err.status == 403 || err.status == 401) {
          localStorage.removeItem("BaraoAdminTk");
          this.router.navigate(["/login"], { queryParams: { src: "expired" } });
        }
      }
    });
  }

  public disponibiliza(produto: Produto, event: any) {
    // O event.target.checked pega o valor do switch (true/false)
    produto.disponivel = event.target.checked ? 1 : 0;

    this.service.atualizarProduto(produto).subscribe({
      next: () => console.log(`Produto ${produto.id} atualizado.`),
      error: () => alert(`Erro ao atualizar disponibilidade do Produto ${produto.nome}`)
    });
  }

  public buscarCompradores(idProduto: number) {
    // Esvazia a lista para não mostrar clientes antigos enquanto carrega
    this.compradores = [];

    // Chama a rota nova do Spring Boot
    this.service.buscarCompradoresDoProduto(idProduto).subscribe({
      next: (res: CompradorDTO[]) => {
        this.compradores = res;
      },
      error: () => alert("Erro ao buscar a lista de compradores.")
    });
  }
}
