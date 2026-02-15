package br.com.barao.api_barao.dao;

import br.com.barao.api_barao.dto.ItemFinanceiroDTO;
import br.com.barao.api_barao.model.RegistroFinanceiro;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RegistroFinanceiroDAO extends CrudRepository<RegistroFinanceiro, Integer> {

    /* CORREÇÃO:
     * - ped.id -> ped.idPedido
     * - cli.id -> cli.idCliente
     */
    @Query("SELECT new br.com.barao.api_barao.dto.ItemFinanceiroDTO("
            + " fin.numSeq, ped.idPedido, cli.nome, cli.telefone, "
            + " fin.numParcela, fin.totalParcelas, fin.vencimento,"
            + " fin.valorBruto, pgt.numSeq, pgt.descricao, fin.percentRetencao, "
            + " fin.valorRetencao, fin.valorLiquido, fin.status) "
            + " FROM RegistroFinanceiro fin "
            + " INNER JOIN Pedido ped ON fin.pedido.idPedido = ped.idPedido"
            + " INNER JOIN Cliente cli on ped.cliente.idCliente = cli.idCliente "
            + " INNER JOIN FormaPagamento pgt on pgt.numSeq = fin.forma.numSeq "
            + " WHERE fin.status != -1")
    public List<ItemFinanceiroDTO> recuperarItensFinanceiros();
}