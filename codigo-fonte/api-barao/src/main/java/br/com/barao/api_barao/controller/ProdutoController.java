package br.com.barao.api_barao.controller;

import br.com.barao.api_barao.model.Categoria;
import br.com.barao.api_barao.model.Produto;
import br.com.barao.api_barao.services.IProdutoService;
import br.com.barao.api_barao.services.IUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@RestController
public class ProdutoController {
    @Autowired
    private IProdutoService service;

    @Autowired
    private IUploadService upload;

    @PostMapping("/produto")
    public ResponseEntity<Produto> novoProduto(@RequestBody Produto novo){
        try{
            service.inserirNovoProduto(novo);
            return ResponseEntity.status(201).body(novo);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/produto/upload")
    public ResponseEntity<String> uploadFoto(@RequestParam(name = "arquivo")MultipartFile arquivo){
        String path = upload.uploadFile(arquivo);
        if (path != null){
            return ResponseEntity.status(201).body(path);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/produto")
    public ResponseEntity<ArrayList<Produto>> recuperarTodos(){
        return ResponseEntity.ok(service.listarDisponiveis());
    }

    @GetMapping("/produto/categoria/{id}")
    public ResponseEntity<ArrayList<Produto>> recuperarPorCategoria(@PathVariable (name = "id") int idCateg){
        Categoria cat = new Categoria();
        cat.setId(idCateg);
        return ResponseEntity.ok(service.listarPorCategoria(cat));
    }

    @GetMapping("/produto/{id}")
    public ResponseEntity<Produto> recuperarPorId(@PathVariable (name = "id") int idProduto){
        Produto prod = service.recuperarPorId(idProduto);
        if (prod != null){
            return ResponseEntity.ok(prod);
        }
        return ResponseEntity.notFound().build();
    }
}
