package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dao.ClienteDAO;
import br.com.barao.api_barao.dao.PedidoDAO;
import br.com.barao.api_barao.dto.FiltroPedidoDTO;
import br.com.barao.api_barao.dto.VendasPorDataDTO;
import br.com.barao.api_barao.model.Cliente;
import br.com.barao.api_barao.model.ItemPedido;
import br.com.barao.api_barao.model.Pedido;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoServiceImpl implements IPedidoService {

    private final PedidoDAO dao;
    private final ClienteDAO cliDao;
    private final IBotService botService;

    @Override
    public Pedido inserirPedido(Pedido novo) {
        try {
            // 1. Regra de Negócio trazida do Controller Legado:
            // Atualiza ou salva o cliente antes de fechar o pedido para garantir consistência
            if (novo.getCliente() != null) {
                Cliente cliAtualizado = cliDao.save(novo.getCliente());
                novo.setCliente(cliAtualizado);
            }

            // 2. Regra de Itens e Preços
            for (ItemPedido item : novo.getItensPedido()) {
                if (item.getProduto() != null) {
                    item.setPrecoUnitario(item.getProduto().getPrecoPromo());
                    item.setPrecoTotal(item.getPrecoUnitario() * item.getQtdeItem());
                }
                item.setPedido(novo);
            }

            // 3. Definições Padrão
            novo.setStatus(Pedido.NOVO_PEDIDO);
            novo.setDataPedido(LocalDate.now()); // Garante data atual

            // 4. Salva o Pedido
            dao.save(novo);

            // 5. Notificação Telegram
            try {
                if (botService != null) {
                    botService.sendBotMessage(String.valueOf(novo.getIdPedido()));
                }
            } catch (Exception e) {
                System.err.println("Aviso: Erro ao enviar mensagem no Telegram: " + e.getMessage());
            }

            return novo;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    // --- O resto do arquivo permanece igual ao que você enviou ---

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
}