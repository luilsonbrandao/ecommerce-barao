import { Routes } from '@angular/router';
import { ProdutoDetalheComponent } from './pages/produto-detalhe/produto-detalhe.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  // caminho for vazio, mostra a Home
  { path: '', component: HomeComponent },

  // mostra os Detalhes do produto
  { path: 'detalhe/:id', component: ProdutoDetalheComponent }
];
