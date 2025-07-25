import { createContext } from "react";
import type { Pokemon } from "../../utils/pokemon";

type PokemonContextType = {
  pokemonList: Pokemon[];
  pokemonFound: string[];
  userInput: string;
  pokemonAlreadyInserted: boolean;
  currentGeneration: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeGeneration: (value: number) => void;
  resetRun: () => void;
};

export const PokemonContext = createContext({} as PokemonContextType);
