import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../servicos/usuario.service';

@Component({
  selector: 'app-editorusuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './editorusuario.component.html',
  styleUrls: ['./editorusuario.component.css']
})
export class EditorusuarioComponent implements OnInit {

  private service = inject(UsuarioService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  public usuario: Usuario = { nome: '', email: '', username: '', senha: '', ativo: 1 };
  public senhaConfirmacao: string = '';
  public senhasIguais: boolean = true;
  public mode: number = 0; // 0 = Novo, 1 = Edição

  ngOnInit(): void {
    const idUser = this.activatedRoute.snapshot.paramMap.get("id");

    if (idUser && idUser !== "new") {
      this.mode = 1;
      this.service.recuperarPeloId(Number(idUser)).subscribe({
        next: (res: Usuario) => {
          this.usuario = res;
          // Não trazemos a senha do back-end por segurança, então deixamos vazia para caso ele queira trocar
          this.usuario.senha = '';
        }
      });
    }
  }

  public sugereUsername() {
    // Pega o email digitado, divide no "@" e usa a primeira parte como username
    if (this.usuario.email) {
      this.usuario.username = this.usuario.email.split('@')[0];
    }
  }

  public confereSenha() {
    this.senhasIguais = (this.senhaConfirmacao === this.usuario.senha);
  }

  public salvarUsuario() {
    if (!this.senhasIguais) {
      alert("As senhas não coincidem. Verifique os campos.");
      return;
    }

    const requisicao = this.mode === 0
      ? this.service.adicionarNovoUsuario(this.usuario)
      : this.service.atualizarUsuario(this.usuario);

    requisicao.subscribe({
      next: () => {
        alert(`Usuário ${this.mode === 0 ? 'adicionado' : 'atualizado'} com sucesso!`);
        this.router.navigate(['/usuarios']);
      },
      error: () => alert("Erro ao processar a requisição. Verifique os dados.")
    });
  }
}
