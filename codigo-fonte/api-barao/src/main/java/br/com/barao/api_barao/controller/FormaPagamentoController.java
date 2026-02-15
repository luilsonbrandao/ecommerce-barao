package br.com.barao.api_barao.controller;

import br.com.barao.api_barao.model.FormaPagamento;
import br.com.barao.api_barao.services.IFormaPgtoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FormaPagamentoController {

    private final IFormaPgtoService service;

    // Usei required = false para o parâmetro, caso ele não venha, tratamos no if
    @GetMapping("/formaspagamento")
    public ResponseEntity<List<FormaPagamento>> recuperarTodas(@RequestParam(name = "visivel", required = false) String visivel) {
        if ("1".equals(visivel)) { // Comparação segura contra null (Yoda condition)
            return ResponseEntity.ok(service.buscarVisiveis());
        } else {
            return ResponseEntity.ok(service.buscarTodas());
        }
    }

    @GetMapping("/formaspagamento/{id}")
    public ResponseEntity<FormaPagamento> recuperarPeloId(@PathVariable int id) {
        FormaPagamento forma = service.buscarPeloId(id);
        if (forma != null) {
            return ResponseEntity.ok(forma);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/formaspagamento")
    public ResponseEntity<FormaPagamento> inserirNovo(@RequestBody FormaPagamento novo) {
        try {
            FormaPagamento resultado = service.atualizar(novo);
            if (resultado != null) {
                return ResponseEntity.ok(resultado);
            }
        } catch (Exception ex) {
            System.err.println("Erro ao inserir Forma de Pagamento: " + ex.getMessage());
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/formaspagamento")
    public ResponseEntity<FormaPagamento> atualizar(@RequestBody FormaPagamento novo) {
        try {
            FormaPagamento resultado = service.atualizar(novo);
            if (resultado != null) {
                return ResponseEntity.ok(resultado);
            }
        } catch (Exception ex) {
            System.err.println("Erro ao atualizar Forma de Pagamento: " + ex.getMessage());
        }
        return ResponseEntity.badRequest().build();
    }
}