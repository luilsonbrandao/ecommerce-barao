import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../servicos/cliente.service';

@Component({
  selector: 'app-aniversariantes',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './aniversariantes.component.html'
})
export class AniversariantesComponent implements OnInit {
  private cliserv = inject(ClienteService);
  private router = inject(Router);

  public lista: Cliente[] = [];
  public mesAtual: number = 1;
  public meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  ngOnInit(): void {
    this.mesAtual = new Date().getMonth() + 1;
    this.aniv(this.mesAtual);
  }

  public aniv(mes: number): void {
    this.mesAtual = mes; // Usado para destacar o botão no HTML
    this.cliserv.buscarAniversariantes(mes).subscribe({
      next: (res: Cliente[]) => this.lista = res,
      error: (err: any) => {
        if (err.status === 403 || err.status === 401) {
          this.router.navigate(["/login"]);
        }
      }
    });
  }
}
