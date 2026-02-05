package br.com.barao.api_barao.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_produto")
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

    @Column(name = "disponivel")
    private int disponivel;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDetalhe() {
        return detalhe;
    }

    public void setDetalhe(String detalhe) {
        this.detalhe = detalhe;
    }

    public String getLinkFoto() {
        return linkFoto;
    }

    public void setLinkFoto(String linkFoto) {
        this.linkFoto = linkFoto;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public int getDisponivel() {
        return disponivel;
    }

    public void setDisponivel(int disponivel) {
        this.disponivel = disponivel;
    }
}
