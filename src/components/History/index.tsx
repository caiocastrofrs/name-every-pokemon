import useLocalStorage from "../../hooks/useLocalStorage";

type HistoryType = {
  timeInMilliseconds: number;
  formattedTime: string;
  generation: number;
};

const GenerationFormat: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
};

export default function History() {
  const [completedHistory] = useLocalStorage(
    "completedHistory",
    JSON.stringify([]),
  );

  const parsed: HistoryType[] = JSON.parse(completedHistory);

  return (
    <div className="p-5">
      <span className="text-pokemon-yellow mb-10 block text-2xl">
        Previous challenges
      </span>
      <div className="border-pokemon-yellow-shadow bg-pokemon-yellow text-pokemon-light-blue flex-col gap-2 rounded-md border-6 px-2 py-4">
        <div className="mb-5 flex justify-around">
          <span className="border-pokemon-light-blue border-b-4"></span>
          <span className="border-pokemon-light-blue border-b-4">
            Generation
          </span>
          <span className="border-pokemon-light-blue border-b-4">Time</span>
        </div>
        {parsed.map((item, index: number) => (
          <div
            className="flex justify-between px-3"
            key={item.timeInMilliseconds + index}
          >
            <span>{index + 1} .</span>
            <span>{GenerationFormat[item.generation]}</span>
            {item.formattedTime}
          </div>
        ))}
      </div>
    </div>
  );
}
