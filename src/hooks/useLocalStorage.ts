import { useCallback, useSyncExternalStore } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const data = useSyncExternalStore(
    (onChange) => {
      const onStorageEvent = (e: Event) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail.key === key) {
          onChange();
        }
      };
      window.addEventListener("storage", onChange);
      window.addEventListener(
        "local-storage-change",
        onStorageEvent as EventListener,
      );
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(
          "local-storage-change",
          onStorageEvent as EventListener,
        );
      };
    },
    () => {
      const data = localStorage.getItem(key);
      return data || initialValue;
    },
    () => initialValue,
  );

  const setData = useCallback(
    (value: string) => {
      localStorage.setItem(key, value);
    },
    [key],
  );

  return [data, setData] as const;
};

export default useLocalStorage;
