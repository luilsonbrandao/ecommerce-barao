import { Produto } from "./produto.model";

export interface ItemPedido {
    qtdeItem: number;
    produto: Produto;
    precoUnitario: number;
    precoTotal: number;
}
