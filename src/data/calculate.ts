import { IngredientType, Recipe, RecipeProperties, SectionType } from "./recipe"

const exampleRecipe: Recipe = {
  title: 'Example',
  sections: [
    { 
      name: 'dough',
      type: SectionType.dough,
      key: 'default',
      ingredients: [
        { name: 'flour', weight: 100, pct: 100, type: IngredientType.flour },
        { name: 'water', weight: 60, pct: 60, type: IngredientType.fluid },
        { name: 'salt', weight: 1.6, pct: 1.6, type: IngredientType.salt }
      ]
    }
  ]
}
export function calculateRecipeProperties(recipe: Recipe): RecipeProperties {
  const { sections } = recipe;
  const { flour, fluid, salt, weight } = sections.reduce((acc, section) => {
    section.ingredients.forEach((ingredient) => {
      acc.weight += ingredient.weight;
      if (ingredient.type === IngredientType.flour) {
        acc.flour += ingredient.weight;
      } else if (ingredient.type === IngredientType.fluid) {
        acc.fluid += ingredient.weight;
      } else if (ingredient.type === IngredientType.salt) {
        acc.salt += ingredient.weight;
      }
    });
    return acc;
  }, { flour: 0, fluid: 0, salt: 0, weight: 0 });

  const hydration = flour === 0 ? 0 : (fluid / flour) * 100;
  const flourWeight = flour
  const fluidWeight = fluid
  const saltWeight = salt;

  return {
    hydration,
    weight,
    flourWeight,
    fluidWeight,
    saltWeight
  }
}