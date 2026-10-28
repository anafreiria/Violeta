import { z } from "zod";

export const RepositoryKindSchema = z.enum([
  "github",
  "local",
  "upload",
  "other",
  "none",
]);

export const IssueTrackerKindSchema = z.enum([
  "linear",
  "github-issues",
  "other",
  "none",
]);

export const DiscoveryInputSchema = z.object({
  projectName: z.string().min(1),
  goal: z.string().min(10),
  changeType: z
    .enum(["feature", "bug", "migration", "refactor", "research", "greenfield", "other"])
    .optional(),
  repository: z.object({
    kind: RepositoryKindSchema,
    reference: z.string().optional(),
    access: z.enum(["none", "read", "write"]).default("none"),
  }),
  issueTracker: z.object({
    kind: IssueTrackerKindSchema,
    reference: z.string().optional(),
    access: z.enum(["none", "read", "write"]).default("none"),
  }),
  requestedArtifacts: z
    .array(z.enum(["prd", "agent-foundation", "quality-report"]))
    .min(1),
  sensitivePaths: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

export const QuestionSchema = z.object({
  id: z.string(),
  priority: z.enum(["blocking", "important", "optional"]),
  category: z.string(),
  prompt: z.string(),
  rationale: z.string(),
});

export const DeliveryStateSchema = z.enum([
  "preparing",
  "awaiting-decisions",
  "approved-for-local-implementation",
  "implementing",
  "validating",
  "awaiting-review",
  "technically-complete",
  "blocked-for-production",
  "approved",
  "handed-off",
]);

export const EvidenceSchema = z.object({
  id: z.string(),
  provider: z.enum([
    "unit",
    "integration",
    "database",
    "concurrency",
    "testsprite",
    "typecheck",
    "build",
    "static-analysis",
    "manual",
    "institutional",
    "other",
  ]),
  environment: z.string().min(1),
  scenario: z.string().min(1),
  requirementIds: z.array(z.string()).default([]),
  status: z.enum(["passed", "failed", "blocked", "not-run"]),
  attempt: z.number().int().positive(),
  artifactUrl: z.string().url().optional(),
  limitations: z.array(z.string()).default([]),
});

export const RequirementSchema = z.object({
  id: z.string(),
  description: z.string().min(1),
  acceptanceCriteria: z.array(z.string().min(1)).min(1),
  evidenceIds: z.array(z.string()).default([]),
});

export const PrdSchema = z.object({
  schemaVersion: z.literal("1.0"),
  title: z.string().min(1),
  status: z.enum(["draft", "in-review", "approved"]),
  deliveryState: DeliveryStateSchema.default("preparing"),
  executiveSummary: z.string().min(1),
  problem: z.string().min(1),
  objectives: z.array(z.string()).min(1),
  successMetrics: z.array(z.string()).default([]),
  usersAndScenarios: z.array(z.string()).min(1),
  scope: z.array(z.string()).min(1),
  nonGoals: z.array(z.string()).min(1),
  functionalRequirements: z.array(RequirementSchema).min(1),
  nonFunctionalRequirements: z.array(RequirementSchema).default([]),
  businessRules: z.array(z.string()).default([]),
  technicalImpact: z.array(z.string()).default([]),
  dataAndMigrations: z.array(z.string()).default([]),
  securityAndPrivacy: z.array(z.string()).default([]),
  testStrategy: z.array(z.string()).min(1),
  rolloutAndRollback: z.array(z.string()).default([]),
  risksAndMitigations: z.array(
    z.object({ risk: z.string(), mitigation: z.string() }),
  ).default([]),
  openQuestions: z.array(z.string()).default([]),
  evidenceIds: z.array(z.string()).default([]),
  evidence: z.array(EvidenceSchema).default([]),
  authorizationBoundary: z.array(z.string()).min(1),
  materialPendingDecisions: z.array(z.string()).default([]),
  productionReadiness: z.enum(["not-assessed", "blocked", "conditional", "ready"]).default("not-assessed"),
  handoff: z.array(z.string()).default([]),
  approvedBy: z.array(z.string()).default([]),
});

export type DiscoveryInput = z.infer<typeof DiscoveryInputSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type Prd = z.infer<typeof PrdSchema>;
