export interface ItemFinanceiroDTO {
    numSeq?: number;
    idPedido?: number;
    nomeCliente?: string;
    telefone?: string;
    numParcela?: number;
    totalParcelas?: number;
    dataVencimento?: Date | string; 
    valorBruto?: number;
    idFormaPagamento?: number;
    formaPagamento?: string;
    percentRetencao?: number;
    valorRetencao?: number;
    valorReceber?: number;
    status?: number;
}
