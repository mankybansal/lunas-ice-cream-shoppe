import { CompletedOrder } from "~/api.ts";

export interface KioskFormData {
  menu: Menu;
  completedOrder: CompletedOrder | null;
  order: Order;
  totalPrice: number;
  currentStep: number;
}

export interface Flavor {
  id: string;
  name: string;
  desc: string;
  price: number;
  calories: number;
  image: string;
}

export interface Topping {
  id: string;
  name: string;
  desc: string;
  price: number;
  calories: number;
  image: string;
}

export interface Serving {
  id: string;
  name: string;
  desc: string;
  scoops: number;
  toppings: number;
  image: string;
}

export interface Item {
  serving: Serving | undefined;
  flavors: Flavor[];
  toppings: Topping[];
}

export interface Order {
  currentItem: Item;
  items: Item[];
}

export interface Payment {
  amount: number;
  network: string;
  type: string;
  number: string;
}

export interface Menu {
  servings: Serving[];
  flavors: Flavor[];
  toppings: Topping[];
}
