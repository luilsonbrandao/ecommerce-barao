package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dao.CategoriaDAO;
import br.com.barao.api_barao.model.Categoria;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaServiceImpl implements ICategoriaService {

    private final CategoriaDAO dao;

    @Override
    public Categoria inserirNovaCategoria(Categoria categoria) {
        try {
            if (categoria.getNome() != null && !categoria.getNome().trim().isEmpty()) {
                return dao.save(categoria);
            }
        } catch (Exception ex) {
            System.err.println("Erro ao inserir categoria: " + ex.getMessage());
        }
        return null;
    }

    @Override
    public Categoria alterarCategoria(Categoria categoria) {
        try {
            if (categoria.getId() != null && categoria.getNome() != null && !categoria.getNome().trim().isEmpty()) {
                return dao.save(categoria);
            }
        } catch (Exception ex) {
            System.err.println("Erro ao alterar categoria: " + ex.getMessage());
        }
        return null;
    }

    @Override
    public List<Categoria> recuperarTodasCategorias() {
        return (List<Categoria>) dao.findAll();
    }

    @Override
    public List<Categoria> recuperarPorPalavraChave(String palavraChave) {
        if (palavraChave != null) {
            return dao.findByNomeContaining(palavraChave);
        }
        return List.of();
    }

    @Override
    public Categoria recuperarPorId(int id) {
        return dao.findById(id).orElse(null);
    }

    @Override
    public List<Categoria> recuperarTodasOrdenadasPeloId() {

        return (List<Categoria>) dao.findAll();
    }
}