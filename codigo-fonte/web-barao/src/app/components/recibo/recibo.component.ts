import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-recibo',
  standalone: true,
  imports: [CommonModule, RouterLink], // Importamos CommonModule para Pipes e @if/@for
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {

  // Injeção de dependências moderna
  private route = inject(ActivatedRoute);
  private pedidoService = inject(PedidoService);

  public idPedido: number = 0;
  public detalhePedido?: Pedido; // Pode ser undefined enquanto carrega

  ngOnInit(): void {
    // Pega o ID da URL (ex: /recibo/123)
    this.idPedido = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idPedido) {
      this.carregarPedido(this.idPedido);
    }
  }

  private carregarPedido(id: number) {
    this.pedidoService.buscarPorId(id).subscribe({
      next: (res: Pedido) => {
        this.detalhePedido = res;
      },
      error: (err) => {
        console.error("Erro ao buscar pedido", err);
        // Aqui você poderia redirecionar para uma página de erro 404
      }
    });
  }

  // Bônus: Função para imprimir o recibo
  public imprimir() {
    window.print();
  }
}
