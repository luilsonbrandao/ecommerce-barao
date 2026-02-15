package br.com.barao.api_barao.controller;

import br.com.barao.api_barao.model.Usuario;
import br.com.barao.api_barao.security.JWTToken;
import br.com.barao.api_barao.security.JWTTokenUtil;
import br.com.barao.api_barao.services.IUsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor // 1. Injeção moderna via construtor
// @CrossOrigin("*") // 2. Removido (Já está no SecurityConfig)
public class UsuarioController {

    private final IUsuarioService service; // 'final' é obrigatório para o RequiredArgsConstructor

    @PostMapping("/login")
    public ResponseEntity<JWTToken> fazerLogin(@RequestBody Usuario dadosLogin) {
        Usuario user = service.recuperarUsuario(dadosLogin);
        if (user != null) {
            JWTToken jwtToken = new JWTToken();
            jwtToken.setToken(JWTTokenUtil.generateToken(user));
            return ResponseEntity.ok(jwtToken);
        }
        return ResponseEntity.status(403).build();
    }

    @GetMapping("/usuario")
    public ResponseEntity<List<Usuario>> recuperarTodos(){ // 3. Retorno List (Interface)
        return ResponseEntity.ok(service.recuperarTodos());
    }

    @PostMapping("/usuario")
    public ResponseEntity<Usuario> adicionarNovo(@RequestBody Usuario usuario){
        Usuario res = service.adicionarNovo(usuario);
        if (res != null) {
            return ResponseEntity.status(201).body(res); // 201 Created é o correto para inserção
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/usuario/{id}")
    public ResponseEntity<Usuario> alterarDados(@RequestBody Usuario usuario, @PathVariable int id){
        usuario.setId(id);
        Usuario res = service.atualizarUsuario(usuario);
        if (res != null) {
            return ResponseEntity.ok(res);
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<Usuario> recuperarPeloId(@PathVariable int id){
        Usuario res = service.recuperarPeloId(id);
        if (res != null) {
            return ResponseEntity.ok(res);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
}