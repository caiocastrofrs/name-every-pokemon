import pokemonHelper from "pokemon";

export type Pokemon = {
  id: number;
  name: string;
  spriteUrl: string;
};

export const generationRanges: Record<number, { start: number; end: number }> =
  {
    1: { start: 1, end: 151 }, // Gen I (Red/Blue/Yellow)
    2: { start: 152, end: 251 }, // Gen II (Gold/Silver)
    3: { start: 252, end: 386 }, // Gen III (Ruby/Sapphire)
    4: { start: 387, end: 493 }, // Gen IV (Diamond/Pearl)
    5: { start: 494, end: 649 }, // Gen V (Black/White)
    6: { start: 650, end: 721 }, // Gen VI (X/Y)
    7: { start: 722, end: 809 }, // Gen VII (Sun/Moon)
    8: { start: 810, end: 905 }, // Gen VIII (Sword/Shield)
    9: { start: 906, end: 1025 }, // Gen IX (Scarlet/Violet)
  };

const getAllPokemon = () => {
  return pokemonHelper.all();
};

const getRandomPokemon = () => {
  return pokemonHelper.random();
};

const getPokemonNameById = (id: number) => {
  if (!id) return;
  return pokemonHelper.getName(id);
};

const getPokemonIdByName = (name: string) => {
  if (!name) return;
  return pokemonHelper.getId(name);
};

const formatPokemonObject = (name: string) => {
  const pokemonId = getPokemonIdByName(name);
  const pokemonSprite = `/sprites/pokemon/${pokemonId}.png`;

  const pokemon = {
    id: pokemonId,
    name,
    spriteUrl: pokemonSprite,
  };

  return pokemon as Pokemon;
};

const getPokemonByGen = (gen: number): Pokemon[] => {
  const allPokemon = getAllPokemon();

  const generationStart = generationRanges[gen].start;
  const generationEnd = generationRanges[gen].end;

  const generation = allPokemon.slice(generationStart - 1, generationEnd);

  const formattedPokemon = generation.map((name) => formatPokemonObject(name));

  return formattedPokemon;
};

export {
  getAllPokemon,
  getRandomPokemon,
  getPokemonNameById,
  getPokemonIdByName,
  getPokemonByGen,
};
