import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { CarrinhoService } from '../../services/carrinho.service'; // <--- Importe o serviço

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public listaCategorias: Categoria[] = [];
  public qtdItens: number = 0;

  private categoriaService = inject(CategoriaService);
  private carrinhoService = inject(CarrinhoService); // <--- INJETE O SERVIÇO AQUI

  ngOnInit(): void {
    this.carregarCategorias();

    // <--- ADICIONE ISSO: O Navbar agora fica "ouvindo" as mudanças
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
}
