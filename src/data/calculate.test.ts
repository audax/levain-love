import { calculateRecipeProperties, enrichSection, scaleRecipe } from "@/data/calculate";
import { IngredientType, Recipe, RecipeProperties, SectionType, emptyRecipe } from "@/data/recipe";
import { defaultRecipe, scaledRecipe } from "./_fixtures";

const simpleRecipe: Recipe = {
  ...emptyRecipe,
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
  });
  describe('scaling', () => {
    it('scales a recipe', () => {
      expect(scaleRecipe(defaultRecipe, 2)).toEqual(scaledRecipe)
    })
  })
  
  describe('enriching', () => {
    it('enriches a section with bakers percentages', () => {
      const section = {
      name: "dough",
      type: SectionType.dough,
      key: 'default',
      ingredients: [
        { name: "flour", key: 'a', weight: 70, type: IngredientType.flour },
        { name: "other flour", key: 'a', weight: 30, type: IngredientType.flour },
        { name: "water", key: 'b', weight: 50, type: IngredientType.fluid },
        { name: "salt",  key: 'c', weight: 2, type: IngredientType.salt},
        { name: "no flour",  key: 'd', weight: 0, type: IngredientType.flour},
        { name: "no salt",  key: 'e', weight: 0, type: IngredientType.salt},
      ],
      }
      expect(enrichSection(section).ingredients).toEqual(
      [
        { name: "flour", key: "a", weight: 70, pct: 70, type: IngredientType.flour },
        { name: "other flour", key: "a", weight: 30, pct: 30, type: IngredientType.flour },
        { name: "water", key: "b", weight: 50, pct: 50, type: IngredientType.fluid },
        { name: "salt", key: "c", weight: 2, pct: 2, type: IngredientType.salt },
        { name: "no flour",  key: 'd', weight: 0, pct: 0, type: IngredientType.flour},
        { name: "no salt",  key: 'e', weight: 0, pct: 0, type: IngredientType.salt}
      ],
      )
    })

    it('sets a percentage of 0 if no flour is in the dough', () => {
      const section = {
      name: "dough",
      type: SectionType.dough,
      key: 'default',
      ingredients: [
        { name: "water", key: 'b', weight: 50, type: IngredientType.fluid },
      ],
      }
      expect(enrichSection(section).ingredients).toEqual(
      [
        { name: "water", key: "b", weight: 50, pct: 0, type: IngredientType.fluid },
      ],
      )
    })
  })
});
