package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dao.UsuarioDAO;
import br.com.barao.api_barao.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class UsuarioServiceImpl implements IUsuarioService {

    @Autowired
    private UsuarioDAO dao;

    @Override
    public Usuario recuperarUsuario(Usuario original) {

        Usuario user = dao.findByUsernameOrEmail(original.getUsername(), original.getEmail());
        if (user != null)
            if (user.getSenha().equals(original.getSenha()) && user.getAtivo() == 1) {
                user.setSenha(null);
                return user;
            }
        return null;
    }

    @Override
    public ArrayList<Usuario> recuperarTodos() {
        // TODO Auto-generated method stub
        return (ArrayList<Usuario>) dao.findAll();
    }

    @Override
    public Usuario adicionarNovo(Usuario novo) {
        if (novo.getUsername().length() > 0 && novo.getNome().length() > 0 && novo.getEmail().length() > 0 && novo.getSenha().length() > 0) {
            novo.setAtivo(1);
            try {
                dao.save(novo);
                return novo;
            } catch (Exception ex) {
                ex.printStackTrace();
                return null;
            }
        }
        return null;
    }

    @Override
    public Usuario atualizarUsuario(Usuario user) {
        // TODO Auto-generated method stub
        try {
            dao.save(user);
            return user;
        }
        catch(Exception ex) {
            return null;
        }
    }

    @Override
    public Usuario recuperarPeloId(int id) {
        // TODO Auto-generated method stub
        return dao.findById(id).orElse(null);
    }

}