import Fastify from "fastify";
import { DiscoveryInputSchema } from "@violeta/contracts";
import { buildInitialQuestions } from "@violeta/core";

const app = Fastify({ logger: true });

app.get("/health", async () => ({ status: "ok" }));

app.post("/v1/discovery/questions", async (request, reply) => {
  const result = DiscoveryInputSchema.safeParse(request.body);

  if (!result.success) {
    return reply.status(400).send({
      error: "INVALID_DISCOVERY_INPUT",
      issues: result.error.issues,
    });
  }

  return {
    questions: buildInitialQuestions(result.data),
    limitations: [
      "Esta versão utiliza somente regras determinísticas.",
      "Nenhuma integração externa foi consultada.",
    ],
  };
});

const port = Number(process.env.PORT ?? 3333);

await app.listen({ port, host: "0.0.0.0" });
