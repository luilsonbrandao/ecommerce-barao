package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dao.FreteDAO;
import br.com.barao.api_barao.model.Frete;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // Semântica correta
@RequiredArgsConstructor // Injeção via construtor
public class FreteServiceImpl implements IFreteService {

    private final FreteDAO dao;

    @Override
    public List<Frete> recuperarTodos() {
        return (List<Frete>) dao.findAll();
    }

    @Override
    public List<Frete> recuperarDisponiveis() {
        // O DAO já retorna List, então não precisa de cast explícito se a assinatura estiver correta
        return dao.findAllByDisponivelOrderByPrefixoDesc(1);
    }

    @Override
    public Frete atualizarFrete(Frete frete) {
        return dao.save(frete);
    }

    @Override
    public Frete inserirFrete(Frete novo) {
        return dao.save(novo);
    }

    @Override
    public Frete recuperarPeloPrefixo(String prefixo) {
        // Busca todos os fretes disponíveis ordenados (do mais específico para o mais genérico)
        List<Frete> listaFretes = dao.findAllByDisponivelOrderByPrefixoDesc(1);

        for (Frete f : listaFretes) {
            // Lógica: Se o CEP do usuário começa com o prefixo do frete.
            // Ex: Usuário "90000-000", Frete "90". StartsWith = true.
            if (prefixo.startsWith(f.getPrefixo())) {
                return f;
            }
        }
        return null;
    }

    @Override
    public Frete recuperarPeloId(int id) {
        return dao.findById(id).orElse(null);
    }
}