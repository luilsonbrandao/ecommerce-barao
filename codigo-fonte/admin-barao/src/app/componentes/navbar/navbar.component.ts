import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  private router = inject(Router);

  public logout() {
    const confirma = confirm("Deseja realmente sair do painel administrativo?");
    if (confirma) {
      localStorage.removeItem("BaraoAdminTk");
      this.router.navigate(['/login']);
    }
  }
}
