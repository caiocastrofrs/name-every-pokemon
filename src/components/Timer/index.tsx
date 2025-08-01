import { useContext } from "react";
import { TimerContext } from "../../context/timer/context";
import { PokemonContext } from "../../context/pokemon/context";

export default function Timer() {
  const { formattedTime, handleStart, start, clearTime } =
    useContext(TimerContext);
  const { resetRun } = useContext(PokemonContext);
  return (
    <div className="flex items-center gap-5">
      <span className="text-pokemon-yellow h-15 w-25 text-4xl">
        {formattedTime}
      </span>
      {start ? (
        <button
          className="border-pokemon-dark-blue cursor-pointer rounded-md border bg-red-500 px-5 py-3 hover:bg-red-400"
          onClick={() => resetRun()}
        >
          Stop
        </button>
      ) : (
        <button
          className="text-pokemon-dark-blue bg-pokemon-yellow border-pokemon-dark-blue hover:bg-pokemon-yellow-shadow cursor-pointer rounded-md border px-5 py-3"
          onClick={() => handleStart(true)}
        >
          Start
        </button>
      )}
    </div>
  );
}
