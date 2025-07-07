export default function formatPokemonName(name: string) {
  const formatted = name
    .toLowerCase()
    .replace(/ /g, "")
    .replace(/♂/g, "m")
    .replace(/♀/g, "f")
    .trim();

  return formatted;
}
