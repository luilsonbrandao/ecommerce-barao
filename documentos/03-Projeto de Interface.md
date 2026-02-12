# Projeto de Interface

<span style="color:red">Pré-requisitos: <a href="02-Especificação do Projeto.md"> Especificação do Projeto</a></span>

## Fluxo de Usuário (User Flow)

O fluxo principal foca na experiência do cliente final, garantindo que ele possa encontrar e contratar serviços com o mínimo de cliques.

1.  **Home (Vitrine):** O cliente visualiza todos os serviços disponíveis.
2.  **Detalhes:** Ao clicar em um serviço, ele vê informações técnicas, preço e foto ampliada.
3.  **Ação:** O cliente decide entre "Adicionar ao Carrinho" ou "Agendar via WhatsApp".

## Telas Implementadas (Front-end v1.0)

A interface foi desenvolvida utilizando **Angular 19** com **Bootstrap 5**, garantindo responsividade e um design limpo e profissional.

### 1. Tela Inicial (Vitrine de Serviços)
A Home apresenta os serviços em um **Grid Responsivo**. Cada "Card" contém a foto do serviço, nome, breve descrição e preço. O layout utiliza um sistema de colunas que se adapta a celulares e desktops.

![Tela Inicial - Vitrine](img/home-screen.png)
*(Captura de tela da versão Desktop - 11/02/2026)*

### 2. Tela de Detalhes do Produto
Ao selecionar um serviço, o cliente é direcionado para uma rota específica (ex: `/detalhe/1`). Nesta tela, a imagem ganha destaque e as ações de conversão ("Agendar" ou "Comprar") são enfatizadas.

![Tela de Detalhes](img/detalhe-screen.png)
*(Captura de tela da versão Desktop - 11/02/2026)*

## Identidade Visual

* **Tipografia:** Fonte padrão do Bootstrap (System UI) para legibilidade rápida.
* **Cores:**
    * *Primary (Azul/Roxo):* Botões de ação principal.
    * *Dark (Preto/Cinza):* NavBar e Rodapé, remetendo à estética automotiva/industrial.
    * *Success (Verde):* Botão de WhatsApp.
