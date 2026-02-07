package br.com.barao.api_barao.services;


import br.com.barao.api_barao.model.Pedido;

import java.time.LocalDate;
import java.util.ArrayList;

public interface IPedidoService {

    public Pedido inserirPedido(Pedido novo);
    public Pedido atualizarPedido(Pedido pedido);
    public ArrayList<Pedido> buscarPorStatus(int status);
    public ArrayList<Pedido> buscarNaoCancelados();
    public Pedido mudarStatus(int idPedido, int novoStatus);
    public ArrayList<Pedido> buscarPorPeriodo(LocalDate inicio, LocalDate fim);
    public ArrayList<Pedido> buscarTodos();


}