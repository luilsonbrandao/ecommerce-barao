package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dto.FiltroPedidoDTO;
import br.com.barao.api_barao.dto.VendasPorDataDTO;
import br.com.barao.api_barao.model.Pedido;

import java.time.LocalDate;
import java.util.List;

public interface IPedidoService {

    public Pedido inserirPedido(Pedido novo);
    public Pedido atualizarPedido(Pedido pedido);
    public List<Pedido> buscarPorStatus(int status);
    public List<Pedido> buscarNaoCancelados();
    public Pedido mudarStatus(int idPedido, int novoStatus);
    public List<Pedido> buscarPorPeriodo(LocalDate inicio, LocalDate fim);
    public List<Pedido> buscarTodos();

    public List<Pedido> filtrarPorVariosCriterios(FiltroPedidoDTO filtro);
    public List<VendasPorDataDTO> recuperarTotaisUltimaSemana(LocalDate inicio, LocalDate fim);
    public Pedido buscarPeloId(int id);
    public Pedido buscarPeloUuid(String uuid);
}