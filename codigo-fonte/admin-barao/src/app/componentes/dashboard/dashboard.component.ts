import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficovendasComponent } from '../graficovendas/graficovendas.component';
import { AniversariantesComponent } from '../aniversariantes/aniversariantes.component';
import { UltimospedidosComponent } from '../ultimospedidos/ultimospedidos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GraficovendasComponent, AniversariantesComponent, UltimospedidosComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
