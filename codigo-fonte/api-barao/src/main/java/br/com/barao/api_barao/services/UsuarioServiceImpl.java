package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dao.UsuarioDAO;
import br.com.barao.api_barao.model.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements IUsuarioService {

    private final UsuarioDAO dao;

    @Override
    public Usuario recuperarUsuario(Usuario original) {
        Usuario user = dao.findByUsernameOrEmail(original.getUsername(), original.getEmail());
        if (user != null) {
            // Em produção, use BCrypt para comparar senhas, nunca equals direto em texto plano!
            if (user.getSenha().equals(original.getSenha()) && user.getAtivo() == 1) {
                user.setSenha(null); // Apaga a senha antes de devolver para o controller
                return user;
            }
        }
        return null;
    }

    @Override
    public List<Usuario> recuperarTodos() {
        return (List<Usuario>) dao.findAll();
    }

    @Override
    public Usuario adicionarNovo(Usuario novo) {
        // Validação simples
        if (novo.getUsername() != null && !novo.getUsername().isEmpty() &&
                novo.getNome() != null && !novo.getNome().isEmpty() &&
                novo.getEmail() != null && !novo.getEmail().isEmpty() &&
                novo.getSenha() != null && !novo.getSenha().isEmpty()) {

            novo.setAtivo(1);
            try {
                return dao.save(novo);
            } catch (Exception ex) {
                System.err.println("Erro ao adicionar usuário: " + ex.getMessage());
                ex.printStackTrace();
            }
        }
        return null;
    }

    @Override
    public Usuario atualizarUsuario(Usuario user) {
        try {
            // Verifica se o ID existe antes de salvar (para garantir que é update)
            if (user.getId() > 0 && dao.existsById(user.getId())) {
                return dao.save(user);
            }
        } catch (Exception ex) {
            System.err.println("Erro ao atualizar usuário: " + ex.getMessage());
        }
        return null;
    }

    @Override
    public Usuario recuperarPeloId(int id) {
        return dao.findById(id).orElse(null);
    }
}