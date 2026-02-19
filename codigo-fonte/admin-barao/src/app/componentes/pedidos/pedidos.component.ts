import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PedidoService } from '../../servicos/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { FiltroPedidoDTO } from '../../models/filtro-pedido-dto.model';
import { StatusPedido } from '../../models/status-pedido.model';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, CurrencyPipe, DatePipe],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  private service = inject(PedidoService);
  private router = inject(Router);

  public filtroPedido: FiltroPedidoDTO = {};
  public detalhe: Pedido | null = null;
  public lista: Pedido[] = [];
  public total: number = 0;

  // Expõe o Enum para uso no HTML
  public StatusEnum = StatusPedido;

  ngOnInit(): void {
    this.carregarPedidos();
  }

  public carregarPedidos() {
    this.service.getAllPedidos(this.filtroPedido).subscribe({
      next: (res: Pedido[]) => {
        this.lista = res;
        this.calcularTotal();
      },
      error: (err: any) => {
        if (err.status === 403 || err.status === 401) {
          localStorage.removeItem("BaraoAdminTk");
          this.router.navigate(["/login"], { queryParams: { src: "expired" } });
        }
      }
    });
  }

  private calcularTotal() {
    this.total = this.lista.reduce((acc, pedido) => acc + (pedido.valorTotal || 0), 0);
  }

  public filtrarPedidos() {
    // Como os checkboxes do HTML dão true/false no Angular moderno (e não 1/0),
    // precisamos converter esses booleanos para os números do StatusPedido.
    const f: FiltroPedidoDTO = {
      dataInicio: this.filtroPedido.dataInicio,
      dataFim: this.filtroPedido.dataFim,
      nome: this.filtroPedido.nome,
      novo: this.filtroPedido.novo ? StatusPedido.NOVO_PEDIDO : 0,
      pago: this.filtroPedido.pago ? StatusPedido.PAGO : 0,
      transporte: this.filtroPedido.transporte ? StatusPedido.EM_TRANSPORTE : 0,
      entregue: this.filtroPedido.entregue ? StatusPedido.ENTREGUE : 0,
      posVenda: this.filtroPedido.posVenda ? StatusPedido.POS_VENDA : 0,
      finalizado: this.filtroPedido.finalizado ? StatusPedido.FINALIZADO : 0,
      cancelado: this.filtroPedido.cancelado ? StatusPedido.CANCELADO : 0
    };

    this.service.getAllPedidos(f).subscribe(res => {
      this.lista = res;
      this.calcularTotal();
    });
  }

  public limparFiltros() {
    this.filtroPedido = {};
    this.carregarPedidos();
  }

  public abrirDetalhes(pedido: Pedido) {
    // Clonamos o pedido para não alterar a tabela caso o usuário cancele a edição
    this.detalhe = JSON.parse(JSON.stringify(pedido));
  }

  public fecharDetalhes() {
    this.detalhe = null;
  }

  public atualizarPedidoDetalhe() {
    if (this.detalhe) {
      // Converte a string "1"/"0" do select para number
      this.detalhe.retirar = Number(this.detalhe.retirar);

      this.service.atualizarPedido(this.detalhe).subscribe({
        next: () => {
          alert("Pedido alterado com sucesso!");
          this.fecharDetalhes();
          this.carregarPedidos(); // Recarrega a tabela
        },
        error: () => alert("Erro ao alterar os dados do pedido.")
      });
    }
  }

  public alterarStatus(pedido: Pedido, novoStatus: number) {
    this.service.alterarStatus(pedido, novoStatus).subscribe({
      next: () => {
        pedido.status = novoStatus;
      },
      error: () => alert("ERRO ao alterar status do pedido!")
    });
  }

  public gerarFinanceiro(pedido: Pedido) {
    // TODO: Na próxima fase (Financeiro), abriremos o modal real de parcelas.
    // Por enquanto, apenas avança o status para "Pago" (Status = 2)
    const confirma = confirm("Deseja marcar este pedido como PAGO?");
    if (confirma) {
      this.alterarStatus(pedido, StatusPedido.PAGO);
    }
  }

  // Método auxiliar para dar cor aos badges no HTML
  public getBadgeClass(status?: number): string {
    switch(status) {
      case StatusPedido.NOVO_PEDIDO: return 'bg-primary';
      case StatusPedido.PAGO: return 'bg-success';
      case StatusPedido.EM_TRANSPORTE: return 'bg-warning text-dark';
      case StatusPedido.ENTREGUE: return 'bg-info text-dark';
      case StatusPedido.POS_VENDA: return 'bg-secondary';
      case StatusPedido.FINALIZADO: return 'bg-dark';
      case StatusPedido.CANCELADO: return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
