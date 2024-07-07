import { Item, Menu, Order } from "~/App/types";
import { generateClientId } from "~/App/utils/clientId.ts";

export enum Steps {
  Start = 0,
  Servings = 1,
  Flavors = 2,
  Toppings = 3,
  Confirm = 4,
  Payment = 5,
  Finish = 6
}

export interface State {
  currentStep: Steps;
  menu: Menu;
  order: Order;
  totalPrice: number;
}

export function defaultState(): State {
  return {
    currentStep: Steps.Start,
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

export const defaultCurrentItem = (): Item => ({
  clientId: generateClientId(),
  serving: undefined,
  flavors: [],
  toppings: []
});

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
