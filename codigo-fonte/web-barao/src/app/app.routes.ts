import { Routes } from '@angular/router';
import { ProdutoDetalheComponent } from './pages/produto-detalhe/produto-detalhe.component';
import { HomeComponent } from './pages/home/home.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { EfetivarpedidoComponent } from './components/efetivarpedido/efetivarpedido.component';
import { ReciboComponent } from './components/recibo/recibo.component';
import { BuscacategoriaComponent } from './components/buscacategoria/buscacategoria.component';
import { BuscapalavrachaveComponent } from './components/buscapalavrachave/buscapalavrachave.component';

export const routes: Routes = [
  // caminho for vazio, mostra a Home
  { path: '', component: HomeComponent },

  // mostra os Detalhes do produto
  { path: 'detalhe/:id', component: ProdutoDetalheComponent },

  { path: 'carrinho', component: CarrinhoComponent },

  {path: 'efetivar-pedido', component: EfetivarpedidoComponent},

  {path: 'recibo/:id', component: ReciboComponent},

  {path: 'categoria/:id', component: BuscacategoriaComponent},

  {path: 'busca', component: BuscapalavrachaveComponent }
];
