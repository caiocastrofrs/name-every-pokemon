import Timer from "./components/Timer";
import { TimerContext } from "./context/timer/context";
import formatPokemonName from "./utils/formatPokemonName";
import { getPokemonByGen } from "./utils/pokemon";
import React, { useContext, useState } from "react";

function App() {
  const timerValue = useContext(TimerContext);
  const pokemonList = getPokemonByGen(1);
  const progress = localStorage.getItem("pokemonFound");

  const [pokemonFound, setPokemonFound] = useState<string[]>(
    progress ? JSON.parse(progress) : []
  );
  const [inputValue, setInputValue] = useState("");

  const handleReset = () => setInputValue("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  // FORMAT POKEMON NAMES TO PREVENT PROBLEM WITH CASE, SYMBOLS OR WHITESPACES
  const pokemonNames = pokemonList.map((pokemon) => {
    return formatPokemonName(pokemon.name);
  });

  // CHECK IF THE POKEMON FOUND PROGRESS IS ALREADY SAVED IN LOCALSTORAGE, IF NOT, CREATES IT, IF YES, UPDATES IT IF NEEDED.
  if (progress) {
    if (JSON.stringify(progress) !== JSON.stringify([pokemonFound])) {
      localStorage.setItem("pokemonFound", JSON.stringify(pokemonFound));
    }
  } else {
    localStorage.setItem("pokemonFound", JSON.stringify(pokemonFound));
  }

  // CHECK IF POKEMON WAS ALREADY FOUND, IF NOT, INSERT IT TO pokemonFound ARRAY STATE.
  const pokemonAlreadyInserted = pokemonFound.includes(inputValue);
  if (pokemonNames.includes(inputValue) && !pokemonAlreadyInserted) {
    setPokemonFound((prevState) => [...prevState, inputValue]);
    handleReset();
  }

  return (
    <div className="font-[Pokemon_Solid] tracking-widest">
      <h1 className="text-5xl text-center mt-20 mb-10 text-pokemon-yellow">
        Name Every Pokémon
      </h1>
      <div className="flex gap-3 flex-wrap w-10/12 m-auto px-10 py-3 rounded-lg ">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id}>
            <img
              className={`w-15  ${
                !pokemonFound.includes(formatPokemonName(pokemon.name))
                  ? "grayscale"
                  : "animate-bounce"
              }
              `}
              src={pokemon.spriteUrl}
              alt={pokemon.name}
            />
          </div>
        ))}
      </div>
      <div className="w-full flex gap-5 justify-center mt-5 items-center">
        <Timer />
        <div className="flex flex-col gap-2 items-center relative">
          <input
            type="text"
            value={inputValue}
            placeholder="Type a Pokémon name here"
            className="w-80 text-center p-3 rounded-md bg-neutral-50 disabled:bg-neutral-400"
            onChange={handleChange}
            disabled={!timerValue.start}
          />
          {pokemonAlreadyInserted && (
            <span className="text-pokemon-yellow absolute -bottom-8 w-90">
              This Pokémon has already been named!
            </span>
          )}
        </div>

        <span className="text-lg text-pokemon-yellow">
          <span className="text-white">{pokemonFound.length}</span> of{" "}
          <span className="text-white">{pokemonList.length}</span> Pokémon
          named! {pokemonFound.length === 151 && "Congratulations!"}
        </span>
      </div>
    </div>
  );
}

export default App;
