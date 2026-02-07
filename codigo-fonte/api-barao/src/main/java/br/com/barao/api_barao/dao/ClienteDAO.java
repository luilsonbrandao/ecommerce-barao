package br.com.barao.api_barao.dao;

import br.com.barao.api_barao.model.Cliente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface ClienteDAO extends CrudRepository<Cliente, Integer> {

    public Cliente findByEmailOrTelefone(String email, String telefone);


}