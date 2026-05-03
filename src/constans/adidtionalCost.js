export const ADDITIONAL_COST = [
  {
    id: 1,
    name: "Palo de helado largo X 100",
    totaUnit: 1,
    price: 2000,
    lastUpdate: "2026-04-20",
  },

  {
    id: 2,
    name: "Basenilla",
    totaUnit: 1,
    price: 7500,
    lastUpdate: "2026-04-20",
  },
  {
    id: 3,
    name: "Ambulancia",
    totaUnit: 1,
    price: 50000,
    lastUpdate: "2026-04-20",
  },
  {
    id: 4,
    name: "Medicine",
    totaUnit: 1,
    price: 100000,
    lastUpdate: "2026-04-20",
  },
];

export const TOTAL_ADDITINAL_COST = ADDITIONAL_COST.reduce(
  (a, b) => a + b.price,
  0,
);
