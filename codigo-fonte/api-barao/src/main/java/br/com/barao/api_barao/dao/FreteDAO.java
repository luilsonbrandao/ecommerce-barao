package br.com.barao.api_barao.dao;

import br.com.barao.api_barao.model.Frete;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FreteDAO extends CrudRepository<Frete, Integer> {

    public List<Frete> findAllByDisponivelOrderByPrefixoDesc(int disponivel);
    public Frete findByPrefixo(String prefixo);

}