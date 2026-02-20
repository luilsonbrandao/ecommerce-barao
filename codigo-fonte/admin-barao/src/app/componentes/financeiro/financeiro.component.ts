import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ItemFinanceiroDTO } from '../../models/item-financeiro-dto.model';
import { RegistrofinanceiroService } from '../../servicos/registrofinanceiro.service';

@Component({
  selector: 'app-financeiro',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './financeiro.component.html'
})
export class FinanceiroComponent implements OnInit {
  private service = inject(RegistrofinanceiroService);
  private router = inject(Router);

  public lista: ItemFinanceiroDTO[] = [];

  ngOnInit(): void {
    this.carregarDados();
  }

  public carregarDados() {
    this.service.recuperarRegistrosFinanceiros().subscribe({
      next: (res: ItemFinanceiroDTO[]) => this.lista = res,
      error: (err: any) => {
        if (err.status === 403 || err.status === 401) {
          localStorage.removeItem("BaraoAdminTk");
          this.router.navigate(["/login"]);
        }
      }
    });
  }

  public alterarStatus(item: ItemFinanceiroDTO, novoStatus: number) {
    if (novoStatus === -1) {
      if (!confirm("Atenção: Deseja mesmo excluir ou inativar este registro? A operação não pode ser desfeita.")) {
        return;
      }
    }

    if (item.status === novoStatus) return; // Se já está com o mesmo status, ignora o clique

    // Clonamos o objeto para enviar ao Back-end, mas só atualizamos a tela se der sucesso
    const itemAtualizado = { ...item, status: novoStatus };

    this.service.alterarStatusItem(itemAtualizado).subscribe({
      next: () => {
        item.status = novoStatus; // Sucesso! Atualiza o visual da linha
      },
      error: (err: any) => {
        if (err.status === 403 || err.status === 401) {
          this.router.navigate(["/login"]);
        } else {
          alert("ERRO ao alterar o status do fluxo financeiro!");
        }
      }
    });
  }
}
