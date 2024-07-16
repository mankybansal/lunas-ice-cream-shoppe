import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";

export const headerStateAtom = atom({
  prompt: ""
});

export const useSetHeaderPrompt = (prompt: string) => {
  const setHeaderState = useSetAtom(headerStateAtom);
  useEffect(() => {
    setHeaderState({ prompt });
    return () => setHeaderState({ prompt: "" });
  }, [prompt, setHeaderState]);
};
