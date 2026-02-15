package br.com.barao.api_barao.services;

import br.com.barao.api_barao.model.FormaPagamento;
import java.util.List;

public interface IFormaPgtoService {

    public List<FormaPagamento> buscarTodas();
    public List<FormaPagamento> buscarVisiveis();
    public FormaPagamento buscarPeloId(int id);
    public FormaPagamento atualizar(FormaPagamento novo);

}