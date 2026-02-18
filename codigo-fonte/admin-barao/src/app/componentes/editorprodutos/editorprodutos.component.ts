import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Produto } from '../../models/produto.model';
import { Categoria } from '../../models/categoria.model';
import { PathDTO } from '../../models/path-dto.model';
import { ProdutoService } from '../../servicos/produto.service';
import { CategoriaService } from '../../servicos/categoria.service';

@Component({
  selector: 'app-editorprodutos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './editorprodutos.component.html',
  styleUrls: ['./editorprodutos.component.css']
})
export class EditorprodutosComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private produtoService = inject(ProdutoService);
  private categService = inject(CategoriaService);
  private router = inject(Router);

  public mode: number = 0; // 0 = Novo, 1 = Edição
  public listaCategorias: Categoria[] = [];

  // Inicialização segura do objeto Produto
  public produto: Produto = {
    nome: '', detalhe: '', linkFoto: '', preco: 0, precoPromo: 0, disponivel: 0,
    categoria: { id: 0, nome: '' } // Categoria vazia inicial
  };

  public disponivel: boolean = false;
  public arquivo?: File;
  public uploadEmProgresso: boolean = false;

  ngOnInit(): void {
    // Busca as categorias para o <select>
    this.categService.getAllCategorias().subscribe(res => this.listaCategorias = res);

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id === "new") {
      this.mode = 0;
    } else {
      this.mode = 1;
      this.produtoService.recuperarPeloId(Number(id)).subscribe({
        next: (res: Produto) => {
          this.produto = res;
          // Se não houver categoria no retorno, previne erro no HTML
          if(!this.produto.categoria) this.produto.categoria = { id: 0, nome: '' };
          // Converte o número do banco para boolean do checkbox
          this.disponivel = this.produto.disponivel === 1;
        }
      });
    }
  }

  public selectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.arquivo = event.target.files[0];
    }
  }

  public uploadFoto() {
    if (!this.arquivo) return alert("Selecione um arquivo primeiro!");

    this.uploadEmProgresso = true;
    const formData = new FormData();
    formData.append("arquivo", this.arquivo, this.arquivo.name);

    this.produtoService.uploadFoto(formData).subscribe({
      next: (res: PathDTO) => {
        this.uploadEmProgresso = false;
        // Atualize a URL base conforme o seu back-end servir as imagens!
        this.produto.linkFoto = "http://localhost:8080/imagens/" + res.pathToFile;
        alert("Foto enviada com sucesso!");
      },
      error: () => {
        this.uploadEmProgresso = false;
        alert("Erro ao enviar a foto.");
      }
    });
  }

  public salvarProduto() {
    // Converte o boolean da tela de volta para o número 1 ou 0 do modelo
    this.produto.disponivel = this.disponivel ? 1 : 0;

    const request = this.mode === 0
      ? this.produtoService.enviarProduto(this.produto)
      : this.produtoService.atualizarProduto(this.produto);

    request.subscribe({
      next: () => {
        alert(`Produto ${this.mode === 0 ? 'inserido' : 'atualizado'} com sucesso!`);
        this.router.navigate(['/produtos']);
      },
      error: () => alert("Erro ao processar a operação no produto.")
    });
  }
}
