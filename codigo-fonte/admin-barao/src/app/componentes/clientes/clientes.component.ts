import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../servicos/cliente.service';
import { BuscarcepService } from '../../servicos/buscarcep.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterLink, DatePipe],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(ClienteService);
  private cepService = inject(BuscarcepService);
  private router = inject(Router);

  public listaLetras: string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  public keyword: string = '';
  public lista: Cliente[] = [];

  // Controle do Modal
  public detalhe: Cliente | null = null;
  public isNovoCliente: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['letra']) {
        this.buscar(this.service.buscarPorLetra(params['letra']));
      } else if (params['keyword']) {
        this.buscar(this.service.buscarPorPalavraChave(params['keyword']));
      } else {
        this.buscar(this.service.buscarTodos());
      }
    });
  }

  private buscar(requisicao: any) {
    requisicao.subscribe({
      next: (res: Cliente[]) => this.lista = res,
      error: (err: any) => {
        if (err.status === 403) this.router.navigate(["/login"]);
      }
    });
  }

  public buscarPorPalavraChave() {
    if (this.keyword.trim()) {
      this.router.navigate(['/clientes'], { queryParams: { keyword: this.keyword } });
    } else {
      this.router.navigate(['/clientes']);
    }
  }

  public isBirthday(dataNasc?: string): boolean {
    if (!dataNasc) return false;
    const hoje = new Date();
    // A data vem como "YYYY-MM-DD"
    const mesNasc = parseInt(dataNasc.substring(5, 7));
    const diaNasc = parseInt(dataNasc.substring(8, 10));
    return (hoje.getMonth() + 1 === mesNasc && hoje.getDate() === diaNasc);
  }

  // --- CONTROLE DO MODAL ---
  public adicionarNovoCliente() {
    this.detalhe = { nome: '', email: '', telefone: '' }; // Inicializa vazio
    this.isNovoCliente = true;
  }

  public exibirCliente(cliente: Cliente) {
    this.detalhe = JSON.parse(JSON.stringify(cliente)); // Clona para edição segura
    this.isNovoCliente = false;
  }

  public fecharModal() {
    this.detalhe = null;
  }

  public buscarCEP() {
    if (this.detalhe?.cep) {
      this.cepService.buscarCEP(this.detalhe.cep).subscribe({
        next: (res) => {
          if (this.detalhe) {
            this.detalhe.logradouro = res.logradouro;
            this.detalhe.bairro = res.bairro;
            this.detalhe.cidade = res.localidade;
            this.detalhe.estado = res.uf;
          }
        },
        error: () => alert("CEP não encontrado.")
      });
    }
  }

  public salvarCliente() {
    if (!this.detalhe) return;

    const requisicao = this.isNovoCliente
      ? this.service.adicionarNovo(this.detalhe)
      : this.service.atualizarDados(this.detalhe);

    requisicao.subscribe({
      next: () => {
        alert(`Cliente ${this.isNovoCliente ? 'adicionado' : 'atualizado'} com sucesso!`);
        this.fecharModal();
        this.router.navigate(['/clientes']); // Recarrega a lista
      },
      error: () => alert("Erro ao salvar os dados do cliente.")
    });
  }
}
