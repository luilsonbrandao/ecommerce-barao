package br.com.barao.api_barao.controller;

import br.com.barao.api_barao.model.Frete;
import br.com.barao.api_barao.services.IFreteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FreteController {

    private final IFreteService service;

    @GetMapping("/fretesdisponiveis")
    public ResponseEntity<List<Frete>> buscarDisponiveis() {
        return ResponseEntity.ok(service.recuperarDisponiveis());
    }

    @GetMapping("/fretes/{id}")
    public ResponseEntity<Frete> recuperarPeloId(@PathVariable int id){
        Frete res = service.recuperarPeloId(id);
        if (res != null) {
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/fretes/prefixo/{prefixo}")
    public ResponseEntity<Frete> recuperarPeloPrefixo(@PathVariable String prefixo){
        Frete res = service.recuperarPeloPrefixo(prefixo);
        if (res != null) {
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/fretes")
    @Operation(summary = "Recuperar todos os fretes", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<Frete>> buscarTodos() {
        return ResponseEntity.ok(service.recuperarTodos());
    }

    @PostMapping("/fretes")
    public ResponseEntity<Frete> adicionarNovo(@RequestBody Frete novo) {
        try {
            Frete adicionado = service.inserirFrete(novo);
            if (adicionado != null) {
                return ResponseEntity.status(201).body(adicionado);
            }
        } catch (Exception ex) {
            System.err.println("DEBUG - Erro ao gravar FRETE " + ex.getMessage());
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/fretes")
    public ResponseEntity<Frete> atualizarFrete(@RequestBody Frete frete) {
        try {
            Frete atualizado = service.atualizarFrete(frete);
            if (atualizado != null) {
                return ResponseEntity.ok(atualizado);
            }
        } catch (Exception ex) {
            System.err.println("DEBUG - Erro ao atualizar FRETE " + ex.getMessage());
        }
        return ResponseEntity.badRequest().build();
    }
}