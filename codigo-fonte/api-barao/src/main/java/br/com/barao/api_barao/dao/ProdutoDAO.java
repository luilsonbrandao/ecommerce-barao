package br.com.barao.api_barao.dao;

import br.com.barao.api_barao.model.Categoria;
import br.com.barao.api_barao.model.Produto;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface ProdutoDAO extends CrudRepository<Produto, Integer> {
    public ArrayList<Produto> findAllByDisponivel(int disponivel);
    public ArrayList<Produto> findAllByDisponivelAndCategoria(int disponivel, Categoria cat);
    public ArrayList<Produto> findAllByCategoria(Categoria categoria);

}
