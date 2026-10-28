# Violeta

**Contexto, especificação e evidências antes do código.**

Plataforma para descobrir o contexto de um projeto, fazer perguntas de esclarecimento, gerar PRDs/SDDs completos e montar uma base segura de instruções para agentes de desenvolvimento.

O produto funciona com projetos conectados ao GitHub e ao Linear, somente ao GitHub, com repositórios locais ou apenas com contexto fornecido pelo usuário. Integrações são opcionais e nunca bloqueiam o fluxo principal.

## Estado do projeto

Este repositório contém a iniciação formal do produto e um esqueleto técnico do MVP. A geração por LLM, OAuth e automações externas ainda não estão implementadas.

## Princípios

- contexto antes de geração;
- perguntar em vez de inventar;
- PRD estruturado, rastreável e validável;
- revisão humana antes de qualquer escrita externa;
- integrações opcionais e degradáveis;
- acesso mínimo e leitura por padrão;
- nenhuma implementação de produto iniciada pelo agente sem autorização explícita;
- evidências e incertezas sempre visíveis.
- TestSprite e outras ferramentas recebem crédito somente pelo que realmente validaram;
- prontidão local, técnica e produtiva são estados diferentes.

## Documentos essenciais

- [PRD de iniciação](docs/PRD.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Segurança e privacidade](docs/SECURITY.md)
- [Estratégia de qualidade e evals](docs/QUALITY.md)
- [Integração de evidências e TestSprite](docs/TEST_EVIDENCE.md)
- [Plano da skill pessoal](docs/VIOLETA_SKILL.md)
- [Decisões arquiteturais](docs/decisions/0001-modular-monolith.md)

## Estrutura

```text
apps/
  api/                 API do produto
  web/                 interface React
packages/
  contracts/           schemas e contratos compartilhados
  core/                descoberta, perguntas e validação
templates/             PRD e arquivos de base para agentes
examples/              exemplos com e sem Linear
automations/n8n/        desenho da automação opcional
docs/                   produto, arquitetura, segurança e roadmap
```

## Stack inicial

- TypeScript
- React + Vite
- Fastify
- Zod
- Vitest
- pnpm workspaces

## Primeiros comandos

```bash
pnpm install
pnpm test
pnpm dev
```

Copie `.env.example` para `.env`. Não adicione tokens reais ao repositório.

## Fluxo esperado do MVP

1. Criar uma sessão de descoberta.
2. Informar objetivo, fonte de código e integrações disponíveis.
3. Coletar somente o contexto autorizado.
4. Detectar lacunas e fazer perguntas adaptativas.
5. Gerar um PRD estruturado.
6. Validar completude, rastreabilidade e testabilidade.
7. Solicitar revisão humana.
8. Exportar Markdown e a base de agentes aprovada.

## Licença

Definir antes da primeira publicação pública. A sugestão inicial é MIT para o código e CC BY 4.0 para exemplos e documentação.
