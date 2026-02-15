package br.com.barao.api_barao.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

// Swagger Imports
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityScheme;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class MyWebApplicationSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println(" ---> Configurando acessos (Spring Boot 3 + CORS Centralizado)");

        http
                // Desabilita CSRF (padrão para APIs REST stateless)
                .csrf(csrf -> csrf.disable())

                // --- CONFIGURAÇÃO DE CORS CENTRALIZADA ---
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    configuration.setAllowedOrigins(List.of("*")); // Libera tudo (Ideal para Dev). Em Prod, coloque a URL do Angular.
                    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    configuration.setAllowedHeaders(List.of("*"));
                    return configuration;
                }))

                .authorizeHttpRequests(auth -> auth
                        // --- Requisições Liberadas (Suas rotas originais) ---

                        // Categorias
                        .requestMatchers(HttpMethod.GET, "/categoria").permitAll()
                        .requestMatchers(HttpMethod.GET, "/categoria/search").permitAll()

                        // Clientes
                        .requestMatchers(HttpMethod.GET, "/cliente/**").permitAll()

                        // Produtos
                        .requestMatchers(HttpMethod.GET, "/produto").permitAll()
                        .requestMatchers(HttpMethod.GET, "/produto/categoria/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/produto/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/produto/busca").permitAll()

                        // Pedidos
                        .requestMatchers(HttpMethod.GET, "/pedido/search/**").permitAll()

                        // Login e Criação de Pedido (POST)
                        .requestMatchers(HttpMethod.POST, "/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/pedido").permitAll()

                        // Fretes
                        .requestMatchers(HttpMethod.GET, "/fretesdisponiveis").permitAll()
                        .requestMatchers(HttpMethod.GET, "/fretes/prefixo/**").permitAll()

                        // Swagger e Documentação API
                        .requestMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/swagger-ui.html").permitAll()
                        .requestMatchers(HttpMethod.GET, "/v3/api-docs/**").permitAll()

                        // --- Qualquer outra requisição precisa de autenticação ---
                        .anyRequest().authenticated()
                )

                // Adiciona o seu filtro de Token antes do filtro padrão
                .addFilterBefore(new TokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Configuração do Swagger
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().components(new Components().addSecuritySchemes("bearerAuth",
                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
    }
}