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
                    configuration.setAllowedOrigins(List.of("*")); // Em produção, restrinja isso!
                    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    configuration.setAllowedHeaders(List.of("*"));
                    return configuration;
                }))

                .authorizeHttpRequests(auth -> auth
                        // --- 1. Rota de Erro do Spring (FUNDAMENTAL PARA DEBUG) ---
                        .requestMatchers("/error").permitAll()

                        // --- 2. Recursos Estáticos e Documentação (Swagger) ---
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()

                        // --- 3. Regras de Negócio Públicas (GET) ---
                        .requestMatchers(HttpMethod.GET, "/categoria", "/categoria/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/produto", "/produto/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/fretes", "/fretes/**", "/fretesdisponiveis").permitAll()

                        // Clientes: Buscas são públicas (Login não precisa, pois é POST abaixo)
                        .requestMatchers(HttpMethod.GET, "/cliente/**").permitAll()

                        // Pedidos: Busca pública (se for regra de negócio)
                        .requestMatchers(HttpMethod.GET, "/pedido/search/**").permitAll()

                        // --- 4. Ações Públicas (POST) ---
                        .requestMatchers(HttpMethod.POST, "/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/pedido").permitAll() // Criar pedido é público

                        // --- 5. Todo o resto exige autenticação (Token JWT) ---
                        .anyRequest().authenticated()
                )

                // Filtro de Token JWT antes do filtro padrão
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