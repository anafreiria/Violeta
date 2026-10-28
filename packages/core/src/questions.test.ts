import { describe, expect, it } from "vitest";
import { buildInitialQuestions } from "./questions.js";

describe("buildInitialQuestions", () => {
  it("continues without GitHub or Linear", () => {
    const questions = buildInitialQuestions({
      projectName: "Greenfield",
      goal: "Criar uma plataforma educacional completa.",
      repository: { kind: "none", access: "none" },
      issueTracker: { kind: "none", access: "none" },
      requestedArtifacts: ["prd"],
      sensitivePaths: [],
    });

    expect(questions.some((question) => question.id === "greenfield-constraints")).toBe(true);
    expect(questions.some((question) => question.id === "request-source")).toBe(true);
  });
});
