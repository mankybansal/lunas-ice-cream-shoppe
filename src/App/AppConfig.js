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
        Order: resetOrder()
    };
}

export function resetOrder() {
    return {
        CurrentItem: resetCurrentItem(),
        Number: -1,
        Items: []
    };
}

export function resetCurrentItem() {
    return {
        Serving: null,
        Flavors: [],
        Toppings: []
    };
}