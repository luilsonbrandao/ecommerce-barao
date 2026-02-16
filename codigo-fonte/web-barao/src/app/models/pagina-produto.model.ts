import { Produto } from "./produto.model";

export interface PaginaProduto {
    content: Produto[];          
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
