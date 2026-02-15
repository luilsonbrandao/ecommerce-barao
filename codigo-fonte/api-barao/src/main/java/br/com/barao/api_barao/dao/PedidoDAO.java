package br.com.barao.api_barao.dao;

import br.com.barao.api_barao.dto.VendasPorDataDTO;
import br.com.barao.api_barao.model.Cliente;
import br.com.barao.api_barao.model.Pedido;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface PedidoDAO extends CrudRepository<Pedido, Integer> {

    public List<Pedido> findAllByCliente(Cliente cliente);
    public List<Pedido> findAllByStatusOrderByDataPedidoDesc(int status);

    @Query("SELECT new br.com.barao.api_barao.model.Pedido(ped.idPedido, ped.dataPedido, cli.nome, ped.valorTotal, ped.valorFrete, ped.retirar, ped.observacoes, ped.status)"
            + " FROM Pedido ped INNER JOIN Cliente cli ON ped.cliente.idCliente = cli.idCliente"
            + " WHERE ped.status != 6 and ped.status != 7"
            + " ORDER BY ped.idPedido DESC, ped.dataPedido DESC")
    public List<Pedido> findAllByStatusNotOrderByDataPedidoDesc();

    public List<Pedido> findAllByOrderByDataPedidoDesc();

    /* Métodos de Combinação */
    public List<Pedido> findAllByStatusInOrderByIdPedidoDesc(Collection<Integer> status);
    public List<Pedido> findAllByClienteInOrderByIdPedidoDesc(Collection<Cliente> cliente);
    public List<Pedido> findAllByClienteInAndStatusInOrderByIdPedidoDesc(Collection<Cliente> cliente, Collection<Integer> status);
    public List<Pedido> findAllByDataPedidoBetweenOrderByIdPedidoDesc(LocalDate inicio, LocalDate fim);
    public List<Pedido> findAllByDataPedidoBetweenAndStatusInOrderByIdPedidoDesc(LocalDate inicio, LocalDate fim, Collection<Integer> status);
    public List<Pedido> findAllByDataPedidoBetweenAndClienteInOrderByIdPedidoDesc(LocalDate inicio, LocalDate fim, Collection<Cliente> cliente);
    public List<Pedido> findAllByDataPedidoBetweenAndClienteInAndStatusInOrderByIdPedidoDesc(LocalDate inicio, LocalDate fim, Collection<Cliente> cliente, Collection<Integer> status);

    @Query("SELECT new br.com.barao.api_barao.dto.VendasPorDataDTO(sum(ped.valorTotal), ped.dataPedido) "
            + " FROM Pedido ped WHERE ped.dataPedido BETWEEN :dataIni AND :dataFim"
            + " GROUP BY ped.dataPedido "
            + " ORDER BY ped.dataPedido ASC")
    public List<VendasPorDataDTO> recuperarVendasPorData(@Param("dataIni") LocalDate dataIni,
                                                         @Param("dataFim") LocalDate dataFim);
}