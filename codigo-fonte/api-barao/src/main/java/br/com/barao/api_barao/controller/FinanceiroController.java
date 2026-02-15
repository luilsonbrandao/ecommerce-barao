package br.com.barao.api_barao.controller;

import br.com.barao.api_barao.dto.ItemFinanceiroDTO;
import br.com.barao.api_barao.dto.RegistroFinanceiroDTO;
import br.com.barao.api_barao.model.FormaPagamento;
import br.com.barao.api_barao.model.Pedido;
import br.com.barao.api_barao.model.RegistroFinanceiro;
import br.com.barao.api_barao.services.IFluxoFinanceiroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FinanceiroController {

    private final IFluxoFinanceiroService fluxo;

    @PostMapping("/financeiro")
    public String gerarFluxoFinanceiro(@RequestBody RegistroFinanceiroDTO registro) {
        fluxo.gerarFluxoFinanceiro(registro);
        return "ok";
    }

    @GetMapping("/financeiro")
    public ResponseEntity<List<ItemFinanceiroDTO>> recuperarTodos() {
        return ResponseEntity.ok(fluxo.recuperarRegistros());
    }

    @PutMapping("/financeiro")
    public ResponseEntity<RegistroFinanceiro> atualizarStatus(@RequestBody ItemFinanceiroDTO item) {
        try {
            RegistroFinanceiro registro = new RegistroFinanceiro();
            registro.setNumSeq(item.getNumSeq());
            registro.setNumParcela(item.getNumParcela());
            registro.setTotalParcelas(item.getTotalParcelas());
            registro.setVencimento(item.getDataVencimento());
            registro.setValorBruto(item.getValorBruto());
            registro.setPercentRetencao(item.getPercentRetencao());
            registro.setValorRetencao(item.getValorRetencao());
            registro.setValorLiquido(item.getValorReceber());
            registro.setStatus(item.getStatus());

            Pedido pedido = new Pedido();
            pedido.setIdPedido(item.getIdPedido());

            FormaPagamento forma = new FormaPagamento();
            forma.setNumSeq(item.getIdFormaPagamento());

            registro.setForma(forma);
            registro.setPedido(pedido);

            if (fluxo.alterarStatus(registro) != null) {
                return ResponseEntity.ok(registro);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}