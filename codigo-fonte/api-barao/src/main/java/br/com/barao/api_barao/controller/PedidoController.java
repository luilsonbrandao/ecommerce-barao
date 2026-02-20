package br.com.barao.api_barao.controller;

import br.com.barao.api_barao.dto.CompradorDTO;
import br.com.barao.api_barao.dto.FiltroPedidoDTO;
import br.com.barao.api_barao.dto.VendasPorDataDTO;
import br.com.barao.api_barao.model.Pedido;
import br.com.barao.api_barao.services.IPedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class PedidoController {

    private final IPedidoService service;

    // --- 1. CRIAR NOVO PEDIDO (Cliente Final) ---
    @PostMapping("/pedido")
    public ResponseEntity<Pedido> inserirNovoPedido(@RequestBody Pedido novo) {
        Pedido salvo = service.inserirPedido(novo);
        if (salvo != null) {
            return ResponseEntity.status(201).body(salvo);
        } else {
            return ResponseEntity.status(400).build();
        }
    }

    // --- 2. BUSCAR PEDIDO POR ID (Recibo / Detalhes) ---
    @GetMapping("/pedido/search/{uuid}")
    public ResponseEntity<Pedido> recuperarPeloUuid(@PathVariable String uuid) {

        Pedido pedido = service.buscarPeloUuid(uuid); // Chama o serviço novo

        if (pedido != null) {
            return ResponseEntity.ok(pedido);
        }
        return ResponseEntity.notFound().build(); // Retorna 404 se o código estiver errado
    }

    // --- 3. FILTRAR PEDIDOS (Painel Administrativo) ---
    @PostMapping("/pedido/filtrar")
    public ResponseEntity<List<Pedido>> recuperarTodos(@RequestBody FiltroPedidoDTO parametros) {
        return ResponseEntity.ok(service.filtrarPorVariosCriterios(parametros));
    }

    // --- 4. ALTERAR STATUS DO PEDIDO (Painel Administrativo) ---
    // Ex: /pedido/123?status=2 (Muda para Pago)
    @GetMapping("/pedido/{id}")
    public ResponseEntity<Pedido> alterarStatus(@PathVariable int id, @RequestParam(name = "status") int status) {
        try {
            Pedido pedido = service.mudarStatus(id, status);
            if (pedido != null) {
                return ResponseEntity.ok(pedido);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception ex) {
            return ResponseEntity.status(500).build();
        }
    }

    // --- 5. RELATÓRIO DE VENDAS RECENTES (Gráfico Dashboard) ---
    @GetMapping("/pedido/recentes")
    public ResponseEntity<List<VendasPorDataDTO>> recuperaUltimasVendas(@RequestParam("inicio") String dataIni,
                                                                        @RequestParam("fim") String dataFim) {
        try {
            LocalDate ini = LocalDate.parse(dataIni);
            LocalDate fim = LocalDate.parse(dataFim);
            return ResponseEntity.ok(service.recuperarTotaisUltimaSemana(ini, fim));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // --- 6. ATUALIZAR DADOS DO PEDIDO (Edição Admin) ---
    @PutMapping("/pedido")
    public ResponseEntity<Pedido> atualizarPedido(@RequestBody Pedido pedido) {
        try {
            Pedido atualizado = service.atualizarPedido(pedido);
            if (atualizado == null) {
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok(atualizado);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    // --- 7. BUSCAR PEDIDO COMPLETO (Modal do Painel Admin) ---
    @GetMapping("/pedido/detalhes/{id}")
    public ResponseEntity<Pedido> recuperarPedidoCompleto(@PathVariable int id) {
        Pedido pedido = service.buscarPeloId(id);
        if (pedido != null) {
            return ResponseEntity.ok(pedido);
        }
        return ResponseEntity.notFound().build();
    }

    // --- 8. LISTAR COMPRADORES DE UM PRODUTO ---
    @GetMapping("/pedido/produto/{idProduto}/compradores")
    public ResponseEntity<List<CompradorDTO>> listarCompradores(@PathVariable int idProduto) {
        return ResponseEntity.ok(service.buscarCompradoresDoProduto(idProduto));
    }
}