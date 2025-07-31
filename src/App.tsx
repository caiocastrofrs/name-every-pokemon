import Timer from "./components/Timer";
import History from "./components/History";
import { PokemonContext } from "./context/pokemon/context";
import { TimerContext } from "./context/timer/context";
import formatPokemonName from "./utils/formatPokemonName";
import { useContext } from "react";
import Generation from "./components/Generation";

function App() {
  const timerValue = useContext(TimerContext);
  const {
    pokemonFound,
    pokemonList,
    handleChange,
    pokemonAlreadyInserted,
    userInput,
  } = useContext(PokemonContext);

  return (
    <div className="font-[Pokemon_Solid]">
      <h1 className="text-pokemon-yellow mt-20 mb-10 text-center text-5xl">
        Name Every Pokémon
      </h1>
      <div className="my-10 mb-40 flex justify-center">
        <div className="flex w-7xl flex-wrap gap-3 rounded-lg px-10 py-3">
          {pokemonList.map((pokemon) => (
            <div key={pokemon.id}>
              <img
                className={`${
                  !pokemonFound.includes(formatPokemonName(pokemon.name))
                    ? "grayscale"
                    : "animate-bounce"
                } w-25`}
                src={pokemon.spriteUrl}
                alt={pokemon.name}
              />
            </div>
          ))}
        </div>
        <div>
          <History />
          <Generation />
        </div>
      </div>
      <div className="fixed bottom-5 mt-5 flex w-full items-center justify-center gap-5 p-5">
        <Timer />
        <div className="relative flex flex-col items-center gap-2">
          <input
            type="text"
            value={userInput}
            placeholder="Type a Pokémon name here"
            className="bg-pokemon-yellow border-pokemon-yellow-shadow focus:outline-pokemon-light-blue w-80 rounded-md border-6 p-3 text-center focus:outline-4 focus:outline-offset-2 disabled:border-neutral-600 disabled:bg-neutral-400"
            onChange={handleChange}
            disabled={!timerValue.start}
          />
          {pokemonAlreadyInserted && (
            <span className="text-pokemon-yellow absolute -bottom-10 w-90 translate-x-7">
              This Pokémon has already been named!
            </span>
          )}
        </div>
        <span className="text-pokemon-yellow text-2xl">
          <span className="text-white">{pokemonFound.length}</span> of{" "}
          <span className="text-white">{pokemonList.length}</span> Pokémon
          named! {pokemonFound.length === 151 && "Congratulations!"}
        </span>
      </div>
    </div>
  );
}

export default App;
