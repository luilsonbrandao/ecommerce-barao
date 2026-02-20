import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private router = inject(Router);

  public getToken(): string {
    const token = localStorage.getItem("BaraoAdminTk");
    if (!token) {
      this.router.navigate(["/login"], { queryParams: { src: "unauthorized" } });
      return '';
    }
    return token;
  }

  // Novo método para gerar o Header pronto e evitar repetição de código nos outros serviços
  public getHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
  }
}
