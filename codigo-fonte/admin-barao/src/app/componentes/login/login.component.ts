import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JWTToken } from '../../models/JWTToken';
import { LoginService } from '../../servicos/login.service'; 

export class DadosLogin {
  username?: string;
  senha?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private loginService = inject(LoginService); // AGORA INJETADO

  public usuario: DadosLogin = new DadosLogin();
  public msgAlert: string = "";

  ngOnInit(): void {
    if (localStorage.getItem("BaraoAdminTk")) {
      this.router.navigate(['/dashboard']);
    }

    const src = this.activatedRoute.snapshot.queryParams['src'];
    if (src === "unauthorized") {
      this.msgAlert = "Você não está autorizado a acessar o painel.";
    } else if (src === "expired") {
      this.msgAlert = "Sua sessão expirou. Conecte-se novamente.";
    }
  }

  autenticar() {
    this.loginService.logarUsuario(this.usuario).subscribe({
      next: (res: JWTToken) => {
        localStorage.setItem("BaraoAdminTk", res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.msgAlert = "Usuário ou senha inválidos!";
        console.error(err);
      }
    });
  }
}
