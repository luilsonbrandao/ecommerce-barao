package br.com.barao.api_barao.dao;

import br.com.barao.api_barao.model.Categoria;
import br.com.barao.api_barao.model.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable; // Import Adicionado
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProdutoDAO extends CrudRepository<Produto, Integer> {

    public Page<Produto> findAllByDisponivel(int disponivel, Pageable pageable);

    // Alterado para List
    public List<Produto> findAllByDisponivelAndCategoria(int disponivel, Categoria cat);
    public List<Produto> findAllByCategoria(Categoria categoria);

    public Page<Produto> findAllByDestaqueAndDisponivel(int destaque, int disponivel, Pageable pageable);

    // Método longo mantido, mas verifique se os nomes dos atributos 'nome' e 'detalhe' batem com a Entity
    public Page<Produto> findAllByDisponivelAndNomeContainingOrDisponivelAndDetalheContaining(int disponivel, String keyNome, int disponivel2, String keyDetalhe, Pageable pageable);

}