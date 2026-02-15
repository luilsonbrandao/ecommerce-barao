package br.com.barao.api_barao.services;

import br.com.barao.api_barao.model.Frete;

import java.util.ArrayList;
import java.util.List;

public interface IFreteService {

    public List<Frete> recuperarTodos();
    public List<Frete> recuperarDisponiveis();
    public Frete atualizarFrete(Frete frete);
    public Frete inserirFrete(Frete novo);
    public Frete recuperarPeloPrefixo(String prefixo);
    public Frete recuperarPeloId(int id);
}