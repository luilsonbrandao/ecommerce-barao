package br.com.barao.api_barao.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tbl_cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Integer idCliente; // Alterado de int para Integer

    @Column(name = "nome_cliente", length = 100, nullable = false)
    private String nome;

    @Column(name = "email_cliente", length = 100, nullable = false, unique = true)
    private String email;

    @Column(name = "telefone_cliente", length = 20, nullable = false, unique = true)
    private String telefone;

    @Column(name = "data_nasc")
    private LocalDate dataNasc;

    @Column(name = "cpf_cliente", length = 15)
    private String cpf;

    @Column(name = "cep_cliente", length = 10, nullable = false)
    private String cep;

    @Column(name = "logradouro", length = 100)
    private String logradouro;

    @Column(name = "numero", length = 10)
    private String numero;

    @Column(name = "complemento", length = 50)
    private String complemento;

    @Column(name = "bairro", length = 100)
    private String bairro;

    @Column(name = "cidade", length = 100)
    private String cidade;

    @Column(name = "estado", length = 2)
    private String estado;

    // Construtor específico usado nas queries de relatório (DTO Projection)
    public Cliente(String nome, LocalDate dataNasc, String telefone) {
        this.nome = nome;
        this.dataNasc = dataNasc;
        this.telefone = telefone;
    }
}