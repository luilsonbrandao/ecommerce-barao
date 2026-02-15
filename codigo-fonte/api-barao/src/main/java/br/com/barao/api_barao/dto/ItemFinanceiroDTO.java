package br.com.barao.api_barao.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString // Adicionei isso para remover o método toString() manual também
public class ItemFinanceiroDTO {
    private int numSeq;
    private int idPedido;
    private String nomeCliente;
    private String telefone;
    private int numParcela;
    private int totalParcelas;
    private LocalDate dataVencimento;
    private double valorBruto;
    private int    idFormaPagamento;
    private String formaPagamento;
    private double percentRetencao;
    private double valorRetencao;
    private double valorReceber;
    private int    status;
}