package br.com.barao.api_barao.dao;

import br.com.barao.api_barao.model.Categoria;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CategoriaDAO extends CrudRepository<Categoria, Integer> {

    // consultas customizadas

    // 1- consultar categoria por palavra chave
    public List<Categoria> findByNomeContaining(String palavra);

}