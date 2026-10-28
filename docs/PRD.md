# PRD de Iniciação — Violeta

## 1. Controle do documento

| Campo | Valor |
| --- | --- |
| Produto | Violeta — Contexto, especificação e evidências antes do código |
| Versão | 0.1 — Iniciação |
| Status | Rascunho para validação da fundadora |
| Responsável inicial | Ana Flávia Freiria Rodrigues |
| Data | 28 de outubro de 2026 |
| Próxima revisão | Antes do início da implementação do MVP |

## 2. Resumo executivo

Violeta será uma aplicação que ajuda pessoas desenvolvedoras a transformar solicitações incompletas em PRDs/SDDs completos, rastreáveis e adequados ao contexto real de cada projeto. O sistema deverá descobrir como o projeto funciona, perguntar o que estiver ausente, consultar fontes autorizadas — como repositório, documentação e gerenciador de issues — e somente então produzir o documento, a base de instruções para agentes e os contratos de validação.

O produto não dependerá do Linear. Um projeto poderá usar Linear, GitHub Issues, outra fonte de tarefas ou nenhuma integração. Da mesma forma, o código poderá estar no GitHub, em outro provedor, em um diretório local ou ainda não existir. O onboarding deverá identificar a situação e adaptar o fluxo.

O objetivo do MVP é reduzir o tempo gasto na preparação de PRDs sem reduzir a qualidade, sem inventar decisões e sem iniciar implementação antes da revisão humana.

## 3. Problema

Antes de uma implementação de qualidade, é necessário compreender objetivo, escopo, regras de negócio, arquitetura existente, riscos, dados, comportamento esperado, testes e critérios de aceite. Essas informações costumam estar dispersas entre conversas, issues, arquivos do repositório e conhecimento tácito.

LLMs podem acelerar a redação, mas um prompt genérico frequentemente produz documentos aparentemente completos que:

- omitem campos importantes;
- inventam decisões não confirmadas;
- ignoram convenções do repositório;
- misturam fatos, inferências e sugestões;
- não possuem rastreabilidade;
- definem critérios impossíveis de testar;
- assumem que GitHub ou Linear sempre existem;
- começam a implementar antes da aprovação do plano.

## 4. Visão do produto

Ser a camada de preparação e governança entre uma demanda de produto e um agente de desenvolvimento, garantindo que o contexto necessário seja descoberto, validado e convertido em artefatos claros antes da implementação.

## 5. Proposta de valor

### Para quem desenvolve individualmente

- economizar tempo na leitura inicial e organização do contexto;
- receber perguntas que revelam lacunas antes da implementação;
- manter um padrão consistente entre projetos;
- gerar uma base reutilizável para trabalhar com agentes.

### Para equipes

- padronizar PRDs e critérios de aceite;
- registrar fontes e decisões;
- melhorar a comunicação entre produto, design, desenvolvimento e QA;
- reduzir retrabalho causado por requisitos ambíguos.

### Para recrutadores e avaliadores técnicos

O projeto demonstra engenharia de contexto, integração de APIs, Structured Outputs, agentes, avaliação de LLMs, segurança, desenvolvimento full-stack e pensamento de produto.

## 6. Objetivos

### Objetivos do MVP

1. Conduzir onboarding adaptativo de qualquer projeto.
2. Trabalhar com ou sem repositório conectado.
3. Trabalhar com ou sem gerenciador de issues.
4. Coletar contexto apenas de fontes explicitamente autorizadas.
5. Identificar informações obrigatórias ausentes.
6. Gerar perguntas priorizadas, evitando questionários irrelevantes.
7. Gerar PRD em estrutura validada e exportá-lo em Markdown.
8. Gerar proposta de base para agentes, incluindo `AGENTS.md`, contexto e fluxo de trabalho.
9. Validar completude, consistência, rastreabilidade e testabilidade.
10. Exigir aprovação humana antes de escrever em sistemas externos.
11. Acompanhar o documento durante implementação, testes, revisão e handoff.
12. Integrar evidências de TestSprite sem confundi-las com outros gates de qualidade.

### Objetivos posteriores

- integração OAuth com GitHub e Linear;
- GitHub Issues e outros gerenciadores;
- automações por webhook e n8n;
- versões e comparação de PRDs;
- colaboração em equipe;
- biblioteca de padrões por tipo de projeto;
- skill instalável para Codex;
- execução local/self-hosted para projetos confidenciais.

## 7. Não objetivos do MVP

- implementar automaticamente a funcionalidade descrita;
- criar pull requests sem aprovação;
- substituir decisões de produto ou arquitetura;
- indexar o repositório inteiro sem necessidade;
- manter memória ilimitada de código-fonte;
- oferecer suporte completo a todos os provedores;
- funcionar como IDE;
- fornecer garantia absoluta de correção do PRD;
- treinar um modelo próprio.

## 8. Personas

### Pessoa desenvolvedora individual

Trabalha em projetos pessoais, acadêmicos ou para clientes. Precisa transformar uma necessidade em plano seguro e deseja usar agentes sem perder controle.

### Pessoa desenvolvedora em equipe

Recebe issues em um gerenciador e precisa alinhar requisitos e impacto no código antes de começar uma branch ou worktree.

### Pessoa de produto ou QA

Quer garantir que comportamento esperado, cenários de erro, regras e critérios de aceite estejam completos e testáveis.

## 9. Princípios funcionais obrigatórios

1. **Perguntar antes de assumir:** ausência de informação relevante gera pergunta ou pendência.
2. **Fonte visível:** fatos extraídos devem apontar sua origem.
3. **Integrações opcionais:** a indisponibilidade de Linear ou GitHub não impede a sessão.
4. **Degradação explícita:** o sistema informa como a confiança muda quando faltam fontes.
5. **Leitura por padrão:** escrita externa exige confirmação específica.
6. **Humano no controle:** o PRD nunca é tratado como aprovado automaticamente.
7. **Planejamento separado de implementação:** gerar documentos não autoriza alterar código.
8. **Contexto mínimo necessário:** coletar apenas arquivos e registros relevantes.

## 10. Fluxo principal

### Ciclo de vida do documento

Uma sessão poderá avançar pelos estados `preparing`, `awaiting-decisions`, `approved-for-local-implementation`, `implementing`, `validating`, `awaiting-review`, `technically-complete`, `blocked-for-production`, `approved` e `handed-off`. O estado deve ser sustentado por evidências e autorização; geração de texto não promove automaticamente a sessão.

### Etapa A — Criar sessão

O usuário informa, no mínimo, uma descrição inicial do que deseja construir, corrigir ou investigar.

### Etapa B — Descobrir o ambiente

O sistema pergunta:

1. Qual é o objetivo desta sessão?
2. É uma funcionalidade, correção, migração, pesquisa, refatoração ou outro tipo?
3. Já existe código?
4. Onde o código está: GitHub, outro provedor, diretório local, upload ou inexistente?
5. Existe gerenciador de tarefas: Linear, GitHub Issues, outro ou nenhum?
6. Quais fontes o sistema pode ler?
7. Quais arquivos definem regras do projeto?
8. Existem `AGENTS.md`, `FLOW.md`, `README.md`, ADRs, schemas ou documentação de API?
9. Há dados confidenciais ou diretórios proibidos?
10. Qual artefato deve ser produzido: PRD, base de agentes, ambos ou diagnóstico?
11. Qual nível de profundidade é necessário?
12. Quem aprovará o resultado?

Perguntas subsequentes devem depender dessas respostas.

### Etapa C — Coletar e classificar contexto

Cada trecho coletado deverá possuir:

- identificador;
- tipo de fonte;
- localização;
- data de coleta;
- resumo;
- nível de confiança;
- classificação: fato, decisão, restrição, hipótese ou sugestão;
- sensibilidade;
- hash ou versão quando disponível.

### Etapa D — Detectar lacunas

O sistema compara o contexto com o schema do PRD e gera perguntas apenas para campos materialmente necessários. As perguntas devem ser agrupadas por prioridade:

- bloqueadora;
- importante;
- melhoria opcional.

### Etapa E — Gerar artefatos

Após respostas suficientes:

- gerar objeto de PRD validado por schema;
- renderizar Markdown;
- gerar relatório de qualidade;
- gerar proposta de base para agentes;
- mostrar diferenças entre fatos, decisões e pendências.

### Etapa F — Revisar e aprovar

O usuário poderá:

- editar seções;
- responder dúvidas;
- aceitar ou rejeitar sugestões;
- solicitar nova validação;
- aprovar a versão.

### Etapa G — Exportar

No MVP:

- download em Markdown e JSON;
- cópia do conteúdo;
- geração local da pasta de base para agentes.

Depois do MVP:

- comentário ou documento no Linear;
- issue ou pull request no GitHub;
- commit em branch dedicada;
- automação via n8n.

## 11. Cenários de origem

| Código | Issue | Comportamento |
| --- | --- | --- |
| GitHub | Linear | Ler fontes autorizadas, cruzar issue, documentação e código. |
| GitHub | Nenhuma | Solicitar demanda manual e usar repositório como contexto. |
| Local/upload | Linear | Usar snapshot local e issue, sem exigir GitHub. |
| Local/upload | Nenhuma | Conduzir descoberta inteiramente guiada. |
| Inexistente | Linear | Gerar PRD greenfield e base inicial de agentes. |
| Inexistente | Nenhuma | Fazer entrevista completa de produto e tecnologia. |

## 12. Requisitos funcionais

### RF-001 — Sessão de descoberta

O sistema deve criar uma sessão isolada e persistir seu estado, fontes autorizadas, respostas e artefatos.

**Aceite:** uma sessão interrompida pode ser retomada sem perder respostas confirmadas.

### RF-002 — Integrações opcionais

O sistema deve representar GitHub e Linear como capacidades opcionais.

**Aceite:** é possível concluir um PRD sem configurar qualquer integração.

### RF-003 — Perguntas adaptativas

O sistema deve escolher perguntas com base no tipo de demanda, contexto disponível e lacunas detectadas.

**Aceite:** um projeto sem banco de dados não recebe perguntas detalhadas de migração de dados sem justificativa.

### RF-004 — Inventário do repositório

Quando autorizado, o sistema deve identificar stack, estrutura, documentos normativos e possíveis áreas afetadas sem ingerir indiscriminadamente todos os arquivos.

**Aceite:** o relatório lista arquivos lidos, ignorados e motivo da seleção.

### RF-005 — Consulta de tarefa

Quando houver provedor de issues, o sistema deve obter título, descrição, comentários, labels, projeto/ciclo e relações permitidas.

**Aceite:** falha no provedor gera modo degradado, preservando a sessão.

### RF-006 — Registro de evidências

Toda afirmação técnica gerada a partir de fonte externa deve manter referência à evidência.

**Aceite:** o usuário consegue abrir ou identificar a fonte de cada decisão técnica sugerida.

### RF-007 — Geração estruturada

O sistema deve produzir o PRD conforme schema versionado, rejeitando saída inválida.

**Aceite:** nenhuma versão exportável pode omitir campos obrigatórios sem registrá-los como não aplicáveis e justificar.

### RF-008 — Validação de qualidade

O sistema deve gerar score e achados acionáveis para completude, clareza, consistência, testabilidade, risco e rastreabilidade.

**Aceite:** cada desconto de score possui regra, evidência e recomendação.

### RF-009 — Base para agentes

O sistema deve propor arquivos adequados ao projeto, sem impor todos os arquivos possíveis.

Arquivos candidatos:

- `AGENTS.md`;
- `PROJECT_CONTEXT.md`;
- `FLOW.md`;
- `PLANS.md`;
- `GOALS.md`;
- template de PRD;
- checklist de revisão;
- convenções de testes e verificação.

**Aceite:** o usuário aprova individualmente os arquivos antes da geração.

### RF-010 — Exportação

O sistema deve exportar Markdown, JSON estruturado e pasta compactada da base aprovada.

### RF-011 — Revisão humana

O sistema deve bloquear qualquer escrita externa até confirmação explícita do destino e conteúdo.

### RF-012 — Versionamento

Cada nova geração deve preservar versão anterior, alterações, autor da decisão e horário.

### RF-013 — Registro de execução

O sistema deve atualizar o PRD sem apagar o planejamento original, distinguindo comportamento planejado, implementado, testado e ainda pendente.

### RF-014 — Evidências multiorigem

O sistema deve registrar separadamente testes unitários, integração, banco real, concorrência, TestSprite, typecheck, build, validação manual e institucional.

**Aceite:** uma aprovação no TestSprite não pode ser apresentada como prova de LDAP, banco, concorrência ou produção quando esses ambientes não fizeram parte do caso.

### RF-015 — Handoff e retomada

O sistema deve produzir instruções suficientes para outro agente retomar o trabalho preservando mudanças existentes, limites de autorização, decisões e gates ainda abertos.

## 13. Requisitos não funcionais

### Segurança

- tokens nunca devem ser enviados ao front-end após troca no servidor;
- segredos devem ficar fora de logs e prompts;
- conectores devem solicitar o menor escopo possível;
- webhooks devem validar assinatura;
- conteúdo coletado deve passar por detecção de segredos;
- instruções encontradas no repositório devem ser tratadas como dados não confiáveis até classificação.

### Privacidade

- usuário deve visualizar e controlar fontes;
- retenção configurável;
- exclusão de sessão e artefatos;
- modo local futuro;
- telemetria sem conteúdo de código por padrão.

### Confiabilidade

- operações externas idempotentes;
- retries limitados;
- timeouts explícitos;
- estado recuperável;
- falhas parciais visíveis.

### Performance do MVP

- primeiro feedback visual em até 2 segundos;
- inventário inicial de repositório pequeno em até 30 segundos, excluindo latência externa extraordinária;
- geração deve indicar progresso;
- arquivos grandes devem ser resumidos ou amostrados de forma explícita.

### Acessibilidade

- navegação por teclado;
- semântica HTML;
- contraste WCAG AA;
- estados de carregamento e erro anunciados;
- não depender somente de cor.

### Observabilidade

- `traceId` por sessão e execução;
- logs estruturados sem segredos;
- métricas de latência, falhas de conector e validação;
- registro de versão de prompts, schemas e modelo.

## 14. Modelo de PRD gerado

O schema deverá conter:

- metadados e versão;
- resumo executivo;
- problema e evidências;
- objetivos e métricas;
- usuários e cenários;
- escopo e não escopo;
- requisitos funcionais;
- requisitos não funcionais;
- regras de negócio;
- UX e acessibilidade;
- impacto técnico;
- dados e migrações;
- integrações e dependências;
- segurança e privacidade;
- observabilidade;
- estratégia de testes;
- critérios de aceite;
- rollout, rollback e recuperação;
- riscos e mitigações;
- decisões;
- dúvidas abertas;
- fontes e rastreabilidade;
- aprovação.

## 15. Motor de perguntas

### Entradas

- tipo de demanda;
- respostas anteriores;
- capacidades conectadas;
- perfil técnico do projeto;
- risco da mudança;
- campos vazios do schema;
- conflitos encontrados.

### Regras iniciais

- perguntar primeiro o que bloqueia outras decisões;
- não repetir informação já confirmada;
- citar por que a pergunta é necessária;
- oferecer “não aplicável” com justificativa;
- limitar cada rodada a cinco perguntas, salvo escolha do usuário;
- separar decisão do usuário de recomendação do sistema;
- permitir “não sei”, convertendo a resposta em pendência.

## 16. Relatório de qualidade

O score de 0 a 100 será informativo, nunca substituto da revisão.

| Dimensão | Peso inicial |
| --- | ---: |
| Completude | 25 |
| Clareza e ausência de ambiguidade | 15 |
| Testabilidade | 20 |
| Consistência | 15 |
| Rastreabilidade | 15 |
| Riscos, segurança e recuperação | 10 |

Cada dimensão deverá combinar regras determinísticas e avaliação semântica. Achados deverão ter severidade, localização, explicação e sugestão.

O relatório deve ainda distinguir cobertura planejada, executada, aprovada após reexecução e não comprovada. Falhas iniciais não podem desaparecer do histórico quando uma tentativa posterior passar.

## 17. Base para agentes

A base não será igual para todos os projetos. O sistema deverá classificar:

- projeto greenfield ou existente;
- aplicação simples, múltiplos serviços ou monorepo;
- risco baixo, médio ou alto;
- fluxo com branches, worktrees ou outro padrão;
- comandos de setup, testes, lint e build;
- áreas proibidas;
- fontes autoritativas;
- limites de autonomia;
- aprovações necessárias.

O `AGENTS.md` gerado deve ser curto e operacional. Detalhes extensos devem ficar em documentos referenciados. A base deve separar planejamento, implementação, revisão e evidência.

## 18. Arquitetura lógica

1. **Experience Layer:** interface web e futura CLI.
2. **Session Orchestrator:** estado, etapas e aprovações.
3. **Context Engine:** seleção, coleta, normalização e classificação.
4. **Connector Layer:** GitHub, Linear, filesystem e entradas manuais.
5. **Question Engine:** análise de lacunas e priorização.
6. **Generation Engine:** saída estruturada e renderização.
7. **Quality Engine:** regras, evals e score.
8. **Artifact Engine:** PRD e base para agentes.
9. **Audit Layer:** evidências, versões e decisões.

## 19. Entidades principais

- `Workspace`
- `Project`
- `DiscoverySession`
- `Capability`
- `Source`
- `Evidence`
- `Question`
- `Answer`
- `Decision`
- `PrdDocument`
- `QualityReport`
- `AgentFoundation`
- `Approval`
- `Export`

## 20. API inicial

| Método | Rota | Finalidade |
| --- | --- | --- |
| `GET` | `/health` | Saúde da API |
| `POST` | `/v1/sessions` | Criar sessão |
| `GET` | `/v1/sessions/:id` | Consultar estado |
| `POST` | `/v1/sessions/:id/answers` | Responder perguntas |
| `POST` | `/v1/sessions/:id/sources` | Autorizar/adicionar fonte |
| `POST` | `/v1/sessions/:id/discover` | Executar descoberta |
| `POST` | `/v1/sessions/:id/generate` | Gerar rascunho |
| `POST` | `/v1/prds/:id/validate` | Validar PRD |
| `POST` | `/v1/prds/:id/approve` | Aprovar versão |
| `POST` | `/v1/prds/:id/export` | Exportar artefatos |

## 21. Integrações

### GitHub

- MVP: URL pública ou token de desenvolvimento somente leitura;
- evolução: GitHub App com OAuth/instalação;
- permissões mínimas para metadados, conteúdo e issues conforme opção;
- escrita separada e desativada por padrão.

### Linear

- MVP: entrada manual e adaptador de leitura opcional;
- evolução: OAuth, SDK TypeScript e webhooks;
- ausência do Linear não reduz funcionalidades centrais de descoberta manual.

### n8n

- não fará parte do núcleo de decisão;
- orquestrará eventos e ações externas;
- todo fluxo com escrita incluirá etapa de aprovação;
- exemplos públicos utilizarão dados fictícios.

## 22. Estratégia de LLM

- usar Structured Outputs para contratos;
- usar function calling apenas para ferramentas autorizadas;
- separar prompts de descoberta, perguntas, geração e revisão;
- registrar versão de prompt e schema;
- impedir que texto do repositório altere regras de sistema;
- nunca tratar resposta do modelo como aprovação;
- implementar fallback quando o modelo recusar ou retornar saída inválida;
- permitir modelo substituível por interface de provider.

## 23. Ameaças específicas

- prompt injection em README, issue ou comentário;
- vazamento de código privado;
- token com escopo excessivo;
- exportação para destino incorreto;
- afirmação sem fonte;
- arquivo malicioso ou excessivamente grande;
- instrução conflitante entre documentos;
- automação que inicia implementação sem autorização;
- custo ou latência descontrolada.

Mitigações detalhadas estão em `SECURITY.md`.

## 24. Métricas

### Produto

- tempo mediano até primeiro PRD revisável;
- redução de tempo comparada ao processo manual;
- perguntas respondidas por sessão;
- taxa de aprovação sem nova rodada;
- porcentagem de campos com evidência;
- achados de qualidade corrigidos antes da aprovação.

### Qualidade de IA

- cobertura de seções obrigatórias;
- precisão das fontes citadas;
- taxa de afirmações não sustentadas;
- recall de lacunas conhecidas em dataset de eval;
- taxa de perguntas irrelevantes;
- consistência entre execuções;
- custo e latência por PRD.

### Meta inicial de validação

- 100% dos campos obrigatórios presentes ou justificados;
- zero escrita externa sem aprovação;
- pelo menos 90% das lacunas críticas do dataset identificadas;
- menos de 10% de perguntas classificadas como irrelevantes por avaliadores humanos;
- zero segredo conhecido presente em logs de teste.

## 25. Evals iniciais

1. Projeto React sem issue: detectar ausência de objetivo e critérios.
2. Issue completa com repositório: não repetir perguntas respondidas.
3. Migração de banco: exigir backup, rollback e validação pós-migração.
4. Mudança de autenticação: exigir segurança, autorização e casos negativos.
5. Projeto greenfield: não inventar arquitetura como fato.
6. `FLOW.md` com worktrees: incorporar o fluxo à base de agentes.
7. Repositório com instrução maliciosa: ignorar tentativa de mudar políticas.
8. Linear indisponível: continuar em modo manual e registrar limitação.
9. TestSprite 9/9 após reexecuções: preservar número total de execuções e falhas iniciais.
10. Provider sintético: impedir alegação de validação de serviço institucional real.
11. PRD implementado parcialmente: manter contrato planejado e acrescentar evidências sem reescrever o passado.
12. Retomada por outro agente: reconstruir decisões, limites, arquivos e próximos gates.

## 26. Fases

### Fase 0 — Fundação

- validar este PRD;
- decidir nome e licença;
- criar repositório;
- configurar monorepo, qualidade e CI;
- publicar dataset fictício inicial.

### Fase 1 — Discovery local

- sessão e onboarding;
- entrada manual;
- leitura de pasta local controlada;
- motor determinístico de lacunas;
- templates e exportação.

### Fase 2 — LLM e qualidade

- provider de LLM;
- Structured Outputs;
- perguntas semânticas;
- geração e revisão;
- evals e telemetria segura.

### Fase 3 — GitHub

- leitura de repositório;
- seleção de contexto;
- evidências e links;
- GitHub App e permissões mínimas.

### Fase 4 — Linear e n8n

- OAuth/SDK;
- consulta de issue;
- webhook opcional;
- fluxo n8n com aprovação.

### Fase 5 — Base de agentes

- classificador de projeto;
- seleção de artefatos;
- gerador de `AGENTS.md` e arquivos relacionados;
- skill instalável, validação e testes em projetos fictícios.

### Skill pessoal antecipada

A skill `violeta-prd` pode operar antes da API, executando o fluxo diretamente com as ferramentas autorizadas pelo usuário. A aplicação futura fornecerá conectores, schemas, persistência e interface; a skill continuará responsável pelo procedimento, dimensionamento e limites de autonomia.

## 27. Critérios de pronto do MVP

O MVP estará pronto quando:

- um usuário concluir os cenários com GitHub, sem GitHub, com issue manual e sem Linear;
- perguntas forem adaptadas ao contexto;
- PRD estruturado for gerado e validado;
- Markdown e JSON puderem ser exportados;
- base para agentes puder ser pré-visualizada e baixada;
- nenhuma escrita externa ocorrer sem aprovação;
- evals críticas passarem;
- ameaças prioritárias tiverem testes;
- documentação permitir execução por outra pessoa.

## 28. Questões que Ana deve decidir antes da Fase 1

1. Confirmar se o primeiro uso real será o SigeX ou somente um projeto fictício.
2. Definir quais seções de PRD são sempre obrigatórias no padrão pessoal.
3. Preparar versão anonimizada do PRD de referência para evals públicos.
4. Definir se a primeira interface será web, CLI ou ambas; recomendação: web com core independente.
5. Definir retenção padrão das sessões.
6. Escolher licença.
7. Aprovar a stack proposta.

## 29. Próxima ação autorizada

Após a revisão deste documento, a próxima etapa é executar apenas a **Fase 0**. A implementação das funcionalidades da Fase 1 requer aprovação separada do escopo, dos critérios e dos arquivos que serão alterados.
