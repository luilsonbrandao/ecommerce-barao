import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Models
import { Cliente } from '../../models/cliente.model';
import { EnderecoCEP } from '../../models/endereco-cep.model';
import { Frete } from '../../models/frete.model';
import { Pedido } from '../../models/pedido.model';

// Services
import { BuscarcepService } from '../../services/buscarcep.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { ClienteService } from '../../services/cliente.service';
import { FreteService } from '../../services/frete.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-efetivarpedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './efetivarpedido.component.html',
  styleUrls: ['./efetivarpedido.component.css']
})
export class EfetivarpedidoComponent implements OnInit {

  // Injeções
  private cliService = inject(ClienteService);
  private pedService = inject(PedidoService);
  private cepService = inject(BuscarcepService);
  private carService = inject(CarrinhoService);
  private freteService = inject(FreteService);
  private router = inject(Router);

  // Variáveis
  public cliente: Cliente = {
    nome: '', email: '', telefone: '', cpf: '',
    cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: ''
  };

  public pedido: Pedido = {
    idPedido: 0, status: 0, valorTotal: 0, valorFrete: 0,
    retirar: 0, itensPedido: [], observacoes: ''
  };

  public frete: Frete = { id: 0, prefixo: '', valor: 0, descricao: '', disponivel: 0 };

  public achou: boolean = false;
  public visivel: boolean = false;
  public mensagemErro: string = '';
  public msgEndereco: string = '';
  public msgFrete: string = '';
  public freteReal: number = 0;

  public exibirPerguntaEndereco: boolean = true;
  public exibirFormEndereco: boolean = false;
  public emProcessamento: boolean = false;
  public retirar: boolean = false;

  ngOnInit(): void {
    const jsonCarrinho = localStorage.getItem("carrinhoBarao");
    if (jsonCarrinho) {
      const pedidoTemp = JSON.parse(jsonCarrinho);
      this.pedido.itensPedido = pedidoTemp.itensPedido;
      this.pedido.valorTotal = pedidoTemp.valorTotal;
    } else {
      this.router.navigate(['/']);
    }
  }

  // --- MÉTODOS VISUAIS ---
  public exibirForm() {
    this.exibirPerguntaEndereco = false;
    this.exibirFormEndereco = true;
    this.limparEnderecoCliente();
  }

  public ocultarForm() {
    this.exibirPerguntaEndereco = false;
    this.exibirFormEndereco = false;
    if (this.cliente.cep) {
        this.buscarFrete(this.cliente.cep);
    }
  }

  public ocultaAlert() {
    this.achou = true;
  }

  // --- VALIDAÇÕES E BUSCAS ---
  public isTelefoneValid(): boolean {
    return this.cliente.telefone ? this.cliente.telefone.length >= 10 : false;
  }

  public buscarCliente() {
    if (!this.isTelefoneValid()) {
      this.mostrarErro("Verifique se informou o telefone com DDD");
      return;
    }
    const telefoneLimpo = this.cliente.telefone.replace(/\D/g, '');

    this.cliService.buscarClientePeloTelefone(telefoneLimpo).subscribe({
      next: (cli: Cliente) => {
        this.cliente = cli;
        this.achou = true;
        this.msgEndereco = cli.logradouro ? cli.logradouro.substring(0, 10) + "..." : "";
        this.visivel = true;
        this.exibirPerguntaEndereco = true;
      },
      error: (err) => {
        if (err.status == 404) {
          this.achou = false;
          this.visivel = true;
          this.exibirPerguntaEndereco = false;
          this.exibirFormEndereco = true;
          const telTemp = this.cliente.telefone;
          this.limparDadosCliente();
          this.cliente.telefone = telTemp;
        } else {
          this.mostrarErro("Erro ao buscar cliente: " + err.message);
        }
      }
    });
  }

  public buscarCEP() {
    if(!this.cliente.cep) return;
    this.cepService.buscarCEP(this.cliente.cep).subscribe({
      next: (res: EnderecoCEP) => {
        if (res.logradouro) {
            this.cliente.logradouro = res.logradouro;
            this.cliente.cidade = res.localidade;
            this.cliente.bairro = res.bairro;
            this.cliente.estado = res.uf;
            this.buscarFrete(this.cliente.cep!);
        } else {
            this.mostrarErro("CEP não encontrado na base do ViaCEP.");
        }
      },
      error: () => this.mostrarErro("Erro ao buscar CEP.")
    });
  }

  public buscarFrete(cep: string) {
    this.freteService.recuperarPorPrefixo(cep).subscribe({
      next: (res: Frete) => {
        this.frete = res;
        this.freteReal = this.frete.valor;
        this.msgFrete = `R$ ${this.frete.valor.toFixed(2)} (${this.frete.descricao})`;
        this.calculaFreteReal();
      },
      error: () => {
        this.frete.valor = 0;
        this.freteReal = 0;
        this.frete.descricao = "A combinar";
        this.msgFrete = this.frete.descricao;
        this.calculaFreteReal();
      }
    });
  }

  public calculaFreteReal() {
    if (!this.retirar) {
      this.pedido.retirar = 0;
      this.freteReal = this.frete.valor;
      this.msgFrete = `R$ ${this.freteReal.toFixed(2)} (${this.frete.descricao})`;
    } else {
      this.pedido.retirar = 1;
      this.freteReal = 0;
      this.msgFrete = "R$ 0.00 - Cliente Retira";
    }
  }


  public finalizarPedido() {
    if (!this.cliente.nome || this.cliente.nome.trim().split(' ').length < 2) {
      this.mostrarErro("Por favor Informe nome e sobrenome");
      return;
    }

    this.emProcessamento = true;


    if (!this.cliente.dataNasc) {
        this.cliente.dataNasc = undefined;
    }
    if (this.cliente.telefone) {
        this.cliente.telefone = this.cliente.telefone.replace(/\D/g, '');
    }

    // 2. Atualiza totais
    this.pedido.valorFrete = this.freteReal;
    const totalItens = this.pedido.itensPedido.reduce((acc, item) => acc + item.precoTotal, 0);
    this.pedido.valorTotal = totalItens + this.freteReal;

    this.pedido.cliente = this.cliente;
    this.pedido.status = 1;

    // 3. Envia
    this.pedService.inserirNovoPedido(this.pedido).subscribe({
      next: (res: Pedido) => {
        // Limpa o carrinho
        localStorage.removeItem("carrinhoBarao");
        this.carService.atualizarContagem();

        if (res.uuid) {
            // Se o backend retornou o UUID, usa ele na URL
            this.router.navigate(["/recibo", res.uuid]);
        } else {
            // Fallback (caso o banco não tenha gerado uuid por algum erro grave)
            alert("Pedido realizado, mas houve um erro ao gerar o link seguro.");
        }
      },
      error: (err) => {
        this.emProcessamento = false;
        // ... (tratamento de erro igual) ...
      }
    });
  }
  
  // --- UTILITÁRIOS ---
  private mostrarErro(msg: string) {
    this.mensagemErro = msg;
    const btn = document.getElementById("btnModal");
    if(btn) btn.click();
    else alert(msg);
  }

  private limparDadosCliente() {
    this.cliente.nome = "";
    this.cliente.email = "";
    this.cliente.cpf = "";
    this.limparEnderecoCliente();
  }

  private limparEnderecoCliente() {
    this.cliente.cep = "";
    this.cliente.logradouro = "";
    this.cliente.numero = "";
    this.cliente.complemento = "";
    this.cliente.bairro = "";
    this.cliente.cidade = "";
    this.cliente.estado = "";
  }
}
