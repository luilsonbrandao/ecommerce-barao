package br.com.barao.api_barao.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_produto")
@Getter
@Setter
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produto")
    private Integer id;

    @Column(name = "nome_produto", length = 100, nullable = false)
    private String nome;

    @Column(name = "detalhe_produto", length = 500)
    private String detalhe;

    @Column(name = "link_foto", length = 255, nullable = false)
    private String linkFoto;

    @Column(name = "preco_produto", nullable = false)
    private double preco;

    @Column(name = "preco_promocional", nullable = false)
    private double precoPromo;

    @Column(name = "disponivel")
    private int disponivel;

    @Column(name = "destaque")
    private int destaque;

    @Column(name = "pronta_entrega")
    private int prontaEntrega;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

}