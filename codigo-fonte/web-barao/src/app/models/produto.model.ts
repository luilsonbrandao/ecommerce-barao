import { Categoria } from "./categoria.model";

export interface Produto {
  id?: number;
  nome: string;
  detalhe?: string;
  linkFoto: string;
  preco: number;
  precoPromo?: number;
  disponivel?: number;
  categoria?: Categoria;
}
