package br.com.barao.api_barao.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FiltroPedidoDTO {

    private LocalDate dataInicio;
    private LocalDate dataFim;
    private String    nome;
    private int       novo;
    private int       pago;
    private int       transporte;
    private int       entregue;
    private int       posVenda;
    private int       finalizado;
    private int       cancelado;

    @Override
    public String toString() {
        return "FiltroPedidoDTO [dataInicio=" + dataInicio + ", dataFim=" + dataFim + ", nome=" + nome + ", novo="
                + novo + ", pago=" + pago + ", transporte=" + transporte + ", entregue=" + entregue + ", posVenda="
                + posVenda + ", finalizado=" + finalizado + ", cancelado=" + cancelado + "]";
    }





}