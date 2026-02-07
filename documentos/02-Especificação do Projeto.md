# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="01-Documentação de Contexto.md"> Documentação de Contexto</a></span>

## Arquitetura e Tecnologias

A solução segue o padrão de **API RESTful** com arquitetura em camadas, garantindo desacoplamento entre as regras de negócio e a interface do usuário.

* **Linguagem:** Java 17
* **Framework:** Spring Boot 3
* **Persistência:** Spring Data JPA / MySQL 8
* **Dependências:** Maven

## Requisitos do Sistema

### Requisitos Funcionais (RF)

| ID     | Descrição do Requisito                                                                 | Prioridade |
| ------ | -------------------------------------------------------------------------------------- | ---------- |
| RF-001 | **Manter Categorias:** O sistema deve permitir criar categorias (ex: "Interna", "Externa", "Produtos"). | ALTA       |
| RF-002 | **Manter Serviços/Produtos:** O sistema deve permitir cadastrar itens com nome, descrição, preço e foto. | ALTA       |
| RF-003 | **Vitrine de Serviços:** O cliente deve visualizar a lista de serviços disponíveis.    | ALTA       |
| RF-004 | **Carrinho/Pedido:** O cliente deve conseguir adicionar serviços ao carrinho e fechar o pedido. | ALTA       |
| RF-005 | **Autenticação:** O sistema deve diferenciar o acesso de Cliente e Administrador.      | MÉDIA      |
| RF-006 | **Dashboard:** O administrador deve visualizar o total de vendas/serviços do período.  | BAIXA      |

### Requisitos Não Funcionais (RNF)

| ID      | Descrição do Requisito                                                               | Prioridade |
| ------- | ------------------------------------------------------------------------------------ | ---------- |
| RNF-001 | **Segurança:** As senhas dos usuários devem ser criptografadas no banco.             | ALTA       |
| RNF-002 | **Performance:** A listagem de serviços deve carregar em menos de 2 segundos.        | MÉDIA      |
| RNF-003 | **Responsividade:** O sistema (Front-end) deve funcionar perfeitamente em celulares. | ALTA       |

## Modelo de Dados (Em Evolução)

### Tabela: `tbl_categoria`
Responsável por agrupar os tipos de serviços.

| Campo           | Tipo          | Detalhes                      |
| --------------- | ------------- | ----------------------------- |
| id_categoria    | INT           | PK, Auto Increment            |
| nome_categoria  | VARCHAR(100)  | Unique, Not Null              |

### Tabela: `tbl_produto`
Armazena tanto serviços (mão de obra) quanto produtos físicos.

| Campo           | Tipo          | Detalhes                      |
| --------------- | ------------- | ----------------------------- |
| id_produto      | INT           | PK, Auto Increment            |
| nome_produto    | VARCHAR(100)  | Not Null                      |
| detalhe_produto | TEXT          | Descrição do serviço          |
| preco_produto   | DECIMAL       | Valor unitário                |
| link_foto       | VARCHAR(255)  | Caminho da imagem             |
| disponivel      | INT           | 1 (Sim) / 0 (Não)             |
| id_categoria    | INT           | FK (Ref. tbl_categoria)       |

### Tabela: `tbl_cliente`
Armazena os dados dos clientes do Lava-Jato.

| Campo            | Tipo         | Detalhes                      |
| ---------------- | ------------ | ----------------------------- |
| id_cliente       | INT          | PK, Auto Increment            |
| nome_cliente     | VARCHAR(100) | Not Null                      |
| email_cliente    | VARCHAR(100) | Unique, Not Null              |
| telefone_cliente | VARCHAR(20)  | Unique, Not Null              |
| cpf_cliente      | VARCHAR(15)  | Opcional                      |
| data_nasc        | DATE         | Opcional                      |
| cep_cliente      | VARCHAR(10)  | Endereço                      |
| logradouro       | VARCHAR(100) | Endereço                      |
| cidade           | VARCHAR(100) | Endereço                      |
| estado           | VARCHAR(2)   | Endereço                      |

### Tabela: `tbl_pedido`
Registra os cabeçalhos dos pedidos realizados.

| Campo        | Tipo    | Detalhes                                        |
| ------------ | ------- | ----------------------------------------------- |
| id_pedido    | INT     | PK, Auto Increment                              |
| data_pedido  | DATE    | Data da solicitação                             |
| valor_total  | DOUBLE  | Valor calculado (Soma dos itens - Descontos)    |
| valor_frete  | DOUBLE  | Custo de entrega                                |
| retirar      | INT     | 1 (Retirar no local) / 0 (Delivery)             |
| status       | INT     | 1=Novo, 2=Pago, 3=Transporte, 4=Entregue...     |
| observacoes  | TEXT    | Notas do cliente                                |
| id_cliente   | INT     | FK (Ref. tbl_cliente)                           |

### Tabela: `tbl_itempedido`
Tabela associativa que armazena os produtos de cada pedido.

| Campo          | Tipo   | Detalhes                                |
| -------------- | ------ | --------------------------------------- |
| num_seq        | INT    | PK, Auto Increment                      |
| qtde_item      | INT    | Quantidade solicitada                   |
| preco_unitario | DOUBLE | Preço do produto no momento da compra   |
| preco_total    | DOUBLE | (Qtde * Unitario) com possível desconto |
| id_pedido      | INT    | FK (Ref. tbl_pedido)                    |
| id_produto     | INT    | FK (Ref. tbl_produto)                   |

## Restrições

| ID | Restrição                                             |
|----|-------------------------------------------------------|
| 01 | O projeto deve ser capaz de rodar em containers Docker|
| 02 | O sistema deve priorizar experiência Mobile (Responsivo)|
