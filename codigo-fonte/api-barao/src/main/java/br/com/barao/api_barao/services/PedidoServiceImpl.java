package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dao.ClienteDAO;
import br.com.barao.api_barao.dao.PedidoDAO;
import br.com.barao.api_barao.model.ItemPedido;
import br.com.barao.api_barao.model.Pedido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;


@Component
public class PedidoServiceImpl implements IPedidoService{

    @Autowired
    private PedidoDAO dao;

    @Override
    public Pedido inserirPedido(Pedido novo) {
        try {
            double total = 0.0;
            /* aqui em tese vem a regra de negócios */
            for (ItemPedido item: novo.getItensPedido()) {
                item.setPrecoUnitario(item.getProduto().getPreco());

                if (item.getQtdeItem() >= 5) {  // vou dar 20% de desconto
                    item.setPrecoTotal(item.getPrecoUnitario() * item.getQtdeItem() * 0.8);
                }
                else {
                    item.setPrecoTotal(item.getPrecoUnitario() * item.getQtdeItem());
                }
                total += item.getPrecoTotal();
            }
            /* ---- */
            for (ItemPedido item: novo.getItensPedido()) {
                item.setPedido(novo);
            }
            novo.setValorTotal(total);
            dao.save(novo);
            return novo;
        }
        catch (Exception ex) {
            return null;
        }

    }

    @Override
    public Pedido atualizarPedido(Pedido pedido) {
        return null;
    }

    @Override
    public ArrayList<Pedido> buscarPorStatus(int status) {
        return null;
    }

    @Override
    public ArrayList<Pedido> buscarNaoCancelados() {
        return null;
    }

    @Override
    public Pedido mudarStatus(int idPedido, int novoStatus) {
        return null;
    }

    @Override
    public ArrayList<Pedido> buscarPorPeriodo(LocalDate inicio, LocalDate fim) {
        return null;
    }

    @Override
    public ArrayList<Pedido> buscarTodos() {
        return null;
    }


}