package br.com.barao.api_barao.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "tbl_itempedido")
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "num_seq")
    private int numSeq;

    @Column(name = "qtde_item")
    private int qtdeItem;

    @Column(name = "preco_unitario")
    private double precoUnitario;

    @Column(name = "preco_total")
    private double precoTotal;

    @ManyToOne
    @JoinColumn(name = "id_pedido")
    @JsonIgnoreProperties("itensPedido")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Produto produto;

    @Override
    public String toString() {
        return "ItemPedido [numSeq=" + numSeq + ", qtdeItem=" + qtdeItem + ", precoUnitario=" + precoUnitario
                + ", precoTotal=" + precoTotal + ", pedido=" + pedido + ", produto=" + produto.getId() + "]";
    }

    public int getNumSeq() {
        return numSeq;
    }

    public void setNumSeq(int numSeq) {
        this.numSeq = numSeq;
    }

    public int getQtdeItem() {
        return qtdeItem;
    }

    public void setQtdeItem(int qtdeItem) {
        this.qtdeItem = qtdeItem;
    }

    public double getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(double precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public double getPrecoTotal() {
        return precoTotal;
    }

    public void setPrecoTotal(double precoTotal) {
        this.precoTotal = precoTotal;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

}