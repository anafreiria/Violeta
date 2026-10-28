import type { DiscoveryInput, Question } from "@violeta/contracts";

export function buildInitialQuestions(input: DiscoveryInput): Question[] {
  const questions: Question[] = [];

  if (!input.changeType) {
    questions.push({
      id: "change-type",
      priority: "blocking",
      category: "scope",
      prompt: "Como você classifica esta demanda?",
      rationale: "O tipo de mudança define quais riscos e seções precisam ser investigados.",
    });
  }

  if (input.repository.kind === "none") {
    questions.push({
      id: "greenfield-constraints",
      priority: "important",
      category: "technical-context",
      prompt: "O projeto é novo? Quais tecnologias, restrições ou decisões já foram confirmadas?",
      rationale: "Sem repositório, decisões confirmadas precisam ser separadas de recomendações.",
    });
  }

  if (input.issueTracker.kind === "none") {
    questions.push({
      id: "request-source",
      priority: "important",
      category: "product-context",
      prompt: "Onde a solicitação original e suas decisões estão registradas?",
      rationale: "A ausência de um gerenciador de issues não deve eliminar a rastreabilidade.",
    });
  }

  questions.push({
    id: "approval-owner",
    priority: "blocking",
    category: "governance",
    prompt: "Quem deverá revisar e aprovar o PRD antes da implementação?",
    rationale: "A geração do documento não equivale a autorização para implementar.",
  });

  return questions.slice(0, 5);
}
