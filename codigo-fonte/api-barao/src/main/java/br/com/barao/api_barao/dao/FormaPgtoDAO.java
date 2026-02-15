package br.com.barao.api_barao.dao;

import br.com.barao.api_barao.model.FormaPagamento;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FormaPgtoDAO extends CrudRepository<FormaPagamento, Integer> {

    public List<FormaPagamento> findAllByVisivel(int visivel);

}