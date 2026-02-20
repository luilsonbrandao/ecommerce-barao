import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';

// 1. Importamos o seu componente de Navbar (que agora é a nossa Sidebar)
import { NavbarComponent } from './componentes/navbar/navbar.component';

@Component({
  selector: 'app-root',
  // 2. Declaramos a NavbarComponent e o CommonModule nos imports
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-barao';

  // 3. Injetamos o Router para saber em qual tela o usuário está
  private router = inject(Router);

  // 4. Regra inteligente: Retorna "true" em todas as telas, EXCETO no Login.
  // Isso impede que o menu lateral apareça na tela de digitar a senha!
  public mostrarSidebar(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/';
  }
}
