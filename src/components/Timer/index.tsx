import { useContext } from "react";
import { TimerContext } from "../../context/timer/context";
import { PokemonContext } from "../../context/pokemon/context";

export default function Timer() {
  const { formattedTime, handleStart, start, clearTime } =
    useContext(TimerContext);
  const { resetRun } = useContext(PokemonContext);
  return (
    <div className="flex gap-5 items-center">
      <span className="text-4xl text-pokemon-yellow w-25 h-15">
        {formattedTime}
      </span>
      <button
        className="text-white py-3 px-5 rounded-md cursor-pointer hover:"
        onClick={clearTime}
      >
        Clear
      </button>
      {start ? (
        <button
          className="py-3 bg-red-500 border border-pokemon-dark-blue rounded-md cursor-pointer hover:bg-red-400 px-5"
          onClick={() => resetRun()}
        >
          Stop
        </button>
      ) : (
        <button
          className="text-pokemon-dark-blue py-3 bg-pokemon-yellow border border-pokemon-dark-blue rounded-md cursor-pointer hover:bg-pokemon-yellow-shadow px-5"
          onClick={() => handleStart(true)}
        >
          Start
        </button>
      )}
    </div>
  );
}
