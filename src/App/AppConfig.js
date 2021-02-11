export const steps = {
  Start: 0,
  Servings: 1,
  Flavors: 2,
  Toppings: 3,
  Confirm: 4,
  Payment: 5,
  Finish: 6
};

export function defaultState() {
  return {
    currentStep: -1,
    Menu: {
      Servings: null,
      Flavors: null,
      Toppings: null
    },
    Order: {
      CurrentItem: defaultCurrentItem(),
      Number: -1,
      Items: []
    },
    TotalPrice: 0
  };
}

export function defaultCurrentItem() {
  return {
    Serving: null,
    Flavors: [],
    Toppings: []
  };
}

// Sample Card Details
export const CardDetails = {
  name: "Mayank Bansal",
  network: "Visa",
  type: "Credit",
  number: 5196000000001122,
  expiry: "02/19/2022",
  cvv: 999
};
