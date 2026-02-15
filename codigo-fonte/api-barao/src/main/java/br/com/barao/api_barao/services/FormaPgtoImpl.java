package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dao.FormaPgtoDAO;
import br.com.barao.api_barao.model.FormaPagamento;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FormaPgtoImpl implements IFormaPgtoService {

    private final FormaPgtoDAO dao;

    @Override
    public List<FormaPagamento> buscarTodas() {

        return (List<FormaPagamento>) dao.findAll();
    }

    @Override
    public List<FormaPagamento> buscarVisiveis() {
        return dao.findAllByVisivel(1);
    }

    @Override
    public FormaPagamento buscarPeloId(int id) {
        return dao.findById(id).orElse(null);
    }

    @Override
    public FormaPagamento atualizar(FormaPagamento novo) {
        return dao.save(novo);
    }

}