# Instruções de utilização

Este guia orienta a configuração e execução da API RESTful do Lava a Jato Barão em ambiente de desenvolvimento local.

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
* **Java JDK 17** (Versão LTS).
* **MySQL 8.0** ou superior.
* **Maven** (O projeto inclui o wrapper `mvnw`, mas ter o Maven instalado é recomendado).
* **Postman** ou Insomnia (Para testar os endpoints).

### Passo 1: Configuração do Banco de Dados
1. Acesse seu cliente MySQL e crie o database:
   ```sql
   CREATE DATABASE db_barao;
   ```

2. Abra o arquivo de configuração em:
   `src/main/resources/application.properties`

3. **Importante:** Altere as propriedades abaixo com o usuário e senha do **seu** banco de dados local:
   ```properties
   spring.datasource.username=seu_usuario_local
   spring.datasource.password=sua_senha_local
   ```

### Passo 2: Configuração de Uploads (Imagens)
Como o projeto está em fase de desenvolvimento local, o armazenamento de imagens é feito em disco.

1. Abra a classe de serviço:
   `src/main/java/br/com/barao/api_barao/services/UploadServiceImpl.java`

2. Localize a variável `caminho` e altere para uma pasta válida existente na **sua** máquina:
   ```java
   // Exemplo: "C:/Temp/Imagens" ou "/home/user/imagens"
   String caminho = "/caminho/para/sua/pasta/de/imagens";
   ```

### Passo 3: Executando a API
No terminal, navegue até a raiz do projeto `api-barao` e execute:

**Linux/Mac:**
```bash
./mvnw spring-boot:run
```

**Windows:**
```cmd
mvnw.cmd spring-boot:run
```

A aplicação iniciará na porta `8080`.

---

## Implantação

O projeto atualmente opera em arquitetura monolítica para ambiente de desenvolvimento.

* **Servidor de Aplicação:** Embedded Tomcat (Spring Boot).
* **Banco de Dados:** MySQL Server (Local).
* **Storage:** File System local (Disco rígido).

> **Roadmap:** A versão de produção prevê o uso de variáveis de ambiente para credenciais sensíveis, containerização via **Docker** e armazenamento de imagens em Object Storage (ex: AWS S3 ou MinIO).

---

## Histórico de versões

### [0.2.0] - 05/02/2026
#### Adicionado
- Entidade `Produto` (Serviços e Produtos Físicos).
- Serviço de Upload de Imagens (`UploadService`).
- Endpoints de listagem com filtros (Disponibilidade e Categoria).
- Validação de integridade referencial para categorias inexistentes.

### [0.1.0] - 29/01/2026
#### Adicionado
- Configuração inicial do projeto (Spring Boot 3 + Java 17).
- Conexão JPA/Hibernate com MySQL.
- CRUD completo da entidade `Categoria`.
- Documentação técnica e definição de escopo.
