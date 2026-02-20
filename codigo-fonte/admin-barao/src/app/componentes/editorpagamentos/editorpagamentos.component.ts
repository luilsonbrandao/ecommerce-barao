import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormaPagamento } from '../../models/forma-pagamento.model';
import { FormapagamentoService } from '../../servicos/formapagamento.service';

@Component({
  selector: 'app-editorpagamentos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editorpagamentos.component.html'
})
export class EditorpagamentosComponent implements OnInit {
  private pgtoService = inject(FormapagamentoService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public mode: number = 0;
  public isVisivel: boolean = false;
  // Usamos o 'as FormaPagamento' para blindar contra o erro do Strict Mode
  public formaPgto: FormaPagamento = {} as FormaPagamento;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");

    if (id && id !== "new") {
      this.mode = 1;
      this.pgtoService.recuperarPeloId(Number(id)).subscribe({
        next: (res: FormaPagamento) => {
          this.formaPgto = res;
          this.isVisivel = this.formaPgto.visivel === 1;
        },
        error: (err: any) => {
          if (err.status === 403 || err.status === 401) {
            this.router.navigate(['/login']);
          } else {
            alert("Erro ao recuperar forma de pagamento.");
          }
        }
      });
    }
  }

  public atualizarFormaPgto(): void {
    this.formaPgto.visivel = this.isVisivel ? 1 : 0;

    const requisicao = this.mode === 0
      ? this.pgtoService.inserirNovo(this.formaPgto)
      : this.pgtoService.atualizar(this.formaPgto);

    requisicao.subscribe({
      next: () => {
        alert(`Meio de pagamento ${this.mode === 0 ? 'inserido' : 'atualizado'} com sucesso!`);
        this.router.navigate(['/pagamentos']);
      },
      error: (err: any) => {
        if (err.status === 403 || err.status === 401) {
          this.router.navigate(['/login']);
        } else {
          alert("Erro ao salvar Meio de Pagamento.");
        }
      }
    });
  }
}
