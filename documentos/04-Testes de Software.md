# Planos de Testes de Software

### Cenário de Teste: Cálculo de Frete Automático
| ID | CT-005 |
|---|---|
| **Objetivo** | Verificar se o sistema aplica a taxa de entrega correta baseada no CEP. |
| **Pré-condição** | Ter frete cadastrado para o prefixo "66080" com valor R$ 10,00. |
| **Passos** | 1. Adicionar produto ao carrinho.<br>2. Ir para "Efetivar Pedido".<br>3. Digitar CEP "66080-000".<br>4. Clicar em "Buscar CEP". |
| **Resultado Esperado** | O campo "Frete Previsto" deve exibir "R$ 10,00" e o Total do Pedido deve ser atualizado. |

### Cenário de Teste: Persistência do Carrinho
| ID | CT-006 |
|---|---|
| **Objetivo** | Garantir que o usuário não perca o carrinho ao fechar o navegador. |
| **Passos** | 1. Adicionar "Lavagem Simples" ao carrinho.<br>2. Atualizar a página (F5) ou fechar/abrir aba. |
| **Resultado Esperado** | O ícone do carrinho no topo deve continuar exibindo "1" item e o produto deve permanecer na lista. |

### Cenário de Teste: Fluxo Financeiro (Back-end)
| ID | CT-007 |
|---|---|
| **Objetivo** | Verificar se o registro financeiro é gerado ao criar um pedido. |
| **Passos** | 1. Enviar POST para `/pedido` com itens.<br>2. Verificar tabela `tbl_pedido` (deve ter o novo registro).<br>3. Verificar notificação no Telegram do ADM. |
| **Resultado Esperado** | Pedido salvo com status "1" (Novo) e mensagem recebida no Bot Telegram. |
