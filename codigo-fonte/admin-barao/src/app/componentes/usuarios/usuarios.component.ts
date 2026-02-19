import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../servicos/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterLink],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  private service = inject(UsuarioService);
  private router = inject(Router);

  public lista: Usuario[] = [];

  ngOnInit(): void {
    this.service.recuperarTodos().subscribe({
      next: (res) => this.lista = res,
      error: (err) => {
        if (err.status === 403) {
          localStorage.removeItem("BaraoAdminTk");
          this.router.navigate(["/login"], { queryParams: { src: "expired" } });
        }
      }
    });
  }

  public mudaStatus(usuario: Usuario, event: any) {
    usuario.ativo = event.target.checked ? 1 : 0;
    this.service.atualizarUsuario(usuario).subscribe({
      next: () => console.log("Status do usuário alterado!"),
      error: () => alert("Erro ao atualizar o usuário!")
    });
  }
}
