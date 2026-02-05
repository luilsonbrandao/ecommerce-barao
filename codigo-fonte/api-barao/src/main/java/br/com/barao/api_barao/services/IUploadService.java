package br.com.barao.api_barao.services;

import org.springframework.web.multipart.MultipartFile;

public interface IUploadService {
    public String uploadFile(MultipartFile arquivo);
}
