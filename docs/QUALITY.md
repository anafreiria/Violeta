# Qualidade e evals

## Estratégia

A qualidade será medida em três camadas:

1. **Schema:** campos, tipos e enums válidos.
2. **Regras determinísticas:** aceite, fontes, riscos, pendências e consistência básica.
3. **Avaliação semântica:** clareza, relevância, conflito e cobertura contextual.
4. **Proveniência das evidências:** ambiente, ferramenta e limite de cada resultado.

## Dataset inicial

Cada caso deverá conter:

- entrada inicial;
- snapshot fictício de projeto;
- issue opcional;
- lacunas conhecidas;
- perguntas esperadas e proibidas;
- requisitos mínimos do PRD;
- riscos obrigatórios;
- fontes esperadas.

## Métricas

- recall de lacunas críticas;
- precisão de perguntas relevantes;
- cobertura de campos;
- precisão de citações/evidências;
- afirmações não sustentadas;
- estabilidade entre execuções;
- custo e latência;
- taxa de correção humana.
- precisão da atribuição de cobertura por ferramenta;
- preservação de falhas e reexecuções;
- diferença entre prontidão local, técnica e produtiva.

## Gate de release inicial

- todos os testes determinísticos passam;
- nenhum segredo de fixture aparece em output ou logs;
- nenhuma ação externa acontece nos testes;
- casos críticos atingem 90% de recall de lacunas;
- regressões de schema bloqueiam merge.
