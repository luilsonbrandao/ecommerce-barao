import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para o loop no HTML
import { RouterLink } from '@angular/router';
import { Categoria } from '../../models/categoria.model'; // Ajuste o caminho se necessário
import { CategoriaService } from '../../services/categoria.service'; // Ajuste o caminho

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink], // Adicione CommonModule aqui
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  // Variável para guardar as categorias que vêm do Java
  public listaCategorias: Categoria[] = [];

  // Injeção moderna de dependência
  private categoriaService = inject(CategoriaService);

  ngOnInit(): void {
    this.carregarCategorias();
  }

  public carregarCategorias() {
    this.categoriaService.getAllCategorias().subscribe({
      next: (res: Categoria[]) => {
        this.listaCategorias = res;
        // console.log("Categorias carregadas:", this.listaCategorias); // Use para testar se quiser
      },
      error: (err) => {
        console.error("Erro ao buscar categorias:", err);
      }
    });
  }
}
