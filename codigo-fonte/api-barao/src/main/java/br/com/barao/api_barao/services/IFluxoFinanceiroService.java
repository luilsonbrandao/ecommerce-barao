package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dto.ItemFinanceiroDTO;
import br.com.barao.api_barao.dto.RegistroFinanceiroDTO; // Certifique-se de ter esse DTO criado
import br.com.barao.api_barao.model.RegistroFinanceiro;

import java.util.List;

public interface IFluxoFinanceiroService {
    public int gerarFluxoFinanceiro(RegistroFinanceiroDTO registro);
    public List<ItemFinanceiroDTO> recuperarRegistros();
    public RegistroFinanceiro alterarStatus(RegistroFinanceiro registro);
}