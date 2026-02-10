package br.com.barao.api_barao.dao;

import br.com.barao.api_barao.model.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioDAO extends CrudRepository<Usuario, Integer> {
    public Usuario findByUsernameOrEmail(String username, String email);
}