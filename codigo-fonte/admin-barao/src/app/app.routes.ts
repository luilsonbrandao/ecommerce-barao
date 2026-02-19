import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { EditorcategoriaComponent } from './componentes/editorcategoria/editorcategoria.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';
import { EditorprodutosComponent } from './componentes/editorprodutos/editorprodutos.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { EditorusuarioComponent } from './componentes/editorusuario/editorusuario.component';

export const routes: Routes = [
  // Redireciona a rota vazia para a tela de login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rota pública de Autenticação
  { path: 'login', component: LoginComponent },

  // Rotas Privadas (Área Administrativa)
  { path: 'dashboard', component: DashboardComponent },

  // --- Mapeamento das rotas futuras (Fases 3, 4 e 5) ---
  { path: 'categorias', component: CategoriasComponent },
  { path: 'editorcategoria/:id', component: EditorcategoriaComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'editorproduto/:id', component: EditorprodutosComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'editorusuario/:id', component: EditorusuarioComponent },
  {path: 'dashboard', component: DashboardComponent},
];
