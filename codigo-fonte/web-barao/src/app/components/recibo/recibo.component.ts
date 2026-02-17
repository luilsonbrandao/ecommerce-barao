import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-recibo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css'],
})
export class ReciboComponent implements OnInit {
  // Injeção de dependências moderna
  private route = inject(ActivatedRoute);
  private pedidoService = inject(PedidoService);

  public idPedido: number = 0;
  public uuidPedido: string | null = null;
  public detalhePedido?: Pedido; // Pode ser undefined enquanto carrega

  ngOnInit(): void {
    // Pega o ID da URL (ex: /recibo/123)
    this.uuidPedido = this.route.snapshot.paramMap.get('id');

    if (this.uuidPedido) {
      this.carregarPedido(this.uuidPedido);
    }
  }

  private carregarPedido(uuid: string) {
    this.pedidoService.buscarPorUuid(uuid).subscribe({
      next: (res: Pedido) => {
        this.detalhePedido = res;
      },
      error: (err) => {
        console.error("Erro ao buscar pedido por UUID", err);
        alert("Recibo não encontrado ou link inválido.");
      },
    });
  }

  // Função para imprimir o recibo
  public imprimir() {
    window.print();
  }
}
