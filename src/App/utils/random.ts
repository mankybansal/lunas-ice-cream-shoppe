const getRandomFlavors = (scoops: number): string[] => {
  const selectedFlavors = new Set<string>();
  while (selectedFlavors.size < scoops) {
    const randomIndex = Math.floor(Math.random() * 8) + 1;
    selectedFlavors.add("FLA" + randomIndex.toString());
  }
  return Array.from(selectedFlavors);
};

const getRandomToppings = (scoops: number): string[] => {
  const selectedToppings = new Set<string>();
  while (selectedToppings.size < scoops) {
    const randomIndex = Math.floor(Math.random() * 8) + 1;
    selectedToppings.add("TOP" + randomIndex.toString());
  }
  return Array.from(selectedToppings);
};

const getRandomServing = (): string => {
  const randomIndex = Math.floor(Math.random() * 2) + 1;
  return "SER" + randomIndex.toString();
};

export const getRandomIceCream = () => {
  const serving = getRandomServing();
  return {
    scoops: getRandomFlavors(serving === "SER1" ? 3 : 2),
    serving,
    toppings: getRandomToppings(serving === "SER1" ? 2 : 1)
  };
};
