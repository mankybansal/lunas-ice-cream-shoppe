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
        currentStep: steps.Start,
        Menu: {
            Servings: null,
            Flavors: null,
            Toppings: null
        },
        Order: defaultOrder(),
        TotalPrice: 0
    };
}

export function defaultOrder() {
    return {
        CurrentItem: defaultCurrentItem(),
        Number: -1,
        Items: []
    };
}

export function defaultCurrentItem() {
    return {
        Serving: null,
        Flavors: [],
        Toppings: []
    };
}