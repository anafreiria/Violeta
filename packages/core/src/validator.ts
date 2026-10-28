import type { Prd } from "@violeta/contracts";

export interface QualityFinding {
  code: string;
  severity: "error" | "warning" | "info";
  message: string;
  path?: string;
}

export interface QualityReport {
  score: number;
  readyForReview: boolean;
  findings: QualityFinding[];
}

export function validatePrdQuality(prd: Prd): QualityReport {
  const findings: QualityFinding[] = [];

  for (const [index, requirement] of prd.functionalRequirements.entries()) {
    if (requirement.acceptanceCriteria.length === 0) {
      findings.push({
        code: "REQUIREMENT_WITHOUT_ACCEPTANCE",
        severity: "error",
        message: `O requisito ${requirement.id} não possui critério de aceite.`,
        path: `functionalRequirements.${index}`,
      });
    }
    if (requirement.evidenceIds.length === 0) {
      findings.push({
        code: "REQUIREMENT_WITHOUT_EVIDENCE",
        severity: "warning",
        message: `O requisito ${requirement.id} não possui evidência vinculada.`,
        path: `functionalRequirements.${index}`,
      });
    }
  }

  if (prd.openQuestions.length > 0) {
    findings.push({
      code: "OPEN_QUESTIONS",
      severity: "warning",
      message: `Existem ${prd.openQuestions.length} dúvidas abertas.`,
      path: "openQuestions",
    });
  }

  const penalty = findings.reduce(
    (total, finding) => total + (finding.severity === "error" ? 15 : 5),
    0,
  );

  return {
    score: Math.max(0, 100 - penalty),
    readyForReview: !findings.some((finding) => finding.severity === "error"),
    findings,
  };
}
