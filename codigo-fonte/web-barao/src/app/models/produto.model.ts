import { Categoria } from "./categoria.model";

export interface Produto {
  id?: number;
  nome: string;
  detalhe?: string;
  preco: number;
  linkFoto: string;
  disponivel?: number;
  categoria: Categoria;
}
