package br.com.barao.api_barao.services;

import br.com.barao.api_barao.model.Categoria;

import java.util.ArrayList;

public interface ICategoriaService {
    // este método recebe uma categoria só com o nome preenchido e vai inserir no banco
    public Categoria inserirNovaCategoria(Categoria categoria);

    // este método vai alterar a categoria existente e retorna-la se o update der certo e null caso contrário
    public Categoria alterarCategoria(Categoria categoria);

    // este método vai recuperar todas as categorias sem filtro
    public ArrayList<Categoria> recuperarTodasCategorias();

    // este método vai recuperar todas as categorias por palavra chave
    public ArrayList<Categoria> recuperarPorPalavraChave(String palavraChave);
}
