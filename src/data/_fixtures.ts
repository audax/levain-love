import { IngredientType, Recipe, SectionType, emptyRecipe } from "@/data/recipe";

export const defaultRecipe: Recipe = {
  ...emptyRecipe,
  title: "Test Recipe",
  sections: [
    {
      name: "preferment",
      type: SectionType.preferment,
      key: "foobar",
      ingredients: [
        { name: "flour", key: "a", weight: 20, type: IngredientType.flour },
        { name: "water", key: "b", weight: 10, type: IngredientType.fluid },
      ],
    },
    {
      name: "dough",
      type: SectionType.dough,
      key: "default",
      ingredients: [
        { name: "flour", key: "a", weight: 100, type: IngredientType.flour },
        { name: "water", key: "b", weight: 50, type: IngredientType.fluid },
        { name: "salt", key: "c", weight: 2, type: IngredientType.salt },
      ],
    },
  ],
};

export const scaledRecipe: Recipe = {
  ...defaultRecipe,
  quantity: 2,
  sections: [
    {
      name: "preferment",
      type: SectionType.preferment,
      key: "foobar",
      ingredients: [
        { name: "flour", key: "a", weight: 40, type: IngredientType.flour },
        { name: "water", key: "b", weight: 20, type: IngredientType.fluid },
      ],
    },
    {
      name: "dough",
      type: SectionType.dough,
      key: "default",
      ingredients: [
        { name: "flour", key: "a", weight: 200, type: IngredientType.flour },
        { name: "water", key: "b", weight: 100, type: IngredientType.fluid },
        { name: "salt", key: "c", weight: 4, type: IngredientType.salt },
      ],
    },
  ],
};

export const exampleForImport = {
  name: "Shokupan",
  author: "&lt;Author&gt;",
  quantity: 6,
  notes: "",
  url: "",
  sections: [
    {
      name: "Tangzhong",
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

export const convertedExample: Recipe = {
  title: "Shokupan",
  quantity: 6,
  sections: [
    {
      name: "Tangzhong",
      type: SectionType.preferment,
      ingredients: [
        {
          weight: 675,
          type: IngredientType.fluid,
          name: "whole milk (3.5%)",
          key: expect.anything(),
        },
        {
          weight: 150,
          type: IngredientType.flour,
          name: "Flour",
          key: expect.anything(),
        },
      ],
      key: expect.anything(),
    },
    {
      name: "Dough",
      type: SectionType.dough,
      ingredients: [
        {
          weight: 1500,
          type: IngredientType.flour,
          name: "Bread flour",
          key: expect.anything(),
        },
        {
          weight: 375,
          type: IngredientType.fluid,
          name: "whole milk (3.5%)",
          key: expect.anything(),
        },
        {
          weight: 45,
          type: IngredientType.yeast,
          name: "fresh yeast",
          key: expect.anything(),
        },
        {
          weight: 30,
          type: IngredientType.salt,
          name: "salt",
          key: expect.anything(),
        },
        {
          weight: 150,
          type: IngredientType.other,
          name: "sugar",
          key: expect.anything(),
        },
        {
          weight: 150,
          type: IngredientType.other,
          name: "butter",
          key: expect.anything(),
        },
      ],
      key: expect.anything(),
    },
  ],
};

export const sourdoughExample = {
  name: "Sourdough",
  author: "&lt;Author&gt;",
  quantity: 2,
  notes: "",
  url: "",
  sections: [
    {
      ingredients: [
        { weight: 100, name: "Raisins", type: "extra", bakers_pct: 10 },
        { weight: 200, name: "water", type: "fluid", bakers_pct: 20 },
      ],
      name: "Soaker!",
      type: "soaker",
    },
    {
      ingredients: [
        { weight: 100, name: "flour", type: "flour", bakers_pct: 10 },
        { weight: 2, name: "salt", type: "salt", bakers_pct: 0.2 },
      ],
      name: "Other stuff",
      type: "misc",
    },
    {
      name: "Dough",
      type: "dough",
      ingredients: [
        { weight: 1000, name: "Bread flour", type: "flour", bakers_pct: 100 },
        { weight: 500, name: "water", type: "fluid", bakers_pct: 50 },
        { weight: 20, name: "salt", type: "salt", bakers_pct: 2 },
        { weight: 200, name: "starter", type: "starter", hydration: 50, bakers_pct: 20 },
      ],
    },
  ],
  version: 1,
  permanent_url: "https://fgbc.dk/37to",
};

export const sourdoughConverted: Recipe = {
  title: "Sourdough",
  quantity: 2,
  sections: [
    {
      ingredients: [
        { weight: 100, name: "Raisins", type: IngredientType.other, key: expect.anything() },
        { weight: 200, name: "water", type: IngredientType.fluid, key: expect.anything() },
      ],
      name: "Soaker!",
      type: SectionType.soaker,
      key: expect.anything(),
    },
    {
      ingredients: [
        { weight: 100, name: "flour", type: IngredientType.flour, key: expect.anything() },
        { weight: 2, name: "salt", type: IngredientType.salt, key: expect.anything() },
      ],
      name: "Other stuff",
      type: SectionType.other,
      key: expect.anything(),
    },
    {
      name: "Dough",
      type: SectionType.dough,
      ingredients: [
        {
          weight: 1000,
          type: IngredientType.flour,
          name: "Bread flour",
          key: expect.anything(),
        },
        {
          weight: 500,
          type: IngredientType.fluid,
          name: "water",
          key: expect.anything(),
        },
        {
          weight: 20,
          type: IngredientType.salt,
          name: "salt",
          key: expect.anything(),
        },
        {
          weight: 200,
          type: IngredientType.starter,
          name: "starter",
          hydration: 50,
          key: expect.anything(),
        },
      ],
      key: expect.anything(),
    },
  ],
};
