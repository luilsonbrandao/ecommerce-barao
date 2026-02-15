package br.com.barao.api_barao.controller;

import br.com.barao.api_barao.model.Categoria;
import br.com.barao.api_barao.services.ICategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoriaController {

    private final ICategoriaService service;

    @GetMapping("/categoria")
    public ResponseEntity<List<Categoria>> listarTodas(){
        return ResponseEntity.ok(service.recuperarTodasCategorias());
    }

    @GetMapping("/categoria/search")
    public ResponseEntity<List<Categoria>> recuperarPorPalavraChave(@RequestParam(name = "key") String palavraChave){
        if (palavraChave != null){
            return ResponseEntity.ok(service.recuperarPorPalavraChave(palavraChave));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/categoria")
    public ResponseEntity<Categoria> adicionarNova(@RequestBody Categoria categoria){
        // Garante que é uma inserção (ID null)
        categoria.setId(null);

        Categoria resultado = service.inserirNovaCategoria(categoria);
        if (resultado != null){
            return ResponseEntity.status(201).body(resultado);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/categoria")
    public ResponseEntity<Categoria> alterarDados(@RequestBody Categoria categoria){
        Categoria resultado = service.alterarCategoria(categoria);
        if (resultado != null){
            return ResponseEntity.ok(resultado);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<Categoria> recuperarDetalhes(@PathVariable(name="id") int id){
        Categoria resultado = service.recuperarPorId(id);
        if (resultado != null) {
            return ResponseEntity.ok(resultado);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/categoriabyid")
    public ResponseEntity<List<Categoria>> recuperarTodasOrdenadasPeloId(){
        return ResponseEntity.ok(service.recuperarTodasOrdenadasPeloId());
    }
}