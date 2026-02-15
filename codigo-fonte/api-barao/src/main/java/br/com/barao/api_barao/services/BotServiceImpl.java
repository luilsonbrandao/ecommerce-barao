package br.com.barao.api_barao.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service; // Recomendado: Trocar Component por Service

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service // Alterado de @Component para @Service para padronização
public class BotServiceImpl implements IBotService {

    @Value("${telegrambot_chat_id}")
    private String chatId;

    @Value("${telegrambot_url}")
    private String botUrl;

    @Value("${telegrambot_msg}")
    private String message;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .connectTimeout(Duration.ofSeconds(5))
            .build();

    @Override
    public boolean sendBotMessage(String userMessage) {
        try {
            // Construção do JSON manual (igual ao legado)
            String json = "{ \"chat_id\": " + chatId + ", \"text\" : \"" + message.replace("%PED%", userMessage) + "\"}";

            HttpRequest request = HttpRequest.newBuilder()
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .uri(URI.create(botUrl))
                    .setHeader("User-Agent", "Java 11 HttpClient Bot")
                    .header("Content-type", "application/json")
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                return true;
            }
            // Log de erro simples se falhar (opcional)
            System.err.println("Erro Telegram: " + response.statusCode() + " - " + response.body());
            return false;
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
    }
}