package br.com.barao.api_barao.dto;

import br.com.barao.api_barao.model.FormaPagamento;
import br.com.barao.api_barao.model.Pedido;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegistroFinanceiroDTO {
    private int diaVencimento;
    private Pedido pedido;
    private FormaPagamento formaPagamento;
    private int totalParcelas;

    @Override
    public String toString() {
        return "RegistroFinanceiroDTO [diaVencimento=" + diaVencimento + ", pedido=" + pedido + ", formaPagamento="
                + formaPagamento + ", totalParcelas=" + totalParcelas + "]";
    }


}