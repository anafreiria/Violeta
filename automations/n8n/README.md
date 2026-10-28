# Automação n8n — desenho futuro

O n8n será uma camada opcional. O núcleo do Violeta deve funcionar sem ele.

## Fluxo proposto

1. Linear Trigger, GitHub Trigger ou Webhook genérico.
2. Filtrar evento pela label/configuração aprovada.
3. Criar sessão no Violeta.
4. Enviar referências, nunca tokens no corpo.
5. Aguardar perguntas ou rascunho.
6. Enviar link para revisão humana.
7. Após aprovação registrada no Violeta, publicar no destino escolhido.

## Restrições

- não iniciar agente de implementação automaticamente;
- validar assinatura do evento;
- usar credenciais separadas por ambiente;
- registrar idempotency key;
- não salvar código-fonte no histórico do workflow;
- não exportar workflow com credenciais.

O JSON do workflow será adicionado somente na Fase 4, após os contratos da API estabilizarem.
