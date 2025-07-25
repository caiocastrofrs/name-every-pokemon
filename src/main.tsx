import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import TimerProvider from "./context/timer/provider.tsx";
import PokemonProvider from "./context/pokemon/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TimerProvider>
      <PokemonProvider>
        <App />
      </PokemonProvider>
    </TimerProvider>
  </StrictMode>,
);
