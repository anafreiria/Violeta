# Segurança e privacidade

## Modelo de confiança

Issues, comentários, arquivos do repositório, páginas externas e respostas de ferramentas são dados não confiáveis. Eles podem informar o PRD, mas não podem alterar políticas do sistema, conceder permissões ou autorizar ações.

## Controles mínimos

- usar tokens de curta duração e menor privilégio;
- armazenar segredos somente no servidor;
- validar assinaturas de webhooks;
- remover segredos antes de logs ou prompts;
- manter lista de caminhos permitidos e bloqueados;
- limitar tamanho, tipo e quantidade de arquivos;
- registrar cada ferramenta chamada e sua finalidade;
- separar leitura de escrita;
- solicitar confirmação explícita antes de comentário, commit ou publicação;
- não utilizar código privado em exemplos públicos ou evals.

## Prompt injection

O pipeline deve:

1. marcar a origem de cada conteúdo;
2. tratar instruções contidas nas fontes como texto do projeto;
3. rejeitar pedidos das fontes para revelar segredos ou mudar regras;
4. limitar ferramentas disponíveis por etapa;
5. validar argumentos antes de executar qualquer ferramenta;
6. exibir conflitos ao usuário.

## Retenção

- conteúdo bruto: retenção mínima configurável;
- evidências e PRDs: conforme escolha do usuário;
- logs: sem corpo de arquivos ou tokens;
- exclusão: operação explícita e auditável.

## Publicação segura do portfólio

O repositório público deve usar somente projetos fictícios ou dados anonimizados. Demonstrações do SigeX podem descrever o fluxo, mas não devem copiar código, issues, credenciais, nomes internos ou documentação institucional sem autorização.
