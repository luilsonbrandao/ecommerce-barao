# Implantação do Software

## Estratégia de Arquitetura (Upload de Imagens)

Para garantir performance e desacoplamento, a solução adota uma arquitetura híbrida para manipulação de arquivos estáticos (imagens dos produtos/serviços), separando o servidor de aplicação do servidor de arquivos.

![Diagrama de Arquitetura de Upload](img/arquitetura-upload.png)

### Fluxo de Processamento
A arquitetura resolve o upload em duas etapas (Two-Step Upload) para evitar gargalos no banco de dados:

1.  **Upload Assíncrono:** O cliente envia a imagem para o endpoint `/upload` da API (Tomcat). O servidor salva o arquivo físico em disco e retorna uma URL pública.
2.  **Associação Lógica:** O cliente envia os dados do produto (JSON) contendo a URL da imagem para o endpoint `/produto`. O banco de dados armazena apenas o caminho (String), mantendo o banco leve.
3.  **Entrega de Conteúdo (Delivery):** Em produção, um servidor HTTP otimizado (como Apache ou Nginx) serve as imagens diretamente da pasta de disco, poupando a API Java de processar requisições estáticas.

**Benefícios desta abordagem:**
* **Performance:** O banco de dados não fica inchado com BLOBs (arquivos binários).
* **Escalabilidade:** Permite migrar o armazenamento futuramente para serviços de nuvem (como AWS S3) sem alterar a lógica do banco de dados.

•	Apresentar o planejamento da implantação: descrever tecnologias e processo de implantação.

•	Informar link da aplicação em ambiente de produção

•	Apresentar o planejamento de evolução da aplicação.
