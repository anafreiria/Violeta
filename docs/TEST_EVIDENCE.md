# Evidências de testes e TestSprite

## Objetivo

Integrar TestSprite e outras ferramentas como provedores de evidência sem transformar uma aprovação parcial em afirmação de qualidade total.

## Modelo mínimo

Cada execução deve registrar ferramenta, versão/base, ambiente, cenário, requisitos cobertos, resultado, tentativas, reexecuções, artefatos e limites.

## Categorias independentes

- testes unitários e contratos;
- API com dependências controladas;
- persistência real e migrations;
- concorrência;
- TestSprite;
- typecheck e build;
- segurança e análise estática;
- validação manual;
- integração institucional;
- gate não executado.

## Regras para TestSprite

- Mapear cada caso aos requisitos e critérios de aceite.
- Registrar cenários distintos e número total de execuções.
- Preservar falhas iniciais mesmo após aprovação posterior.
- Explicar rate limit, fixture, indisponibilidade ou ambiente.
- Não atribuir ao TestSprite evidências produzidas por outra suíte.
- Declarar quando o teste usa provider sintético.
- Não afirmar validação de LDAP, TLS, proxy, deploy ou produção sem execução nesses componentes.
- Não desativar proteções somente para obter verde.

## Golden example inicial

O PRD SIG-59 e seu relatório TestSprite serão usados somente como referência privada ou anonimizada. Eles definem o nível esperado de rastreabilidade, mas não devem ser copiados para o repositório público com links, caminhos, nomes ou detalhes institucionais sensíveis.
