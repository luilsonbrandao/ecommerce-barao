package br.com.barao.api_barao.controller;

import br.com.barao.api_barao.dto.PathDTO;
import br.com.barao.api_barao.model.Categoria;
import br.com.barao.api_barao.model.Produto;
import br.com.barao.api_barao.services.IProdutoService;
import br.com.barao.api_barao.services.IUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProdutoController {

    private final IProdutoService service;
    private final IUploadService upload;

    // --- 1. CRIAR PRODUTO ---
    @PostMapping("/produto")
    public ResponseEntity<Produto> novoProduto(@RequestBody Produto novo){
        try{
            Produto resultado = service.inserirNovoProduto(novo);
            if (resultado != null) {
                return ResponseEntity.status(201).body(resultado);
            }
        } catch (Exception ex){
            System.err.println("Erro ao criar produto: " + ex.getMessage());
        }
        return ResponseEntity.badRequest().build();
    }

    // --- 2. ATUALIZAR PRODUTO (Faltava este método) ---
    @PutMapping("/produto/{idProduto}")
    public ResponseEntity<Produto> atualizarProduto(@RequestBody Produto atual, @PathVariable int idProduto){
        try {
            // Segurança: Garante que o ID da URL bate com o do Corpo
            if (idProduto != atual.getId()) {
                return ResponseEntity.badRequest().build();
            }
            Produto res = service.alterarProduto(atual);
            if (res != null) {
                return ResponseEntity.ok(res);
            }
        } catch(Exception ex) {
            ex.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }

    // --- 3. UPLOAD DE FOTO ---
    @PostMapping("/produto/upload")
    public ResponseEntity<PathDTO> uploadFoto(@RequestParam(name = "arquivo") MultipartFile arquivo){
        String path = upload.uploadFile(arquivo);
        if (path != null){
            PathDTO pathDto = new PathDTO();
            pathDto.setPathToFile(path);
            return ResponseEntity.status(201).body(pathDto);
        }
        return ResponseEntity.badRequest().build();
    }

    // --- 4. LISTAR NA HOME (Paginado) ---
    @GetMapping("/produto")
    public ResponseEntity<Page<Produto>> recuperarTodos(@RequestParam(defaultValue = "0") int page){
        return ResponseEntity.ok(service.listarDisponiveis(page));
    }

    // --- 5. LISTAR TUDO (Sem paginação - Faltava este método) ---
    // Útil para o Dashboard Administrativo
    @GetMapping("/produto/todos")
    public ResponseEntity<List<Produto>> buscarTodos(){
        return ResponseEntity.ok(service.listarTodos());
    }

    // --- 6. LISTAR POR CATEGORIA  ---
    @GetMapping("/produto/categoria/{id}")
    public ResponseEntity<Page<Produto>> recuperarPorCategoria(@PathVariable(name = "id") int idCateg,
                                                               @RequestParam(defaultValue = "0") int page){
        Categoria cat = new Categoria();
        cat.setId(idCateg);

        return ResponseEntity.ok(service.listarPorCategoria(cat, page));
    }

    // --- 7. DETALHE DO PRODUTO ---
    @GetMapping("/produto/{id}")
    public ResponseEntity<Produto> recuperarPorId(@PathVariable(name = "id") int idProduto){
        Produto prod = service.recuperarPorId(idProduto);
        if (prod != null){
            return ResponseEntity.ok(prod);
        }
        return ResponseEntity.notFound().build();
    }

    // --- 8. BUSCA POR PALAVRA CHAVE ---
    @GetMapping("/produto/busca")
    public ResponseEntity<Page<Produto>> buscarPorPalavraChave(@RequestParam("key") String key, @RequestParam(defaultValue = "0") int page){
        return ResponseEntity.ok(service.listarPorPalavraChave(key, page));
    }
}