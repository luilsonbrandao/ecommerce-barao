package br.com.barao.api_barao.services;


import br.com.barao.api_barao.model.Usuario;

import java.util.ArrayList;

public interface IUsuarioService {
    public Usuario recuperarUsuario(Usuario original);
    public ArrayList<Usuario> recuperarTodos();
    public Usuario adicionarNovo(Usuario novo);
    public Usuario atualizarUsuario(Usuario user);
    public Usuario recuperarPeloId(int id);
}