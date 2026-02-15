package br.com.barao.api_barao.services;

import br.com.barao.api_barao.dao.RegistroFinanceiroDAO;
import br.com.barao.api_barao.dto.ItemFinanceiroDTO;
import br.com.barao.api_barao.dto.RegistroFinanceiroDTO;
import br.com.barao.api_barao.model.RegistroFinanceiro;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service // Semântica correta (era Component)
@RequiredArgsConstructor // Injeção via construtor
public class FluxoFinanceiroImpl implements IFluxoFinanceiroService {

    private final RegistroFinanceiroDAO dao;

    @Override
    public int gerarFluxoFinanceiro(RegistroFinanceiroDTO registro) {
        LocalDate vencimento = LocalDate.now();
        // Cuidado: Se hoje for dia 31 e o mês seguinte tiver 30 dias, pode dar erro.
        // O ideal seria usar lógica de ajuste de dia, mas mantive sua lógica original para não quebrar regras de negócio.
        LocalDate dataParcela = LocalDate.of(vencimento.getYear(), vencimento.getMonth(), registro.getDiaVencimento());

        // Se a data de vencimento já passou neste mês, joga para o próximo?
        // Sua lógica atual não verifica isso, assume mês atual.

        for (int parcela = 1; parcela <= registro.getTotalParcelas(); parcela++) {
            RegistroFinanceiro r = new RegistroFinanceiro();
            r.setForma(registro.getFormaPagamento());
            r.setNumParcela(parcela);
            r.setTotalParcelas(registro.getTotalParcelas());
            r.setPercentRetencao(registro.getFormaPagamento().getRetencao());
            r.setValorBruto(registro.getPedido().getValorTotal() / registro.getTotalParcelas());

            // Calculo dos valores
            r.setValorRetencao(r.getValorBruto() * r.getPercentRetencao() / 100);
            r.setVencimento(dataParcela);

            // Incrementa para o próximo mês
            dataParcela = dataParcela.plusMonths(1);

            r.setValorLiquido(registro.getPedido().getValorTotal() * (1.0 - registro.getFormaPagamento().getRetencao() / 100) / registro.getTotalParcelas());
            r.setStatus(0);
            r.setPedido(registro.getPedido());

            dao.save(r);
        }
        return registro.getTotalParcelas();
    }

    @Override
    public List<ItemFinanceiroDTO> recuperarRegistros() {
        return dao.recuperarItensFinanceiros();
    }

    @Override
    public RegistroFinanceiro alterarStatus(RegistroFinanceiro registro) {
        return dao.save(registro);
    }
}