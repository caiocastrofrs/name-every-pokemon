import { useContext } from "react";
import { PokemonContext } from "../../context/pokemon/context";
import { TimerContext } from "../../context/timer/context";

export default function Generation() {
  const { start } = useContext(TimerContext);
  const { handleChangeGeneration, currentGeneration } =
    useContext(PokemonContext);

  return (
    <div className="">
      <span className="text-pokemon-yellow mb-10 block text-2xl">
        Choose the generation
      </span>
      <select
        disabled={start}
        value={currentGeneration}
        className="text-pokemon-dark-blue border-pokemon-yellow-shadow bg-pokemon-yellow w-full rounded-md border-6 px-5 font-bold disabled:border-neutral-600 disabled:bg-neutral-400"
        onChange={(e) => handleChangeGeneration(Number(e.target.value))}
      >
        <option value={1} defaultChecked>
          I
        </option>
        <option value={2}>II</option>
        <option value={3}>III</option>
        <option value={4}>IV</option>
        <option value={5}>V</option>
        <option value={6}>VI</option>
        <option value={7}>VII</option>
        <option value={8}>VIII</option>
        <option value={9}>IX</option>
      </select>
    </div>
  );
}
