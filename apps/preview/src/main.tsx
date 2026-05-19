import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Load Kinari design tokens as CSS variables on :root
import "@kinari/tokens/tokens.css";
import "./preview.css";
import { App } from "./App";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
