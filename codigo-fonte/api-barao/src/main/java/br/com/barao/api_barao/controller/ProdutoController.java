package br.com.barao.api_barao.controller;

import br.com.barao.api_barao.model.Categoria;
import br.com.barao.api_barao.model.Produto;
import br.com.barao.api_barao.services.IProdutoService;
import br.com.barao.api_barao.services.IUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page; // Importante para Paginação
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
// @CrossOrigin("*")
public class ProdutoController {

    private final IProdutoService service;
    private final IUploadService upload;

    @PostMapping("/produto")
    public ResponseEntity<Produto> novoProduto(@RequestBody Produto novo){
        try{
            // O serviço já retorna o produto salvo
            Produto resultado = service.inserirNovoProduto(novo);
            if (resultado != null) {
                return ResponseEntity.status(201).body(resultado);
            }
        } catch (Exception ex){
            System.err.println("Erro ao criar produto: " + ex.getMessage());
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/produto/upload")
    public ResponseEntity<String> uploadFoto(@RequestParam(name = "arquivo") MultipartFile arquivo){
        String path = upload.uploadFile(arquivo);
        if (path != null){
            return ResponseEntity.status(201).body(path);
        }
        return ResponseEntity.badRequest().build();
    }


    @GetMapping("/produto")
    public ResponseEntity<Page<Produto>> recuperarTodos(@RequestParam(defaultValue = "0") int page){
        return ResponseEntity.ok(service.listarDisponiveis(page));
    }


    @GetMapping("/produto/categoria/{id}")
    public ResponseEntity<List<Produto>> recuperarPorCategoria(@PathVariable(name = "id") int idCateg){
        Categoria cat = new Categoria();
        cat.setId(idCateg);
        return ResponseEntity.ok(service.listarPorCategoria(cat));
    }

    @GetMapping("/produto/{id}")
    public ResponseEntity<Produto> recuperarPorId(@PathVariable(name = "id") int idProduto){
        Produto prod = service.recuperarPorId(idProduto);
        if (prod != null){
            return ResponseEntity.ok(prod);
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoint Extra sugerido: Busca por palavra chave paginada
    @GetMapping("/produto/busca")
    public ResponseEntity<Page<Produto>> buscarPorPalavraChave(@RequestParam("key") String key, @RequestParam(defaultValue = "0") int page){
        return ResponseEntity.ok(service.listarPorPalavraChave(key, page));
    }
}