import { atom } from "jotai";
import React, { useEffect } from "react";
import { useSetAtom } from "jotai/index";

interface AtomState {
  back?: {
    onClick: () => void;
    label: React.ReactNode | null;
    icon?: React.ReactNode | null;
  } | null;
  next?: {
    onClick: () => void;
    label: React.ReactNode | null;
    icon?: React.ReactNode | null;
  } | null;
  review?: React.ReactNode | null;
}

export const actionBarStateAtom = atom<AtomState>({
  back: {
    onClick: () => {},
    label: null,
    icon: null
  },
  next: {
    onClick: () => {},
    label: null,
    icon: null
  },
  review: null
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useActionButtons = (value: AtomState, deps: any[] = []) => {
  const setState = useSetAtom(actionBarStateAtom);
  useEffect(() => {
    setState(value);
    return () => setState({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setState, value, ...deps]);
};
