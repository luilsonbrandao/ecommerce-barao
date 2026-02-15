package br.com.barao.api_barao.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="tbl_usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_usuario")
    private Integer id; // Alterado de int para Integer

    @Column(name="username", length = 45, nullable = false, unique = true)
    private String username;

    @Column(name="email", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name="senha", length = 100, nullable = false)
    private String senha;

    @Column(name = "nome_usuario", length = 50, nullable = false)
    private String nome;

    @Column(name = "usuario_ativo")
    private int ativo;
}