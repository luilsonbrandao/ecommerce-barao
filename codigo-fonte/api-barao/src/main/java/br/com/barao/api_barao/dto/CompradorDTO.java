package br.com.barao.api_barao.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CompradorDTO {
    private String nome;
    private String email;
    private String telefone;
}