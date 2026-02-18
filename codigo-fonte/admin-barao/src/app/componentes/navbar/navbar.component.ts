import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // RouterLinkActive ajuda a destacar a página atual
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  private router = inject(Router);

  public logout() {
    // Removemos o token do Barão Admin em vez do antigo LTRTk
    localStorage.removeItem("BaraoAdminTk");
    this.router.navigate(['/login']);
  }
}
