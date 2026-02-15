package br.com.barao.api_barao.controller;

import br.com.barao.api_barao.dto.CompradorDTO;
import br.com.barao.api_barao.model.Cliente;
import br.com.barao.api_barao.services.IClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor // Gera construtor com argumentos obrigatórios (final)
@CrossOrigin("*")
public class ClienteController {

    // 'final' garante a injeção via construtor e imutabilidade da referência
    private final IClienteService service;

    @GetMapping("/cliente/{telefone}")
    public ResponseEntity<Cliente> buscarPeloTelefone(@PathVariable String telefone){
        Cliente resultado = service.buscarPeloTelefone(telefone);
        if (resultado != null) {
            return ResponseEntity.ok(resultado);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/cliente/nome/{letra}")
    public ResponseEntity<List<Cliente>> buscarPorLetra(@PathVariable String letra){
        return ResponseEntity.ok(service.buscarPorLetra(letra));
    }

    @GetMapping("/cliente")
    public ResponseEntity<List<Cliente>> buscarTodos(){
        return ResponseEntity.ok(service.buscarTodos());
    }

    @GetMapping("/cliente/busca/{keyword}")
    public ResponseEntity<List<Cliente>> buscarPorPalavraChave(@PathVariable String keyword){
        return ResponseEntity.ok(service.buscarPorPalavraChave(keyword));
    }

    @GetMapping("/cliente/compras/{id}")
    public ResponseEntity<List<CompradorDTO>> recuperarCompradores(@PathVariable int id){
        return ResponseEntity.ok(service.buscarCompradores(id));
    }

    @GetMapping("/cliente/aniversario/{mes}")
    public ResponseEntity<List<Cliente>> recuperarAniversariantes(@PathVariable int mes){
        return ResponseEntity.ok(service.buscarAniversariantes(mes));
    }

    @PostMapping("/cliente")
    public ResponseEntity<Cliente> adicionarNovoCliente(@RequestBody Cliente novo){
        try {
            Cliente cli = service.atualizarDados(novo);
            if (cli != null) {
                return ResponseEntity.status(201).body(cli);
            }
        }
        catch(Exception ex) {
            System.err.println("Erro ao incluir Novo Cliente: " + ex.getMessage());
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/cliente")
    public ResponseEntity<Cliente> atualizarCliente(@RequestBody Cliente cliente){
        try {
            Cliente cli = service.atualizarDados(cliente);
            return ResponseEntity.ok(cli);
        }
        catch (Exception ex) {
            System.err.println("Erro ao Atualizar cliente existente: " + ex.getMessage());
        }
        return ResponseEntity.badRequest().build();
    }
}