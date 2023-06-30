const example = {
  name: "Shokupan",
  author: "&lt;Author&gt;",
  quantity: 6,
  notes: "",
  url: "",
  sections: [
    {
      name: "Tangzhong ",
      type: "preferment",
      ingredients: [
        {
          weight: 675,
          type: "dairy",
          name: "whole milk (3.5%)",
          preset: 4,
          protein: 3.5,
          fat: 3.5,
          carbs: 4.8,
          sugars: 4.8,
          ash: 0.7,
          salt: 0,
          hydration: 87.5,
          bakers_pct: 450,
        },
        { weight: 150, type: "flour", name: "Flour", bakers_pct: 100 },
      ],
    },
    {
      name: "Dough",
      type: "dough",
      ingredients: [
        { weight: 1500, type: "flour", name: "Bread flour", bakers_pct: 100 },
        {
          weight: 375,
          type: "dairy",
          name: "whole milk (3.5%)",
          preset: 4,
          protein: 3.5,
          fat: 3.5,
          carbs: 4.8,
          sugars: 4.8,
          ash: 0.7,
          salt: 0,
          hydration: 87.5,
          bakers_pct: 25,
        },
        { weight: 45, type: "yeast", name: "fresh yeast", bakers_pct: 3 },
        { weight: 30, type: "salt", name: "salt", bakers_pct: 2 },
        { weight: 150, type: "sugar", name: "sugar", preset: 0, carbs: 100, sugars: 100, hydration: 0, bakers_pct: 10 },
        { weight: 150, type: "fat", name: "butter", bakers_pct: 10 },
      ],
    },
  ],
  version: 1,
  permanent_url: "https://fgbc.dk/37rb",
};
