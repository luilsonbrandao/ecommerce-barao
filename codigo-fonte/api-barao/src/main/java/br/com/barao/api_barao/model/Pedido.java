package br.com.barao.api_barao.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tbl_pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {

    // Constantes de Status
    public static final int NOVO_PEDIDO   = 1;
    public static final int PAGO          = 2;
    public static final int EM_TRANSPORTE = 3;
    public static final int ENTREGUE      = 4;
    public static final int POS_VENDA     = 5;
    public static final int FINALIZADO    = 6;
    public static final int CANCELADO     = 7;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Integer idPedido;

    @Column(name = "uuid", length = 36, unique = true)
    private String uuid;

    @PrePersist
    public void gerarUuid() {
        if (this.uuid == null) {
            this.uuid = UUID.randomUUID().toString();
        }
    }

    @Column(name = "data_pedido")
    private LocalDate dataPedido;

    @Column(name = "valor_total")
    private double valorTotal;

    @Column(name = "valor_frete")
    private double valorFrete;

    @Column(name = "retirar")
    private int retirar;

    @Column(name = "observacoes", length = 500)
    private String observacoes;

    @Column(name = "status")
    private int status;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("pedido")
    private List<ItemPedido> itensPedido;

    // Construtor usado na Query do PedidoDAO
    public Pedido(Integer idPedido, LocalDate dataPedido, String nomeCliente, double valorTotal, double valorFrete, int retirar, String observacoes, int status) {
        this.idPedido = idPedido;
        this.dataPedido = dataPedido;
        this.valorTotal = valorTotal;
        this.valorFrete = valorFrete;
        this.retirar = retirar;
        this.observacoes = observacoes;
        this.status = status;

        // Criação simplificada do cliente apenas para exibição
        this.cliente = new Cliente();
        this.cliente.setNome(nomeCliente);
    }
}