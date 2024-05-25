import { Item, Menu, Order } from "~/App/types.ts";

export const steps = {
  Start: 0,
  Servings: 1,
  Flavors: 2,
  Toppings: 3,
  Confirm: 4,
  Payment: 5,
  Finish: 6
} as const;

export type Steps = (typeof steps)[keyof typeof steps];

export interface State {
  currentStep: Steps | -1;
  menu: Menu;
  order: Order;
  totalPrice: number;
}

export function defaultState(): State {
  return {
    currentStep: -1,
    menu: {
      servings: [],
      flavors: [],
      toppings: []
    },
    order: {
      currentItem: defaultCurrentItem(),
      items: []
    },
    totalPrice: 0
  };
}

export function defaultCurrentItem(): Item {
  return {
    serving: undefined,
    flavors: [],
    toppings: []
  };
}

export interface CardDetails {
  name: string;
  network: string;
  type: string;
  number: string;
  expiry: string;
  cvv: number;
}

export const CardDetails: CardDetails = {
  name: "Mayank Bansal",
  network: "Visa",
  type: "Credit",
  number: "5196000000001122",
  expiry: "02/19/2022",
  cvv: 999
};
