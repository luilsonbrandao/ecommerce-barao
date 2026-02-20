import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../servicos/pedido.service';
import { StatusPedido } from '../../models/status-pedido.model';

@Component({
  selector: 'app-ultimospedidos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './ultimospedidos.component.html'
})
export class UltimospedidosComponent implements OnInit, OnDestroy {
  private service = inject(PedidoService);
  private router = inject(Router);

  public lista: Pedido[] = [];
  public total: number = 0;
  public totalPago: number = 0;
  public totalCancelado: number = 0;
  public totalPendentes: number = 0;

  private intervalId: any;

  ngOnInit(): void {
    this.recuperarPedidos();
    this.intervalId = setInterval(() => this.recuperarPedidos(), 60000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  public recuperarPedidos() {
    const hoje = new Date();
    const seteDias = new Date();
    seteDias.setDate(hoje.getDate() - 7);

    const f = {
      dataInicio: seteDias.toISOString().split('T')[0],
      dataFim: hoje.toISOString().split('T')[0]
    };

    this.service.getAllPedidos(f).subscribe({
      next: (res: Pedido[]) => {
        this.lista = res;
        this.total = 0; this.totalPago = 0; this.totalCancelado = 0; this.totalPendentes = 0;

        this.lista.forEach(item => {
          const valor = item.valorTotal || 0;
          this.total += valor;

          if (item.status === StatusPedido.NOVO_PEDIDO) {
            this.totalPendentes += valor;
          } else if (item.status === StatusPedido.CANCELADO) {
            this.totalCancelado += valor;
          } else if (item.status && item.status >= StatusPedido.PAGO && item.status !== StatusPedido.CANCELADO) {
            this.totalPago += valor;
          }
        });
      },
      error: (err: any) => {
        if (err.status === 403 || err.status === 401) this.router.navigate(["/login"]);
      }
    });
  }
}
