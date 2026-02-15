package br.com.barao.api_barao.controller;

import br.com.barao.api_barao.model.Pedido;
import br.com.barao.api_barao.services.IPedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PedidoController {

    private final IPedidoService service;

    @PostMapping("/pedido")
    public ResponseEntity<Pedido> inserirNovoPedido(@RequestBody Pedido novo) {
        // Logs removidos para limpar código (use @Slf4j em produção)
        Pedido salvo = service.inserirPedido(novo);
        if (salvo != null) {
            return ResponseEntity.status(201).body(salvo);
        } else {
            return ResponseEntity.status(400).build();
        }
    }
}