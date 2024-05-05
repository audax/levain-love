import {calculateRecipeProperties, enrichSection, scaleRecipeByFactor, scaleRecipeByQuantity} from "@/data/calculate";
import { IngredientType, Recipe, RecipeProperties, SectionType, emptyRecipe } from "@/data/recipe";
import { defaultRecipe, scaledRecipe } from "./_fixtures";

const simpleRecipe: Recipe = {
  ...emptyRecipe,
  quantity: 2,
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
describe("calculations", () => {
  describe("properties", () => {
    it("handles empty recipes", () => {
      const expected: RecipeProperties = {
        hydration: 0,
        weight: 0,
        weightPerBread: 0,
        flourWeight: 0,
        fluidWeight: 0,
        saltWeight: 0,
      };
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
    describe("special cases", () => {
      it("calculates hydration with a soaker", () => {
        const recipe: Recipe = {
          ...emptyRecipe,
          quantity: 2,
          sections: [
            {
              name: "soaker",
              type: SectionType.soaker,
              key: "soaker",
              ingredients: [
                { name: "raisins", key: "a", weight: 100, type: IngredientType.other },
                { name: "water", key: "b", weight: 100, type: IngredientType.fluid },
              ]
            },
            {
              name: "dough",
              type: SectionType.dough,
              key: "default",
              ingredients: [
                { name: "flour", key: "a", weight: 100, type: IngredientType.flour },
                { name: "water", key: "b", weight: 50, type: IngredientType.fluid },
              ],
            },
          ],
        }
        const expected: RecipeProperties = {
          weight: 350,
          weightPerBread: 175,
          flourWeight: 100,
          fluidWeight: 50,
          saltWeight: 0,
          hydration: 50,
        }
      const properties = calculateRecipeProperties(recipe);
      expect(properties).toEqual(expected)
      })
      it("calculates hydration with a starter", () => {
        const recipe: Recipe = {
          ...emptyRecipe,
          quantity: 4,
          sections: [
            {
              name: "dough",
              type: SectionType.dough,
              key: "default",
              ingredients: [
                { name: "flour", key: "a", weight: 100, type: IngredientType.flour },
                { name: "water", key: "b", weight: 50, type: IngredientType.fluid },
                { name: "salt", key: "c", weight: 2, type: IngredientType.salt },
                { name: "starter", key: "d", weight: 100, type: IngredientType.starter, hydration: 100 },
              ],
            },
          ],
        }
        const expected: RecipeProperties = {
          weight: 252,
          weightPerBread: 252 / 4,
          flourWeight: 150,
          fluidWeight: 100,
          saltWeight: 2,
          hydration: 66.66666666666666
        }
      const properties = calculateRecipeProperties(recipe);
      expect(properties).toEqual(expected)
      });
    });
  });
  describe("scaling", () => {
    it("scales a recipe", () => {
      expect(scaleRecipeByQuantity(defaultRecipe, 2)).toEqual(scaledRecipe);
    });
    it("scales a recipe by factor", () => {
      expect(scaleRecipeByFactor(defaultRecipe, 2)).toEqual(scaledRecipe);
    });
  });

  describe("enriching", () => {
    it("enriches a section with bakers percentages", () => {
      const section = {
        name: "dough",
        type: SectionType.dough,
        key: "default",
        ingredients: [
          { name: "flour", key: "a", weight: 70, type: IngredientType.flour },
          { name: "other flour", key: "a", weight: 30, type: IngredientType.flour },
          { name: "water", key: "b", weight: 50, type: IngredientType.fluid },
          { name: "salt", key: "c", weight: 2, type: IngredientType.salt },
          { name: "no flour", key: "d", weight: 0, type: IngredientType.flour },
          { name: "no salt", key: "e", weight: 0, type: IngredientType.salt },
        ],
      };
      expect(enrichSection(section).ingredients).toEqual([
        { name: "flour", key: "a", weight: 70, pct: 70, type: IngredientType.flour },
        { name: "other flour", key: "a", weight: 30, pct: 30, type: IngredientType.flour },
        { name: "water", key: "b", weight: 50, pct: 50, type: IngredientType.fluid },
        { name: "salt", key: "c", weight: 2, pct: 2, type: IngredientType.salt },
        { name: "no flour", key: "d", weight: 0, pct: 0, type: IngredientType.flour },
        { name: "no salt", key: "e", weight: 0, pct: 0, type: IngredientType.salt },
      ]);
    });

    it("sets a percentage of 0 if no flour is in the dough", () => {
      const section = {
        name: "dough",
        type: SectionType.dough,
        key: "default",
        ingredients: [{ name: "water", key: "b", weight: 50, type: IngredientType.fluid }],
      };
      expect(enrichSection(section).ingredients).toEqual([{ name: "water", key: "b", weight: 50, pct: 0, type: IngredientType.fluid }]);
    });
  });
});
