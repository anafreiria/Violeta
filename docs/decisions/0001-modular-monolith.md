# ADR 0001 — Monólito modular no MVP

- **Status:** Aceita
- **Data:** 2026-10-28

## Contexto

O produto terá interface, API, conectores, geração assistida por LLM e validações. Separar tudo em serviços independentes no início aumentaria implantação, observabilidade e manutenção antes de existir carga que justifique essa complexidade.

## Decisão

Começar como monólito modular TypeScript em um monorepo. Os limites entre domínio, conectores e interface serão explícitos, mas executados inicialmente em uma única API.

## Consequências

- desenvolvimento e testes locais mais simples;
- contratos compartilhados com segurança de tipos;
- conectores podem ser substituídos sem alterar o domínio;
- extração futura de workers ou serviços permanece possível;
- tarefas demoradas deverão usar fila quando o MVP incorporar coleta extensa.
