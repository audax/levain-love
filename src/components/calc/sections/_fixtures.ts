import { IngredientType, Section, SectionType } from "@/data/recipe";

export const exampleSection: Section = {
  name: "dough",
  type: SectionType.dough,
  key: "default",
  ingredients: [
    { name: "flour", key: "a", weight: 100, pct: 100, type: IngredientType.flour },
    { name: "water", key: "b", weight: 50, pct: 50, type: IngredientType.fluid },
    { name: "salt", key: "c", weight: 2, pct: 2, type: IngredientType.salt },
  ],
};
