import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { PedidoService } from '../../servicos/pedido.service';
import { VendasPorDataDTO } from '../../models/vendas-por-data-dto.model';

// O Chart.js moderno exige que registremos os componentes internos dele
Chart.register(...registerables);

@Component({
  selector: 'app-graficovendas',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './graficovendas.component.html',
  styleUrls: ['./graficovendas.component.css']
})
export class GraficovendasComponent implements OnInit, OnDestroy, AfterViewInit {

  // A forma moderna e segura de pegar um elemento no HTML do Angular
  @ViewChild('meuGrafico') canvasRef!: ElementRef<HTMLCanvasElement>;

  private service = inject(PedidoService);
  private router = inject(Router);

  public total: number = 0;
  public chart!: Chart;
  private intervalId: any;

  ngOnInit(): void {
    // Apenas aguarda o ciclo de vida iniciar
  }

  ngAfterViewInit(): void {
    // O gráfico só pode ser desenhado DEPOIS que a tela de fato carregou (AfterViewInit)
    this.gerarGrafico();
    this.recuperarGrafico();

    // Configura o timer para atualizar a cada 60 segundos
    this.intervalId = setInterval(() => this.recuperarGrafico(), 60000);
  }

  ngOnDestroy(): void {
    // [IMPORTANTE] Limpa a memória quando você navega para outra tela
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.chart) {
      this.chart.destroy();
    }
  }

  public recuperarGrafico() {
    // Lógica moderna nativa do JS para pegar datas (sem precisar da biblioteca pesada Moment.js)
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    // Converte para o formato "YYYY-MM-DD" que o Java espera
    const dataFim = hoje.toISOString().split('T')[0];
    const dataIni = seteDiasAtras.toISOString().split('T')[0];

    this.service.recuperarTotaisDaSemana(dataIni, dataFim).subscribe({
      next: (res: VendasPorDataDTO[]) => {
        this.total = 0;
        const novasLabels: string[] = [];
        const novosDados: number[] = [];

        res.forEach(elem => {
          this.total += elem.total || 0;
          novosDados.push(elem.total || 0);

          // Formata a data de YYYY-MM-DD para DD/MM/YYYY manualmente
          if (elem.data) {
            const partes = elem.data.split('-');
            if (partes.length === 3) {
              novasLabels.push(`${partes[2]}/${partes[1]}/${partes[0]}`);
            } else {
              novasLabels.push(elem.data);
            }
          }
        });

        // Atualiza os dados dentro do gráfico existente sem recriar a tela
        if (this.chart) {
          this.chart.data.labels = novasLabels;
          this.chart.data.datasets[0].data = novosDados;
          this.chart.update();
        }
      },
      error: (err: any) => {
        if (err.status === 403 || err.status === 401) {
          localStorage.removeItem("BaraoAdminTk");
          this.router.navigate(["/login"], { queryParams: { src: "expired" } });
        }
      }
    });
  }

  public gerarGrafico() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [], // Começa vazio, os dados chegam da API
        datasets: [{
          label: 'Volume de Vendas (R$)',
          data: [],
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Azul corporativo suave
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          borderRadius: 4 // Deixa as barras com bordas arredondadas (moderno)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Permite ajustar a altura pelo CSS
        scales: {
          y: { // Sintaxe nova do Chart.js v4
            beginAtZero: true
          }
        }
      }
    });
  }
}
