import { Routes } from '@angular/router';
import { ProdutoDetalheComponent } from './pages/produto-detalhe/produto-detalhe.component';
import { HomeComponent } from './pages/home/home.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { EfetivarpedidoComponent } from './components/efetivarpedido/efetivarpedido.component';

export const routes: Routes = [
  // caminho for vazio, mostra a Home
  { path: '', component: HomeComponent },

  // mostra os Detalhes do produto
  { path: 'detalhe/:id', component: ProdutoDetalheComponent },

  { path: 'carrinho', component: CarrinhoComponent },

  {path: 'efetivar-pedido', component: EfetivarpedidoComponent},
];
