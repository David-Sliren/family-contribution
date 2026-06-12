const DATA_COST = {
  clinic: "clinico",
  variable: "variable",
};

export const ADDITIONAL_COST = [
  {
    id: 1,
    name: "Palo de helado largo X 100",
    price: 2000,
    lastUpdate: "2026-04-20",
    category: DATA_COST.variable,
  },

  {
    id: 2,
    name: "Basenilla",
    price: 7500,
    lastUpdate: "2026-04-20",
    category: DATA_COST.variable,
  },
  {
    id: 3,
    name: "Medicinas",
    price: 50000,
    lastUpdate: "2026-04-20",
    category: DATA_COST.clinic,
  },
  {
    id: 4,
    name: "Ambulancia",
    price: 100000,
    lastUpdate: "2026-04-20",
    category: DATA_COST.clinic,
  },
];

export const TOTAL_ADDITINAL_COST = ADDITIONAL_COST.reduce(
  (a, b) => a + b.price,
  0,
);
