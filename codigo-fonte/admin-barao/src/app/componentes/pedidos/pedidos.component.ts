import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Importação dos Serviços
import { PedidoService } from '../../servicos/pedido.service';
import { FormapagamentoService } from '../../servicos/formapagamento.service';
import { RegistrofinanceiroService } from '../../servicos/registrofinanceiro.service';

// Importação dos Modelos
import { Pedido } from '../../models/pedido.model';
import { FiltroPedidoDTO } from '../../models/filtro-pedido-dto.model';
import { StatusPedido } from '../../models/status-pedido.model';
import { FormaPagamento } from '../../models/forma-pagamento.model';
import { RegistroFinanceiro } from '../../models/registro-financeiro.model';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, DatePipe],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  // Injeção de Dependências
  private service = inject(PedidoService);
  private pgtoService = inject(FormapagamentoService);
  private rfService = inject(RegistrofinanceiroService);
  private router = inject(Router);

  // Variáveis de Controle
  public filtroPedido: FiltroPedidoDTO = {};
  public detalhe: Pedido | null = null;
  public lista: Pedido[] = [];
  public total: number = 0;

  // Variáveis do Modal Financeiro
  public formasPgto: FormaPagamento[] = [];
  public registroFinanceiro: RegistroFinanceiro | null = null;

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

  public abrirDetalhes(pedidoResumo: Pedido) {
    // Agora o Angular chama a rota /detalhes/{id} que criamos no Java
    this.service.getPedidoCompleto(pedidoResumo.idPedido).subscribe({
      next: (pedidoCompleto: Pedido) => {
        this.detalhe = pedidoCompleto;
      },
      error: (err) => {
        console.error(err);
        alert("Erro ao buscar os detalhes completos do pedido. Verifique o console.");
      }
    });
  }

  public fecharDetalhes() {
    this.detalhe = null;
  }

  public atualizarPedidoDetalhe() {
    if (this.detalhe) {
      this.detalhe.retirar = Number(this.detalhe.retirar);

      this.service.atualizarPedido(this.detalhe).subscribe({
        next: () => {
          alert("Pedido alterado com sucesso!");
          this.fecharDetalhes();
          this.carregarPedidos();
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

  // --- CONTROLE DO FLUXO FINANCEIRO ---

  public gerarFinanceiro(pedido: Pedido) {
    this.pgtoService.recuperarTodasFormasPgto().subscribe({
      next: (res) => {
        this.formasPgto = res;

        this.registroFinanceiro = {
          pedido: pedido,
          diaVencimento: new Date().getDate(),
          totalParcelas: 1,
          formaPagamento: this.formasPgto.length > 0 ? this.formasPgto[0] : {} as FormaPagamento
        };
      },
      error: () => alert("Erro ao carregar as formas de pagamento disponíveis.")
    });
  }

  public confirmarFluxoFinanceiro() {
    if (this.registroFinanceiro && this.registroFinanceiro.pedido) {
      // Pega o objeto completo da forma de pagamento baseada no ID selecionado no select
      const formaSelecionada = this.formasPgto.find(f => f.numSeq == Number(this.registroFinanceiro!.formaPagamento?.numSeq));
      if (formaSelecionada) this.registroFinanceiro.formaPagamento = formaSelecionada;

      this.rfService.gerarRegistroFinanceiro(this.registroFinanceiro).subscribe({
        next: () => {
          alert("Fluxo financeiro gerado com sucesso nas contas a receber!");
          this.alterarStatus(this.registroFinanceiro!.pedido!, StatusPedido.PAGO);
          this.fecharModalFinanceiro();
          this.carregarPedidos();
        },
        error: () => alert("Erro ao comunicar com o módulo financeiro.")
      });
    }
  }

  public fecharModalFinanceiro() {
    this.registroFinanceiro = null;
  }

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
