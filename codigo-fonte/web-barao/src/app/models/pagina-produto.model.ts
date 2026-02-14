import { Produto } from "./produto.model";

export interface PaginaProduto {
    content: Produto[];
    number: number;
    totalPages: number;
    totalElements?: number; 
}
