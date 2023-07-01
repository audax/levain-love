import { IngredientType, Section, SectionType } from "@/data/recipe";

export const exampleSection: Section = {
  name: "dough",
  type: SectionType.dough,
  key: "default",
  ingredients: [
    { name: "flour-ingredient", key: "a", weight: 100, type: IngredientType.flour },
    { name: "water-ingredient", key: "b", weight: 50, type: IngredientType.fluid },
    { name: "salt-ingredient", key: "c", weight: 2, type: IngredientType.salt },
  ],
};
