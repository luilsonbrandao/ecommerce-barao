package br.com.barao.api_barao.dao;

import br.com.barao.api_barao.model.Categoria;
import br.com.barao.api_barao.model.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository; //


public interface ProdutoDAO extends JpaRepository<Produto, Integer> {


    public Page<Produto> findAllByDisponivel(int disponivel, Pageable pageable);

    public Page<Produto> findAllByDisponivelAndCategoria(int disponivel, Categoria cat, Pageable pageable);

    public Page<Produto> findAllByDestaqueAndDisponivel(int destaque, int disponivel, Pageable pageable);

    public Page<Produto> findAllByDisponivelAndNomeContainingOrDisponivelAndDetalheContaining(
            int disponivel, String keyNome, int disponivel2, String keyDetalhe, Pageable pageable);
}