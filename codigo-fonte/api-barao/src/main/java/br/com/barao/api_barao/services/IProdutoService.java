package br.com.barao.api_barao.services;

import br.com.barao.api_barao.model.Categoria;
import br.com.barao.api_barao.model.Produto;

import java.util.ArrayList;

public interface IProdutoService {
    public Produto inserirNovoProduto(Produto produto);
    public Produto alterarProduto(Produto produto);
    public ArrayList<Produto> listarTodos();
    public ArrayList<Produto> listarDisponiveis();
    public ArrayList<Produto> listarIndisponiveis();
    public ArrayList<Produto> listarPorCategoria(Categoria categoria);
    public Produto recuperarPorId(int id);
}
