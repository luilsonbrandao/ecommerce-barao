package br.com.barao.api_barao.services;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.nio.file.*;

@Component
public class UploadServiceImpl implements IUploadService{

    @Override
    public String uploadFile(MultipartFile arquivo) {
        try{
            /*
             * Copiar o arquivo recebido via requisição para uma pasta definida
             * e retornar o caminho dele. Se der qualquer erro, retornar NULL
            */
            System.out.println("DEBUG - "+arquivo.getOriginalFilename());
            String caminho = "/var/home/ljbrandao/Imagens/imagensTeste";
            Path path = Paths.get(caminho + File.separator + arquivo.getOriginalFilename());
            Files.copy(arquivo.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("DEBUG - Arquivo copiado ...");
            return path.toString();
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return "";
    }
}
