import { ItemPedido } from "./item-pedido.model";
import { Cliente } from "./cliente.model";

export interface Pedido {
    idPedido: number;
    uuid?: string;
    dataPedido?: string;
    status: number;
    cliente?: Cliente;
    itensPedido: ItemPedido[];
    valorTotal: number;
    valorFrete: number;
    retirar: number;
    observacoes?: string;
}
