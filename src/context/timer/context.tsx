import { createContext } from "react";

export type TimerContextType = {
  start: boolean;
  count: number;
  formattedTime: string;
  handleStart: (state: boolean) => void;
  handleCount: (ms: number) => void;
  handleFormattedTime: (time: string) => void;
  clearTime: () => void;
};

export const TimerContext = createContext({} as TimerContextType);
