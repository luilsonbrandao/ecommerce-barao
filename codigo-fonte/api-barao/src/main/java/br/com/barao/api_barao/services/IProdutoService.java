package br.com.barao.api_barao.services;

import br.com.barao.api_barao.model.Categoria;
import br.com.barao.api_barao.model.Produto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IProdutoService {
    public Produto inserirNovoProduto(Produto produto);
    public Produto alterarProduto(Produto produto);

    // Métodos que retornam Listas completas
    public List<Produto> listarTodos();
    public Page<Produto> listarPorCategoria(Categoria categoria, int pagina);    public List<Produto> listaIndisponiveis();

    // Métodos que retornam Páginas (Paginação)
    public Page<Produto> listarDisponiveis(int pagina);
    public Page<Produto> listarDestaques(int pagina);
    public Page<Produto> listarPorPalavraChave(String palavraChave, int pagina);

    public Produto recuperarPorId(int id);
}