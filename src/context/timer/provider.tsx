import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TimerContext } from "./context";
import { showTimer } from "../../utils/showTimer";

export default function TimerProvider({ children }: PropsWithChildren) {
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [formattedTime, setFormattedTime] = useState("00:00");

  const handleStart = (state: boolean) => setStart(state);
  const handleCount = useCallback((ms: number) => setCount(ms), []);
  const handleFormattedTime = useCallback(
    (time: string) => setFormattedTime(time),
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initTime = new Date();

  const clearTime = () => {
    handleFormattedTime("00:00");
    handleCount(0);
  };

  // CHECK IF TIMER ALREADY STARTED, IF YES, THEN CREATE THE INTERVAL, GET THE DIFFERENCE OF SECONDS AND UPDATE THE STATE
  useEffect(() => {
    if (!start) {
      return;
    }
    const id = setInterval(() => {
      const left = count + (Number(new Date()) - Number(initTime));
      handleCount(left);
      handleFormattedTime(showTimer(left));
    }, 100);
    return () => clearInterval(id);
  }, [start, count, initTime, handleCount, handleFormattedTime]);

  return (
    <TimerContext.Provider
      value={{
        start,
        count,
        formattedTime,
        handleStart,
        handleCount,
        handleFormattedTime,
        clearTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
