import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';

export const routes: Routes = [
  // Redireciona a rota vazia para a tela de login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rota pública de Autenticação
  { path: 'login', component: LoginComponent },

  // Rotas Privadas (Área Administrativa)
  { path: 'dashboard', component: DashboardComponent },

  // --- Mapeamento das rotas futuras (Fases 3, 4 e 5) ---
  // Descomentaremos essas linhas conforme formos criando os componentes
  // { path: 'categorias', component: CategoriasComponent },
  // { path: 'produtos', component: ProdutosComponent },
  // { path: 'pedidos', component: PedidosComponent },
  // { path: 'clientes', component: ClientesComponent },
];
