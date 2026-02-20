import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../servicos/categoria.service';

@Component({
  selector: 'app-editorcategoria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editorcategoria.component.html',
  styleUrls: ['./editorcategoria.component.css']
})
export class EditorcategoriaComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private service = inject(CategoriaService);
  private router = inject(Router);

  public categoria: Categoria = { nome: '' };
  public mode: number = 0; // 0 = POST (Novo), 1 = PUT (Edição)
  public emProcessamento: boolean = false;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id === "new") {
      this.mode = 0;
    } else {
      this.mode = 1;
      this.carregarCategoria(Number(id));
    }
  }

  private carregarCategoria(id: number) {
    this.service.getById(id).subscribe({
      next: (res: Categoria) => this.categoria = res,
      error: (err) => {
        if (err.status == 404) {
          alert("Categoria não encontrada.");
          this.router.navigate(['/categorias']);
        } else {
          localStorage.removeItem("BaraoAdminTk");
          this.router.navigate(['/login']);
        }
      }
    });
  }

  public salvarCategoria() {
    this.emProcessamento = true;

    if (this.mode === 0) {
      this.service.incluirNovaCategoria(this.categoria).subscribe({
        next: () => {
          alert("Categoria cadastrada com sucesso!");
          this.router.navigate(['/categorias']);
        },
        error: (err) => this.tratarErro(err)
      });
    } else {
      this.service.atualizarCategoria(this.categoria).subscribe({
        next: () => {
          alert("Categoria atualizada com sucesso!");
          this.router.navigate(['/categorias']);
        },
        error: (err) => this.tratarErro(err)
      });
    }
  }

  private tratarErro(err: any) {
    this.emProcessamento = false;
    if (err.status == 400) {
      alert("Valores inválidos para a categoria.");
    } else {
      localStorage.removeItem("BaraoAdminTk");
      this.router.navigate(['/login']);
    }
  }
}
