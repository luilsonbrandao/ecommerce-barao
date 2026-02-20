package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dao.ClienteDAO;
import br.com.barao.api_barao.dao.PedidoDAO;
import br.com.barao.api_barao.dao.ProdutoDAO;
import br.com.barao.api_barao.dto.CompradorDTO;
import br.com.barao.api_barao.dto.FiltroPedidoDTO;
import br.com.barao.api_barao.dto.VendasPorDataDTO;
import br.com.barao.api_barao.model.Cliente;
import br.com.barao.api_barao.model.ItemPedido;
import br.com.barao.api_barao.model.Pedido;
import br.com.barao.api_barao.model.Produto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public
class PedidoServiceImpl implements IPedidoService {

    private final PedidoDAO dao;
    private final ClienteDAO cliDao;
    private final ProdutoDAO produtoDao;
    private final IBotService botService;

    @Override
    public Pedido inserirPedido(Pedido novo) {
        try {
            // 1. Regra de Negócio: Atualiza ou salva o cliente
            if (novo.getCliente() != null) {
                // Se o cliente vier sem ID (novo), salva. Se vier com ID, atualiza.
                Cliente cliAtualizado = cliDao.save(novo.getCliente());
                novo.setCliente(cliAtualizado);
            }

            double totalCalculadoItens = 0.0;

            // 2. Regra de Itens e Preços
            for (ItemPedido item : novo.getItensPedido()) {
                // O Front só manda o ID. Buscamos o produto completo no banco.
                Produto produtoReal = produtoDao.findById(item.getProduto().getId()).orElse(null);

                if (produtoReal != null) {
                    // Atualiza o item com o objeto completo (para salvar corretamente no banco)
                    item.setProduto(produtoReal);

                    // Define o preço unitário usando a regra de negócio (Promoção ou Normal)
                    // Usa o Wrapper Double para evitar NullPointerException, mas com fallback seguro
                    Double precoFinal = (produtoReal.getPrecoPromo() != null && produtoReal.getPrecoPromo() > 0)
                            ? produtoReal.getPrecoPromo()
                            : produtoReal.getPreco();

                    item.setPrecoUnitario(precoFinal);
                    item.setPrecoTotal(precoFinal * item.getQtdeItem());

                    totalCalculadoItens += item.getPrecoTotal();
                }
                // Vincula o item ao pedido pai
                item.setPedido(novo);
            }

            // 3. Atualiza valor total (Soma dos itens + Frete que veio da tela)
            novo.setValorTotal(totalCalculadoItens + novo.getValorFrete());

            // 4. Definições Padrão
            novo.setStatus(Pedido.NOVO_PEDIDO);
            novo.setDataPedido(LocalDate.now());

            // 5. Salva o Pedido
            Pedido pedidoSalvo = dao.save(novo);

            // 6. Notificação Telegram
            try {
                if (botService != null) {
                    botService.sendBotMessage(String.valueOf(pedidoSalvo.getIdPedido()));
                }
            } catch (Exception e) {
                System.err.println("Aviso: Erro ao enviar mensagem no Telegram: " + e.getMessage());
            }

            return pedidoSalvo;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null; // Retornar null gera o 400 Bad Request no Controller
        }
    }

    // --- MÉTODOS DE CONSULTA ---

    @Override
    public List<Pedido> buscarPorStatus(int status) {
        return dao.findAllByStatusOrderByDataPedidoDesc(status);
    }

    @Override
    public Pedido mudarStatus(int idPedido, int novoStatus) {
        try {
            Pedido pedido = dao.findById(idPedido).orElse(null);
            if (pedido != null) {
                pedido.setStatus(novoStatus);
                return dao.save(pedido);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Pedido> buscarPorPeriodo(LocalDate inicio, LocalDate fim) {
        return dao.findAllByDataPedidoBetweenOrderByIdPedidoDesc(inicio, fim);
    }

    @Override
    public List<Pedido> buscarTodos() {
        return dao.findAllByOrderByDataPedidoDesc();
    }

    @Override
    public List<VendasPorDataDTO> recuperarTotaisUltimaSemana(LocalDate inicio, LocalDate fim) {
        return dao.recuperarVendasPorData(inicio, fim);
    }

    @Override
    public List<Pedido> filtrarPorVariosCriterios(FiltroPedidoDTO filtro) {
        boolean temNome = filtro.getNome() != null && !filtro.getNome().trim().isEmpty();
        boolean temData = filtro.getDataInicio() != null && filtro.getDataFim() != null;

        boolean temStatus = filtro.getCancelado() != 0 || filtro.getEntregue() != 0 ||
                filtro.getPago() != 0 || filtro.getNovo() != 0 ||
                filtro.getTransporte() != 0 || filtro.getPosVenda() != 0 ||
                filtro.getFinalizado() != 0;

        if (!temData && !temNome && !temStatus) {
            return dao.findAllByStatusNotOrderByDataPedidoDesc();
        }
        else if (!temData && !temNome && temStatus) {
            return dao.findAllByStatusInOrderByIdPedidoDesc(this.getStatus(filtro));
        }
        else if (!temData && temNome && !temStatus) {
            List<Cliente> clientes = cliDao.findByNomeContaining(filtro.getNome());
            return dao.findAllByClienteInOrderByIdPedidoDesc(clientes);
        }
        else if (!temData && temNome && temStatus) {
            List<Cliente> clientes = cliDao.findByNomeContaining(filtro.getNome());
            return dao.findAllByClienteInAndStatusInOrderByIdPedidoDesc(clientes, this.getStatus(filtro));
        }
        else if (temData && !temNome && !temStatus) {
            return dao.findAllByDataPedidoBetweenOrderByIdPedidoDesc(filtro.getDataInicio(), filtro.getDataFim());
        }
        else if (temData && !temNome && temStatus) {
            return dao.findAllByDataPedidoBetweenAndStatusInOrderByIdPedidoDesc(filtro.getDataInicio(), filtro.getDataFim(), this.getStatus(filtro));
        }
        else if (temData && temNome && !temStatus) {
            List<Cliente> clientes = cliDao.findByNomeContaining(filtro.getNome());
            return dao.findAllByDataPedidoBetweenAndClienteInOrderByIdPedidoDesc(filtro.getDataInicio(), filtro.getDataFim(), clientes);
        }
        else if (temData && temNome && temStatus) {
            List<Cliente> clientes = cliDao.findByNomeContaining(filtro.getNome());
            return dao.findAllByDataPedidoBetweenAndClienteInAndStatusInOrderByIdPedidoDesc(filtro.getDataInicio(), filtro.getDataFim(), clientes, this.getStatus(filtro));
        }

        return new ArrayList<>();
    }

    private Collection<Integer> getStatus(FiltroPedidoDTO filtro){
        List<Integer> status = new ArrayList<>();
        if (filtro.getPago() != 0) status.add(Pedido.PAGO);
        if (filtro.getCancelado() != 0) status.add(Pedido.CANCELADO);
        if (filtro.getEntregue() != 0) status.add(Pedido.ENTREGUE);
        if (filtro.getNovo() != 0) status.add(Pedido.NOVO_PEDIDO);
        if (filtro.getTransporte() != 0) status.add(Pedido.EM_TRANSPORTE);
        if (filtro.getPosVenda() != 0) status.add(Pedido.POS_VENDA);
        if (filtro.getFinalizado() != 0) status.add(Pedido.FINALIZADO);
        return status;
    }

    @Override
    public Pedido buscarPeloId(int id) {
        return dao.findById(id).orElse(null);
    }

    @Override
    public List<Pedido> buscarNaoCancelados() {
        return dao.findAllByStatusNotOrderByDataPedidoDesc();
    }

    @Override
    public Pedido atualizarPedido(Pedido pedido) {
        if (pedido.getItensPedido() != null) {
            for (ItemPedido item : pedido.getItensPedido()) {
                item.setPedido(pedido);
            }
        }
        return dao.save(pedido);
    }

    @Override
    public Pedido buscarPeloUuid(String uuid) {
        // Usa o método novo do DAO
        return dao.findByUuid(uuid).orElse(null);
    }
    @Override
    public List<CompradorDTO> buscarCompradoresDoProduto(int idProduto) {
        return dao.buscarCompradoresPorProduto(idProduto);
    }
}