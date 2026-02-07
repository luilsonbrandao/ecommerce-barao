package br.com.barao.api_barao.dao;

import br.com.barao.api_barao.model.Cliente;
import br.com.barao.api_barao.model.Pedido;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

/* possiveis combinações */
/* 0 - Todos
 * 1 - somente status
 * 2 - somente nome
 * 3 - nome e status
 * 4 - somente data
 * 5 - data e status
 * 6 - data e nome
 * 7 - data, nome e estatus
 *
 */
public interface PedidoDAO extends CrudRepository<Pedido, Integer> {

    public ArrayList<Pedido> findAllByCliente(Cliente cliente);

}
