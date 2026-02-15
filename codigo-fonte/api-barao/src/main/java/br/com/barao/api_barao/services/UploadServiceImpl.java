package br.com.barao.api_barao.services;

import org.springframework.stereotype.Service; // Use @Service, é a boa prática atual
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

@Service
public class UploadServiceImpl implements IUploadService {

    @Override
    public String uploadFile(MultipartFile arquivo) {
        try {
            System.out.println("DEBUG - Recebendo arquivo: " + arquivo.getOriginalFilename());

            // Caminho local temporário (Enquanto não tem deploy)
            String caminho = "/var/home/ljbrandao/Imagens/imagensTeste";
            Path pastaDestino = Paths.get(caminho);

            // Modernização: Cria a pasta se ela não existir (evita erro java.nio.file.NoSuchFileException)
            if (!Files.exists(pastaDestino)) {
                Files.createDirectories(pastaDestino);
            }

            // Define o caminho final onde o arquivo vai ficar
            Path path = Paths.get(caminho + File.separator + arquivo.getOriginalFilename());

            // Copia o arquivo
            Files.copy(arquivo.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("DEBUG - Arquivo copiado para: " + path.toString());

            // CORREÇÃO FUNDAMENTAL:
            // Retorna apenas o nome do arquivo (igual ao legado), para salvar no banco corretamente.
            // Se retornar path.toString(), o front-end não conseguirá exibir a imagem depois.
            return arquivo.getOriginalFilename();

        } catch (IOException ex) {
            ex.printStackTrace();
        }

        // CORREÇÃO FUNDAMENTAL:
        // Retorna null em caso de erro (igual ao legado), para o Controller dar erro 400.
        return null;
    }
}