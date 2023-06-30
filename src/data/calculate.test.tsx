import { calculateRecipeProperties } from "@/data/calculate";
import { IngredientType, Recipe, RecipeProperties, SectionType, emptyRecipe } from "@/data/recipe";

const simpleRecipe: Recipe = {
  ...emptyRecipe,
  sections: [
    {
      name: "preferment",
      type: SectionType.preferment,
      key: 'foobar',
      ingredients: [
        { name: "flour", weight: 20, pct: 100, type: IngredientType.flour },
        { name: "water", weight: 10, pct: 50, type: IngredientType.fluid },
      ]
    },
    {
      name: "dough",
      type: SectionType.dough,
      key: 'default',
      ingredients: [
        { name: "flour", weight: 100, pct: 100, type: IngredientType.flour },
        { name: "water", weight: 50, pct: 50, type: IngredientType.fluid },
        { name: "salt", weight: 2, pct: 2, type: IngredientType.salt}
      ],
    },
  ],
};
describe("calculate", () => {
  it("handles empty recipes", () => {
    const expected: RecipeProperties = {
      hydration: 0,
      weight: 0,
      flourWeight: 0,
      fluidWeight: 0,
      saltWeight: 0
    }
    expect(calculateRecipeProperties(emptyRecipe)).toEqual(expected);
  });

  it("calculates flour, water, salt", () => {
    const properties = calculateRecipeProperties(simpleRecipe);
    expect(properties.hydration).toEqual(50);
    expect(properties.weight).toEqual(182);
    expect(properties.flourWeight).toEqual(120);
    expect(properties.fluidWeight).toEqual(60);
    expect(properties.saltWeight).toEqual(2);
  });
});
