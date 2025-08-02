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
    hideNamedPokemon,
    handleHideNamedPokemon,
  } = useContext(PokemonContext);

  return (
    <div>
      <h1 className="text-pokemon-yellow mt-20 mb-10 text-center font-[Pokemon_Solid] text-5xl">
        Name Every Pokémon
      </h1>
      <div className="my-10 mb-40 flex justify-center gap-10">
        <div>
          <span className="m-1 block font-bold text-neutral-200">
            Replace ♂ to m and ♀ to f at the end of name
          </span>
          <div className="bg-pokemon-dark-blue flex h-[50vh] w-5xl flex-wrap content-baseline overflow-scroll rounded-lg pt-10">
            {pokemonList.map((pokemon) => {
              const alreadyNamed = pokemonFound.includes(
                formatPokemonName(pokemon.name),
              );

              return (
                <div
                  key={pokemon.id}
                  className={`${alreadyNamed && hideNamedPokemon && timerValue.start && "hidden"} max-h-[100px]`}
                >
                  <img
                    className={`${
                      !alreadyNamed ? "grayscale" : "animate-bounce"
                    } w-25`}
                    src={pokemon.spriteUrl}
                    alt={pokemon.name}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex w-full items-center justify-center gap-5 p-5">
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
                <span className="text-pokemon-yellow absolute -bottom-10 w-90 translate-x-7 font-[Pokemon_Solid]">
                  This Pokémon has already been named!
                </span>
              )}
            </div>
            <span className="text-pokemon-yellow font-[Pokemon_Solid] text-2xl">
              <span className="text-white">{pokemonFound.length}</span> of{" "}
              <span className="text-white">{pokemonList.length}</span> Pokémon
              named! {pokemonFound.length === 151 && "Congratulations!"}
            </span>
          </div>
        </div>
        <div className="flex h-[55vh] flex-col gap-5">
          <History />
          <Generation />
          <label className="text-pokemon-yellow mt-5 block font-[Pokemon_Solid] text-xl">
            <input
              type="checkbox"
              onChange={(e) => handleHideNamedPokemon(e.target.checked)}
            />
            <span> Hide named Pokémon</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
