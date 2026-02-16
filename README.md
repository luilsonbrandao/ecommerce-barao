# 🚿 Barão Estética Automotiva | Ecommerce & Gestão

> **Status do Projeto:** 🚧 Em Desenvolvimento (Integração Front/Back)

Sistema de Ecommerce e Gestão desenvolvido sob medida para o **Barão Estética Automotiva**. O objetivo é digitalizar a oferta de serviços (lavagens, polimentos, higienização) e venda de produtos automotivos, permitindo que o proprietário gerencie pedidos e clientes em uma plataforma única.

## 💼 O Cliente

**Tonyelson Santos da Silva**, proprietário da Barão Estética Automotiva .
O sistema visa profissionalizar o atendimento, saindo do controle manual para uma gestão digitalizada de serviços e fluxo financeiro.

## 🚀 Tecnologias (Stack)

* **Back-end:** Java 17 (LTS), Spring Boot 3.1.5
* **Banco de Dados:** MySQL 8 (Hibernate/JPA)
* **Segurança:** Spring Security 6 + JWT (Stateless)
* **Integrações:** Telegram Bot API (Notificações em tempo real)
* **Front-end:** Angular 19 (Standalone Components, Signals)
* **Estilização:** Bootstrap 5 + Bootstrap Icons

## 🛠️ Funcionalidades Implementadas

- [x] **API RESTful** robusta com tratamento de erros e DTOs.
- [x] **Segurança:** Autenticação JWT e proteção de rotas.
- [x] **Catálogo Híbrido:** Suporte para Serviços (Agendamento) e Produtos Físicos (Estoque).
- [x] **Carrinho de Compras:** Gestão de itens, quantidades e subtotal no LocalStorage.
- [x] **Checkout Inteligente:**
    - Busca de endereço via CEP (Integração ViaCEP).
    - Cálculo automático de Frete baseado em prefixos de CEP.
    - Opção de "Retirada no Local".
- [x] **Gestão de Pedidos:** Fluxo completo (Novo -> Pago -> Entregue).
- [x] **Notificações:** Envio automático de mensagens para o Telegram do administrador ao receber novo pedido.
- [x] **Módulo Financeiro:** Geração automática de contas a receber e fluxo de caixa parcelado.
- [x] **Upload de Imagens:** Armazenamento local com referência no banco.

# 📂 Estrutura da Documentação

<ol>
<li><a href="documentos/01-Documentação de Contexto.md"> Documentação de Contexto</a></li>
<li><a href="documentos/02-Especificação do Projeto.md"> Especificação do Projeto</a></li>
<li><a href="documentos/03-Projeto de Interface.md"> Projeto de Interface</a></li>
<li><a href="documentos/04-Testes de Software.md"> Testes de Software</a></li>
<li><a href="documentos/05-Implantação.md"> Implantação</a></li>
</ol>

# Código

<li><a href="codigo-fonte"> Código Fonte</a></li>

# Apresentação

<li><a href="apresentacao/README.md"> Apresentação da solução</a></li>


## 👨‍💻 Autor & Desenvolvedor

Desenvolvido por **Luilson Brandão**.
