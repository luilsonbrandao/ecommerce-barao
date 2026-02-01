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

## Modelo de Dados (Inicial)

O sistema abstrai "Serviços" e "Produtos Físicos" como a mesma entidade no banco de dados, diferenciados apenas pela Categoria.

### Tabela: `tbl_categoria`
Responsável por agrupar os tipos de serviços.

| Campo           | Tipo          | Detalhes                      |
| --------------- | ------------- | ----------------------------- |
| id_categoria    | INT           | PK, Auto Increment            |
| nome_categoria  | VARCHAR(100)  | Unique, Not Null              |
## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Caso de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

Para mais informações, consulte o microfundamento Engenharia de Requisitos de Software 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.
 
Para mais informações, consulte o microfundamento "Modelagem de Dados".

