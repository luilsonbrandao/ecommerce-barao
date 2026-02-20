import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormaPagamento } from '../../models/forma-pagamento.model';
import { FormapagamentoService } from '../../servicos/formapagamento.service';

@Component({
  selector: 'app-pagamentos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pagamentos.component.html'
})
export class PagamentosComponent implements OnInit {
  private service = inject(FormapagamentoService);
  private router = inject(Router);

  public lista: FormaPagamento[] = [];

  ngOnInit(): void {
    this.service.recuperarTodasFormasPgto().subscribe({
      next: (res: FormaPagamento[]) => this.lista = res,
      error: (err: any) => {
        if (err.status === 403 || err.status === 401) {
          localStorage.removeItem("BaraoAdminTk");
          this.router.navigate(["/login"]);
        }
      }
    });
  }
}
