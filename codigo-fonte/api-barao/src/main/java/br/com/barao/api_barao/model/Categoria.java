package br.com.barao.api_barao.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_categoria")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Integer id;

    @Column(name = "nome_categoria", length = 100, nullable = false, unique = true)
    private String nome;
}