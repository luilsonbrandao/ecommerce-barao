import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../servicos/categoria.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  private service = inject(CategoriaService);
  private router = inject(Router);

  public lista: Categoria[] = [];

  ngOnInit(): void {
    this.service.getAllCategorias().subscribe({
      next: (res: Categoria[]) => {
        this.lista = res;
      },
      error: (err: any) => {
        if (err.status == 403 || err.status == 401) {
          // Se o token for inválido, expulsa pro login
          localStorage.removeItem("BaraoAdminTk");
          this.router.navigate(["/login"], { queryParams: { src: "expired" } });
        }
      }
    });
  }
}
