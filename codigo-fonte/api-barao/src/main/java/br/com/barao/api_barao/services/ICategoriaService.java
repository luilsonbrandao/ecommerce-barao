package br.com.barao.api_barao.services;

import br.com.barao.api_barao.model.Categoria;

import java.util.ArrayList;
import java.util.List;

public interface ICategoriaService {
    // este método recebe uma categoria só com o nome preenchido e vai inserir no banco
    public Categoria inserirNovaCategoria(Categoria categoria);

    // este método vai alterar a categoria existente e retorna-la se o update der certo e null caso contrário
    public Categoria alterarCategoria(Categoria categoria);

    // este método vai recuperar todas as categorias sem filtro
    public List<Categoria> recuperarTodasCategorias();

    // este método vai recuperar todas as categorias por palavra chave
    public List<Categoria> recuperarPorPalavraChave(String palavraChave);

    // recuperar 1 única categoria
    public Categoria recuperarPorId(int id);

    // recuperar tods ordenadas pelo Id
    public List<Categoria> recuperarTodasOrdenadasPeloId();
}
