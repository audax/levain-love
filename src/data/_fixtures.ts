import { IngredientType, Recipe, SectionType, emptyRecipe } from "@/data/recipe";

export const defaultRecipe: Recipe = {
  ...emptyRecipe,
  title: 'Test Recipe',
  sections: [
    {
      name: "preferment",
      type: SectionType.preferment,
      key: 'foobar',
      ingredients: [
        { name: "flour", key: 'a', weight: 20, pct: 100, type: IngredientType.flour },
        { name: "water", key: 'b', weight: 10, pct: 50, type: IngredientType.fluid },
      ]
    },
    {
      name: "dough",
      type: SectionType.dough,
      key: 'default',
      ingredients: [
        { name: "flour", key: 'a', weight: 100, pct: 100, type: IngredientType.flour },
        { name: "water", key: 'b', weight: 50, pct: 50, type: IngredientType.fluid },
        { name: "salt",  key: 'c', weight: 2, pct: 2, type: IngredientType.salt}
      ],
    },
  ],
}

export const scaledRecipe: Recipe = {
  ...defaultRecipe,
  quantity: 2,
  sections: [
    {
      name: "preferment",
      type: SectionType.preferment,
      key: 'foobar',
      ingredients: [
        { name: "flour", key: 'a', weight: 40, pct: 100, type: IngredientType.flour },
        { name: "water", key: 'b', weight: 20, pct: 50, type: IngredientType.fluid },
      ]
    },
    {
      name: "dough",
      type: SectionType.dough,
      key: 'default',
      ingredients: [
        { name: "flour", key: 'a', weight: 200, pct: 100, type: IngredientType.flour },
        { name: "water", key: 'b', weight: 100, pct: 50, type: IngredientType.fluid },
        { name: "salt",  key: 'c', weight: 4, pct: 2, type: IngredientType.salt}
      ],
    },
  ],
}