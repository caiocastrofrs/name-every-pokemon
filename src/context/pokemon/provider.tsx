import {
  useCallback,
  useContext,
  useEffect,
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

  const [userInput, setUserInput] = useState("");

  const pokemonList = getPokemonByGen(currentGeneration);
  const pokemonNames = pokemonList.map((pokemon) => {
    return formatPokemonName(pokemon.name);
  });
  const [pokemonFound, setPokemonFound] = useState<string[]>([]);

  const handleReset = () => setUserInput("");
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

  const resetRun = () => {
    setPokemonFound([]);
    timerContext.handleStart(false);
    timerContext.clearTime();
  };

  const checkIfRunIsCompleted = useCallback(() => {
    if (
      pokemonFound.length === totalPokemonByGeneration[currentGeneration] &&
      timerContext.start
    ) {
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

          timerContext.clearTime();
          setPokemonFound([]);
        }
      });
    }
  }, [
    completedHistory,
    pokemonFound.length,
    setCompletedHistory,
    timerContext,
    currentGeneration,
  ]);

  useEffect(
    () => checkIfRunIsCompleted(),
    [pokemonFound, timerContext, completedHistory, checkIfRunIsCompleted],
  );

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
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
