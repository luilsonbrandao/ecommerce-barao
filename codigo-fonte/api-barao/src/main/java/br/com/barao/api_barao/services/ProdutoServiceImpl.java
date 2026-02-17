package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dao.ProdutoDAO;
import br.com.barao.api_barao.model.Categoria;
import br.com.barao.api_barao.model.Produto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoServiceImpl implements IProdutoService {

    private static final int PAGE_SIZE = 8;
    private final ProdutoDAO dao;

    @Override
    public Produto inserirNovoProduto(Produto produto) {
        try {
            return dao.save(produto);
        } catch (Exception ex) {
            System.err.println("Erro ao inserir Produto: " + ex.getMessage());
        }
        return null;
    }

    @Override
    public Produto alterarProduto(Produto produto) {
        try {
            return dao.save(produto);
        } catch (Exception ex) {
            System.err.println("Erro ao alterar Produto: " + ex.getMessage());
        }
        return null;
    }

    @Override
    public List<Produto> listarTodos() {
        // Com JpaRepository, o findAll já retorna List, não precisa de cast
        return dao.findAll();
    }

    @Override
    public Page<Produto> listarDisponiveis(int pagina) {
        Pageable pageable = PageRequest.of(pagina, PAGE_SIZE);
        return dao.findAllByDisponivel(1, pageable);
    }

    @Override
    public Page<Produto> listarPorCategoria(Categoria categoria, int pagina) {
        Pageable pageable = PageRequest.of(pagina, PAGE_SIZE);
        // Agora o DAO aceita esses parâmetros!
        return dao.findAllByDisponivelAndCategoria(1, categoria, pageable);
    }

    @Override
    public List<Produto> listaIndisponiveis() {
        Pageable unpaged = Pageable.unpaged();
        return dao.findAllByDisponivel(0, unpaged).getContent();
    }

    @Override
    public Produto recuperarPorId(int id) {
        return dao.findById(id).orElse(null);
    }

    @Override
    public Page<Produto> listarPorPalavraChave(String palavraChave, int pagina) {
        Pageable pageable = PageRequest.of(pagina, PAGE_SIZE);
        return dao.findAllByDisponivelAndNomeContainingOrDisponivelAndDetalheContaining(
                1, palavraChave, 1, palavraChave, pageable);
    }

    @Override
    public Page<Produto> listarDestaques(int pagina) {
        Pageable pageable = PageRequest.of(pagina, PAGE_SIZE);
        return dao.findAllByDestaqueAndDisponivel(1, 1, pageable);
    }
}