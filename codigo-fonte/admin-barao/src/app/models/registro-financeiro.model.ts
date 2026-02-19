import { Pedido } from './pedido.model';
import { FormaPagamento } from './forma-pagamento.model';

export interface RegistroFinanceiro {
    pedido?: Pedido;
    diaVencimento?: number;
    formaPagamento?: FormaPagamento;
    totalParcelas?: number;
}
