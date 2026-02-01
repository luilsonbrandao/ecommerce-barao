package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dao.CategoriaDAO;
import br.com.barao.api_barao.model.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CategoriaServiceImpl implements ICategoriaService{

    @Autowired
    private CategoriaDAO dao;

    @Override
    public Categoria inserirNovaCategoria(Categoria categoria) {
        try{
            if (categoria.getNome() != null && categoria.getNome().trim().length() > 0){
                dao.save(categoria);
                return categoria;
            }
        }
        catch (IllegalArgumentException ex){
            System.out.println("DEBUG = "+ex.getMessage());
        }
        catch (Exception ex){
            System.out.println("DEBUG = "+ex.getMessage());
        }
        return null;
    }

    @Override
    public Categoria alterarCategoria(Categoria categoria) {
        try{
            if (categoria.getId() != null && categoria.getNome() != null && categoria.getNome().trim().length() > 0){
                dao.save(categoria);
                return categoria;
            }
        }
        catch (Exception ex){
            System.out.println("DEBUD = "+ex.getMessage());
        }
        return null;
    }

    @Override
    public ArrayList<Categoria> recuperarTodasCategorias() {

        return (ArrayList<Categoria>)dao.findAll();
    }

    @Override
    public ArrayList<Categoria> recuperarPorPalavraChave(String palavraChave) {
        if (palavraChave != null)
            return dao.findByNomeContaining(palavraChave);
        return null;
    }
}
