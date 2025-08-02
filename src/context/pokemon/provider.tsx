import {
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { getPokemonByGen } from "../../utils/pokemon";
import { PokemonContext } from "./context";
import formatPokemonName from "../../utils/formatPokemonName";
import { TimerContext } from "../timer/context";
import Swal from "sweetalert2";
import useLocalStorage from "../../hooks/useLocalStorage";

const totalPokemonByGeneration: Record<number, number> = {
  1: 151,
  2: 100,
  3: 135,
  4: 107,
  5: 156,
  6: 72,
  7: 88,
  8: 96,
  9: 120,
};

export default function PokemonProvider({ children }: PropsWithChildren) {
  const timerContext = useContext(TimerContext);
  const [currentGeneration, setCurrentGeneration] = useState(1);

  const pokemonList = getPokemonByGen(currentGeneration);

  const pokemonNames = pokemonList.map((pokemon) => {
    return formatPokemonName(pokemon.name);
  });
  const [hideNamedPokemon, setHideNamedPokemon] = useState(false);
  const [pokemonFound, setPokemonFound] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");

  const handleReset = () => setUserInput("");

  const handleHideNamedPokemon = (value: boolean) => setHideNamedPokemon(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInput(e.target.value);

  const handleChangeGeneration = (value: number) => {
    setCurrentGeneration(value);
  };

  const pokemonAlreadyInserted = pokemonFound.includes(userInput);

  if (pokemonNames.includes(userInput) && !pokemonAlreadyInserted) {
    setPokemonFound((prevState) => [...prevState, userInput]);
    handleReset();
  }

  const [completedHistory, setCompletedHistory] = useLocalStorage(
    "completedHistory",
    JSON.stringify([]),
  );

  const resetRun = useCallback(() => {
    setPokemonFound([]);
    timerContext.handleStart(false);
    setUserInput("");
    timerContext.clearTime();
  }, [timerContext]);

  const checkIfRunIsCompleted = useCallback(() => {
    const isRunCompleted =
      pokemonFound.length === totalPokemonByGeneration[currentGeneration];

    if (isRunCompleted && timerContext.start) {
      timerContext.handleStart(false);
      Swal.fire({
        title: "Good job!",
        text: "You've completed the challenge. Want to save this progress and start a new one?",
        showConfirmButton: true,
        confirmButtonText: "Yes",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedHistory = [
            ...(completedHistory ? JSON.parse(completedHistory) : []),
            {
              timeInMilliseconds: timerContext.count,
              formattedTime: timerContext.formattedTime,
              generation: currentGeneration,
            },
          ];

          setCompletedHistory(JSON.stringify(updatedHistory));
        }

        resetRun();
      });
    }
  }, [
    completedHistory,
    pokemonFound,
    setCompletedHistory,
    timerContext,
    resetRun,
    currentGeneration,
  ]);

  checkIfRunIsCompleted();

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        pokemonFound,
        userInput,
        pokemonAlreadyInserted,
        currentGeneration,
        handleChange,
        handleChangeGeneration,
        resetRun,
        hideNamedPokemon,
        handleHideNamedPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
