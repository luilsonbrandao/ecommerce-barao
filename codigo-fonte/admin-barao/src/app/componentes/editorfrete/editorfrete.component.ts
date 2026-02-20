import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Frete } from '../../models/frete.model';
import { FreteService } from '../../servicos/frete.service';

@Component({
  selector: 'app-editorfrete',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editorfrete.component.html'
})
export class EditorfreteComponent implements OnInit {
  private service = inject(FreteService);
  private activeRouter = inject(ActivatedRoute);
  private router = inject(Router);

  public frete: Frete = {} as Frete;
  public mode: number = 0; // 0 = Novo, 1 = Existente
  public isDisponivel: boolean = false; // Controle intermediário do checkbox

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get("id");

    if (id && id !== "new") {
      this.mode = 1;
      this.service.recuperarPeloId(Number(id)).subscribe({
        next: (res: Frete) => {
          this.frete = res;
          this.isDisponivel = this.frete.disponivel === 1;
        },
        error: (err: any) => {
          if (err.status === 403 || err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      });
    }
  }

  public salvarFrete() {
    this.frete.disponivel = this.isDisponivel ? 1 : 0;

    const requisicao = this.mode === 0
      ? this.service.inserirFrete(this.frete)
      : this.service.atualizarFrete(this.frete);

    requisicao.subscribe({
      next: () => {
        alert(`Frete ${this.mode === 0 ? 'inserido' : 'atualizado'} com sucesso!`);
        this.router.navigate(['/fretes']);
      },
      error: (err: any) => {
        if (err.status === 403 || err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status === 400 && this.mode === 0) {
          alert("Erro! Verifique se este prefixo de CEP já está cadastrado.");
        } else {
          alert("Erro ao processar a requisição.");
        }
      }
    });
  }
}
