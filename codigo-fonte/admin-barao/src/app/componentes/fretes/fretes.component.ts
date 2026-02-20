import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Frete } from '../../models/frete.model';
import { FreteService } from '../../servicos/frete.service';

@Component({
  selector: 'app-fretes',
  standalone: true,
  imports: [CommonModule, RouterLink, DecimalPipe],
  templateUrl: './fretes.component.html'
})
export class FretesComponent implements OnInit {
  private service = inject(FreteService);
  private router = inject(Router);

  public lista: Frete[] = [];

  ngOnInit(): void {
    this.service.recuperarTodos().subscribe({
      next: (res: Frete[]) => this.lista = res,
      error: (err: any) => {
        if (err.status === 403 || err.status === 401) {
          localStorage.removeItem("BaraoAdminTk");
          this.router.navigate(["/login"], { queryParams: { src: "expired" } });
        }
      }
    });
  }

  public disponibiliza(frete: Frete, event: any) {
    frete.disponivel = event.target.checked ? 1 : 0;
    this.service.atualizarFrete(frete).subscribe({
      next: () => console.log(`Disponibilidade do frete ${frete.prefixo} alterada.`),
      error: (err: any) => {
        if (err.status === 403 || err.status === 401) {
          localStorage.removeItem("BaraoAdminTk");
          this.router.navigate(["/login"]);
        } else {
          alert("Erro ao alterar disponibilidade do frete.");
        }
      }
    });
  }
}
