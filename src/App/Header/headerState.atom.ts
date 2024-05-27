import { atom } from "jotai";
import { useSetAtom } from "jotai/index";
import { useEffect } from "react";

export const headerStateAtom = atom({
  prompt: ""
});

export const useSetHeaderPrompt = (prompt: string) => {
  const setHeaderState = useSetAtom(headerStateAtom);
  useEffect(() => {
    setHeaderState({ prompt });
    return () => setHeaderState({ prompt: "" });
  }, []);
};
