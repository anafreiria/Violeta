import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main>
      <section className="hero" aria-labelledby="title">
        <span className="eyebrow">SPECIFICATION-DRIVEN DEVELOPMENT</span>
        <h1 id="title">Contexto antes do código.</h1>
        <p>
          Descubra lacunas, gere PRDs/SDDs rastreáveis e conecte decisões,
          agentes, TestSprite e evidências — com ou sem GitHub e Linear.
        </p>
        <button type="button" disabled title="Disponível na Fase 1">
          Iniciar descoberta — em breve
        </button>
      </section>
      <section className="principles" aria-label="Princípios do produto">
        <article><strong>Perguntar</strong><span>Não inventar decisões ausentes.</span></article>
        <article><strong>Rastrear</strong><span>Vincular requisitos às fontes.</span></article>
        <article><strong>Validar</strong><span>Medir completude e testabilidade.</span></article>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
