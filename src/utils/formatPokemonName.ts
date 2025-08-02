export default function formatPokemonName(name: string) {
  const formatted = name
    .toLowerCase()
    .replace(/ /g, "")
    .replace(/♂/g, "m")
    .replace(/♀/g, "f")
    .replace(/\./g, "")
    .replace(/'/g, "")
    .trim();

  return formatted;
}
