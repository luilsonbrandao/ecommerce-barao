package br.com.barao.api_barao.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VendasPorDataDTO {
    private double total;
    private LocalDate data;
}